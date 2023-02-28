import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
    state: () => ({
        loading: false
    }),
    actions: {
        setLoading(loading: boolean){
            this.loading = loading
        }
    },
})
