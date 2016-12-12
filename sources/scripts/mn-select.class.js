class MnSelect extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.setOpenEvents()
    this.setCloseEvents()
    return self
  }

  setOpenEvents() {
    const open = this.open
    this.addEventListener('click', open)
  }

  setCloseEvents() {
    const close = this.close
    document.body.addEventListener('click', close)
    document.addEventListener('keyup', () => {
      const esc = event.keyCode === 27
      let isOpened = document.body.classList.contains('mn-select-visible')

      if (esc && isOpened) {
        const select = document.querySelector('mn-select.visible')
        document.body.classList.remove('mn-select-visible')
        select.classList.remove('visible')
      }
    })
  }

  open() {
    this.classList.add('visible')
    document.body.classList.add('mn-select-visible')
  }

  close(event) {
    event.stopPropagation()
    const clickOutside = event.target.tagName === 'BODY'
    const select = document.querySelector('mn-select.visible')

    if (clickOutside && select) {
      document.body.classList.remove('mn-select-visible')
      select.classList.remove('visible')
    }
  }
}

customElements.define('mn-select', MnSelect)
