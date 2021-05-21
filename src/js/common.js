import AOS from 'aos';
import Swiper from 'swiper/swiper-bundle.min.js';
import Parallax from 'parallax-js';
import './svg-sprite';
// WAI-ARIA Authoring Practices 1.1 / Listbox
// https://www.w3.org/TR/wai-aria-practices-1.1
// utils.js + listbox.js + listbox-scrollable.js = listbox.js
import './listbox';

$(function() {
    'use strict';

    const $window = $(window);
    const $page = $('html');
    const $body = $('body');
    const $nav = $('.nav');
    const $header = $('.header');
    const $menuBtn = $('.hamburger');

    // Header mobile menu

    $menuBtn.on('click', () => {
        $menuBtn.toggleClass('active');
        $body.toggleClass('overflow');
		$header.toggleClass('nav-show');
    });

    $(document).on('mouseup', function (e) {
        if ($header.hasClass('nav-show')) {
            if (!$nav.is(e.target) &&
                $nav.has(e.target).length === 0 &&
                !$menuBtn.is(e.target) &&
                $menuBtn.has(e.target).length === 0) {
                closeMenu();
            }
        }
    });

    function closeMenu() {
        $menuBtn.removeClass('active');
        $body.removeClass('overflow');
		$header.removeClass('nav-show');
    }

    navTransition();
    window.addEventListener('resize', () => {
        navTransition();

        if (window.matchMedia('(min-width: 768px)').matches) {
            closeMenu();
        }
    }, { passive: true })

    function navTransition() {
        $nav.toggleClass('transitioned', window.matchMedia('(max-width: 767px)').matches);
    }

    // Header on scroll event listener
    let lastScrollTop = 0;
    calcScroll();
    window.addEventListener('scroll', function() {
        calcScroll();
    }, {passive: true})

    // Calculate scroll position
    function calcScroll() {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        $header.toggleClass('nav-small', (st > 125));
        $header.toggleClass('nav-up', (st > 200 && st > lastScrollTop));

        lastScrollTop = st <= 0 ? 0 : st;
    }

    // Init AOS
    AOS.init({
        duration: 500,
        // once: true,
    });

    // Parallax init
    const parallax = $('.parallax');
    if (parallax.length) {
        parallax.each(function() {
            new Parallax(this);
        })
    }

    // Stages cursor
    const stages = $('.stages');
    if (stages.length) {

        // Class for dot elements
        class Dot {
            constructor(line) {
                this.sprite = line.find('circle').get(0);
                this.track = line.find('path').get(0);
                return this;
            }
            move(u) {
                const p = this.track.getPointAtLength(u * this.track.getTotalLength());
                this.sprite.setAttribute("transform", `translate(${p.x}, ${p.y})`);
            }
        };

        // Array with stages parameters
        let stagesArr = [];
        $('.stage').each(function(){
            let stage = {};
            stage.item = $(this);
            stage.top = stage.item.position().top;
            stage.bot = stage.top + stage.item.outerHeight();

            // Stage box
            stage.box = stage.item.find('.stage__box');
            stage.boxTop = stage.top;
            stage.boxBot = stage.boxTop + stage.box.outerHeight();

            // Stage line and dot
            let line = stage.item.find('.stage__line--desktop');
            if (line.length) {
                stage.lineTop = line.offset().top - stages.offset().top;
                stage.lineHeight = line.height();
                stage.dot = new Dot(line);
            }

            stagesArr.push(stage);
        })

        // Function for change stages on scroll
        function stagesScroll() {
            let winTop = $window.scrollTop();
            let winHeight = $window.height();
            let stagesTop = stages.offset().top;
            let windowMid = Math.max(-50, (winTop - stagesTop + winHeight / 2));

            stagesArr.forEach(function(stage) {
                let $stage = stage.item;
                let $box = stage.box;
                let $dot = stage.dot;
                if (windowMid - 50 < stage.boxTop) {
                    // View over stage
                    $box.removeClass('cursor-in cursor-out');
                }
                else if (windowMid + 50 > stage.boxBot) {
                    // View under stage
                    $box.removeClass('cursor-in').addClass('cursor-out');
                    $stage.addClass('visible-dot');

                    if (windowMid - 50 > stage.bot)
                        $stage.removeClass('visible-dot');
                }
                else {
                    // View inside stage
                    $box.removeClass('cursor-out').addClass('cursor-in');
                    $stage.removeClass('visible-dot');
                }

                // Move dot with the scroll
                if ($dot)
                    $dot.move(( windowMid - stage.lineTop) / stage.lineHeight);
            })
        }

        stagesScroll();
        window.addEventListener('scroll', function() {
            stagesScroll();
        }, {passive: true})
    }

    // Init instagram slider
    const instSlider = $('.instagram__slider');
    if (instSlider.length) {
        let slider = new Swiper(('.instagram__slider .swiper-container'), {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 20,
                }
            },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        })
    }

    const accountTutorialSlider = $('.account-tutorial__slider');

    if (accountTutorialSlider.length) {
        let slider = new Swiper(('.account-tutorial__slider .swiper-container'), {
            slidesPerView: 1,
            navigation: {
                nextEl: '.account-tutorial__slider-btn--next',
                prevEl: '.account-tutorial__slider-btn--prev',
            },
        })
    }

    // Faq
    const $faq = $('.faq');
    if ($faq.length) {
        $('.faq-item__question').on('click', function(){
            $(this).parent().toggleClass('faq-item--open');
            $(this).siblings().stop().slideToggle();
        })
    }

    // 100 vh fix
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

    // START IOS SCROLLING BUG FIX
    ////////////////////////////////////////////////////////////////////////////
    // 1. Фиксация <body>
    function bodyFixPosition() {

        setTimeout( function() {
            /* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */

            if ( !document.body.hasAttribute('data-body-scroll-fix') ) {

                // Получаем позицию прокрутки
                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                // Ставим нужные стили
                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.width = '100%';

            }

        }, 15 ); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */

    }

    // 2. Расфиксация <body>
    function bodyUnfixPosition() {

        if ( document.body.hasAttribute('data-body-scroll-fix') ) {

            // Получаем позицию прокрутки из атрибута
            let scrollPosition = document.body.getAttribute('data-body-scroll-fix');

            // Удаляем атрибут
            document.body.removeAttribute('data-body-scroll-fix');

            // Удаляем ненужные стили
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';

            // Прокручиваем страницу на полученное из атрибута значение
            window.scroll(0, scrollPosition);

        }

    }
    // END IOS SCROLLING BUG FIX
    ////////////////////////////////////////////////////////////////////////////

    // START FILTER
    ////////////////////////////////////////////////////////////////////////////
    // reserve a place for a filter
    const $filter = $('.filter');
    if ($filter.length) {
        $body.css({'paddingBottom': `${43 + $filter.height()}px`});
    }

    // show/hide filter dropdown
    $('.filter__button').on('click', function () {
        let $filterDropdown = $(this).closest('.filter__item').find('.filter-dropdown');
        let $filterDropdownHead = $filterDropdown.find('.filter-dropdown__head');

        $filterDropdown.addClass('filter-dropdown--show');
        bodyFixPosition();
        fixFilterHeight($filterDropdownHead);
    });

    function fixFilterHeight($filterDropdownHead) {
        let $filterDropdownHeadHeight = $filterDropdownHead.height();
        $page[0].style.setProperty('--filter-dropdown-head-height', `${$filterDropdownHeadHeight}px`);
    }

    $('.filter-dropdown__close').on('click', function () {
        let $filterDropdown = $(this).closest('.filter__item').find('.filter-dropdown');
        $filterDropdown.removeClass('filter-dropdown--show');
        bodyUnfixPosition();
    });
    // END FILTER
    ////////////////////////////////////////////////////////////////////////////

    // START INIT ARTICLE SLIDER
    ////////////////////////////////////////////////////////////////////////////
    let sliders1 = document.querySelectorAll('.slider-1');
    sliders1.forEach(slider => {
        let container = slider.querySelector('.swiper-container');
        let buttonPrev = slider.querySelector('.slider-1__button--prev');
        let buttonNext = slider.querySelector('.slider-1__button--next');

        let swiper = new Swiper(container, {
            navigation: {
                prevEl: buttonPrev,
                nextEl: buttonNext,
            },
        });
    });
    // END INIT ARTICLE SLIDER
    ////////////////////////////////////////////////////////////////////////////

    // START INIT POSTS SLIDER
    ////////////////////////////////////////////////////////////////////////////
    let postsSliders = document.querySelectorAll('.posts-slider');

    postsSliders.forEach(slider => {
        let swiper = new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centerInsufficientSlides: true,
            watchOverflow: true,
            freeMode: true,
            breakpoints: {
                576: { // when window width is >= 576px
                    spaceBetween: 20,
                },
                768: {
                    spaceBetween: 30,
                },
            },
        });
    });
    // END INIT POSTS SLIDER
    ////////////////////////////////////////////////////////////////////////////
}); // end ready
