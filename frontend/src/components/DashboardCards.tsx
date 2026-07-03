import { FiFileText, FiCheckCircle, FiEdit3, FiHeart } from "react-icons/fi";
import type { DashboardStats } from "../types/Article";
import "../styles/Shared.css";

interface DashboardCardsProps {
  stats: DashboardStats;
}

export default function DashboardCards({ stats }: DashboardCardsProps) {
  const cards = [
    {
      label: "Total Articles",
      value: stats.total_articles,
      icon: <FiFileText />,
      tone: "primary",
    },
    {
      label: "Published",
      value: stats.published,
      icon: <FiCheckCircle />,
      tone: "success",
    },
    {
      label: "Drafts",
      value: stats.drafts,
      icon: <FiEdit3 />,
      tone: "warning",
    },
    {
      label: "Total Likes",
      value: stats.total_likes,
      icon: <FiHeart />,
      tone: "pink",
    },
  ] as const;

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div key={card.label} className={`dashboard-card tone-${card.tone}`}>
          <div className="dashboard-card-icon">{card.icon}</div>
          <div>
            <p className="dashboard-card-label">{card.label}</p>
            <h2 className="dashboard-card-value">{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
