import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Navbar from "./components/Navbar.vue";
import validation from './includes/validation';

const app = createApp(App);

app.use(validation)

app.component("Navbar", Navbar)

app.mount("#app");
