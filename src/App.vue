<script setup lang="ts">


let railSigal:boolean = true;

</script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      model-value
      permanent
      :rail="railSigal"
    >
    <v-avatar
    ></v-avatar>
    </v-navigation-drawer>

    <v-main class="d-flex">
      <RouterView></RouterView>
    </v-main>
    
  </v-app>
</template>