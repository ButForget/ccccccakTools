<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {bioStore} from '../store';

const state = reactive({isPlaying: false});
const playStore = bioStore();

//let quetions = ref([])
let questions = playStore.questions;
let questionNow = ref(0);
let player = new SpeechSynthesisUtterance();

// function next(){
//   questionNow.value += 1;
//   setTimeout(next,1000)
// }
// next()
player.onend = function () {
  speechSynthesis.pause();
  if (!speechSynthesis.pending && !speechSynthesis.speaking) {
    speechSynthesis.cancel();
    state.isPlaying = false;
  } else setTimeout(() => {
    speechSynthesis.resume()
  }, 1000);

}


function play(): void {
  state.isPlaying = true;
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    return;
  }

  playStore
      .questions
      .forEach((element) => {
        player.text = element[0];
        speechSynthesis.speak(player);
      });
}

function pause(): void {
  speechSynthesis.pause();
  state.isPlaying = false;
}

</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="d-flex justify-center text-h1">5</p><!-- timeCountDown -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="d-flex justify-center text-h6">{{questionNow}}</p><!-- timeCountDown -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
          <v-sheet
              class="mx-auto"
              elevation="8"
              max-width="80%"
          >
            <v-slide-group
                class="pa-4"
                center-active
                show-arrows
                v-model="questionNow"
            >
              <v-slide-group-item
                  v-for="n in questions.length"
                  :key="n"
                  v-slot="{ isSelected, toggle }"
              >
                <v-card
                    :color="isSelected ? 'grey' : 'grey-lighten-1'"
                    class="ma-4"
                    height="50vh"
                    width="60vh"
                    @click="()=>{toggle();}"
                >
                  <div class="d-flex fill-height align-center justify-center">
                    <v-scale-transition>
{{questions[n-1][0]}}
                    </v-scale-transition>
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>

        <VBtn hidden icon="mdi-set"></VBtn>
      </v-col>
    </v-row>
    <div style="position: absolute;bottom: 0;right: 0;width: 100%">

      <v-toolbar>
        <template v-slot:prepend>
          <v-btn class="ms-5" icon="mdi-archive-plus-outline"></v-btn>

          <v-btn icon="mdi-alert-circle-outline"></v-btn>

          <v-btn icon="mdi-delete-outline"></v-btn>
        </template>

        <v-btn class="ms-5" icon="mdi-archive-plus-outline"></v-btn>

        <v-btn icon="mdi-alert-circle-outline"></v-btn>

        <v-btn icon="mdi-delete-outline"></v-btn>

        <template v-if="$vuetify.display.smAndUp">
          <v-divider
              class="mx-3 align-self-center"
              length="24"
              thickness="2"
              vertical
          ></v-divider>

          <v-btn icon="mdi-folder-outline"></v-btn>

          <v-btn icon="mdi-tag-outline"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-toolbar>

    </div>
  </v-container>
</template>