import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ResumeComponent } from '../resume/resume.component';

@Injectable({
    providedIn: 'root',
})
export class RouteLoader {
    constructor(
        private client: HttpClient,
        private router: Router) /* 1 */ { }

    public load() {
        return this.client.get('/my-routes')
            .pipe(switchMap(json => this.createRoutes(json)));
    }

    private createRoutes(json) {
        return from(json.routeSpecs).pipe( // 2
            map(spec => this.toCrudRoutes(spec)), // 3
            map(routes => ([ // 4
                ...this.router.config,
                ...routes,
            ])),
            map(newRoutes => this.router.resetConfig(newRoutes)) // 5
        );
    }

    private toCrudRoutes(entities) {
        return Object.keys(entities)
            .map(it => ([
                {
                  path: `${entities[it].name}s`,
                  component: ResumeComponent,
                },
                {
                  path: `${entities[it].name}`,
                  component: ResumeComponent,
                },
                {
                  path: `${entities[it].name}/:id`,
                  component: ResumeComponent,
                },
            ]).reduce((agg, item) => ([...agg, ...item]), []))
    }
}
