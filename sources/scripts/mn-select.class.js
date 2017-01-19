class MnSelect extends window.MnInput {
  constructor(self) {
    self = super(self)
    this.tabIndex()
    this.setMenu()
    this.setMobile()
    this.setSelected()
    this.setOptionEvents()
    this.setOpenEvents()
    this.setCloseEvents()
    this.setFormGetter()
    this.setValidation()
    return self
  }

  tabIndex() {
    const tabindex = this.getAttribute('tabindex') || '0'
    this.setAttribute('tabindex', tabindex)
  }

  setMenu() {
    const menu = document.createElement('menu')
    menu.style.transform = 'translate(-19px, -5px)'
    // inherit from .mn-input
    this.removeChild(this.querySelector('input'))

    menu.classList.add('mn-card')

    Array
      .from(this.children)
      .forEach(child => {
        // fallback option, some browsers dont support tag option
        const option = document.createElement('div')
        option.classList.add('mn-select-option')
        option.textContent = child.textContent
        option.setAttribute('tabindex', '-1')

        Array
          .from(child.attributes)
          .forEach(attr => option.setAttribute(attr.name, attr.value))

        child.parentNode.removeChild(child)
        menu.appendChild(option)
      })

    this.insertBefore(menu, this.firstChild)
  }

  setMobile() {
    const options = document.createElement('div')
    const menu = this.querySelector('menu').cloneNode(true)
    const cancelButton = document.createElement('button')

    options.classList.add('mn-select-mobile')
    menu.removeAttribute('class')
    menu.removeAttribute('style')
    cancelButton.textContent = 'cancel'

    this.mobile = options
    options.appendChild(menu)
    options.appendChild(cancelButton)

    document.body.appendChild(options)
  }

  setSelected() {
    const viewValue = document.createElement('div')
    const selectedOption = this.getAttribute('placeholder')
      ? this.querySelector('.mn-select-option[selected]')
      : this.querySelector('.mn-select-option[selected]')
        || this.querySelector('.mn-select-option')

    if (selectedOption) {
      const value = selectedOption.getAttribute('value') || selectedOption.textContent
      this.value = value
      this.classList.add('has-value')
      viewValue.textContent = selectedOption.textContent
    } else if (this.getAttribute('value')) {
      const value = this.getAttribute('value')
      this.value = value
      const option = document.querySelector(`.mn-select-option[value="${value}"]`)

      if (option) {
        viewValue.textContent = option.textContent
      }
    }

    this.insertBefore(viewValue, this.firstChild)
  }

  setOptionEvents() {
    const options = this.querySelectorAll('.mn-select-option')
    const mobile = Array.from(this.mobile.querySelectorAll('.mn-select-option'))

    Array
      .from(options)
      .concat(mobile)
      .forEach(option => option.addEventListener('click', event => {
        const value = event.target.getAttribute('value') || event.target.textContent
        this.value = value
        this.close()
      }))

    Array
      .from(options)
      .forEach(option => option.addEventListener('mousemove', event => {
        event.target.focus()
        event.target.classList.remove('keydown')
      }))

    Array
      .from(options)
      .forEach(option => option.addEventListener('keydown', event => {
        let nextFocusable
        switch (event.key) {
          case 'ArrowDown':
            nextFocusable = event.target.nextElementSibling
            break
          case 'ArrowUp':
            nextFocusable = event.target.previousElementSibling
            break
        }

        if (nextFocusable) {
          event.target.classList.add('keydown')
          nextFocusable.focus()
          event.stopPropagation()
          event.preventDefault()
        }
      }))

    Array
      .from(options)
      .forEach(option => option.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const value = event.target.getAttribute('value') || event.target.textContent
          this.value = value
          this.close()
          this.focus()
          event.stopPropagation()
        }
      }))
  }

  setOpenEvents() {
    this.addEventListener('click', event => {
      this.open()
      this.focusOption(event)
    })
    this.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          this.open()
          this.focusOption(event)
          event.preventDefault()
      }
    })
  }

  setCloseEvents() {
    this.addEventListener('focus', () => this.close())
    this.mobile.querySelector('button').addEventListener('click', () => this.close())
    this.mobile.addEventListener('click', event => {
      if (event.target.classList.contains('mn-select-mobile')) {
        this.close()
      }
    })
    document.addEventListener('keyup', event => {
      const esc = event.keyCode === 27
      let isOpened = document.body.classList.contains('mn-select-visible')

      if (esc && isOpened) {
        this.close()
      }
    })
    document.addEventListener('click', event => {
      const clickOutside = !event.target.closest('mn-select')
      const selectOption = event.target.classList.contains('mn-select-option')

      if (clickOutside || selectOption) {
        this.close()
      }
    })
  }

  setFormGetter() {
    const form = this.closest('form')
    const name = this.getAttribute('name')
    const element = this

    if (form && name) {
      Object.defineProperty(form, name, {get: () => element})
    }
  }

  setValidation() {
    const required = this.getAttribute('required')
    if (required) {
      const input = document.createElement('input')
      input.setAttribute('required', 'required')
      input.setAttribute('name', this.getAttribute('name') || this.id)
      input.style.visibility = 'hidden'
      input.style.position = 'absolute'
      this.appendChild(input)
    }
  }

  set value(value) {
    const option = this.querySelector(`.mn-select-option[value="${value}"]`)
    const input = this.querySelector('input')

    if (option) {
      this.querySelector('div').textContent = option.textContent
      if (input) {
        input.value = value
      }
      this.classList.add('has-value')
      const lastSelected = option.parentNode.querySelector('.mn-select-option[selected]')

      if (lastSelected) {
        lastSelected.removeAttribute('selected')
      }
      option.setAttribute('selected', 'selected')
    } else {
      console.error(`MN-SELECT OPTION_UNDEFINED
        You're trying set a value (${value}) to mn-select,
        but there is no option with this value to be displayed`)
    }

    this.validate()
    const changeEvent = new CustomEvent('change', {value})
    this.dispatchEvent(changeEvent)
    this.setAttribute('value', value)
  }

  get value() {
    return this.getAttribute('value') || undefined
  }

  open() {
    this.close()
    this.classList.add('visible')
    this.mobile.classList.add('visible')
    document.body.classList.add('mn-select-visible')
    window.MnBackdrop.show()
  }

  close() {
    const select = document.querySelector('mn-select.visible')

    if (select) {
      select.classList.remove('visible')
      select.mobile.classList.remove('visible')
      document.body.classList.remove('mn-select-visible')
      window.MnBackdrop.hide()
    }
  }

  focus() {
    // this.querySelector('input').focus()
  }

  blur() {
    // this.querySelector('input').blur()
  }

  focusOption(event) {
    if (event.type === 'click') {
      // focus on option behind mouse
      const option = document.elementFromPoint(event.clientX, event.clientY)
      option.focus()
    } else if (event.type === 'keydown') {
      const option = this.querySelector('.mn-select-option[selected]')
        || this.querySelector('.mn-select-option:first-child')
      option.focus()
    }
  }
}

window.customElements.define('mn-select', MnSelect)

