export interface Expense {
  id?: number;
  name: string;
  value: number;
  date: string; // ISO String
  category: string;
}
