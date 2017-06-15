import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { App1TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BarDetailComponent } from '../../../../../../main/webapp/app/entities/bar/bar-detail.component';
import { BarService } from '../../../../../../main/webapp/app/entities/bar/bar.service';
import { Bar } from '../../../../../../main/webapp/app/entities/bar/bar.model';

describe('Component Tests', () => {

    describe('Bar Management Detail Component', () => {
        let comp: BarDetailComponent;
        let fixture: ComponentFixture<BarDetailComponent>;
        let service: BarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App1TestModule],
                declarations: [BarDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BarService,
                    EventManager
                ]
            }).overrideTemplate(BarDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bar(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bar).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
