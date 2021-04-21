const switchPanelSelector = '.banner__switch-panel';
const switchPanelClass = 'banner__switch-panel--switched';
const switchPanels = document.querySelectorAll(switchPanelSelector);

if (switchPanels) {
    switchPanels.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains(switchPanelClass)) {
                item.classList.add(switchPanelClass);
            } else {
                item.classList.remove(switchPanelClass)
            }
        })
    });
}
