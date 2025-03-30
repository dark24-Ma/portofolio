<template>
  <section class="about section" id="about">
    <h2 class="section-title" ref="sectionTitle">À Propos</h2>
    
    <div class="about-container">
      <div class="about-image" ref="aboutImage">
        <div class="image-frame"></div>
        <div class="pattern-bg"></div>
      </div>
      
      <div class="about-content">
        <h3 ref="aboutHeading">Koffi Tito-Antonio Andele</h3>
        <p ref="aboutText">Développeur Web & Mobile polyvalent, spécialisé en développement FullStack avec expertise en Vue.js, Node.js, Flutter et gestion de projets. Expérience confirmée en conception d'applications, optimisation des performances et coordination d'équipes techniques. Passionné par l'innovation et l'amélioration continue des solutions numériques.</p>
        
        <div class="skills-tags">
          <span class="skill-tag">PHP</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">Dart</span>
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Vue.js</span>
          <span class="skill-tag">React.js</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">Flutter</span>
          <span class="skill-tag">ElectronJS</span>
          <span class="skill-tag">MySQL</span>
          <span class="skill-tag">Firebase</span>
          <span class="skill-tag">MongoDB</span>
        </div>
        
        <div class="about-stats" ref="statsContainer">
          <div class="stat-item" v-for="(stat, index) in stats" :key="index" ref="statItems">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
        
        <div class="timeline" ref="timeline">
          <div class="timeline-item" v-for="(item, index) in timeline" :key="index" ref="timelineItems">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ item.year }}</div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>

        <div class="contact-info">
          <div class="contact-item">
            <i class="contact-icon">📧</i>
            <span>andtit4@gmail.com</span>
          </div>
          <div class="contact-item">
            <i class="contact-icon">📱</i>
            <span>+228 98418900 / 70691716</span>
          </div>
          <div class="contact-item">
            <i class="contact-icon">📍</i>
            <span>Lomé, Togo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'AboutSection',
  data() {
    return {
      stats: [
        { value: '5', label: 'Années d\'expérience' },
        { value: '+15', label: 'Projets terminés' },
        { value: '+6', label: 'Clients satisfaits' }
      ],
      timeline: [
        { 
          year: '2023', 
          title: 'Planificateur Energie | Yas Togo', 
          description: 'Conception et optimisation d\'applications Web/Mobile de gestion interne avec système de notifications automatiques.'
        },
        { 
          year: '2021-2024', 
          title: 'Responsable Projets | IACC GROUPES', 
          description: 'Coordination des équipes, suivi de projets sur Jira et optimisation des processus pour une réduction des coûts de 15%.'
        },
        { 
          year: '2023', 
          title: 'Développeur Web/Mobile | IT-INNOVATION', 
          description: 'Conception et développement d\'applications et sites Web avec focus sur l\'expérience utilisateur.'
        },
        { 
          year: '2022', 
          title: 'Développeur FullStack | KillinGiants', 
          description: 'Développement d\'applications mobiles avec Flutter et ElectronJS, avec formation en UI/UX Design.'
        }
      ]
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Animation du titre de section
      if (this.$refs.sectionTitle) {
        gsap.from(this.$refs.sectionTitle, {
          scrollTrigger: {
            trigger: this.$refs.sectionTitle,
            start: 'top 80%'
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        })
      }
      
      // Animation de l'image
      if (this.$refs.aboutImage) {
        gsap.from(this.$refs.aboutImage, {
          scrollTrigger: {
            trigger: this.$refs.aboutImage,
            start: 'top 70%'
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }
      
      // Animation de la frame de l'image avec une rotation
      if (this.$refs.aboutImage) {
        const imageFrame = this.$refs.aboutImage.querySelector('.image-frame')
        if (imageFrame) {
          gsap.from(imageFrame, {
            scrollTrigger: {
              trigger: this.$refs.aboutImage,
              start: 'top 70%'
            },
            rotation: 15,
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out'
          })
        }
      }
      
      // Animation du titre et du texte
      if (this.$refs.aboutHeading && this.$refs.aboutText) {
        gsap.from([this.$refs.aboutHeading, this.$refs.aboutText], {
          scrollTrigger: {
            trigger: this.$refs.aboutHeading,
            start: 'top 75%'
          },
          y: 30,
          opacity: 0,
          stagger: 0.3,
          duration: 0.8,
          ease: 'power2.out'
        })
      }
      
      // Animation des statistiques
      if (this.$refs.statsContainer) {
        gsap.from(this.$refs.statsContainer, {
          scrollTrigger: {
            trigger: this.$refs.statsContainer,
            start: 'top 80%'
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        })
        
        // Animation des compteurs - approche simplifiée
        if (this.$refs.statItems && Array.isArray(this.$refs.statItems)) {
          this.$refs.statItems.forEach(item => {
            if (item) {
              const numberElement = item.querySelector('.stat-number')
              if (numberElement && numberElement.textContent) {
                const targetText = numberElement.textContent
                const hasPlus = targetText.includes('+')
                const numericValue = parseInt(targetText.replace('+', '')) || 0
                
                // Sauvegardons le texte original
                const originalText = targetText
                
                // Définissons d'abord le texte à 0
                numberElement.textContent = hasPlus ? '+0' : '0'
                
                // Créons un objet pour l'animation
                const counter = { value: 0 }
                
                // Animation du compteur
                gsap.to(counter, {
                  value: numericValue,
                  duration: 2,
                  delay: 0.5,
                  ease: 'power2.out',
                  onUpdate: function() {
                    const current = Math.floor(counter.value)
                    numberElement.textContent = hasPlus ? '+' + current : current.toString()
                  },
                  onComplete: function() {
                    // Assurons-nous que le texte final est exactement le texte original
                    numberElement.textContent = originalText
                  }
                })
              }
            }
          })
        }
      }
      
      // Animation de la timeline
      if (this.$refs.timeline) {
        gsap.from(this.$refs.timeline, {
          scrollTrigger: {
            trigger: this.$refs.timeline,
            start: 'top 75%'
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        })
      }
      
      // Animation des éléments de la timeline
      if (this.$refs.timelineItems && Array.isArray(this.$refs.timelineItems)) {
        this.$refs.timelineItems.forEach((item, index) => {
          if (item) {
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: 'top 85%'
              },
              x: index % 2 === 0 ? -50 : 50,
              opacity: 0,
              duration: 0.8,
              delay: index * 0.2
            })
          }
        })
      }
      
      // Animation parallaxe de l'arrière-plan à motifs
      if (this.$refs.aboutImage) {
        const patternBg = this.$refs.aboutImage.querySelector('.pattern-bg')
        if (patternBg) {
          gsap.to(patternBg, {
            scrollTrigger: {
              trigger: '.about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            },
            y: 100,
            ease: 'none'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.about {
  background-color: #0f0f0f;
}

.about-container {
  display: flex;
  gap: 5rem;
  align-items: center;
}

.about-image {
  flex: 1;
  position: relative;
  height: 500px;
}

.image-frame {
  width: 350px;
  height: 450px;
  background-color: #1d1d1d;
  border-radius: 10px;
  position: relative;
  z-index: 2;
  background-image: url("@/assets/images/profil.jpeg");
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.pattern-bg {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(circle at center, #6a5af9 3px, transparent 3px);
  background-size: 30px 30px;
  z-index: 1;
  opacity: 0.6;
}

.about-content {
  flex: 1;
}

h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.about-content p {
  margin-bottom: 2rem;
  line-height: 1.7;
  color: #b0b0b0;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.skill-tag {
  padding: 6px 12px;
  background-color: #1d1d1d;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #00c8ff;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  color: white;
  transform: translateY(-3px);
}

.about-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.timeline {
  position: relative;
  padding-left: 30px;
  margin-bottom: 2.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #00c8ff, #6a5af9);
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-dot {
  position: absolute;
  left: -34px;
  top: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00c8ff;
  border: 2px solid #0f0f0f;
}

.timeline-year {
  display: inline-block;
  padding: 3px 12px;
  background: #1d1d1d;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #00c8ff;
}

.timeline-content h4 {
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.timeline-content p {
  margin-bottom: 0;
  font-size: 0.9rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.3rem;
  width: 40px;
  height: 40px;
  background-color: #1d1d1d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00c8ff;
}

.contact-item span {
  color: #b0b0b0;
}

@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 3rem;
  }
  
  .about-image, .about-content {
    width: 100%;
  }
}
</style> 