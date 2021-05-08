<template>
<v-container>    
<div>
    <canvas id="chart"></canvas>
  </div>
  ChartType(s) : {{this.chartType}}
  
</v-container>


</template>

<script>

import Chart from 'chart.js'
//let chartList = [Bar,Line]
export default {
    name:'chart',
   props: ['chartType','axis'],
    data: ()=>{
        return {
          chart : '',
          componentKey: 0,
           //chartCat: this.chartType,
            opts: {
                responsive:true,
                lineTension: 0
            },
          
     
    }
   
    },
    watch: {
        
    },
    computed: {
       
        labels(){
          if(this.axis === 1)
             return  this.$store.getters.lables
          return this.$store.getters.labels2
           },
        index(){
            return this.$store.state.index
        },
      
        charData(){
                return { type: 'bar', options: {...this.opts},data: {labels: [...this.labels] ,datasets: [ ...this.$store.getters.plotData2(this.$store.state.index,this.chartType)]}}
                
            }
    },
    created(){
this.$emit('axis',0)
    },
    beforeUpdate(){
        this.chart.destroy()
    },
    mounted(){
        const ctx = document.getElementById('chart')
        this.chart = new Chart(ctx,this.charData)
    },
    updated(){
       const ctx = document.getElementById('chart')
        this.chart = new Chart(ctx,this.charData)
    },
    
   
    
}
</script>