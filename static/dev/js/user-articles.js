var UserArticlesController = (function ($) {
    return {
        load: function () {
            UserArticlesController.Load.init();
        }
    };
}(jQuery));

UserArticlesController.Load = (function ($) {

    var attachEvents = function () {
      
        /*
         * Load More Articles on My Post Page
         */
        $('.loadMoreMyArticles').on('click', function (e) {
            e.preventDefault();
            var btnObj = $(this);
            
            var page = parseInt($('.LoadMyArticles').data('page'));
            if (isNaN(page) || page < 0) {
               page = 1;
            }

            $.fn.loadMoreAuthUserArticles({
                offset: page,
                onSuccess: function (data, textStatus, jqXHR) {
                    if (data.success == 1) {
                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }
                        for (var i in data.articles) {
                            
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
                            data.articles[i]['readingTime']= renderReadingTime(data.articles[i].readingTime);
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['title'] !== null) {
                                data.articles[i]['blogClass']= data.articles[i]['blog']['title'].replace(' ', '').toLowerCase();
                            }
       
                            var ImageUrl = $.fn.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 570 ,height:470, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;
                            
                            Handlebars.registerHelper('encode', function(options) {
                                return encodeURIComponent(options.fn(this));
                            });
                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasMediaVideo']= 0;
                                if(data.articles[i]['social']['media']['type'] === 'video') {
                                    data.articles[i]['hasMediaVideo'] = 1;
                                }
                                articleTemplate = Handlebars.compile(socialCardTemplate); 
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                           
                            var article = articleTemplate(data.articles[i]);
                            $('.LoadMyArticles').append(article);
                        }
                    }
                },
                beforeSend: function (jqXHR, settings) {
                    $(btnObj).html("Please wait...");
                },
                onComplete: function (jqXHR, textStatus) {
                    $(btnObj).html("Load More");
                }
            });
        });
        
         var renderReadingTime = function (time) {
            if (time <= '59') {
                return time + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };
        
        var bindSocialShareButton = function () {
            $(".card__social-share").on("click", function (e) {
                e.preventDefault();
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    $(elem).removeClass("selected");
                } else {
                    $(".card__social-share").removeClass('selected');
                    $(elem).addClass("selected");
                }
            });
        };
        
        /**
         *  See User Post Articles
         */

        var totalPosts = parseInt($('div#userArticleContainer').data('total-count'));
        
        if (totalPosts > _appJsConfig.articleOffset) {
            var waypoint = new Waypoint({
                element: $('#LoadMoreArticles'),
                offset: '80%',
                handler: function (direction) {
                    if (direction == 'down') {
                        $.fn.Ajax_LoadMoreUserArticles({
                            onSuccess: function (data, textStatus, jqXHR) {
                                if (data.userArticles.length > 0) {

                                    for (var i in data.userArticles) {
                                        data.userArticles[i]['containerClass'] = 'col-half';
                                        data.userArticles[i]['templatePath'] = _appJsConfig.templatePath;
                                        data.userArticles[i]['hasArticleMediaClass'] = (data.userArticles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
                                        data.userArticles[i]['blogClass']= '';
                                        data.userArticles[i]['readingTime']= renderReadingTime(data.userArticles[i].readingTime);
                                        
                                        if(data.userArticles[i].blog['title'] !== null) {
                                            data.userArticles[i]['blogClass']= data.userArticles[i]['blog']['title'].replace(' ', '').toLowerCase();
                                        }
                                        var ImageUrl = $.image({media:data.userArticles[i]['featuredMedia'], mediaOptions:{width: 570 ,height:470, crop: 'limit'} });
                                        data.userArticles[i]['imageUrl'] = ImageUrl;
                                       
                                        var articleId = parseInt(data.userArticles[i].articleId);
                                        var articleTemplate;
                                        if (isNaN(articleId) || articleId <= 0) {
                                            data.userArticles[i]['hasSocialMediaClass'] = (data.userArticles[i].social.hasMedia == 1) ? 'withImage__content' : 'without__image';
                                            articleTemplate = Handlebars.compile(socialCardTemplate);
                                        } else {
                                            articleTemplate = Handlebars.compile(systemCardTemplate);
                                        }
                                        var article = articleTemplate(data.userArticles[i]);
                                        $('#userArticleContainer').append(article);
                                    }
                                    bindSocialShareButton();

                                    if (data.userArticles.length < _appJsConfig.articleOffset) {
                                        waypoint.destroy();
                                    } else {
                                        Waypoint.refreshAll();
                                    }
                                    
                                }
                            },
                            beforeSend: function (jqXHR, settings) {
                                $('div.loader').removeClass('hide');
                            },
                            onComplete: function (jqXHR, textStatus) {
                                $('div.loader').addClass('hide');
                            }
                        });
                    }
                }
            });
        }
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));


