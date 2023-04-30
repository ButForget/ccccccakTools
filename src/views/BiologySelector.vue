<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import {ref} from 'vue';

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


let items = ref(content);
let select = ref({name: ""});
</script>

<template>
  <v-container class="d-flex">
    <v-row class="d-flex justify-center align-self-end">
      <v-col cols="4">
        <v-select
            v-model="select"
            :items="items"
            item-title="name"
            label="Book"
            persistent-hint
            return-object
        >
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
            v-model="select"
            :items="items"
            item-title="name"
            label="Chapter"
            persistent-hint
            return-object
        >
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>