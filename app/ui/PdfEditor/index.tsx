'use client'

import { ChangeEvent, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './index.css'
import { degrees, PDFDocument } from 'pdf-lib';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

// Adding Promise type safety declarations
declare global {
  interface PromiseConstructor {
    withResolvers<T = unknown>(): {
      promise: Promise<T>;
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: any) => void;
    };
  }
}

// Polyfill for Promise.withResolvers
if (typeof Promise.withResolvers === 'undefined') {
  (Promise as any).withResolvers = function () {
    let resolve: (value: unknown) => void;
    let reject: (reason?: any) => void;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve: resolve!, reject: reject! };
  };
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RotateIcon = (props: {
  onClick: () => void;
}) => {
  return (
    <div onClick={props.onClick} className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white">
      <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
      </svg>
    </div>
  )
}

const Loading = () => {
  return <div className="flex justify-center"><div className="loading sc-8852f330-0 gvZoOU !border-black/30 !border-t-black"></div></div>
}

const PdfEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{rotate: number}[]>([])
  const [scale, setScale] = useState<number>(1)

  function upload(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        toast('Please upload a valid PDF file.')
      }
    }
  }

  // 当文档加载成功时，获取 PDF 页数
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPages(new Array(numPages).fill({rotate: 0}))
  };

  function removeFile() {
    setFile(null)
  }

  function enlarge() {
    if (scale < 3) {
      setScale(scale+0.25)
    }
  }
  function narrow() {
    if (scale > 0.5) {
      setScale(scale-0.25)
    }
  }

  function rotateAll() {
    setPages(pages.map((it) => {
      return {
        ...it,
        rotate: (it.rotate % 360) + 90
      }
    }))
  }

  function rotatePdf(index: number) {
    setPages(pages.map((it, idx) => {
      if (idx === index) {
        return {
          ...it,
          rotate: (it.rotate % 360) + 90
        }
      } else {
        return it
      }
    }))
  }

  const dowmload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfBytes = event.target?.result as ArrayBuffer;
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const pageList = pdfDoc.getPages();
      pageList.forEach((page, index) => {
        // 旋转每一页
        page.setRotation(degrees(pages[index].rotate));
      });

      const rotatedPdfBytes = await pdfDoc.save();
      const rotatedPdfBlob = new Blob([rotatedPdfBytes], { type: 'application/pdf' });
      const rotatedPdfUrl = URL.createObjectURL(rotatedPdfBlob);

      const a = document.createElement('a')
      a.download = file.name
      a.href = rotatedPdfUrl
      a.click()
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="w-full flex justify-center">
      <ToastContainer />
      {!file &&
        <div className="h-[350px] relative text-center w-[275px]">
          <input onChange={upload} className="cursor-pointer hidden" type="file" id="input-file-upload" accept=".pdf" />
          <label className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300" htmlFor="input-file-upload">
            <div className="cursor-pointer flex flex-col items-center space-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path></svg>
              <p className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">Click to upload or drag and drop</p>
            </div>
          </label>
        </div>
      }

      {file &&
        <div>
          {pages.length > 0 &&
            <div className="flex justify-center items-center space-x-3 selecto-ignore">
              <button onClick={rotateAll} className="rotate-all-btn !w-auto">Rotate all</button>
              <button onClick={removeFile} className="rotate-all-btn !w-auto !bg-gray-800" aria-label="Remove this PDF and select a new one" data-microtip-position="top" role="tooltip">Remove PDF</button>
              <button onClick={enlarge} className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white" aria-label="Zoom in" data-microtip-position="top" role="tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"></path>
                </svg>
              </button>
              <button onClick={narrow} className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white" aria-label="Zoom out" data-microtip-position="top" role="tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"></path>
                </svg>
              </button>
            </div>
          }

          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            className='pdf-container flex flex-wrap justify-center'
            loading={<Loading />}
            onLoadError={err => {
              toast(err.message)
              setFile(null)
            }}
          >
            {
              pages.map((page, index) => {
                return (
                  <div key={index + 1} className='relative m-3'>
                    <RotateIcon onClick={() => rotatePdf(index)} />
                    <div 
                      className='page-container'
                    >
                      <Page 
                        pageNumber={index + 1}
                        rotate={page.rotate}
                        width={180}
                        height={255}
                        scale={scale}
                      />
                    </div>
                  </div>
                )
              })
            }
          </Document>
          {pages.length > 0 &&
            <div className='flex justify-center mt-8'>
              <button onClick={dowmload} className="rotate-all-btn !w-auto">Download</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default PdfEditor