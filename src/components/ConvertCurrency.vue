<template>
  <div class="convert-currency">
    <ConvertCurrencyHeader
      @updateExchangeRate="updateExchangeRate"
      :tipoCambioSeleccionado="tipoCambioSeleccionado"
      class="mb-12" 
    />

    <div class="px-4">
      <div class="relative mb-12">
        <!-- card - initial dollar amount -->
        <div class="convert-currency__card">
          <div class="convert-currency__text">{{ currencyLabel1 }}</div>
          <div class="convert-currency__amount">
            <p>Envías</p>
            <div class="amount-input">
              <label for="amountSent">{{ currencySymbol1 }}</label>
              <input
                type="number"
                v-model.number="montoMoneda1"
                @input="calculateChange('moneda1')"
                min="0"
                @keydown="restrictNegatives"
                id="amountSent"
              />
            </div>
          </div>
        </div>

        <div class="convert-currency__change-button" @click="changeConversion">
          <img
            title="Boton cambiar moneda"
            alt="Boton cambiar moneda"
            src="../assets/images/refresh.svg"
          />
        </div>

        <!-- card - initial amount in soles -->
        <div class="convert-currency__card">
          <div class="convert-currency__text">{{ currencyLabel2 }}</div>
          <div class="convert-currency__amount">
            <p>Recibes</p>
            <div class="amount-input">
              <label for="amountReceived">{{ currencySymbol2 }}</label>
              <input
                type="number"
                v-model.number="montoMoneda2"
                @input="calculateChange('moneda2')"
                min="0"
                @keydown="restrictNegatives"
                id="amountReceived"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="button button--primary w-full">Iniciar operación</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useExchangeRateStore } from "@/store/exchangeRate";
import ConvertCurrencyHeader from "@/components/ConvertCurrencyHeader.vue";
import { EXCHANGE_TYPES, USD_CURRENCY, PEN_CURRENCY } from "@/constants/exchangeRates";

export default {
  components: {
    ConvertCurrencyHeader,
  },
  setup() {
    const exchangeRateStore = useExchangeRateStore();
    const montoMoneda1  = ref<number>(0);
    const montoMoneda2 = ref<number>(0);
    const tipoCambioSeleccionado = ref<string>(EXCHANGE_TYPES.BUY); // init

    // computed
    const currencyLabel1 = computed(() => (tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY ? USD_CURRENCY.LABEL : PEN_CURRENCY.LABEL));
    const currencyLabel2 = computed(() => (tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY ? PEN_CURRENCY.LABEL : USD_CURRENCY.LABEL));
    const currencySymbol1 = computed(() => (tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY ? USD_CURRENCY.SYMBOL : PEN_CURRENCY.SYMBOL));
    const currencySymbol2 = computed(() => (tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY ? PEN_CURRENCY.SYMBOL : USD_CURRENCY.SYMBOL));

    // calculate change
    const calculateChange = (moneda: string) => {
      const isBuying = tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY;
      const rate = isBuying ? exchangeRateStore.usdToPen : exchangeRateStore.penToUsd;

      if (moneda === "moneda1") {
        montoMoneda2.value = parseFloat((isBuying ? montoMoneda1.value * rate : montoMoneda1.value / rate).toFixed(2));
      } else {
        montoMoneda1.value = parseFloat((!isBuying ? montoMoneda2.value * rate : montoMoneda2.value / rate).toFixed(2));
      }
    };

    // change conversion direction dollars to soles or soles to dollars 
    const changeConversion = () => {
      tipoCambioSeleccionado.value = tipoCambioSeleccionado.value === EXCHANGE_TYPES.BUY ? EXCHANGE_TYPES.SALE : EXCHANGE_TYPES.BUY;
      calculateChange("moneda1");
    };

    // actualizar tipo de cambio cuando viene de c. hijo
    const updateExchangeRate = (tipo: string) => {
      tipoCambioSeleccionado.value = tipo;
      calculateChange("moneda1");
    };

    const restrictNegatives = (event: KeyboardEvent) => {
      if (event.key === "-" || event.key === "e") {
        event.preventDefault();
      }
    };

    return {
      montoMoneda1,
      montoMoneda2,
      currencyLabel1,
      currencyLabel2,
      currencySymbol1,
      currencySymbol2,
      tipoCambioSeleccionado,
      changeConversion,
      calculateChange,
      restrictNegatives,
      updateExchangeRate,
      EXCHANGE_TYPES
    };
  },
};
</script>

<style lang="scss">
.convert-currency {
  &__card {
    width: 100%;
    border: 1px solid $purple-1;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    gap: 12px;

    &:first-child {
      margin-bottom: 20px;
    }
  }

  &__text {
    font-size: 14px;
    line-height: 24px;
    color: $purple-1;
    background: $gray-1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 0 0 6px;
    width: 80px;
    flex-shrink: 0;
  }

  &__amount {
    padding: 6px 12px 6px 0;
    text-align: right;
    flex-shrink: 0;

    p {
      font-size: 12px;
      line-height: 14.22px;
      color: $gray-3;
    }

    .amount-input {
      display: flex;
      align-items: center;
      color: $gray-4;
      font-size: 16px;
      line-height: 24px;

      label {
        margin-right: 5px;
      }

      input {
        border: none;
        outline: none;
        background: transparent;
        text-align: right;

        @media (max-width: 420px) {
          max-width: 130px;
        }
      }
    }
  }

  &__change-button {
    position: absolute;
    width: 42px;
    height: 42px;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

