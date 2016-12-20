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
        const value = event.target.value
        this.selectOption(value)
        this.close()
      }))
  }

  setCloseEvents() {
    // const close = this.close
    document.body.addEventListener('click', this.close)
    document.addEventListener('keyup', () => {
      const esc = event.keyCode === 27
      let isOpened = document.body.classList.contains('mn-select-visible')

      if (esc && isOpened) {
        this.close()
      }
    })
  }

  selectOption(value) {
    console.log(value)
  }

  open() {
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
      // dont work
      document.body.classList.remove('mn-select-visible')
      select.classList.remove('visible')
    }
  }
}

customElements.define('mn-select', MnSelect)
