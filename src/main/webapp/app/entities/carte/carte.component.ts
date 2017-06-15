import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Carte } from './carte.model';
import { CarteService } from './carte.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-carte',
    templateUrl: './carte.component.html'
})
export class CarteComponent implements OnInit, OnDestroy {
cartes: Carte[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private carteService: CarteService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.carteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cartes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCartes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Carte) {
        return item.id;
    }
    registerChangeInCartes() {
        this.eventSubscriber = this.eventManager.subscribe('carteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
