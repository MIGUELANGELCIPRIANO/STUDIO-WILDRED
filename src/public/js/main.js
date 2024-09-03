document.addEventListener('DOMContentLoaded', function () {
	// Upper Body Padding Function Navbar Height
	const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0
	document.body.style.paddingTop = navbarHeight + 'px'

	// Navbar Toggler Button Behavior
	const navbarToggler = document.querySelector('.navbar-toggler')
	if (navbarToggler) {
		navbarToggler.addEventListener('click', function () {
			if (navbarToggler.getAttribute('aria-expanded') === 'true') {
				navbarToggler.style.boxShadow = 'none'
			}
		})

		navbarToggler.addEventListener('focusout', function () {
			if (navbarToggler.getAttribute('aria-expanded') === 'false') {
				navbarToggler.style.boxShadow = ''
			}
		})
	}

	// Navbar Link Active State on Click
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link')

	navLinks.forEach((link) => {
		link.addEventListener('click', function () {
			navLinks.forEach((link) => link.classList.remove('active'))
			this.classList.add('active')
		})
	})

	// Navbar Link Active State on Scroll
	const sections = document.querySelectorAll('section[id]')
	window.addEventListener('scroll', () => {
		const scrollPos = window.scrollY + navbarHeight
		sections.forEach((section) => {
			const sectionTop = section.offsetTop
			const sectionHeight = section.offsetHeight
			const sectionId = section.getAttribute('id')
			if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
				navLinks.forEach((link) => {
					link.classList.remove('active')
					if (link.getAttribute('href') === `#${sectionId}`) {
						link.classList.add('active')
					}
				})
			}
		})
	})

	// Close Navbar Collapse on Link Click
	const bsCollapse = new bootstrap.Collapse('#navbarNav', {
		toggle: false,
	})

	document.addEventListener('click', (e) => {
		if (!e.target.matches('.navbar a')) return false

		bsCollapse.hide()
	})

	// Close Navbar Collapse on Outside Click
	document.addEventListener('click', (e) => {
		const navbarCollapse = document.querySelector('.navbar-collapse')
		if (
			navbarCollapse.classList.contains('show') &&
			!e.target.closest('.navbar')
		) {
			bsCollapse.hide()
		}
	})

	// Close All Accordions on Click Outside
	document.addEventListener('click', function (event) {
		var accordions = document.querySelectorAll('.accordion-button')

		if (!event.target.closest('.accordion-item')) {
			accordions.forEach(function (button) {
				if (!button.classList.contains('collapsed')) {
					button.click()
				}
			})
		}
	})

	// Form Validation Code
	;(() => {
		'use strict'

		const forms = document.querySelectorAll('.needs-validation')

		Array.from(forms).forEach((form) => {
			form.addEventListener(
				'submit',
				(event) => {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
					}

					form.classList.add('was-validated')
				},
				false
			)
		})
	})()
})
