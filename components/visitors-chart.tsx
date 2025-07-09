// 'use client' must be at the top for client components
'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Apr 1", Mobile: 150, Desktop: 222 },
  { name: "Apr 2", Mobile: 200, Desktop: 180 },
  { name: "Apr 3", Mobile: 170, Desktop: 210 },
  { name: "Apr 4", Mobile: 220, Desktop: 190 },
  { name: "Apr 5", Mobile: 180, Desktop: 230 },
  { name: "Apr 6", Mobile: 210, Desktop: 200 },
  { name: "Apr 7", Mobile: 160, Desktop: 240 },
];

export function VisitorsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Mobile" fill="#3b82f6" />
        <Bar dataKey="Desktop" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
