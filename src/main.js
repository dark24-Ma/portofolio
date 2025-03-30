import { createApp } from 'vue'
import App from './App.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)

createApp(App).mount('#app')
