<script lang="ts" setup>
import { ref } from 'vue';
import { Ref } from 'vue';
import { getUrl } from '../tools';
import { Base64 } from 'js-base64'
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
let tab: Ref<string> = ref("password");
let tabs: string[] = ["password", "smsCode"];
let username: Ref<string> = ref("");
let password: Ref<string> = ref("");

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
  if((await event).valid == false) return;
  fetch(getUrl("my", "/login"), {
    method: "POST",
    body: JSON.stringify({
      userCode: username.value,
      password: Base64.encode(password.value),
    }),
    headers: {
      'Version': "4.2.5",
      'Content-type': 'application/json',
    },
  }).then((response) => {
    console.log(response);
  });
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
              <v-text-field placeholder="1234567890" v-model="username" label="username" :rules="usernameRules" clearable>
              </v-text-field>
              <v-text-field v-model="password" label="password" :rules="passwordRules" clearable>
              </v-text-field>
              <v-btn type="submit"></v-btn>
            </v-form>
          </v-card>
        </v-window-item>
        <v-window-item key="smsCode" value="smsCode">

        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>