<script lang="ts" setup>
import { Ref, ref, reactive, watch } from 'vue';
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router';
import { bioStore } from '../store';
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
interface Book {
  name: string,
  description: string,
  uri: string
}
let Books: Ref<Book[]> = ref([]);
resolveResource("./resource/books_map.json")
  .then((path) => {
    readTextFile(path).then((value) => {
      Books.value = JSON.parse(value)['map'];
    })
  })

const { mdAndUp } = useDisplay();
const router = useRouter();
const store = bioStore();
//selector 内部状态
interface selectorState {
  selectedBooks: Book
  selectedQuestions: string[][]
  questions: string[][]
  menu: boolean | false
  randomValue: number | 0
}
const state: selectorState = reactive({
  selectedBooks: { name: "", description: "", uri: "" },
  selectedQuestions: [],
  questions: [],
  menu: false,
  randomValue: 0
})



//检测用户是否选中书目, 若选中, 获取该书目对应的资源
watch(() => state.selectedBooks, () => {
  let book = state.selectedBooks;
  if (book == undefined || book.name == "") return;

  resolveResource("./resource/bioQuestions/" + book.uri)
    .then((path) => {
      readTextFile(path).then((value) => {
        state.questions = JSON.parse(value)['list'];
      })
    })
})

function toPlay(): void {
  store.questions = [];
  store.questions = state.selectedQuestions;
  router.push({ name: "player" });
}

function selectAll() {
  state.selectedQuestions = state.questions;
}

function removeAll() {
  state.selectedQuestions = [];
}

function randomSelect() {
  let n = state.randomValue;
  let result = [];
  let copyArr = state.questions?.slice(); // 复制原数组，避免修改原数组
  while (n > 0 && copyArr !== undefined) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    result.push(copyArr[randomIndex]);
    copyArr?.splice(randomIndex, 1); // 删除已经取出的元素
    n--;
  }
  state.selectedQuestions = result;
}
</script>

<template>
  <v-container fluid>
    <div class="overflow-auto overflow-x-hidden"
         :style="{ height: mdAndUp ? '80vh' : '70vh' }">
      <v-row class="justify-center">
        <!-- 
          Questions list.
         -->
        <v-col 
          v-if="state.selectedBooks !== undefined && state.questions !== undefined"
          v-for="item in state.questions"
          class="d-flex justify-center" lg="4" md="6" sm="7" cols="10"
        >
          <v-lazy :min-height="200" :options="{'threshold':0.5}" transition="fade-transition">
            <v-card class="justify-center w-100">
              <v-card-item density="compact">
            <v-checkbox
              :label="item[0]"
              :value="item"
              v-model="state.selectedQuestions"
            >
                </v-checkbox>
                <v-card-text class="text-h6 justify-center">{{ item[1] }}</v-card-text>
              </v-card-item>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </div>
    <v-container class="d-flex" style="position: absolute;bottom: 0">
      <v-row class="justify-end">
        <v-col class="justify-center float-left d-inline-flex">
          <v-btn class="mx-2" :icon="state.selectedQuestions.length!==0?'mdi-select-remove':'mdi-select-all'" @click="state.selectedQuestions.length!==0?removeAll():selectAll()"></v-btn>
        <div class="text-center">
            <v-menu
                v-model="state.menu"
                :close-on-content-click="false"
                location="top"
            >
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="mx-2" icon="mdi-dice-multiple-outline"></v-btn>
            </template>

            <v-card min-width="300">
              <v-card-actions>
                <v-expand-transition>
                  <v-slider
                      class="mt-6"
                      v-model="state.randomValue"
                      :min="1"
                      :max="state.questions.length"
                      :step="1"
                      thumb-label
                  ></v-slider>
                </v-expand-transition>
                <v-btn icon="mdi-close" @click="state.menu = false"></v-btn>
                <v-btn icon="mdi-check" @click="randomSelect()"></v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="state.selectedBooks"
            :items="Books.length == 0? []: Books"
            :hint="`${state.selectedBooks.name === ''? 'wait for a select': state.selectedBooks.description}`"
            item-title="name"
            label="Book"
            persistent-hint
            return-object
          >
          </v-select>
        </v-col>
        <v-col cols="3">
        <v-btn icon="mdi-check" @click="toPlay"></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>