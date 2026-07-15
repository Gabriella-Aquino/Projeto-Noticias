import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private http = inject(HttpClient);
  private storageUrl = environment.supabaseUrl.replace('/rest/v1/', '/storage/v1/');

  uploadImage(file: File, bucket: string): Observable<string> {
    const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const headers = new HttpHeaders({ 'Content-Type': file.type });

    return this.http
      .post(`${this.storageUrl}object/${bucket}/${path}`, file, { headers })
      .pipe(map(() => `${this.storageUrl}object/public/${bucket}/${path}`));
  }
}
