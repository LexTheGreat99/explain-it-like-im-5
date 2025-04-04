<template>
  <div class="flex items-center justify-center gap-15 px-4 py-4 w-full">
    <button
      v-for="component in components"
      :key="component"
      @click="selectComponent(component)"
      :disabled="disabled"
      class="px-6 py-3 bg-white text-[#123458] rounded-full
             font-medium text-sm
             transition-all duration-300
             hover:bg-[#123458] hover:text-[#F1EFEC]
             hover:shadow-lg hover:shadow-[#123458]/20
             active:scale-95
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
             group relative overflow-hidden
             border border-[#123458]/10"
    >
      <span class="relative z-10 transition-colors duration-300 group-hover:text-[#F1EFEC]">
        {{ component }}
      </span>
      <div class="absolute inset-0 bg-gradient-to-r from-[#123458]/10 to-[#123458]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    </button>
  </div>
</template>

<script setup>
const components = [
  'Woofer',
  'Tweeter',
  'Amplifier',
  'Crossover',
  'Enclosure'
]

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])
const selectComponent = (component) => {
  emit('select', component)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

button {
  font-family: 'Inter', sans-serif;
}

button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), hsl(220, 66%, 21%) 0%, transparent 25%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  border-radius: 9999px;
}

button:hover::before {
  opacity: 0.1;
}

button:active::before {
  opacity: 0.15;
}

@keyframes button-pop {
  0% {
    transform: scale(0.98);
  }
  40% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.button-pop {
  animation: button-pop 0.25s ease-out;
}
</style>