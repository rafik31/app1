import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarPopupService } from './bar-popup.service';
import { BarService } from './bar.service';

@Component({
    selector: 'jhi-bar-delete-dialog',
    templateUrl: './bar-delete-dialog.component.html'
})
export class BarDeleteDialogComponent {

    bar: Bar;

    constructor(
        private barService: BarService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.barService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'barListModification',
                content: 'Deleted an bar'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('app1App.bar.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-bar-delete-popup',
    template: ''
})
export class BarDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barPopupService: BarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.barPopupService
                .open(BarDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
