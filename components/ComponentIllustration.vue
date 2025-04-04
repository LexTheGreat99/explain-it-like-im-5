<template>
  <div class="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Component Illustration</h2>
    
    <div v-if="!component" class="text-center text-gray-500 dark:text-gray-400 py-8">
      Select a component to see its illustration
    </div>
    
    <div v-else class="flex flex-col items-center">
      <div class="w-full max-w-md h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
        <img 
          v-if="illustrationUrl" 
          :src="illustrationUrl" 
          :alt="`Illustration of ${component}`"
          class="max-h-full max-w-full object-contain"
        />
        <div v-else class="text-gray-500 dark:text-gray-400 text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No illustration available for {{ component }}</p>
        </div>
      </div>
      
      <div class="text-center text-gray-700 dark:text-gray-300">
        <p class="font-medium">{{ getComponentDescription(component) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  component: {
    type: String,
    default: ''
  }
})

// This would be replaced with actual illustrations in a production app
const illustrations = {
  Woofer: '/images/woofer.svg',
  Tweeter: '/images/tweeter.svg',
  Amplifier: '/images/amplifier.svg',
  Crossover: '/images/crossover.svg',
  Enclosure: '/images/enclosure.svg'
}

const componentDescriptions = {
  Woofer: 'A large speaker driver that produces low-frequency sounds',
  Tweeter: 'A small speaker driver that produces high-frequency sounds',
  Amplifier: 'Increases the power of audio signals',
  Crossover: 'Divides audio signals into different frequency ranges',
  Enclosure: 'The cabinet that houses the speaker components'
}

const illustrationUrl = computed(() => {
  if (!props.component) return null
  return illustrations[props.component] || null
})

const getComponentDescription = (component) => {
  return componentDescriptions[component] || 'A component of a sound system'
}
</script> 