<script lang="ts" setup>
import { reactive } from 'vue';
import { bioStore } from '../store';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const router = useRouter();
const mdAndUp = useDisplay();
const state = reactive({
  isPlaying: false,
  nowPosition: 0,
  timeCount: 0,
});
const playStore = bioStore();

let position = 0;
let questions = playStore.questions;
let player = new SpeechSynthesisUtterance();
let tId: NodeJS.Timer | undefined = undefined;
let zhCNCharacterReadTime: number = 500;

player.onend = function () {
  state.timeCount = (questions[position][1].length * zhCNCharacterReadTime) / 1000;
  if (position + 1 < questions.length) {
    player.text = questions[++position][0] + " 的概念是?";
    tId = setInterval(() => {
      if (state.timeCount - 1 <= 0) {
        state.timeCount = 1;
        clearInterval(tId);
        speechSynthesis.speak(player);
        state.nowPosition = position;
      }
      state.timeCount--;
    }, 1000)
  }
  else {
    tId = setInterval(() => {
      if (state.timeCount - 1 <= 0) {
        state.timeCount = 1;
        clearInterval(tId);
        position = 0;
        state.isPlaying = false;
        state.nowPosition = position;
      }
      state.timeCount--;
    }, 1000)
  }
}

function play(): void {
  state.isPlaying = true;
  player.text = questions[position][0] + " 的概念是?";
  state.nowPosition = position;
  speechSynthesis.speak(player);
}

function pause(): void {
  speechSynthesis.cancel();
  clearInterval(tId);
  state.timeCount = 0;
  state.isPlaying = false;
  position = position - 1 <= 0 ? 0 : position - 1;
  state.nowPosition = position;
}

function toPrev(): void {
  state.nowPosition = state.nowPosition - 1 <= 0 ? 0 : state.nowPosition - 1;
}

function toNext(): void {
  state.nowPosition = state.nowPosition + 1 >= questions.length ? 0 : state.nowPosition + 1;
}


</script>
<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <v-card class="mx-auto" elevation="2" :width="mdAndUp? 800: 400">
          <v-row>
            <v-col>
              <p class="d-flex justify-center text-h1">{{ state.timeCount }}s</p><!-- timeCountDown -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="d-flex justify-center text-h6">
                <div>{{ state.nowPosition + 1 }}</div>
                /
                <div>{{ questions.length }}</div>
              </div>
            </v-col>
          </v-row>
          <v-window v-model="state.nowPosition">
            <v-window-item v-for="item in questions">
              <v-card class="ma-4" height="30vh" width="60vh">

                <v-divider></v-divider>

                <v-card-text>
                  <h1>{{ item[0] }}</h1>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
          <v-card-actions class="justify-space-between">
            <v-btn variant="plain" icon="mdi-chevron-left" @click="toPrev"></v-btn>
            <v-btn variant="plain" icon="mdi-chevron-right" @click="toNext"></v-btn>
          </v-card-actions>
        </v-card>
        <VBtn hidden icon="mdi-set"></VBtn>
      </v-col>
    </v-row>

  </v-container>
</template>