"use client"

import { usePathname } from "next/navigation"
import { BarChart, Bot, CandlestickChart, Landmark, LineChart, Building, Newspaper, MessageSquare } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart },
  { href: "/ai-advisor", label: "AI Advisor", icon: Bot },
  { href: "/news-summarizer", label: "News Summarizer", icon: Newspaper },
  { href: "/chatbot", label: "Chatbot", icon: MessageSquare },
  { href: "/nasdaq", label: "NASDAQ", icon: LineChart },
  { href: "/nyse", label: "NYSE", icon: Building },
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
              variant="ghost"
              className="text-base h-10"
            >
              <a href={item.href}>
                <item.icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
}
