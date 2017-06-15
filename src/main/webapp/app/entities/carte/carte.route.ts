import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CarteComponent } from './carte.component';
import { CarteDetailComponent } from './carte-detail.component';
import { CartePopupComponent } from './carte-dialog.component';
import { CarteDeletePopupComponent } from './carte-delete-dialog.component';

import { Principal } from '../../shared';

export const carteRoute: Routes = [
    {
        path: 'carte',
        component: CarteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.carte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'carte/:id',
        component: CarteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.carte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cartePopupRoute: Routes = [
    {
        path: 'carte-new',
        component: CartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.carte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carte/:id/edit',
        component: CartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.carte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carte/:id/delete',
        component: CarteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app1App.carte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
