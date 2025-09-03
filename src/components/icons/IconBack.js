import React from 'react'

function IconBack({ className = '' }) {
  return React.createElement('svg', {
    className: className,
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  },
    React.createElement('path', {
      d: 'M19 12H5M12 19L5 12L12 5',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })
  )
}

export default IconBack
