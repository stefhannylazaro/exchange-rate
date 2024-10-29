<template>
  <ExchangeRateViewVue/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExchangeRateViewVue from './views/ExchangeRateView.vue';

export default defineComponent({
  name: 'App',
  components: {
    ExchangeRateViewVue
  }
});
</script>
