import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BarComponent } from './bar.component';
import { BarDetailComponent } from './bar-detail.component';
import { BarPopupComponent } from './bar-dialog.component';
import { BarDeletePopupComponent } from './bar-delete-dialog.component';

import { Principal } from '../../shared';

export const barRoute: Routes = [
    {
        path: 'bar',
        component: BarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.bar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bar/:id',
        component: BarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.bar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const barPopupRoute: Routes = [
    {
        path: 'bar-new',
        component: BarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.bar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar/:id/edit',
        component: BarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.bar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar/:id/delete',
        component: BarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.bar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
