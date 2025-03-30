<template>
  <section class="hero section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 ref="heading">
          <span class="greeting">Bonjour, je suis</span>
          <span class="name">Koffi Tito-Antonio ANDELE</span>
          <span class="title">Développeur Web & Mobile</span>
        </h1>
        <p ref="description">Développeur FullStack spécialisé en Vue.js, Flutter et Node.js, avec une passion pour créer des expériences numériques innovantes et performantes.</p>
        <div class="cta-buttons" ref="buttons">
          <button class="btn primary" @click="scrollToSection('projects')">
            <span>👨‍💻</span> Voir mes projets
          </button>
          <button class="btn secondary" @click="scrollToSection('contact')">
            <span>📨</span> Me contacter
          </button>
        </div>
      </div>
      <div class="hero-image" ref="heroImage">
        <div class="image-container">
          <!-- Placeholder pour votre photo ou illustration -->
          <div class="shape"></div>
        </div>
        <div class="floating-elements">
          <div class="floating-item html" ref="htmlIcon">
            <span>HTML5</span>
          </div>
          <div class="floating-item css" ref="cssIcon">
            <span>CSS3</span>
          </div>
          <div class="floating-item js" ref="jsIcon">
            <span>JavaScript</span>
          </div>
          <div class="floating-item vue" ref="vueIcon">
            <span>Vue.js</span>
          </div>
          <div class="floating-item flutter" ref="flutterIcon">
            <span>Flutter</span>
          </div>
          <div class="floating-item node" ref="nodeIcon">
            <span>Node.js</span>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator" ref="scrollIndicator" @click="scrollToSection('about')">
      <span>Scroll</span>
      <div class="mouse">
        <div class="wheel"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)

export default {
  name: 'HeroSection',
  mounted() {
    this.initAnimations()
  },
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        // Animation de défilement doux avec GSAP
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: section,
            offsetY: 20
          },
          ease: 'power3.inOut'
        })
      }
    },
    initAnimations() {
      // Timeline principale
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Animation du titre avec décomposition lettre par lettre
      if (this.$refs.heading) {
        tl.from(this.$refs.heading.querySelectorAll('span'), {
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 1
        })
      }
      
      // Animation du texte avec effet de machine à écrire
      if (this.$refs.description) {
        tl.from(this.$refs.description, {
          opacity: 0,
          duration: 1,
          onStart: () => {
            gsap.to(this.$refs.description, {
              duration: 2,
              text: {
                value: this.$refs.description.textContent,
                delimiter: ""
              },
              ease: "none"
            })
          }
        }, "-=0.5")
      }
      
      // Animation des boutons
      if (this.$refs.buttons) {
        tl.from(this.$refs.buttons.children, {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8
        }, "-=1.5")
      }
      
      // Animation de l'image
      if (this.$refs.heroImage) {
        tl.from(this.$refs.heroImage, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.8)'
        }, "-=1")
      }
      
      // Animation des icônes flottantes
      const floatingIcons = [
        this.$refs.htmlIcon,
        this.$refs.cssIcon,
        this.$refs.jsIcon,
        this.$refs.vueIcon,
        this.$refs.flutterIcon,
        this.$refs.nodeIcon
      ].filter(icon => icon !== undefined && icon !== null)
      
      floatingIcons.forEach((icon, index) => {
        // Animation d'entrée
        tl.from(icon, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
        }, "-=0.4")
        
        // Animation flottante continue
        gsap.to(icon, {
          y: `random(-20, 20)`,
          x: `random(-20, 20)`,
          rotation: `random(-15, 15)`,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
      
      // Animation de l'indicateur de défilement
      if (this.$refs.scrollIndicator) {
        gsap.from(this.$refs.scrollIndicator, {
          opacity: 0,
          y: -20,
          duration: 1,
          delay: 2.5
        })
        
        // Animation pulsante de la roue de la souris
        const wheel = this.$refs.scrollIndicator.querySelector('.wheel')
        if (wheel) {
          gsap.to(wheel, {
            y: 10,
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          })
        }
      }
      
      // Parallaxe au défilement
      gsap.to('.hero-content', {
        y: 200,
        opacity: 0.5,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }
  }
}
</script>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #0f0f0f;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(106, 90, 249, 0.1) 0%, rgba(15, 15, 15, 0) 70%);
  z-index: 1;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
}

.hero-text {
  max-width: 600px;
}

h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.greeting {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  color: #00c8ff;
  margin-bottom: 0.5rem;
}

.name {
  display: block;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.title {
  display: block;
  font-size: 2rem;
  font-weight: 600;
  color: #f1f1f1;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 200, 255, 0.2);
}

.primary {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
}

.secondary {
  background: transparent;
  border: 2px solid #00c8ff;
}

.hero-image {
  position: relative;
  width: 400px;
  height: 400px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #6a5af9, #00c8ff);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  25% { border-radius: 50% 50% 30% 70% / 50% 50% 70% 30%; }
  50% { border-radius: 70% 30% 50% 50% / 40% 60% 30% 60%; }
  75% { border-radius: 40% 60% 70% 30% / 70% 30% 50% 50%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-item {
  position: absolute;
  min-width: 60px;
  height: 40px;
  padding: 0 15px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.floating-item span {
  z-index: 2;
}

.html {
  top: 20%;
  left: 10%;
  background: linear-gradient(to right, #E44D26, #F16529);
}

.css {
  top: 60%;
  left: 15%;
  background: linear-gradient(to right, #264DE4, #2965F1);
}

.js {
  top: 30%;
  right: 15%;
  background: linear-gradient(to right, #F7DF1E, #F0DB4F);
  color: #323330;
}

.vue {
  bottom: 20%;
  right: 10%;
  background: linear-gradient(to right, #41B883, #35495E);
}

.flutter {
  top: 10%;
  right: 30%;
  background: linear-gradient(to right, #01579B, #40C4FF);
}

.node {
  bottom: 40%;
  left: 5%;
  background: linear-gradient(to right, #68A063, #3C873A);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(-5px);
}

.scroll-indicator span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid #fff;
  border-radius: 20px;
  position: relative;
  margin: 0 auto;
}

.wheel {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 900px) {
  .hero-content {
    flex-direction: column;
    padding: 0 20px;
  }
  
  .hero-text {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .cta-buttons {
    justify-content: center;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .hero-image {
    width: 300px;
    height: 300px;
  }
  
  .shape {
    width: 250px;
    height: 250px;
  }
}
</style> 