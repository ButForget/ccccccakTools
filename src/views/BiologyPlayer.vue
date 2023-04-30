<script lang="ts" setup>
import {reactive} from 'vue';
import {bioStore} from '../store';

const state = reactive({
  isPlaying: false,
  nowPositon: 0,
});
const playStore = bioStore();

let position = 0;
let questions = playStore.questions;
let player = new SpeechSynthesisUtterance();

// function next(){
player.onend = function () {
  console.log(position, questions.length);
  if (position + 1 >= questions.length) {
    speechSynthesis.cancel();
    position = 0;
    state.nowPositon = position;
    state.isPlaying = false;
  }
  else {
    player.text = questions[++position][0] + " 的概念是?";
    console.log(questions[position][1].length * 500);
    console.log(player.text);
    setTimeout(() => {
      speechSynthesis.speak(player);
      state.nowPositon = position;
    }, questions[position][1].length * 500);
  }
  

}
//wait for a fix
//Error!!!!
function play(): void {
  state.isPlaying = true;
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    return;
  }
  player.text = playStore.questions[0][0] + " 的概念是?";
  speechSynthesis.speak(player);
}

function pause(): void {
  speechSynthesis.pause();
  state.isPlaying = false;
}

function toPrev(): void {
  state.nowPositon = state.nowPositon + 1 <= 0? 0: state.nowPositon - 1;
}

function toNext(): void {

  state.nowPositon= state.nowPositon + 1 >= questions.length? 0: state.nowPositon + 1;
  console.log(position);
}
</script>
<template>
<v-container>
<v-row>
  <v-col>
    <p class="d-flex justify-center text-h1">5</p><!-- timeCountDown -->
  </v-col>
</v-row>

<v-row>
  <v-col>
    <p class="d-flex justify-center text-h6"><div>{{state.nowPositon + 1}}</div>/<div>{{ questions.length }}</div></p><!-- timeCountDown -->
  </v-col>
</v-row>
<v-row>

<v-col class="d-flex justify-center">
<v-sheet
  class="mx-auto"
  elevation="8"
  max-width="80%"
>
  <v-window v-model="state.nowPositon">
    <v-window-item
      v-for="item in questions"
    >
      <v-card
          class="ma-4"
          height="50vh"
          width="60vh"
      >
      <v-card-text class="d-flex fill-height align-center justify-center">
          <v-scale-transition>{{ item[0] }}</v-scale-transition>
      </v-card-text>
      </v-card>
    </v-window-item>
  </v-window>
</v-sheet>
  <VBtn hidden icon="mdi-set"></VBtn>
</v-col>
</v-row>

<div style="position: absolute;bottom: 0;right: 0;width: 100%">

<v-toolbar>
  <template v-slot:prepend>
    <v-btn class="ms-5 mx-1" icon="mdi-arrow-left-thin" @click="toPrev"></v-btn>
    <v-btn v-show="!state.isPlaying" class="mx-1" icon="mdi-play" @click="play"></v-btn>
    <v-btn v-show="state.isPlaying" class="mx-1" icon="mdi-pause" @click="pause"></v-btn>
    <v-btn class="mx-1" icon="mdi-arrow-right-thin" @click="toNext"></v-btn>
  </template>

  <v-btn class="ms-5 mx-1" icon="mdi-arrow-left-thin" @click="toPrev"></v-btn>
  <v-btn v-show="!state.isPlaying" class="mx-1" icon="mdi-play" @click="play"></v-btn>
  <v-btn v-show="state.isPlaying" class="mx-1" icon="mdi-pause" @click="pause"></v-btn>
  <v-btn class="mx-1" icon="mdi-arrow-right-thin" @click="toNext"></v-btn>

  <template v-if="$vuetify.display.smAndUp">
    <v-divider
        class="mx-3 align-self-center"
        length="24"
        thickness="2"
        vertical
    ></v-divider>
    <v-btn icon="mdi-arrow-left-top" @click="$router.push({name: 'selector'})"></v-btn>
  </template>
</v-toolbar>
</div>

</v-container>
</template>