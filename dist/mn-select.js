"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),MnSelect=function(_HTMLElement){function MnSelect(self){var _this,_ret;return _classCallCheck(this,MnSelect),self=_this=_possibleConstructorReturn(this,(MnSelect.__proto__||Object.getPrototypeOf(MnSelect)).call(this,self)),_this.tabIndex(),_this.setMenu(),_this.setMobile(),_this.setSelected(),_this.setOptionEvents(),_this.setOpenEvents(),_this.setCloseEvents(),_this.setNameGetter(),_ret=self,_possibleConstructorReturn(_this,_ret)}return _inherits(MnSelect,_HTMLElement),_createClass(MnSelect,[{key:"tabIndex",value:function(){var tabindex=this.getAttribute("tabindex")||"0";this.setAttribute("tabindex",tabindex)}},{key:"setMenu",value:function(){var menu=document.createElement("menu");menu.style.transform="translate(-14px, -8px)",menu.classList.add("mn-card"),Array.from(this.children).forEach(function(child){var option=document.createElement("div");option.classList.add("mn-select-option"),option.textContent=child.textContent,Array.from(child.attributes).forEach(function(attr){return option.setAttribute(attr.name,attr.value)}),child.parentNode.removeChild(child),menu.appendChild(option)}),this.insertBefore(menu,this.firstChild)}},{key:"setMobile",value:function(){var options=document.createElement("div"),menu=this.querySelector("menu").cloneNode(!0),cancelButton=document.createElement("button");options.classList.add("mn-select-mobile"),menu.removeAttribute("class"),menu.removeAttribute("style"),cancelButton.textContent="cancel",this.mobile=options,options.append(menu),options.append(cancelButton),document.body.append(options)}},{key:"setSelected",value:function(){var viewValue=document.createElement("div"),selectedOption=this.getAttribute("placeholder")?this.querySelector(".mn-select-option[selected]"):this.querySelector(".mn-select-option[selected]")||this.querySelector(".mn-select-option");if(selectedOption){var value=selectedOption.getAttribute("value")||selectedOption.textContent;this.value=value,this.classList.add("has-value"),viewValue.textContent=selectedOption.textContent}this.insertBefore(viewValue,this.firstChild)}},{key:"setOptionEvents",value:function(){var _this2=this,options=this.querySelectorAll(".mn-select-option"),mobile=Array.from(this.mobile.querySelectorAll(".mn-select-option"));Array.from(options).concat(mobile).forEach(function(option){return option.addEventListener("click",function(event){var value=event.target.getAttribute("value")||event.target.textContent;_this2.value=value,_this2.close()})})}},{key:"setOpenEvents",value:function(){var _this3=this;this.addEventListener("click",this.open),this.addEventListener("keydown",function(event){switch(event.key){case"Enter":case" ":_this3.open(),event.preventDefault()}})}},{key:"setCloseEvents",value:function(){var _this4=this;this.addEventListener("blur",function(){return _this4.close()}),this.mobile.querySelector("button").addEventListener("click",function(){return _this4.close()}),this.mobile.addEventListener("click",function(event){event.target.classList.contains("mn-select-mobile")&&_this4.close()}),document.addEventListener("keyup",function(){var esc=27===event.keyCode,isOpened=document.body.classList.contains("mn-select-visible");esc&&isOpened&&_this4.close()}),document.addEventListener("click",function(event){var selectOption=event.target.classList.contains("mn-select-option");selectOption&&_this4.close()})}},{key:"setNameGetter",value:function(){var form=this.closest("form"),name=this.getAttribute("name"),element=this;form&&name&&Object.defineProperty(form,name,{get:function(){return element}})}},{key:"open",value:function(){this.close(),this.classList.add("visible"),this.mobile.classList.add("visible"),document.body.classList.add("mn-select-visible")}},{key:"close",value:function(){var select=document.querySelector("mn-select.visible");select&&(select.classList.remove("visible"),select.mobile.classList.remove("visible"),document.body.classList.remove("mn-select-visible"))}},{key:"value",set:function(value){var option=this.querySelector('.mn-select-option[value="'+value+'"]');if(option){this.querySelector("div").textContent=option.textContent,this.classList.add("has-value");var lastSelected=option.parentNode.querySelector(".mn-select-option[selected]");lastSelected&&lastSelected.removeAttribute("selected"),option.setAttribute("selected","selected")}else console.error("MN-SELECT OPTION_UNDEFINED\n        You're trying set a value ("+value+") to mn-select,\n        but there is no option with this value to be displayed");this.setAttribute("value",value)},get:function(){return this.getAttribute("value")||void 0}}]),MnSelect}(HTMLElement);window.customElements.define("mn-select",MnSelect);
//# sourceMappingURL=mn-select.js.map
