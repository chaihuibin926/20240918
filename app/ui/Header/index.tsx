import styles from './index.module.css'

const Header = () => {

  const links = [
    {label: 'Pricing', href: '/'},
    {label: 'Chrome extension', href: '/'},
    {label: 'Use cases', href: '/'},
    {label: 'Get started →', href: '/'},
  ]

  return (
    <header className={styles.header}>
      <div>
        <a href="/" className={styles.logo}>
          <svg style={{height: 18}} viewBox="0 0 64 36" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z"></path></svg>
          PDF.ai
        </a>
      </div>


      <nav className={styles.nav + ' hidden md:flex'}>
        {
          links.map(it => <a key={it.label} href={it.href}>{it.label}</a>)
        }
      </nav>

      <label style={{padding: 10}} className="md:hidden" htmlFor="navigation-show">
        <input className="hidden peer" type="checkbox" id="navigation-show" />
        {/* <svg className="peer-checked:hidden w-8 h-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="944"><path d="M177.276121 259.545212a31.635394 31.635394 0 0 1 31.643152-31.635394h607.472485a31.635394 31.635394 0 0 1 0 63.278546H208.919273a31.635394 31.635394 0 0 1-31.643152-31.643152z m0 253.114182a31.635394 31.635394 0 0 1 31.643152-31.635394h607.472485a31.635394 31.635394 0 0 1 0 63.278545H208.919273a31.635394 31.635394 0 0 1-31.643152-31.643151z m0 253.114182a31.635394 31.635394 0 0 1 31.643152-31.635394h607.472485a31.635394 31.635394 0 0 1 0 63.270788H208.919273a31.635394 31.635394 0 0 1-31.643152-31.635394z" fill="#000000" p-id="945"></path></svg> */}
        <svg className="peer-checked:hidden" style={{width: 20}} viewBox="0 0 16 16"><path d="M1 4h14c.55 0 1-.45 1-1s-.45-1-1-1H1c-.55 0-1 .45-1 1s.45 1 1 1zm14 8H1c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H1c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg>
        {/* <svg className="hidden peer-checked:block w-8 h-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="987"><path d="M855.68 798.336L596.032 538.624 855.68 279.04a41.024 41.024 0 0 0-58.048-57.984L537.984 480.64 279.68 222.336a41.024 41.024 0 0 0-58.048 58.048L480 538.624l-258.944 258.88a41.024 41.024 0 0 0 58.048 57.984l258.88-258.816 259.84 259.712a41.024 41.024 0 0 0 57.984-58.048z" p-id="988" fill="#2c2c2c"></path></svg> */}
        <svg className="hidden peer-checked:block" style={{width: 20}} viewBox="0 0 16 16"><path d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"></path></svg>
        <nav 
          style={{
            padding: 10,
            borderTop: '1px solid rgb(229, 227, 218)',
            top: 59,
            left: 0,
            position: 'absolute',
          }} 
          className="hidden bg-white peer-checked:block w-full"
        >
          {
            links.map(it => (
              <a style={{padding: 10, display: 'block', fontSize: 15, fontWeight: 500}} href={it.href} key={it.label}>
                {it.label}
              </a>
            ))
          }
        </nav>
    </label>
    </header>
  )
}

export default Header