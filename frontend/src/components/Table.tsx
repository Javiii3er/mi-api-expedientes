interface Column<T> { key: string; header: string; render?: (row: T) => React.ReactNode }
interface Props<T> { columns: Column<T>[]; data: T[] }

export function Table<T>({ columns, data }: Props<T>) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            {columns.map(c => <th key={c.key}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(c => (
                <td key={c.key}>{c.render ? c.render(row) : (row as any)[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
