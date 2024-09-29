import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
        <nav>Hell nav</nav>
        {children}
    </div>
  )
}

export default layout