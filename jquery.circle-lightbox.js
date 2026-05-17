/**
 * jQuery Circle Lightbox
 * Backdrop: animated gradient circle expands from center; image bounces in after.
 */
(function ($, window, document) {
  'use strict';

  var NS = 'circleLightbox';
  var OPEN_CLASS = 'clb-open';
  var CLOSING_CLASS = 'clb-closing';

  var defaults = {
    colors: ['#1a1a2e', '#16213e'],
    selector: 'a[href]',
    galleryAttr: 'data-clb-gallery',
    imageSelector: 'img',
    closeDuration: 380,
    openDuration: 600,
    morphToRect: true,
    useFontAwesome: false
  };

  function CircleLightbox($root, options) {
    this.$root = $root;
    this.opts = $.extend({}, defaults, options);
    this.colors = this.opts.colors.slice(0, 2);
    if (this.colors.length < 2) {
      this.colors.push(defaults.colors[1]);
    }
    this.groups = {};
    this.$overlay = null;
    this.$backdrop = null;
    this.$stage = null;
    this.$img = null;
    this.currentGroup = null;
    this.currentIndex = 0;
    this.isOpen = false;
    this.isAnimating = false;

    this._buildOverlay();
    this._bindTriggers();
  }

  CircleLightbox.prototype._buildOverlay = function () {
    var c1 = this.colors[0];
    var c2 = this.colors[1];
    var closeInner = this.opts.useFontAwesome
      ? '<i class="fa fa-times" aria-hidden="true"></i>'
      : '<span class="clb-close-icon" aria-hidden="true"></span>';

    this.$overlay = $('<div>', { class: 'clb-overlay', 'aria-hidden': 'true' });
    this.$backdrop = $('<div>', { class: 'clb-backdrop' }).css({
      '--clb-c1': c1,
      '--clb-c2': c2,
      '--clb-open-duration': this.opts.openDuration + 'ms'
    });
    if (this.opts.morphToRect) {
      this.$backdrop.addClass('clb-backdrop--morph');
    }
    this.$overlay.css('--clb-open-duration', this.opts.openDuration + 'ms');
    this.$stage = $('<div>', { class: 'clb-stage' });
    this.$img = $('<img>', { class: 'clb-image', alt: '' });

    this.$overlay.append(
      this.$backdrop,
      $('<button>', { type: 'button', class: 'clb-close', 'aria-label': 'Zamknij' }).html(closeInner),
      $('<button>', { type: 'button', class: 'clb-nav clb-prev', 'aria-label': 'Poprzednie' }).html(
        '<span aria-hidden="true">&#10094;</span>'
      ),
      $('<button>', { type: 'button', class: 'clb-nav clb-next', 'aria-label': 'Następne' }).html(
        '<span aria-hidden="true">&#10095;</span>'
      ),
      this.$stage.append(this.$img)
    );

    $('body').append(this.$overlay);

    var self = this;
    this.$overlay.find('.clb-close').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.close();
    });
    this.$overlay.find('.clb-prev').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.prev();
    });
    this.$overlay.find('.clb-next').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.next();
    });
    this.$overlay.on('click', function (e) {
      if ($(e.target).closest('.clb-stage, .clb-nav, .clb-close').length) {
        return;
      }
      self.close();
    });
    $(document).on('keydown.' + NS, function (e) {
      if (!self.isOpen) return;
      if (e.key === 'Escape') self.close();
      if (e.key === 'ArrowLeft') self.prev();
      if (e.key === 'ArrowRight') self.next();
    });
  };

  CircleLightbox.prototype._bindTriggers = function () {
    var self = this;
    this.$root.on('click.' + NS, this.opts.selector, function (e) {
      e.preventDefault();
      var $el = $(this);
      var href = $el.attr('href');
      if (!href || href === '#') return;

      var groupId = $el.attr(self.opts.galleryAttr) || 'default';
      if (!self.groups[groupId]) {
        self.groups[groupId] = self._collectGroup(groupId);
      }
      var group = self.groups[groupId];
      var index = 0;
      for (var i = 0; i < group.length; i++) {
        if (group[i].$el[0] === $el[0]) {
          index = i;
          break;
        }
      }
      self.open(group, index);
    });
  };

  CircleLightbox.prototype._collectGroup = function (groupId) {
    var self = this;
    var items = [];
    var $links;

    if (groupId === 'default') {
      $links = this.$root.find(this.opts.selector);
    } else {
      $links = this.$root.find('[' + this.opts.galleryAttr + '="' + groupId + '"]');
    }

    $links.each(function () {
      var $el = $(this);
      var href = $el.attr('href');
      if (href && href !== '#') {
        items.push(self._itemFromEl($el, href));
      }
    });
    return items;
  };

  CircleLightbox.prototype._itemFromEl = function ($el, href) {
    var $thumb = $el.find(this.opts.imageSelector).first();
    if (!$thumb.length && $el.is('img')) {
      $thumb = $el;
    }
    return {
      $el: $el,
      src: href,
      alt: ($thumb.length ? $thumb.attr('alt') : '') || $el.attr('title') || ''
    };
  };

  CircleLightbox.prototype._updateNav = function () {
    var multi = this.currentGroup && this.currentGroup.length > 1;
    this.$overlay.find('.clb-prev, .clb-next').toggle(!!multi);
  };

  CircleLightbox.prototype.open = function (group, index) {
    if (this.isAnimating || this.isOpen) return;
    this.isAnimating = true;
    this.isOpen = true;
    this.currentGroup = group;
    this.currentIndex = index;

    var item = group[index];
    this.$img.attr({ src: item.src, alt: item.alt });
    this._updateNav();

    $('body').addClass('clb-body-lock');
    this.$overlay
      .removeClass(CLOSING_CLASS)
      .addClass(OPEN_CLASS)
      .attr('aria-hidden', 'false');

    this.$backdrop
      .removeClass('clb-backdrop--visible clb-backdrop--out')
      .css('--clb-open-duration', this.opts.openDuration + 'ms');
    this.$stage.removeClass('clb-stage--visible');

    var self = this;
    var openMs = this.opts.openDuration;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        void self.$backdrop[0].offsetWidth;
        self.$backdrop.addClass('clb-backdrop--visible');
      });
    });

    setTimeout(function () {
      self.$stage.addClass('clb-stage--visible');
      self.isAnimating = false;
    }, openMs);
  };

  CircleLightbox.prototype.close = function () {
    if (!this.isOpen || this.isAnimating) return;
    this.isAnimating = true;

    var self = this;
    var imageMs = this.opts.closeDuration;
    var backdropMs = this.opts.openDuration;

    this.$overlay.addClass(CLOSING_CLASS);

    setTimeout(function () {
      self.$backdrop.addClass('clb-backdrop--out');
    }, imageMs);

    setTimeout(function () {
      self.$overlay
        .removeClass(OPEN_CLASS + ' ' + CLOSING_CLASS)
        .attr('aria-hidden', 'true');
      self.$backdrop.removeClass('clb-backdrop--visible clb-backdrop--out');
      self.$stage.removeClass('clb-stage--visible');
      self.$img.attr({ src: '', alt: '' });
      $('body').removeClass('clb-body-lock');
      self.isOpen = false;
      self.isAnimating = false;
    }, imageMs + backdropMs);
  };

  CircleLightbox.prototype._go = function (delta) {
    if (!this.currentGroup || this.currentGroup.length < 2 || this.isAnimating) return;
    var len = this.currentGroup.length;
    this.currentIndex = (this.currentIndex + delta + len) % len;
    var item = this.currentGroup[this.currentIndex];
    var self = this;

    this.$stage.removeClass('clb-stage--visible');
    setTimeout(function () {
      self.$img.attr({ src: item.src, alt: item.alt });
      requestAnimationFrame(function () {
        self.$stage.addClass('clb-stage--visible');
      });
    }, 200);
  };

  CircleLightbox.prototype.prev = function () {
    this._go(-1);
  };

  CircleLightbox.prototype.next = function () {
    this._go(1);
  };

  CircleLightbox.prototype.destroy = function () {
    if (this.isOpen) {
      this.$overlay.removeClass(OPEN_CLASS + ' ' + CLOSING_CLASS);
      $('body').removeClass('clb-body-lock');
      this.isOpen = false;
    }
    this.$root.off('.' + NS);
    $(document).off('.' + NS);
    if (this.$overlay) {
      this.$overlay.remove();
    }
    $.removeData(this.$root[0], NS);
  };

  $.fn.circleLightbox = function (options) {
    if (typeof options === 'string') {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var instance = $.data(this, NS);
        if (instance && typeof instance[options] === 'function') {
          instance[options].apply(instance, args);
        }
      });
    }
    return this.each(function () {
      if (!$.data(this, NS)) {
        $.data(this, NS, new CircleLightbox($(this), options));
      }
    });
  };

  $.fn.circleLightbox.defaults = defaults;
})(jQuery, window, document);
