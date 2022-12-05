

export default 
    function(fn){
      
       return (self.onmessage =  function(data){
            console.log("I am worker")
        function logger(status){   
            postMessage({state:'running',data:status});
        }
        const result = fn(data,logger)
        console.log(result)
        postMessage({state:'finished',data:result})
    })
}