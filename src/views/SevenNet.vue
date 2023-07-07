<script setup lang="ts">
import { SevenNetUser } from '../store';
import { useRouter } from 'vue-router';
import { Exam, getExams, getUserInfo } from '../7net';
import { ref } from 'vue';
import { Ref } from 'vue';
const user = SevenNetUser();
const router = useRouter();

let exams: Ref<Exam[]> = ref([] as Exam[]);
getUserInfo(user.token)
  .then((res) => {
    user.loadUserInfo(res.data.data)
    getExams(user.info, user.token)
      .then((_exams) => {
        user.exams = _exams;
        exams.value = _exams;
      })
      .catch(() => {
        user.clear();
        router.push({ name: "7Login" });
      })
  })
  .catch(() => { user.clear(); })

</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="exam in exams" cols="12">
        <v-card>
          <v-card-title>
            {{ exam.examName }}
          </v-card-title>
          <v-card-subtitle>
            {{ exam.time }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-btn>close</v-btn>
              </v-col>
              <v-col>
                <div class="font-weight-bold text-h5 text-right">{{ exam.score }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>