import { createApp } from "vue";
//import

//css
import "./assets/css/index.css";

//main
import App from "./App.vue";

//library
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from "./router/index";
import { createPinia } from "pinia";
//param
const pinia = createPinia();
const app = createApp(App);

//use
app.use(VueSweetalert2);
app.use(router);
app.use(pinia);
app.mount("#app");
