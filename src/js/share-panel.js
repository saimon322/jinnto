const sharePanels = document.querySelectorAll('[data-share-panel]');

if (sharePanels) {
    sharePanels.forEach(panel => {
        const shareInput = panel.querySelector('[data-share-input]');
        const shareButton = panel.querySelector('[data-share-button]');

        shareButton.addEventListener('click', () => {
            shareInput.select();
            document.execCommand('copy');
            shareButton.innerHTML = 'Copied!';
        });
    });
}
