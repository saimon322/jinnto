const inputsWrapper = document.querySelectorAll('[data-inputs-wrapper]');

if (inputsWrapper) {
    inputsWrapper.forEach(wrapper => {
        const inputs = wrapper.querySelectorAll('input');
        const checkAllInput = wrapper.querySelector('[data-check-all-input]');

        checkAllInput.addEventListener('click', (event) => {
            event.preventDefault();

            inputs.forEach(input => {
                input.toggleAttribute('checked');
            });
        });

    });
}
