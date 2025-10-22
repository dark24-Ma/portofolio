<template>
  <div id="app">
    <Hero />
    <Projects />
    <Skills />
    <About />
    <Contact />
    <ChatBot />
  </div>
</template>

<script>
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ChatBot from './components/ChatBot.vue'

export default {
  name: 'App',
  components: {
    Hero,
    About,
    Skills,
    Projects,
    Contact,
    ChatBot
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #0f0f0f;
  color: #f1f1f1;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

.section {
  padding: 100px 10%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 4px;
  background: #00c8ff;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 200, 255, 0.2);
}
</style>
