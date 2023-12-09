import { User } from "./user.class";

export class Note {
    [x: string]: any;
    id!: string;
    title!: string;
    content!: string;
    user!: User;



    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.title = obj ? obj.title : '';
        this.content = obj ? obj.content : '';
        this.user = obj ? obj.user : ''
    }


}