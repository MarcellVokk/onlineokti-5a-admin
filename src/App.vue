<template>
  <v-app :style="{ backgroundColor: '#1a1a1a' }">
    <v-app-bar app color="primary" dark> 
      <div class="d-flex align-center">
        <h2>Online órák</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <classList />
    </v-main>
  </v-app>
</template>

<script>
import classList from './components/listOfClasses.vue'

export default {
  name: 'App',

  components: {
    classList,
  },

  data: () => ({
//
  }),
};
</script>
