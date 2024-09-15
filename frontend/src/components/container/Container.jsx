import React from 'react'

function container({children}) {
  return (
    <div>
      <div className='w-full max-w-full mx-auto px-4'>
        {children}
    </div>
    </div>
  )
}

export default container

