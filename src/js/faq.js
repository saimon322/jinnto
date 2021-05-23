const faqTogglerSelector = '.faq-toggler';
const faqTogglerClass = 'toggler--active';
const faqTogglers = document.querySelectorAll(faqTogglerSelector);
const faqParentSelector = '.faq-answers__item';
const faqItemsSelector = '.faq-item';
const faqAnswersSelector = '.faq-item__answer';
const faqItemsClass = 'faq-item--open';

if (faqTogglers) {
    faqTogglers.forEach(togglerItem => {
        const toggler = () => {
            togglerItem.classList.toggle(faqTogglerClass);
            let togglerParent = togglerItem.closest(faqParentSelector);
            let togglerItems = togglerParent.querySelectorAll(faqItemsSelector);
            let togglerAnswers = togglerParent.querySelectorAll(faqAnswersSelector);

            if (togglerItem.classList.contains(faqTogglerClass)) {
                togglerItems.forEach(item => {
                    item.classList.add(faqItemsClass);
                    $(togglerAnswers).slideDown();
                })
            } else {
                togglerItems.forEach(item => {
                    item.classList.remove(faqItemsClass);
                    $(togglerAnswers).slideUp();
                })
            }
        };

        togglerItem.addEventListener('click', toggler)
    });
}