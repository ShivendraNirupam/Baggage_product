"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";

export default function Calendar() {
  const weekInitials = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateSelected = new Date();

  const [dateInitials, setDateInitials] = useState<number[]>([]);

  const currentDate = dateSelected.getDate();
  const currentMonth = dateSelected.getMonth(); // 0-11
  const currentYear = dateSelected.getFullYear();

  const monthStr = dateSelected.toLocaleString("default", { month: "short" });
  const yearStr = currentYear.toString();

  // Get number of days in month, leap-year safe
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const calculateDates = () => {
    const updatedDates: number[] = Array(7).fill(0);

    const totalDays = getDaysInMonth(currentYear, currentMonth);

    // Day index in week (0=Sun, 1=Mon...)
    const startIndex = dateSelected.getDay();

    // Fill previous dates if needed
    let tempDate = currentDate;
    // Fill current week forward
    for (let i = startIndex; i < 7; i++) {
      if (tempDate <= totalDays) {
        updatedDates[i] = tempDate++;
      } else {
        updatedDates[i] = 0; // Empty after month end
      }
    }

    // Fill previous week days if currentDate > startIndex
    tempDate = currentDate - 1;
    for (let i = startIndex - 1; i >= 0; i--) {
      if (tempDate > 0) {
        updatedDates[i] = tempDate--;
      } else {
        updatedDates[i] = 0; // Empty before month start
      }
    }

    setDateInitials(updatedDates);
  };

  useEffect(() => {
    calculateDates();
  }, [currentDate]);

  return (
    <div className="w-full bg-white/80 rounded-2xl p-2 m-8 sm:m-0">
      {/* Header */}
      <div className="flex justify-around mt-4">
        <ChevronLeft className="cursor-pointer" />
        <h1 className="font-mono text-2xl">
          {monthStr}, {yearStr}
        </h1>
        <ChevronRight className="cursor-pointer" />
      </div>

      {/* Week */}
      <div className="flex justify-around my-4">
        {weekInitials.map((day, index) => (
          <div key={day} className="flex flex-col gap-4 items-center">
            <div>{day}</div>
            <div>
              {dateInitials[index] === 0 ? (
                <div className="bg-black/20 mt-1 h-8 w-8 rounded-full" />
              ) : (
                <div
                  className={`text-xl text-center w-8 h-8 flex items-center justify-center rounded-full ${
                    dateInitials[index] === currentDate
                      ? "bg-green-200 font-bold"
                      : "bg-white"
                  }`}
                >
                  {dateInitials[index]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refresh button */}
      <div className="flex justify-center">
        <Button
          onClick={calculateDates}
          className="hover:bg-blue-600 hover:cursor-pointer p-2 sm:text-xl text-center"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
