import { CATEGORIES } from "../types/Article";
import "../styles/Shared.css";

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  const options = ["All", ...CATEGORIES];

  return (
    <div className="category-filter">
      {options.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-pill ${
            selected === category ? "category-pill-active" : ""
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
