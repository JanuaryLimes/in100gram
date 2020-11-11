import React from 'react'

export const Loader = () => {
  return (
    <div className="flex h-full items-center justify-center w-full">
      <div
        style={{ borderTopColor: '#3498db' }}
        className="border-4 border-gray-200 border-t-4 ease-linear h-8 loader rounded-full w-8"
      ></div>
    </div>
  )
}
