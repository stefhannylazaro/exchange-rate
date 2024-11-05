<template>
  <div class="convert-currency-header">
    <div
      class="item"
      :class="{ active: tipoCambioSeleccionado === EXCHANGE_TYPES.BUY }"
      @click="seleccionarTipo(EXCHANGE_TYPES.BUY)"
    >
      Dólar compra <br /><strong>{{ purchaseRate }}</strong>
    </div>

    <div
      class="item"
      :class="{ active: tipoCambioSeleccionado === EXCHANGE_TYPES.SALE }"
      @click="seleccionarTipo(EXCHANGE_TYPES.SALE)"
    >
      Dólar venta <br /><strong>{{ salesRate }}</strong>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed  } from "vue";
import { useExchangeRateStore } from "@/store/exchangeRate";
import { EXCHANGE_TYPES } from "@/constants/exchangeRates";

export default defineComponent({
  props: {
    tipoCambioSeleccionado: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const exchangeRateStore = useExchangeRateStore();
    const purchaseRate = computed(() => exchangeRateStore.usdToPen);
    const salesRate = computed(() => exchangeRateStore.penToUsd);
       
    // emitir evento al padre con la selección del tipo de cambio 
    const seleccionarTipo = (tipo: string) => {
      emit("updateExchangeRate", tipo); 
    };

    return {
      purchaseRate,
      salesRate,
      tipoCambio: props.tipoCambioSeleccionado,
      seleccionarTipo,
      EXCHANGE_TYPES,
    };
  },
});
</script>

<style lang="scss">
  .convert-currency-header {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    line-height: 13.86px;
    border-bottom: 1px solid $gray-2;

    > .item {
      text-align: center;
      padding-bottom: 5px;
      cursor: pointer;

      &.active {
        color: $blue-1;
        border-bottom: 2px solid $blue-1;
      }
    }
  }
</style>
