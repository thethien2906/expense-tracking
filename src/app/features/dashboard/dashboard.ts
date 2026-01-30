import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  private transactionService = inject(TransactionService);

  // Component properties
  public transactions: Transaction[] = [];
  public stats: BalanceStats = {
    balance: 0,
    income: 0,
    expense: 0
  };

  ngOnInit(): void {
    this.loadTransactions();
  }

  /**
   * Load transactions từ service
   * Phase 2: Lấy mock data trực tiếp
   * Phase 3: Sẽ refactor thành async call
   */
  loadTransactions(): void {
    // Lấy danh sách giao dịch
    this.transactions = this.transactionService.getTransactions();
    
    // Tính toán thống kê
    this.stats = this.transactionService.calculateStats(this.transactions);
  }
}
