<script setup lang="ts">
import { GlobeAltIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center py-16 px-8 text-center relative overflow-hidden bg-surface group">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(196,125,95,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(122,139,110,0.05)_0%,transparent_70%)] pointer-events-none rounded-full" />
    
    <div class="relative z-10 max-w-[600px]">
      <GlobeAltIcon class="w-20 h-20 mx-auto mb-8 text-terracotta dark:text-sage opacity-60" />
      
      <div class="space-y-4">
        <h2 class="font-sans text-[5rem] sm:text-[8rem] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text to-terracotta dark:from-text dark:to-sage mb-2">404</h2>
        <p class="font-sans text-xl sm:text-2xl font-semibold text-text">Territory not found</p>
        <p class="font-sans text-base sm:text-lg text-muted leading-relaxed max-w-[400px] mx-auto pb-6">
          The region you're exploring doesn't appear on our charts. 
          Perhaps it's hidden in uncharted waters?
        </p>
        
        <div class="flex justify-center gap-4 sm:gap-8 py-6 border-y border-muted/10 mb-10">
          <div class="flex flex-col items-center">
            <span class="font-sans text-xl sm:text-2xl font-bold text-terracotta dark:text-sage">250+</span>
            <span class="font-sans text-[10px] sm:text-xs font-medium text-muted uppercase tracking-widest">Countries</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-sans text-xl sm:text-2xl font-bold text-terracotta dark:text-sage">195</span>
            <span class="font-sans text-[10px] sm:text-xs font-medium text-muted uppercase tracking-widest">Nations</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-sans text-xl sm:text-2xl font-bold text-terracotta dark:text-sage">6</span>
            <span class="font-sans text-[10px] sm:text-xs font-medium text-muted uppercase tracking-widest">Continents</span>
          </div>
        </div>
        
        <a href="/" class="inline-flex items-center gap-3 px-8 py-4 bg-text text-surface rounded font-medium transition-all duration-300 hover:bg-terracotta dark:hover:bg-sage hover:-translate-y-0.5">
          <span>Return to Explorer</span>
          <ArrowRightIcon class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
    
    <div class="absolute bottom-8 right-8 opacity-10 dark:opacity-5">
      <div class="w-16 h-16 border-2 border-text rounded-full relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-text" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-text" />
      </div>
      <div class="flex flex-col text-xs font-mono font-bold text-text mt-2">
        <span>00°00'00"N</span>
        <span>00°00'00"W</span>
      </div>
    </div>
  </div>
</template>