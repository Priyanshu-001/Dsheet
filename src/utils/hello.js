onmessage =  function(msg)
{   if(msg == undefined || msg == null)
        return
   const  {data} = msg
    console.log(data)
    console.log("OKAY")
    postMessage("BYe")
}