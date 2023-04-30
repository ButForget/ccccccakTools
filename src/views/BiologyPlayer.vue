<script setup lang="ts">
import {reactive} from 'vue';
import {bioStore} from '../store';

const state = reactive({isPlaying: false});
const playStore = bioStore();

let player = new SpeechSynthesisUtterance();

player.onend = function () {
  speechSynthesis.pause();
  if (!speechSynthesis.pending && !speechSynthesis.speaking) {
    speechSynthesis.cancel();
    state.isPlaying = false;
  } else setTimeout(() => {
    speechSynthesis.resume()
  }, playStore.playTimeout);

}


function play(): void {
  state.isPlaying = true;
  if (speechSynthesis.paused) {
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

function pause(): void {
  speechSynthesis.pause();
  state.isPlaying = false;
}

</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="d-flex justify-center text-h1 ">5</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-card
            width="60%">
          <p class="d-flex justify-center text-h5">aaa</p>
        </v-card>

        <VBtn hidden icon="mdi-set"></VBtn>
      </v-col>

    </v-row>
    <div style="position: absolute;bottom: 20px;right: 10px">
      <VBtn icon="mdi-eye" @click="" size="x-large"></VBtn>
      <VBtn v-show="!state.isPlaying" icon="mdi-play" @click="play" size="x-large"></VBtn>
      <VBtn v-show="state.isPlaying" icon="mdi-pause" @click="pause" size="x-large"></VBtn>
    </div>
  </v-container>
</template>