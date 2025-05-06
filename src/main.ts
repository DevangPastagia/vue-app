import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import router from "./routes";

const initializeApp = async () => {
  const app = createApp(App);
  app.use(vuetify).use(i18n).use(router).mount("#app");
};

initializeApp()
  .then(() => console.log("Or bhai site suru ho gayi? Aab maze kar..."))
  .catch(() => console.log("Application failed to initialize"));
