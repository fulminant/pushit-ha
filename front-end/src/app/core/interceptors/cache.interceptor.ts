import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

// Super basic caching interceptor implementation.
// For sure, it not production ready and created only as POC.
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { expire: number; event: any }>();
  private cacheExpiry = 30_000;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    if (cachedResponse && !this.isCacheExpired(cachedResponse?.expire)) {
      return of(cachedResponse?.event);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, { event, expire: new Date().getTime() + this.cacheExpiry });
        }
      })
    );
  }

  private isCacheExpired(expire: number): boolean {
    return Date.now() > expire;
  }
}
