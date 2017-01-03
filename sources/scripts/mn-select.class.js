class MnSelect extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.tabIndex()
    this.setMenu()
    this.setMobile()
    this.setSelected()
    this.setOptionEvents()
    this.setOpenEvents()
    this.setCloseEvents()
    this.setNameGetter()
    return self
  }

  tabIndex() {
    const tabindex = this.getAttribute('tabindex') || '0'
    this.setAttribute('tabindex', tabindex)
  }

  setMenu() {
    const menu = document.createElement('menu')
    menu.style.transform = 'translate(-14px, -8px)'

    menu.classList.add('mn-card')

    Array
      .from(this.children)
      .forEach(child => {
        const fallbackOption = document.createElement('div')
        fallbackOption.classList.add('mn-select-option')
        fallbackOption.textContent = child.textContent

        Array
          .from(child.attributes)
          .forEach(attr => fallbackOption.setAttribute(attr.name, attr.value))

        child.parentNode.removeChild(child)
        menu.appendChild(fallbackOption)
      })

    this.insertBefore(menu, this.firstChild)
  }

  setMobile() {
    const options = document.createElement('div')
    const menu = this.querySelector('menu').cloneNode(true)
    const cancelButton = document.createElement('button')

    options.classList.add('mn-mobile-options')
    menu.classList.remove('mn-card')
    menu.removeAttribute('style')
    cancelButton.textContent = 'cancel'

    this.mobileOptions = options
    options.append(menu)
    options.append(cancelButton)

    document.body.append(options)
  }

  setSelected() {
    const selected = document.createElement('div')
    const selectedOption = this.getAttribute('placeholder')
      ? this.querySelector('.mn-select-option[selected]')
      : this.querySelector('.mn-select-option[selected]') || this.querySelector('.mn-select-option')

    if (selectedOption) {
      const value = selectedOption.getAttribute('value') || selectedOption.textContent
      this.value = value
      this.classList.add('has-value')
      selected.textContent = selectedOption.textContent
    }
    this.insertBefore(selected, this.firstChild)
  }

  setOptionEvents() {
    const options = this.querySelectorAll('.mn-select-option')
    const mobileOptions = Array.from(this.mobileOptions.querySelectorAll('.mn-select-option'))

    Array
      .from(options)
      .concat(mobileOptions)
      .forEach(option => option.addEventListener('click', event => {
        const value = event.target.getAttribute('value') || event.target.textContent
        this.setSelectedOption(event.target)
        this.value = value
        this.close()
      }))
  }

  setOpenEvents() {
    const open = this.open
    this.addEventListener('click', open)
    this.addEventListener('keyup', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        this.open(event)
      }
    })
  }

  setCloseEvents() {
    const close = this.close
    this.mobileOptions.querySelector('button').addEventListener('click', () => this.close())
    this.mobileOptions.addEventListener('touchend', event => {
      if (event.target.classList.contains('mn-mobile-options')) {
        this.close()
      }
    })
    this.mobileOptions.addEventListener('click', event => {
      if (event.target.classList.contains('mn-mobile-options')) {
        this.close()
      }
    })
    document.addEventListener('keyup', () => {
      const esc = event.keyCode === 27
      let isOpened = document.body.classList.contains('mn-select-visible')

      if (esc && isOpened) {
        this.close()
      }
    })
    document.addEventListener('click', event => {
      const closest = event.target.closest('mn-select')
      const isOption = event.target.classList.contains('mn-select-option')

      if (!closest || isOption) {
        close()
      }
    })
  }

  setNameGetter() {
    const form = this.closest('form')
    const name = this.getAttribute('name')
    const element = this

    if (form && name) {
      Object.defineProperty(form, name, {get: () => element})
    }
  }

  set value(value) {
    this.setValue(value)
    this.setAttribute('value', value)
    const target = this.querySelector(`.mn-select-option[value="${value}"]`)

    if (target) {
      this.setSelectedOption(target)
    }
  }

  get value() {
    return this.getAttribute('value') || undefined
  }

  setValue(value) {
    const option = this.querySelector(`.mn-select-option[value="${value}"]`)
    const viewValue = option
      ? option.textContent
      : null

    if (viewValue) {
      this.setViewValue(viewValue)
      this.classList.add('has-value')
    } else {
      console.error(`MN-SELECT OPTION_UNDEFINED
        You're trying set a value (${value}) to mn-select,
        but there is no option with this value to be displayed`)
    }
  }

  setViewValue(text) {
    this.querySelector('div').textContent = text
  }

  setSelectedOption(target) {
    const lastSelected = target.parentNode.querySelector('.mn-select-option[selected]')

    if (lastSelected) {
      lastSelected.removeAttribute('selected')
    }
    target.setAttribute('selected', 'selected')
  }

  open(event) {
    this.close()
    if (event && event.target.classList.contains('.mn-select-option')) {
      return false
    }
    this.classList.add('visible')
    this.mobileOptions.classList.add('visible')
    document.body.classList.add('mn-select-visible')

    if (event && event.type === 'keyup') {
      const focusedOption = this.querySelector('.mn-select-option[selected]')
        || this.querySelector('.mn-select-option:first-child')
      focusedOption.focus()
    }
  }

  close() {
    const select = document.querySelector('mn-select.visible')

    if (select) {
      document.body.classList.remove('mn-select-visible')
      select.classList.remove('visible')
      select.mobileOptions.classList.remove('visible')
    }
  }
}

window.customElements.define('mn-select', MnSelect)

