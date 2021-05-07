const powersRatingsClass = 'powers__list--ratings';
const powersRatings = document.querySelector(`.${powersRatingsClass}`);
const powersAOSId = 'powers-ratings';

if (powersRatings) {
    document.addEventListener(`aos:in:${powersAOSId}`, () => {
        powersRatings.classList.remove(powersRatingsClass);
    });
}