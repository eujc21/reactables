webpackJsonp([1,11],{865:function(module,exports,__webpack_require__){"use strict";function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function mapStateToProps(state){return{paginationPage:state.components.paginationPage,paginationCount:state.components.paginationCount,isMobile:state.app.isMobile,inputText:state.components.inputText,outOf:state.components.outOf,completed:state.components.completed,tableData:state.components.tableData,isPanelVisible:state.components.isPanelVisible}}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__(1),_react2=_interopRequireDefault(_react),_reactRedux=__webpack_require__(96),_demo_actions=__webpack_require__(326),actions=_interopRequireWildcard(_demo_actions),_section=__webpack_require__(867),_section2=_interopRequireDefault(_section),_index=(__webpack_require__(19),__webpack_require__(66)),Components=function(_React$Component){function Components(){var _ref,_temp,_this,_ret;_classCallCheck(this,Components);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return _temp=_this=_possibleConstructorReturn(this,(_ref=Components.__proto__||Object.getPrototypeOf(Components)).call.apply(_ref,[this].concat(args))),_this.handleButtonClick=function(){},_this.handleInputChange=function(text){_this.props.updateInputText(text)},_this.handleInputSubmit=function(text){},_this.handleSelect=function(value){console.log(value)},_this.handleDropdownClick=function(){console.log("dropdown click")},_this.handleDateChange=function(date1,date2){console.log(date1,date2)},_this.handlePanelVisibility=function(shouldShow){_this.props.togglePanel(shouldShow)},_this.handleTextSelectorOption=function(text){console.log(text)},_this.handleTextSelection=function(text){console.log(text)},_this.handlePaginationClick=function(page){_this.props.updatePaginationPage(page)},_ret=_temp,_possibleConstructorReturn(_this,_ret)}return _inherits(Components,_React$Component),_createClass(Components,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var _this2=this,_props=this.props,paginationPage=_props.paginationPage,paginationCount=_props.paginationCount,inputText=_props.inputText,isMobile=_props.isMobile,styles={base:{position:"relative"},container:{display:"flex",justifyContent:"center",position:"relative"},navContainer:{position:"relative",order:1,padding:"60px 60px 0 0"},contentContainer:{display:"flex",flexDirection:"column",position:"relative",maxWidth:600,padding:"0 10px",order:2},componentContainer:{width:"100%"},nav:{base:{width:150},nav:{borderTop:null,borderLeft:null,borderRadius:0}},navlink:{base:{border:0,borderRadius:0},link:{padding:"5px 3px"}},tableContainer:{backgroundColor:"white",border:"1px solid #EBE9ED",borderRadius:2},hiddenPanel:{height:"inherit",width:"inherit",backgroundColor:"#ffffff",textAlign:"center"},dropdown:{base:{display:"flex",alignItems:"center",padding:5,borderRadius:3,backgroundColor:"rgb(154, 66, 74)",color:"white",boxShadow:null},text:{fontSize:14,margin:0,padding:0},icon:{fontSize:6,paddingLeft:4}},datePicker:{base:{width:"100%"},input:{base:{height:26,fontSize:14}}}};return _react2.default.createElement("div",{style:styles.base},_react2.default.createElement(_index.HiddenPanel,{position:"left",isVisible:this.props.isPanelVisible,onClickOutside:function(){return _this2.handlePanelVisibility(!1)},width:414,style:{panel:{height:"100vh"}}},_react2.default.createElement("div",{style:styles.hiddenPanel},_react2.default.createElement("h4",{style:{marginTop:0}},"Hidden Panel"))),_react2.default.createElement("div",{style:styles.container},isMobile?null:_react2.default.createElement("div",{style:styles.navContainer},_react2.default.createElement(_index.Nav,{offsetTop:70,style:styles.nav},_react2.default.createElement(_index.NavLink,{to:"#button",style:styles.navlink},"Button"),_react2.default.createElement(_index.NavLink,{to:"#input",style:styles.navlink},"Input"),_react2.default.createElement(_index.NavLink,{to:"#select",style:styles.navlink},"Select"),_react2.default.createElement(_index.NavLink,{to:"#dropdown",style:styles.navlink},"Dropdown"),_react2.default.createElement(_index.NavLink,{to:"#date-time-picker",style:styles.navlink},"Date Picker"),_react2.default.createElement(_index.NavLink,{to:"#table",style:styles.navlink},"Table"),_react2.default.createElement(_index.NavLink,{to:"#nav",style:styles.navlink},"Nav"),_react2.default.createElement(_index.NavLink,{to:"#navbar",style:styles.navlink},"Navbar"),_react2.default.createElement(_index.NavLink,{to:"#heat-bar",style:styles.navlink},"HeatBar"),_react2.default.createElement(_index.NavLink,{to:"#progress-bar",style:styles.navlink},"ProgressBar"),_react2.default.createElement(_index.NavLink,{to:"#pagination",style:styles.navlink},"Pagination"),_react2.default.createElement(_index.NavLink,{to:"#element-loader",style:styles.navlink},"ElementLoader"),_react2.default.createElement(_index.NavLink,{to:"#hidden-panel",style:styles.navlink},"HiddenPanel"),_react2.default.createElement(_index.NavLink,{to:"#code",style:styles.navlink},"Code"),_react2.default.createElement(_index.NavLink,{to:"#text_selector",style:styles.navlink},"Text Selector"),_react2.default.createElement(_index.NavLink,{to:"#text_highlighter",style:styles.navlink},"Text Highlighter"),_react2.default.createElement(_index.NavLink,{to:"#text_menu_option",style:styles.navlink},"Text Menu Option"))),_react2.default.createElement("div",{style:styles.contentContainer},_react2.default.createElement(_section2.default,{id:"button",name:"Button"},_react2.default.createElement("div",{style:styles.componentContainer},[0,1,2,3,4].map(function(num){return _react2.default.createElement(_index.Button,{key:num,onClick:_this2.handleButtonClick,style:{backgroundColor:"#"+(3+2*num)+"A424A",color:"#ffffff",marginRight:10,height:25}})})),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Button,{text:"button",isHoverable:!0,isDisabled:!1,onClick:this.handleButtonClick,style:{base:{}}}))),_react2.default.createElement(_section2.default,{id:"input",name:"Input"},_react2.default.createElement(_index.Input,{text:inputText,onChange:this.handleInputChange,onSubmit:this.handleInputSubmit,style:{base:{width:"100%"}}}),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Input,{placeholder:"Search...",text:"String",onChange:this.handleInputChange,onSubmit:this.handleInputSubmit,style:{base:{},input:{},submitIcon:{},clearIcon:{}}}))),_react2.default.createElement(_section2.default,{id:"select",name:"Select"},_react2.default.createElement(_index.Select,{onChange:this.handleSelect},_react2.default.createElement(_index.SelectOption,{text:"Option 1",value:"option_1"}),_react2.default.createElement(_index.SelectOption,{text:"Option 2",value:"option_2"}),_react2.default.createElement(_index.SelectOption,{text:"Option 3",value:"option_3"})),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Select,{onChange:this.handleSelect}))),_react2.default.createElement(_section2.default,{id:"dropdown",name:"Dropdown"},_react2.default.createElement("div",{style:styles.componentContainer},_react2.default.createElement(_index.Dropdown,{node:_react2.default.createElement("span",{style:styles.dropdown.base},_react2.default.createElement("p",{style:styles.dropdown.text},"Dropdown"),_react2.default.createElement("i",{style:styles.dropdown.icon,className:"icon-arrow-down"}))},_react2.default.createElement(_index.DropdownOption,{text:"Option 1",onClick:this.handleDropdownClick}),_react2.default.createElement(_index.DropdownOption,{text:"Option 2",onClick:this.handleDropdownClick}),_react2.default.createElement(_index.DropdownOption,{text:"Option 3",onClick:this.handleDropdownClick}))),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Dropdown,{node:"Node"}))),_react2.default.createElement(_section2.default,{id:"date-time-picker",name:"DateTimePicker"},_react2.default.createElement(_index.DateTimePicker,{canClear:!0,placeholder:"Date Time",onChange:this.handleDateChange,style:styles.datePicker}),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.DateTimePicker,null))),_react2.default.createElement(_section2.default,{id:"table",name:"Table"},_react2.default.createElement("div",{style:styles.tableContainer},_react2.default.createElement(_index.Table,{isHoverable:!0,isStriped:!0,tableData:this.props.tableData})),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Table,{tableData:this.props.tableData}))),_react2.default.createElement(_section2.default,{id:"nav",name:"Nav"},_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Nav,null,_react2.default.createElement(_index.NavLink,{to:"/url"},"Link")))),_react2.default.createElement(_section2.default,{id:"navbar",name:"Navbar"},_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Navbar,null))),_react2.default.createElement(_section2.default,{id:"heat-bar",name:"HeatBar"},_react2.default.createElement(_index.HeatBar,{score:10,outOf:100}),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.HeatBar,{score:10,outOf:100}))),_react2.default.createElement(_section2.default,{id:"progress-bar",name:"ProgressBar"},_react2.default.createElement(_index.ProgressBar,{showUnits:!0,completed:this.props.completed,outOf:this.props.outOf}),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.ProgressBar,{completed:4,outOf:100,showUnits:!0,units:"percent",style:{base:{},units:{},bar:{},completed:{}}}))),_react2.default.createElement(_section2.default,{id:"pagination",name:"Pagination"},_react2.default.createElement(_index.Pagination,{page:paginationPage,pageCount:paginationCount,pageSkip:3,showFirst:!0,showLast:!0,showEllipses:!0,maintainSkipWidth:!0,onClick:this.handlePaginationClick}),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Pagination,{page:paginationPage,pageCount:paginationCount,pageSkip:3,showFirst:!0,showLast:!0,showEllipses:!0,maintainSkipWidth:!0,firstText:"First",lastText:"Last",nextText:"Next",prevText:"Prev",onClick:function(){},styles:{ul:{},pageControl:{base:{},disabled:{}},pageNumber:{},selected:{},ellipses:{}}}))),_react2.default.createElement(_section2.default,{id:"element-loader",name:"ElementLoader"},_react2.default.createElement("div",{style:styles.componentContainer},_react2.default.createElement(_index.ElementLoader,{action:"DEMO_CALL"},_react2.default.createElement("div",{style:{border:"1px solid black",width:100,backgroundColor:"grey",textAlign:"center",padding:"20px 0"}},_react2.default.createElement("p",null,"Wrapped Content")))),_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.ElementLoader,{spinner:'<span className="optional-custom-spinner" />',action:"DEMO_CALL"},_react2.default.createElement("div",null,"Wrapped Content")))),_react2.default.createElement(_section2.default,{id:"hidden-panel",name:"HiddenPanel"},_react2.default.createElement("div",{style:styles.componentContainer},_react2.default.createElement(_index.Button,{text:"Show Panel",onClick:function(){return _this2.handlePanelVisibility(!0)},style:{backgroundColor:"rgb(58, 66, 74)",color:"white",height:25}})),_react2.default.createElement(_index.Code,{type:"JSX"},_react2.default.createElement(_index.HiddenPanel,null))),_react2.default.createElement(_section2.default,{id:"code",name:"Code"},_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement(_index.Code,{type:"jsx"},_react2.default.createElement("p",null,"Display properly formatted code")))),_react2.default.createElement(_section2.default,{id:"text_selector",name:"Text Selector"},_react2.default.createElement(_index.TextSelector,{onSelect:this.handleTextSelection,textMenuOptions:[_react2.default.createElement(_index.TextMenuOption,{onClick:this.handleTextSelectorOption},"Option 1"),_react2.default.createElement(_index.TextMenuOption,{onClick:this.handleTextSelectorOption},"Option 2"),_react2.default.createElement(_index.TextMenuOption,{onClick:this.handleTextSelectorOption},"Option 3")]},"Lorem ipsum dolor sit amet, arcu lobortis massa adipiscing tortor dui, porta dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat."),_react2.default.createElement(_index.Code,null,_react2.default.createElement(_index.TextSelector,{textMenuOptions:["<TextMenuOption>Option</TextMenuOption>"]}))),_react2.default.createElement(_section2.default,{id:"text_highlighter",name:"Text Highlighter"},_react2.default.createElement(_index.TextHighlighter,{delimiter:"#!#",dataId:!0,text:"Lorem ipsum dolor sit amet, arcu #!#123#!#lobortis#!# massa adipiscing tortor dui, #!#567#!#porta#!# dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat.",textMenuOptions:[_react2.default.createElement(_index.TextMenuOption,{onClick:this.handleTextSelectorOption},"Option 1")]}),_react2.default.createElement(_index.Code,null,_react2.default.createElement(_index.TextHighlighter,{textMenuOptions:["<TextMenuOption>Option</TextMenuOption>"]}))),_react2.default.createElement(_section2.default,{id:"text_menu_option",name:"Text Menu Option"},_react2.default.createElement("div",{style:{backgroundColor:"black",color:"white",borderRadius:3,fontSize:12}},_react2.default.createElement(_index.TextMenuOption,{onClick:function(){}},"Option")),_react2.default.createElement(_index.Code,null,_react2.default.createElement(_index.TextMenuOption,{onClick:function(){}},"Option"))))))}}]),Components}(_react2.default.Component);exports.default=(0,_reactRedux.connect)(mapStateToProps,{updatePaginationPage:actions.updatePaginationPage,updateInputText:actions.updateInputText,demoCall:actions.demoCall,incrementCompleted:actions.incrementCompleted,togglePanel:actions.togglePanel})(Components)},867:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _react=__webpack_require__(1),_react2=_interopRequireDefault(_react),Section=function(_ref){var id=_ref.id,name=_ref.name,children=_ref.children,styles={base:{display:"flex",flexWrap:"wrap",maxWidth:500,margin:"60px 0"},heading:{width:"100%",marginTop:0,paddingTop:0},span:{marginTop:"-130px",paddingBottom:"130px",display:"block"}};return _react2.default.createElement("div",{style:styles.base},_react2.default.createElement("h2",{style:styles.heading},_react2.default.createElement("span",{style:styles.span,id:id}),name),children)};Section.propTypes={name:_react2.default.PropTypes.string.isRequired},exports.default=Section}});