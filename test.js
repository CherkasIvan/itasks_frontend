e.SortableAnimation = function () {
  function t(e) {
    o.ui = e.ui, o.container = $(e.container), o.direction = o.container.sortable("option", "axis"), o.itemWidth = e.width || e.ui.item.outerWidth(), o.itemHeight = e.height || e.ui.item.outerHeight()
  }

  function s(e) {
    var t;
    return t = "x" === o.direction ? [e ? "marginLeft" : "marginRight", o.itemWidth + "px"] : [e ? "marginTop" : "marginBottom", o.itemHeight + "px"], o.previousMargin = t[0], t
  }

  function i() {
    o.previous.addClass("fx-none").css(o.previousMargin, "0px"), _.delay(function () {
      o.previous.removeClass("fx-none")
    }, 30), o.ui.item.addClass("stoppedDragging"), _.delay(function () {
      o.ui.item.removeClass("stoppedDragging")
    }, 600)
  }

  function n(e, t) {
    var n, r;
    if (o.previousMargin) {
      if (t) return void i();
      o.previous.css(o.previousMargin, "0px")
    }
    for (o.previous = o.ui.placeholder.prev(); o.previous[0] == o.ui.item[0];) o.previous = o.previous.prev();
    o.previous.length || o.ui.placeholder.next().hasClass("js-dragged-container") || (o.previous = o.ui.placeholder.next(), r = !0), n = s(r), o.previous.length && (e ? (o.previous.addClass("fx-none").css(n[0], n[1]), _.delay(function () {
      o.previous.removeClass("fx-none")
    }, 30)) : o.previous.css(n[0], n[1])), _.delay(function () {
      o.refreshPositions()
    }, 200)
  }

  if (this === e) return new SortableAnimation;
  var o = this;
  return o.start = function (e) {
    t(e);

    o.container.addClass("is-being-sorted");
    o.ui.placeholder.css({
      width: 0,
      height: 0
    });

    e.ui.helper.css({position: "absolute", top: 0, left: 0});
    e.ui.helper.css({
      height: o.itemHeight,
      width: o.itemWidth
    });
    n(!0);
    o.refreshPositions();
    o.interval = setInterval(function () {
      if (o.container && $.contains(document, o.container[0]) && o.container.data("ui-sortable")) {
        o.refreshPositions()
      } else {
        (e.ui && e.ui.helper && e.ui.helper.remove && e.ui.helper.remove(), o.beforeStop())
      }
    }, 500)
  },
    o.refreshPositions = function () {
      o.ui.placeholder.parent().sortable("refreshPositions")
    },
    o.change = function () {
      n()
    }, o.setElements = function (e) {
    o.ui = e
  }, o.beforeStop = function () {
    clearInterval(o.interval), o.container.removeClass("is-being-sorted"), n(!1, !0)
  }, o
}
