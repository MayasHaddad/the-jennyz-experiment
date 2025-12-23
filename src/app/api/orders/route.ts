import { NextResponse } from 'next/server';

export type OrderStatus = 'not payed' | 'payed' | 'finished';
export type PromoType = 'global' | 'per article' | 'absolute';

export interface Order {
  id: string;
  time: string; // ISO date string
  amount: number;
  status: OrderStatus;
  phone: string;
  name: string;
  promo?: PromoType; // Optional as not every order might have a promo
  istakeaway: boolean;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Emily', 'Robert', 'Olivia', 'William', 'Ava', 'Joseph', 'Sophia', 'Charles', 'Mia'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

function generateName(): string {
  return `${getRandomArrayElement(FIRST_NAMES)} ${getRandomArrayElement(LAST_NAMES)}`;
}

function generatePhone(): string {
  return `+33${getRandomInt(600000000, 799999999)}`;
}

function generateOrders(): Order[] {
  const orders: Order[] = [];
  const now = new Date();
  
  const generateOrder = (date: Date): Order => {
    const hasContactInfo = Math.random() > 0.4; // 60% chance to have contact info
    return {
      id: Math.random().toString(36).substring(2, 9),
      time: date.toISOString(),
      amount: getRandomInt(10, 150) + (getRandomInt(0, 99) / 100),
      status: getRandomArrayElement(['not payed', 'payed', 'finished']),
      phone: hasContactInfo ? generatePhone() : '',
      name: hasContactInfo ? generateName() : '',
      promo: Math.random() > 0.7 ? getRandomArrayElement(['global', 'per article', 'absolute']) : undefined,
      istakeaway: Math.random() > 0.3, // 70% takeaway to match screenshot
    };
  };

  // 3 orders today
  for (let i = 0; i < 3; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - getRandomInt(0, 12));
    date.setMinutes(getRandomInt(0, 59));
    orders.push(generateOrder(date));
  }

  // 6 orders this week (1-6 days ago)
  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - getRandomInt(1, 6));
    date.setHours(getRandomInt(9, 22));
    date.setMinutes(getRandomInt(0, 59));
    orders.push(generateOrder(date));
  }

  // 10 orders this month (7-29 days ago)
  for (let i = 0; i < 10; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - getRandomInt(7, 29));
    date.setHours(getRandomInt(9, 22));
    date.setMinutes(getRandomInt(0, 59));
    orders.push(generateOrder(date));
  }

  // Sort by time descending
  return orders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

export async function GET() {
  const orders = generateOrders();
  return NextResponse.json(orders);
}
