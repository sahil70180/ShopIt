import { json } from "express";

class APIFilters{
    constructor (query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    
    search(){
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

    filters(){
        const queryCopy = {...this.queryStr}
        // remove keyword from querycopy because we already handle it in search function  

        const fieldsToRemove = ['keyword']
        fieldsToRemove.forEach((element) => delete queryCopy[element]);
        
        // console.log(queryCopy);

        // advance mongoose filters 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }
}

export default APIFilters;