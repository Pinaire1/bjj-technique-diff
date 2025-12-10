import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">BJJ Coach</h2>

        <nav className="flex flex-col gap-2">
          <a className="hover:bg-gray-700 p-2 rounded" href="/dashboard">
            Dashboard
          </a>
          <a className="hover:bg-gray-700 p-2 rounded" href="/dashboard/techniques">
            Techniques
          </a>
          <a className="hover:bg-gray-700 p-2 rounded" href="/dashboard/classes">
            Classes
          </a>
          <a className="hover:bg-gray-700 p-2 rounded" href="/dashboard/analysis">
            Video Analysis
          </a>
        </nav>

        <div className="mt-auto">
          <Button variant="secondary" className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
