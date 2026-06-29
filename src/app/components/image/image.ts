import { Component, effect, input, signal } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image',
  imports: [NzImageModule, NgOptimizedImage],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image {
  src = input.required<string>();
  alt = input('');

  width = input.required<number>();
  height = input.required<number>();

  loaded = signal(false);

  constructor() {
    effect(() => {
      this.src();
      this.loaded.set(false);
    });
  }

  onLoad() {
    this.loaded.set(true);
  }
}
