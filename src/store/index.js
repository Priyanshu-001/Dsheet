// import { entries, values } from 'core-js/core/array'
//import { entries } from 'core-js/core/array'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    configData: {},
    index: null,
    doneParsing: true,
    label2Type: [],
    colorObj: {},
    // headers: [
      
    //   {
    //     text: 'name',
    //     align: 'start',
    //     sortable: false,
    //     value: 'name',
    //   },
    //   { text: 'calories', value: 'calories' },
    //   { text: 'fat', value: 'fat' },
    //   { text: 'carbs', value: 'carbs' },
    //   { text: 'protein', value: 'protein' },
    //   { text: 'iron', value: 'iron' },
    // ],
    colorArray: [],
    csv: "",
    // entries: [
    //   {
    //     name: 'Frozen Yogurt',
    //     calories: 159,
    //     fat: 6.0,
    //     carbs: 24,
    //     protein: 4.0,
    //     iron: 1,
    //   },
    //   {
    //     name: 'Ice cream sandwich',
    //     calories: 237,
    //     fat: 9.0,
    //     carbs: 37,
    //     protein: 4.3,
    //     iron: 2,
    //   },
    // ],
    headers: [],
    entries: []
  },
  mutations: {
   
    csv2json: (state,csv)=>{
      let rows = csv.split("\r\n")
      let first =true
      let entries = []
      rows.forEach(r=>{
        console.log(r)
        let row= r.split(',')
        if(first)
      {
        state.headers = row.map(item=>{return {text: item, value: item} })
        first = false
        
      }
      else{
      let entry = {}
      let i=0
      for( let header of state.headers)
      {
        entry[header.value] = row[i]
        i+=1
      }
      entries.push(JSON.parse(JSON.stringify(entry)))

      }})
      state.entries = JSON.parse(JSON.stringify(entries))
      state.doneParsing = true
    
    },
    notDoneParsing:(state,val=false)=>{
      state.doneParsing=val
    },
    defaultIndex: (state,titles)=>{
      if(titles.length>0 && state.index===null)
      {
        state.index=titles[0]
      }
    },
    addEntry: (state)=>{
        state.entries.push({})
    },
    addHeader: (s,newHeader)=>{
      s.headers.push(newHeader)
      if (s.index===null){

      
      s.index = s.headers[0].value

    }
  },
    changeIndex:(state,index)=>{
      state.index = index
    },
    createcsv: (state,table_titles)=>{
      //let titles = state.headers.map(obj=> {return obj.value} )
      let titles = table_titles.join(',')
      let csv = []
      csv.push(titles)
      state.entries.forEach(entry=>{
        let line = []
        for(var a of table_titles)
        {
          line.push(entry[a])
          
        }
        let csv_line = line.join(',')
        csv.push(csv_line)
        
      })
     let  final_csv = csv.join("\r\n")
    
      state.csv = final_csv
    },
    getConfigReady: (state,[labels,chartTypes])=>{

      for(let label of labels)
      { if (!(label in state.configData))
        state.configData[label]=chartTypes[Math.floor(Math.random()*chartTypes.length)]
      }
     
    },
    patchColorObj(state,[val,label]){
      state.colorObj[label]=val
      state.colorObj = JSON.parse(JSON.stringify(state.colorObj))
    },
    patchConfig: (state,[val,label])=>{
      state.configData[label]=val
      state.configData = JSON.parse(JSON.stringify(state.configData))
    }
  },
  actions: {
    addEntry: (context)=>{
      context.commit('addEntry')
    },
    addHeader: (s,header)=>{
     
      s.commit('addHeader',header)
    }
  },
  modules: {
  },
  getters: {
    index: state=>{return state.index},
    doneParsing: state=>{return state.doneParsing},
    configData: state=>{
          return state.configData
    },
    lables: state=>{
      
      return state.entries.map(obj=>{return obj[state.index] || 'empty label'})
    },
    allowedHeaders: (state)=>{
      return state.headers
    },
    labels2: (state,getters)=>{
      return getters.titles.filter(el=>el!=state.index)
    },
    titles:state=>{
      return state.headers.map(obj=> {return obj.value} )
    },
    slice: (state)=>(point)=>{
        let values = []
        state.entries.forEach(value=>{
          values.push(value[point] || 12)
        })
        return values
        
    },
    slice2: ()=>(entry,index)=>{
     let series = []  
      for(let item in entry)
        { 
          if(item!=index)
          {
            series.push(entry[item] || 12)
          }
        }
        return series
    },
    colorObj: (state)=>{
      return state.colorObj
    },
    
    plotData2: (state,getters)=>(index,chartType=['bar'])=>{
      let dataSet = []
      state.entries.forEach((entry,i)=>{
        
        let point = {
          label: entry[index],
          type: chartType[i%chartType.length],
          borderWidth: 3,
          data: getters.slice2(entry,index)
        }
        if(!(entry[index] in getters.colorObj))
        {  let color = {}
          color.r = Math.floor(Math.random()*256)
          color.b = Math.floor(Math.random()*256)
          color.g = Math.floor(Math.random()*256)
          state.colorObj[entry[index]]= (JSON.parse(JSON.stringify(color)))
        }
        point['borderColor']=`rgb(${getters.colorObj[entry[index]].r},${getters.colorObj[entry[index]].g},${getters.colorObj[entry[index]].b})`
        point['backgroundColor']=`rgba(${getters.colorObj[entry[index]].r},${getters.colorObj[entry[index]].g},${getters.colorObj[entry[index]].b},0.5)`
        if(point.type === 'line')
        {
          point['fill']=false
        }
        else if(point.type === 'filled line')
        {
          point['type']='line'
        }
        dataSet.push(point)
      })
      return dataSet
    },
    plotData: (state,getters)=>(index,chartType=['line'])=>{
      let dataSet=[]
      getters.titles.forEach((title,i)=>{
       let point = {
          label: title,
          data: getters.slice(title),
          type: chartType[i%chartType.length],
         
          borderWidth: 3
        }
        if(!(title in getters.colorObj))
        {  let color = {}
          color.r = Math.floor(Math.random()*256)
          color.b = Math.floor(Math.random()*256)
          color.g = Math.floor(Math.random()*256)
          state.colorObj[title]= (JSON.parse(JSON.stringify(color)))
        }
        point['borderColor']=`rgb(${getters.colorObj[title].r},${getters.colorObj[title].g},${getters.colorObj[title].b})`
        point['backgroundColor']=`rgba(${getters.colorObj[title].r},${getters.colorObj[title].g},${getters.colorObj[title].b},0.5)`
        if(point.type === 'line')
        {
          point['fill']=false
        }
        else if(point.type === 'filled line')
        {
          point['type']='line'
        }
        if(title!=index)
        {
          dataSet.push(point)
        }

      })
      return dataSet
    }
   
  }
})
