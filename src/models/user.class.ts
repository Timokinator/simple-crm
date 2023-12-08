export class User {
    [x: string]: any;
    id!: string;
    firstName!: string;
    lastName!: string;
    birthDate!: number;
    street!: string;
    zipCode!: string;
    city!: string;
    email!: string



    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email: "";


    }


}