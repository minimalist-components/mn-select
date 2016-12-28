# mn-select

Minimalist select component, agnostic to framworks.

<!-- See the [demo](http://codepen.io/darlanmendonca/full/JRGoxv) -->

<!-- [![preview demo](https://raw.githubusercontent.com/minimalist-components/mn-select/master/sources/example/mn-select.gif)](http://codepen.io/darlanmendonca/full/akgXQq)  -->

### Install

```sh
# not available ye, working in progress
bower install --save mn-select
```

Or just download the main files, located in [dist/](https://github.com/minimalist-components/mn-select/tree/master/dist)

### Usage

just use the tag `mn-select` and `mn-option`, e.g.

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



