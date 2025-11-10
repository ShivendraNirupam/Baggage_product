import FormComponent from "./form";
import TravelCard from "./travelCard";
import Calendar from "./ui/calendar";

interface DashboardProps {
  className?: string;
}

export default function Dashboard({ className }: DashboardProps) {
  return (
    <div
      className={`${className} sm:grid sm:grid-cols-2 flex flex-col w-full gap-4 py-4 px-4`}
    >
      <div className="col-span-1 flex flex-col justify-start items-center gap-4">
        <Calendar />

        <TravelCard />
      </div>
      <div className="col-span-1">
        <FormComponent />
      </div>
    </div>
  );
}
