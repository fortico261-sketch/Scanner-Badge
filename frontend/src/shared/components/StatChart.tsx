import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartProps = {
  data: { label: string; value: number }[];
};

export default function StatChart({ data }: ChartProps) {
  return (
    <div className="mt-6 h-64 w-full rounded-[22px] border border-slate-200 bg-white p-4 shadow-xl">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Statistiques</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderRadius: '12px',
            }}
            itemStyle={{ color: '#0f172a' }}
            labelStyle={{ color: '#475569' }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#059669" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
