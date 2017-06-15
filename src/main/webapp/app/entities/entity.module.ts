import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { App1BarModule } from './bar/bar.module';
import { App1CarteModule } from './carte/carte.module';
import { App1ClientModule } from './client/client.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        App1BarModule,
        App1CarteModule,
        App1ClientModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App1EntityModule {}
