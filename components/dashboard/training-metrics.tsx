import { useEffect, useState } from "react";
import { Activity, Heart, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Metrics {
  hasData: boolean;
  distance?: number;
  avgSpeed?: number;
  avgHeartRate?: number | null;
  lastUpdated?: string;
  message?: string;
}

export default function TrainingMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities/today")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="col-span-3 md:col-span-1 flex items-center justify-center min-h-[250px]">
        <span className="text-muted-foreground">Loading...</span>
      </Card>
    );
  }

  if (!metrics?.hasData) {
    return (
      <Card className="col-span-3 md:col-span-1 flex items-center justify-center min-h-[250px]">
        <span className="text-lg font-semibold text-muted-foreground text-center">
          {metrics?.message || "No data yet. Start your training!"}
        </span>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Training Metrics</CardTitle>
        <CardDescription>Your latest training session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Distance
              </p>
              <p className="text-2xl font-bold">
                {metrics.distance?.toFixed(2)} km
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Speed
              </p>
              <p className="text-2xl font-bold">
                {metrics.avgSpeed?.toFixed(1)} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Heart Rate
              </p>
              <p className="text-2xl font-bold">
                {metrics.avgHeartRate ? `${metrics.avgHeartRate} bpm` : "-"}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Last updated:{" "}
              {metrics.lastUpdated
                ? new Date(metrics.lastUpdated).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
