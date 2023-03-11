import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'

const pinia = createPinia()

/*Vee-validate*/
import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import fr from '@vee-validate/i18n/dist/locale/fr.json'
import { required, between, confirmed, email, min, min_value, url, numeric, max } from '@vee-validate/rules'

// define global rules
defineRule('required', required)
defineRule('between', between)
defineRule('email', email)
defineRule('confirmed', confirmed)
defineRule('min', min)
defineRule('max', max)
defineRule('url', url)
defineRule('min_value', min_value)
defineRule('numeric', numeric)

localize({ fr })

// Activate the locale
configure({
  generateMessage: localize('fr', {
    names: {},
  }),
})
import { App as CapacitorApp } from '@capacitor/app'
import { BaseApi } from '@/api/BaseApi'
CapacitorApp.addListener('appUrlOpen', async (data: { url: string }) => {
  const url = '/access-token' + data.url.replace(BaseApi.redirectUri, '')
  await router.push(url)
})

createApp(App).use(router).use(pinia).mount('#app')
