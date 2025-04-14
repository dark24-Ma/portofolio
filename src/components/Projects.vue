<!-- eslint-disable vue/no-unused-vars -->
<template>
  <section class="projects section" id="projects">
    <h2 class="section-title" ref="sectionTitle">Projets</h2>
    
    <div class="projects-filter" ref="projectsFilter">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="activeFilter = filter"
        :class="{ active: activeFilter === filter }"
        ref="filterButtons">
        {{ filter }}
      </button>
    </div>
    
    <div class="projects-container" ref="projectsContainer">
      <div 
        class="project-card" 
        v-for="(project, index) in filteredProjects" 
        :key="project.id"
        ref="projectCards">
        
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
          <div class="project-overlay">
            <a href="#" class="project-link">
              <i class="project-icon">👁️</i>
            </a>
            <a :href="project.github" target="_blank" class="project-link">
              <i class="project-icon">🔗</i>
            </a>
          </div>
        </div>
        
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          
          <div class="project-tech">
            <span v-for="(tech, techIndex) in project.technologies" :key="techIndex">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="projects-carousel" ref="carousel">
      <div class="carousel-track" ref="carouselTrack">
        <div 
          class="carousel-slide" 
          v-for="(project, index) in featuredProjects" 
          :key="project.id"
          ref="carouselSlides">
          <div class="carousel-content">
            <div class="carousel-image">
              <img :src="project.image" :alt="project.title">
            </div>
            <div class="carousel-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="carousel-tech">
                <span v-for="(tech, techIndex) in project.technologies" :key="techIndex">{{ tech }}</span>
              </div>
              <div class="carousel-links">
                <a href="#" class="btn">Voir le projet</a>
                <a :href="project.github" target="_blank" class="btn secondary">Code source</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="carousel-nav">
        <button class="carousel-prev" @click="prevSlide" ref="prevButton">
          <span>←</span>
        </button>
        <div class="carousel-dots">
          <span 
            v-for="(_, index) in featuredProjects" 
            :key="index"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
            ref="carouselDots">
          </span>
        </div>
        <button class="carousel-next" @click="nextSlide" ref="nextButton">
          <span>→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'ProjectsSection',
  data() {
    return {
      activeFilter: 'Tous',
      currentSlide: 0,
      filters: ['Tous', 'Web', 'Mobile', 'UI/UX'],
      projects: [
      {
          id: 6,
          title: 'Solana Tracker',
          description: 'Application web pour suivre les nouveaux tokens sur la blockchain Solana.',
          image: require('@/assets/images/solana.png'),
          github: 'http://185.97.146.99:6608/',
          category: 'Web',
          technologies: ['Vue.js', 'Tailwind CSS', 'WebSocket', 'Web3', 'Solana']
        },
        {
          id: 1,
          title: 'DogeChan',
          description: 'DogeChan est une application web3, qui permet de créer, transférer et échanger les WDoge de la blockchain Dogechain.',
          image: require('@/assets/images/dogchan.png'),
          github: 'https://ondoge.vercel.app/',
          category: 'Web',
          technologies: ['Vue.js', 'Blockchain', 'Dogechain']
        },
        {
          id: 2,
          title: 'Portfolio Animé',
          description: 'Portfolio personnel avec des animations GSAP avancées et un design moderne.',
          image: require('@/assets/images/portofolio.png'),
          github: '#',
          category: 'Web',
          technologies: ['Vue.js', 'GSAP']
        },
        {
          id: 3,
          title: 'Consulting Landing Page',
          description: 'Landing page pour un cabinet de conseil en management.',
          image: require('@/assets/images/irama.png'),
          github: 'https://iramaconsulting.com/',
          category: 'Web',
          technologies: ['Vue.js', 'GSAP']
        },
        {
          id: 4,
          title: 'DS Education Dashboard (En cours de développement)',
          description: 'Application Web de gestion de formation PDF, Vidéo, Newsletter, Abonnement .',
          image: require('@/assets/images/education.png'),
          github: '#',
          category: 'Web',
          technologies: ['VueJS', 'NestJS', 'MongoDB']
        },
        {
          id: 5,
          title: 'Masculine',
          description: 'Application mobile de gestion de rendez-vous et de réservation de services.',
          image: require('@/assets/images/masculine.jpg'),
          github: '#',
          category: 'Mobile',
          technologies: ['Flutter', 'Firebase', 'API Express', 'MySQL']
        },
        
       /*  {
          id: 5,
          title: 'Jeu Interactif',
          description: 'Jeu web interactif utilisant des animations et interactions avancées.',
          image: 'https://via.placeholder.com/600x400',
          github: '#',
          category: 'Web',
          technologies: ['Canvas', 'GSAP', 'JavaScript']
        },
        {
          id: 6,
          title: 'Application de Fitness',
          description: 'Application mobile pour suivre les activités sportives et la nutrition.',
          image: 'https://via.placeholder.com/600x400',
          github: '#',
          category: 'Mobile',
          technologies: ['Flutter', 'Firebase', 'API']
        } */
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'Tous') {
        return this.projects
      }
      return this.projects.filter(project => project.category === this.activeFilter)
    },
    featuredProjects() {
      // Retourne les 3 premiers projets comme projets en vedette pour le carousel
      return this.projects.slice(0, 3)
    }
  },
  watch: {
    activeFilter() {
      // Réanimer les cartes quand le filtre change
      this.$nextTick(() => {
        this.animateProjectCards()
      })
    },
    currentSlide() {
      this.updateCarousel()
    }
  },
  mounted() {
    this.initAnimations()
    this.initCarousel()
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
      
      // Animation des boutons de filtre
      gsap.from(this.$refs.filterButtons, {
        scrollTrigger: {
          trigger: this.$refs.projectsFilter,
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      // Animation des cartes de projet
      this.animateProjectCards()
      
      // Animation du carousel
      gsap.from(this.$refs.carousel, {
        scrollTrigger: {
          trigger: this.$refs.carousel,
          start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 1
      })
    },
    
    animateProjectCards() {
      if (!this.$refs.projectCards) return
      
      // Animation de la grille de projets avec un effet staggered
      gsap.from(this.$refs.projectCards, {
        scrollTrigger: {
          trigger: this.$refs.projectsContainer,
          start: 'top 70%',
          once: false
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        stagger: {
          amount: 0.6,
          grid: 'auto',
          from: 'start'
        },
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      })
    },
    
    initCarousel() {
      // Configuration initiale du carousel
      this.updateCarousel()
      
      // Animation des boutons de navigation
      gsap.from([this.$refs.prevButton, this.$refs.nextButton], {
        opacity: 0,
        x: (i) => i === 0 ? -20 : 20,
        duration: 0.5,
        delay: 1
      })
      
      // Animation des points de navigation
      gsap.from(this.$refs.carouselDots, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 1
      })
    },
    
    updateCarousel() {
      if (!this.$refs.carouselTrack) return
      
      // Anime la transition du slide
      gsap.to(this.$refs.carouselTrack, {
        x: `-${this.currentSlide * 100}%`,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      
      // Anime l'entrée du contenu du slide actif
      if (this.$refs.carouselSlides && 
          Array.isArray(this.$refs.carouselSlides) && 
          this.$refs.carouselSlides[this.currentSlide]) {
        const currentSlide = this.$refs.carouselSlides[this.currentSlide]
        const image = currentSlide.querySelector('.carousel-image')
        const info = currentSlide.querySelector('.carousel-info')
        
        if (image && info) {
          gsap.fromTo([image, info], 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2, 
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.2
            }
          )
        }
      }
      
      // Met à jour les dots
      if (this.$refs.carouselDots && Array.isArray(this.$refs.carouselDots)) {
        this.$refs.carouselDots.forEach((dot, index) => {
          if (dot) {
            if (index === this.currentSlide) {
              gsap.to(dot, { scale: 1.5, opacity: 1, duration: 0.3 })
            } else {
              gsap.to(dot, { scale: 1, opacity: 0.5, duration: 0.3 })
            }
          }
        })
      }
    },
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.featuredProjects.length
    },
    
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.featuredProjects.length) % this.featuredProjects.length
    },
    
    goToSlide(index) {
      this.currentSlide = index
    }
  }
}
</script>

<style scoped>
.projects {
  background-color: #0f0f0f;
}

.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.projects-filter button {
  padding: 8px 20px;
  background-color: #1d1d1d;
  border: none;
  border-radius: 20px;
  color: #b0b0b0;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.projects-filter button.active {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  color: white;
  box-shadow: 0 5px 15px rgba(106, 90, 249, 0.3);
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

.project-card {
  background-color: #1d1d1d;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform-origin: center;
}

.project-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  color: white;
  font-size: 1.2rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.project-card:hover .project-link {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}

.project-card:hover .project-link:nth-child(2) {
  transition-delay: 0.2s;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.project-info p {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tech span {
  padding: 4px 10px;
  background-color: #2a2a2a;
  border-radius: 15px;
  font-size: 0.7rem;
  color: #00c8ff;
}

/* Carousel Styles */
.projects-carousel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.carousel-content {
  display: flex;
  background-color: #1d1d1d;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.carousel-image {
  flex: 1;
  overflow: hidden;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.carousel-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.carousel-info p {
  margin-bottom: 1.5rem;
  color: #b0b0b0;
  flex: 1;
}

.carousel-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.carousel-tech span {
  padding: 5px 12px;
  background-color: #2a2a2a;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #00c8ff;
}

.carousel-links {
  display: flex;
  gap: 1rem;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.carousel-prev,
.carousel-next {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1d1d1d;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-prev:hover,
.carousel-next:hover {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
  margin: 0 1rem;
}

.carousel-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1d1d1d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dots span.active {
  background: linear-gradient(to right, #00c8ff, #6a5af9);
  transform: scale(1.5);
}

@media (max-width: 900px) {
  .carousel-content {
    flex-direction: column;
  }
  
  .carousel-image,
  .carousel-info {
    width: 100%;
  }
  
  .carousel-image {
    height: 200px;
  }
}
</style> 