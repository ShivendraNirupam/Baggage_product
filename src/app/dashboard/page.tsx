
import Dashboard from "@/components/dashboard";



export default function ProfilePage() {
  return (
    <div className="flex justify-center  p-4">
      <div className=" bg-blue-300/50 w-full flex flex-col sm:grid sm:grid-cols-4 gap-4 justify-center items-center border-2  border-black rounded-2xl">
        <Dashboard className="col-span-4"/>
      </div>
    </div>
  );
}
