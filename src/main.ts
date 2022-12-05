import { createApp } from "vue";
import { createPinia } from "pinia";
import { Icon, Swipe, SwipeItem, Button } from "vant";
import piniaPersist from "pinia-plugin-persist";
import App from "./App.vue";
import router from "./router";
import "vant/lib/index.css";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Icon);
app.use(Swipe);
app.use(SwipeItem);
app.use(Button);
app.mount("#app");
