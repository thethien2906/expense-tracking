import { Component, OnInit, inject, computed } from '@angular/core';
import { TransactionService } from '../../core/services/transaction';
import { Transaction, BalanceStats } from '../../core/models/transaction.model';
import { BalanceCard } from './components/balance-card/balance-card';
import { TransactionList } from './components/transaction-list/transaction-list';

@Component({
  selector: 'app-dashboard',
  imports: [BalanceCard,TransactionList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard implements OnInit {
  // Inject service
  transactionService = inject(TransactionService);
  // State management
  isLoading = true;
  error: string | null = null;
  
  // Use signals directly from service instead of copying to component properties
  transactions = this.transactionService.transactions;
  stats = this.transactionService.stats;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.transactionService.loadTransactions().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải dữ liệu. Vui lòng thử lại!';
        this.isLoading = false;
        console.error('Error loading transactions:', error);
      }
    });
  }
}
