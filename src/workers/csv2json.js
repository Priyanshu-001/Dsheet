import csv2json from "../utils/csv2json";


onmessage = function(msg){
    if(msg == undefined || msg == null)
    return
    const  {data} = msg
    function logger(status){

        self.postMessage({state:'running', data:status});
    }
     const result = csv2json(data,logger)
     console.log(result)

    postMessage({state:'done',data:result})
}