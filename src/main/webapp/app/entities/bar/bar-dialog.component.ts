import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarPopupService } from './bar-popup.service';
import { BarService } from './bar.service';
import { Carte, CarteService } from '../carte';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bar-dialog',
    templateUrl: './bar-dialog.component.html'
})
export class BarDialogComponent implements OnInit {

    bar: Bar;
    authorities: any[];
    isSaving: boolean;

    firstcartes: Carte[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private barService: BarService,
        private carteService: CarteService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.carteService
            .query({filter: 'bar-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.bar.firstcarte || !this.bar.firstcarte.id) {
                    this.firstcartes = res.json;
                } else {
                    this.carteService
                        .find(this.bar.firstcarte.id)
                        .subscribe((subRes: Carte) => {
                            this.firstcartes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.barService.update(this.bar), false);
        } else {
            this.subscribeToSaveResponse(
                this.barService.create(this.bar), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Bar>, isCreated: boolean) {
        result.subscribe((res: Bar) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Bar, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'app1App.bar.created'
            : 'app1App.bar.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'barListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackCarteById(index: number, item: Carte) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bar-popup',
    template: ''
})
export class BarPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barPopupService: BarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.barPopupService
                    .open(BarDialogComponent, params['id']);
            } else {
                this.modalRef = this.barPopupService
                    .open(BarDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
