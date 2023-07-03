<script lang="ts" setup>
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRouter } from 'vue-router';
import { Ref } from "vue";
import { ref } from "vue";
const { lgAndUp } = useDisplay();
const router = useRouter();

interface Book {
  name: string,
  description: string,
  uri: string,
};

let books: Ref<Book[]> = ref([]);
resolveResource("./resource/books_map.json")
  .then((path) => {
    readTextFile(path).then((value) => {
      books.value = JSON.parse(value)['map'];
    })
  });

function toQuestions(bookName: string): void {
  router.push({name: "questions", params: {name: bookName}})
}
</script>

<template>
  <v-container fluid>

    <div class="overflow-auto overflow-x-hidden" :style="{ height: lgAndUp ? '80vh' : '70vh' }">
      <v-row v-show="books.length !== 0">
        <v-col v-for="item in books" class="d-flex justify-center" :cols="lgAndUp? 6: 12">
          <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
            <v-card :title="item.name" :width="lgAndUp? 500: 450" height="150" prepend-icon="mdi-book">
              <v-card-subtitle>
                {{ item.description }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn @click="toQuestions(item.uri)">
                  <p class="font-weight-black">就它了！</p>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>