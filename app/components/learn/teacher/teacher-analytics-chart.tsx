'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardFooter } from '@/app/components/ui/card';

interface TeacherAnalyticsChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const TeacherAnalyticsChart = ({ data }: TeacherAnalyticsChartProps) => {
  return (
    <Card className="py-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#6847c2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <CardFooter className="justify-center py-4 text-xs text-muted-foreground lg:text-sm">
        Updated every couple of minutes.
      </CardFooter>
    </Card>
  );
};
