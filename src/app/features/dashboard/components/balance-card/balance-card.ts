import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-balance-card',
  imports: [CommonModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.css',
})
export class BalanceCard {
  @Input() balance: number = 0;
  @Input() income: number = 0;
  @Input() expense: number = 0;
} 