<script setup lang="ts">
import { ref } from 'vue';
const content: Array<{name: string, description: string, id: number}> = [
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
<v-col cols="4"></v-col>
<v-col class="justify-end" cols="4">
  <VSelect
    label="Book"
    v-model="select"
    :hint="`${select.name}`"
    item-title="name"
    :items="items"
    persistent-hint
    return-object
    >
  </VSelect>   
  </v-col>
<v-col cols="4" class="align-start justify-start">

</v-col>
</template>