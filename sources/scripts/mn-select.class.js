class MnSelect extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.setMenu()
    this.setMobileOptions()
    this.setSelected()
    this.setOptionEvents()
    this.setOpenEvents()
    this.setCloseEvents()
    return self
  }

  setSelected() {
    const selected = document.createElement('div')
    const selectedOption = this.querySelector('.mn-select-option[selected]') || this.querySelector('.mn-select-option')
    selected.textContent = selectedOption.textContent
    this.insertBefore(selected, this.firstChild)
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

  setMobileOptions() {
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

  setOpenEvents() {
    const open = this.open
    this.addEventListener('click', open)
  }

  setOptionEvents() {
    const options = this.querySelectorAll('.mn-select-option')
    const mobileOptions = Array.from(this.mobileOptions.querySelectorAll('.mn-select-option'))

    Array
      .from(options)
      .concat(mobileOptions)
      .forEach(option => option.addEventListener('click', event => {
        this.setSelectedOption(event.target)
        this.setValue(event.target.getAttribute('value'))
        this.close()
      }))
  }

  setCloseEvents() {
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
    document.body.addEventListener('click', this.close)
    document.addEventListener('keyup', () => {
      const esc = event.keyCode === 27
      let isOpened = document.body.classList.contains('mn-select-visible')

      if (esc && isOpened) {
        this.close()
      }
    })
  }

  setValue(value) {
    const option = this.querySelector(`.mn-select-option[value="${value}"]`)
    const viewValue = option
      ? option.textContent
      : null

    if (viewValue) {
      this.setViewValue(viewValue)
    } else {
      console.error(`MN-SELECT OPTION_UNDEFINED
        You're trying set a value (${value}) to mn-select,
        but there is no option with this value to be displayed`)
    }
  }

  setViewValue(text) {
    this.childNodes[0].textContent = text
  }

  setSelectedOption(target) {
    // const value = target.value || target.textContent
    // target.parentNode.setAttribute('value', value)
    const lastSelected = target.parentNode.querySelector('.mn-select-option[selected]')

    if (lastSelected) {
      lastSelected.removeAttribute('selected')
    }
    target.setAttribute('selected', 'selected')
  }

  open(event) {
    if (event && event.target.classList.contains('.mn-select-option')) {
      return false
    }
    this.classList.add('visible')
    this.mobileOptions.classList.add('visible')
    document.body.classList.add('mn-select-visible')
  }

  close(event) {
    const select = document.querySelector('mn-select.visible')
    if (event && select) {
      event.stopPropagation()
      const clickOutside = event.target.tagName === 'BODY'
        || event.target.classList.contains('mn-mobile-options')
        || event.target.classList.contains('mn-select-option')

      if (clickOutside && select) {
        document.body.classList.remove('mn-select-visible')
        select.classList.remove('visible')
        select.mobileOptions.classList.remove('visible')
      }
    } else if (select) {
      document.body.classList.remove('mn-select-visible')
      select.classList.remove('visible')
      select.mobileOptions.classList.remove('visible')
    }
  }
}

window.customElements.define('mn-select', MnSelect)

