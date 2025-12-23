"use client";

import "./glass.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  ShoppingBag,
  Box,
  BookOpen,
  Users,
  Settings,
  ShieldCheck,
  Calendar,
  ChartArea,
  MonitorPlay,
  PanelLeft,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  Keyboard,
  Carrot,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

// --- Types ---

type OrderStatus = "not payed" | "payed" | "finished";
type PromoType = "global" | "per article" | "absolute";

interface Order {
  id: string;
  time: string;
  amount: number;
  status: OrderStatus;
  phone: string;
  name: string;
  promo?: PromoType;
  istakeaway: boolean;
}

// --- Simplified Glass Components ---

const GlassButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "sm" | "icon";
  }
>(({ className, variant = "primary", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "glass-btn",
        `glass-btn-${variant}`,
        size === "default" && "h-9 px-4 py-2 text-sm",
        size === "sm" && "h-8 px-3 text-xs",
        size === "icon" && "h-9 w-9",
        className
      )}
      {...props}
    />
  );
});
GlassButton.displayName = "GlassButton";

const GlassBadge = ({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "success" | "warning" | "danger";
}) => {
  return (
    <div
      className={cn("glass-badge", `glass-badge-${variant}`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function Apple2026Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"today" | "week" | "month">("today");
  const [range, setRange] = useState<"today" | "week" | "month">("month");
  const [loading, setLoading] = useState(true);

  // Mock data
  const date = new Date();
  const monthRanges = {
    weekRange: [
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1),
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7),
    ],
    monthRange: [
      new Date(date.getFullYear(), date.getMonth(), 1),
      new Date(date.getFullYear(), date.getMonth() + 1, 0),
    ],
  };

  const privileges = [{ privilege: "access_financial" }];

  const handleSelectRange = (selectedRange: "today" | "week" | "month") => () => {
    setRange(selectedRange);
    setFilter(selectedRange);
  };

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.time);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (filter === "today") return orderDate >= startOfToday;
    if (filter === "week") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return orderDate >= oneWeekAgo;
    }
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return orderDate >= startOfMonth;
  });

  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
  const grossRevenue = { _sum: { amountAfterVat: totalAmount } };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const formatTime = (isoString: string) =>
    new Date(isoString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (d: Date) => Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(d);

  return (
    <div className="glass-theme apple-mesh-bg h-screen w-full flex flex-col font-sans text-primary overflow-hidden">
      {/* Top Header */}
      <header className="h-14 flex items-center px-4 shrink-0 z-20">
        <div className="flex items-center gap-3 w-[240px]">
          <div className="h-9 w-9 bg-linear-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xs italic shadow-md">
            Jenny
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none text-primary">PAUSE PIZZA</span>
            <span className="text-[10px] text-secondary mt-0.5 font-medium uppercase tracking-wider">Restaurant</span>
          </div>
          <ChevronDown className="h-3 w-3 text-secondary ml-1" />
        </div>

        <div className="flex items-center gap-3 text-secondary text-sm font-medium">
          <PanelLeft className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
          <span className="opacity-30">|</span>
          <span>Orders</span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-[240px] hidden lg:flex flex-col p-4 pt-2">
          <nav className="flex-1 overflow-y-auto space-y-1 no-scrollbar">
            <div className="nav-item active">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </div>
            {[
              { icon: Box, label: "Inventory" },
              { icon: BookOpen, label: "Catalog" },
              { icon: Carrot, label: "Raw Materials" },
              { icon: ShieldCheck, label: "Health & Safety" },
              { icon: ChartArea, label: "Analytics" },
              { icon: Users, label: "Customers" },
              { icon: Calendar, label: "Recurring" },
              { icon: PanelLeft, label: "Operations" },
              { icon: FileText, label: "Audit" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div key={item.label} className="nav-item">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-(--glass-border-light)">
            <div className="flex items-center gap-3 px-2 text-secondary text-sm font-medium mb-4 cursor-pointer hover:text-primary transition-colors">
              <Keyboard className="h-5 w-5" />
              <span>Shortcuts</span>
              <span className="opacity-50 ml-auto text-xs">⌘K</span>
            </div>
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-(--glass-surface-hover) cursor-pointer transition-colors">
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden border border-(--glass-border-light) shadow-sm relative">
                <Image src="/alex.png" alt="Alex D." fill className="object-cover" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-primary truncate">Alex D.</span>
                <span className="text-xs text-secondary truncate">Manager</span>
              </div>
              <ChevronsUpDown className="h-3 w-3 text-secondary ml-auto" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto rounded-tl-3xl shadow-2xl glass-panel border-r-0 border-b-0 mt-0 ml-0 relative">
           {/* Sticky Header inside Main Content */}
           <div className="sticky top-0 z-10 px-8 py-6 flex justify-between items-center border-t-0 border-l-0 border-r-0">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-primary">Orders</h1>
              <GlassButton size="icon" className="rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <Plus className="h-5 w-5" />
              </GlassButton>
            </div>
            <GlassButton variant="secondary" className="gap-2 rounded-full px-4 shadow-sm">
              <MonitorPlay className="h-4 w-4" />
              Live View
              <ExternalLink className="h-3 w-3 opacity-50" />
            </GlassButton>
           </div>

           <div className="pb-8 space-y-8">
            {/* Stats Cards */}
            <div className="flex gap-6 overflow-x-auto pb-2 pt-4 px-8 no-scrollbar">
               {[
                { label: "Today", value: date, range: "today" },
                { label: "This Week", value: monthRanges.weekRange, range: "week" },
                { label: "This Month", value: monthRanges.monthRange, range: "month" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  onClick={handleSelectRange(stat.range as "today" | "week" | "month")}
                  className={cn(
                    "glass-card w-64 p-6 rounded-2xl cursor-pointer flex flex-col justify-center min-w-[200px]",
                    range === stat.range ? "active" : ""
                  )}
                >
                  <span className={cn("text-secondary text-sm font-medium mb-1", range === stat.range && "text-primary")}>
                    {stat.label}
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    {stat.range === "today"
                      ? formatDate(stat.value as Date)
                      : `${formatDate((stat.value as Date[])[0])} — ${formatDate((stat.value as Date[])[1])}`}
                  </span>
                </div>
              ))}
               
               {privileges?.some((e) => e.privilege === "access_financial") && (
                <div className="flex-1 flex justify-end items-center min-w-[200px]">
                   <div className="text-right">
                      <div className="text-sm text-secondary font-medium mb-1">Gross Revenue</div>
                      <div className="text-4xl font-bold text-primary tracking-tight">
                        <NumberTicker
                          value={Number(grossRevenue._sum.amountAfterVat)}
                          getFormatted={formatCurrency}
                          delay={0.2}
                        />
                      </div>
                   </div>
                </div>
               )}
            </div>

            {/* Table Section */}
            <div className="glass-card rounded-2xl overflow-hidden mx-8">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left border-collapse">
                   <thead>
                     <tr className="glass-table-header">
                       <th className="py-3 px-6 font-semibold">Time</th>
                       <th className="py-3 px-6 font-semibold">Amount</th>
                       <th className="py-3 px-6 font-semibold">Status</th>
                       <th className="py-3 px-6 font-semibold">Customer</th>
                       <th className="py-3 px-6 font-semibold">Contact</th>
                       <th className="py-3 px-6 font-semibold">Promo</th>
                       <th className="py-3 px-6 font-semibold text-right">Type</th>
                     </tr>
                   </thead>
                   <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="p-8 text-center text-secondary">Loading...</td></tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr><td colSpan={7} className="p-8 text-center text-secondary">No orders found.</td></tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="glass-table-row">
                          <td className="py-4 px-6 font-medium text-primary">{formatTime(order.time)}</td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-primary">{formatCurrency(order.amount)}</span>
                            {order.promo && (
                              <span className="text-xs text-secondary line-through ml-2 font-normal">
                                {formatCurrency(order.amount * 1.2)}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {order.status === "finished" ? (
                              <GlassBadge variant="success">Completed</GlassBadge>
                            ) : order.status === "payed" ? (
                              <GlassBadge variant="default">Paid</GlassBadge>
                            ) : (
                              <GlassBadge variant="danger">Unpaid</GlassBadge>
                            )}
                          </td>
                          <td className="py-4 px-6 text-primary font-medium">{order.name || "–"}</td>
                          <td className="py-4 px-6 text-secondary">{order.phone || "–"}</td>
                          <td className="py-4 px-6">
                            {order.promo && (
                              <GlassBadge variant="warning">
                                {order.promo === "global"
                                  ? "Global"
                                  : order.promo === "per article"
                                  ? "Per Article"
                                  : order.promo === "absolute"
                                  ? "Absolute"
                                  : String(order.promo)}
                              </GlassBadge>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                             <span className="text-xs font-medium text-secondary border border-(--glass-border-light) px-2 py-1 rounded-full bg-(--glass-surface-base)">
                                {order.istakeaway ? "Takeaway" : "Dine In"}
                             </span>
                          </td>
                        </tr>
                      ))
                    )}
                   </tbody>
                 </table>
               </div>
               
               {/* Pagination Footer */}
               <div className="px-6 py-4 flex justify-between items-center bg-(--glass-surface-base)">
                  <span className="text-xs text-secondary font-medium">Showing {filteredOrders.length} orders</span>
                  <div className="flex items-center gap-2">
                     <GlassButton variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">1</GlassButton>
                  </div>
               </div>
            </div>
           </div>
        </main>
      </div>
    </div>
  );
}
