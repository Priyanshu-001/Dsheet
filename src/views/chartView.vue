<template>
    <v-container>
        
        <v-btn to="table">
            <v-icon medium>
                   mdi-file-table
            </v-icon>
            Table
            
        </v-btn>
        <v-tabs fixed-tabs v-model= 'chartSelector'>
        <v-tab>
           
            <v-icon left>
                mdi-chart-bar
            </v-icon>
             Bar Chart
        </v-tab>
        <v-tab>
            
            <v-icon left>
                mdi-chart-line
            </v-icon>Line Chart 
        </v-tab>
         <v-tab>
           
            <v-icon left>
            mdi-chart-scatter-plot-hexbin
            </v-icon> 
            Scatterplot
        </v-tab>
       
        <v-tab>
            <v-icon left>
               mdi-chart-areaspline-variant
            </v-icon>
            Filled Line
        </v-tab>
        <v-tab>
            <v-icon left>
              mdi-chart-areaspline
            </v-icon>
            Mixed
        </v-tab>

        </v-tabs>
        
        <v-row>
            <v-col>
        <dialog1 ref="dialog1" Dialog_Title = "Configure Chart" :key="componentKey">
        <template v-slot:activationIcon>
            <v-icon>
                mdi-cog
            </v-icon>
            
        </template>
        <template  v-slot>
             
            
            <v-row>
                <v-col cols=8>
                   <h3>
                    Axis
                  </h3>
                </v-col>

                <v-col cols=2>
                    <v-select dense :items="[1,0]" v-model="axis"  >
                    </v-select>
                </v-col>
            </v-row>
            <h3>
                Colors
            </h3>
            <br>
         
            
            <template v-if="graphReady">
              
            <template v-for="(label,i) of series" >
                
                <v-row :key=i >
                   
                    <v-col>
                        
                        {{label}}
                    </v-col>
                    <v-spacer/>
                    <v-col>
                       <colorDialog :key="componentKey" :value="colorObj[label]" :label="label">

                       </colorDialog>
                    </v-col>
                </v-row>

                
            </template>
            </template>

        </template>

        </dialog1>
            </v-col>
            <v-spacer/>
            <v-col>
                
         <dialog1 v-if="chartSelector === chartTypes.length" Dialog_Title = "Set ChartTypes">
        <template v-slot:activationIcon>
            <v-icon>
                mdi-lead-pencil
            </v-icon>
            
        </template>
        
        <template v-slot>
           
            <template v-for="(label,i) of series">
            <v-row :key="i">
                <v-col>
                    {{label}}
                </v-col>
                <v-col cols="8"> 
                <v-select dense :items="chartTypes" label="select Chart type" :value="configData[label]"  @input='patch($event,label)' single-line/>
                </v-col>
            </v-row>
            </template>
        </template>
        </dialog1>
            </v-col>
        </v-row>
       
        <v-card>
        <plot :key="componentKey" :chartType="chartType" :axis="axis" ref="ci">
        </plot>
        
        </v-card>
      
   
    </v-container>
    
</template>

<script>
import chart from '@/components/charts.vue'
import dialog1 from '@/components/dialog1.vue'
import colorDialog from '@/components/colorDialog.vue'

export default {
    name: 'chartView',

    data: ()=>{
     return {
        axis: 0, 
        componentKey: 0,
         chartSelector: 0,
         chartTypes: ['bar','line','scatter','filled line'],
         
         
         //configData: {},
       
     }
    },
    watch: {
        axis(){
                
                this.$store.commit('getConfigReady',[this.series,this.chartTypes])

                this.componentKey+=1
        },
        
        colorObj(){
            
            console.log('rerendering the graph')
            this.componentKey+=1
            console.log('color Obj changed')
        }
    },
    computed: {
      
        names(){return this.$store.getters.names },
        colorObj(){
            return this.$store.getters.colorObj
        },
        
        series(){
          if(this.axis === 0)
             return  this.$store.getters.lables
          return this.$store.getters.labels2
           },
       
        chartType(){
           if (this.chartSelector === this.chartTypes.length)
           return this.chartTypeTemplate
            return [this.chartTypes[this.chartSelector]]
        },
        configData() {
         
            return this.$store.getters.configData
            
            
        },
        graphReady() {
            return this.$store.state.graphReady
        },
        chartTypeTemplate(){
            let ty =[]
            for(let a in this.configData)
            {   if(this.series.includes(a)){
                ty.push(this.configData[a])
            }
           
            

            }
            return ty
        }
    },
    methods: {
        patch(val,label){
           this.$store.commit('patchConfig',[val,label])
        },
       
        
    },
    components: {
        'plot': chart,
        'dialog1': dialog1,
        'colorDialog': colorDialog,
        
    },
    beforeUpdate(){
       this.$store.commit('getConfigReady',[this.series,this.chartTypes]) 
       
    }
    ,
    created(){
        this.$store.commit('getConfigReady',[this.series,this.chartTypes])
        this.$store.commit('defaultIndex',this.$store.getters.titles)
      
    }
    
    

}
</script>