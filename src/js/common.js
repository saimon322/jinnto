import AOS from 'aos';
import Swiper from 'swiper/swiper-bundle.min.js';
import './svg-sprite';

$(function() {
    'use strict';

    // Init AOS
    AOS.init({
        duration: 500
    });

    const $body = $('body');
    const $nav = $('.nav');
    const $header = $('.header');
    const $menuBtn = $('.hamburger');

    // Header mobile menu
    function navTransition() {
        $nav.toggleClass('transitioned', window.matchMedia('(max-width: 767px)').matches);
    }

    navTransition();
    window.addEventListener('resize', () => {
        navTransition();
    }, { passive: true })

    $menuBtn.on('click', () => {
        $menuBtn.toggleClass('active');
        $body.toggleClass('overflow');
        $nav.show().toggleClass('show');
		$header.toggleClass('nav-open');
    });

    $(document).on('mouseup', function (e) {
        if ($nav.hasClass('show')) {
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
        $nav.removeClass('show');
		$header.removeClass('nav-open');
    }

    // Header on scroll event listener
    var lastScrollTop = 0;
    calcScroll();
    window.addEventListener('scroll', function() {
        calcScroll();
    }, {passive: true})

    // Calculate scroll position
    function calcScroll() {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        $header.toggleClass('nav-small', (st > 125));
        $header.toggleClass('nav-up', (st > 200 && st > lastScrollTop));
        
        console.log(st + ' ' + lastScrollTop);

        lastScrollTop = st <= 0 ? 0 : st;
    }

    // Init slider
    let slider = new Swiper(('.slider'), {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    })

    // 100 vh fix
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

}); // end ready
