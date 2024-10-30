<template>
  <div class="convert-currency-header">
    <div
      class="item"
      :class="{ active: tipoCambioSeleccionado === 'compra' }"
      @click="seleccionarTipo('compra')"
    >
      Dólar compra <br /><strong>{{ purchaseRate }}</strong>
    </div>

    <div
      class="item"
      :class="{ active: tipoCambioSeleccionado === 'venta' }"
      @click="seleccionarTipo('venta')"
    >
      Dólar venta <br /><strong>{{ salesRate }}</strong>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed  } from "vue";
import { useExchangeRateStore } from "@/store/exchangeRate";

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
    border-bottom: 1px solid #e7e7ed;

    > .item {
      text-align: center;
      padding-bottom: 5px;
      cursor: pointer;

      &.active {
        color: #2f00ff;
        border-bottom: 2px solid #2f00ff;
      }
    }
  }
</style>
