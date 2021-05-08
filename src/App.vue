<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
         <v-icon x-large left>
            mdi-file-table
          </v-icon>
        <v-toolbar-title>
         
          <h1>
          D_Sheet
          </h1>

        </v-toolbar-title>
        
      </div>

     
    
    </v-app-bar>

    <v-main>
    <router-view/>
     
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  
  data: () => ({
    //
  }),
};
</script>
