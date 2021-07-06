const hiddenPosts = $('#loadMoreTarget');
const postsToggler = document.querySelector('#loadMoreBtn');
const postsTogglerClass = 'toggler--active';

if (hiddenPosts && postsToggler) {    
    postsToggler.addEventListener('click', () => {
        postsToggler.classList.toggle(postsTogglerClass);
        hiddenPosts.slideToggle();
    });
}