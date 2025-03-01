<script>
export default {
  name: 'Chatbot',
  data() {
    return {
      isBotLoaded: false, // This will control when the bot is initialized
    };
  },

  mounted() {
    // Load the BotPress script when the component is mounted
    this.loadBotPressScript();    
  },

  methods: {
    loadBotPressScript() {
      // Create and append the first BotPress script
      const script1 = document.createElement('script');
      script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      script1.async = true;
      
      // Initialize bot with custom styling
      script1.onload = () => {
        window.botpressWebChat.init({
          "composerPlaceholder": "Chat with bot",
          "botConversationDescription": "This is a description",
          "botId": "YOUR_BOT_ID",
          "hostUrl": "https://cdn.botpress.cloud/webchat/v2.2",
          "messagingUrl": "https://messaging.botpress.cloud",
          "clientId": "YOUR_CLIENT_ID",
          "stylesheet": "https://cdn.botpress.cloud/webchat/v2.2/standard.css",
          "theme": "prism",
          "themeColor": "#2563eb",
          "useSessionStorage": true,
          "showPoweredBy": false,
          "containerWidth": "100%25",
          "layoutWidth": "100%25",
          "hideWidget": false,
          "disableAnimations": false,
          "closeOnEscape": false,
          "showConversationsButton": true,
          "enableTranscriptDownload": false,
          "stylesheet": "https://cdn.botpress.cloud/webchat/v2.2/standard.css",
          "customStyles": {
            "button": { backgroundColor: "#2563eb" },
            "header": { backgroundColor: "#2563eb" }
          }
        });
      };
      
      const script2 = document.createElement('script');
      script2.src = "https://files.bpcontent.cloud/2025/03/01/03/20250301034737-PLDUGIU5.js";
      script2.async = true;
    
      document.body.appendChild(script1);
      document.body.appendChild(script2);
    },

  }
};
</script>