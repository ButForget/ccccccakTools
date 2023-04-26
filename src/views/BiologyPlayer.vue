<script setup lang="ts">
import { text } from 'stream/consumers';
import { ref } from 'vue';
import { reactive } from 'vue';
import { computed } from 'vue';
 
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

let player: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
let items = ref(content);
let select = ref({name: ""});
function play(): void{
  speechSynthesis.speak(player);
}

</script>
<template>
  <v-container class="d-flex" fluid >
    <v-row class="align-self-center">
      <v-col class="d-flex justify-center" cols="12">
        <VBtn icon = "mdi-play" @click="play"></VBtn>
      </v-col>
      <v-col cols="4"></v-col>
      <v-col class="justify-end" cols="4">
        <VSelect
          clearable
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
      <v-col cols="4" class="align-start justify-start"><VBtn icon="mdi-check"></VBtn></v-col>
    </v-row>
  </v-container>
</template>