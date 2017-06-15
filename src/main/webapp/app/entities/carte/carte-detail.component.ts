import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Carte } from './carte.model';
import { CarteService } from './carte.service';

@Component({
    selector: 'jhi-carte-detail',
    templateUrl: './carte-detail.component.html'
})
export class CarteDetailComponent implements OnInit, OnDestroy {

    carte: Carte;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private carteService: CarteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCartes();
    }

    load(id) {
        this.carteService.find(id).subscribe((carte) => {
            this.carte = carte;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCartes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carteListModification',
            (response) => this.load(this.carte.id)
        );
    }
}
