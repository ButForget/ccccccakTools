<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {ref} from 'vue';
import { useDisplay } from 'vuetify'
const content: Array<{ name: string, description: string, id: number }> = [
  {
    name: "必修一",
    description: "分子与细胞",
    id: 0,
  },
  {
    name: "必修二",
    description: "遗传与进化",
    id: 1,
  },
  {
    name: "必修三",
    description: "稳态与环境",
    id: 2,
  },
  {
    name: "选择性必修一",
    description: "稳态与调节",
    id: 3,
  },
  {
    name: "选择性必修二",
    description: "生物与环境",
    id: 4,
  },
  {
    name: "选择性必修三",
    description: "生物技术与工程",
    id: 5,
  },
];
const { mdAndUp } = useDisplay();
function getSetence(){
  fetch('https://v1.hitokoto.cn')
      .then(response => response.json())
      .then(data => {
        return data.hitokoto;
      })
      .catch(console.error)
}
let items = ref(content);
let selectedBooks = ref([{name: ""}]);
let selectedQuestions = ref([]);
</script>

<template>
  <v-container>
    <p>{{ selectedQuestions }}</p>
    <div class="overflow-auto overflow-x-hidden"
         :style="{ height: mdAndUp ? '80vh' : '70vh' }">
      <v-row class="justify-center">
        <v-col v-for="n in 200" class="d-flex" lg="6" sm="5">
          <v-card class="justify-center" width="70vh">
            <v-card-item density="compact">
            <v-checkbox :label="n"
                        :value="n"
                        v-model="selectedQuestions">
            </v-checkbox>
            <v-card-text class="text-h6 justify-center">{{ "a".repeat(n) }}</v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-container class="d-flex" style="position: absolute;bottom: 0">
      <v-row class="justify-center">
        <v-col cols="6">
          <v-select
              v-model="selectedBooks"
              :items="items"
              item-title="name"
              label="Book"
              persistent-hint
              return-object
          >
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>