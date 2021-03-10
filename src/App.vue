<template>
  <v-app :style="{ backgroundColor: '#1a1a1a' }">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Online órák</h2>
      </div>
    </v-app-bar>
    <v-main>
      <classList />
    </v-main>
    <div class="dwefheruf"></div>
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

<style lang="scss" scoped>
.dwefheruf {
    height: 100px;
    max-height: 100px;
    width: 103.5%;
    background-color: rgba(255, 0, 0, 0)
};
</style>
