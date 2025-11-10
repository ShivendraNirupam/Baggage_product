"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

export default function FormComponent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    airline: "",
    from: "",
    to: "",
    gate: "",
    terminal: "",
    dateDeparture: "",
    timeDeparture: "",
    dateArrival: "",
    timeArrival: ""
  });

  

   const handleClick = async () => {
    try {
      const res = await axios.post("/api/v1/form", form);
      console.log("Data sent successfully:", res.data);
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  return (
    <div>
      <div className="bg-white rounded-2xl p-4 ">
        <h1 className="font-bold text-2xl mb-4">Get Started</h1>

        {/* Name */}
        <h2 className="">Personal details</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="firstName" className="font-light">
              First Name *
            </label>
            <input
              type="text"
              value={form.firstName}
              placeholder=""
              onChange={(e) => setForm({...form, firstName: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="lastName" className="font-light">
              Last Name *
            </label>
            <input
              type="text"
              value={form.lastName}
              placeholder=""
              onChange={(e) => setForm({...form, lastName: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
        </div>

        {/* Flight details */}
         <h2 className="mt-6 mb-2">Flight details</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="dateDeparture" className="font-light">
              Date of departure *
            </label>
            <input
              type="date"
              value={form.dateDeparture}
              placeholder=""
              onChange={(e) => setForm({...form, dateDeparture: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="timeDeparture" className="font-light">
              Time of departure *
            </label>
            <input
              type="time"
              value={form.timeDeparture}
              placeholder=""
              onChange={(e) => setForm({...form, timeDeparture: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="dateArrival" className="font-light">
              Date of arrival *
            </label>
            <input
              type="date"
              value={form.dateArrival}
              placeholder=""
              onChange={(e) => setForm({...form, dateArrival: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="timeArrival" className="font-light">
              Time of arrivel *
            </label>
            <input
              type="time"
              value={form.timeArrival}
              placeholder=""
              onChange={(e) => setForm({...form, timeArrival: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="gate" className="font-light">
              Gate *
            </label>
            <input
              type="text"
              value={form.gate}
              placeholder=""
              onChange={(e) => setForm({...form, gate: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          <form action="" className="flex flex-col sm:w-[45%]">
            <label htmlFor="lastName" className="font-light">
              Terminal *
            </label>
            <input
              type="text"
              value={form.terminal}
              placeholder=""
              onChange={(e) => setForm({...form, terminal: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <form action="" className="flex flex-col">
            <label htmlFor="airlineName" className="font-light">
              Airline *
            </label>
            <input
              type="text"
              value={form.airline}
              placeholder="Enter your airline name"
              onChange={(e) => setForm({...form, airline: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          <form action="" className="flex flex-col">
            <label htmlFor="from" className="font-light">
              From *
            </label>
            <input
              type="text"
              value={form.from}
              placeholder="Enter your ariport IATA"
              onChange={(e) => setForm({...form, from: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
            <span>Eg. IATA for Indira Gandhi International Airport in Delhi, India, is DEL</span>
          </form>
          <form action="" className="flex flex-col">
            <label htmlFor="to" className="font-light">
              To *
            </label>
            <input
              type="text"
              value={form.to}
              placeholder="Enter your airline IATA"
              onChange={(e) => setForm({...form, to: e.target.value})}
              className="h-10 p-2 border-2 border-black/10 rounded-2xl"
            />
          </form>
          
        </div>

        <Button onClick={handleClick} variant={"default"} className="mt-4 w-22">Check</Button>
      </div>
    </div>
  );
}
