export class Note {
    [x: string]: any;
    id!: string;
    title!: string;
    content!: string;
    user!: string;
    transform1!: string;
    transform2!: string;





    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.title = obj ? obj.title : '';
        this.content = obj ? obj.content : '';
        this.user = obj ? obj.user : '';
        this.transform1 = obj ? obj.transform1 : '';
        this.transform2 = obj ? obj.transform2 : '';
        
    }




}