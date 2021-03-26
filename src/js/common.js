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
    const $hamburgerBtn = $('.hamburger');

    // Header mobile menu
    function navTransition() {
        $nav.toggleClass('transitioned', window.matchMedia('(max-width: 767px)').matches);
    }

    navTransition();
    window.addEventListener('resize', () => {
        navTransition();
    }, { passive: true })

    $hamburgerBtn.on('click', () => {
        $hamburgerBtn.toggleClass('active');
        $body.toggleClass('overflow');
        $nav.show().toggleClass('show');
    });

    $(document).on('mouseup', function (e) {
        if ($nav.hasClass('show')) {
            if (!$nav.is(e.target) &&
                $nav.has(e.target).length === 0 &&
                !$hamburgerBtn.is(e.target) &&
                $hamburgerBtn.has(e.target).length === 0) {
                closeMenu();
            }
        }
    });

    function closeMenu() {
        $hamburgerBtn.removeClass('active');
        $body.removeClass('overflow');
        $nav.removeClass('show');
    }

    // Header on scroll event listener
    window.addEventListener('scroll', function () {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        $header.toggleClass('scrolled', (st > 0));
    }, { passive: true })

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
