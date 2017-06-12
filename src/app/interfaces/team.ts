export interface Team{
    id : number,
    name : string,
    associations_id : number,
    association : {
            id : number,
            name: string,
            avatar? : string,
            users_id : number 
            },
    email? : string,
    website? : string,
    facebook? : string,
    twitter? : string,
    googleplus? : string,
    address? : string,
    arena? : string,
    logo? : string
}