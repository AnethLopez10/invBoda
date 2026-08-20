import { useState, useRef, useEffect } from 'react';
import { guestSearchOptions } from '../data/guestList';

const GuestAutocomplete = ({ value, onChange, placeholder, id }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered =
    query.trim().length === 0
      ? []
      : guestSearchOptions
          .filter((opt) => opt.searchText.includes(query.toLowerCase().trim()))
          .slice(0, 8);

  const handleInput = (e) => {
    const next = e.target.value;
    setQuery(next);
    onChange(next);
    setOpen(true);
  };

  const handleSelect = (label) => {
    setQuery(label);
    onChange(label);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        id={id}
        type="text"
        value={query}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-4 py-3 rounded border-2 border-ostion-oscuro/60
          bg-white font-cormorant text-lg text-olivo-oscuro focus:border-olivo transition-colors"
      />

      {open && filtered.length > 0 && (
        <ul
          className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-y-auto
            bg-white border border-olivo/20 rounded shadow-lg"
          role="listbox"
        >
          {filtered.map((opt, index) => (
            <li key={`${opt.label}-${opt.category}-${index}`}>
              <button
                type="button"
                onClick={() => handleSelect(opt.label)}
                className="w-full text-left px-4 py-2.5 font-cormorant text-olivo-oscuro
                  hover:bg-olivo/10 transition-colors border-b border-ostion-oscuro/30 last:border-0"
              >
                <span className="block">{opt.label}</span>
                <span className="text-xs text-olivo/50">
                  {opt.category} · {opt.count} {opt.count === 1 ? 'persona' : 'personas'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestAutocomplete;
