import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { App1TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CarteDetailComponent } from '../../../../../../main/webapp/app/entities/carte/carte-detail.component';
import { CarteService } from '../../../../../../main/webapp/app/entities/carte/carte.service';
import { Carte } from '../../../../../../main/webapp/app/entities/carte/carte.model';

describe('Component Tests', () => {

    describe('Carte Management Detail Component', () => {
        let comp: CarteDetailComponent;
        let fixture: ComponentFixture<CarteDetailComponent>;
        let service: CarteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [App1TestModule],
                declarations: [CarteDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CarteService,
                    EventManager
                ]
            }).overrideTemplate(CarteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarteService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Carte(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.carte).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
