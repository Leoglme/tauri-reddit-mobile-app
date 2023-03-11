import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.redditech',
  appName: 'Reddit',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#ff0',
  },
}

export default config
