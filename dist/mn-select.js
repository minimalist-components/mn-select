"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),MnSelect=function(_window$MnInput){function MnSelect(self){var _this2,_ret;return _classCallCheck(this,MnSelect),self=_this2=_possibleConstructorReturn(this,(MnSelect.__proto__||Object.getPrototypeOf(MnSelect)).call(this,self)),_this2.filterString="",_this2.tabIndex(),_this2.setMenu(),_this2.setMobile(),_this2.setSelected(),_this2.setOptionEvents(),_this2.setOpenEvents(),_this2.setCloseEvents(),_this2.setFormGetter(),_this2.setValidation(),_ret=self,_possibleConstructorReturn(_this2,_ret)}return _inherits(MnSelect,_window$MnInput),_createClass(MnSelect,[{key:"tabIndex",value:function(){var tabindex=this.getAttribute("tabindex")||"0";this.setAttribute("tabindex",tabindex)}},{key:"setMenu",value:function(){var menu=document.createElement("menu");menu.style.transform="translate(-19px, -5px)",this.removeChild(this.querySelector("input")),menu.classList.add("mn-card"),Array.from(this.children).forEach(function(child){var option=document.createElement("div");option.classList.add("mn-select-option");var text=child.textContent.split("").map(function(char){return'<span class="char">'+char+"</span>"}).join("");/{{.+}}/.test(child.textContent)?option.textContent=child.textContent:option.innerHTML=text,Array.from(child.attributes).forEach(function(attr){return option.setAttribute(attr.name,attr.value)}),child.parentNode.removeChild(child),menu.appendChild(option)}),this.insertBefore(menu,this.firstChild),this.menu=menu}},{key:"setMobile",value:function(){var options=document.createElement("div"),menu=this.querySelector("menu").cloneNode(!0),cancelButton=document.createElement("button");options.classList.add("mn-select-mobile"),menu.removeAttribute("class"),menu.removeAttribute("style"),cancelButton.textContent="cancel",this.mobile=options,options.appendChild(menu),options.appendChild(cancelButton),document.body.appendChild(options)}},{key:"setSelected",value:function(){var viewValue=document.createElement("div"),selectedOption=this.getAttribute("placeholder")?this.querySelector(".mn-select-option[selected]"):this.querySelector(".mn-select-option[selected]")||this.querySelector(".mn-select-option");if(selectedOption){var value=selectedOption.getAttribute("value")||selectedOption.textContent;this.value=value,this.classList.add("has-value"),viewValue.textContent=selectedOption.textContent}else if(this.getAttribute("value")){var _value=this.getAttribute("value");this.value=_value;var option=document.querySelector(".mn-select-option[value='"+_value+"']");option&&(viewValue.textContent=option.textContent)}this.insertBefore(viewValue,this.firstChild)}},{key:"setOptionEvents",value:function(){function clickToSelect(event){var value=event.target.getAttribute("value")||event.target.textContent;this.value=value,this.close()}function focusOption(event){this.focusIn(event.target)}function arrowNavigate(event){var isArrowKey="ArrowDown"===event.key||"ArrowUp"===event.key,elementIsVisible=_this.classList.contains("visible");if(isArrowKey&&elementIsVisible){var items=Array.from(_this.menu.children).filter(function(item){return!item.classList.contains("hidden")}),index=items.indexOf(_this.querySelector(".mn-select-option.focus")),nextIndex="ArrowDown"===event.key&&index<items.length?index+1:"ArrowUp"===event.key&&index>0?index-1:0,nextFocusable=items[nextIndex];isArrowKey&&nextFocusable&&(_this.focusIn(nextFocusable),event.stopPropagation(),event.preventDefault())}}function enterToSelect(event){var isEnterKey="Enter"===event.key,elementIsVisible=_this.classList.contains("visible"),option=_this.menu.querySelector(".focus");if(isEnterKey&&elementIsVisible&&option){var value=option.getAttribute("value")||option.textContent;_this.value=value,_this.close()}}function charactereFilter(event){var isCharacter=1===event.key.length,elementIsVisible=_this.classList.contains("visible");isCharacter&&elementIsVisible&&(_this.filterString+=event.key,_this.filter=_this.filterString,_this.focusOption(event))}var options=Array.from(this.querySelectorAll(".mn-select-option")),mobile=Array.from(this.mobile.querySelectorAll(".mn-select-option")),_this=this;options.concat(mobile).forEach(function(option){return option.addEventListener("click",clickToSelect)}),options.forEach(function(option){return option.addEventListener("mousemove",focusOption)}),document.addEventListener("keydown",arrowNavigate),document.addEventListener("keydown",enterToSelect),document.addEventListener("keydown",charactereFilter)}},{key:"setOpenEvents",value:function(){var _this3=this;this.addEventListener("click",function(event){_this3.open(),_this3.focusOption(event)}),this.addEventListener("keydown",function(event){switch(event.key){case"Enter":case" ":_this3.open(),_this3.focusOption(event),event.preventDefault()}})}},{key:"setCloseEvents",value:function(){var _this4=this;this.addEventListener("focus",function(){return _this4.close()}),this.mobile.querySelector("button").addEventListener("click",function(){return _this4.close()}),this.mobile.addEventListener("click",function(event){event.target.classList.contains("mn-select-mobile")&&_this4.close()}),document.addEventListener("keydown",function(event){var hasFilter=_this4.filterString;_this4.classList.contains("visible")&&("Backspace"===event.key&&(_this4.filterString=_this4.filterString.slice(0,-1),_this4.filter=_this4.filterString),"Tab"===event.key&&_this4.close(),"Escape"===event.key&&(hasFilter?(_this4.filter=void 0,_this4.focusOption()):_this4.close()))}),document.addEventListener("mousedown",function(event){var clickOutside=!event.target.closest("mn-select"),selectOption=event.target.classList.contains("mn-select-option");(clickOutside||selectOption)&&_this4.close()})}},{key:"setFormGetter",value:function(){var form=this.closest("form"),name=this.getAttribute("name"),element=this;form&&name&&Object.defineProperty(form,name,{get:function(){return element}})}},{key:"setValidation",value:function(){if(this.getAttribute("required")){var input=document.createElement("input");input.setAttribute("required","required"),input.setAttribute("name",this.getAttribute("name")||this.id),input.style.visibility="hidden",input.style.position="absolute",this.appendChild(input)}}},{key:"open",value:function(){this.close(),this.menu.scrollTop=0,this.classList.add("visible"),this.mobile.classList.add("visible"),document.body.classList.add("mn-select-visible"),window.MnBackdrop.show(),this.focusOption()}},{key:"close",value:function(){var select=document.querySelector("mn-select.visible");select&&(select.classList.remove("visible"),select.filter=void 0,select.mobile.classList.remove("visible"),document.body.classList.remove("mn-select-visible"),window.MnBackdrop.hide())}},{key:"focusOption",value:function(){}},{key:"focusIn",value:function(option){if(!option.classList.contains("focus")){var lastFocus=this.querySelector(".mn-select-option.focus");lastFocus&&lastFocus.classList.remove("focus"),option&&option.classList.add("focus")}}},{key:"value",set:function(value){value="object"===(void 0===value?"undefined":_typeof(value))?JSON.stringify(value):value;var option=this.querySelector(".mn-select-option[value='"+value+"']"),input=this.querySelector("input");if(option){var viewValue=this.querySelector("div:not(.mn-select-option)");viewValue&&(viewValue.textContent=option.textContent),input&&(input.value=value),this.classList.add("has-value");var lastSelected=option.parentNode.querySelector(".mn-select-option[selected]");lastSelected&&lastSelected.removeAttribute("selected"),option.setAttribute("selected","selected")}else console.error("MN-SELECT OPTION_UNDEFINED\n        You're trying set a value ("+value+") to mn-select,\n        but there is no option with this value to be displayed");this.validate();var changeEvent=new CustomEvent("change",{value:value});this.dispatchEvent(changeEvent),this.setAttribute("value",value)},get:function(){var attrValue=void 0;try{attrValue=this.getAttribute("value")?JSON.parse(this.getAttribute("value")):this.getAttribute("value")}catch(e){attrValue=this.getAttribute("value")}return attrValue||void 0}},{key:"filter",set:function(value){function filterByRegex(search,value){return new RegExp(search.split("").join(".*"),"i").test(value)}if(value){this.classList.add("filtered"),this.filterString=value;Array.from(this.menu.querySelectorAll(".mn-select-option")).forEach(function(option){if(filterByRegex(value,option.textContent)){option.classList.remove("hidden");var strReg=value.split("").join(".*").replace(/(\w(?:\.\*)?)/g,"($1)"),reg=new RegExp(strReg,"i"),matches=option.textContent.match(reg);Array.from(option.querySelectorAll("span")).forEach(function(char,index){var matchIndex=index>=matches.index,matchValue=value.toLowerCase().search(char.textContent.toLowerCase())>=0;matchIndex&&matchValue?char.classList.add("filter-match"):char.classList.remove("filter-match")}),value.split("")}else option.classList.add("hidden")})}else{this.classList.remove("filtered"),this.filterString="";var hiddenOptions=Array.from(this.querySelectorAll(".mn-select-option.hidden")),chars=Array.from(this.querySelectorAll(".mn-select-option span.filter-match"));hiddenOptions.forEach(function(option){return option.classList.remove("hidden")}),chars.forEach(function(char){return char.classList.remove("filter-match")})}},get:function(){return this.filterString||void 0}}]),MnSelect}(window.MnInput);window.customElements.define("mn-select",MnSelect);
//# sourceMappingURL=mn-select.js.map
