import { Carte } from '../carte';
export class Bar {
    constructor(
        public id?: number,
        public barName?: string,
        public barAddress?: string,
        public categoryBar?: string,
        public firstcarte?: Carte,
    ) {
    }
}
