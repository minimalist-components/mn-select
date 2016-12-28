"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),MnSelect=function(_HTMLElement){function MnSelect(self){var _this,_ret;return _classCallCheck(this,MnSelect),self=_this=_possibleConstructorReturn(this,(MnSelect.__proto__||Object.getPrototypeOf(MnSelect)).call(this,self)),_this.setTabIndex(),_this.setMenu(),_this.setMobileOptions(),_this.setSelected(),_this.setOptionEvents(),_this.setOpenEvents(),_this.setCloseEvents(),_ret=self,_possibleConstructorReturn(_this,_ret)}return _inherits(MnSelect,_HTMLElement),_createClass(MnSelect,[{key:"setTabIndex",value:function(){var tabindex=this.getAttribute("tabindex")||"0";this.setAttribute("tabindex",tabindex);var options=this.querySelectorAll("option");Array.from(options).forEach(function(option){return option.setAttribute("tabindex","0")})}},{key:"setSelected",value:function(){var selected=document.createElement("div"),selectedOption=this.getAttribute("placeholder")?this.querySelector(".mn-select-option[selected]"):this.querySelector(".mn-select-option[selected]")||this.querySelector(".mn-select-option");selectedOption&&(this.classList.add("has-value"),selected.textContent=selectedOption.textContent),this.insertBefore(selected,this.firstChild)}},{key:"setMenu",value:function(){var menu=document.createElement("menu");menu.style.transform="translate(-14px, -8px)",menu.classList.add("mn-card"),Array.from(this.children).forEach(function(child){var fallbackOption=document.createElement("div");fallbackOption.classList.add("mn-select-option"),fallbackOption.textContent=child.textContent,Array.from(child.attributes).forEach(function(attr){return fallbackOption.setAttribute(attr.name,attr.value)}),child.parentNode.removeChild(child),menu.appendChild(fallbackOption)}),this.insertBefore(menu,this.firstChild)}},{key:"setMobileOptions",value:function(){var options=document.createElement("div"),menu=this.querySelector("menu").cloneNode(!0),cancelButton=document.createElement("button");options.classList.add("mn-mobile-options"),menu.classList.remove("mn-card"),menu.removeAttribute("style"),cancelButton.textContent="cancel",this.mobileOptions=options,options.append(menu),options.append(cancelButton),document.body.append(options)}},{key:"setOpenEvents",value:function(){var _this2=this,open=this.open;this.addEventListener("click",open),this.addEventListener("keyup",function(event){"Enter"!==event.key&&" "!==event.key||_this2.open()})}},{key:"setArrowEvents",value:function(){var _this3=this;this.addEventListener("keyup",function(event){var keyIsArrowUpOrDown="ArrowUp"===event.key||"ArrowDown"===event.key;keyIsArrowUpOrDown&&_this3.open()});var options=this.querySelectorAll(".mn-select-option");Array.from(options).forEach(function(option){return option.addEventListener("keyup",function(event){"ArrowDown"===event.key?(console.log(event.target.previousElementSibling),event.target.previousElementSibling.focus()):"ArrowDown"===event.key&&(console.log(event.target.nextElementSibling),event.target.nextElementSibling.focus())})})}},{key:"setOptionEvents",value:function(){var _this4=this,options=this.querySelectorAll(".mn-select-option"),mobileOptions=Array.from(this.mobileOptions.querySelectorAll(".mn-select-option"));Array.from(options).concat(mobileOptions).forEach(function(option){return option.addEventListener("click",function(event){_this4.setSelectedOption(event.target),_this4.setValue(event.target.getAttribute("value")),_this4.close()})})}},{key:"setCloseEvents",value:function(){var _this5=this;this.mobileOptions.querySelector("button").addEventListener("click",function(){return _this5.close()}),this.mobileOptions.addEventListener("touchend",function(event){event.target.classList.contains("mn-mobile-options")&&_this5.close()}),this.mobileOptions.addEventListener("click",function(event){event.target.classList.contains("mn-mobile-options")&&_this5.close()}),document.body.addEventListener("click",this.close),document.addEventListener("keyup",function(){var esc=27===event.keyCode,isOpened=document.body.classList.contains("mn-select-visible");esc&&isOpened&&_this5.close()})}},{key:"setValue",value:function(value){var option=this.querySelector('.mn-select-option[value="'+value+'"]'),viewValue=option?option.textContent:null;viewValue?(this.setViewValue(viewValue),this.classList.add("has-value")):console.error("MN-SELECT OPTION_UNDEFINED\n        You're trying set a value ("+value+") to mn-select,\n        but there is no option with this value to be displayed")}},{key:"setViewValue",value:function(text){this.childNodes[0].textContent=text}},{key:"setSelectedOption",value:function(target){var lastSelected=target.parentNode.querySelector(".mn-select-option[selected]");lastSelected&&lastSelected.removeAttribute("selected"),target.setAttribute("selected","selected")}},{key:"open",value:function(event){if(event&&event.target.classList.contains(".mn-select-option"))return!1;this.classList.add("visible"),this.mobileOptions.classList.add("visible"),document.body.classList.add("mn-select-visible");var focusedOption=this.querySelector(".mn-select-option[selected]")||this.querySelector(".mn-select-option:first-child");focusedOption.focus()}},{key:"close",value:function(event){var select=document.querySelector("mn-select.visible");if(event&&select){event.stopPropagation();var clickOutside="BODY"===event.target.tagName||event.target.classList.contains("mn-mobile-options")||event.target.classList.contains("mn-select-option");clickOutside&&select&&(document.body.classList.remove("mn-select-visible"),select.classList.remove("visible"),select.mobileOptions.classList.remove("visible"))}else select&&(document.body.classList.remove("mn-select-visible"),select.classList.remove("visible"),select.mobileOptions.classList.remove("visible"))}}]),MnSelect}(HTMLElement);window.customElements.define("mn-select",MnSelect);
//# sourceMappingURL=mn-select.js.map
