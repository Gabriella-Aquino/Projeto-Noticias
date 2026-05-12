import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | null | undefined): string {
    if (!value) return '';

    const now = new Date().getTime();
    const date = new Date(value).getTime();

    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return 'agora mesmo';
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `há ${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `há ${hours} h`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
      return `há ${days} dias`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `há ${months} meses`;
    }

    const years = Math.floor(months / 12);

    return `há ${years} anos`;
  }
}
