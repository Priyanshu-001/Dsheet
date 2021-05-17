<template>
    <v-container>
      <v-row>
        <v-col cols=10>
      <v-btn to="chart">
        <v-icon medium>
             mdi-file-chart
          </v-icon>
        Chart
      </v-btn>
        </v-col>
        <v-spacer/>
        <v-col cols=2>
       <v-btn @click="downloadcsv">
         <v-icon>
           mdi-download
         </v-icon>
        Export to CSV
        </v-btn>
        </v-col>
      </v-row>
      <v-row>
      <v-col cols="10">
        <dialog1 Dialog_Title="Add Column" ref="dialog1"  max-width="600px" >
          <template v-slot>
            <v-row>
              <v-col>
            Column Name: 
              </v-col>
              <v-col>
            <v-text-field dense solo label="Column name" v-model="newHeader.text" :rules="rule" />
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              Column Type:
            </v-col>
            <v-col>
              <v-btn-toggle v-model="newHeader.type" dense color="primary" mandatory>
              <v-btn>
                <v-icon left>
                  mdi-numeric
                </v-icon>
                Numeric
              </v-btn>
              <v-btn>
                 <v-icon left>
                   mdi-alphabetical
                 </v-icon>
                 Non-Numeric
              </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              Sortable:
            </v-col>
            <v-col>
              
            <v-btn-toggle v-model="sortable" mandatory dense color="primary"> 
              <v-btn>
                <v-icon>
                mdi-checkbox-marked-circle-outline
                </v-icon>
                yes
              </v-btn>
            <v-btn> 
              <v-icon>
                mdi-cancel
              </v-icon>
              No
            </v-btn>
            </v-btn-toggle>
            </v-col>
          </v-row>

         
          </template>
          <template v-slot:bottomtray>
             <v-btn text color="primary" @click="addHeader">
            Save
            <v-icon>
              mdi-content-save
            </v-icon>
          </v-btn>
          </template>
        </dialog1>
        <v-spacer/>
        </v-col>
        <v-col cols=2>
        <dialog1 Dialog_Title ="Change Index">
          <template v-slot:activationIcon >
            <v-icon>
            mdi-pencil
            </v-icon>
          </template>
          <template v-slot>
            <v-row>
              <v-col>
                Index
              </v-col>
            <v-col>
              <v-select v-model="index" :items="titles" >
              </v-select>
            </v-col>
            </v-row>
            
        
            
          </template>
        </dialog1>
        </v-col>
      </v-row>
       
        <maintable/>
        <v-btn width="100%"  class="row-btn" outlined color="primary" outline="primary"  @click="addEntry"> 
          <v-icon >
            mdi-plus-circle-outline
          </v-icon>
          Add Row
        </v-btn>
      
      
    </v-container>
   
</template>

<script>


import maintable from '@/components/main-table.vue'
import dialog1 from '@/components/dialog1.vue'

export default {
  name: 'table',
  computed:{
    csv() {
      return this.$store.state.csv
    },
    titles(){
      return this.$store.getters.titles
    },
    index: {
      get(){
        return this.$store.getters.index
      },
      set(val){
        this.$store.commit('changeIndex',val)
      }

    }
  },
  components: {
    'maintable': maintable,
    'dialog1': dialog1

  },
  data: ()=>{
    return {
      opts: ['hi','bye'],
      sortable: 1,
      rule: [value=> value!=='__proto__'|| 'This name is not allowed'],
      
      newHeader: {}

    }
  },
  methods: {
    downloadcsv(){
      let csv = this.createcsv()
      console.log(csv)
      const blob = new Blob([this.$store.state.csv],{type: 'text/csv'})
      const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'sheet.csv'
        link.click()
     
    },
    createcsv(){

      

      return this.$store.commit('createcsv',this.$store.getters.titles)

      
    },
    addEntry(){
      this.$store.dispatch('addEntry')
      
    },
    created(){
            this.$store.commit('defaultIndex',this.$store.getters.titles)
    },
    addHeader(){
      var isSortable= this.sortable==0? true:false //ATTENTION sortable v-model at btn toggle  0->sortable, 
      //this choice makes for better UX
     let  header = {...this.newHeader,value:this.newHeader.text,'sortable': isSortable}
     let go = JSON.parse(JSON.stringify(header))
     header = {}

      this.$store.dispatch('addHeader',go)
      go ={}
      this.$refs.dialog1.dialog=false
      this.newHeader={}
    }
  }
  
}
</script>
