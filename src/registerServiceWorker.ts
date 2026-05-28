import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      onNeedRefresh() {
        console.log('Nuevo contenido disponible. Actualiza la app.');
      },
      onOfflineReady() {
        console.log('La aplicación está lista para funcionar offline.');
      },
      immediate: true
    });
  }
}
