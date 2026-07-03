import "../styles/Shared.css";

interface LoaderProps {
  label?: string;
}

export default function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="loader-spinner" />
      <p className="loader-label">{label}</p>
    </div>
  );
}
