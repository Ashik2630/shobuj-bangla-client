"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { key: 'places', name: 'Places', value: 120 },
  { key: 'districts', name: 'Districts', value: 64 },
  { key: 'users', name: 'Users', value: 3500 },
  { key: 'reviews', name: 'Reviews', value: 12500 },
  { key: 'categories', name: 'Categories', value: 8 },
];

const baseColors = ['#16a34a', '#059669', '#0284c7', '#f59e0b', '#7c3aed'];

function formatNumber(n: number) {
  return n.toLocaleString();
}

export default function StatsChart() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#e6eef6' : '#0f172a';
  const muted = isDark ? '#0b1220' : '#f8fafc';
  const gridColor = isDark ? '#1f2937' : '#e6eef6';

  return (
    <div className="w-full max-w-5xl mx-auto bg-card p-6 rounded-3xl shadow-lg border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-foreground">Platform Statistics</h3>
          <p className="text-sm text-foreground/70">Growing every day — quick overview of your site content</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {data.map((d, i) => (
            <div key={d.key} className="flex items-center gap-3 bg-background/60 border border-border rounded-full px-3 py-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, ${baseColors[i]} 0%, ${baseColors[i]}99 100%)` }} />
              <div className="text-sm">
                <div className="font-semibold text-foreground leading-none">{formatNumber(d.value)}</div>
                <div className="text-foreground/60 text-xs">{d.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <defs>
              {baseColors.map((c, i) => (
                <linearGradient id={`grad-${i}`} key={i} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={c} stopOpacity={0.65} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 6" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" stroke={textColor} tick={{ fill: textColor }} axisLine={false} tickLine={false} />
            <YAxis stroke={textColor} tick={{ fill: textColor }} axisLine={false} tickLine={false} />

            <Tooltip
              cursor={{ fill: isDark ? '#0f172a' : '#f8fafc' }}
              contentStyle={{
                backgroundColor: isDark ? '#0b1220' : '#ffffff',
                borderColor: isDark ? '#0f172a' : '#eef2ff',
                color: textColor,
                borderRadius: 12,
                boxShadow: '0 10px 30px rgba(2,6,23,0.4)'
              }}
              formatter={(value: number) => formatNumber(Number(value))}
            />

            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={36} isAnimationActive animationDuration={900}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
              ))}
              <LabelList dataKey="value" position="top" formatter={(v: number) => formatNumber(Number(v))} style={{ fill: textColor, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
