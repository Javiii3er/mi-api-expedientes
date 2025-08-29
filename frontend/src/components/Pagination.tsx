interface Props { page: number; pageSize: number; total: number; onChange: (p: number) => void }
export const Pagination = ({ page, pageSize, total, onChange }: Props) => {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const items = []
  for (let i = 1; i <= pages; i++) items.push(i)
  return (
    <nav className="mt-3">
      <ul className="pagination">
        <li className={`page-item ${page===1?'disabled':''}`}>
          <button className="page-link" onClick={() => onChange(page-1)}>&laquo;</button>
        </li>
        {items.map(i => (
          <li key={i} className={`page-item ${i===page?'active':''}`}>
            <button className="page-link" onClick={() => onChange(i)}>{i}</button>
          </li>
        ))}
        <li className={`page-item ${page===pages?'disabled':''}`}>
          <button className="page-link" onClick={() => onChange(page+1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  )
}
