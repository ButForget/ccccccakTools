<script lang="ts" setup>
import { ref } from 'vue';
import { Ref } from 'vue';
import {  getToken } from '../7net';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
import { SevenNetUser } from '../store';
import { useRouter } from 'vue-router';
const user = SevenNetUser();
const router = useRouter();
let tab: Ref<string> = ref("password");
let username: Ref<string> = ref("");
let password: Ref<string> = ref("");
let snackbar: Ref<boolean> = ref(false);
let resMsg: Ref<string> = ref("");


let tabs: string[] = ["password", "smsCode"];
/**
 * username filter rules to make sure the username and password is fit to frame.
 */
let usernameRules = [(value: string | undefined) => {
  if (!value) return "username is required.";
  if (/^1+\d{10}$/.test(value) == false) return "username is invaild.";
  return true;
}];

let passwordRules = [(value: string | undefined) => {
  if (!value) return "password is required.";
  if (value.length < 6) return "password is invaild.";
  return true
}]

async function passwordLogin(event: SubmitEventPromise) {
  if ((await event).valid == false)
    return;

  getToken(username.value, password.value)
    .then((token) => {
      resMsg.value = "登录成功";
      snackbar.value = true;
      user.token = token;
      router.push({ name: '7net' });
      
    })
    .catch((msg)=>{
      resMsg.value = msg;
      snackbar.value = true;
      user.clear();
    })
}
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>
        <p class="font-weight-bold text-h4">Login</p>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab rounded="false" elevation="0" v-for="item in tabs" :key="item" :value="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item key="password" value="password">
          <v-card>
            <v-form @submit="passwordLogin">
              <v-text-field v-model="username" label="username" :rules="usernameRules" clearable>
              </v-text-field>
              <v-text-field v-model="password" label="password" :rules="passwordRules" clearable>
              </v-text-field>
              <v-btn type="submit" elevation="0" variant="text">Log in</v-btn>
            </v-form>
          </v-card>
        </v-window-item>
        <v-window-item key="smsCode" value="smsCode">

        </v-window-item>
      </v-window>
    </v-card>
    <div class="text-center">
      <v-snackbar v-model="snackbar" multi-line>
        {{ resMsg }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false">colse</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>