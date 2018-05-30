/**
 * [online demo](https://jsfiddle.net/jrqkdrcp/2/)
 */

;
(function (global) {
  'use strict'

  var $ = function (element) {
    return document.querySelector(element)
  }
  var type = function (obj) {
    var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    return type === 'null' ? 'null' : (type === 'undefined' ? 'undefined' : type)
  }
  var isSame = function (a, b) {
    return a.nodeType == b.nodeType == 1 && a.outerHTML === b.outerHTML
  }

  /**
     * 兼容下面4种类型
     * element, eventName, callback[, useCapture]
     * element, ['click',] callback[, useCapture]
     * element, array, callback[, useCapture]
     * element, object
     */
  function bind (element, eventName, callback, useCapture) {
    var i, length

    element = $(element)
    useCapture = useCapture || false

    if (type(eventName) === 'string') {
      element.addEventListener(eventName, callback, useCapture)
    } else if (type(eventName) === 'function') {
      element.addEventListener('click', eventName, useCapture)
    } else if (type(eventName) === 'array') {
      length = eventName.length
      for (i = 0; i < length; i++) {
        element.addEventListener(eventName[i], callback, useCapture)
      }
    } else if (type(eventName) === 'object') {
      for (e in eventName) {
        element.addEventListener(e, eventName[e], false)
      }
    } else {
      throw new TypeError('wrong type of eventName')
    }
  }

  function delegate (child, parent, eventName, callback) {
    this.bind(parent, eventName, function (e) {
      if (isSame($(child), e.target)) {
        e.stopPropagation()
        callback()
      }
    }, true)
  }

  // 暴露给全局
  global.eventHandle = {
    delegate: delegate,
    bind: bind
  }
})(window)
