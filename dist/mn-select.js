'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MnSelect = function (_HTMLElement) {
  _inherits(MnSelect, _HTMLElement);

  function MnSelect(self) {
    var _this, _ret;

    _classCallCheck(this, MnSelect);

    self = (_this = _possibleConstructorReturn(this, (MnSelect.__proto__ || Object.getPrototypeOf(MnSelect)).call(this, self)), _this);
    _this.tabIndex();
    _this.setMenu();
    _this.setMobile();
    _this.setSelected();
    _this.setOptionEvents();
    _this.setOpenEvents();
    _this.setCloseEvents();
    _this.setFormGetter();
    _this.setValidation();
    return _ret = self, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MnSelect, [{
    key: 'tabIndex',
    value: function tabIndex() {
      var tabindex = this.getAttribute('tabindex') || '0';
      this.setAttribute('tabindex', tabindex);
    }
  }, {
    key: 'setMenu',
    value: function setMenu() {
      var menu = document.createElement('menu');
      menu.style.transform = 'translate(-17px, -5px)';

      menu.classList.add('mn-card');

      Array.from(this.children).forEach(function (child) {
        // fallback option, some browsers dont support tag option
        var option = document.createElement('div');
        option.classList.add('mn-select-option');
        option.textContent = child.textContent;
        option.setAttribute('tabindex', '-1');

        Array.from(child.attributes).forEach(function (attr) {
          return option.setAttribute(attr.name, attr.value);
        });

        child.parentNode.removeChild(child);
        menu.appendChild(option);
      });

      this.insertBefore(menu, this.firstChild);
    }
  }, {
    key: 'setMobile',
    value: function setMobile() {
      var options = document.createElement('div');
      var menu = this.querySelector('menu').cloneNode(true);
      var cancelButton = document.createElement('button');

      options.classList.add('mn-select-mobile');
      menu.removeAttribute('class');
      menu.removeAttribute('style');
      cancelButton.textContent = 'cancel';

      this.mobile = options;
      options.appendChild(menu);
      options.appendChild(cancelButton);

      document.body.appendChild(options);
    }
  }, {
    key: 'setSelected',
    value: function setSelected() {
      var viewValue = document.createElement('div');
      var selectedOption = this.getAttribute('placeholder') ? this.querySelector('.mn-select-option[selected]') : this.querySelector('.mn-select-option[selected]') || this.querySelector('.mn-select-option');

      if (selectedOption) {
        var value = selectedOption.getAttribute('value') || selectedOption.textContent;
        this.value = value;
        this.classList.add('has-value');
        viewValue.textContent = selectedOption.textContent;
      }
      this.insertBefore(viewValue, this.firstChild);
    }
  }, {
    key: 'setOptionEvents',
    value: function setOptionEvents() {
      var _this2 = this;

      var options = this.querySelectorAll('.mn-select-option');
      var mobile = Array.from(this.mobile.querySelectorAll('.mn-select-option'));

      Array.from(options).concat(mobile).forEach(function (option) {
        return option.addEventListener('click', function (event) {
          var value = event.target.getAttribute('value') || event.target.textContent;
          _this2.value = value;
          _this2.close();
        });
      });

      Array.from(options).forEach(function (option) {
        return option.addEventListener('mousemove', function (event) {
          event.target.focus();
          event.target.classList.remove('keydown');
        });
      });

      Array.from(options).forEach(function (option) {
        return option.addEventListener('keydown', function (event) {
          var nextFocusable = void 0;
          switch (event.key) {
            case 'ArrowDown':
              nextFocusable = event.target.nextElementSibling;
              break;
            case 'ArrowUp':
              nextFocusable = event.target.previousElementSibling;
              break;
          }

          if (nextFocusable) {
            event.target.classList.add('keydown');
            nextFocusable.focus();
            event.stopPropagation();
            event.preventDefault();
          }
        });
      });

      Array.from(options).forEach(function (option) {
        return option.addEventListener('keydown', function (event) {
          if (event.key === 'Enter') {
            var value = event.target.getAttribute('value') || event.target.textContent;
            _this2.value = value;
            _this2.close();
            _this2.focus();
            event.stopPropagation();
          }
        });
      });
    }
  }, {
    key: 'setOpenEvents',
    value: function setOpenEvents() {
      var _this3 = this;

      this.addEventListener('click', function (event) {
        _this3.open();
        _this3.focusOption(event);
      });
      this.addEventListener('keydown', function (event) {
        switch (event.key) {
          case 'Enter':
          case ' ':
            _this3.open();
            _this3.focusOption(event);
            event.preventDefault();
        }
      });
    }
  }, {
    key: 'setCloseEvents',
    value: function setCloseEvents() {
      var _this4 = this;

      this.addEventListener('focus', function () {
        return _this4.close();
      });
      this.mobile.querySelector('button').addEventListener('click', function () {
        return _this4.close();
      });
      this.mobile.addEventListener('click', function (event) {
        if (event.target.classList.contains('mn-select-mobile')) {
          _this4.close();
        }
      });
      document.addEventListener('keyup', function (event) {
        var esc = event.keyCode === 27;
        var isOpened = document.body.classList.contains('mn-select-visible');

        if (esc && isOpened) {
          _this4.close();
        }
      });
      document.addEventListener('click', function (event) {
        var clickOutside = !event.target.closest('mn-select');
        var selectOption = event.target.classList.contains('mn-select-option');

        if (clickOutside || selectOption) {
          _this4.close();
        }
      });
    }
  }, {
    key: 'setFormGetter',
    value: function setFormGetter() {
      var form = this.closest('form');
      var name = this.getAttribute('name');
      var element = this;

      if (form && name) {
        Object.defineProperty(form, name, { get: function get() {
            return element;
          } });
      }
    }
  }, {
    key: 'setValidation',
    value: function setValidation() {
      var required = this.getAttribute('required');
      if (required) {
        var input = document.createElement('input');
        input.setAttribute('required', 'required');
        input.setAttribute('name', this.getAttribute('name') || this.id);
        input.style.visibility = 'hidden';
        input.style.position = 'absolute';
        this.appendChild(input);
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.close();
      this.classList.add('visible');
      this.mobile.classList.add('visible');
      document.body.classList.add('mn-select-visible');
      window.MnBackdrop.show();
    }
  }, {
    key: 'close',
    value: function close() {
      var select = document.querySelector('mn-select.visible');

      if (select) {
        select.classList.remove('visible');
        select.mobile.classList.remove('visible');
        document.body.classList.remove('mn-select-visible');
        window.MnBackdrop.hide();
      }
    }
  }, {
    key: 'focusOption',
    value: function focusOption(event) {
      if (event.type === 'click') {
        // focus on option behind mouse
        var option = document.elementFromPoint(event.clientX, event.clientY);
        option.focus();
      } else if (event.type === 'keydown') {
        var _option = this.querySelector('.mn-select-option[selected]') || this.querySelector('.mn-select-option:first-child');
        _option.focus();
      }
    }
  }, {
    key: 'value',
    set: function set(value) {
      var option = this.querySelector('.mn-select-option[value="' + value + '"]');
      var input = this.querySelector('input');

      if (option) {
        this.querySelector('div').textContent = option.textContent;
        if (input) {
          input.value = value;
        }
        this.classList.add('has-value');
        var lastSelected = option.parentNode.querySelector('.mn-select-option[selected]');

        if (lastSelected) {
          lastSelected.removeAttribute('selected');
        }
        option.setAttribute('selected', 'selected');
      } else {
        console.error('MN-SELECT OPTION_UNDEFINED\n        You\'re trying set a value (' + value + ') to mn-select,\n        but there is no option with this value to be displayed');
      }

      this.setAttribute('value', value);
    },
    get: function get() {
      return this.getAttribute('value') || undefined;
    }
  }]);

  return MnSelect;
}(HTMLElement);

window.customElements.define('mn-select', MnSelect);
//# sourceMappingURL=mn-select.js.map
