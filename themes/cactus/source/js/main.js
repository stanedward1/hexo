/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function () {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function () {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     * 菜单滚动显示隐藏
     */
    if (menu.length) {
      $(window).on("scroll", function () {
        var position = menu.offset().top;
        var topDistance = menu.offset().top;
        // hide only the navigation links on desktop


        // if (!nav.is(":visible") && topDistance < 50) {
        //   nav.show();
        // } else if (nav.is(":visible") && topDistance > 100) {
        //   nav.hide();
        // }
        $(window).scroll(function () {
          var scroll = menu.offset().top;
          if (scroll > position) {
            nav.hide();
            $("#menu-icon-tablet").hide();
          } else {
            nav.show();
            $("#menu-icon-tablet").show();
          }
          position = scroll;
        });



        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          // $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          // $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */

    if ($("#footer-post").length) {
      var lastScrollTop = 100;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();
        // console.log(topDistance)
        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          $("#footer-post").hide();
          lastScrollTop = topDistance;
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
          lastScrollTop = topDistance;
        }
        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });

      //显示隐藏
      $("#actions-footer > span").click(function () {
        let e = $(this).attr("Popup")
        if ($(e).css('display') == 'none') {
          let item = $('#footer-post > .Popup')
          for (let i = 0; i < item.length; i++) {
            item[i].style.display = 'none'
          }
          $(e).show()
        } else {
          $(e).hide()
        }
      })
    }
  }
  var imgpup = $('.img-pup')
  $('img').click(function () {
    imgpup.show()
    $('.img-pup > img')[0].src = this.src
  })
  imgpup.click(() => {
    imgpup.hide()
  })
});

// let l =  $('head > link')
// for (let i = 0; i < l.length; i++) {
//  let url = l[i].href
//   if(url.indexOf('whiteStyle')!= -1){
//     let reUrl = url.replace('whiteStyle','darkStyle')
//     l[i].href = reUrl
//   }else{
//    let reUrl = url.replace('darkStyle','whiteStyle')
//     l[i].href = reUrl
//   }
// }


//百度搜索爬虫



var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7e9a19e5e700f1a2607b47c7bd6b35e8";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();


