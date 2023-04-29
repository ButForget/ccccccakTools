<script setup lang="ts">
import BiologyPlayerSelector from '../components/BiologyPlayerSelector.vue'
import { reactive } from 'vue';
import { bioStore } from '../store';
const state = reactive({isPlaying: false});
const playStore = bioStore();

let player = new SpeechSynthesisUtterance();

player.onend = function() {
  speechSynthesis.pause();
  if(speechSynthesis.pending == false && speechSynthesis.speaking == false) {
    speechSynthesis.cancel();
    state.isPlaying = false;
  }
  else setTimeout(() => {speechSynthesis.resume()}, playStore.playTimeout);

}


function play(): void{
  state.isPlaying = true;
  if(speechSynthesis.paused == true) {
    speechSynthesis.resume();
    return;
  }

  playStore
    .names
    .forEach((element) => {
      player.text = element;
      speechSynthesis.speak(player);
    });
}

function pause(): void{
  speechSynthesis.pause();
  state.isPlaying = false;
}

</script>
<template>
  <v-container class="d-flex" fluid >
    <v-row class="align-self-center">
      <v-col class="d-flex justify-center" >
        <VCard>
          <VImg
            src="https://bing.com/th?id=OHR.TaiwanYuhina_ZH-CN6541884178_800x480.jpg"
          >
          </VImg>
          <VToolbar
            color="rgba(0, 0, 0, 0)"
            cover
          >
            <template #prepend>
              <VBtn icon="mdi-set"></VBtn>
            </template>
          </VToolbar>
          <VCardTitle>生物听力</VCardTitle>
          <VBtn v-show="!state.isPlaying" icon = "mdi-play" @click="play" size="x-large"></VBtn>
          <VBtn v-show="state.isPlaying" icon="mdi-pause" @click="pause" size="x-large"></VBtn>
        </VCard>
        
      </v-col>
      <v-col class="d-flex justify-center" cols="12">
        <VBtn icon="mdi-eye" @click=""></VBtn>
      </v-col>
    </v-row>
  </v-container>
</template>