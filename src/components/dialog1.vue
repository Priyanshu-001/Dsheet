<template>
<v-container>
    
    <v-dialog v-model="dialog"  max-width="600px" :persistent="stay? true : false" transition="dialog-top-transition">
    
         <template v-slot:activator="{on}">
             
             <slot name="activationButton">
                 <v-btn v-on="on" :text="tile? false: true" min-width="100px" min-height="50px" :width="tile? '150px' : 'auto'" :height="tile? '150px' : 'auto'">
                     <slot name = "activationIcon">
                     <v-icon left>
                         mdi-plus
                     </v-icon>
                     </slot>
                     <template v-if="!tile">
                    {{Dialog_Title}}
                     </template>
                 </v-btn>
                
             </slot>
         </template>
         <v-card>
              <v-toolbar flat
              color="white"
              
            >
            
         <v-card-title class="black--text"  >
              <slot name = "activationIcon">
                     <v-icon left color="black">
                         mdi-plus
                     </v-icon>
                </slot>
            
                {{Dialog_Title}}
</v-card-title >
         <v-spacer/>
         <v-btn aria-label="cancel" @click="dialog=false" text right>
             <v-icon color="red" >
                 mdi-close
             </v-icon>
         </v-btn>
              </v-toolbar>

         <v-card-text class="font-weight-bold">
             <slot>
                 
             </slot>
             <v-tabs v-model="tab_id" fixed-tabs>
             <template v-for="(item,i) in items">
                 <v-tab :key="i">
                     {{item}}
                 </v-tab>
             </template>
             </v-tabs>
             <v-tabs-items v-model="tab_id" >
                 <template v-for="(item,i) in items">
                     <v-tab-item :key="i">
                 <slot :name="item" >
                  {{i}} {{item}}
                 </slot>
                     </v-tab-item>
                 </template>
             </v-tabs-items>

         </v-card-text>
         
         <slot name="bottomtray">
         </slot>
         </v-card>
         
    </v-dialog>
    
</v-container>
</template>
<script>
export default {
    name: 'dialog1',
    data: ()=>{
        return {tab_id: 0,
        dialog: false
        }
    },
    props: ['Dialog_Title','items','stay','activationIcon','tile'],
    created(){
        this.$emit('stay',false),
        this.$emit('activationIcon','mdi-plus')
        this.$emit('tile',false)
  }

}
</script>