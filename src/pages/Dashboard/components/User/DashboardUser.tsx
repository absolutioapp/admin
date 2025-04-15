import React from "react";
import Table from "./components/Table/Table";

import { User } from "./User.types"; // если ты вынес интерфейс User в отдельный файл

const NAMES = [
  "Иван",
  "Мария",
  "Алексей",
  "Екатерина",
  "Дмитрий",
  "Ольга",
  "Никита",
  "Анна",
];
const DOMAINS = ["example.com", "mail.ru", "test.org", "dev.io"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString().split("T")[0]; // формат YYYY-MM-DD
}

function generateUsers(count: number): User[] {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const name = randomItem(NAMES) + " " + randomItem(NAMES);
    const email = `${name.toLowerCase().replace(/ /g, ".")}@${randomItem(DOMAINS)}`;
    const registeredAt = randomDate(new Date(2022, 0, 1), new Date());
    const subscriptionStatus = Math.random() > 0.5 ? "active" : "inactive";

    users.push({
      id: crypto.randomUUID(),
      name,
      email,
      registeredAt,
      subscriptionStatus,
    });
  }

  return users;
}

const DashboardUser = () => {
  return (
    <div>
      <Table users={generateUsers(12)} />
    </div>
  );
};

export default DashboardUser;
