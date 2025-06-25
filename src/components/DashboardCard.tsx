import type { LucideIcon } from "lucide-react";
import type { Page } from "../types";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  navigateTo: (page: Page) => void;
  page: Page;
}

export const DashboardCard = ({ title, value, icon: Icon, colorClass, navigateTo, page }: DashboardCardProps) => (
    <div className={`bg-white p-6 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow`} onClick={() => navigateTo(page)}>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClass}`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
    </div>
);