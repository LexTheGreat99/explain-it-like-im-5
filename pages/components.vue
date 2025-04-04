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
            
            <!-- Component Selector -->
            <ComponentSelector class="bg-white rounded-xl shadow-lg" @select="handleComponentSelect" />
          </div>

          <!-- Right Column -->
          <div class="md:pl-8 md:mt-32 flex justify-center">
            <div class="max-w-[600px] w-full">
              <ChatBox 
                class="bg-[#D4C9BE] rounded-[35px] shadow-xl border border-[#123458]/10 p-6" 
                :selected-component="selectedComponent"
                :response="response"
                :is-loading="isLoading"
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

const handleComponentSelect = async (component) => {
  selectedComponent.value = component
  isLoading.value = true
  
  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        component: component
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get explanation');
    }

    response.value = data.response;
  } catch (error) {
    console.error('Error getting explanation:', error);
    response.value = error.message || 'Sorry, there was an error getting the explanation. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

const handleFollowUp = async (question) => {
  if (!question.trim() || isLoading.value) return;
  
  isLoading.value = true;
  
  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        component: selectedComponent.value,
        question: question
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get response');
    }

    response.value = data.response;
  } catch (error) {
    console.error('Error getting follow-up response:', error);
    response.value = error.message || 'Sorry, there was an error processing your question. Please try again.';
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
</style> 