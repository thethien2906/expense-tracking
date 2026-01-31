import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../core/services/transaction';
import { Transaction, BalanceStats } from '../../core/models/transaction.model';
import { BalanceCard } from './components/balance-card/balance-card';
import { TransactionList } from './components/transaction-list/transaction-list';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, BalanceCard, TransactionList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard implements OnInit {
  // Inject service
  transactionService = inject(TransactionService);
  // State management
  isLoading = signal(true);
  error = signal<string | null>(null);
  
  // Use signals directly from service instead of copying to component properties
  transactions = this.transactionService.transactions;
  stats = this.transactionService.stats;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.transactionService.loadTransactions().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set('Không thể tải dữ liệu. Vui lòng thử lại!');
        this.isLoading.set(false);
        console.error('Error loading transactions:', error);
      }
    });
  }
}
