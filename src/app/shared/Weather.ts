export class Weather {
    constructor(public date: string, public condition: string, 
        public cndLong: string, 
        public icon: string,
        public min: number,
        public max: number){};
}