[![npm version](https://badge.fury.io/js/mn-select.svg)](https://badge.fury.io/js/mn-select)
[![Dependency Status](https://gemnasium.com/badges/github.com/minimalist-components/mn-select.svg)](https://gemnasium.com/github.com/minimalist-components/mn-select)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

# mn-select

Minimalist select component, agnostic to framworks.

See the [demo](https://minimalist-components.github.io/mn-select/)

[![preview demo](https://raw.githubusercontent.com/minimalist-components/mn-select/master/preview.gif)](https://minimalist-components.github.io/mn-select/) 

### Install

```sh
npm install --save mn-select
```

And bundle dependencies and main files in [dist/](https://github.com/minimalist-components/mn-select/tree/master/dist) with your preferred tool.

### Usage

just use the tag `mn-select` and `option`, e.g.

```html
<mn-select>
  <option value="#fff">White</option>
  <option value="#000">Black</option>
</mn-select>
```

To begin with an value, you can use the attribute selected in tag option

```html
<mn-select>
  <option value="#fff">White</option>
  <option value="#000" selected>Black</option>
</mn-select>
```

Or just use the attribute value in mn-select

```html
<mn-select value="#fff">
  <option value="#fff">White</option>
  <option value="#000">Black</option>
</mn-select>
```

If you want set the value from javascript, just assign a value to property .value, e.g.

```js
document.querySelector('mn-select').value = '#000'
```

The following attributes from image are supported in this `mn-select`

- [value](http://www.w3schools.com/TAgs/att_input_value.asp)
- [placeholder](http://www.w3schools.com/TAgs/att_input_placeholder.asp)
- [id](http://www.w3schools.com/tags/att_global_id.asp)
- [name](http://www.w3schools.com/TAgs/att_input_name.asp)

and in option

- [value](http://www.w3schools.com/TAgs/att_input_value.asp)
- [selected](http://www.w3schools.com/tags/att_option_selected.asp)



