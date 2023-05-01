<script setup lang="ts">


let railSigal:boolean = true;

</script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer
        disable-resize-watcher
        permanent
        :model-value="false"
      >
        <v-list>
          <v-list-item
            title="听写工具"
            subtitle="听听听听听"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-main class="d-flex">
      <RouterView></RouterView>
    </v-main>
    
  </v-app>
</template>