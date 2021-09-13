// serviceworker
if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('../sw.js');
    console.log('SW registered');
  } catch (err) {
    console.log(err);
  }
}
