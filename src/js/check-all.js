const inputsWrapper = document.querySelectorAll('[data-inputs-wrapper]');

if (inputsWrapper) {
    inputsWrapper.forEach(wrapper => {
        const inputs = wrapper.querySelectorAll('input');
        const checkAllLabel = wrapper.querySelector('[data-check-all-label]');
        const checkAllInput = wrapper.querySelector('[data-check-all-label] input');

        checkAllLabel.addEventListener('click', (event) => {
            if (checkAllInput.checked) {
                inputs.forEach(input => {
                    input.checked = true;
                });
            } else {
                inputs.forEach(input => {
                    input.checked = false;
                });
            }
        });

    });
}
