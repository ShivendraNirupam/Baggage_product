"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BriefcaseConveyorBelt,
  Circle,
  Luggage,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Shield,
} from "lucide-react";

export default function TravelCard() {
  const trackingStatus = true;

  const [logoUrl, setLogoUrl] = useState<string>("");
  const [fromAirport, setFromAirport] = useState<string>("");
  const [toAirport, setToAirport] = useState<string>("");
  const [data, setData] = useState<any>(null);

  // Fetch the submitted form data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/form");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch Airline Logo dynamically
  const getLogo = async (airlineName: string) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/airlines?name=${airlineName}`,
        {
          headers: {
            "X-Api-Key": "mNTnOzB4tzL25SjYdM81kA==tMWU3cpg1GSsp7Qg",
          },
        }
      );
      const airline = response.data[0];
      if (airline && airline.iata) {
        const dynamicLogo = `https://pics.avs.io/200/50/${airline.iata}.png`;
        setLogoUrl(dynamicLogo);
      }
    } catch (error) {
      console.error("Airline fetch failed:", error);
    }
  };

  // Fetch Airport details
  const getAirport = async (iata: string, setFn: (v: string) => void) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/airports?iata=${iata}`,
        {
          headers: {
            "X-Api-Key": "mNTnOzB4tzL25SjYdM81kA==tMWU3cpg1GSsp7Qg",
          },
        }
      );
      const airport = response.data[0];
      if (airport && airport.name) {
        setFn(airport.name);
      }
    } catch (error) {
      console.error("Airport fetch failed:", error);
    }
  };

  // When data loads, trigger airline & airport info fetching
  useEffect(() => {
    if (data?.airline) getLogo(data.airline);
    if (data?.from) getAirport(data.from, setFromAirport);
    if (data?.to) getAirport(data.to, setToAirport);
  }, [data]);

  return (
    <div className="w-full">
      {/* Flight details */}
      <div className="my-1">
        <h1 className="text-2xl ml-2 mb-2 font-semibold">Flight details</h1>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Airline Logo"
                  className="h-6 object-contain"
                />
              ) : (
                <p>Loading airline logo...</p>
              )}
              <CardDescription>
                {data?.airline || "Airline name"} ({data?.flightNo || "N/A"})
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex justify-around gap-2 items-center font-mono">
              {/* Departure */}
              <div>
                <h1 className="sm:text-3xl font-semibold">{data?.from || "---"}</h1>
                <p className="font-semibold text-xs sm:text-nowrap text-gray-400 mb-1">
                  {fromAirport || "Fetching airport..."}
                </p>
                <p className="sm:text-2xl">{data?.timeDeparture || "--:--"}</p>
                <p className="font-semibold text-xs sm:text-[15px] text-nowrap text-gray-400">
                  {data?.dateDeparture || ""}
                </p>
              </div>

              {/* divider */}
              <div className="flex w-full items-center justify-center">
                <Circle size={10} />
                <div className="h-px w-[30%] bg-black"></div>
                <Plane />
                <div className="h-px w-[30%] bg-black"></div>
                <Circle size={10} />
              </div>

              {/* Arrival */}
              <div>
                <h1 className="sm:text-3xl font-semibold">{data?.to || "---"}</h1>
                <p className="font-semibold text-xs sm:text-nowrap text-gray-400 mb-1">
                  {toAirport || "Fetching airport..."}
                </p>
                <p className="sm:text-2xl">{data?.timeArrival || "--:--"}</p>
                <p className="font-semibold text-xs sm:text-[15px] text-nowrap text-gray-400">
                  {data?.dateArrival || ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Baggage details */}
      <div className="my-2">
        <h1 className="text-2xl ml-2 mb-2 font-semibold">Your Baggage</h1>
        <Card>
          <CardHeader>
            <CardTitle>Track your baggage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`size-2 rounded-full ${
                  trackingStatus ? "bg-green-500" : "bg-red-400"
                }`}
              ></div>
              <span>Tracking status: Active</span>
            </div>

            <div className="flex justify-start mt-2 items-center">
              <Shield />
              <div className="h-px bg-black w-[10%]"></div>
              <BriefcaseConveyorBelt />
              <div className="h-px bg-black w-[10%]"></div>
              <PlaneTakeoff />
              <div className="h-px bg-black w-[10%]"></div>
              <PlaneLanding />
              <div className="h-px bg-black w-[10%]"></div>
              <Luggage />
            </div>

            <div className="my-2">Live Status: {trackingStatus ? "Baggage loaded" : "Awaiting update"}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
