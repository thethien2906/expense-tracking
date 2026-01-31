import { computed, Injectable, signal, inject } from '@angular/core';
import { Transaction, BalanceStats, TransactionType } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
   // Inject HttpClient
  private http = inject(HttpClient);
  // API Base URL
  private apiUrl = 'http://localhost:3000/transactions';
  // Signal để lưu danh sách giao dịch (ban đầu rỗng)
  private transactionsSignal = signal<Transaction[]>([]);
  // Expose read-only signal
  transactions = this.transactionsSignal.asReadonly();
    
  constructor() { }
  loadTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl)
      .pipe(
        tap(transactions => {
          this.transactionsSignal.set(transactions);
          console.log('✅ Transactions loaded successfully');
        })
      );
  }
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
  });
}
