export class Customer {
    [x: string]: any;
    id!: string;
    customerNumber!: string;
    name!: string;
    street!: string;
    zipCode!: string;
    city!: string;
    email!: string;
    phone!: string;
    status!: string;
    infotext!: string;



    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.customerNumber = obj ? obj.customerNumber : '';
        this.name = obj ? obj.name : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.status = obj ? obj.status : '';
        this.infotext = obj ? obj.infotext : '';
    }


}