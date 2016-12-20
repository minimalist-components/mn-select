"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),MnSelect=function(_HTMLElement){function MnSelect(self){var _this,_ret;return _classCallCheck(this,MnSelect),self=_this=_possibleConstructorReturn(this,(MnSelect.__proto__||Object.getPrototypeOf(MnSelect)).call(this,self)),_this.setOpenEvents(),_this.setCloseEvents(),_this.setMenu(),_this.setSelected(),_this.setOptionEvents(),_ret=self,_possibleConstructorReturn(_this,_ret)}return _inherits(MnSelect,_HTMLElement),_createClass(MnSelect,[{key:"setSelected",value:function(){var selected=document.createElement("div"),selectedOption=this.querySelector("option[selected]")||this.querySelector("option");selected.textContent=selectedOption.textContent,this.insertBefore(selected,this.firstChild)}},{key:"setMenu",value:function(){var menu=document.createElement("menu");menu.classList.add("mn-card"),Array.from(this.children).forEach(function(child){return menu.appendChild(child)}),this.insertBefore(menu,this.firstChild)}},{key:"setOpenEvents",value:function(){var open=this.open;this.addEventListener("click",open)}},{key:"setOptionEvents",value:function(){var _this2=this,options=this.querySelectorAll("option");Array.from(options).forEach(function(option){return option.addEventListener("click",function(event){var value=event.target.value;_this2.selectOption(value),_this2.close()})})}},{key:"setCloseEvents",value:function(){var _this3=this;document.body.addEventListener("click",this.close),document.addEventListener("keyup",function(){var esc=27===event.keyCode,isOpened=document.body.classList.contains("mn-select-visible");esc&&isOpened&&_this3.close()})}},{key:"selectOption",value:function(value){console.log(value)}},{key:"open",value:function(){this.classList.add("visible"),document.body.classList.add("mn-select-visible")}},{key:"close",value:function(event){var select=document.querySelector("mn-select.visible");if(event&&select){event.stopPropagation();var clickOutside="BODY"===event.target.tagName;clickOutside&&select&&(document.body.classList.remove("mn-select-visible"),select.classList.remove("visible"))}else select&&(document.body.classList.remove("mn-select-visible"),select.classList.remove("visible"))}}]),MnSelect}(HTMLElement);customElements.define("mn-select",MnSelect);
//# sourceMappingURL=mn-select.js.map
