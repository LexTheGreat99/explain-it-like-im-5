<template>
  <div class="relative overflow-hidden min-h-screen bg-[#fafafa] dark:bg-gray-950">
    <!-- Tech Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
    
    <!-- Floating Tech Elements -->
    <div class="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
    
    <!-- Circuit Lines -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div class="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16 relative">
      <div class="max-w-4xl mx-auto backdrop-blur-sm">
        <!-- Header -->
        <header class="flex items-center mb-12 relative">
          <div class="absolute -left-4 -top-4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <NuxtLink 
            to="/" 
            class="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all hover:scale-105 flex items-center gap-2 mr-8 shadow-lg shadow-primary/5"
          >
            <Icon name="carbon:arrow-left" class="w-4 h-4" />
            Back to Home
          </NuxtLink>
          <NuxtLink to="/" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-primary bg-300% animate-gradient">
            Explain it like I'm 5
          </NuxtLink>
        </header>

        <!-- Main Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
          <!-- Left Column -->
          <div class="space-y-6">
            <h2 class="text-3xl font-bold leading-tight">
              Choose a Component
            </h2>
            <p class="text-muted-foreground">
              Select any component to get a simple explanation. Each explanation is crafted to be easily understood.
            </p>
            
            <!-- Component Selector with API Key Modal -->
            <div class="relative">
              <ComponentSelector class="bg-white rounded-xl shadow-lg" @select="handleComponentSelect" />
              
              <!-- API Key Modal - Fixed Positioning (In-Flow) -->
              <div v-if="showApiKeyModal" class="mt-4 mb-4">
                <div 
                  class="relative bg-white rounded-xl p-6 shadow-xl w-full min-h-[200px]"
                  style="animation: fadein 0.3s ease-out;"
                >
                  <!-- X Close Button - positioned on the right -->
                  <button 
                    @click="cancelApiKey" 
                    class="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>

                  <h3 class="text-lg font-bold mb-2 text-gray-800">Enter Your OpenAI API Key</h3>
                  <p class="text-gray-600 mb-4 text-sm">
                    To get an explanation for <span class="text-primary font-medium">{{ pendingComponent }}</span>, please enter your API key.
                  </p>

                  <!-- Input -->
                  <div class="mb-5">
                    <label for="api-key" class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <input 
                      id="api-key"
                      v-model="apiKey" 
                      type="password" 
                      placeholder="sk-..." 
                      class="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d63384] focus:border-transparent"
                      @keydown.esc="cancelApiKey"
                    />
                  </div>

                  <!-- Buttons -->
                  <div class="flex flex-col items-center gap-2">
                    <button 
                      @click="saveApiKey" 
                      class="w-full text-center px-4 py-2 rounded-md bg-[#d63384] text-white text-sm font-semibold hover:bg-[#c02d76] transition-all shadow hover:scale-105 active:scale-95"
                      :disabled="!apiKey.trim()"
                    >
                      Save & Continue
                    </button>
                    <button 
                      @click="cancelApiKey" 
                      class="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Placeholder message instead of chat messages in the left column -->
            <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary p-6">
              <div v-if="!selectedComponent" class="flex justify-center items-center h-full">
                <p class="text-muted-foreground">
                  Select a component from the left to get started
                </p>
              </div>
              <div v-else-if="chatMessages.length === 0 && isLoading" class="flex justify-center items-center h-full">
                <p class="text-muted-foreground">
                  <span class="inline-block animate-bounce">•</span>
                  <span class="inline-block animate-bounce delay-100">•</span>
                  <span class="inline-block animate-bounce delay-200">•</span>
                  <span class="ml-2">Loading...</span>
                </p>
              </div>
              <div v-else class="flex justify-center items-center h-full">
                <p class="text-muted-foreground" v-if="selectedComponent">
                  {{ selectedComponent }} selected. See explanation on the right.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="md:pl-8 md:mt-32 flex justify-center">
            <div class="max-w-[600px] w-full">
              <ChatBox 
                class="bg-[#D4C9BE] rounded-[35px] shadow-xl border border-[#123458]/10 p-6" 
                :selected-component="selectedComponent"
                :response="response"
                :is-loading="isLoading"
                :chat-messages="chatMessages"
                @follow-up="handleFollowUp"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedComponent = ref('')
const response = ref('')
const isLoading = ref(false)
const showApiKeyModal = ref(false)
const apiKey = ref('')
const pendingComponent = ref('')
const chatMessages = ref([])

const isValidApiKey = (key) => {
  return key && typeof key === 'string' && key.trim().startsWith('sk-') && key.trim().length > 20;
}

const sessionApiKey = ref('') // Store key in memory only for the session duration

const handleComponentSelect = async (component) => {
  pendingComponent.value = component
  
  // Check if API key already exists in session
  if (sessionApiKey.value && isValidApiKey(sessionApiKey.value)) {
    // If API key exists in session, skip the modal and process the component directly
    selectedComponent.value = component
    isLoading.value = true
    
    // Clear previous chat messages when selecting a new component
    chatMessages.value = []
    
    try {
      const apiResponse = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-OpenAI-API-Key': sessionApiKey.value
        },
        body: JSON.stringify({
          component: component
        })
      });

      const data = await apiResponse.json();
      
      if (!apiResponse.ok) {
        throw new Error(data.message || 'Failed to get explanation');
      }

      response.value = data.response;
      
      // Add the initial explanation to chat history
      chatMessages.value.push({ 
        role: 'assistant', 
        content: data.response 
      });
    } catch (error) {
      console.error('Error getting explanation:', error);
      
      // If we get an API key error, clear the session key
      if (error.message && error.message.includes('API key')) {
        sessionApiKey.value = '';
        pendingComponent.value = component;
        showApiKeyModal.value = true;
        error.message = 'Your API key appears to be invalid. Please provide a valid OpenAI API key.';
      }
      
      response.value = error.message || 'Sorry, there was an error getting the explanation. Please try again.';
      
      // Add error message to chat history
      chatMessages.value.push({ 
        role: 'assistant', 
        content: error.message || 'Sorry, there was an error getting the explanation. Please try again.' 
      });
    } finally {
      isLoading.value = false;
    }
  } else {
    // If no API key exists in session, show the modal
    showApiKeyModal.value = true
  }
}

const saveApiKey = async () => {
  if (!apiKey.value.trim()) return;
  
  // Validate API key format
  if (!isValidApiKey(apiKey.value)) {
    const errorMessage = 'Please enter a valid OpenAI API key. It should start with "sk-".';
    chatMessages.value.push({ 
      role: 'assistant', 
      content: errorMessage
    });
    response.value = errorMessage;
    showApiKeyModal.value = false;
    return;
  }
  
  // Save the API key in session memory only (not localStorage)
  sessionApiKey.value = apiKey.value;
  
  // Clear the input field for security
  apiKey.value = '';
  
  // Close the modal
  showApiKeyModal.value = false;
  
  // Proceed with the component selection
  selectedComponent.value = pendingComponent.value;
  isLoading.value = true;
  
  // Clear previous chat messages
  chatMessages.value = [];
  
  try {
    const apiResponse = await fetch('/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OpenAI-API-Key': sessionApiKey.value
      },
      body: JSON.stringify({
        component: selectedComponent.value
      })
    });

    const data = await apiResponse.json();
    
    if (!apiResponse.ok) {
      throw new Error(data.message || 'Failed to get explanation');
    }

    response.value = data.response;
    
    // Add the initial explanation to chat history
    chatMessages.value.push({ 
      role: 'assistant', 
      content: data.response 
    });
  } catch (error) {
    console.error('Error getting explanation:', error);
    
    // If we get an API key error, clear the session key
    if (error.message && error.message.includes('API key')) {
      sessionApiKey.value = '';
      pendingComponent.value = selectedComponent.value;
      selectedComponent.value = '';
      showApiKeyModal.value = true;
      error.message = 'Your API key appears to be invalid. Please provide a valid OpenAI API key.';
    }
    
    response.value = error.message || 'Sorry, there was an error getting the explanation. Please try again.';
    
    // Add error message to chat history
    chatMessages.value.push({ 
      role: 'assistant', 
      content: error.message || 'Sorry, there was an error getting the explanation. Please try again.' 
    });
  } finally {
    isLoading.value = false;
  }
}

const cancelApiKey = () => {
  showApiKeyModal.value = false
  pendingComponent.value = ''
  apiKey.value = '' // Clear the input for security
}

const handleFollowUp = async (question) => {
  if (!question.trim() || isLoading.value) return;
  
  // Check for a valid session API key
  if (!sessionApiKey.value || !isValidApiKey(sessionApiKey.value)) {
    const errorMessage = 'Please enter your OpenAI API key first.';
    response.value = errorMessage;
    chatMessages.value.push({ 
      role: 'assistant', 
      content: errorMessage
    });
    
    // Show the API key modal
    pendingComponent.value = selectedComponent.value;
    selectedComponent.value = '';
    showApiKeyModal.value = true;
    return;
  }
  
  // Add the user question to the chat history
  chatMessages.value.push({ 
    role: 'user', 
    content: question 
  });
  
  isLoading.value = true;
  
  try {
    const apiResponse = await fetch('/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OpenAI-API-Key': sessionApiKey.value
      },
      body: JSON.stringify({
        component: selectedComponent.value,
        question: question
      })
    });

    const data = await apiResponse.json();
    
    if (!apiResponse.ok) {
      throw new Error(data.message || 'Failed to get response');
    }

    response.value = data.response;
    
    // Add the AI response to chat history
    chatMessages.value.push({ 
      role: 'assistant', 
      content: data.response 
    });
  } catch (error) {
    console.error('Error getting follow-up response:', error);
    
    // If we get an API key error, clear the session key
    if (error.message && error.message.includes('API key')) {
      sessionApiKey.value = '';
      pendingComponent.value = selectedComponent.value;
      selectedComponent.value = '';
      showApiKeyModal.value = true;
      error.message = 'Your API key appears to be invalid. Please provide a valid OpenAI API key.';
    }
    
    response.value = error.message || 'Sorry, there was an error processing your question. Please try again.';
    
    // Add error message to chat history
    chatMessages.value.push({ 
      role: 'assistant', 
      content: error.message || 'Sorry, there was an error processing your question. Please try again.' 
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgb(var(--primary) / 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--primary) / 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}

.bg-300\% {
  background-size: 300% 100%;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 8s ease infinite;
}

.delay-700 {
  animation-delay: 700ms;
}

@keyframes fadein {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadein {
  animation: fadein 0.3s ease-out;
}
</style> 