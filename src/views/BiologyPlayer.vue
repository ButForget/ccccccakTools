<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {bioStore} from '../store';

const state = reactive({isPlaying: false});
const playStore = bioStore();

//let quetions = ref([])
let questions = ref([
  ["细胞膜是几层膜？", "双层"],
  ["什么是真核细胞？", "具有真核物质（核膜及染色体）的细胞"],
  ["什么是原核细胞？", "不具有真核物质的细胞"],
  ["细胞核的作用是什么？", "负责细胞的遗传信息传递和细胞代谢的调节"],
  ["细胞质的作用是什么？", "包括细胞内的各种细胞器和细胞器的功能"],
  ["什么是线粒体？", "细胞内的能量中心，合成细胞所需的三磷酸腺苷（ATP）"],
  ["什么是叶绿体？", "植物细胞中的光合作用器官，能够将光能转化为化学能"],
  ["什么是细胞分裂？", "细胞繁殖的过程，包括有丝分裂和减数分裂两种方式"],
  ["减数分裂的作用是什么？", "产生生殖细胞，使染色体数目减半"],
  ["有丝分裂的作用是什么？", "维持体细胞的染色体数目和遗传信息的稳定"],
  ["什么是基因？", "生物遗传信息的基本单位，是指控制一种性状的DNA片段"],
  ["什么是基因突变？", "基因序列发生变化，导致遗传信息发生改变"],
  ["什么是DNA复制？", "细胞分裂前，将一个DNA分子复制成两个完全相同的DNA分子的过程"],
  ["什么是RNA？", "将DNA中的遗传信息转录成蛋白质合成所需的信息分子"],
  ["什么是蛋白质合成？", "生物体合成蛋白质的过程，包括转录和翻译两个阶段"],
  ["什么是基因工程？", "利用遗传学技术对生物体的基因进行人工操作和改造的过程"],
  ["什么是克隆？", "利用体细胞核移植等技术，复制一个与原个体基因完全相同的生物体"],
  ["什么是遗传多样性？", "不同个体之间的基因组成和表现形式的差异"],
  ["什么是生态系统？", "生物体与环境之间相互作用的一个完整的生态单位"],
  ["什么是食物链？", "描述生物体之间食物关系的链状结构"],
  ["什么是生物圈？", "地球上生命存在的范围，包括陆地、海洋和大气层"],
  ["什么是生物多样性？", "描述生物体之间的遗传和物种差异"]
]);
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
  }, playStore.playTimeout);

}


function play(): void {
  state.isPlaying = true;
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    return;
  }

  playStore
      .names
      .forEach((element) => {
        player.text = element;
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
<!--        <v-card-->
<!--            height="60vh"-->
<!--            width="80%">-->
<!--          <p class="justify-center text-h5">aaa</p>-->
<!--        </v-card>-->
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