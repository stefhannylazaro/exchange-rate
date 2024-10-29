<template>
  <div class="container">
    <ConvertCurrency/>
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