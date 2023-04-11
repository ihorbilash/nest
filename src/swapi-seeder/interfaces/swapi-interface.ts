
export interface SwapiSeederInterface {

    count: number,
    next?: string,
    previous?: string,
    results: SwapiEntity[]

}


export interface SwapiEntity {
    [key: string]: string | Number | [];
}

export interface SaveRelationEntity {
    [key: string]: { [key: string]: Number[] }
}

























/*

export interface SwapiResponse {
    count: number;
    next?: string;
    previous?: string;
    results: SwapiEntity[];
    detail?: string;
}

export interface SwapiEntity {
    [key: string]: string | string[] | number;
    url: string; 
}

*/