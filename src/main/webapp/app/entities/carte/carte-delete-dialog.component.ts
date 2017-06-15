import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Carte } from './carte.model';
import { CartePopupService } from './carte-popup.service';
import { CarteService } from './carte.service';

@Component({
    selector: 'jhi-carte-delete-dialog',
    templateUrl: './carte-delete-dialog.component.html'
})
export class CarteDeleteDialogComponent {

    carte: Carte;

    constructor(
        private carteService: CarteService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carteListModification',
                content: 'Deleted an carte'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('app1App.carte.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-carte-delete-popup',
    template: ''
})
export class CarteDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartePopupService: CartePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.cartePopupService
                .open(CarteDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
