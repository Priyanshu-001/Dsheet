//TODO: add type safety

export default function(csv,logUpdate=()=>{}){
      let rows = csv.split("\n")
      const nRows = rows.length
      let first =true
      let headers = []
      let entries = []
      rows.forEach((r,index)=>{
       
        let row= r.split(',')
        if(first)
      {
        headers = row.map(item=>{return {text: item, value: item} })
        first = false
        
      }
      else{
      let entry = {}
      let i=0
      for( let header of headers)
      {
        entry[header.value] = row[i]
        i+=1
      }
      entries.push(entry)
      if(index%1000 === 0)
        logUpdate(`${index}/${nRows}`)
      }})
      return {headers,entries}
}