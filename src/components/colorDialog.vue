<template>
    <v-dialog max-width="302px" v-model="d1">
        
       <template v-slot:activator="{on}">   
    <v-btn :color="hexValue" v-on="on">
        {{hexValue}}
    </v-btn>        
       </template>
           <v-card>
            <h2>
                Pick a color
            </h2>
            <v-container>
            <v-color-picker flat v-model="proxyValue">
            </v-color-picker>
            
            </v-container>
            <v-btn text color="primary" @click="patch">
                save
            </v-btn>
        </v-card>
        
    </v-dialog>
</template>
<script>
export default {
    name: 'colorDialog',
    data()
    {
        return {
            proxyValue: this.value,
            d1: false
        }
     },
    props: ['label','value'],
    methods:{
        patch(){
           
            this.$store.commit('patchColorObj',[this.proxyValue,this.label])
             this.d1=false

        }
    },
    computed: {

        
        hexValue()
        {
            const {r,g,b} = this.value
            let color ='#' + r.toString(16) + g.toString(16) +b.toString(16)
            return color
        }
    },
  
}
</script>