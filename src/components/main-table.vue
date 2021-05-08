<template id="editable-data-table">

<v-container>
   
    <v-data-table
        :headers="headers"
        :items="entries"
        :items-per-page="5"
        class="elevation-1"
    >
     <template v-for="(b,i) in titles" v-slot:[`item.${b}`]="item"  >        
         
             <div :key=i>
                 
             
               <v-text-field v-if="item.header.type==0"
                type="number"
                background-color="transparent"
                flat
                hide-details
                dense
                :value="item.item[b]"
               outlined
                
                v-model="item.item[b]"
              />
               <v-text-field v-else
              
                background-color="transparent"
                flat
                hide-details
                dense
                :value="item.item[b]"
               outlined
                
                v-model="item.item[b]"
              />

              
             </div>
          </template>
    </v-data-table>
</v-container>

</template>
<script>

  export default {
      name: "maintable",
      data: ()=>{
        return {
            ok: 'ok'
        }
      },
      computed: {
          headers(){
              return this.$store.getters.allowedHeaders
          },
           entries(){
               return this.$store.state.entries
           },
           titles(){
               return this.$store.getters.titles
           }
      },
    
  }
</script>