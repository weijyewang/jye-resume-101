import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { RouteLoader } from './route-loader.service';

export function ensureRoutesExist( // 1
    http: HttpClient,
    routeLoader: RouteLoader) {
  return () => lastValueFrom(routeLoader.load()); // 3
}
