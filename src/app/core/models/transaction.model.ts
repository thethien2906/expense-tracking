// Định nghĩa kiểu cho loại giao dịch
export type TransactionType = 'income' | 'expense';

// Model cho Giao dịch
export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO string format
  note: string;
  categoryId: number;
  type: TransactionType;
}

// Model cho Danh mục
export interface Category {
  id: number;
  name: string;
  icon: string;
  type: TransactionType;
}

// Model cho thống kê
export interface BalanceStats {
  balance: number;
  income: number;
  expense: number;
}
