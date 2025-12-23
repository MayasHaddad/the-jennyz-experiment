"use client";

import "./brutalist.css";
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
  FileText,
  PanelLeft,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  Keyboard,
  Carrot,
  ChartArea,
  MonitorPlay,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";

// --- Types ---

type OrderStatus = "not payed" | "payed" | "finished";
type PromoType = "global" | "per article" | "absolute";

interface Order {
  id: string;
  time: string; // ISO date string
  amount: number;
  status: OrderStatus;
  phone: string;
  name: string;
  promo?: PromoType;
  istakeaway: boolean;
}

// --- Components mimicking shadcn/ui ---

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "default" | "sm" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        variant === "outline" &&
          "border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 rounded-md px-3 text-xs",
        size === "icon" && "h-9 w-9",
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" &&
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "secondary" &&
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "destructive" &&
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        variant === "outline" && "text-foreground",
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// --- Main Page Component ---

export default function BrutalistPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"today" | "week" | "month">("today");
  const [range, setRange] = useState<"today" | "week" | "month">("month");
  const [loading, setLoading] = useState(true);

  // Mock date values
  const date = new Date();
  const monthRanges = {
    weekRange: [
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 1
      ),
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 7
      ),
    ],
    monthRange: [
      new Date(date.getFullYear(), date.getMonth(), 1),
      new Date(date.getFullYear(), date.getMonth() + 1, 0),
    ],
  };

  // Mock privileges
  const privileges = [{ privilege: "access_financial" }];

  const handleSelectRange =
    (selectedRange: "today" | "week" | "month") => () => {
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
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (filter === "today") {
      return orderDate >= startOfToday;
    } else if (filter === "week") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return orderDate >= oneWeekAgo;
    } else {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return orderDate >= startOfMonth;
    }
  });

  const totalAmount = filteredOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  // Mock gross revenue - must be after filteredOrders
  const grossRevenue = {
    _sum: {
      amountAfterVat: totalAmount,
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="brutalist-theme h-screen bg-secondary text-foreground flex flex-col font-sans selection:bg-primary/30 overflow-hidden">
      {/* Top Header Bar - spans full width */}
      <header className="h-14 bg-secondary flex items-center px-4 shrink-0">
        {/* Brand section */}
        <div className="flex items-center gap-3 w-[240px]">
          <div className="h-10 w-10 bg-destructive rounded-xl flex items-center justify-center text-destructive-foreground font-serif font-bold text-[11px] overflow-hidden italic">
            Jenny
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none text-card-foreground">
              PAUSE PIZZA
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Restaurant
            </span>
          </div>
          <div className="flex items-center text-muted-foreground ml-1">
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>

        {/* Breadcrumb / page indicator */}
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <PanelLeft className="h-5 w-5 cursor-pointer hover:text-foreground" />
          <span className="text-muted-foreground/40">|</span>
          <span>Orders</span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[240px] p-4 pt-2 hidden lg:flex flex-col bg-secondary">
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto space-y-0.5">
            <div className="flex items-center gap-3 px-3 py-2.5 text-card-foreground text-sm font-medium cursor-pointer border-l-2 border-card-foreground bg-card">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <Box className="h-4 w-4" />
              Inventory
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <BookOpen className="h-4 w-4" />
              Catalog
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <Carrot className="h-4 w-4" />
              Raw Materials
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <ShieldCheck className="h-4 w-4" />
              Health & Safety
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <ChartArea className="h-4 w-4" />
              Analytics
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <Users className="h-4 w-4" />
              Customers
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <Calendar className="h-4 w-4" />
              Recurring
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <PanelLeft className="h-4 w-4" />
              Operations
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <FileText className="h-4 w-4" />
              Audit
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground text-sm font-medium cursor-pointer transition-colors border-l-2 border-transparent hover:border-muted-foreground/30">
              <Settings className="h-4 w-4" />
              Settings
            </div>
          </div>

          {/* User Profile Footer */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 px-2 text-muted-foreground text-sm font-medium mb-6 cursor-pointer hover:text-foreground">
              <Keyboard className="h-5 w-5" />
              <span>Shortcuts</span>
              <span className="opacity-60">⌘K</span>
            </div>
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 bg-muted rounded-full overflow-hidden">
                <Image
                  src="/alex.png"
                  alt="Alex D."
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-card-foreground truncate">
                  Alex D.
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  alex.dupont@gm...
                </span>
              </div>
              <div className="ml-auto text-muted-foreground flex flex-col items-center justify-center gap-0">
                <ChevronsUpDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - with rounded top-left corner */}
        <main className="flex-1 overflow-y-auto bg-background shadow-md rounded-tl-2xl">
          <header className="flex justify-between items-center mb-8 sticky top-0 bg-background z-10 py-4 pt-8 px-4 -mt-4">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Orders
              </h1>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md h-8 w-8 cursor-pointer"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <button className="text-sm font-bold text-primary flex items-center gap-2 hover:opacity-80 hover:underline cursor-pointer transition-opacity">
              <MonitorPlay className="h-4 w-4" />
              Live Orders
              <ExternalLink className="h-3 w-3" />
            </button>
          </header>

          <div className="hidden lg:flex gap-4 px-4">
            <Card
              className={cn(
                "rounded-md w-64 cursor-pointer bg-card shadow-sm border-secondary",
                {
                  "border-foreground": range === "today",
                }
              )}
              role="button"
              onClick={handleSelectRange("today")}
            >
              <CardHeader>
                <CardTitle
                  className={cn("text-foreground", {
                    "font-normal text-xl": range !== "today",
                  })}
                >
                  {"Today"}
                </CardTitle>
                <CardDescription>
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(date)}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={cn(
                "rounded-md w-64 cursor-pointer bg-card shadow-sm border-secondary",
                {
                  "border-foreground": range === "week",
                }
              )}
              role="button"
              onClick={handleSelectRange("week")}
            >
              <CardHeader>
                <CardTitle
                  className={cn("text-foreground", {
                    "font-normal text-xl": range !== "week",
                  })}
                >
                  {"This Week"}
                </CardTitle>
                <CardDescription>
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(monthRanges?.weekRange[0])}
                  {" — "}
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(monthRanges?.weekRange[1])}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={cn(
                "rounded-md w-64 cursor-pointer bg-card shadow-sm border-secondary",
                {
                  "border-foreground": range === "month",
                }
              )}
              role="button"
              onClick={handleSelectRange("month")}
            >
              <CardHeader>
                <CardTitle
                  className={cn("text-foreground", {
                    "font-normal text-xl": range !== "month",
                  })}
                >
                  {"This Month"}
                </CardTitle>
                <CardDescription>
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(monthRanges?.monthRange[0])}
                  {" — "}
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(monthRanges?.monthRange[1])}
                </CardDescription>
              </CardHeader>
            </Card>

            {privileges?.some(
              (e: { privilege: string }) => e.privilege === "access_financial"
            ) && (
              <div className="flex grow items-center justify-end">
                <h1 className="text-4xl font-bold">
                  {grossRevenue?._sum?.amountAfterVat ? (
                    <NumberTicker
                      value={Number(grossRevenue._sum.amountAfterVat)}
                      getFormatted={(amount: number) => {
                        return Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(amount);
                      }}
                      delay={0.2}
                      stiffness={200}
                      damping={40}
                    />
                  ) : (
                    Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(0)
                  )}
                </h1>
              </div>
            )}
          </div>
          {/* Table */}
          <div className="rounded-xl border-none bg-transparent">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse mt-4">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="h-12 px-4 font-medium text-left">Time</th>
                    <th className="h-12 px-4 font-medium text-left">Amount</th>
                    <th className="h-12 px-4 font-medium text-left">Status</th>
                    <th className="h-12 px-4 font-medium text-left">Phone</th>
                    <th className="h-12 px-4 font-medium text-left">Name</th>
                    <th className="h-12 px-4 font-medium text-left"></th>
                    <th className="h-12 px-4 font-medium text-left">Promo</th>
                    <th className="h-12 px-4 font-medium text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y-0">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-8 text-center text-muted-foreground"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No orders.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="group hover:bg-secondary transition-colors border-b border-transparent"
                      >
                        <td className="py-5 px-4 font-medium text-foreground">
                          {formatTime(order.time)}
                        </td>
                        <td className="py-5 px-4 font-medium text-foreground">
                          <span className="font-semibold">
                            {formatCurrency(order.amount)}
                          </span>
                          {order.promo && (
                            <span className="text-xs text-muted-foreground line-through font-normal ml-2">
                              {formatCurrency(order.amount * 1.2)}
                            </span>
                          )}
                        </td>
                        <td className="py-5 px-4">
                          {order.status === "finished" ? (
                            <Badge
                              variant="secondary"
                              className="text-[0.65rem] sm:text-xs rounded-full"
                            >
                              Completed
                            </Badge>
                          ) : order.status === "payed" ? (
                            <Badge
                              variant="default"
                              className="text-[0.65rem] sm:text-xs rounded-full"
                            >
                              Paid
                            </Badge>
                          ) : (
                            <Badge
                              variant="destructive"
                              className="whitespace-nowrap text-[0.65rem] sm:text-xs rounded-full"
                            >
                              Unpaid
                            </Badge>
                          )}
                        </td>
                        <td className="py-5 px-4 font-medium text-foreground text-sm">
                          {order.phone ? order.phone : "–"}
                        </td>
                        <td className="py-5 px-4 font-medium text-foreground">
                          {order.name || "–"}
                        </td>
                        <td className="py-5 px-4">
                          {/* Online order badge placeholder - would check order.customerOrder in real app */}
                        </td>
                        <td className="py-5 px-4">
                          {order.promo && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-warning whitespace-nowrap rounded-full"
                            >
                              {order.promo === "global"
                                ? "Global Discount"
                                : order.promo === "per article"
                                ? "Per Item Discount"
                                : "Absolute Discount"}
                            </Badge>
                          )}
                        </td>
                        <td className="py-5 px-4 text-right">
                          <Badge
                            variant="outline"
                            className="text-[0.65rem] sm:text-xs whitespace-nowrap rounded-full"
                          >
                            {order.istakeaway ? "Takeaway" : "Dine In"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-muted-foreground text-sm px-4">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md border border-muted-foreground/30 bg-card flex items-center gap-2 text-foreground">
                  10 <ChevronDown className="h-3 w-3" />
                </div>
                <span>— of {filteredOrders.length}</span>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0 border-muted-foreground/30 bg-card text-foreground hover:bg-accent"
                >
                  1
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
