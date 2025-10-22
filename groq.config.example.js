// Configuration de l'API Groq pour le Chatbot IA
// 
// 1. Copiez ce fichier vers 'groq.config.js'
// 2. Ajoutez votre clé API Groq (gratuite sur https://console.groq.com/)
// 3. Assurez-vous que 'groq.config.js' est dans .gitignore
//
// Alternative : Utilisez une variable d'environnement dans un fichier .env :
// VUE_APP_GROQ_API_KEY=votre_cle_api_ici

export default {
  apiKey: 'votre_cle_api_groq_ici',
  model: 'llama-3.1-70b-versatile', // Modèle recommandé (rapide et performant)
  // Autres modèles disponibles :
  // 'llama-3.1-8b-instant' - Plus rapide, moins précis
  // 'gemma2-9b-it' - Alternative légère
}

