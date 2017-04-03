class MnSelect extends window.MnInput {
  constructor(self) {
    self = super(self)
    this.container = undefined
    this.filterString = ''
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

        // wrap in a span
        const text = child
          .textContent
          .split('')
          .map(char => `<span class="char">${char}</span>`)
          .join('')

        const isDataBinding = /{{.+}}/.test(child.textContent)

        if (isDataBinding) {
          option.textContent = child.textContent
        } else {
          option.innerHTML = text
        }

        Array
          .from(child.attributes)
          .forEach(attr => option.setAttribute(attr.name, attr.value))

        child.parentNode.removeChild(child)
        menu.appendChild(option)
      })

    this.insertBefore(menu, this.firstChild)
    this.menu = menu
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
      const option = document.querySelector(`.mn-select-option[value='${value}']`)

      if (option) {
        viewValue.textContent = option.textContent
      }
    }

    this.insertBefore(viewValue, this.firstChild)
  }

  setOptionEvents() {
    const options = Array.from(this.querySelectorAll('.mn-select-option'))
    const mobile = Array.from(this.mobile.querySelectorAll('.mn-select-option'))
    const _this = this

    options
      .concat(mobile)
      .forEach(option => option.addEventListener('click', clickToSelect))

    options
      .forEach(option => option.addEventListener('mousemove', focusOption))

    document.addEventListener('keydown', arrowNavigate)
    document.addEventListener('keydown', enterToSelect)
    document.addEventListener('keydown', characterFilter)

    function clickToSelect(event) {
      const value = event.target.getAttribute('value') || event.target.textContent
      _this.value = value
      _this.close()
    }

    function focusOption(event) {
      if (_this.classList.contains('arrow-key')) {
        _this.classList.remove('arrow-key')
      } else {
        _this.focusIn(event.target)
      }
    }

    function arrowNavigate(event) {
      const isArrowKey = event.key === 'ArrowDown' || event.key === 'ArrowUp'
      const elementIsVisible = _this.classList.contains('visible')

      if (isArrowKey && elementIsVisible) {
        const items = Array
          .from(_this.menu.children)
          .filter(item => {
            return !item.classList.contains('hidden')
          })

        const index = items.indexOf(_this.querySelector('.mn-select-option.focus'))

        const nextIndex = event.key === 'ArrowDown' && index < items.length
          ? index + 1
          : event.key === 'ArrowUp' && index > 0
            ? index - 1
            : 0

        const nextFocusable = items[nextIndex]

        if (isArrowKey && nextFocusable) {
          _this.focusIn(nextFocusable)
          event.stopPropagation()
          event.preventDefault()
        }
      }
    }

    function enterToSelect(event) {
      const isEnterKey = event.key === 'Enter'
      const elementIsVisible = _this.classList.contains('visible')
      const option = _this.menu.querySelector('.focus')

      if (isEnterKey && elementIsVisible && option) {
        const value = option.getAttribute('value') || option.textContent
        _this.value = value
        _this.close()
      }
    }

    function characterFilter(event) {
      const isCharacter = event.key.length === 1 && event.key !== ' '
      const elementIsVisible = _this.classList.contains('visible')

      if (isCharacter && elementIsVisible) {
        _this.filterString += event.key
        _this.filter = _this.filterString
      }
    }
  }

  setOpenEvents() {
    const _this = this
    this.addEventListener('click', clickToOpen)
    this.addEventListener('keydown', enterOrSpaceToOpen)

    function clickToOpen() {
      const elementIsVisible = _this.classList.contains('visible')
      !elementIsVisible && _this.open()
    }

    function enterOrSpaceToOpen(event) {
      const isEnterOrSpaceKey = event.key === 'Enter'
        || event.key === ' '
      const elementIsVisible = _this.classList.contains('visible')

      if (isEnterOrSpaceKey && !elementIsVisible) {
        _this.open()
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  setCloseEvents() {
    this.addEventListener('focus', () => this.close())
    this.mobile.querySelector('button').addEventListener('click', () => this.close())
    this.mobile.addEventListener('click', event => {
      if (event.target.classList.contains('mn-select-mobile')) {
        this.close()
      }
    })

    document.addEventListener('keydown', event => {
      const hasFilter = this.filterString
      const isOpened = this.classList.contains('visible')

      if (isOpened) {
        if (event.key === 'Backspace') {
          this.filterString = this.filterString.slice(0, -1)
          this.filter = this.filterString
        }

        if (event.key === 'Tab') {
          this.close()
        }

        if (event.key === 'Escape') {
          if (hasFilter) {
            this.filter = undefined
          } else {
            this.close()
          }
        }
      }
    })

    document.addEventListener('mousedown', event => {
      const elementIsVisible = this.classList.contains('visible')
      const clickOutside = this.container
        ? !event.target.closest(this.container)
        : !event.target.closest('mn-select')
      const selectOption = event.target.classList.contains('mn-select-option')
      if (elementIsVisible && clickOutside || selectOption) {
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
    value = typeof value === 'object'
      ? JSON.stringify(value)
      : value

    const option = this.querySelector(`.mn-select-option[value='${value}']`)
    const input = this.querySelector('input')

    if (option) {
      const viewValue = this.querySelector('div:not(.mn-select-option)')
      viewValue
        ? viewValue.textContent = option.textContent
        : null
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
    // return evaluate(this.getAttribute('value')) || undefined
    let attrValue

    try {
      attrValue = this.getAttribute('value')
        ? JSON.parse(this.getAttribute('value'))
        : this.getAttribute('value')
    } catch (e) {
      attrValue = this.getAttribute('value')
    }

    return attrValue || undefined
  }

  set filter(value) {
    if (value) {
      this.classList.add('filtered')
      this.filterString = value
      const options = Array.from(this.menu.querySelectorAll('.mn-select-option'))
      options.forEach(option => {
        const matchOption = filterByRegex(value, option.textContent)

        if (matchOption) {
          option.classList.remove('hidden')
          const strReg = value
              .split('')
              .join('.*')
              .replace(/(\w(?:\.\*)?)/g, '($1)')
          const reg = new RegExp(strReg, 'i')
          const matches = option.textContent.match(reg)
          const chars = Array.from(option.querySelectorAll('span'))

          chars
            .forEach((char, index) => {
              const matchIndex = index >= matches.index
              const matchValue = value.toLowerCase().search(char.textContent.toLowerCase()) >= 0

              if (matchIndex && matchValue) {
                char.classList.add('filter-match')
              } else {
                char.classList.remove('filter-match')
              }
            })
          value.split('')
        } else {
          option.classList.add('hidden')
        }
      })
    } else {
      this.classList.remove('filtered')
      this.filterString = ''
      const hiddenOptions = Array.from(this.querySelectorAll('.mn-select-option.hidden'))
      const chars = Array.from(this.querySelectorAll('.mn-select-option span.filter-match'))
      hiddenOptions.forEach(option => option.classList.remove('hidden'))
      chars.forEach(char => char.classList.remove('filter-match'))
    }

    this.focusIn(this.querySelector('.mn-select-option:not(.hidden)'))

    function filterByRegex(search, value) {
      const reg = new RegExp(search.split('').join('.*'), 'i')
      return reg.test(value)
    }
  }

  get filter() {
    return this.filterString || undefined
  }

  open() {
    this.close()
    this.menu.scrollTop = 0
    this.classList.add('visible')
    this.mobile.classList.add('visible')
    document.body.classList.add('mn-select-visible')
    window.MnBackdrop.show()
    this.focusIn(this.querySelector('.mn-select-option'))
  }

  close() {
    const select = document.querySelector('mn-select.visible')

    if (select) {
      select.classList.remove('visible')
      select.filter = undefined
      select.mobile.classList.remove('visible')
      document.body.classList.remove('mn-select-visible')
      window.MnBackdrop.hide()
    }
  }

  focusIn(option) {
    if (option && !option.classList.contains('focus')) {
      const lastFocus = this.querySelector('.mn-select-option.focus')
      lastFocus && lastFocus.classList.remove('focus')
      option.classList.add('focus')

      const optionTop = option.offsetTop
      const optionBottom = optionTop + option.clientHeight

      const scrollToTop = optionTop < this.menu.scrollTop
      const scrollToBottom = optionBottom > this.menu.scrollTop + this.menu.clientHeight

      this.classList.add('arrow-key')
      if (scrollToTop) {
        this.menu.scrollTop = optionTop
      } else if (scrollToBottom) {
        this.menu.scrollTop = optionBottom - this.menu.clientHeight
      }
    }
  }
}

window.customElements.define('mn-select', MnSelect)

