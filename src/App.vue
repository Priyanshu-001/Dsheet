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

  <v-spacer/>
  <v-btn to='/' text>
  <v-icon x-large>
    mdi-home
  </v-icon>

  </v-btn>
    
    </v-app-bar>

    <v-main>
     
    <router-view/>
    
     
    </v-main>
  </v-app>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<script>


export default {
  name: 'App',

  
  data: () => ({
    //
  }),
};
</script>
