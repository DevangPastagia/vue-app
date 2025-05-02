// Js Dependencies
import { createVuetify, type VuetifyOptions } from "vuetify";
import "vuetify/styles/main.sass";

// Components and directives
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Icons ans stylings
import { aliases, mdi } from "vuetify/iconsets/mdi";

// Locale
import { en } from "vuetify/locale";

// Theme
import { lightTheme, darkTheme } from "./i18n/theme";

// Vuetify Options

const vuetifyConfig: VuetifyOptions = {
  defaults: {
    global: {
      ripple: true,
      elevation: 0,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: "en",
    fallback: "en",
    messages: { en },
  },
  components,
  directives,
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
      darkTheme,
    },
  },
};

export default createVuetify(vuetifyConfig);
