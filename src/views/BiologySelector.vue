<script lang="ts" setup>
import {reactive, ref, Ref, watch} from 'vue';
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router';
import { bioStore } from '../store';
const Books: Array<{ name: string, description: string, uri: string }> = [
  {
    name: "必修一",
    description: "分子与细胞",
    uri: "/bioQuestions/BX_1.json"
  },
  {
    name: "必修二",
    description: "遗传与进化",
    uri: "/bioQuestions/BX_2.json"
  },
  {
    name: "选择性必修一",
    description: "稳态与调节",
    uri: "/bioQuestions/XB_1.json"
  },
  {
    name: "选择性必修二",
    description: "生物与环境",
    uri: "/bioQuestions/XB_2.json"
  },
  {
    name: "选择性必修三",
    description: "生物技术与工程",
    uri: "/bioQuestions/XB_3.json"
  },
];
const { mdAndUp } = useDisplay();
const router = useRouter();
const store = bioStore();

//selector 内部状态
interface selectorState {
  selectedBooks: {name: string, description: string, uri: string} 
  selectedQuestions: Array<string[]> | undefined
  questions: Array<Array<string>> | undefined
}
const state: selectorState = reactive({
  selectedBooks: {name: "", description: "", uri: ""},
  selectedQuestions: [],
  questions: undefined,
})

//检测用户是否选中书目, 若选中, 获取该书目对应的资源
watch(() => state.selectedBooks, () => {
  let book = state.selectedBooks;
  if(book == undefined || book.name == "") return;

  fetch(book.uri)
    .then(res => {return res.json()})
    .then(data => { state.questions = data['list']})
    .catch(console.error);
})

function toPlay(): void{
  store.questions = state.selectedQuestions == undefined? []: state.selectedQuestions;
  router.push({name: "player"});
}

function getSetence(){
  fetch('https://v1.hitokoto.cn')
      .then(response => response.json())
      .then(data => {
        return data.hitokoto;
      })
      .catch(console.error);
}

</script>

<template>
  <v-container>
    <div class="overflow-auto overflow-x-hidden"
         :style="{ height: mdAndUp ? '80vh' : '70vh' }">
      <v-row class="justify-center">
        <v-col 
          v-if="state.selectedBooks != undefined && state.questions != undefined"
          v-for="(item, index) in state.questions"
          class="d-flex" lg="6" sm="5"
        >
          <v-card class="justify-center" width="70vh">
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
        </v-col>
      </v-row>
    </div>
    <v-container class="d-flex" style="position: absolute;bottom: 0">
      <v-row class="justify-center">
        <v-col cols="6">
          <v-select
            v-model="state.selectedBooks"
            :items="Books"
            :hint="`${state.selectedBooks.name == ''? 'wait for a select': state.selectedBooks.description}`"
            item-title="name"
            label="Book"
            persistent-hint
            return-object
          >
          </v-select>
        </v-col>
        <v-col cols="2">
          <v-btn icon="mdi-check" @click="toPlay"></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>