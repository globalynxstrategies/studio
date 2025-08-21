"use client"

import { usePathname } from "next/navigation"
import { BarChart, Bot, CandlestickChart, Landmark, LineChart } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart },
  { href: "/ai-advisor", label: "AI Advisor", icon: Bot },
  { href: "/stocks", label: "Stock", icon: LineChart },
  { href: "/crypto", label: "Crypto", icon: CandlestickChart },
  { href: "/forex", label: "Forex", icon: Landmark },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="p-2">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <a href={item.href}>
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
}
