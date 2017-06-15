import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarService } from './bar.service';

@Component({
    selector: 'jhi-bar-detail',
    templateUrl: './bar-detail.component.html'
})
export class BarDetailComponent implements OnInit, OnDestroy {

    bar: Bar;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private barService: BarService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBars();
    }

    load(id) {
        this.barService.find(id).subscribe((bar) => {
            this.bar = bar;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'barListModification',
            (response) => this.load(this.bar.id)
        );
    }
}
