class MnSelect extends window.MnInput {
  constructor(self) {
    self = super(self)
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

        option.setAttribute('tabindex', '-1')

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

    options
      .concat(mobile)
      .forEach(option => option.addEventListener('click', event => {
        const value = event.target.getAttribute('value') || event.target.textContent
        this.value = value
        this.close()
      }))

    options
      .forEach(option => option.addEventListener('mousemove', event => {
        event.target.focus()
        event.target.classList.remove('keydown')
      }))

    options
      .forEach(option => option.addEventListener('keydown', event => {
        let nextFocusable

        const items = Array
          .from(event.target.parentNode.children)
          .filter(item => {
            return !item.classList.contains('hidden')
          })
        const index = items.indexOf(event.target)

        const nextIndex = event.key === 'ArrowDown' && index < items.length
          ? index + 1
          : event.key === 'ArrowUp' && index > 0
            ? index - 1
            : 0

        nextFocusable = items[nextIndex]

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.target.classList.add('keydown')
          nextFocusable.focus()
          event.stopPropagation()
          event.preventDefault()
        }
      }))

    options
      .forEach(option => option.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const value = event.target.getAttribute('value') || event.target.textContent
          this.value = value
          this.close()
          // this.focus()
          event.stopPropagation()
        }
      }))

    options
      .forEach(option => option.addEventListener('keydown', event => {
        const isCharacter = event.key.length === 1

        if (isCharacter) {
          this.filterString += event.key
          this.filter = this.filterString
          this.focusOption(event)
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
    this.focusOption()
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

  focusOption(event = {}) {
    if (event.type === 'click') {
      // focus on option behind mouse
      const option = document.elementFromPoint(event.clientX, event.clientY)
      option.focus()
    // } else if (event.type === 'keydown') {
    } else {
      const option = this.querySelector('.mn-select-option[selected]')
        || this.querySelector('.mn-select-option:not(.hidden)')
      console.log(option)
      option.focus()
    }
  }
}

// function evaluate(value) {
//   try {
//     const isVariable = !value.startsWith('[')
//       && !value.startsWith('{')
//       && !value.startsWith('\'')
//       && !value.startsWith('"')
//       && !value.startsWith('`')
//       && value !== 'true'
//       && value !== 'false'
//       && isNaN(value)

//     return isVariable
//         ? eval(`'${value}'`) // convert to string
//         : eval(`(${value})`) // evaluate
//   } catch (e) {
//     return value
//   }
// }

window.customElements.define('mn-select', MnSelect)

