function $(el) {
  return document.querySelector(el)
}

function $$(el) {
  return document.querySelectorAll(el)
}

function renderHSLColors() {
  var $hsl = $('.hsl')
  var $fragment = document.createDocumentFragment()
  var div
  for (var n = 360, i = 0; i < n; i += 10) {
    div = document.createElement('div')
    div.style.backgroundColor = 'hsl(' + i + ',100%,50%)'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.innerHTML = i
    $fragment.appendChild(div)
  }
  $hsl.appendChild($fragment)
}

function events() {
  var $tabs = $$('nav a')

  $('nav').onclick = function (e) {
    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault()
      // remove activeClass from each tab
      $tabs.forEach(function ($tab) {
        $tab.classList.remove('selected')
      })
      // add activeClass to the target element
      e.target.classList.add('selected')
    }
  }
}

function main() {
  renderHSLColors()
  events()
}

main()
