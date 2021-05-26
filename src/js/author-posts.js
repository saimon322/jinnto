const postsSelector = '.author-articles__list';
const postsHiddenClass = 'author-articles__list--hidden';
const posts = document.querySelector(postsSelector);
const postsTogglerSelector = '.author-articles__toggler';
const postsTogglerClass = 'toggler--active';
const postsToggler = document.querySelector(postsTogglerSelector);

if (posts && postsToggler) {
    let postsInitHeight = `${posts.offsetHeight}px`;
    console.log(postsInitHeight);
    posts.classList.add(postsHiddenClass);
    
    postsToggler.addEventListener('click', () => {
        postsToggler.classList.toggle(postsTogglerClass);

        if (postsToggler.classList.contains(postsTogglerClass)) {
            posts.style.height = postsInitHeight;
        } else {
            posts.style.height = null;
        }
    });
}