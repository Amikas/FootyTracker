"use client";

import { useState } from "react";
import { BarChart, Calendar, Download, TrendingUp, Trophy } from "lucide-react";
import ExportButton from "@/components/export-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-muted-foreground">
            Track your progress and analyze your performance
          </p>
        </div>
        <ExportButton />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">Training Stats</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Training Sessions
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Duration
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75 min</div>
                <p className="text-xs text-muted-foreground">
                  +5 min from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Goals Achieved
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 goals remaining
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Performance Score
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
            {/* Placeholder for charts/graphs */}
            <div className="h-[300px] rounded-lg border-2 border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Activity chart coming soon</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Training Statistics</h3>
            <div className="h-[400px] rounded-lg border-2 border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Training stats coming soon</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
            <div className="h-[400px] rounded-lg border-2 border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Performance metrics coming soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 