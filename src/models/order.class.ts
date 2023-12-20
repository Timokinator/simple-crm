import { Customer } from "./customer.class";
import { Article } from "./article.class";


export class Order {
    [x: string]: any;
    id!: string;
    orderNumber!: string;
    customer!: Customer;
    orderDate!: number;
    deliveryDate!: Date;
    status!: string;
    note!: string;
    positions!: Article[];
    sum!: number;


    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.orderNumber = obj ? obj.orderNumber : '';
        this.customer = obj ? obj.customer : '';
        this.orderDate = obj ? obj.orderDate : '';
        this.deliveryDate = obj ? obj.deliveryDate : '';
        this.status = obj ? obj.status : '';
        this.note = obj ? obj.note : '';
        this.positions = obj ? obj.positions : '';
        this.sum = obj ? obj.sum : '';

    }

}