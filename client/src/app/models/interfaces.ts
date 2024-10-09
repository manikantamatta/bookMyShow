export  interface searchResposne{
    movies:SearchResults[];
    cinemas:SearchResults[];
    events:SearchResults[];

}

export  interface SearchResults{
    name:string;
    _id:string;
}

export interface Filters{
    format:string[];
    genres:string[];
    languages:string[];
}