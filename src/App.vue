<template>
  <v-app>
    <h1>Hello Developer</h1>
    <h2>
      {{ $t("APP_NAME") }}
    </h2>
    <h3>
      {{ $t("DYNAMIC_NAME", { name: "Vue" }) }}
    </h3>
    <h4>
      {{ $t("PLURALIZATION_NAME", 1) }}
    </h4>
    <v-btn color="primary" @click="toggleTheme">toggle theme</v-btn>
  </v-app>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "lightTheme"
    : "darkTheme";
};
</script>
<style scoped></style>
