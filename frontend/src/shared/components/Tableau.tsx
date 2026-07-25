import type { ReactNode } from 'react';

export interface Colonne<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableauProps<T> {
  data: T[];
  colonnes: Colonne<T>[];
  emptyMessage?: ReactNode;
  className?: string;
  rowClassName?: (row: T, index: number) => string;
}

export default function Tableau<T extends Record<string, unknown>>({
  data,
  colonnes,
  emptyMessage = 'Aucune donnée à afficher.',
  className = '',
  rowClassName,
}: TableauProps<T>) {
  return (
    <div className={`overflow-hidden rounded-[20px] border border-white/10 bg-slate-900/70 shadow-xl ${className}`.trim()}>
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-slate-800/80">
          <tr>
            {colonnes.map((colonne, index) => (
              <th
                key={String(colonne.key || index)}
                className={`px-4 py-3 text-left text-sm font-semibold text-slate-200 ${colonne.headerClassName || ''}`.trim()}
              >
                {colonne.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.length === 0 ? (
            <tr>
              <td colSpan={colonnes.length} className="px-4 py-8 text-center text-sm text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className={rowClassName ? rowClassName(row, index) : 'hover:bg-white/5'}>
                {colonnes.map((colonne, colIndex) => (
                  <td
                    key={`${String(colonne.key || colIndex)}-${index}`}
                    className={`px-4 py-3 text-sm text-slate-200 ${colonne.className || ''}`.trim()}
                  >
                    {colonne.render ? colonne.render(row, index) : (row[colonne.key as keyof T] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
