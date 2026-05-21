import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { newsMock } from '../../mocks/news';
import { AUTHORS_MOCK } from '../../mocks/author';
import { LogoWithRedirect } from '../../logo-with-redirect/logo-with-redirect';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [DatePipe, RouterLink, LogoWithRedirect], 
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  private route = inject(ActivatedRoute);
  imageLoaded = signal(false);

  newsData = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return newsMock.find(n => n.id === Number(id));
  });

  authorData = computed(() => {
    const authorId = this.newsData()?.author;
    if (!authorId) return null;
    return AUTHORS_MOCK.find(a => a.id === authorId);
  });

  updatedAtDate = computed(() => {
    const date = this.newsData()?.updated;
    return date ? new Date(date) : null;
  });

  timeAgo = computed(() => {
    const updated = this.updatedAtDate();
    if (!updated) return '';
    const now = Date.now();
    const diffInSeconds = Math.floor((now - updated.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  });

  constructor() {
    effect(() => {
      this.newsData()?.image;
      this.imageLoaded.set(false);
    });
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }
}
