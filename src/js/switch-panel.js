const switchPanelSelector = '.banner__switch-panel';
const switchPanelClass = 'banner__switch-panel--switched';
const switchPanels = document.querySelectorAll(switchPanelSelector);
const contentBox = document.querySelector('.gift-content');
const nextContentClass = 'gift-content--sub-content';
const animationClass = 'gift-content-fade';

if (switchPanels) {
    switchPanels.forEach(item => {
        const switcher = () => {
            item.classList.toggle(switchPanelClass);
            contentBox.classList.toggle(nextContentClass);
        };

        item.addEventListener('click', switcher)
    });

}
