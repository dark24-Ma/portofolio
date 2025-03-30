<template>
    <section class="contact section" id="contact">
      <h2 class="section-title" ref="sectionTitle">Contact</h2>
      
      <div class="contact-container">
        <div class="contact-info" ref="contactInfo">
          <h3>Discutons de votre projet</h3>
          <p>Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter. Je suis toujours ouvert à de nouvelles opportunités et collaborations.</p>
          
          <div class="info-items">
            <div class="info-item" v-for="(item, index) in contactInfo" :key="index" ref="infoItems">
              <div class="info-icon">
                <i>{{ item.icon }}</i>
              </div>
              <div class="info-content">
                <h4>{{ item.title }}</h4>
                <p>{{ item.value }}</p>
              </div>
            </div>
          </div>
          
          <div class="social-links" ref="socialLinks">
            <a href="#" class="social-link" v-for="(social, index) in socialLinks" :key="index">
              <i>{{ social.icon }}</i>
            </a>
          </div>
        </div>
        
        <div class="contact-form" ref="contactForm">
          <div class="form-header">
            <h3>Envoyez-moi un message</h3>
            <p>Je vous répondrai dès que possible</p>
          </div>
          
          <form @submit.prevent="submitForm">
            <div class="form-group" ref="nameInput">
              <label for="name">Nom</label>
              <input type="text" id="name" v-model="form.name" required>
            </div>
            
            <div class="form-group" ref="emailInput">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required>
            </div>
            
            <div class="form-group" ref="subjectInput">
              <label for="subject">Sujet</label>
              <input type="text" id="subject" v-model="form.subject" required>
            </div>
            
            <div class="form-group" ref="messageInput">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="btn" ref="submitButton">
              Envoyer le message
              <div class="button-animation" ref="buttonAnimation"></div>
            </button>
          </form>
        </div>
      </div>
      
      <div class="contact-decorations">
        <div class="floating-shape shape1" ref="shape1"></div>
        <div class="floating-shape shape2" ref="shape2"></div>
        <div class="floating-shape shape3" ref="shape3"></div>
      </div>
      
      <footer class="footer" ref="footer">
        <p>&copy; {{ new Date().getFullYear() }} - Développé avec ❤️ </p>
      </footer>
    </section>
  </template>
  
  <script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  
  gsap.registerPlugin(ScrollTrigger)
  
  export default {
    name: 'ContactSection',
    data() {
      return {
        contactInfo: [
          { icon: '📧', title: 'Email', value: 'andtit4@gmail.com' },
          { icon: '📱', title: 'Téléphone', value: '+228 98418900 / 70691716' },
          { icon: '📍', title: 'Localisation', value: 'Lomé, Togo' }
        ],
        socialLinks: [
          { icon: '👨‍💻', url: '#' },
          { icon: '🐦', url: '#' },
          { icon: '📸', url: '#' },
          { icon: '📝', url: '#' }
        ],
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
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
        
        // Animation des informations de contact
        if (this.$refs.contactInfo) {
          gsap.from(this.$refs.contactInfo, {
            scrollTrigger: {
              trigger: this.$refs.contactInfo,
              start: 'top 70%'
            },
            x: -50,
            opacity: 0,
            duration: 0.8
          })
        }
        
        // Animation des éléments d'information
        if (this.$refs.infoItems && Array.isArray(this.$refs.infoItems) && this.$refs.infoItems.length > 0) {
          gsap.from(this.$refs.infoItems, {
            scrollTrigger: {
              trigger: this.$refs.infoItems[0],
              start: 'top 75%'
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6
          })
        }
        
        // Animation des liens sociaux
        if (this.$refs.socialLinks && this.$refs.socialLinks.children) {
          gsap.from(this.$refs.socialLinks.children, {
            scrollTrigger: {
              trigger: this.$refs.socialLinks,
              start: 'top 80%'
            },
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          })
        }
        
        // Animation du formulaire de contact
        if (this.$refs.contactForm) {
          gsap.from(this.$refs.contactForm, {
            scrollTrigger: {
              trigger: this.$refs.contactForm,
              start: 'top 70%'
            },
            x: 50,
            opacity: 0,
            duration: 0.8
          })
        }
        
        // Animation des champs du formulaire
        const formElements = [
          this.$refs.nameInput,
          this.$refs.emailInput,
          this.$refs.subjectInput,
          this.$refs.messageInput,
          this.$refs.submitButton
        ].filter(el => el !== undefined && el !== null)
        
        if (formElements.length > 0 && this.$refs.contactForm) {
          gsap.from(formElements, {
            scrollTrigger: {
              trigger: this.$refs.contactForm,
              start: 'top 60%'
            },
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out'
          })
        }
        
        // Animation du bouton
        this.animateButton()
        
        // Animation des formes flottantes
        this.animateShapes()
        
        // Animation du footer
        if (this.$refs.footer) {
          gsap.from(this.$refs.footer, {
            scrollTrigger: {
              trigger: this.$refs.footer,
              start: 'top 95%'
            },
            y: 30,
            opacity: 0,
            duration: 0.8
          })
        }
      },
      
      animateButton() {
        // Animation du hover sur le bouton
        const button = this.$refs.submitButton
        const buttonAnimation = this.$refs.buttonAnimation
        
        if (!button || !buttonAnimation) return
        
        button.addEventListener('mouseenter', () => {
          gsap.to(buttonAnimation, {
            width: '100%',
            duration: 0.4,
            ease: 'power1.out'
          })
        })
        
        button.addEventListener('mouseleave', () => {
          gsap.to(buttonAnimation, {
            width: '0%',
            duration: 0.4,
            ease: 'power1.out'
          })
        })
      },
      
      animateShapes() {
        // Animation des formes décoratives
        const shapes = [
          this.$refs.shape1,
          this.$refs.shape2,
          this.$refs.shape3
        ].filter(shape => shape !== undefined && shape !== null)
        
        if (shapes.length === 0) return
        
        shapes.forEach((shape, index) => {
          // Position initiale aléatoire
          gsap.set(shape, {
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-50, 50),
            rotation: gsap.utils.random(-20, 20)
          })
          
          // Animation continue
          gsap.to(shape, {
            x: gsap.utils.random(-70, 70),
            y: gsap.utils.random(-70, 70),
            rotation: gsap.utils.random(-30, 30),
            duration: 7 + index * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          })
          
          // Animation d'opacité
          gsap.to(shape, {
            opacity: 0.4,
            duration: 4 + index,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          })
        })
        
        // Effet parallaxe au scroll
        const decorations = document.querySelector('.contact-decorations')
        if (decorations) {
          gsap.to(decorations, {
            scrollTrigger: {
              trigger: '.contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            },
            y: -100,
            ease: 'none'
          })
        }
      },
      
      submitForm() {
        // Récupération du bouton
        const button = this.$refs.submitButton
        if (!button) return
        
        const originalText = button.textContent.trim()
        
        // Vérification des champs
        if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
          alert('Veuillez remplir tous les champs')
          return
        }
        
        // Désactiver le bouton pendant la soumission
        button.disabled = true
        
        // Animation du bouton pendant la soumission
        gsap.to(button, {
          width: '50%',
          duration: 0.4,
          ease: 'power2.out'
        })
        
        // Changer le texte du bouton
        button.textContent = 'Envoi en cours...'
        
        // Préparation du contenu de l'email
        const emailTo = 'andtit4@gmail.com'
        const emailSubject = encodeURIComponent(this.form.subject)
        const emailBody = encodeURIComponent(
          `De: ${this.form.name} (${this.form.email})\n\n${this.form.message}`
        )
        
        // Création du lien mailto
        const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`
        
        // Ouverture de l'application email par défaut
        window.location.href = mailtoLink
        
        // Animation de succès après un court délai
        setTimeout(() => {
          // Animation de succès
          gsap.to(button, {
            backgroundColor: '#4CAF50',
            width: '100%',
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              button.textContent = 'Message envoyé !'
              
              // Réinitialiser le formulaire
              this.form = {
                name: '',
                email: '',
                subject: '',
                message: ''
              }
              
              // Réinitialiser le bouton après 3 secondes
              setTimeout(() => {
                gsap.to(button, {
                  backgroundColor: '',
                  width: '',
                  duration: 0.4,
                  ease: 'power2.out',
                  onComplete: () => {
                    button.textContent = originalText
                    button.disabled = false
                  }
                })
              }, 3000)
            }
          })
        }, 1000)
      }
    }
  }
  </script>
  
  <style scoped>
  .contact {
    background-color: #0f0f0f;
    position: relative;
    overflow: hidden;
  }
  
  .contact::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(106, 90, 249, 0.1) 0%, rgba(15, 15, 15, 0) 70%);
    z-index: 1;
  }
  
  .contact-container {
    display: flex;
    gap: 4rem;
    position: relative;
    z-index: 2;
  }
  
  .contact-info, 
  .contact-form {
    flex: 1;
  }
  
  .contact-info h3,
  .form-header h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #00c8ff, #6a5af9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }
  
  .contact-info > p,
  .form-header p {
    margin-bottom: 2rem;
    color: #b0b0b0;
  }
  
  .info-items {
    margin-bottom: 2rem;
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .info-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    width: 50px;
    height: 50px;
    background-color: #1d1d1d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .info-content h4 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }
  
  .info-content p {
    color: #b0b0b0;
    font-size: 0.9rem;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    background-color: #1d1d1d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: white;
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background: linear-gradient(to right, #00c8ff, #6a5af9);
    transform: translateY(-5px);
  }
  
  .contact-form {
    background-color: #1d1d1d;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #b0b0b0;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px;
    background-color: #2a2a2a;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  input:focus, textarea:focus {
    border-color: #00c8ff;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.1);
  }
  
  button[type="submit"] {
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .button-animation {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(to right, #00c8ff, #6a5af9);
    z-index: -1;
    transition: width 0.4s ease;
  }
  
  .contact-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  
  .floating-shape {
    position: absolute;
    opacity: 0.1;
  }
  
  .shape1 {
    top: 20%;
    left: 5%;
    width: 80px;
    height: 80px;
    background-color: #00c8ff;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  
  .shape2 {
    top: 60%;
    right: 10%;
    width: 120px;
    height: 120px;
    background-color: #6a5af9;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  
  .shape3 {
    bottom: 15%;
    left: 15%;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #00c8ff, #6a5af9);
    border-radius: 50% 50% 30% 70% / 50% 50% 70% 30%;
  }
  
  .footer {
    text-align: center;
    padding-top: 5rem;
    color: #b0b0b0;
    font-size: 0.9rem;
  }
  
  @media (max-width: 900px) {
    .contact-container {
      flex-direction: column;
      gap: 3rem;
    }
  }
  </style>