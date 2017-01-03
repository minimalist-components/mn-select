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
        // fallback option, some browsers dont support tag option
        const option = document.createElement('div')
        option.classList.add('mn-select-option')
        option.textContent = child.textContent

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
    options.append(menu)
    options.append(cancelButton)

    document.body.append(options)
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
        console.log('click')
        const value = event.target.getAttribute('value') || event.target.textContent
        this.value = value
        this.close()
      }))
  }

  setOpenEvents() {
    this.addEventListener('click', this.open)
    this.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          this.open()
          event.preventDefault()
      }
    })
  }

  setCloseEvents() {
    this.addEventListener('focus', () => this.close())
    this.mobile.querySelector('button').addEventListener('click', () => this.close())
    // need check if click in mobile outside works with event below to document click
    // this.mobile.addEventListener('touchend', event => {
    //   if (event.target.classList.contains('mn-select-mobile')) {
    //     this.close()
    //   }
    // })
    this.mobile.addEventListener('click', event => {
      if (event.target.classList.contains('mn-select-mobile')) {
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
      const clickOutside = !event.target.closest('mn-select')
      const selectOption = event.target.classList.contains('mn-select-option')

      if (clickOutside || selectOption) {
        this.close()
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
    const option = this.querySelector(`.mn-select-option[value="${value}"]`)

    if (option) {
      this.querySelector('div').textContent = option.textContent
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
  }

  close() {
    const select = document.querySelector('mn-select.visible')

    if (select) {
      select.classList.remove('visible')
      select.mobile.classList.remove('visible')
      document.body.classList.remove('mn-select-visible')
    }
  }
}

window.customElements.define('mn-select', MnSelect)

