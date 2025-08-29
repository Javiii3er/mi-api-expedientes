interface Props { value: string; onChange: (v: string) => void; placeholder?: string }
export const SearchBar = ({ value, onChange, placeholder }: Props) => (
  <input
    className="form-control"
    style={{ width: 260 }}
    placeholder={placeholder || 'Buscar…'}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)
