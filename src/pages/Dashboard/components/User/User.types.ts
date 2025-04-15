export interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  subscriptionStatus: "active" | "inactive";
}
