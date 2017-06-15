import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App1SharedModule } from '../../shared';
import {
    CarteService,
    CartePopupService,
    CarteComponent,
    CarteDetailComponent,
    CarteDialogComponent,
    CartePopupComponent,
    CarteDeletePopupComponent,
    CarteDeleteDialogComponent,
    carteRoute,
    cartePopupRoute,
} from './';

const ENTITY_STATES = [
    ...carteRoute,
    ...cartePopupRoute,
];

@NgModule({
    imports: [
        App1SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CarteComponent,
        CarteDetailComponent,
        CarteDialogComponent,
        CarteDeleteDialogComponent,
        CartePopupComponent,
        CarteDeletePopupComponent,
    ],
    entryComponents: [
        CarteComponent,
        CarteDialogComponent,
        CartePopupComponent,
        CarteDeleteDialogComponent,
        CarteDeletePopupComponent,
    ],
    providers: [
        CarteService,
        CartePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App1CarteModule {}
