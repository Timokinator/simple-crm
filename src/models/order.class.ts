import { Article } from "./article.class";
import { Customer } from "./customer.class";

export class Order {
    [x: string]: any;
    id!: string;
    orderNumber!: string;
    customer!: Customer;
    orderDate!: number;
    deliveryDate!: number;
    status!: string;
    note!: string;
    positions!: Article[];


    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.orderNumber = obj ? obj.orderNumber : '';
        this.customer = obj ? obj.customer : '';
        this.orderDate = obj ? obj.orderDate : '';
        this.deliveryDate = obj ? obj.deliveryDate : '';
        this.status = obj ? obj.status : '';
        this.note = obj ? obj.note : '';
        this.positions = obj ? obj.positions : '';
    }

}