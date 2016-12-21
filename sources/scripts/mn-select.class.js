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
    // const selectOption = this.selectOption
    const options = this.querySelectorAll('option')

    Array
      .from(options)
      .forEach(option => option.addEventListener('click', event => {
        this.selectOption(event.target)
        this.setViewValue(event.target.textContent)
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

  setViewValue(text) {
    this.childNodes[0].textContent = text
  }

  selectOption(target) {
    // const value = target.value || target.textContent
    const lastSelected = target.parentNode.querySelector('option[selected]')

    if (lastSelected) {
      lastSelected.removeAttribute('selected')
    }
    target.setAttribute('selected', 'selected')
    // console.log(value)
    // console.log(target.addAttribute)
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
