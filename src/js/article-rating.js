$(() => {
    const rating = document.querySelector('.article-rating');

    if (rating) {
        const ratingStars = document.querySelectorAll('.article-rating__stars input');
        const ratingResults = document.querySelector('.article-rating__result');
        const activeClass = 'article-rating__result--active';

        ratingStars.forEach((item) => {
            item.addEventListener('change', () => {
                ratingResults.classList.add(activeClass);
            })
        })

    }
})