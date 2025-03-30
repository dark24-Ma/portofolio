<template>
  <section class="skills section" id="skills">
    <h2 class="section-title" ref="sectionTitle">Compétences</h2>
    
    <div class="skills-container">
      <div class="skills-categories">
        <div class="category" 
          v-for="(category, index) in categories" 
          :key="index"
          @click="activeCategory = category.id"
          :class="{ active: activeCategory === category.id }"
          ref="categories">
          {{ category.name }}
        </div>
      </div>
      
      <div class="skills-content">
        <div class="skills-list" ref="skillsList">
          <div class="skill-item" 
            v-for="(skill, index) in filteredSkills" 
            :key="index"
            ref="skillItems">
            <div class="skill-info">
              <h4>{{ skill.name }}</h4>
              <span>{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-percentage" :style="{ width: '0%' }" :data-width="skill.level + '%'"></div>
            </div>
          </div>
        </div>
        
        <div class="skills-visual" ref="skillsVisual">
          <div class="technologies-cloud">
            <div 
              v-for="(tech, index) in technologies" 
              :key="index"
              :class="`tech-item tech-${index}`"
              ref="techItems">
              {{ tech }}
            </div>
          </div>
          <div class="orbit">
            <div class="planet" ref="planet"></div>
            <div class="satellite" ref="satellite1"></div>
            <div class="satellite" ref="satellite2"></div>
            <div class="satellite" ref="satellite3"></div>
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
  name: 'SkillsSection',
  data() {
    return {
      activeCategory: 'frontend',
      categories: [
        { id: 'frontend', name: 'Frontend' },
        { id: 'backend', name: 'Backend' },
        { id: 'other', name: 'Autres' }
      ],
      skills: [
        { name: 'Flutter', level: 95, category: 'frontend' },
        { name: 'JavaScript', level: 90, category: 'frontend' },
        { name: 'Vue.js', level: 88, category: 'frontend' },
        { name: 'React', level: 70, category: 'frontend' },
        { name: 'GSAP', level: 40, category: 'frontend' },
        { name: 'Node.js', level: 80, category: 'backend' },
        { name: 'Express', level: 82, category: 'backend' },
        { name: 'MongoDB', level: 75, category: 'backend' },
        { name: 'Firebase', level: 85, category: 'backend' },
        { name: 'REST API', level: 88, category: 'backend' },
        // { name: 'Git', level: 90, category: 'other' },
        { name: 'UI/UX Design', level: 78, category: 'other' },
        { name: 'Responsive Design', level: 95, category: 'other' },
        { name: 'Performance Optimization', level: 85, category: 'other' }
      ],
      technologies: [
        'Flutter', 'CSS3', 'JavaScript', 'TypeScript', 'Vue.js', 
        'React', 'GSAP', 'Sass',  'Node.js', 
        'NestJS', 'MongoDB', 'Firebase', 'Git', 'REST API'
      ]
    }
  },
  computed: {
    filteredSkills() {
      return this.skills.filter(skill => skill.category === this.activeCategory)
    }
  },
  watch: {
    activeCategory() {
      // Réinitialiser les barres de compétence
      this.$nextTick(() => {
        this.animateSkillBars()
      })
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Animation du titre de section
      gsap.from(this.$refs.sectionTitle, {
        scrollTrigger: {
          trigger: this.$refs.sectionTitle,
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
      })
      
      // Animation des catégories
      gsap.from(this.$refs.categories, {
        scrollTrigger: {
          trigger: this.$refs.categories[0],
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      // Animation initiale des barres de compétence
      this.animateSkillBars()
      
      // Animation du nuage de technologies
      this.animateTechCloud()
      
      // Animation de l'orbite
      this.animateOrbit()
    },
    
    animateSkillBars() {
      // Réinitialiser toutes les barres de compétence à 0%
      const skillBars = document.querySelectorAll('.skill-percentage')
      skillBars.forEach(bar => {
        if (bar) {
          gsap.set(bar, { width: '0%' })
        }
      })
      
      // Animer les éléments de compétence
      if (!this.$refs.skillItems || !Array.isArray(this.$refs.skillItems)) return
      
      gsap.from(this.$refs.skillItems, {
        scrollTrigger: {
          trigger: this.$refs.skillsList,
          start: 'top 80%',
          once: false
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        onComplete: () => {
          // Animer les barres de progression
          if (this.$refs.skillItems && Array.isArray(this.$refs.skillItems)) {
            this.$refs.skillItems.forEach(item => {
              if (item) {
                const bar = item.querySelector('.skill-percentage')
                if (bar) {
                  const targetWidth = bar.getAttribute('data-width')
                  if (targetWidth) {
                    gsap.to(bar, {
                      width: targetWidth,
                      duration: 1.5,
                      ease: 'power2.out'
                    })
                  }
                }
              }
            })
          }
        }
      })
    },
    
    animateTechCloud() {
      // Animation initiale des éléments technologiques
      if (!this.$refs.techItems || !Array.isArray(this.$refs.techItems) || !this.$refs.skillsVisual) return
      
      gsap.from(this.$refs.techItems, {
        scrollTrigger: {
          trigger: this.$refs.skillsVisual,
          start: 'top 70%'
        },
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      
      // Animation continue du nuage de technologies
      this.$refs.techItems.forEach((item, index) => {
        if (item) {
          const randomX = gsap.utils.random(-30, 30)
          const randomY = gsap.utils.random(-30, 30)
          const randomRotation = gsap.utils.random(-10, 10)
          const randomDuration = gsap.utils.random(3, 6)
          
          gsap.to(item, {
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1
          })
        }
      })
    },
    
    animateOrbit() {
      // Animation de la planète
      if (this.$refs.planet) {
        gsap.to(this.$refs.planet, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        })
      }
      
      // Animation des satellites
      const satellites = [
        this.$refs.satellite1,
        this.$refs.satellite2,
        this.$refs.satellite3
      ].filter(satellite => satellite !== undefined && satellite !== null)
      
      satellites.forEach((satellite, index) => {
        // Positionner chaque satellite à un angle différent
        gsap.set(satellite, {
          rotation: index * 120
        })
        
        // Animer la rotation de l'orbite
        gsap.to(satellite, {
          rotation: `+=${360}`,
          duration: 10 + index * 2,
          repeat: -1,
          ease: 'none'
        })
        
        // Animer la pulsation du satellite
        gsap.to(satellite, {
          scale: 0.8,
          duration: 1 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
      
      // ScrollTrigger pour l'animation de parallaxe
      if (this.$refs.skillsVisual) {
        gsap.to(this.$refs.skillsVisual, {
          scrollTrigger: {
            trigger: '.skills',
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
</script>

<style scoped>
.skills {
  background-color: #0f0f0f;
  position: relative;
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.skills-categories {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.category {
  padding: 10px 25px;
  background-color: #1d1d1d;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category.active {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  color: white;
  box-shadow: 0 5px 15px rgba(106, 90, 249, 0.3);
}

.skills-content {
  display: flex;
  gap: 4rem;
}

.skills-list {
  flex: 1;
}

.skill-item {
  margin-bottom: 25px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-info h4 {
  font-size: 1rem;
  font-weight: 500;
}

.skill-info span {
  color: #00c8ff;
}

.skill-bar {
  width: 100%;
  height: 10px;
  background-color: #1d1d1d;
  border-radius: 10px;
  overflow: hidden;
}

.skill-percentage {
  height: 100%;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  border-radius: 10px;
  transition: width 1.5s ease;
}

.skills-visual {
  flex: 1;
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.technologies-cloud {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tech-item {
  position: absolute;
  padding: 8px 15px;
  background-color: #1d1d1d;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Positionnement initial des éléments tech */
.tech-0 { top: 20%; left: 10%; }
.tech-1 { top: 15%; left: 40%; }
.tech-2 { top: 10%; right: 10%; }
.tech-3 { top: 30%; right: 20%; }
.tech-4 { top: 50%; right: 5%; }
.tech-5 { top: 70%; right: 15%; }
.tech-6 { top: 80%; right: 30%; }
.tech-7 { top: 85%; left: 35%; }
.tech-8 { top: 75%; left: 10%; }
.tech-9 { top: 60%; left: 5%; }
.tech-10 { top: 40%; left: 15%; }
.tech-11 { top: 25%; left: 30%; }
.tech-12 { top: 45%; left: 50%; }
.tech-13 { top: 55%; right: 45%; }
.tech-14 { top: 35%; left: 25%; }

.orbit {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.planet {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(106, 90, 249, 0.5);
}

.satellite {
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transform-origin: 0 100px;
}

@media (max-width: 900px) {
  .skills-content {
    flex-direction: column;
  }
  
  .skills-visual {
    height: 300px;
  }
}
</style> 