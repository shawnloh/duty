(this.webpackJsonpfrontend_duty=this.webpackJsonpfrontend_duty||[]).push([[6],{280:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(25),s=t(20),c=t(1),o=t.n(c),i=t(2),u=t.n(i),m=t(15),d=t.n(m),p=t(6),g={children:u.a.node,inline:u.a.bool,tag:p.n,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},E=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(r.a)(t)),t.submit=t.submit.bind(Object(r.a)(t)),t}Object(s.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.submit=function(){this.ref&&this.ref.submit()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,r=e.inline,s=e.tag,c=e.innerRef,i=Object(l.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(p.j)(d()(a,!!r&&"form-inline"),t);return o.a.createElement(s,Object(n.a)({},i,{ref:c,className:u}))},a}(c.Component);E.propTypes=g,E.defaultProps={tag:"form"},a.a=E},282:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={tag:m.n,inverse:o.a.bool,color:o.a.string,body:o.a.bool,outline:o.a.bool,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},p=function(e){var a=e.className,t=e.cssModule,r=e.color,c=e.body,o=e.inverse,i=e.outline,d=e.tag,p=e.innerRef,g=Object(l.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),E=Object(m.j)(u()(a,"card",!!o&&"text-white",!!c&&"card-body",!!r&&(i?"border":"bg")+"-"+r),t);return s.a.createElement(d,Object(n.a)({},g,{className:E,ref:p}))};p.propTypes=d,p.defaultProps={tag:"div"},a.a=p},297:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={children:o.a.node,className:o.a.string,listClassName:o.a.string,cssModule:o.a.object,size:o.a.string,tag:m.n,listTag:m.n,"aria-label":o.a.string},p=function(e){var a,t=e.className,r=e.listClassName,c=e.cssModule,o=e.size,i=e.tag,d=e.listTag,p=e["aria-label"],g=Object(l.a)(e,["className","listClassName","cssModule","size","tag","listTag","aria-label"]),E=Object(m.j)(u()(t),c),b=Object(m.j)(u()(r,"pagination",((a={})["pagination-"+o]=!!o,a)),c);return s.a.createElement(i,{className:E,"aria-label":p},s.a.createElement(d,Object(n.a)({},g,{className:b})))};p.propTypes=d,p.defaultProps={tag:"nav",listTag:"ul","aria-label":"pagination"},a.a=p},298:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={active:o.a.bool,children:o.a.node,className:o.a.string,cssModule:o.a.object,disabled:o.a.bool,tag:m.n},p=function(e){var a=e.active,t=e.className,r=e.cssModule,c=e.disabled,o=e.tag,i=Object(l.a)(e,["active","className","cssModule","disabled","tag"]),d=Object(m.j)(u()(t,"page-item",{active:a,disabled:c}),r);return s.a.createElement(o,Object(n.a)({},i,{className:d}))};p.propTypes=d,p.defaultProps={tag:"li"},a.a=p},299:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={"aria-label":o.a.string,children:o.a.node,className:o.a.string,cssModule:o.a.object,next:o.a.bool,previous:o.a.bool,first:o.a.bool,last:o.a.bool,tag:m.n},p=function(e){var a,t=e.className,r=e.cssModule,c=e.next,o=e.previous,i=e.first,d=e.last,p=e.tag,g=Object(l.a)(e,["className","cssModule","next","previous","first","last","tag"]),E=Object(m.j)(u()(t,"page-link"),r);o?a="Previous":c?a="Next":i?a="First":d&&(a="Last");var b,f=e["aria-label"]||a;o?b="\u2039":c?b="\u203a":i?b="\xab":d&&(b="\xbb");var h=e.children;return h&&Array.isArray(h)&&0===h.length&&(h=null),g.href||"a"!==p||(p="button"),(o||c||i||d)&&(h=[s.a.createElement("span",{"aria-hidden":"true",key:"caret"},h||b),s.a.createElement("span",{className:"sr-only",key:"sr"},f)]),s.a.createElement(p,Object(n.a)({},g,{className:E,"aria-label":f}),h)};p.propTypes=d,p.defaultProps={tag:"a"},a.a=p},300:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={tag:m.n,listTag:m.n,className:o.a.string,listClassName:o.a.string,cssModule:o.a.object,children:o.a.node,"aria-label":o.a.string},p=function(e){var a=e.className,t=e.listClassName,r=e.cssModule,c=e.children,o=e.tag,i=e.listTag,d=e["aria-label"],p=Object(l.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),g=Object(m.j)(u()(a),r),E=Object(m.j)(u()("breadcrumb",t),r);return s.a.createElement(o,Object(n.a)({},p,{className:g,"aria-label":d}),s.a.createElement(i,{className:E},c))};p.propTypes=d,p.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=p},301:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={tag:m.n,active:o.a.bool,className:o.a.string,cssModule:o.a.object},p=function(e){var a=e.className,t=e.cssModule,r=e.active,c=e.tag,o=Object(l.a)(e,["className","cssModule","active","tag"]),i=Object(m.j)(u()(a,!!r&&"active","breadcrumb-item"),t);return s.a.createElement(c,Object(n.a)({},o,{className:i,"aria-current":r?"page":void 0}))};p.propTypes=d,p.defaultProps={tag:"li"},a.a=p},302:function(e,a,t){"use strict";var n=t(5),l=t(9),r=t(1),s=t.n(r),c=t(2),o=t.n(c),i=t(15),u=t.n(i),m=t(6),d={children:o.a.node,inline:o.a.bool,tag:m.n,color:o.a.string,className:o.a.string,cssModule:o.a.object},p=function(e){var a=e.className,t=e.cssModule,r=e.inline,c=e.color,o=e.tag,i=Object(l.a)(e,["className","cssModule","inline","color","tag"]),d=Object(m.j)(u()(a,!r&&"form-text",!!c&&"text-"+c),t);return s.a.createElement(o,Object(n.a)({},i,{className:d}))};p.propTypes=d,p.defaultProps={tag:"small",color:"muted"},a.a=p},308:function(e,a,t){"use strict";t.r(a);var n=t(21),l=t(22),r=t(49),s=t(48),c=t(50),o=t(1),i=t.n(o),u=t(53),m=t(96),d=t(272),p=t(307),g=t(271),E=t(273),b=t(274),f=t(130),h=t(278),v=t.n(h),j=t(43),N=t(41),y=t(303),O=function(e){var a=e.personnels,t=e.onDelete;return i.a.createElement(y.a,{striped:!0,responsive:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center",style:{width:"50%"}},"Name"),i.a.createElement("th",{className:"text-center"},"Actions"))),i.a.createElement("tbody",null,a.map((function(e){var a=e.rank.name,n=e.platoon.name,l=e.name,r=e._id;return i.a.createElement("tr",{key:e._id},i.a.createElement("td",{className:"text-center"},"".concat(n," ").concat(a," ").concat(l)),i.a.createElement("td",{className:"text-center"},i.a.createElement(f.a,{color:"primary",tag:N.b,to:"/personnels/".concat(r)},"Edit")," ",i.a.createElement(f.a,{color:"danger",onClick:function(){return t(r)}},"Delete")))}))))},k=t(297),D=t(298),P=t(299),M=function(e){var a=e.rowsPerPage,t=e.totalPosts,n=e.currentPage,l=e.setPage,r=Object(o.useMemo)((function(){for(var e=[],n=1;n<=Math.ceil(t/a);n+=1)e.push(n);return e}),[t,a]);return 0===r.length?null:i.a.createElement(k.a,{"aria-label":"Personnel navigation"},i.a.createElement(D.a,{disabled:1===n},i.a.createElement(P.a,{first:!0,onClick:function(){return l(1)}})),i.a.createElement(D.a,{disabled:1===n},i.a.createElement(P.a,{previous:!0,onClick:function(){return l(n-1)}})),r.map((function(e){return i.a.createElement(D.a,{active:n===e,key:e},i.a.createElement(P.a,{onClick:function(){return l(e)}},e))})),i.a.createElement(D.a,{disabled:n===r[r.length-1]},i.a.createElement(P.a,{next:!0,onClick:function(){return l(n+1)}})),i.a.createElement(D.a,{disabled:n===r[r.length-1]},i.a.createElement(P.a,{last:!0,onClick:function(){return l(r[r.length-1])}})))},C=t(5),I=t(9),T=t(2),S=t.n(T),x=t(15),w=t.n(x),A=t(6),R={tag:A.n,size:S.a.string,className:S.a.string,cssModule:S.a.object},Y=function(e){var a=e.className,t=e.cssModule,n=e.tag,l=e.size,r=Object(I.a)(e,["className","cssModule","tag","size"]),s=Object(A.j)(w()(a,"input-group",l?"input-group-"+l:null),t);return i.a.createElement(n,Object(C.a)({},r,{className:s}))};Y.propTypes=R,Y.defaultProps={tag:"div"};var B=Y,z=t(286),F={tag:A.n,className:S.a.string,cssModule:S.a.object},_=function(e){var a=e.className,t=e.cssModule,n=e.tag,l=Object(I.a)(e,["className","cssModule","tag"]),r=Object(A.j)(w()(a,"input-group-text"),t);return i.a.createElement(n,Object(C.a)({},l,{className:r}))};_.propTypes=F,_.defaultProps={tag:"span"};var L=_,J={tag:A.n,addonType:S.a.oneOf(["prepend","append"]).isRequired,children:S.a.node,className:S.a.string,cssModule:S.a.object},V=function(e){var a=e.className,t=e.cssModule,n=e.tag,l=e.addonType,r=e.children,s=Object(I.a)(e,["className","cssModule","tag","addonType","children"]),c=Object(A.j)(w()(a,"input-group-"+l),t);return"string"===typeof r?i.a.createElement(n,Object(C.a)({},s,{className:c}),i.a.createElement(L,{children:r})):i.a.createElement(n,Object(C.a)({},s,{className:c,children:r}))};V.propTypes=J,V.defaultProps={tag:"div"};var q=V,H=function(e){var a=e.search,t=e.onChange,n=e.onClear;return i.a.createElement(B,null,i.a.createElement(z.a,{placeholder:"search...",value:a,onChange:t}),""!==a&&i.a.createElement(q,{addonType:"append"},i.a.createElement(f.a,{color:"primary",onClick:n},"Clear")))},G=t(317),K=t(304),Q=t(305),U=t(306),W=function(e){var a=e.onCancel,t=e.onDelete,n=e.onToggle,l=e.showModal,r=e.person;return i.a.createElement(G.a,{isOpen:l,toggle:function(){return n()}},i.a.createElement(K.a,{toggle:function(){return n()}},"Action is irreversible!"),i.a.createElement(Q.a,null,i.a.createElement("p",null,"Are you sure you want to delete ",r.name,"?")),i.a.createElement(U.a,null,i.a.createElement(f.a,{color:"danger",onClick:t},"Delete"),i.a.createElement(f.a,{color:"secondary",onClick:function(){return a()}},"Cancel")))},X=t(58),Z=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(s.a)(a).call(this,e))).showErrors=function(){var e=t.props.errors;return i.a.createElement(d.a,null,e.map((function(e){return i.a.createElement(p.a,{key:e,color:"danger",className:"w-100"},e)})))},t.onChangeSearch=function(e){t.setState({search:e.target.value,page:1})},t.setPage=function(e){t.setState({page:e})},t.clearSearch=function(){t.setState({search:""})},t.getPersonnels=function(){var e=t.props,a=e.ids,n=e.personnels,l=t.state,r=l.rowsPerPage,s=l.page,c=l.search,o=s*r,i=o-r;if(""===c)return{shownPersonnels:a.slice(i,o).map((function(e){return n[e]})),ids:a};var u=a.filter((function(e){var a=n[e].name.toLowerCase(),t=n[e].platoon.name.toLowerCase(),l=n[e].rank.name.toLowerCase(),r=c.toLowerCase();return a.indexOf(r)>-1||t.indexOf(r)>-1||l.indexOf(r)>-1}));return{shownPersonnels:u.slice(i,o).map((function(e){return n[e]})),ids:u}},t.toggleDeleteModal=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t.setState((function(a){return{showDeleteModal:!a.showDeleteModal,selectedId:e}}))},t.handleDelete=function(){var e=t.state.selectedId;(0,t.props.removePersonnel)(e),t.toggleDeleteModal()},t.getDeleteModal=function(){var e=t.state,a=e.selectedId,n=e.showDeleteModal,l=t.props.personnels;return a?i.a.createElement(W,{onCancel:t.toggleDeleteModal,onDelete:t.handleDelete,onToggle:t.toggleDeleteModal,showModal:n,person:l[a]}):null},t.state={rowsPerPage:10,page:1,search:"",selectedId:null,showDeleteModal:!1},t}return Object(c.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this.props,a=e.errors,t=e.actionInProgress,n=e.match.path,l=this.state,r=l.rowsPerPage,s=l.page,c=l.search,o=this.getPersonnels(),u=o.shownPersonnels,m=o.ids,h=this.getDeleteModal();return i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a,null,i.a.createElement("title",null,"Personnels"),"P"),i.a.createElement(g.a,null,h,a.length>0&&this.showErrors(),t&&i.a.createElement(d.a,null,i.a.createElement(p.a,{color:"primary",className:"w-100"},"Action in progress ",i.a.createElement(E.a,{color:"primary",size:"sm"}))),i.a.createElement(d.a,{className:"my-2 justify-content-center align-items-center"},i.a.createElement(b.a,{xs:"9"},i.a.createElement("h1",null,"Personnels")),i.a.createElement(b.a,{xs:"3",className:"d-flex justify-content-end"},i.a.createElement(f.a,{tag:N.b,to:"".concat(n,"/add"),color:"success",size:"md"},"Add"))),i.a.createElement(d.a,{className:"my-2 mx-1"},i.a.createElement(H,{onChange:this.onChangeSearch,onClear:this.clearSearch,search:c})),i.a.createElement(d.a,null,i.a.createElement(O,{personnels:u,onDelete:this.toggleDeleteModal})),i.a.createElement(d.a,{className:"justify-content-center align-items-center"},i.a.createElement(M,{rowsPerPage:r,currentPage:s,setPage:this.setPage,totalPosts:m.length}))))}}]),a}(o.PureComponent),$={removePersonnel:X.a},ee=Object(j.b)((function(e){return{ids:e.personnels.get("ids"),personnels:e.personnels.get("personnels"),errors:e.pages.personnels.all.get("errors"),actionInProgress:e.pages.personnels.all.get("actionInProgress")}}),$)(Z),ae=t(98),te=t(300),ne=t(301),le=t(59),re=t(280),se=t(284),ce=t(285),oe=function(e){var a=e.handleSubmit,t=e.handleChange,n=e.rank,l=e.ranks,r=e.rankIds,s=e.platoon,c=e.platoons,o=e.platoonIds,u=e.name,m=e.disabled,d=void 0!==m&&m;return i.a.createElement(re.a,{onSubmit:a},i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"nameInput"},"Name"),i.a.createElement(z.a,{type:"text",name:"name",id:"nameInput",placeholder:"John",invalid:""===u,valid:""!==u,value:u,onChange:t})),i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"rankSelect"},"Rank"),i.a.createElement(z.a,{type:"select",name:"rank",id:"rankSelect",onChange:t,value:n},r.map((function(e){return i.a.createElement("option",{value:e,key:e},l[e].name)})))),i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"platoonSelect"},"Platoon"),i.a.createElement(z.a,{type:"select",name:"platoon",id:"platoonSelect",onChange:t,value:s},o.map((function(e){return i.a.createElement("option",{value:e,key:e},c[e].name)})))),i.a.createElement(f.a,{color:"success",className:"w-100",disabled:d},"Submit"))},ie=function(e){var a=e.name;return i.a.createElement(p.a,{color:"primary",className:"w-100"},a," in progress ",i.a.createElement(E.a,{color:"primary",size:"sm"}))},ue=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(s.a)(a).call(this,e))).showErrors=function(){var e=t.props.errors;return i.a.createElement(d.a,{className:"my-2 flex-column"},i.a.createElement(b.a,null,i.a.createElement(p.a,{color:"danger",className:"w-100"},e.map((function(e){return i.a.createElement("p",{key:e},e)})))))},t.handleChange=function(e){var a=e.target,n=a.name,l=a.value;t.setState(Object(ae.a)({},n,l))},t.checkDisabledSubmit=function(){var e=t.state,a=e.rank,n=e.platoon,l=e.name,r=t.props.actionInProgress;return""===l||(!a||!n||!!r)},t.handleSubmit=function(e){e.preventDefault();var a=t.state,n=a.name,l=a.platoon,r=a.rank;(0,t.props.createPersonnel)(n,l,r)},t.state={name:"",rank:"",platoon:""},t}return Object(c.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,a=e.rankIds,t=e.platoonIds;this.setState({rank:a[0],platoon:t[0]})}},{key:"render",value:function(){var e=this.props,a=e.rankIds,t=e.ranks,n=e.platoonIds,l=e.platoons,r=e.actionInProgress,s=e.errors,c=e.success,o=this.state,u=o.name,m=o.rank,E=o.platoon,f=null;return 0!==a.length&&0!==n.length||(f=i.a.createElement(p.a,{color:"danger"},i.a.createElement(N.b,{to:"/ranks"},"Rank")," / ",i.a.createElement(N.b,{to:"/platoons"},"Platoon")," is needed to create personnels")),i.a.createElement(i.a.Fragment,null,i.a.createElement(h.Helmet,null,i.a.createElement("title",null,"Add Personnel")),i.a.createElement(g.a,null,i.a.createElement(d.a,{className:"my-2 justify-content-center align-items-center"},i.a.createElement(b.a,null,i.a.createElement(te.a,{tag:"nav",listTag:"div"},i.a.createElement(ne.a,{tag:N.b,to:"/personnels"},"Personnels"),i.a.createElement(ne.a,{active:!0,tag:"span"},"Add")))),f&&i.a.createElement(d.a,{className:"my-2"},i.a.createElement(b.a,null,f)),s.length>0&&this.showErrors(),r&&i.a.createElement(d.a,{className:"my-2"},i.a.createElement(b.a,null,i.a.createElement(ie,{name:"Adding"}))),c&&i.a.createElement(d.a,{className:"my-2"},i.a.createElement(b.a,null,i.a.createElement(p.a,{color:"success",className:"w-100"},"Successfully added personnel ",u))),i.a.createElement(d.a,null,i.a.createElement(b.a,null,i.a.createElement(oe,{handleChange:this.handleChange,handleSubmit:this.handleSubmit,name:u,platoon:E,platoonIds:n,platoons:l,rank:m,rankIds:a,ranks:t,disabled:this.checkDisabledSubmit()})))))}}],[{key:"getDerivedStateFromProps",value:function(e,a){var t=e.rankIds,n=e.platoonIds;return e.success?{name:"",rank:t[0],platoon:n[0]}:a}}]),a}(o.PureComponent),me={createPersonnel:le.a},de=Object(j.b)((function(e){return{rankIds:e.ranks.get("ids"),ranks:e.ranks.get("ranks"),platoonIds:e.platoons.get("ids"),platoons:e.platoons.get("platoons"),errors:e.pages.personnels.add.get("errors"),actionInProgress:e.pages.personnels.add.get("actionInProgress"),success:e.pages.personnels.add.get("success")}}),me)(ue),pe=t(20),ge=t(100),Ee=i.a.createContext({}),be={tag:A.n,activeTab:S.a.any,className:S.a.string,cssModule:S.a.object},fe=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={activeTab:t.props.activeTab},t}return Object(pe.a)(a,e),a.getDerivedStateFromProps=function(e,a){return a.activeTab!==e.activeTab?{activeTab:e.activeTab}:null},a.prototype.render=function(){var e=this.props,a=e.className,t=e.cssModule,n=e.tag,l=Object(A.k)(this.props,Object.keys(be)),r=Object(A.j)(w()("tab-content",a),t);return i.a.createElement(Ee.Provider,{value:{activeTabId:this.state.activeTab}},i.a.createElement(n,Object(C.a)({},l,{className:r})))},a}(o.Component);Object(ge.polyfill)(fe);var he=fe;fe.propTypes=be,fe.defaultProps={tag:"div"};var ve={tag:A.n,className:S.a.string,cssModule:S.a.object,tabId:S.a.any};function je(e){var a=e.className,t=e.cssModule,n=e.tabId,l=e.tag,r=Object(I.a)(e,["className","cssModule","tabId","tag"]),s=function(e){return Object(A.j)(w()("tab-pane",a,{active:n===e}),t)};return i.a.createElement(Ee.Consumer,null,(function(e){var a=e.activeTabId;return i.a.createElement(l,Object(C.a)({},r,{className:s(a)}))}))}je.propTypes=ve,je.defaultProps={tag:"div"};var Ne=t(32),ye=function(e){var a=e.name,t=e.rank,n=e.platoon,l=e.eventsDate;return i.a.createElement(i.a.Fragment,null,i.a.createElement(y.a,{striped:!0,responsive:!0},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center"},"Name:"),i.a.createElement("td",{className:"text-center"},a)),i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center"},"Rank:"),i.a.createElement("td",{className:"text-center"},t.name)),i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center"},"Platoon:"),i.a.createElement("td",{className:"text-center"},n.name)))),i.a.createElement(y.a,{striped:!0,responsive:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Event Dates:"))),i.a.createElement("tbody",null,l.map((function(e){return i.a.createElement("tr",{key:e},i.a.createElement("td",{className:"text-center"},e))})))))};ye.defaultProps={eventsDate:[]};var Oe=ye,ke=t(267),De=t(268),Pe=t(269),Me=function(e){var a=e.setTab,t=e.activeTab;return i.a.createElement(ke.a,{tabs:!0},i.a.createElement(De.a,null,i.a.createElement(Pe.a,{className:"1"===t?"active":"",onClick:function(){a("1")}},"Info")),i.a.createElement(De.a,null,i.a.createElement(Pe.a,{className:"2"===t?"active":"",onClick:function(){a("2")}},"Status")),i.a.createElement(De.a,null,i.a.createElement(Pe.a,{className:"3"===t?"active":"",onClick:function(){a("3")}},"Blockout dates")))},Ce=t(97),Ie={_id:null,name:null,startDate:null,endDate:null},Te=function(e){var a=e.statuses,t=e.onDelete,n=Object(o.useState)(!1),l=Object(Ce.a)(n,2),r=l[0],s=l[1],c=Object(o.useState)(Ie),u=Object(Ce.a)(c,2),m=u[0],p=u[1],g=function(){r&&p(Ie),s(!r)},E=i.a.createElement(G.a,{isOpen:r,toggle:g},i.a.createElement(K.a,{toggle:g},"Confirm delete ",m.name),i.a.createElement(Q.a,null,"Deleting ",m.name,", ",m.startDate," - ",m.endDate,".",i.a.createElement("br",null),i.a.createElement("b",null,"Action is irreversible!")),i.a.createElement(U.a,null,i.a.createElement(f.a,{color:"danger",onClick:function(){t(m._id),g()}},"Confirm Delete")," ",i.a.createElement(f.a,{color:"secondary",onClick:g},"Cancel")));return i.a.createElement(i.a.Fragment,null,E,i.a.createElement(d.a,null,i.a.createElement(b.a,null,i.a.createElement(y.a,{striped:!0,responsive:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Status"),i.a.createElement("th",null,"Start date"),i.a.createElement("th",null,"End date"),i.a.createElement("th",null,"Actions"))),i.a.createElement("tbody",null,a.map((function(e){return i.a.createElement("tr",{key:e._id},i.a.createElement("th",null,e.statusId.name),i.a.createElement("td",null,e.startDate),i.a.createElement("td",null,e.endDate),i.a.createElement("td",null,i.a.createElement(f.a,{color:"danger",onClick:function(){p({_id:e._id,name:e.statusId.name,startDate:e.startDate,endDate:e.endDate}),g()}},"Delete")))})))))))},Se=t(266),xe=t(282),we={tag:A.n,className:S.a.string,cssModule:S.a.object,innerRef:S.a.oneOfType([S.a.object,S.a.string,S.a.func])},Ae=function(e){var a=e.className,t=e.cssModule,n=e.innerRef,l=e.tag,r=Object(I.a)(e,["className","cssModule","innerRef","tag"]),s=Object(A.j)(w()(a,"card-body"),t);return i.a.createElement(l,Object(C.a)({},r,{className:s,ref:n}))};Ae.propTypes=we,Ae.defaultProps={tag:"div"};var Re=Ae,Ye=t(302),Be=t(67),ze=t.n(Be),Fe=function(e){return ze()(e,"DDMMYY",!0).isValid()||"permanent"===e.toLowerCase()},_e=function(e){var a=e.handleAdd,t=e.statuses,n=e.statusIds,l=ze()().tz("Asia/Singapore").format("DDMMYY"),r=Object(o.useState)(!1),s=Object(Ce.a)(r,2),c=s[0],u=s[1],m=Object(o.useState)(n[0]||""),p=Object(Ce.a)(m,2),g=p[0],E=p[1],b=Object(o.useState)(l),h=Object(Ce.a)(b,2),v=h[0],j=h[1],N=Object(o.useState)(l),y=Object(Ce.a)(N,2),O=y[0],k=y[1],D=function(){u(!c),E(n[0]||""),j(l),k(l)};return i.a.createElement(i.a.Fragment,null,i.a.createElement(d.a,{className:"flex-column justify-content-end align-items-end my-2 mx-2"},i.a.createElement(f.a,{className:"my-2",color:"primary",onClick:D},"Add Status"),i.a.createElement(Se.a,{isOpen:c,className:"w-100"},i.a.createElement(xe.a,null,i.a.createElement(Re,null,i.a.createElement(re.a,null,i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"statusSelect"},"Status"),i.a.createElement(z.a,{type:"select",value:g,name:"select",id:"statusSelect",onChange:function(e){return E(e.target.value)}},n.map((function(e){return i.a.createElement("option",{value:e,key:e},t[e].name)})))),i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"startDateInput"},"Start date"),i.a.createElement(z.a,{type:"text",value:v,name:"startDate",id:"startDateInput",invalid:!Fe(v),onChange:function(e){return j(e.target.value)}})),i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"endDateInput"},"End date"),i.a.createElement(z.a,{type:"text",value:O,name:"endDate",id:"endDateInput",invalid:!Fe(O),onChange:function(e){return k(e.target.value)}}),i.a.createElement(Ye.a,{color:"muted"},"Dates must be in DDMMYY format, it will be automatically be converted to DD-MM-YYYY"),i.a.createElement(Ye.a,{color:"muted"},"If permanent, please indicate permanent in end date")),i.a.createElement(f.a,{color:"success",className:"w-100",onClick:function(e){e&&e.preventDefault(),a({statusId:g,startDate:v,endDate:O}),D()},disabled:!Fe(v)||!Fe(O)||""===g},"Add")))))))},Le=function(e){return ze()(e,"DDMMYY",!0).isValid()},Je=function(e){var a=e.handleAdd,t=Object(o.useState)(!1),n=Object(Ce.a)(t,2),l=n[0],r=n[1],s=Object(o.useState)(""),c=Object(Ce.a)(s,2),u=c[0],m=c[1],p=function(){r(!l),m("")},g=function(e){e&&e.preventDefault(),a(u),p()};return i.a.createElement(i.a.Fragment,null,i.a.createElement(d.a,{className:"flex-column justify-content-end align-items-end my-2 mx-2"},i.a.createElement(f.a,{className:"my-2",color:"primary",onClick:p},"Add Blockout"),i.a.createElement(Se.a,{isOpen:l,className:"w-100"},i.a.createElement(xe.a,null,i.a.createElement(Re,null,i.a.createElement(re.a,{onSubmit:g},i.a.createElement(se.a,null,i.a.createElement(ce.a,{for:"dateInput"},"Date"),i.a.createElement(z.a,{type:"text",value:u,name:"date",id:"dateInput",invalid:!Le(u),onChange:function(e){return m(e.target.value)}}),i.a.createElement(Ye.a,{color:"muted"},"Dates must be in DDMMYY format, it will be automatically be converted to DD-MM-YYYY")),i.a.createElement(f.a,{color:"success",className:"w-100",onClick:g,disabled:!Le(u)},"Add")))))))};function Ve(e){var a=e.blockoutDates,t=e.handleDelete;return 0===a.length?i.a.createElement("h3",{className:"my-2"},"No blockout date for this personnel"):i.a.createElement(y.a,{striped:!0,responsive:!0},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center"},"Blockout Dates:"),i.a.createElement("th",{className:"text-center"},"Action:"))),i.a.createElement("tbody",null,a.map((function(e){return i.a.createElement("tr",{key:e},i.a.createElement("td",{className:"text-center"},e),i.a.createElement("td",{className:"text-center"},i.a.createElement(f.a,{color:"danger",onClick:function(){return t(e)}},"Delete")))}))))}Ve.defaultProps={blockoutDates:[]};var qe=Ve,He=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(s.a)(a).call(this,e))).setTab=function(e){e!==t.state.activeTab&&t.setState({activeTab:e})},t.handleDeleteStatus=function(e){var a=t.props;(0,a.deletePersonnelStatus)(a.match.params.personnelId,e)},t.handleAddStatus=function(e){var a=e.statusId,n=e.startDate,l=e.endDate,r=t.props,s=r.match.params.personnelId;(0,r.addPersonnelStatus)(s,a,n,l)},t.handleAddBlockoutDate=function(e){var a=t.props,n=a.match.params.personnelId;(0,a.addBlockoutDate)(n,e)},t.handleDeleteBlockoutDate=function(e){var a=t.props,n=a.match.params.personnelId;(0,a.deleteBlockoutDate)(n,e)},t.showErrors=function(){var e=t.props.errors;return i.a.createElement(d.a,{className:"my-2 flex-column"},i.a.createElement(b.a,null,i.a.createElement(p.a,{color:"danger",className:"w-100"},e.map((function(e){return i.a.createElement("p",{key:e},e)})))))},t.state={activeTab:"1"},t}return Object(c.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this.props,a=e.match.params.personnelId,t=e.personnels,n=e.statuses,l=e.statusIds,r=e.actionInProgress,s=e.errors,c=this.state.activeTab,o=t[a];return i.a.createElement(i.a.Fragment,null,i.a.createElement(g.a,null,i.a.createElement(d.a,{className:"my-2 justify-content-center align-items-center"},i.a.createElement(b.a,null,i.a.createElement(te.a,{tag:"nav",listTag:"div"},i.a.createElement(ne.a,{tag:N.b,to:"/personnels"},"Personnels"),i.a.createElement(ne.a,{active:!0,tag:"span"},"Details"),i.a.createElement(ne.a,{active:!0,tag:"span"},o.name)))),s.length>0&&this.showErrors(),r&&i.a.createElement(ie,{name:"Action"}),i.a.createElement(d.a,{className:"my-2 align-items-center"},i.a.createElement(b.a,null,i.a.createElement("h1",null,"Details"))),i.a.createElement(d.a,null,i.a.createElement(b.a,null,i.a.createElement("p",{className:"text-danger"},"Note: Status and blockout dates that expired will be automatically removed"))),i.a.createElement(Me,{activeTab:c,setTab:this.setTab}),i.a.createElement(he,{activeTab:c},i.a.createElement(je,{tabId:"1"},i.a.createElement(Oe,{name:o.name,rank:o.rank,platoon:o.platoon,eventsDate:o.eventsDate||["None"]})),i.a.createElement(je,{tabId:"2"},i.a.createElement(_e,{statusIds:l,statuses:n,handleAdd:this.handleAddStatus}),i.a.createElement(Te,{onDelete:this.handleDeleteStatus,statuses:o.statuses})),i.a.createElement(je,{tabId:"3"},i.a.createElement(Je,{handleAdd:this.handleAddBlockoutDate}),i.a.createElement(qe,{blockoutDates:o.blockOutDates,handleDelete:this.handleDeleteBlockoutDate})))))}}]),a}(o.PureComponent),Ge={addPersonnelStatus:Ne.d,deletePersonnelStatus:Ne.k,addBlockoutDate:Ne.a,deleteBlockoutDate:Ne.h},Ke=Object(j.b)((function(e){return{personnels:e.personnels.get("personnels"),statuses:e.statuses.get("statuses"),statusIds:e.statuses.get("ids"),actionInProgress:e.pages.personnels.single.get("actionInProgress"),errors:e.pages.personnels.single.get("errors")}}),Ge)(He),Qe=function(e){function a(){return Object(n.a)(this,a),Object(r.a)(this,Object(s.a)(a).apply(this,arguments))}return Object(c.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this.props.match.path;return i.a.createElement(m.a,null,i.a.createElement(u.d,null,i.a.createElement(u.b,{exact:!0,path:e,component:ee}),i.a.createElement(u.b,{path:"".concat(e,"/add"),component:de}),i.a.createElement(u.b,{path:"".concat(e,"/:personnelId"),component:Ke})))}}]),a}(o.PureComponent);t.d(a,"default",(function(){return Qe}))}}]);
//# sourceMappingURL=6.1985472a.chunk.js.map