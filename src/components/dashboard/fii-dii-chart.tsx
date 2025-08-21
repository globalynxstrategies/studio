"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Jan', fii: 4000, dii: 2400 },
  { name: 'Feb', fii: -3000, dii: 1398 },
  { name: 'Mar', fii: 2000, dii: 9800 },
  { name: 'Apr', fii: 2780, dii: 3908 },
  { name: 'May', fii: -1890, dii: 4800 },
  { name: 'Jun', fii: 2390, dii: -3800 },
  { name: 'Jul', fii: 3490, dii: 4300 },
];

export function FiiDiiChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FII/DII Data (Mock)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="fii" fill="hsl(var(--primary))" name="FII (Cr)" />
            <Bar dataKey="dii" fill="hsl(var(--accent))" name="DII (Cr)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
