import React from 'react'

export const Loader = () => {
  return (
    <>
      <div className='w-full flex items-center justify-center'>
        <svg width='50px' height='50px' viewBox="0 0 200 200">
          <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="#DC1431" />
            <stop offset=".3" stopColor="#DC1431" stopOpacity=".9" />
            <stop offset=".6" stopColor="#DC1431" stopOpacity=".6" />
            <stop offset=".8" stopColor="#DC1431" stopOpacity=".3" />
            <stop offset="1" stopColor="#DC1431" stopOpacity="0" />
          </radialGradient>
          
          <circle
            fill="none"
            stroke="url(#a12)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
            style={{ transformOrigin: 'center' }}
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            fill="none"
            opacity=".2"
            stroke="#DC1431"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </div>
    </>
  )
}