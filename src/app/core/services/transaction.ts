import { Injectable, signal } from '@angular/core';
import { Transaction, BalanceStats, TransactionType } from '../models/transaction.model';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 5000000,
      date: '2025-01-15',
      note: 'Lương tháng 1',
      categoryId: 1,
      type: 'income'
    },
    {
      id: '2',
      amount: 500000,
      date: '2025-01-16',
      note: 'Ăn trưa với đồng nghiệp',
      categoryId: 2,
      type: 'expense'
    },
    {
      id: '3',
      amount: 200000,
      date: '2025-01-17',
      note: 'Đổ xăng xe',
      categoryId: 3,
      type: 'expense'
    },
    {
      id: '4',
      amount: 1500000,
      date: '2025-01-18',
      note: 'Freelance project',
      categoryId: 4,
      type: 'income'
    },
    {
      id: '5',
      amount: 800000,
      date: '2025-01-19',
      note: 'Mua đồ dùng gia đình',
      categoryId: 5,
      type: 'expense'
    },
    {
      id: '6',
      amount: 300000,
      date: '2025-01-20',
      note: 'Tiền điện tháng 1',
      categoryId: 6,
      type: 'expense'
    },
    {
      id: '7',
      amount: 2000000,
      date: '2025-01-21',
      note: 'Thưởng dự án',
      categoryId: 1,
      type: 'income'
    },
    {
      id: '8',
      amount: 150000,
      date: '2025-01-22',
      note: 'Cà phê sáng',
      categoryId: 2,
      type: 'expense'
    }
  ];
  // Signal để lưu danh sách giao dịch (reactive state)
  private transactionsSignal = signal<Transaction[]>(this.mockTransactions);

  // Expose read-only signal
  transactions = this.transactionsSignal.asReadonly();
    
  constructor() { }

  getTransactions(): Transaction[] {
    return this.transactionsSignal();
  }

  calculateStats(transactions: Transaction[]): BalanceStats{
    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    }

    const balance = totalIncome - totalExpense;

    return {
      income: totalIncome,
      expense: totalExpense,
      balance
    };
  }
  stats = computed(() => {
    const transactions = this.transactionsSignal();
    return this.calculateStats(transactions);
  })
}
