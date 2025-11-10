import { logout } from "@/app/action/auth";
import { getSessionId } from "@/lib/utility";
import { BaggageClaim, LogIn, LogOut, Plane } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  const sessionId = await getSessionId()
  return (
    <div className="w-full relative flex bg-transparent justify-center p-4 text-white">
      <div className="h-14 p-6 border-0 bg-black/50 backdrop-blur-2xl  shadow-[0_4px_40px_rgba(255,255,255,0.1) w-[90%] rounded-xl  flex items-center justify-between">
        <div className="flex">
            <BaggageClaim width={32} strokeWidth={2} color="white" className=""/>
            <p className="italic">TraWel</p>
        </div>
        <div className="flex gap-4">
            <Link href={"/dashboard"} title="Home">Home</Link>
            <Link href={"/about"} title="About">About</Link>
            {!sessionId ? <Link href={"/signin"} title="Sign In" >Sign in</Link> : <LogOut onClick={logout} /> }
        </div>
      </div>
    </div>
  );
}
