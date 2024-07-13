export interface Expense {
  id?: number;
  name: string;
  amount: number;
  date: string; // ISO String
  category: string;
}
