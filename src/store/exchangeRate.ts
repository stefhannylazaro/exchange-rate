import { ref } from "vue";
import { defineStore } from "pinia";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const useExchangeRateStore = defineStore("exchangeRate", () => {
  const usdToPen = ref<number>(0);
  const penToUsd = ref<number>(0);

  const getExchangeRatesFirebase = () => {
    // rates - collection name
    const exchangeRatesRef = collection(firestore, "rates");
    // listen to changes in Firestore
    onSnapshot(exchangeRatesRef, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        usdToPen.value = data.usd_to_pen || 0;
        penToUsd.value = data.pen_to_usd || 0;
      });
    });
  };

  getExchangeRatesFirebase();

  return {
    usdToPen,
    penToUsd,
  };
});