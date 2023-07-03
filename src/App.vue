<script setup lang="ts">
import { ref } from 'vue';
import { Ref } from 'vue';
import AboutCard from './components/AboutCard.vue'

let rail: Ref<boolean> = ref(true);
let drawer: Ref<boolean> = ref(true);
let info: Ref<boolean> = ref(false);
function include() {
  return [document.querySelector(".included")];
}
function clickOutside(): void {
  rail.value = true;
}
</script>
<template>
  <v-app id="inspire">
    <v-app-bar title="CCCCCCaKTools" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon class="included" @click="rail = !rail" elevation="0"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn @click="$router.back()" icon="mdi-arrow-left" :disabled="$route.meta['isRoot'] === true"></v-btn>
      </template>

    </v-app-bar>

    <div v-click-outside="{ handler: clickOutside, include }">
      <v-navigation-drawer v-model="drawer" permanent :rail="rail" @click="rail = false">
        <v-list density="compact" nav>
          <v-list-item title="BioPlyer" @click="$router.push({ name: 'selector' })"
            prepend-icon="mdi-play-circle-outline">
          </v-list-item>
          <v-list-item title="7net" @click="$router.push({name: '7Login'})" prepend-icon="mdi-book-open-blank-variant">

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-main class="d-flex">
      <RouterView></RouterView>
    </v-main>
    <v-dialog width="auto" v-model="info">
      <AboutCard></AboutCard>
    </v-dialog>

    <v-footer class="d-flex justify-end">
      <v-btn icon="mdi-information" @click="info = !info"></v-btn>
    </v-footer>

  </v-app>
</template>