import type { Activity, DailyRecord } from "@/components/ramadhan-tracker";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

interface DailyTrackerProps {
  record: DailyRecord;
  onUpdateActivity: (activity: Activity, completed: boolean) => void;
}

export function DailyTracker({ record, onUpdateActivity }: DailyTrackerProps) {
  const { t } = useTranslation();

  const activities = [
    {
      id: "puasa" as Activity,
      label: t("activities.puasa"),
      icon: <Coffee className="h-5 w-5 text-orange-500" />,
    },
    {
      id: "shubuh" as Activity,
      label: t("activities.shubuh"),
      icon: <Sunrise className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "dzuhr" as Activity,
      label: t("activities.dzuhr"),
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: "ashr" as Activity,
      label: t("activities.ashr"),
      icon: <Sunset className="h-5 w-5 text-orange-500" />,
    },
    {
      id: "maghrib" as Activity,
      label: t("activities.maghrib"),
      icon: <CloudMoon className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: "isya" as Activity,
      label: t("activities.isya"),
      icon: <Moon className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "tarawih" as Activity,
      label: t("activities.tarawih"),
      icon: <Star className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center space-x-4 p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <div className="flex-shrink-0">{activity.icon}</div>
          <div className="flex-grow">
            <Label htmlFor={activity.id} className="text-base font-medium">
              {activity.label}
            </Label>
          </div>
          <Checkbox
            id={activity.id}
            checked={record.activities[activity.id]}
            onCheckedChange={(checked) => {
              onUpdateActivity(activity.id, checked === true);
            }}
          />
        </div>
      ))}
    </div>
  );
}
