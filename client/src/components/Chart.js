import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep', 'Oct', 'Nov', 'Dec']

const curMonthIdx = new Date().getMonth()


const data = [
  {
    name: month[curMonthIdx - 5],
    Views: 10,
  },
  {
    name:  month[curMonthIdx - 4],
    Views: 50,
  },
  {
    name:  month[curMonthIdx - 3],
    Views: 30,
  },
  {
    name:  month[curMonthIdx - 2],
    Views: 40,
  },
  {
    name:  month[curMonthIdx - 1],
    Views: 110,
  },
  {
    name:  month[curMonthIdx ],
    Views: 35,
  },
];

const Chart = () => {
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='Views'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Chart;
