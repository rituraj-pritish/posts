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

const data = [
  {
    name: 'Jan',
    Views: 10,
  },
  {
    name: 'Feb',
    Views: 50,
  },
  {
    name: 'March',
    Views: 30,
  },
  {
    name: 'April',
    Views: 40,
  },
  {
    name: 'May',
    Views: 110,
  },
  {
    name: 'June',
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
