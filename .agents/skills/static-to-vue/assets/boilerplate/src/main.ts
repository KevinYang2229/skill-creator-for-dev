import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { createHead } from "@unhead/vue";

import App from "./App.vue";
import router from "./router";

import "./index.css";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

/** TanStack Query 用戶端實例 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(head);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
