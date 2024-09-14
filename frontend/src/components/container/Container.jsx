import React from 'react'

function container({children}) {
  return (
    <div>
      <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
    </div>
  )
}

export default container

