<template>
<div>
  
  <v-sheet color="grey lighten-2" >
    <v-container>
      
    <h2>
    Create new document
    </h2>
    <br>
  <v-layout align-content="end" align="center" justify="start" justify-content="start" width="50px">
  
    <v-col cols=3>
 <v-btn to='app/table' height="150px" width="150px">

   <v-icon x-large>
     mdi-play
   </v-icon>
  </v-btn>
 </v-col>
 <v-col cols=3>
   <v-btn @click="blank" height="150px" width="150px">

   <v-icon x-large>
     mdi-plus
   </v-icon>
  </v-btn>
 </v-col>
 <v-col cols=3>
 <dialog1  tile=1 Dialog_Title="Enter CSV link" id="link">
   <template v-slot:activationIcon>
     <v-icon>

     mdi-link
     </v-icon>
    
   </template>
 <template v-slot>
   <v-text-field solo v-model="url" @keyup.enter="csv2json(url)">
    <v-btn text slot="append" @click="csv2json(url)">
				Enter
			</v-btn>	
     </v-text-field>
      <v-progress-circular v-if="status==='Fetching'" indeterminate :size=20 > </v-progress-circular>{{status}}
     
       </template>
 </dialog1>
 </v-col>
 
  </v-layout>
    </v-container>
 </v-sheet>
 <v-container>
   <br>
   <h2>
     Samples
   </h2>
   <v-simple-table> 
     <thead>
       <tr>
         <th>
           Name
         </th>
         <th>
           Source
         </th>
         <th>
           Action
         </th>
       </tr>
     </thead>
     <tbody>
   <template v-for="(link,i) of links">
     <tr :key="i">
       <td>
         <v-row>
         <v-icon>
         mdi-file-chart
         </v-icon>

         <h3>
         {{link.name}}
         </h3>
         </v-row>
       </td>
       <td>
         <a :href="link.source" target="_blank" style="color: black; font-weight: bold">
           {{link.sourceName}}
           
         </a>
         <v-icon small color="black">
           mdi-open-in-new
         </v-icon>
       </td>
       <td>
         <v-chip @click="csv2json(link.link)">
           Open
         </v-chip>
       </td>
     </tr>
   </template>
     </tbody>
   </v-simple-table>
</v-container>
</div>

</template>


<style scoped>
#link.container{
  padding: 0px;
}
</style>
<script>
// @ is an alias to /src

import dialog1 from '@/components/dialog1.vue'
export default {
  name: 'Home',
  data: ()=> {
    return {url: '',
    status: '',
    links: [{name: 'Testing.csv', link: '/test.csv', source: 'https://vuetifyjs.com/en/components/data-tables/', sourceName:'Vuetify'},
            {name: 'Smartphone Shippment India.csv', link: '/smartphoneShippments.csv', source: 'https://www.statista.com/statistics/792767/india-smartphone-shipments-volume/', sourceName:'Statista'},
           
            ]
    }
  },
  components: {
    dialog1
  },
  methods: {
    csv2json(url){
      this.status="Fetching"
      fetch(url,{method: 'get', 
      headers: {
          'content-type': 'text/csv;charset=UTF-8'}
      }
      )
      
      .catch(err=>this.status=err)
      .then(response=>{if(response.status == 200)
      { this.status='Parsing'
        return response.text()
      }
     
      })
     .then(csv=>this.$store.commit('csv2json',csv))
       
    
    },
    blank(){
      this.$store.commit('blank')
    }
  },
  watch:{
    doneParsing(){
      if(this.doneParsing)
      this.$router.push('/app/table',()=>this.$store.commit('notDoneParsing'))     
    }
  },
  computed:{
    
    doneParsing(){
      return this.$store.getters.doneParsing
    }
  },
  created()
  {
    this.$store.commit('notDoneParsing')
    this.$store.commit('setIndex',null)
  }
}
</script>
