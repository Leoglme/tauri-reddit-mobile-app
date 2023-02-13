import { defineStore } from "pinia";

export const useTestStore = defineStore('counter', {
    state: () => {
        return {
            count: 0,
        }
    },

    actions: {
        increment() {
            this.count++
        },
    },
})