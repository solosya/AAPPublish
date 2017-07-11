(function ($) {
    $(document).ready(function () {
        $('.is-arrow-down a').click(function (e) {
            if ($(this).parents(".is-section").nextAll('div:not(.is-hidden)').html()) { /* .hidden class can be used as an exception */
                $('html,body').animate({
                    scrollTop: $(this).parents(".is-section").nextAll('div:not(.is-hidden)').offset().top - parseInt($('.is-wrapper').css('padding-top')) /* + 1 Adjustment due to topbar height*/
                }, 800);
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
        
        $('.show-comments').on('click', function () {
            var disqus_shortname = 'cognitives-io'; // Replace this value with *your* username.

            // ajax request to load the disqus javascript
            $.ajax({
                type: "GET",
                url: "http://" + disqus_shortname + ".disqus.com/embed.js",
                dataType: "script",
                cache: true
            });
            // hide the button once comments load
            $(this).fadeOut();
        });

        $('.article img').each(function () {
            if (!$(this).hasClass('share-popup__close')) {
                $(this).attr('data-action', 'zoom');
            }
        });

        window.onload = function () {
            var hash = (window.location.hash).replace('#', '');
            if (hash === 'sign-up') {
                $('a[href="#signUp"]').tab('show');
            } else if (hash === 'login') {
                $('a[href="#login"]').tab('show');
            }
        }

        $('.sign-up__link').on('click', function () {
            $('a[href="#signUp"]').tab('show');
        })

        $('.login__link').on('click', function () {
            $('a[href="#signIn"]').tab('show');
        })

        var overiFrame = -1;
        $('iframe').hover(function () {
            overiFrame = $(this).closest('.video-overlay');
        }, function () {
            overiFrame = -1
        });

        $(window).blur(function () {
            if (overiFrame != -1) {
                $('.slick-slider').slick('slickPause');
                $('.article').toggleClass('video-play');
            }
        });

        $('.slick-dots').on('click', function () {
            $('.slick-slider').slick('slickPlay');
            $('.article').removeClass('video-play');
        })

        // $('.playVideo').videoPlayer({});
    });

    $(document).on('click', '.forceLoginModal', function (e) {
        $('.account-modal__container').addClass('active');
    });

    function draggable() {
        if ($(".banner__container").width() > $(".banner").width()) {
            $(".banner__container").draggable({
                cursor: "move",
                containment: "banner",
                axis: 'x',
                drag: function (event, ui) {
                    ui.position.left = Math.min(0,
                            ($(".banner").width() - $(".banner__container").width()) < ui.position.left ?
                            ui.position.left : ($(".banner").width() - $(".banner__container").width())
                            );
                }
            });
        }
    }
    draggable();




    $(window).resize(function () {
        if ($('.side-navigation').is(':visible')) {
            var currentWidth = $('.side-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.side-navigation').css('width', newWidth + 'px');
            }
        }
        draggable();
    });

    $('.modal').on('hidden.bs.modal', function () {
        $('.modal .modal-content *').remove();
    });

    $(document).on('click', '.social-modal', function (e) {
        $('.modal').modal('hide');
    });

    $(document).on('click', '.social-modal__content', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__video_wrap', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__image_image', function (e) {
        e.stopPropagation();
    });


    $(document).on('click', '.button__share, .header_actions__share, .event-header__panel--share', function (e) {
        if ($('.button__share, .header_actions__share').hasClass('close-popup')) {
            $('.button__share, .header_actions__share').removeClass('close-popup');
            $('.share-popup').removeClass('active');
        } else {
            $('.share-popup').addClass('active');
            $('.button__share, .header_actions__share').addClass('close-popup')
            $(document).one('click', '.modal, .share-popup__close, .article, .blog, .social-modal__content, .modal-content, #content', '.channel', function (e) {
                $('.share-popup').removeClass('active');
                if (!$(e.target).hasClass('button__share') && !$(e.target).hasClass('header_actions__share')) {
                    $('.button__share, .header_actions__share').removeClass('close-popup');
                }
            });
        }
    });

    if ($('.button__share').length) {
        var widowWidth = $(window).width();
        var shareLeft = $('.button__share').offset().left;
        if ((widowWidth / 2) > shareLeft) {
            // Left
            $('.share-popup').css('right', '-212px');
        } else {
            // Right
            $('.share-popup').css('right', '0px');
        }
    }

    $(document).on('click', '.share-popup', function (e) {
        e.stopPropagation();
    });

    $(document).on("focus", '.share-link', function () {
        $(this).select();
    });
    $(document).on("mouseup", '.share-link', function (e) {
        e.preventDefault();
    });

    $(document).on("click", '.share-popup__copy-text', function (e) {
        var shareLinkBox = $('.share-popup__share-link');
        shareLinkBox.select();
        try {
            var successful = document.execCommand('copy');
            noty({
                type: "success",
                text: "Link copied successfully",
                layout: 'topRight',
                timeout: 2000,
                dismissQueue: true,
                animation: {
                    open: 'animated bounceInRight', // jQuery animate function property object
                    close: 'animated bounceOutRight', // jQuery animate function property object
                    easing: 'swing', // easing
                    speed: 500 // opening & closing animation speed
                }
            });
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });


    if ($('.dropdown-toggle')) {
        $('.dropdown-toggle').dropdown();
    }
        
    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });

    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required",
            message: "required"
        },
        // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: "Email cannot be blank.",
            message: "Message cannot be blank."
        }
    });

    /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/

    $('.uploadFileBtn').on('click', function () {
        var obj = $(this);
        var blogGuid = $(obj).data('guid');

        $.fn.uploadImagesModal({
            blogGuid: blogGuid,
            onSuccess: function (data) {
                var resultJsonStr = JSON.stringify(data);

                var imgClass = $(obj).data('imgcls');
                $('.' + imgClass).css('background-image', 'url(' + data.url + ')');

                var fieldId = $(obj).data('id');
                $('#' + fieldId).val(resultJsonStr);

            },
            onError: function (obj, errorMessage) {
            }
        });
    });

    // Landing page
    $('.landing-page-header__arrow').on('click', function () {
        var tag = $(".landing-page-content");
        $('html,body').animate({scrollTop: tag.offset().top}, 1000, 'swing');
    });

    // Landing page side form
    $('#content').on('click', function (e) {
        if ($(e.target).is('.landing-page-header__button, .landing-page-banner__button, .landing-page__content_get-started')) {
            if ($('.landing-page-side-form').hasClass('active')) {
                $(e.target).one('click', function (e) {
                    $('.landing-page-side-form').removeClass('active');
                    $('.landing-page-overlay').removeClass('active');
                    $(this).removeClass('active');
                    return;
                });
            } else {
                $('.landing-page-side-form').addClass('active');
                $('.landing-page-overlay').addClass('active');
                $(this).addClass('active');
                return;
            }
        } else if ($(e.target).is('.active')) {
            return;
        }
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-overlay').removeClass('active');
        $(this).removeClass('active');
    });

    $('.landing-page-overlay').on('click', function (e) {
        $('#content').removeClass('active');
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-overlay').removeClass('active');
    });

    $('.landing-page-side-form__cross').on('click', function (e) {
        $('#content').removeClass('active');
        $('.landing-page-side-form').removeClass('active');
        $('.landing-page-overlay').removeClass('active');
    });

    // Product Page
    $('.product-item__image-slider').slick();
    $('.event-content__image-slider').slick();

    // Product List Page
    if (localStorage.getItem('product-category')) {
        $('#product-category').val(localStorage.getItem('product-category'));
    }
    $('#product-category').change(function () {
        localStorage.setItem('product-category', $('#product-category').val());
        window.location = location.protocol + '//' + location.host + location.pathname + '?slug=' + $('#product-category').val()
    });
    $('.product-list-header__category').html($("#product-category option:selected").html());


    // Side nav dropdown
    $('.side-navigation__item--dropdown').on('click', function (e) {
        if ($(e.target).hasClass('side-navigation__link')) {
            $(this).find('.side-navigation__dropdown').first().toggleClass('active');
            console.log('dream');
        }
    });

    $('.side-navigation__dropdown_item--dropdown').on('click', function () {
        $(this).find('.side-navigation__dropdown').first().toggleClass('active');
        console.log('seconf');
    });

    $('.side-navigation').on('click', function (e) {
        if ($(e.target).hasClass('.side-navigation__item--dropdown') || !$(e.target).closest('.side-navigation__item--dropdown').length) {
            $('.side-navigation__dropdown').removeClass('active');
            console.log(!$(e.target).hasClass('.side-navigation__item--dropdown'));
        }
    });

    // Header link active state
    $('.header__navigation-item').on('click', function () {
        if (!$(this).hasClass('dropdown')) {
            $(this).addClass('active');
        }
    });

    // Video play

    $('.icons').on('click', function (e) {
        $(this).remove();
    });

    $('.account-modal__buttons_signup--social').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var elem = $(this);
        $('.account-modal__content_section--signup_social').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
            }
        });
        var verifyPass = $('.account-modal__content_section--signup_social').find('.account-modal__input--password').val() === $('.account-modal__content_section--signup_social').find('.account-modal__input--verifypassword').val();
        var verifyInputs = !$('.account-modal__content_section--signup_social').find('.account-modal__input-container').hasClass('error');
        if (verifyInputs && verifyPass) { // Add in condition for signup
            $(elem).prev().removeClass('active');
            $('#socialSignupForm').submit();
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--signup').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered');
            }
            $(elem).prev().addClass('active');
        }
    });

    $('.searchArticle').on('click', function (e) {
        var searchTerm = $('#searchArticleForm').find('input').val().trim();
        $('#searchArticleForm').find('input').val(searchTerm);
        if (!searchTerm) {
            return false;
        }
    });
    
    $('#popup-overlay').on('click', function () {
        $('.header__user_popup-container, .header__navigation_more-box-container, .header-mobile__user_popup, .header-mobile__navigation_more-box, .footer__navigation_more-box').removeClass('active');
        $(this).removeClass('active');
    });

    // Header popups
    $('.header__navigation_more').on('click', function (e) {
        if ($(e.target).hasClass('header__navigation_more')) {
            $(this).find('.header__navigation_more-box-container').first().toggleClass('active');
            $('#popup-overlay').toggleClass('active');
        } else {
            $(this).find('.header__navigation_more-box-container').first().addClass('active');
            $('#popup-overlay').addClass('active');
        }
    });

    $('.header__navigation_more--secondary').on('click', function () {
      $(this).find('.header__navigation_more-box-container').first().toggleClass('active');
      $('#popup-overlay').addClass('active');
    });


    $('.header__user').on('click', function () {
        $('.header__user_popup-container').toggleClass('active');
        //$('#popup-overlay').addClass('active');
    });

    // Moile header popups
    $('.header-mobile__navigation_more').on('click', function () {
        $(this).find('.header-mobile__navigation_more-box').toggleClass('active');
        $('#popup-overlay').addClass('active');
    });

    $('.header-mobile__user').on('click', function () {
        $('.header-mobile__user_popup').toggleClass('active');
        $('#popup-overlay').addClass('active');
    });

    // Header Search
    $('.header__search-button, .header__search-form_close').on('click', function () {
        $('.header__search-form_container').toggleClass('active');
    });

    // Header mobile toggle
    $('.header__toggle').on('click', function () {
        $('.header-mobile').toggleClass('active');
        $('.header__toggle-close').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.header__toggle-close').on('click', function () {
        $('.header-mobile').toggleClass('active');
        $('.header__toggle').toggleClass('active');
        $(this).toggleClass('active');
    });

    /* $('.header__user_image, .header__user_text').on('click', function (e) {
        e.preventDefault();
        $('.account-modal__container').addClass('active');
        $('body').addClass('active');
    }); */

    // Header search focus.
    $('.header__search-form_input').on('focus', function () {
        $('.header__search-form').addClass('active');
    });

    $('.header__search-form_input').on('blur', function () {
        $('.header__search-form').removeClass('active');
    });

    $('.header-mobile__search_input').on('focus', function () {
        $('.header-mobile__search').addClass('active');
    });

    $('.header-mobile__search_input').on('blur', function () {
        $('.header-mobile__search').removeClass('active');
    });

    // Footer popup
    $('.footer__navigation_more').on('click', function () {
        $(this).find('.footer__navigation_more-box').toggleClass('active');
        $('#popup-overlay').addClass('active');
    });
   



    // Article social links fixed position on scroll.
    var width = $(window).width();
    if (width >= 768) {
        if ($('.article__social-links').length) {
            var socialLinks = $('.article__social-links');
            var headerLeft = $('.header__content').offset().left;
            socialLinks.css({
                left: headerLeft
            });
        }
    }

    if ($('.article__social-links').length) {
        $(window).resize(function () {
            var socialLinks = $('.article__social-links');
            var width = $(window).width();
            var headerLeft = $('.header__content').offset().left;
            if (width <= 768) {
                socialLinks.css({
                  position: "static"
                });
            } else {
                socialLinks.css({
                  position: "absolute",
                  left: headerLeft
              });
            }
        });
    }

    if ($('.article__social-links').length) {
        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var scrollBottom = $(window).scrollTop() + $(window).height();
          var socialLinks = $('.article__social-links');
          var socialLinksHeight = $('.article__social-links').height();
          var articleTop = $('.article__info_container').offset().top;
          var articleBottom = $('.article__related-title_container').offset().top - 120;
          var headerLeft = $('.header__content').offset().left;
          var width = $(window).width();


          if (width >= 900) {
              if ($(window).scrollTop() >= articleTop) {
                  if (articleBottom - scroll < socialLinksHeight) {
                      var comp = articleBottom - scroll - socialLinksHeight;
                      socialLinks.css({
                          position: "fixed",
                          top: Math.round(-Math.abs(comp)) + 50 + "px"
                      });
                  } else {
                      socialLinks.css({
                          position: "fixed",
                          top: "50px",
                          left: headerLeft
                      });
                  }
              } else {
                  socialLinks.css({
                    position: "absolute",
                    top: "-110px",
                    left: headerLeft
                });
              }
          } else if (width <= 768) {
              socialLinks.css({
                position: "static",
              });
          }
        });
    }

}(jQuery));





