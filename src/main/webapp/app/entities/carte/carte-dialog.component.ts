import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Carte } from './carte.model';
import { CartePopupService } from './carte-popup.service';
import { CarteService } from './carte.service';

@Component({
    selector: 'jhi-carte-dialog',
    templateUrl: './carte-dialog.component.html'
})
export class CarteDialogComponent implements OnInit {

    carte: Carte;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private carteService: CarteService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carte.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carteService.update(this.carte), false);
        } else {
            this.subscribeToSaveResponse(
                this.carteService.create(this.carte), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Carte>, isCreated: boolean) {
        result.subscribe((res: Carte) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Carte, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'app1App.carte.created'
            : 'app1App.carte.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'carteListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-carte-popup',
    template: ''
})
export class CartePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartePopupService: CartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.cartePopupService
                    .open(CarteDialogComponent, params['id']);
            } else {
                this.modalRef = this.cartePopupService
                    .open(CarteDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
