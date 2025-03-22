"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const plants = [
  { id: "1", name: "Peace Lily", water: "weekly", sunlight: "indirect light" },
  { id: "2", name: "Snake Plant", water: "biweekly", sunlight: "low light" },
  { id: "3", name: "Cactus", water: "monthly", sunlight: "bright light" },
];

export default function PlantCareReminder() {
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);

  const notifyUser = () => {
    console.log("Notification button clicked");

    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      console.error("Browser does not support notifications.");
      return;
    }

    console.log("Checking notification permission...");
    if (Notification.permission === "granted") {
      console.log("Permission granted, sending notification...");
      new Notification("Plant Care Reminder", {
        body: `Water your ${selectedPlant.name} every ${selectedPlant.water}. It needs ${selectedPlant.sunlight}.`,
      });
    } else if (Notification.permission === "default") {
      console.log("Requesting permission...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission granted after request, sending notification...");
          new Notification("Plant Care Reminder", {
            body: `Water your ${selectedPlant.name} every ${selectedPlant.water}. It needs ${selectedPlant.sunlight}.`,
          });
        } else {
          alert("Please allow notifications in your browser settings.");
          console.warn("Notification permission denied.");
        }
      });
    } else {
      alert("Notifications are blocked. Enable them in Chrome settings.");
      console.warn("Notifications blocked.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-green-700">
            Plant Care Assistant
          </h2>
          <p className="text-gray-600 text-sm">
            Select a plant to receive care reminders:
          </p>

          <Select onValueChange={(value) => setSelectedPlant(plants.find(p => p.id === value) || plants[0])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a plant" />
            </SelectTrigger>
            <SelectContent>
              {plants.map((plant) => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={notifyUser} className="w-full bg-green-500 hover:bg-green-600">
            Set Plant Reminder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
