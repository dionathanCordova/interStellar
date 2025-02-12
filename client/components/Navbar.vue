<!-- <template>
  <nav class="bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 shadow-xl">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo Section -->
        <!-- <NuxtLink to="/" class="flex items-center space-x-2">
          <Icon name="lucide:terminal" class="w-6 h-6 text-blue-500" />
          <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Blockchain Explorer
          </span>
        </NuxtLink> -->

        <!-- Navigation Links -->
        <!-- <div class="flex space-x-2">
          <Button 
            asChild
            variant="ghost"
            class="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-all duration-200"
            v-for="link in links"
            :key="link.path"
          >
            <NuxtLink 
              :to="link.path"
              class="flex items-center space-x-2"
              active-class="text-blue-400 bg-gray-800/50"
            >
              <Icon :name="link.icon" class="w-5 h-5" />
              <span>{{ link.label }}</span>
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template> -->

<!-- components/Navbar.vue -->
<template>
  <nav class="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-xl">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Improved Logo Section -->
        <NuxtLink to="/" class="flex items-center group">
          <div class="p-2 rounded-lg transition-all duration-300 flex items-center justify-center">
            <Icon name="lucide:chevron-right" class="w-6 h-6 text-blue-400 align-middle" />
          </div>
          <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-none">
            Blockchain Explorer
          </span>
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="flex space-x-3">
          <NuxtLink 
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="group relative px-6 py-3 rounded-lg transition-all duration-300 bg-gray-800/40 hover:bg-gray-700/40 min-w-40 flex items-center justify-center"
            active-class="active-route"
            exact
          >
            <!-- Hover Gradient -->
            <div class="absolute inset-0 overflow-hidden rounded-lg">
              <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Active State Gradient -->
            <div class="absolute rounded-lg inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-[.active-route]:opacity-100"></div>
            
            <!-- Click Feedback Outline -->
            <div class="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-100"></div>
            
            <div class="relative z-10 flex items-center space-x-3 text-gray-300 group-hover:text-white group-[.active-route]:text-blue-400">
              <Icon :name="link.icon" class="w-6 h-6 flex-shrink-0" />
              <span class="text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis">{{ link.label }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
const links = [
  {
    path: '/block',
    label: 'Block',
    icon: 'lucide:box'
  },
  {
    path: '/transaction',
    label: 'Transaction',
    icon: 'lucide:arrow-right-left'
  },
  {
    path: '/wallet',
    label: 'Wallet',
    icon: 'lucide:wallet'
  }
]
</script>

<style>
/* Smooth transition for all properties */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.active-route {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
}

.active-route::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: inherit;
  z-index: 0;
  animation: active-border 0.3s ease-out;
  /* Create border effect using mask */
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  padding: 2px;
}

@keyframes active-border {
  from {
    opacity: 0;
    padding: 0;
  }
  to {
    opacity: 1;
    padding: 2px;
  }
}

/* Ensure content stays above the border */
.relative.z-10 {
  position: relative;
  z-index: 1;
}
</style>