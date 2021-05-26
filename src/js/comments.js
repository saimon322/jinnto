const commentsScrolls = document.querySelectorAll('.comments-scroll');
const commentsFrom = document.querySelector('.comments-form');

if (commentsScrolls) {
    commentsScrolls.forEach(item => {
        const scroll = function(e) {
            e.preventDefault();
            commentsFrom.scrollIntoView({
                behavior: "smooth"
            });
            return false;
        };

        item.addEventListener('click', scroll)
    });
}