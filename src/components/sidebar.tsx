"use client";

import { BaggageClaimIcon, Bell, Bot, LayoutDashboard, LogOut, Notebook, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { icon: <LayoutDashboard />, href: "/dashboard" },
    { icon: <Settings />, href: "/dashboard/settings" },
    { icon: <Bell />, href: "/dashboard/notification" },
    { icon: <BaggageClaimIcon />, href: "/dashboard/baggage" },
    { icon: <Notebook />, href: "/dashboard/notes" },
    { icon: <LogOut />, href: "/dashboard/logout" },
  ];

  return (
    <div
      className={`${className} bg-blue-100/10 backdrop-blur-3xl sm:relative sm:h-full w-[90%] sm:w-auto flex border-2 border-black rounded-2xl sm:flex-row px-6 py-2 gap-6 sm:gap-10 justify-center items-center sm:mr-8`}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-xl transition-colors duration-200 ${
              isActive
                ? "bg-red-500 text-white shadow-lg scale-110"
                : "hover:bg-red-100"
            }`}
          >
            {link.icon}
          </Link>
        );
      })}
    </div>
  );
}
