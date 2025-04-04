<template>
  <div class="relative overflow-hidden min-h-screen">
    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Explain it like I'm 5
        </h1>
        
        <p class="text-xl font-medium text-primary mb-16">
          Understanding speaker systems made simple
        </p>

        <!-- Steps -->
        <div class="grid gap-6 text-left">
          <div class="floating-card no-float bg-secondary border border-border/50">
            <h3 class="text-lg font-semibold mb-2 text-foreground">1. Choose a Component</h3>
            <p class="text-muted-foreground">Select from woofer, tweeter, amplifier, crossover, or enclosure to learn about specific parts of a speaker system.</p>
          </div>

          <div class="floating-card no-float bg-secondary border border-border/50">
            <h3 class="text-lg font-semibold mb-2 text-foreground">2. Get Simple Explanations</h3>
            <p class="text-muted-foreground">Receive clear, easy-to-understand explanations about how each component works and its role in the system.</p>
          </div>

          <div class="floating-card no-float bg-secondary border border-border/50">
            <h3 class="text-lg font-semibold mb-2 text-foreground">3. Ask Questions</h3>
            <p class="text-muted-foreground">Still curious? Ask follow-up questions to deepen your understanding of any concept.</p>
          </div>
        </div>

        <!-- Get Started Button -->
        <div class="mt-12">
          <NuxtLink 
            to="/components" 
            class="group px-8 py-3 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            Get Started
            <Icon name="carbon:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Make sure to install the nuxt/icon module if not already installed
// npm install --save-dev @nuxt/icon
// And add it to your nuxt.config.ts modules array
</script>
