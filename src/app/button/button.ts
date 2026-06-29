import { Component, input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input<string>();
  variant = input<'primary' | 'default' | 'dashed' | 'link' | 'text'>('primary');
  icon = input<string | null>(null);
}
