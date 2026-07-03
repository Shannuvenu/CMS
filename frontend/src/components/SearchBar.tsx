import { useState } from "react";
import type { FormEvent } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import "../styles/Shared.css";

interface SearchBarProps {
  value: string;
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onSearch,
  placeholder = "Search articles by title or content...",
}: SearchBarProps) {
  const [term, setTerm] = useState(value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  const handleClear = () => {
    setTerm("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <FiSearch className="search-bar-icon" aria-hidden />
      <input
        type="text"
        value={term}
        placeholder={placeholder}
        onChange={(e) => setTerm(e.target.value)}
      />
      {term && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
    </form>
  );
}
