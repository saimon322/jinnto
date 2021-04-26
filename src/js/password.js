const passwordTogglerSelector = '.password-toggler';
const passwordTogglerClass = 'password-toggler--active';
const passwordTogglers = document.querySelectorAll('.password-toggler');
const passwordInputsSelector = 'input[type="password"]';

if (passwordTogglers) {
    passwordTogglers.forEach(item => {
        const toggler = () => {
            item.classList.toggle(passwordTogglerClass);
            let input = item.previousElementSibling;
            input.type = (input.type === "password") ? "text" : "password";
        };

        item.addEventListener('click', toggler)
    });
}