import { defineStore } from "pinia";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: ref(0), 
    name: "Eduardo" 
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
