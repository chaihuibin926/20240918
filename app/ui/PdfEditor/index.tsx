const PdfEditor = () => {

  return (
    <div className="w-full flex justify-center">
      <div className="h-[350px] relative text-center w-[275px]">
        <input className="cursor-pointer hidden" type="file" id="input-file-upload" accept=".pdf" />
        <label className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300" htmlFor="input-file-upload">
          <div className="cursor-pointer flex flex-col items-center space-y-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path></svg>
            <p className="pointer-events-none font-medium text-sm leading-6 pointer opacity-75">Click to upload or drag and drop</p>
          </div>
        </label>
      </div>
    </div>
  )
}

export default PdfEditor