let deferredPrompt;
console.log('prompt')
navigator.storage.persist()

try {
    if (window.safari) {
        history.pushState(null, null, location.href);
        window.onpopstate = function (event) {
            history.go(1);
        };
    }
} catch (e) { return }

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  /* e.preventDefault(); */
  deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener('load', (e) => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
    }
    let buttonInstall = document.getElementById('buttonInstall');
    if (!buttonInstall) return
    buttonInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    // Show the install prompt
        if (deferredPrompt) {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }
    });
})
