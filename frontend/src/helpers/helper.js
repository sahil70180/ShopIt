export const getPriceQueryParams = (searchParams, key, value) =>{

    // checking that searchParams already has a key or not
    const hasValueInParams = searchParams.has(key);

    // check if already has value and key then it means user want to update the value
    if(value && hasValueInParams){
        searchParams.set(key, value)
    }
    else if(value){
        searchParams.append(key, value);
    }
    else if(hasValueInParams){
        searchParams.delete(key);
    }

    return searchParams;
}