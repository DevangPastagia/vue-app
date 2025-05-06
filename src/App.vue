<template>
  <v-app>
    <h1 v-if="loading">Loading</h1>
    <router-view v-else v-slot="{ Component, route }">
      <template v-if="Component">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            {{ route }}
            <component :is="Component" />
          </div>
        </transition>
      </template>
    </router-view>
    <v-btn color="primary" @click="toggleTheme">toggle theme</v-btn>
  </v-app>
</template>
<script setup lang="ts">
// Js Dependencies
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";

// Variables
const theme = useTheme();
const loading = ref(false);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

// Methods
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "lightTheme"
    : "darkTheme";
};
</script>
<style scoped></style>
