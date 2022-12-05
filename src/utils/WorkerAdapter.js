export const workerAdapter =  function(fnMap,warn=true){
    return function({data})
        {   let  {data:val,state} = data
            
            if(state in fnMap )
                return fnMap[state](val)
            
            else if(warn)// not found & warn == true
                console.warn(`state: ${state} missing appropiate handler in fnMap`)
        }
}