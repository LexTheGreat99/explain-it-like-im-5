<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
        Explain This Like I'm 5
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-delay">
        Discover how complex things work in simple terms
      </p>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-12 animate-slide-up">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How It Works</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center p-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Select a Component</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Choose from various speaker parts</p>
          </div>
          
          <div class="flex flex-col items-center p-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-300">2</span>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Get an Explanation</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">AI explains how it works in simple terms</p>
          </div>
          
          <div class="flex flex-col items-center p-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-300">3</span>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Ask Follow-up Questions</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Dive deeper with your questions</p>
          </div>
        </div>
      </div>
      
      <button 
        @click="$emit('get-started')"
        class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-medium rounded-lg 
               hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 
               transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['get-started'])
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-in-out 0.3s both;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out 0.6s both;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style> 