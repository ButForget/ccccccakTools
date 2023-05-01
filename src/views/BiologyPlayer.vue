<script lang="ts" setup>
import {reactive} from 'vue';
import {bioStore} from '../store';
import { useRouter } from 'vue-router';
const router = useRouter();
const state = reactive({
  isPlaying: false,
  nowPositon: 0,
  timeCount: 0,
});
const playStore = bioStore();

let position = 0;
let questions = playStore.questions;
let player = new SpeechSynthesisUtterance();
let tId: NodeJS.Timer;
let character_zh_cn_time_ms: number = 500;

player.onend = function () {
  state.timeCount = (questions[position][1].length * character_zh_cn_time_ms) / 1000;
  if(position + 1 < questions.length) {
    player.text = questions[++position][0] + " 的概念是?";
    tId = setInterval(() => {
    if(state.timeCount - 1 <= 0) {
      state.timeCount = 1;
      clearInterval(tId);
      speechSynthesis.speak(player);
      state.nowPositon = position;
    }
    state.timeCount--;
    }, 1000)
  }
  else {
    tId = setInterval(() => {
    if(state.timeCount - 1 <= 0) {
      state.timeCount = 1;
      clearInterval(tId);
      position = 0;
      state.isPlaying = false;
      state.nowPositon = position;
    }
    state.timeCount--;
    }, 1000)
  }
}

function play(): void {
  state.isPlaying = true;
  player.text = questions[position][0] + " 的概念是?";
  state.nowPositon = position;
  speechSynthesis.speak(player);
}

function pause(): void {
  speechSynthesis.cancel();
  clearInterval(tId);
  state.timeCount = 0;
  state.isPlaying = false;
  position = position - 1 <= 0? 0: position - 1;
  state.nowPositon = position;
}

function toPrev(): void {
  state.nowPositon = state.nowPositon - 1 <= 0? 0: state.nowPositon - 1;
}

function toNext(): void {
  state.nowPositon= state.nowPositon + 1 >= questions.length? 0: state.nowPositon + 1;
  console.log(position);
}

function backToSelector(): void {
  speechSynthesis.cancel();
  state.isPlaying = false;
  state.nowPositon = 0;
  router.push({name: "selector"});
}
</script>
<template>
<v-container>
<v-row>
  <v-col>
    <p class="d-flex justify-center text-h1">{{ state.timeCount }}s</p><!-- timeCountDown -->
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
          <v-scale-transition>
            <p class="d-flex justify-center text-h5">{{ item[0] + "的概念是?"}}</p>
          </v-scale-transition>
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
    <v-btn icon="mdi-arrow-left-top" @click="backToSelector"></v-btn>
  </template>
</v-toolbar>
</div>

</v-container>
</template>