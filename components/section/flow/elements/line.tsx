export const Line = () => {
  return (
    <>
      <svg>
        <defs>
          <linearGradient id='edge-gradient'>
            <stop offset='0%' stopColor='#ae53ba' />
            <stop offset='100%' stopColor='#2a8af6' />
          </linearGradient>

          <marker
            id='edge-circle'
            viewBox='-5 -5 10 10'
            refX='0'
            refY='0'
            markerUnits='strokeWidth'
            markerWidth='10'
            markerHeight='10'
            orient='auto'
          >
            <circle
              stroke='#2a8af6'
              strokeOpacity='0.75'
              r='2'
              cx='0'
              cy='0'
            />
          </marker>
        </defs>
      </svg>
    </>
  )
}