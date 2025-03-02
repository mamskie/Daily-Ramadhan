import type { DailyRecord } from "@/components/ramadhan-tracker";
import { Progress } from "@/components/ui/progress";
import {
  CloudMoon,
  Coffee,
  Moon,
  Star,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProgressSummaryProps {
  records: DailyRecord[];
}

export function ProgressSummary({ records }: ProgressSummaryProps) {
  const { t } = useTranslation();

  // Calculate statistics
  const totalDays = records.length;

  const activityStats = {
    puasa: records.filter((r) => r.activities.puasa).length,
    shubuh: records.filter((r) => r.activities.shubuh).length,
    dzuhr: records.filter((r) => r.activities.dzuhr).length,
    ashr: records.filter((r) => r.activities.ashr).length,
    maghrib: records.filter((r) => r.activities.maghrib).length,
    isya: records.filter((r) => r.activities.isya).length,
    tarawih: records.filter((r) => r.activities.tarawih).length,
  };

  // Calculate perfect days (all activities completed)
  const perfectDays = records.filter((r) =>
    Object.values(r.activities).every(Boolean)
  ).length;

  // Calculate percentage for progress bars
  const getPercentage = (count: number) => {
    if (totalDays === 0) return 0;
    return Math.round((count / totalDays) * 100);
  };

  const activities = [
    {
      id: "puasa",
      label: t("activities.puasa"),
      icon: <Coffee className="h-5 w-5 text-orange-500" />,
      count: activityStats.puasa,
    },
    {
      id: "shubuh",
      label: t("activities.shubuh"),
      icon: <Sunrise className="h-5 w-5 text-amber-500" />,
      count: activityStats.shubuh,
    },
    {
      id: "dzuhr",
      label: t("activities.dzuhr"),
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      count: activityStats.dzuhr,
    },
    {
      id: "ashr",
      label: t("activities.ashr"),
      icon: <Sunset className="h-5 w-5 text-orange-500" />,
      count: activityStats.ashr,
    },
    {
      id: "maghrib",
      label: t("activities.maghrib"),
      icon: <CloudMoon className="h-5 w-5 text-indigo-500" />,
      count: activityStats.maghrib,
    },
    {
      id: "isya",
      label: t("activities.isya"),
      icon: <Moon className="h-5 w-5 text-blue-500" />,
      count: activityStats.isya,
    },
    {
      id: "tarawih",
      label: t("activities.tarawih"),
      icon: <Star className="h-5 w-5 text-purple-500" />,
      count: activityStats.tarawih,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-background dark:bg-emerald-900/50 rounded-lg">
          <h3 className="text-md font-medium mb-2">{t("daysTracked")}</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {totalDays}
          </p>
        </div>
        <div className="p-4 bg-background dark:bg-emerald-900/50 rounded-md">
          <h3 className="text-md font-medium mb-2">{t("perfectDays")}</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {perfectDays}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t("activityCompletion")}</h3>

        {activities.map((activity) => (
          <div key={activity.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {activity.icon}
                <span>{activity.label}</span>
              </div>
              <span className="text-sm font-medium">
                {t("daysCount", { count: activity.count, total: totalDays })}
              </span>
            </div>
            <Progress value={getPercentage(activity.count)} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
