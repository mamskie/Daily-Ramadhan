import { DailyTracker } from "@/components/daily-tracker";
import { ProgressSummary } from "@/components/progress-summary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, differenceInDays, format } from "date-fns";
import { enUS, id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Define the structure for tracking activities
export type Activity =
  | "puasa"
  | "shubuh"
  | "dzuhr"
  | "ashr"
  | "maghrib"
  | "isya"
  | "tarawih";
export type DailyRecord = {
  date: string; // ISO string format
  activities: Record<Activity, boolean>;
};

// Get Ramadhan dates
const getRamadhanDates = () => {
  const currentYear = new Date().getFullYear();
  const ramadhanStart = new Date(currentYear, 2, 1); // March 1, 2025
  const ramadhanEnd = addDays(ramadhanStart, 29); // 30 days later

  return { ramadhanStart, ramadhanEnd };
};

export function RamadhanTracker() {
  const { t, i18n } = useTranslation();
  const { ramadhanStart, ramadhanEnd } = getRamadhanDates();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<DailyRecord[]>([]);

  // Calculate the current day of Ramadhan
  const dayOfRamadhan = differenceInDays(currentDate, ramadhanStart) + 1;

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem("ramadhanRecords");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save data to localStorage whenever records change
  // Remove automatic saving to localStorage
  useEffect(() => {
    //This effect is removed.  Saving is now handled by the saveData function and the button.
  }, []);

  // Update the current date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(timer);
  }, []);

  // Get record for the current date
  const getCurrentDateRecord = () => {
    const dateString = currentDate.toISOString().split("T")[0];
    return (
      records.find((record) => record.date === dateString) || {
        date: dateString,
        activities: {
          puasa: false,
          shubuh: false,
          dzuhr: false,
          ashr: false,
          maghrib: false,
          isya: false,
          tarawih: false,
        },
      }
    );
  };

  // Update activity status
  const updateActivity = (activity: Activity, completed: boolean) => {
    const dateString = currentDate.toISOString().split("T")[0];
    const existingRecordIndex = records.findIndex(
      (record) => record.date === dateString
    );

    if (existingRecordIndex >= 0) {
      // Update existing record
      const updatedRecords = [...records];
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        activities: {
          ...updatedRecords[existingRecordIndex].activities,
          [activity]: completed,
        },
      };
      setRecords(updatedRecords);
    } else {
      // Create new record
      const newRecord: DailyRecord = {
        date: dateString,
        activities: {
          puasa: false,
          shubuh: false,
          dzuhr: false,
          ashr: false,
          maghrib: false,
          isya: false,
          tarawih: false,
          [activity]: completed,
        },
      };
      setRecords([...records, newRecord]);
    }
  };

  // Check if the current date is within Ramadhan
  const isRamadhan = currentDate >= ramadhanStart && currentDate <= ramadhanEnd;

  const saveData = () => {
    localStorage.setItem("ramadhanRecords", JSON.stringify(records));
    alert(t("dataSaved"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="space-y-4">
        <Card className="h-auto gap-2">
          <CardHeader>
            <CardTitle>{t("appTitle")}</CardTitle>
            <CardDescription>
              {isRamadhan
                ? t("todayIs", { day: dayOfRamadhan })
                : t("notRamadhan")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {format(currentDate, "EEEE, d MMMM yyyy", {
                locale: i18n.language === "id" ? id : enUS,
              })}
            </p>
          </CardContent>
        </Card>

        {isRamadhan && (
          <Card className="h-auto flex-grow">
            <CardHeader>
              <CardTitle>{t("todayActivities")}</CardTitle>
              <CardDescription>{t("trackActivities")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-grow">
                <DailyTracker
                  record={getCurrentDateRecord()}
                  onUpdateActivity={updateActivity}
                />
              </div>
              <div className="mt-4">
                <Button className="w-full" onClick={saveData}>
                  {t("saveProgress")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("ramadhanJourney")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">{t("summary")}</TabsTrigger>
              <TabsTrigger value="statistics">{t("statistics")}</TabsTrigger>
            </TabsList>
            <div className="flex-grow overflow-auto">
              <TabsContent value="summary" className="mt-4">
                <ProgressSummary records={records} />
              </TabsContent>
              <TabsContent value="statistics" className="mt-4 h-full">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {t("statsComingSoon")}
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
