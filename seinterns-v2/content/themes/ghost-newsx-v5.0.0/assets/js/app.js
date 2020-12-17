// ================================
// Theme Options
// ================================
if (typeof themeConfig == "undefined") {
    themeConfig = {};
  }
  
  var ghosthunter_key = themeConfig.ghostSearchKey;
  
// =====================
// Koenig Gallery
// =====================
var gallery_images = document.querySelectorAll('.kg-gallery-image img');
gallery_images.forEach(function (image) {
  var container = image.closest('.kg-gallery-image');
  var width = image.attributes.width.value;
  var height = image.attributes.height.value;
  var ratio = width / height;
  container.style.flex = ratio + ' 1 0%';
});
  

/*! 11. Themeix js */
var themeix = {
    timeAndDate: function(e) {
        var t = new Date(e);
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear()
    },
    posts_carousel: function() {
        $(".latest-news-active").owlCarousel({
            autoplay: !0,
            margin: 30,
            loop: !0,
            dots: !1,
            nav: !1,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                767: {
                    items: 2
                },
                992: {
                    items: 2
                },
                1160: {
                    items: 3
                }
            }
        })
    },
    scrolltop: function() {
        $(window).on("scroll", function() {
            $(window).scrollTop() >= 500 ? $(".scroll-top").fadeIn("slow") : $(".scroll-top").fadeOut("slow")
        }), $(".scroll-top").on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 800, "easeOutCubic")
        })
    },
    themeix_search: function() {
        var searchHint = '';
        if (typeof themeConfig.searchHint !== 'undefined' && themeConfig.searchHint != '') {
          $('#ghost-search-field').attr('placeholder', themeConfig.searchHint);
        }
      
        var includeBodyInSearch = false;
        if (typeof themeConfig.includeBodyInSearch !== 'undefined' && themeConfig.includeBodyInSearch != '' && typeof themeConfig.includeBodyInSearch === "boolean") {
          includeBodyInSearch = themeConfig.includeBodyInSearch;
        }
      
        var searchField = $('#search-field').ghostHunter({
          results: '#search-result',
          onKeyUp: true,
          displaySearchInfo: true,
          zeroResultsInfo: true,
          includebodysearch: includeBodyInSearch,
          result_template: "<a id='gh-id-{{ref}}' class='gh-search-item' href='{{link}}'><h2 class='search-post-title'>{{title}}</h2> <span class='link-url text-muted'>{{link}}</span> </a>",
          info_template: "<p class='mt-4 alert alert-primary'>Number of posts found: {{amount}}</p>",
          onComplete: function (results) {
            $('#search-result').fadeIn();
          }
        });
        $(document).keyup(function (e) {
          if (e.keyCode === 27) {
            searchField.clear();
            $('#search-field').val('').blur();
            $('#search-result').fadeOut();
      
          }
        });



    },
    responsive_video: function() {
        $(".post-details").fitVids(), $(".top-news").length > 0 && $(".top-news").fitVids(), $(".single-item").length > 0 && $(".single-item").fitVids(), $(".kg-card-markdown, .kg-post").length > 0 && $(".kg-card-markdown, .kg-post").fitVids()
    },
    media_feature: function() {
        var e = $(".post-details-hidden").find("iframe").attr("src");
        if (void 0 !== e) {
            $(".top-news-img .img-section").hide();
            var t = '<iframe width="560" height="315" src="' + e + '" frameborder="0" allowfullscreen></iframe>';
            $(".embeded-video").append(t)
        }
    },
    syntax_highlighter: function() {
        $("pre code, pre,code").each(function(e, t) {
            hljs.highlightBlock(t)
        })
    },
    instagram_feed: function() {
    var feed = new Instafeed({
        template: '<figure class="grid-gallery-item"><a href="{{link}}" data-lightbox="roadtrip"><img class="img-fluid" src="{{image}}"></a></figure>',
        limit : instagram_feed_image_limit,
        accessToken: instagram_feed_user_accessToken
    });
    feed.run();
},
    theme_color_switch: function() {

var themeSwitch = document.getElementById('switch_theme');
if(themeSwitch) {
    initTheme(); // if user has already selected a specific theme -> apply it
    themeSwitch.addEventListener('change', function(event){
    resetTheme(); // update color theme
});

function initTheme() {
    var darkThemeSelected = (localStorage.getItem('switch_theme') !== null && localStorage.getItem('switch_theme') === 'dark');
    // update checkbox
    themeSwitch.checked = darkThemeSelected;
        // update body data-theme attribute
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
};

function resetTheme() {
    if(themeSwitch.checked) { // dark theme has been selected
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('switch_theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('switch_theme');
    } 
};
}

},
    init: function() {
    this.timeAndDate(), 
    this.scrolltop(), 
   this.themeix_search(),
    this.responsive_video(),
    this.syntax_highlighter(), 
    this.posts_carousel(),
    this.instagram_feed(),
    this.theme_color_switch()
          
    }
};
$(document).ready(function() {
    themeix.init()
});