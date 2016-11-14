(function($) {

  var slideEventFlag = false;
  $(document).on('add.cards change.cards', function(event) {
    if (!$(event.target).hasClass('mbr-slider-ext')) return;

    $(this).on('slid.bs.carousel', function(par1, par2) {
      if ($(par1.relatedTarget).closest('section').hasClass('mbr-slider-ext')) {
        $(par1.relatedTarget).parent().find('.carousel-item').not('.prev.right').removeClass('kenberns');
        $(par1.relatedTarget).addClass('kenberns');
      }
    })
  });


  // IN BUILDER
  if ($('html').hasClass('is-builder')) {
    $(document).on('add.cards change.cards', function(event) {
      if ((!$(event.target).hasClass('extTestimonials1')) &&
        (!$(event.target).hasClass('extTestimonials3'))) return;

      setTimeout(function(){$(window).trigger('resize');},100);

      if ($(event.target).hasClass('extTestimonials3')) {

        // Show multiple slides at once
        var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');

        $(event.target).find('.carousel-inner').attr('class', 'carousel-inner slides' + visibleSlides);
        $(event.target).find('.clonedCol').remove();
        $(event.target).find('.carousel-item .col-md-12').each(function() {
          if (visibleSlides < 2) {
            $(this).attr('class', 'col-md-12');
          } else if (visibleSlides == 5) {
            $(this).attr('class', 'col-md-12 col-lg-15');
          } else {
            $(this).attr('class', 'col-md-12 col-lg-' + 12/visibleSlides);
          }
        });

        $(event.target).find('.carousel-item').each(function() {
          var itemToClone = $(this);

          for (var i = 1; i < visibleSlides; i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            var index = itemToClone.index();
            // grab item, clone, add marker class, add to collection
            itemToClone.find('.col-md-12:first').clone(true)
              .addClass("cloneditem-"+(i)).addClass("clonedCol").attr('data-cloned-index',index)
              .appendTo($(this).children().eq(0));
          }
        });
      }

      var _this = this;
      if ($(event.target).hasClass('extTestimonials3')&&!slideEventFlag) {
        slideEventFlag =true;

        $(this).on('slide.bs.carousel', 'section.extTestimonials3', function(event) {
          var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');
          // Refresh all slides
          $(event.target).find('.clonedCol').remove();
          $(event.target).find('.carousel-item').each(function() {
            var itemToClone = $(this);

            for (var i = 1; i < visibleSlides; i++) {
              itemToClone = itemToClone.next();

              // wrap around if at end of item collection
              if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
              }

              var index = itemToClone.index();
              // grab item, clone, add marker class, add to collection
              itemToClone.find('.col-md-12:first').clone(true)
                .addClass("cloneditem-"+(i)).addClass("clonedCol").attr('data-cloned-index',index)
                .appendTo($(this).children().eq(0));
            }
          });
        });
      }
    });
  }


  // AFTER PUBLISH
  if (!$('html').hasClass('is-builder')) {
    // extTestimonials cards height fix
    if ($('section.extTestimonials1:not(.extTestimonials5)').length > 0) {
      $(window).on('resize', function() {
        var sections = $('section.extTestimonials1:not(.extTestimonials5)');
        sections.each(function() {
          var _this = this;
          var slideHeight = [];
          var index = $(this).find('.carousel-item.active').index();
          $(this).find('.carousel-item .card-block').css('min-height', '0');
          $(this).find('.carousel-item').addClass('active');
          $(this).find('.carousel-item').each(function() {
            slideHeight.push($(this).find('.card-block')[0].offsetHeight);
          })
          $(this).find('.carousel-item').removeClass('active').eq(index).addClass('active');
          var maxHeight = Math.max.apply(null, slideHeight);
          $(this).find('.carousel-item').each(function() {
            $(this).find('.card-block').css('min-height', maxHeight + 'px');
          })
        })
      })
      setTimeout(function() {
        $(window).trigger('resize');
      }, 100)
    }

    $(document).on('add.cards change.cards', function(event) {
      if ((!$(event.target).hasClass('extTestimonials1')) &&
        (!$(event.target).hasClass('extTestimonials3'))) return;

      if (isIE()) {
        // Fix smooth slide change in IE
        $(event.target).find('.card-block').each(function() {
          $(this).css('display', 'block');
        })
      }

      if ($(event.target).hasClass('extTestimonials3')) {
        // Show multiple slides at once
        var visibleSlides = $(event.target).find('.carousel-inner').attr('data-visible');

        if (visibleSlides < 2) return;

        $(event.target).find('.carousel-inner').attr('class', 'carousel-inner slides' + visibleSlides);
        $(event.target).find('.carousel-item .col-md-12').each(function() {
          if (visibleSlides == 5) {
            $(this).attr('class', 'col-md-12 col-lg-15');
          } else {
            $(this).attr('class', 'col-md-12 col-lg-' + 12/visibleSlides);
          }
        });
        $(event.target).find('.carousel-item').each(function() {
          var itemToClone = $(this);

          for (var i = 1; i < visibleSlides; i++) {
            itemToClone = itemToClone.next();

            // wrap around if at end of item collection
            if (!itemToClone.length) {
              itemToClone = $(this).siblings(':first');
            }

            // grab item, clone, add marker class, add to collection
            itemToClone.find('.col-md-12:first').clone()
              .addClass("cloneditem-"+(i))
              .appendTo($(this).children().eq(0));
          }
        });
      }
    });

    $(document).ready(function() {
      // Counters
      if ($('.counters').length) {
        $('.counters').viewportChecker({
          offset: 200,
          callbackFunction: function(elem, action) {
            $('#' + elem.attr('id') + ' .count').each(function() {
              $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
              }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                  $(this).text(Math.ceil(now));
                }
              });
            });
          }
        });
      }

      // Round progress bars
      if ($('.pie_progress').length) {
        $('.pie_progress').asPieProgress({
          namespace: 'asPieProgress',
          classes: {
            element: 'pie_progress',
            number: 'pie_progress__number'
          },
          min: 0,
          max: 100,
          size: 150,
          speed: 40, // speed of 1/100
          barcolor: '#c0a375',
          barsize: '10',
          trackcolor: '#f2f2f2',
          fillcolor: 'none',
          easing: 'ease',
          numberCallback: function(n) {
            var percentage = Math.round(this.getPercentage(n));
            return percentage + '%';
          },
          contentCallback: null
        });

        // Start a progress bar
        $('.extProgressBarRound').viewportChecker({
          offset: 150,
          callbackFunction: function(elem, action) {
            $('#' + elem.attr('id') + ' .pie_progress').asPieProgress('start');
          }
        });
      }
    });


    // MODAL HEADER'S VIDEO
    $(document).ready(function() {
      if ($('.modalWindow-video iframe').length) {
        var iframe = $('.modalWindow-video iframe')[0].contentWindow;
        var modal = function() {
          $('.modalWindow').css('display', 'table').click(function() {
            $('.modalWindow').css('display', 'none');
            iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}','*');
          });
        };
        $('.intro-play-btn').click(function() {
          modal();
          iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
        });
        $('.intro-play-btn-figure').click(function(event) {
          event.preventDefault();
          modal();
          iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
        });
      }
    });


    // ACCORDION
    $('.panel-group').find('.panel-heading').each(function(target) {
      $(this).click(function() {
        var spanItem = $(this).children('span');
        if($(spanItem).hasClass('pseudoMinus') ) {
          $(spanItem).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
        } else {
          $('.panel-group').find('.signSpan').each(function() {
            $(this).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
          });
          $(spanItem).removeClass('pseudoPlus').addClass('pseudoMinus');
          $(spanItem).parent().css('border', '1px solid #c39f76');
        }
      });
    });

    $(document).find('.panel-group').each(function() {
      $(this).find('.signSpan:eq(0)').parent().css('border', '1px solid #c39f76');
    });


    // TOGGLE
    $('.toggle-panel').find('.panel-heading').each(function(target) {
      $(this).click(function() {
        var spanItem = $(this).children('span');
        if($(spanItem).hasClass('pseudoMinus')) {
          $(spanItem).removeClass('pseudoMinus').addClass('pseudoPlus').parent().css('border', '');
        } else {
          $(spanItem).removeClass('pseudoPlus').addClass('pseudoMinus').parent().css('border', '');
        }
      });
    });


    // Google-map
    var loadGoogleMap = function() {
      var $this = $(this), markers = [], coord = function(pos) {
        return new google.maps.LatLng(pos[0], pos[1]);
      };
      var params = $.extend({
        zoom       : 14,
        type       : 'ROADMAP',
        center     : null,
        markerIcon : null,
        showInfo   : true
      }, eval('(' + ($this.data('google-map-params') || '{}') + ')'));
      $this.find('.mbr-google-map__marker').each(function() {
        var coord = $(this).data('coordinates');
        if (coord) {
          markers.push({
            coord    : coord.split(/\s*,\s*/),
            icon     : $(this).data('icon') || params.markerIcon,
            content  : $(this).html(),
            template : $(this).html('{{content}}').removeAttr('data-coordinates data-icon')[0].outerHTML
          });
        }
      }).end().html('').addClass('mbr-google-map--loaded');
      if (markers.length) {
        var map = this.Map = new google.maps.Map(this, {
          scrollwheel : false,
          // prevent draggable on mobile devices
          draggable   : !$.isMobile(),
          zoom        : params.zoom,
          mapTypeId   : google.maps.MapTypeId[params.type],
          center      : coord(params.center || markers[0].coord)
        });
        $(window).smartresize(function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(center);
        });
        map.Geocoder = new google.maps.Geocoder;
        map.Markers = [];
        $.each(markers, function(i, item) {
          var marker = new google.maps.Marker({
            map       : map,
            position  : coord(item.coord),
            icon      : item.icon,
            animation : google.maps.Animation.DROP
          });
          var info = marker.InfoWindow = new google.maps.InfoWindow();
          info._setContent = info.setContent;
          info.setContent = function(content) {
            return this._setContent(content ? item.template.replace('{{content}}', content) : '');
          };
          info.setContent(item.content);
          google.maps.event.addListener(marker, 'click', function() {
            if (info.anchor && info.anchor.visible) info.close();
            else if (info.getContent()) info.open(map, marker);
          });
          if (item.content && params.showInfo) {
            google.maps.event.addListenerOnce(marker, 'animation_changed', function() {
              setTimeout(function() {
                info.open(map, marker);
              }, 350);
            });
          }
          map.Markers.push(marker);
        });
      }
    };
    $(document).on('add.cards', function(event) {
      if (window.google && google.maps) {
        $(event.target).outerFind('.mbr-google-map').each(function() {
          loadGoogleMap.call(this);
        });
      }
    });

    // extTable1
    $(document).on('add.cards change.cards', function(event) {
      var $eventTarget = $(event.target);
      if ($eventTarget.hasClass('extTable1')) {
        var $tableWrapper = $eventTarget.find('.table-wrapper');
        var isSearch = ($tableWrapper.attr('data-search') === 'true');

        if (isSearch) {
          var searchText = $tableWrapper.attr('search-text');
          var info1Text = $tableWrapper.attr('info1-text');
          var info2Text = $tableWrapper.attr('info2-text');
          var info3Text = $tableWrapper.attr('info3-text');
          var info4Text = $tableWrapper.attr('info4-text');
        }

        $eventTarget.find('.table').DataTable({
          retrieve: true,
          paging: false,
          aaSorting: [],
          scrollX: true,
          searching: isSearch,
          info: isSearch,
          language: {
            "search": searchText,
            "info": info1Text + ' _END_ ' + info2Text,
            "infoEmpty": info1Text + ' _END_ ' + info2Text,
            "infoFiltered": info3Text + ' _MAX_ ' + info4Text,
          }
        });
      }
    });
  }


  // ACCORDION parallax update
  $(document).on('add.cards', function(event) {
    if ($(event.target).find('.panel-group, .toggle-panel').length) {

      $(event.target).on('shown.bs.collapse hidden.bs.collapse', function(event) {
        $(window).trigger('update.parallax');
      });
    }
  });


  // For countdown blocks
  initCountdown = function() {
    $(".countdown:not(.countdown-inited)").each(function() {
      $(this).addClass('countdown-inited').countdown($(this).attr('data-end'), function(event) {
        $(this).html(
          event.strftime([
            '<div class="row">',
            '<div class="col-xs-3 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%D</span>',
            '<span class="period">Days</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-3 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%H</span>',
            '<span class="period">Hours</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-3 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%M</span>',
            '<span class="period">Minutes</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '<span class="dot">:</span>',
            '</span>',
            '</div>',
            '<div class="col-xs-3 col-sm-3">',
            '<span class="number-wrap">',
            '<span class="number">%S</span>',
            '<span class="period">Seconds</span>',
            '<div class="bottom1"></div>',
            '<div class="bottom2"></div>',
            '</span>',
            '</div>',
            '</div>'
          ].join(''))
        );
      });
    });

    $(".countdown:not(.countdown-inited)").each(function() {
      $(this).countdown($(this).attr('data-end'), function(event) {
        $(this).text(
          event.strftime('%D days %H:%M:%S')
        );
      });
    });
  }

  if ($('.countdown').length != 0) {
    initCountdown();
  }

  // Checks if the browser is Internet Explorer
  function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }


  // bgText Animation //
  move = function(className) {
    var clientWidth = window.screen.width,
        x = clientWidth/2;
    var elWidth=className.width();
    var velocity=100;
    if (!$('html').hasClass('is-builder')){
      className.css('animation',Math.round(parseInt(className.width())/velocity)+'s floatingText linear infinite');
    }
  };
  for(var i=0; i<2; i++) {
    $(".bgTextP").each(function() {
      $(this).clone().appendTo($(this).parent())
    });
  };
  $('.bgTextP').css('padding-left', window.screen.width/2 + 'px');
  $('.wrapper-absolute').each(function() {
    move($(this));
  });


  // Typed //
  initTyped = function(a, b, c, el) {
    $(el).typed({
      strings: [a, b, c],
      typeSpeed: parseInt($(el).attr('typeSpeed')),
      backSpeed: parseInt($(el).attr('typeSpeed')),
      loop: true,
      backDelay: 1000
    });
  };
  if($('.element').length != 0) {
    $('.element').each(function() {
      initTyped($(this).attr('firstel'), $(this).attr('secondel'), $(this).attr('thirdel'), '.'+$(this).attr('adress'));
    });
  };

  // Custom Menu
  initToplineMenu = function() {
    this.onscroll = function(){
      if(window.pageYOffset != 0){
        $('.top-menu').css('display', 'none')
      } else{
        $('.top-menu').css('display', 'table')
      }
    }
  };
  moveToplineMenu = function() {
    $( window ).resize(function() {
      var $navDropdownSm = $('.nav-dropdown-sm'),
          $navDropdownCol = $('.nav-dropdown.collapse'),
          $topMenu = $('.top-menu'),
          topMenuEl = $('.top-menu').children().clone();
      if(parseInt($(window).width()) < 768){
        $navDropdownSm.children('.contacts').remove();
        $navDropdownSm.children('.social-block').remove();
        $navDropdownSm.append(topMenuEl);
      } else {
        $navDropdownCol.children('.contacts').remove();
        $navDropdownCol.children('.social-block').remove();
      }
    })
  };
  if($('.extMenu1').length != 0) {
    initToplineMenu();
    moveToplineMenu();
  };



//***************************** extShop1 ***********************************//

  //Shop's Price-Sorting

  filterShop = function(items, sortBy) {
    // 1=up 2=down 3=default
    if (sortBy < 3){
      var newItems = $('.shop-items').children().sort(function(a,b) {
        var upA = parseFloat($(a).attr('price'));
        var upB = parseFloat($(b).attr('price'));
        if(sortBy == 1){
          return (upA > upB) ? 1 : ((upA == upB) ? 0 : -1);
        } else {
          return (upA < upB) ? 1 : ((upA == upB) ? 0 : -1);
        };
      });
    } else {
      var newItems = shopItemsDefault;
    }
    $('.shop-items').children().remove();
    for(var i=0; i < newItems.length; i++){
      $('.shop-items').append(newItems[i]);
    };
    modalEvents();
  };

  if($('.extShop1').length != 0) {
    var sortBy = 1,
        shopItemsDefault = $('.shop-items').children(),
        shopItems = $('.shop-items').children(),

        $sortUp = $('.sort-buttons .filter-by-pu .btn'),
        $sortDown = $('.sort-buttons .filter-by-pd .btn'),
        $sortDefault = $('.sort-buttons .filter-by-d .btn');

    $('.filter-by-pu').on('click', function() {
      $($sortUp).removeClass('disableSortButton');
      $($sortDown).addClass('disableSortButton');
      $($sortDefault).addClass('disableSortButton');
      filterShop(shopItems, 1);
    });
    $('.filter-by-pd').on('click', function() {
      $($sortDown).removeClass('disableSortButton');
      $($sortUp).addClass('disableSortButton');
      $($sortDefault).addClass('disableSortButton');
      filterShop(shopItems, 2);
    });
    $('.filter-by-d').on('click', function() {
      $($sortDefault).removeClass('disableSortButton');
      $($sortUp).addClass('disableSortButton');
      $($sortDown).addClass('disableSortButton');
      filterShop(shopItems, 3);
    });



  //Filter by price range
  $('.price-range').on('click', function() {
      var minPrice = $('.min-input').val(),
          maxPrice = $('.max-input').val();
      $('.mbr-gallery-item:not(.bestsellers .mbr-gallery-item)').each(function(i, item) {
        if (parseFloat($(item).attr('price')) >= parseFloat(minPrice) && parseFloat($(item).attr('price')) <= parseFloat(maxPrice)){
            $(item).removeClass('hided-by-price');
        } else {
            $(item).addClass('hided-by-price');
        };
      });
    });
  //Reset Filter by price range
  $('.price-range-reset').on('click', function() {
      $('.max-input').val(findMaxItemPrice());
      $('.min-input').val(findMinItemPrice());
      $('.max-toggle').css('right', '0');
      $('.min-toggle').css('left', '0');
      $('.range-controls .bar').css('margin-left', '0px').css('width', '100%');
      rangeSliderInit();
      $('.mbr-gallery-item:not(.bestsellers .mbr-gallery-item)').each(function(i, item) {
        $(item).removeClass('hided-by-price');
      });
    });
  };

  autoPriceRange = function() {
    var minPrice = $('.min-input').val(),
        maxPrice = $('.max-input').val();
      $('.mbr-gallery-item:not(.bestsellers .mbr-gallery-item)').each(function(i, item) {
        if (parseFloat($(item).attr('price')) >= parseFloat(minPrice) && parseFloat($(item).attr('price')) <= parseFloat(maxPrice)){
            $(item).removeClass('hided-by-price');
        } else {
            $(item).addClass('hided-by-price');
        };
      });
  };

  //ShopCategories
  var allItem = $('.mbr-gallery-filter-all');
  $(document).on('add.cards change.cards', function(event) {
      var $section = $(event.target);
      if (!$section.hasClass('extShop1')) return;
      var filterList = [];

      $section.find('.mbr-gallery-item').each(function(el) {
        var tagsAttr = ($(this).attr('data-tags')||"").trim();
        var tagsList = tagsAttr.split(',');
        tagsList.map(function(el) {
          var tag = el.trim();
          if ($.inArray(tag, filterList) == -1)
              filterList.push(tag);
          })
        })
        if ($section.find('.mbr-gallery-filter').length > 0 && $(event.target).find('.mbr-gallery-filter').hasClass('gallery-filter-active')) {
            var filterHtml = '';
            $section.find('.mbr-gallery-filter ul li:not(li:eq(0))').remove();
            filterList.map(function(el) {
                filterHtml += '<li>' + el + '</li>'
            });
            $section.find('.mbr-gallery-filter ul').append(allItem).append(filterHtml);
            $section.on('click', '.mbr-gallery-filter li', function(e) {
                $li = $(this);
                $li.parent().find('li').removeClass('active');
                $li.addClass('active');

                var $mas = $li.closest('section').find('.mbr-gallery-row');
                var filter = $li.html().trim();

                $section.find('.mbr-gallery-item:not(.bestsellers .mbr-gallery-item)').each(function(i, el) {
                    var $elem = $(this);
                    var tagsAttr = $elem.attr('data-tags');
                    var tags = tagsAttr.split(',');
                    tagsTrimmed = tags.map(function(el) {
                        return el.trim();
                    })
                    if ($.inArray(filter, tagsTrimmed) == -1 && !$li.hasClass('mbr-gallery-filter-all')) {
                        $elem.addClass('mbr-gallery-item__hided');
                        setTimeout(function() {
                            $elem.css('left', '300px');
                        }, 200);
                    } else {
                        $elem.removeClass('mbr-gallery-item__hided');
                    };

                })
                setTimeout(function() {
                    $mas.closest('.mbr-gallery-row').trigger('filter');
                }, 50);
            })
        } else {
            $section.find('.mbr-gallery-item__hided').removeClass('mbr-gallery-item__hided');
            $section.find('.mbr-gallery-row').trigger('filter');
        }
    });

    // Max price
    findMaxItemPrice = function() {
      var maxPrice = 0;
      $('.mbr-gallery-item').each(function(i, item) {
          if(parseFloat($(item).attr('price')) > maxPrice){
            maxPrice = parseFloat($(item).attr('price'));
          };
      });
      return maxPrice;
    };

    // Min price
    findMinItemPrice = function() {
      var minPrice = 1000000;
      $('.mbr-gallery-item').each(function(i, item) {
          if(parseFloat($(item).attr('price')) < minPrice){
            minPrice = parseFloat($(item).attr('price'));
          };
      });
      return minPrice;
    };

    // Range slider
    rangeSliderInit = function() {
      var inputMin    = $('input.min-input'),
          inputMax    = $('input.max-input'),

          rangeWrap   = $('div.range-controls'),
          scaleBar    = rangeWrap.find('div.bar'),

          toggleMin   = rangeWrap.find('div.min-toggle'),
          toggleMax   = rangeWrap.find('div.max-toggle'),

          maxWidthBar = scaleBar.innerWidth(),
          maxRange    = maxWidthBar - 20,

          rangeLeft   = 0,
          rangeRight  = maxRange,

          pos         = rangeWrap.offset(),
          posLeft     = pos.left,

          valLeft     = inputMin.val(),
          valRight    = inputMax.val(),

          constLeft = inputMin.val(),

          curentWidth = parseInt($('.filter-cost').width())-20;

      function range() {
        if (togglePos <= 0) {
              return 0;
          }else if (togglePos >= maxRange) {
              return maxRange;
          }else {
              return togglePos;
        };
      };
      // toggleMin
      toggleMin.mousedown(function() {
          $(document).on('mousemove', function(e) {
            toggleMax.css('z-index', 0);
            toggleMin.css('z-index', 1);
            var xInner  = Math.round(e.pageX - posLeft);
            togglePos   = xInner - 10;
            rangeLeft   = range();

            toggleMin.css({left: function(i, v) {
              if (rangeLeft < rangeRight) {
                  valLeft = rangeLeft;
                  return rangeLeft;
              }else {
                  valLeft = valRight;
                  return rangeRight;
              };
            }});

            scaleBar.css({
              'margin-left': function() {
                return (rangeLeft < rangeRight) ? rangeLeft : rangeRight;
              },
              'width': function() {
                if (rangeLeft < rangeRight) {
                    return maxRange - (rangeLeft + (maxRange - rangeRight));
                }else {
                    return 0;
                };
              }
            });
            $(inputMin).val(Math.floor(( findMaxItemPrice() - findMinItemPrice() ) / curentWidth * valLeft) + parseInt(constLeft));
            autoPriceRange();
          });
      });
      // toggleMax
      toggleMax.mousedown(function() {
          $(document).on('mousemove', function(e) {
            toggleMax.css('z-index', 1);
            toggleMin.css('z-index', 0);
            var xInner = Math.round(e.pageX - posLeft);
            togglePos = xInner - 10;
            rangeRight = range();
            toggleMax.css({right: function(i, v) {

              if (rangeLeft < rangeRight) {
                  valRight = rangeRight;
                  return maxRange - rangeRight;
              }else {
                  valRight = valLeft;
                  return maxRange - rangeLeft;
              };
            }});

            scaleBar.css({
              width: function() {

                if (rangeLeft < rangeRight) {
                    return maxRange - (rangeLeft + (maxRange - rangeRight));
                }else {
                    return 0;
                };
              }
            });
            $(inputMax).val(Math.ceil(( findMaxItemPrice() - findMinItemPrice() ) / curentWidth * valRight)+parseInt(constLeft));
            autoPriceRange();
          });
      });

      $(document).mouseup(function() {
          $(document).off('mousemove');
      });
    };
    //set max min value
    if($('.extShop1').length != 0) {
      $(document).ready(function() {
        $('input[name=max]').attr('value', findMaxItemPrice());
        $('input[name=min]').attr('value', findMinItemPrice());
        if($('.range-slider').css('display') == 'block') {rangeSliderInit()};
      })
    };

  //Custom shop modal window
    if (!$('html').hasClass('is-builder')){
      var curentItem;
      moveToModal = function(item) {
        var modal = $('.shopItemsModal'),
            modalText = $(item).find('.sidebar_wraper').clone(),
            modalImg = $(item).find('img').clone(),
            modalSale = $(item).find('.onsale').clone();
        $(modal).children('.text-modal').append(modalText);
        $(modal).children('.image-modal').append(modalImg).append(modalSale);
      };

      cleanModal = function() {
        var modal = $('.shopItemsModal');
        $(modal).children('.text-modal').empty();
        $(modal).children('.image-modal').empty();
      };

      modalEvents = function() {
        $('.extShop1 .mbr-gallery-item .galleryItem .item_overlay').on('click', function(aim) {
              var target = $(aim.target).closest('.mbr-gallery-item');
              curentItem = target;
              cleanModal();
              moveToModal(target);
              $('.shopItemsModal_wraper').css('display', 'block');
          });

        $('.close-modal-wrapper, .shopItemsModalBg').on('click', function() {
             $('.shopItemsModal_wraper').css('display', 'none');
             cleanModal();
        })
      };

      if($('.extShop1').length != 0) {
        $(document).ready(function() {
          shopItems = $('.shop-items').children();
          filterShop(shopItems, 3);
        });
        var isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i );
        var isTouch = isMobile !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints;
        if( !isTouch ){
          $('input.min-input, input.max-input').prop("disabled", true);
          $('.filterPriceRange').css('display', 'none');
        } else{
          $('.range-controls').css('display', 'none');
          $('.price-controls, .filter-cost').css('margin-bottom', '15px');
        }

      }
    };
//*********************************************************************//

})(jQuery);