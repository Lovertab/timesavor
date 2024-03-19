console.log("Hello World");
const toggleTheme = document.getElementById(`toggle-mode`);
const body = document.body;

toggleTheme.addEventListener('click', () => {
    body.classList.toggle(`dark-mode`);
    body.classList.toggle(`light-mode`);
});
