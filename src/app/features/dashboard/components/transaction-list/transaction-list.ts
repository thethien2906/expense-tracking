import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../core/models/transaction.model';
@Component({
  selector: 'app-transaction-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {
  @Input() transactions: Transaction[] = [];
  getCategoryIcon(categoryId: number): string {
    const icons: { [key: number]: string } = {
      1: '💰', 2: '🎉', 3: '💼',
      4: '🍔', 5: '🚗', 6: '🏠', 7: '🎮', 8: '📱'
    };
    return icons[categoryId] || '💵';
  }

  getCategoryName(categoryId: number): string {
    const names: { [key: number]: string } = {
      1: 'Lương', 2: 'Thưởng', 3: 'Đầu tư',
      4: 'Ăn uống', 5: 'Xăng xe', 6: 'Thuê nhà', 7: 'Giải trí', 8: 'Mua sắm'
    };
    return names[categoryId] || 'Khác';
  }
}
