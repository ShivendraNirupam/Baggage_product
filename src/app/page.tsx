"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const handleSignUpClick = () => {};
  return (
    <div className="h-[80%] flex justify-center items-center text-white text-shadow-black">
      <div className=" flex items-center justify-center p-4">
        <div
          className={`flex flex-col justify-center items-center text-center `}
        >
          <h1 className="text-2xl font-bold italic">
            Your Baggage. Your Journey. Always Tracked
          </h1>
          <p className="mt-4 sm:text-6xl font-bold">
            Track your baggage in real-time across the airport.
          </p>
          <p className="sm:text-2xl">
            Get instant updates, stay stress-free and focus on you journey - not
            your luggage.
          </p>
          <div className="mt-16 flex gap-4">
            <Button>
              <Link href={"/login"}>Get Started</Link>
            </Button>
            <Button className="px-6">
              <Link href={"/signup"}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
