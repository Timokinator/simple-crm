export class Article {
    [x: string]: any;
    id!: string;
    itemNumber!: string;
    itemDesc!: string;
    price!: number;
    category!: string;
    supplier!: string;
    status!: string;
    amount!: number;
    sum!: number;



    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.itemNumber = obj ? obj.itemNumber : '';
        this.itemDesc = obj ? obj.itemDesc : '';
        this.price = obj ? obj.price : '';
        this.category = obj ? obj.category : '';
        this.supplier = obj ? obj.supplier : '';
        this.status = obj ? obj.status : '';
        this.amount = obj ? obj.amount : '';
        this.sum = obj ? obj.sum : '';
    }



}

