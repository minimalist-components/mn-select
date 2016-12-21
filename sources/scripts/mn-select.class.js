class MnSelect extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.setOpenEvents()
    this.setCloseEvents()
    this.setMenu()
    this.setSelected()
    this.setOptionEvents()
    return self
  }

  setSelected() {
    const selected = document.createElement('div')
    const selectedOption = this.querySelector('option[selected]') || this.querySelector('option')
    selected.textContent = selectedOption.textContent
    this.insertBefore(selected, this.firstChild)
  }

  setMenu() {
    const menu = document.createElement('menu')
    menu.style.transform = 'translate(-14px, -8px)'

    menu.classList.add('mn-card')

    Array
      .from(this.children)
      .forEach(child => menu.appendChild(child))

    this.insertBefore(menu, this.firstChild)
  }

  setOpenEvents() {
    const open = this.open
    this.addEventListener('click', open)
  }

  setOptionEvents() {
    const options = this.querySelectorAll('option')

    Array
      .from(options)
      .forEach(option => option.addEventListener('click', event => {
        this.setSelectedOption(event.target)
        this.setValue(event.target.value)
        this.close()
      }))
  }

  setCloseEvents() {
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
    const option = this.querySelector(`option[value="${value}"]`)
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
    const lastSelected = target.parentNode.querySelector('option[selected]')

    if (lastSelected) {
      lastSelected.removeAttribute('selected')
    }
    target.setAttribute('selected', 'selected')
  }

  open(event) {
    if (event && event.target.tagName === 'OPTION') {
      return false
    }
    this.classList.add('visible')
    document.body.classList.add('mn-select-visible')
  }

  close(event) {
    const select = document.querySelector('mn-select.visible')
    if (event && select) {
      event.stopPropagation()
      const clickOutside = event.target.tagName === 'BODY'

      if (clickOutside && select) {
        document.body.classList.remove('mn-select-visible')
        select.classList.remove('visible')
      }
    } else if (select) {
      document.body.classList.remove('mn-select-visible')
      select.classList.remove('visible')
    }
  }
}

customElements.define('mn-select', MnSelect)
