<template>
  <div class="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Conversation History</h2>
    
    <div v-if="conversations.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8">
      No conversations yet. Select a component to get started!
    </div>
    
    <div v-else class="space-y-4">
      <div 
        v-for="(conversation, index) in conversations" 
        :key="index"
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium text-gray-800 dark:text-white">{{ conversation.component }}</h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(conversation.timestamp) }}</span>
        </div>
        
        <div class="space-y-2">
          <div v-for="(message, msgIndex) in conversation.messages" :key="msgIndex" class="text-sm">
            <div v-if="message.type === 'question'" class="text-blue-600 dark:text-blue-400 font-medium">
              Q: {{ message.content }}
            </div>
            <div v-else class="text-gray-700 dark:text-gray-300">
              A: {{ message.content }}
            </div>
          </div>
        </div>
        
        <button 
          @click="loadConversation(index)"
          class="mt-3 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  conversations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['load'])

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

const loadConversation = (index) => {
  emit('load', props.conversations[index])
}
</script> 