import React from 'react'
import { Title } from './title'

type PageProps = {
  title: string;
  className?: string;
}
export const Page: React.FC<PageProps> = (props) => {

  const { title, className, children } = props
  const mainClass = className ?? ''

  return (
    <div className='app'>
      <Title value={title}/>

      <header>

      </header>

      <main className={mainClass}>
        {children}
      </main>

      <footer>
        This is a test app written by andrii
      </footer>
    </div>
  )
}
