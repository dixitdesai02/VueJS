import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Navbar from "./components/Navbar.vue";

const app = createApp(App);

app.component("Navbar", Navbar)

app.mount("#app");
