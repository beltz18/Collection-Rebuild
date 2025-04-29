'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface WeeklyPerformanceData {
  week: string
  success: number
  failed: number
}

interface WeeklyPerformanceChartProps {
  data: WeeklyPerformanceData[]
}

export const WeeklyPerformanceChart = ({
  data,
}: WeeklyPerformanceChartProps) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 mb-4'>
        <h3 className='text-lg font-semibold'>Weekly Performance</h3>
        <p>Success and failed request per week</p>
      </div>

      <div className='h-40 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} barSize={30} margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='week' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              radius={[4, 4, 0, 0]}
              dataKey='success'
              fill='#4ade80'
              name='Success'
            />
            <Bar
              radius={[4, 4, 0, 0]}
              dataKey='failed'
              fill='#f87171'
              name='Failed'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
