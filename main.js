document.addEventListener('DOMContentLoaded', () => {
	rend()
})

const scrollBtn = document.getElementById('to-top')

const fadeEffect = (el, val, time) => {
	el.style.opacity = val // 0 is fully transparent, 1 is fully opaque
	el.style.transition = time // time in ms e.g. 300
}

const hideElement = el => {
	fadeEffect(el, 0, '300ms')
}

const showElement = el => {
	fadeEffect(el, 1, '500ms')
}

let lastKnownScrollPosition = 0
let ticking = false

// get position of document element
const getOffset = el => {
	const rect = document.getElementById(el).getBoundingClientRect()
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	}
}

// position of nav
const navPosition = getOffset('00').top

function doSomething(scrollPos) {
	// Do something with the scroll position
	if (scrollPos > navPosition) {
		showElement(scrollBtn)
	} else hideElement(scrollBtn)
}

document.addEventListener('scroll', function (e) {
	lastKnownScrollPosition = window.scrollY

	if (!ticking) {
		window.requestAnimationFrame(function () {
			doSomething(lastKnownScrollPosition)
			ticking = false
		})

		ticking = true
	}
})

const rend = () => {
	fadeEffect(scrollBtn, 0, 0)
}
