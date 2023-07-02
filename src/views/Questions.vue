<script lang="ts" setup>
import { resolveResource } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/api/fs';
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRoute, useRouter } from 'vue-router';
import { Ref } from 'vue';
import { ref, reactive } from 'vue';
import { bioStore } from '../store';
const { mdAndUp } = useDisplay();
const router = useRouter();
const route = useRoute();
const store = bioStore();
interface Menu {
  menu: boolean,
  randomValue: number,
}

let questions: Ref<string[][]> = ref([]);
let selectedQuestions: Ref<string[][]> = ref([]);
let menu: Menu = reactive({ menu: false, randomValue: 0 });
resolveResource("./resource/bioQuestions/" + route.params.name)
  .then((path) => {
    readTextFile(path).then((value) => {
      questions.value = JSON.parse(value)['list'];
    })
  })

function selectAll() {
  selectedQuestions.value = questions.value;
}

function removeAll() {
  selectedQuestions.value = [];
}

function randomSelect() {
  let n = menu.randomValue;
  let result = [];
  let copyArr = questions.value?.slice(); // 复制原数组，避免修改原数组
  while (n > 0 && copyArr !== undefined) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    result.push(copyArr[randomIndex]);
    copyArr?.splice(randomIndex, 1); // 删除已经取出的元素
    n--;
  }
  selectedQuestions.value = result;
}
function toPlayer(): void {
  store.questions = [];
  store.questions = selectedQuestions.value;
  router.push({ name: "player" });
}
</script>
<template>
  <v-container v-if="questions.length != 0" class="d-flex" fluid>
    <div class="overflow-auto overflow-x-hidden" :style="{ height: mdAndUp ? '80vh' : '70vh' }">
      <v-row class="justify-center">
        <v-col v-for="item in questions" class="d-flex" :class="mdAndUp ? '' : 'justify-center'" :cols="mdAndUp ? 6 : 12">
          <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
            <v-card class="justify-center" :width="mdAndUp ? 500 : 400">
              <v-card-item density="compact">
                <v-checkbox :label="item[0]" :value="item" v-model="selectedQuestions">
                </v-checkbox>
                <v-card-text class="text-h6 justify-center">{{ item[1] }}</v-card-text>
              </v-card-item>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </div>
    <v-container style="position: absolute; top: 5em; right: 3em;">
      <v-row class="justify-end">

        <v-btn class="mx-2" :icon="selectedQuestions.length !== 0 ? 'mdi-select-remove' : 'mdi-select-all'"
          @click="selectedQuestions.length !== 0 ? removeAll() : selectAll()">
        </v-btn>
        <div class="text-center">
          <v-menu v-model="menu.menu" :close-on-content-click="false" location="top">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="mx-2" icon="mdi-dice-multiple-outline"></v-btn>
            </template>

            <v-card min-width="300">
              <v-card-actions>
                <v-expand-transition>
                  <v-slider class="mt-6" v-model="menu.randomValue" :min="1" :max="questions.length" :step="1"
                    thumb-label></v-slider>
                </v-expand-transition>
                <v-btn icon="mdi-close" @click="menu.menu = false"></v-btn>
                <v-btn icon="mdi-check" @click="randomSelect()"></v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>

      </v-row>
    </v-container>
    <v-btn size="x-large" style="position: absolute; right: 9rem; bottom: 7rem;" icon="mdi-check" @click="toPlayer"></v-btn>
  </v-container>
</template>