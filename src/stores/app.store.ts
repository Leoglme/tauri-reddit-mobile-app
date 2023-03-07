import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    currentFilter: ""
  }),
  getters: {
    getCurrentFilter(state){
      return state.currentFilter;
    }
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setCurrentFilter(newFilter: string){
      this.currentFilter = newFilter
    }
  },
})
