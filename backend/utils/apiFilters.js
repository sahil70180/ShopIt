class APIFilters{
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    
    serarch(){
        // search using ternary operator 
        // if found then serch 
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i", // keyword is case insensitive
            }
        }
        // otherwise return empty object 
        : {};

    this.query = this.query.find({...keyword});
    return this;
    }
}

export default APIFilters;