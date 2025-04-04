<template>
  <div class="flex flex-col h-[400px] bg-secondary rounded-xl shadow-lg overflow-hidden">
    <!-- Chat Header -->
    <div class="p-2 border-b border-border/50">
      <h2 class="text-lg font-semibold text-foreground">
        {{ selectedComponent ? `Explaining ${selectedComponent}` : 'Select a Component' }}
      </h2>
    </div>

    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary">
      <div v-if="!selectedComponent" class="flex justify-center items-center h-full">
        <p class="text-muted-foreground">
          Select a component from the left to get started
        </p>
      </div>
      
      <template v-else>
        <!-- Initial Response -->
        <div class="p-4 space-y-8">
          <div class="flex gap-4 bg-muted p-4 rounded-lg">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
                <Icon name="carbon:bot" class="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div class="flex-1">
              <p v-if="response" class="text-foreground whitespace-pre-wrap">{{ response }}</p>
              <p v-else-if="isLoading" class="text-muted-foreground">
                <span class="inline-block animate-bounce">•</span>
                <span class="inline-block animate-bounce delay-100">•</span>
                <span class="inline-block animate-bounce delay-200">•</span>
              </p>
            </div>
          </div>

          <!-- Follow-up Section -->
          <div class="relative bg-muted/50 rounded-lg p-4 mt-6">
            <p class="text-sm text-muted-foreground mb-3">Have a question? Ask for more details!</p>
            <div class="flex items-center gap-2">
              <div class="relative flex-1">
                <input
                  v-model="followUpQuestion"
                  @keyup.enter="askFollowUp"
                  type="text"
                  placeholder="Ask a follow-up question..."
                  class="w-full pl-4 pr-4 py-2.5 bg-white rounded-full border border-border/50 
                         focus:ring-2 focus:ring-primary focus:border-transparent 
                         text-foreground placeholder-muted-foreground shadow-sm"
                  :disabled="isLoading || !selectedComponent"
                />
              </div>
              <button
                @click="askFollowUp"
                class="flex-shrink-0 h-10 w-10 rounded-full bg-white border border-[#123458] flex items-center justify-center
                       hover:bg-[#123458] transition-all
                       disabled:opacity-50 disabled:hover:bg-white group"
                :disabled="isLoading || !followUpQuestion.trim() || !selectedComponent"
              >
                <div class="relative left-[1px]">
                  <Icon name="carbon:send-filled" class="w-5 h-5 text-[#123458] group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  selectedComponent: String,
  response: String,
  isLoading: Boolean
})

const emit = defineEmits(['follow-up'])
const followUpQuestion = ref('')

const askFollowUp = () => {
  if (followUpQuestion.value.trim() && !props.isLoading) {
    emit('follow-up', followUpQuestion.value)
    followUpQuestion.value = ''
  }
}
</script>

<style scoped>
.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}
</style>