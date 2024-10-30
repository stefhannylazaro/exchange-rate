<template>
  <div class="md:grid md:grid-cols-2 md:gap-6 md:items-center md:h-svh md:px-8 lg:px-40">
    <div class="text-white py-8">
      <div class="container mx-auto text-center md:text-left">
        <h1 class="mb-4 title">El mejor <br>tipo de cambio</h1>
        <p class="description">para cambiar dólares y soles <br>online en Perú</p>
      </div>
    </div>
    <div class="bg-white pt-8 pb-6 md:rounded-md">
      <div class="container mx-auto">
        <ConvertCurrency/>
      </div>
    </div>
    
  </div> 
</template>

<script lang="ts">

import ConvertCurrency from '@/components/ConvertCurrency.vue'

export default {
  name: 'ExchangeRateView',
  components: {
    ConvertCurrency
  }
}
</script>