<template>
  <div class="chatbot-wrapper">
    <!-- Bouton flottant pour ouvrir le chat -->
    <div 
      class="chat-toggle" 
      @click="toggleChat" 
      ref="chatToggle"
      :class="{ 'chat-open': isChatOpen }">
      <div class="toggle-icon" v-if="!isChatOpen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.89 2.52 15.65 3.43 17.15L2 22L6.85 20.57C8.35 21.48 10.11 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.37 20 8.85 19.53 7.55 18.72L7.19 18.5L4.55 19.15L5.21 16.56L4.97 16.19C4.14 14.87 3.67 13.31 3.67 11.67C3.67 7.41 7.08 4 11.33 4C15.59 4 19 7.41 19 11.67C19 15.92 15.59 19.33 11.33 19.33L12 20Z" fill="currentColor"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
      </div>
      <div class="toggle-icon" v-else>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="pulse-ring"></div>
    </div>

    <!-- Fenêtre du chat -->
    <div 
      class="chat-window" 
      ref="chatWindow"
      v-show="isChatOpen">
      <div class="chat-header" ref="chatHeader">
        <div class="ai-avatar">
          <div class="avatar-core"></div>
          <div class="avatar-ring"></div>
          <div class="avatar-particles">
            <span v-for="i in 6" :key="i" class="particle"></span>
          </div>
        </div>
        <div class="header-info">
          <h3>Assistant IA</h3>
          <p class="status" :class="{ 'typing': isTyping }">
            {{ isTyping ? 'En train d\'écrire...' : 'En ligne' }}
          </p>
        </div>
        <button class="minimize-btn" @click="toggleChat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div class="chat-messages" ref="chatMessages">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="message"
          :class="message.role"
          :data-message-index="index">
          
          <div class="message-avatar" v-if="message.role === 'assistant'">
            <div class="avatar-mini"></div>
          </div>
          
          <div class="message-content">
            <div class="message-bubble">
              {{ message.content }}
            </div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>

        <div v-if="isTyping" class="message assistant typing-indicator">
          <div class="message-avatar">
            <div class="avatar-mini"></div>
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input-wrapper" ref="chatInputWrapper">
        <div class="suggestions" v-if="messages.length === 0">
          <button 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            @click="sendMessage(suggestion)"
            class="suggestion-chip">
            {{ suggestion }}
          </button>
        </div>
        
        <div class="chat-input-container">
          <input 
            v-model="userInput"
            @keyup.enter="sendMessage()"
            placeholder="Posez-moi une question..."
            class="chat-input"
            ref="chatInput"
            :disabled="isTyping" />
          
          <button 
            @click="sendMessage()"
            class="send-btn"
            :disabled="!userInput.trim() || isTyping">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'ChatBot',
  data() {
    return {
      isChatOpen: false,
      userInput: '',
      messages: [],
      isTyping: false,
      suggestions: [
        "Parle-moi de tes projets",
        "Quelles sont tes compétences ?",
        "Comment te contacter ?"
      ],
      // Configuration Groq
      groqApiKey: '', // À remplir avec votre clé API Groq
      groqApiUrl: 'https://api.groq.com/openai/v1/chat/completions',
      // Contexte pour personnaliser les réponses
      systemPrompt: `Tu es un assistant virtuel intelligent pour le portfolio d'un développeur fullstack talentueux. 
      
Voici ses informations :
- Nom: Développeur créatif spécialisé en Web3, Mobile et Web
- Compétences principales: Vue.js, Flutter, NestJS, Blockchain (Solana, Dogechain), GSAP, MongoDB, Firebase
- Projets phares:
  * xGateAi: Application web3 de rugCheck des memecoins Solana avec abonnement mensuel
  * LoungeInAfrica: App mobile de réservation de lounges dans les aéroports africains (Flutter)
  * Solana Tracker: Application de suivi des nouveaux tokens Solana en temps réel
  * DogeChan: Plateforme web3 pour créer et échanger des WDoge sur Dogechain
  * DS Education Dashboard: Plateforme de gestion de formation (Vue.js + NestJS)
  * Masculine: App mobile de gestion de rendez-vous (Flutter)

Tu dois répondre de manière professionnelle, enthousiasmante et concise (max 3-4 phrases). 
Mets en avant les compétences et projets pertinents selon la question.
Sois friendly et utilise un ton moderne.
Si on te demande de le contacter, suggère d'utiliser la section contact du portfolio.`
    }
  },
  mounted() {
    console.log('✅ Chatbot monté!')
    
    this.initAnimations()
    
    // Récupérer la clé API depuis une variable d'environnement ou config
    this.groqApiKey = process.env.VUE_APP_GROQ_API_KEY || ''
    
    // Debug simple
    if (this.groqApiKey) {
      console.log('🤖 Chatbot prêt avec API Groq')
    } else {
      console.warn('⚠️ Chatbot en mode démo (pas de clé API)')
    }
    
    // Vérifier que l'élément existe dans le DOM
    this.$nextTick(() => {
      const wrapper = document.querySelector('.chatbot-wrapper')
      const toggle = document.querySelector('.chat-toggle')
      console.log('Chatbot wrapper trouvé:', !!wrapper)
      console.log('Bouton toggle trouvé:', !!toggle)
      if (wrapper) {
        const styles = window.getComputedStyle(wrapper)
        console.log('Position:', styles.position, 'Z-Index:', styles.zIndex, 'Display:', styles.display)
      }
    })
  },
  methods: {
    initAnimations() {
      // S'assurer que le bouton est visible immédiatement
      if (this.$refs.chatToggle) {
        // Définir les styles initiaux explicitement
        gsap.set(this.$refs.chatToggle, {
          opacity: 1,
          scale: 1,
          visibility: 'visible'
        })

        // Animation d'entrée légère
        gsap.from(this.$refs.chatToggle, {
          scale: 0.8,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })

        // Animation de pulsation continue
        const pulseRing = this.$refs.chatToggle.querySelector('.pulse-ring')
        if (pulseRing) {
          gsap.to(pulseRing, {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: 'power2.out'
          })
        }
      }
    },

    toggleChat() {
      this.isChatOpen = !this.isChatOpen

      if (this.isChatOpen) {
        this.$nextTick(() => {
          this.animateChatOpen()
          this.$refs.chatInput?.focus()
        })
      } else {
        this.animateChatClose()
      }
    },

    animateChatOpen() {
      const tl = gsap.timeline()
      
      tl.fromTo(this.$refs.chatWindow,
        { 
          scale: 0.8,
          opacity: 0,
          y: 20
        },
        { 
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.7)'
        }
      )
      .from(this.$refs.chatHeader.children, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3
      }, '-=0.2')
      .from(this.$refs.chatInputWrapper, {
        y: 20,
        opacity: 0,
        duration: 0.3
      }, '-=0.2')

      // Animation des particules de l'avatar
      const particles = this.$refs.chatHeader.querySelectorAll('.particle')
      gsap.to(particles, {
        scale: gsap.utils.wrap([1.5, 1.2, 1.8]),
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: 'linear',
        stagger: {
          each: 0.5,
          repeat: -1
        }
      })
    },

    animateChatClose() {
      gsap.to(this.$refs.chatWindow, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      })
    },

    async sendMessage(predefinedMessage = null) {
      const message = predefinedMessage || this.userInput.trim()
      
      if (!message) return

      // Ajouter le message de l'utilisateur
      const userMessage = {
        role: 'user',
        content: message,
        time: this.getCurrentTime()
      }
      
      this.messages.push(userMessage)
      this.userInput = ''

      // Animer le nouveau message
      this.$nextTick(() => {
        const lastIndex = this.messages.length - 1
        const messageEl = this.$refs.chatMessages?.querySelector(`[data-message-index="${lastIndex}"]`)
        if (messageEl) {
          gsap.fromTo(messageEl, 
            {
              x: 50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
              clearProps: 'all',
              onComplete: () => this.scrollToBottom()
            }
          )
        } else {
          this.scrollToBottom()
        }
      })

      // Simuler la frappe
      this.isTyping = true
      this.scrollToBottom()

      try {
        // Appel à l'API Groq
        const response = await this.callGroqAPI(message)
        
        // Ajouter la réponse de l'assistant
        const assistantMessage = {
          role: 'assistant',
          content: response,
          time: this.getCurrentTime()
        }
        
        this.messages.push(assistantMessage)
        
        // Animer la réponse
        this.$nextTick(() => {
          const lastIndex = this.messages.length - 1
          const messageEl = this.$refs.chatMessages?.querySelector(`[data-message-index="${lastIndex}"]`)
          if (messageEl) {
            gsap.fromTo(messageEl,
              {
                x: -50,
                opacity: 0
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                clearProps: 'all',
                onComplete: () => this.scrollToBottom()
              }
            )
          } else {
            this.scrollToBottom()
          }
        })
      } catch (error) {
        // Message d'erreur simplifié
        let errorMessage = "Désolé, je rencontre un problème. "
        
        if (error.message.includes('Aucun modèle')) {
          errorMessage += "Les modèles Groq sont temporairement indisponibles. 🔄"
        } else if (error.message.includes('API Error')) {
          errorMessage += "Vérifiez votre clé API. 🔑"
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage += "Problème de connexion. 🌐"
        } else {
          errorMessage += "Réessayez dans un instant. 🤖"
        }
        
        this.messages.push({
          role: 'assistant',
          content: errorMessage,
          time: this.getCurrentTime()
        })
        
        // Animer le message d'erreur
        this.$nextTick(() => {
          const lastIndex = this.messages.length - 1
          const messageEl = this.$refs.chatMessages?.querySelector(`[data-message-index="${lastIndex}"]`)
          if (messageEl) {
            gsap.fromTo(messageEl,
              {
                x: -50,
                opacity: 0
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                clearProps: 'all',
                onComplete: () => this.scrollToBottom()
              }
            )
          } else {
            this.scrollToBottom()
          }
        })
      } finally {
        this.isTyping = false
        this.scrollToBottom()
      }
    },

    async callGroqAPI(userMessage) {
      if (!this.groqApiKey) {
        return "Je suis l'assistant virtuel du portfolio ! Pour me configurer complètement, ajoutez votre clé API Groq dans les variables d'environnement (VUE_APP_GROQ_API_KEY). En attendant, je peux vous dire que ce développeur est spécialisé en Web3, Mobile et développement Web avec Vue.js, Flutter et les technologies blockchain ! 🚀"
      }

      // Liste des modèles à essayer (du plus récent au plus ancien)
      const modelsToTry = [
        'llama-3.3-70b-versatile',
        'llama-3.2-90b-text-preview',
        'llama-3.1-8b-instant',
        'gemma2-9b-it',
        'mixtral-8x7b-32768'
      ]

      try {
        // Préparer l'historique des messages pour l'API
        const conversationHistory = this.messages
          .slice(-5)
          .filter(msg => msg.role === 'user' || msg.role === 'assistant')
          .map(msg => ({
            role: msg.role,
            content: msg.content
          }))

        const apiMessages = [
          {
            role: 'system',
            content: this.systemPrompt
          },
          ...conversationHistory,
          {
            role: 'user',
            content: userMessage
          }
        ]

        // Essayer chaque modèle jusqu'à ce qu'un fonctionne
        for (let i = 0; i < modelsToTry.length; i++) {
          const model = modelsToTry[i]
          
          try {
            const response = await fetch(this.groqApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.groqApiKey}`
              },
              body: JSON.stringify({
                model: model,
                messages: apiMessages,
                temperature: 0.7,
                max_tokens: 800
              })
            })

            const data = await response.json()

            if (response.ok && data.choices && data.choices[0] && data.choices[0].message) {
              // Log seulement en cas de succès avec fallback
              if (i > 0) {
                console.log(`✅ Réponse obtenue avec: ${model}`)
              }
              return data.choices[0].message.content
            }

            // Si le modèle est décommissionné, essayer le suivant silencieusement
            if (response.status === 400 && data.error?.message?.includes('decommissioned')) {
              continue
            }

            // Autre erreur, la propager
            throw new Error(`API Error: ${response.status} - ${data.error?.message || 'Erreur inconnue'}`)

          } catch (modelError) {
            // Si c'est une erreur de décommission et qu'il reste des modèles, continuer
            if (modelError.message?.includes('decommissioned') && i < modelsToTry.length - 1) {
              continue
            }
            // Sinon propager l'erreur
            if (i === modelsToTry.length - 1) {
              throw new Error('Aucun modèle Groq disponible actuellement.')
            }
            throw modelError
          }
        }

      } catch (error) {
        console.error('❌ Erreur Groq:', error.message)
        throw error
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.chatMessages
        if (messagesContainer) {
          gsap.to(messagesContainer, {
            scrollTop: messagesContainer.scrollHeight,
            duration: 0.5,
            ease: 'power2.inOut'
          })
        }
      })
    },

    getCurrentTime() {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999999 !important;
  font-family: 'Poppins', sans-serif;
  pointer-events: auto;
  display: block !important;
  visibility: visible !important;
}

/* Bouton flottant */
.chat-toggle {
  position: relative;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00c8ff, #6a5af9);
  border-radius: 50%;
  cursor: pointer;
  display: flex !important;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 30px rgba(106, 90, 249, 0.4);
  transition: all 0.3s ease;
  overflow: visible;
  /* Assurez-vous que le bouton est visible dès le début */
  opacity: 1 !important;
  transform: scale(1) !important;
  z-index: 1000000 !important;
  visibility: visible !important;
}

.chat-toggle:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 40px rgba(106, 90, 249, 0.6);
}

.chat-toggle.chat-open {
  background: linear-gradient(135deg, #ff006e, #8338ec);
}

.toggle-icon {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #00c8ff;
  opacity: 1;
  pointer-events: none;
}

/* Fenêtre de chat */
.chat-window {
  position: fixed;
  bottom: 110px;
  right: 30px;
  width: 380px;
  height: 550px;
  background: rgba(20, 20, 20, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(0, 200, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000001;
  will-change: transform, opacity;
  pointer-events: auto;
  isolation: isolate;
}

/* Header */
.chat-header {
  background: linear-gradient(135deg, rgba(0, 200, 255, 0.1), rgba(106, 90, 249, 0.1));
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid rgba(0, 200, 255, 0.2);
  position: relative;
}

.ai-avatar {
  position: relative;
  width: 45px;
  height: 45px;
}

.avatar-core {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00c8ff, #6a5af9);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
}

.avatar-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border: 2px solid rgba(0, 200, 255, 0.3);
  border-radius: 50%;
  animation: rotate 3s linear infinite;
}

.avatar-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00c8ff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
}

.particle:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateX(30px); }
.particle:nth-child(2) { transform: translate(-50%, -50%) rotate(60deg) translateX(30px); }
.particle:nth-child(3) { transform: translate(-50%, -50%) rotate(120deg) translateX(30px); }
.particle:nth-child(4) { transform: translate(-50%, -50%) rotate(180deg) translateX(30px); }
.particle:nth-child(5) { transform: translate(-50%, -50%) rotate(240deg) translateX(30px); }
.particle:nth-child(6) { transform: translate(-50%, -50%) rotate(300deg) translateX(30px); }

@keyframes rotate {
  to { transform: rotate(360deg); }
}

.header-info {
  flex: 1;
}

.header-info h3 {
  font-size: 1.1rem;
  margin: 0;
  color: white;
  font-weight: 600;
}

.status {
  font-size: 0.75rem;
  color: #00c8ff;
  margin: 3px 0 0 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

.status.typing::before {
  background: #ffa500;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.minimize-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.minimize-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.chat-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #00c8ff, #6a5af9);
  border-radius: 10px;
}

.message {
  display: flex;
  gap: 10px;
  animation: fadeInMessage 0.3s ease;
}

@keyframes fadeInMessage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar-mini {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00c8ff, #6a5af9);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 200, 255, 0.3);
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message.user .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.message.assistant .message-bubble {
  background: linear-gradient(135deg, rgba(0, 200, 255, 0.15), rgba(106, 90, 249, 0.15));
  border: 1px solid rgba(0, 200, 255, 0.2);
  color: #f1f1f1;
  border-bottom-left-radius: 4px;
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #00c8ff, #6a5af9);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 0.7rem;
  color: #888;
  margin-top: 4px;
  padding: 0 8px;
}

/* Indicateur de frappe */
.typing-indicator .message-bubble {
  display: flex;
  gap: 6px;
  padding: 16px;
}

.typing-indicator .dot {
  width: 8px;
  height: 8px;
  background: #00c8ff;
  border-radius: 50%;
  animation: typing-bounce 1.4s ease-in-out infinite;
}

.typing-indicator .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* Zone d'input */
.chat-input-wrapper {
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 200, 255, 0.2);
}

.suggestions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.suggestion-chip {
  padding: 8px 12px;
  background: rgba(0, 200, 255, 0.1);
  border: 1px solid rgba(0, 200, 255, 0.3);
  border-radius: 20px;
  color: #00c8ff;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-chip:hover {
  background: rgba(0, 200, 255, 0.2);
  transform: translateY(-2px);
}

.chat-input-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 200, 255, 0.2);
  border-radius: 25px;
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
}

.chat-input::placeholder {
  color: #888;
}

.chat-input:focus {
  border-color: #00c8ff;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.2);
}

.send-btn {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00c8ff, #6a5af9);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 5px 20px rgba(0, 200, 255, 0.4);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .chatbot-wrapper {
    bottom: 20px;
    right: 20px;
  }

  .chat-window {
    width: calc(100vw - 40px);
    height: calc(100vh - 140px);
    right: -20px;
  }

  .chat-toggle {
    width: 55px;
    height: 55px;
  }
}
</style>

