import "../styles/Shared.css";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  message?: string;
}

export default function EmptyState({
  icon = "📭",
  title = "No Articles Found",
  message = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
