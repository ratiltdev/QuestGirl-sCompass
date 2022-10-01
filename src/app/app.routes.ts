import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent, PinComponent, DailyComponent, WeeklyComponent, MonthlyComponent, OthersComponent, YearlyComponent, SearchComponent } from './components/list/list.component';
import { NullComponent, DetailComponent } from './components/detail/detail.component';

const appRoutes: Routes = [
    {
        path: 'search/:keyword',
        component: SearchComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'latest',
        component: ListComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'pin',
        component: PinComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'daily',
        component: DailyComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'weekly',
        component: WeeklyComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'monthly',
        component: MonthlyComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'others',
        component: OthersComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: 'yearly',
        component: YearlyComponent,
        children: [
            {
                path: '',
                component: NullComponent
            },
            {
                path: ':id',
                component: DetailComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'latest',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);