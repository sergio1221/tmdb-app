import React from 'react'

type PageTitleProps = {
  value: string;
}
export const PageTitle: React.FC<PageTitleProps> = ({ value }) => (
  <h1 className='page-title'>
    {value}
  </h1>
)
