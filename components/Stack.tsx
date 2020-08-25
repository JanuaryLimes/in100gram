import React from 'react'
import { StackProps } from '../types'

const gapType = {
  2: 'mb-2',
  4: 'mb-4',
}

export const Stack: React.FC<StackProps> = ({ components, gap = 4 }) => {
  return (
    <div>
      {components.map((component, index) => {
        const lastComponent = components.length - 1 == index
        return (
          <div
            key={component.key}
            className={lastComponent ? '' : gapType[gap]}
          >
            {component}
          </div>
        )
      })}
    </div>
  )
}
