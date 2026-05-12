import { Component, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface IQuotationInfo {
  dollar: number;
  euro: number;
}

@Component({
  selector: 'app-quotation-card',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './quotation-card.html',
  styleUrl: './quotation-card.scss',
})
export class QuotationCard {
  infos = input<IQuotationInfo>();
}
