import AOS from 'aos';
import Swiper from 'swiper/swiper-bundle.min.js';
import Parallax from 'parallax-js';
import './svg-sprite';

$(function() {
    'use strict';

    const $window = $(window);
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
        duration: 500
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

    // Faq
    const $faq = $('.faq');
    if ($faq.length) {
        $('.faq-item__question').on('click', function(){
            $(this).parent().toggleClass('faq-item--open');
            $(this).siblings().slideToggle();
        })
    }

    // 100 vh fix
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

}); // end ready
