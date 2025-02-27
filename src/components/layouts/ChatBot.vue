<template>
  <div class="fixed bottom-5 right-5 w-80">
    <!-- Chat Toggle Button -->
    <button @click="isChatOpen = !isChatOpen" 
            class="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-secondary text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div class="relative">
        <span v-if="!isChatOpen" class="text-2xl">🤖</span>
        <span v-else class="text-2xl">✖</span>
        <span v-if="!isChatOpen" 
              class="absolute -top-2 -right-2 bg-white text-primary rounded-full px-2 py-1 text-xs animate-bounce shadow-md">
          Ask me!
        </span>
      </div>
    </button>

    <!-- Chat Window -->
    <div v-if="isChatOpen" 
         class="bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-slideUp cursor-pointer">
      <!-- Chat Header -->
      <div class="bg-gradient-to-r from-primary to-secondary p-4" >
        <div class="flex items-center space-x-3">
          <div class="text-2xl">🤖</div>
          <div class="text-white">
            <h3 class="font-bold">Foodie Assistant</h3>
            <p class="text-sm opacity-90">Ready to help you!</p>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="h-[200px] overflow-y-auto p-4 bg-gray-50" ref="messageContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="message.type === 'bot' ? 'flex justify-start' : 'flex justify-end'"
             class="mb-4 animate-fadeIn">
          <div :class="[
            'max-w-[80%] rounded-2xl p-3 shadow-sm',
            message.type === 'bot' 
              ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none'
          ]">
            <p class="text-sm">{{ message.text }}</p>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div v-if="loading" class="flex justify-start">
          <div class="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
            <div class="flex space-x-2">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Suggestions -->
      <div class="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto">
        <button v-for="(suggestion, index) in quickSuggestions" 
                :key="index"
                @click="quickAsk(suggestion)"
                class="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 hover:border-indigo-500 hover:text-indigo-500 transition-colors whitespace-nowrap">
          {{ suggestion }}
        </button>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white border-t border-gray-100">
        <div class="flex gap-2">
          <input v-model="userInput" 
                 @keyup.enter="sendMessage"
                 class="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                 placeholder="Type your question..."/>
          <button @click="sendMessage" 
                  :disabled="loading"
                  class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full px-6 py-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            {{ loading ? '...' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Message {
  text: string;
  type: 'bot' | 'user';
}

export default {
  name: 'ChatBot',
  
  data() {
    return {
      messages: [{ 
        text: "👋 Hi! I'm your friendly food assistant! How can I help you today?", 
        type: "bot" 
      }] as Message[],
      userInput: "",
      loading: false,
      isChatOpen: false,
      quickSuggestions: [
        "What's on the menu?",
        "Tell me about your specialties",
        "Do you have vegetarian options?",
        "What desserts do you offer?",
      ] as string[],
      HF_API_TOKEN: import.meta.env.API_KEY, // Add your Hugging Face API token here
      API_URL: import.meta.env.API_URL // You can change the model
    }
  },

  methods: {
    quickAsk(suggestion: string): void {
      this.userInput = suggestion;
      this.sendMessage();
    },

    async sendMessage(): Promise<void> {
      if (!this.userInput.trim()) return;
      
      const userMessage: string = this.userInput;
      this.messages.push({ text: userMessage, type: "user" });
      this.userInput = "";
      this.loading = true;

      try {
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.HF_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: userMessage,
            options: {
              wait_for_model: true
            }
          }),
        });

        const result = await response.json();
        let botResponse = result[0]?.generated_text || "I apologize, but I'm having trouble understanding. Could you rephrase that?";

        // Add some restaurant context to the response
        botResponse = this.addRestaurantContext(botResponse);

        this.messages.push({ text: botResponse, type: "bot" });
      } catch (error) {
        console.error('Error:', error);
        this.messages.push({ 
          text: "I apologize, but I'm having technical difficulties. Please try again later.", 
          type: "bot" 
        });
      }

      this.loading = false;
      
      // Scroll to bottom
      this.$nextTick(() => {
        const container = this.$refs.messageContainer as HTMLElement;
        container.scrollTop = container.scrollHeight;
      });
    },

    addRestaurantContext(response: string): string {
      // Add restaurant-specific context to generic responses
      const restaurantKeywords = {
        'food': 'our menu items',
        'eat': 'dine with us',
        'restaurant': 'our restaurant',
        'meal': 'our dishes',
      };

      let modifiedResponse = response;
      Object.entries(restaurantKeywords).forEach(([key, value]) => {
        modifiedResponse = modifiedResponse.replace(new RegExp(key, 'gi'), value);
      });

      return modifiedResponse;
    }
  }
};
</script>

<style>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
  