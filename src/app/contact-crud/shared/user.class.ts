/* 
    User class. 
    Contact will be another type like string, boolean or number primitive types.
    This will define the type User we'll use to create our contacts

*/
export class User {
    constructor(public id: number, public name: string, public birthdate: string, public imageUrl: string) {}
}