(this.webpackJsonpmawarekun=this.webpackJsonpmawarekun||[]).push([[0],{23:function(t,e,n){t.exports={bg_warning:"App_bg_warning__2uihL",mt_adjust_against_left:"App_mt_adjust_against_left__3qs19"}},49:function(t,e,n){},75:function(t,e,n){"use strict";n.r(e);var a,r,c=n(0),o=n(34),i=n.n(o),s=(n(49),n(21)),u=n.n(s),b=n(35),l=n(7),j=(n(51),n(76)),m=n(77),d=n(41),O=n(82),f=n(42),p=n(78),h=n(81),x=n(80),N=n(79),v=n(15),g=["DoruNakano","LiNakano","NtNakano"],y=new Map([[g[0],4.38],[g[1],4],[g[2],4]]),S=(a={},Object(v.a)(a,g[0],114),Object(v.a)(a,g[1],125),Object(v.a)(a,g[2],125),a),R="normal",k="continueStart",w="resetStart",C="\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3092\u3057\u307e\u3057\u3087\u3046",I="\u65e2\u306b\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u3059",_="\u56de\u8ee2\u6570\u3092\u5165\u529b\u3057\u307e\u3057\u3087\u3046",E="\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002",F="\u30a8\u30e9\u30fc\u53ef\u80fd\u6027\u3002\u5b58\u5728\u3057\u306a\u3044\u5e97\u540d\u304c\u6e21\u3055\u308c\u307e\u3057\u305f\u3002",M=function(t){return t[t.length-1]},T=function(t){return new Promise((function(e){return setTimeout(e,t)}))},P=n(36),z=n(37),A=Object(z.a)(O.a)(r||(r=Object(P.a)(["\n  font-size: 0.4rem;\n"]))),D=n(1);function B(t){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(A,{variant:"primary",className:"col-4",onClick:function(){return function(){try{if(""===t.rotationNumberInputed)throw _;t.setIsCorrectBallNumberConfirm(!1),t.setRotations(t.rotations.concat({type:k,rotationNumber:Number(t.rotationNumberInputed),rotationRateMostRecent:0,rotationRate:t.rotationRate})),t.clearRotationNumberInputed()}catch(e){alert(e)}}()},children:"\u7d99\u7d9a\u30b9\u30bf\u30fc\u30c8"})," "]})}function H(t){return Object(D.jsx)(D.Fragment,{children:Object(D.jsx)(A,{id:"resetStartButton",variant:"primary",className:"col-4",onClick:function(){return function(){try{if(t.isResetStarted())throw I;if(""===t.rotationNumberInputed)throw _;if(""===t.selectStoreRef.current.value)throw E;t.setRotations(t.rotations.concat({type:w,rotationNumber:Number(t.rotationNumberInputed),rotationRateMostRecent:0,rotationRate:0})),t.clearRotationNumberInputed(),localStorage.setItem("startTime",Object(N.a)(new Date,"HH:mm"))}catch(e){alert(e)}}()},children:"\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8"})})}function J(t){return Object(D.jsx)(D.Fragment,{children:["7","8","9","4","5","6","1","2","3","0"].map((function(e){return Object(D.jsx)(O.a,{variant:"primary",className:"col-4 py-3",onClick:function(){return t.setRotationNumberInputed(t.rotationNumberInputed+e)},children:e},e)}))})}function L(t){return Object(D.jsx)(D.Fragment,{children:t.rotations.map((function(t,e){var n="";return t.type===w?n="".concat(t.rotationNumber," --start--"):t.type===k?n="".concat(t.rotationNumber," > start"):t.type===R&&(n="".concat(t.rotationNumber," ").concat(t.rotationRateMostRecent," ").concat(t.rotationRate)),Object(D.jsx)(x.a.Item,{className:"py-1",children:n},e)}))})}var V=n(43);function Q(t){var e=[Object(D.jsx)("option",{value:"",disabled:!0,hidden:!0,children:"\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002"},"defaultValue")],n=t.storeNames.map((function(t){return Object(D.jsx)("option",{value:t,children:t},t)})),a=[e].concat(Object(V.a)(n));return Object(D.jsx)(D.Fragment,{children:a})}var U=n(23),W=n.n(U),Y=n(54).default;var q=function(){var t=Object(c.useState)(0),e=Object(l.a)(t,2),n=e[0],a=e[1],r=Object(c.useState)(""),o=Object(l.a)(r,2),i=o[0],s=o[1],v=Object(c.useState)([]),I=Object(l.a)(v,2),_=I[0],E=I[1],P=Object(c.useState)(0),z=Object(l.a)(P,2),A=z[0],V=z[1],U=Object(c.useState)(0),q=Object(l.a)(U,2),G=q[0],K=q[1],X=Object(c.useState)(0),Z=Object(l.a)(X,2),$=Z[0],tt=Z[1],et=Object(c.useState)(""),nt=Object(l.a)(et,2),at=nt[0],rt=nt[1],ct=Object(c.useState)(""),ot=Object(l.a)(ct,2),it=ot[0],st=ot[1],ut=Object(c.useState)(""),bt=Object(l.a)(ut,2),lt=bt[0],jt=bt[1],mt=Object(c.useState)(""),dt=Object(l.a)(mt,2),Ot=dt[0],ft=dt[1],pt=Object(c.useState)(""),ht=Object(l.a)(pt,2),xt=ht[0],Nt=ht[1],vt=Object(c.useState)(""),gt=Object(l.a)(vt,2),yt=gt[0],St=gt[1],Rt=Object(c.useState)(""),kt=Object(l.a)(Rt,2),wt=kt[0],Ct=kt[1],It=Object(c.useState)(""),_t=Object(l.a)(It,2),Et=_t[0],Ft=_t[1],Mt=Object(c.useState)(!0),Tt=Object(l.a)(Mt,2),Pt=Tt[0],zt=Tt[1],At=Object(c.useRef)(null),Dt=Object(c.useRef)(document.createElement("select")),Bt=Object(c.useRef)(document.createElement("button")),Ht=Object(c.useCallback)((function(t,e){localStorage.setItem("".concat(t,"_").concat(n),e)}),[n]),Jt=Object(c.useCallback)((function(t,e){return localStorage.getItem("".concat(t,"_").concat(n))||e}),[n]);Object(c.useEffect)((function(){var t=Jt("investmentCnt","0"),e=JSON.parse(Jt("rotations","[]")),n=Jt("storeName",""),a=Jt("machineName",""),r=Jt("ballNumberConfirm",""),c=Jt("border","18.0"),o=Jt("remarks","");K(Number(t)),st(n),E(e),jt(a),ft(r),rt(c),Ct(o),V(function(t){return 0===t.length?0:M(t).rotationRate}(e)),tt(function(t){var e=0;return t.forEach((function(n,a){n.type!==w&&n.type!==k&&(e+=n.rotationNumber-t[a-1].rotationNumber)})),e}(e))}),[Jt]),Object(c.useEffect)((function(){At.current.scrollTop=At.current.scrollHeight,Ht("rotations",JSON.stringify(_))}),[_,Ht]),Object(c.useEffect)((function(){Ht("investmentCnt",""+G)}),[G,Ht]),Object(c.useEffect)((function(){Ht("border",at)}),[at,Ht]),Object(c.useEffect)((function(){Ht("ballNumberConfirm",Ot)}),[Ot,Ht]),Object(c.useEffect)((function(){Ht("remarks",wt)}),[wt,Ht]),Object(c.useEffect)((function(){var t=y.get(it);Ft(String(t)),Ht("storeName",it)}),[it,Ht]);var Lt=Object(c.useMemo)((function(){return 0===A?0:Number((1e3/Number(at)-1e3/A).toFixed(1))}),[at,A]);function Vt(){return _.length>0&&_[0].type===w}function Qt(){s("")}function Ut(){return(Lt*$).toFixed(0)}function Wt(t){try{if(!S.hasOwnProperty(t))throw new Error(F);return S[t]}catch(e){return alert(e),125}}function Yt(){window.confirm("\u5168\u884c\u524a\u9664\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f")&&(E([]),V(0),K(0),tt(0),ft(""),jt(""),Ct(""))}function qt(){return(qt=Object(b.a)(u.a.mark((function t(){var e,n,a,r,c,o,i,b,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==xt&&""!==yt){t.next=3;break}return alert("\u7389\u6570\u307e\u305f\u306f\u56de\u8ee2\u6570\u3092\u6307\u5b9a\u3057\u307e\u3057\u3087\u3046"),t.abrupt("return");case 3:if(!((e=Number(Ot)-Number(xt))<0)){t.next=7;break}return alert("\u81ea\u52d5\u56de\u8ee2\u306e\u7389\u6570\u306f\u3001\u78ba\u8a8d\u7528\u7389\u6570\u3088\u308a\u5927\u304d\u3044\u5024\u3092\u6307\u5b9a\u3057\u307e\u3057\u3087\u3046\u3002"),t.abrupt("return");case 7:if(n=function(){return T(1).then((function(){return Bt.current.click()}))},a=e/Wt(it),r=Number(yt)-M(_).rotationNumber,Number.isInteger(a)){t.next=17;break}if(window.confirm("\u6295\u8cc7\u56de\u6570\u304c\u6574\u6570\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\n\u534a\u7aef\u3092\u9664\u3044\u3066\u8a08\u7b97\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f")){t.next=13;break}return t.abrupt("return");case 13:c=a-parseInt(String(a)),a-=c,o=Math.round(r*c),r-=o;case 17:if(i=Math.floor(r/a),window.confirm("\u81ea\u52d5\u56de\u8ee2\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f\n\u6295\u8cc7\u56de\u6570\uff1a".concat(a,"\u56de\n\u5e73\u5747\u56de\u8ee2\u6570\uff1a").concat(i))){t.next=20;break}return t.abrupt("return");case 20:b=0;case 21:if(!(b<a)){t.next=29;break}return l=Number(yt)-i*(a-1-b),s(String(l)),t.next=26,n();case 26:b++,t.next=21;break;case 29:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Gt(){try{if(!1===Vt())throw C;Number(Ot)<Wt(it)?zt(!1):zt(!0);var t=G+1,e=String(i).length<3&&String(M(_).rotationNumber).length>1?function(){var t=String(M(_).rotationNumber),e=function(){var e=Number(t.slice(0,-2));return function(t,e){return t>e}(Number(t.slice(-2)),Number(i))?e+1:e}(),n=("00"+i).slice(-2);return Number(e+n)}():Number(i),n=Number(e)-M(_).rotationNumber,a=Number(Et)/4,r=Number((2*n*a).toFixed(1)),c=$+n,o=Number((c*(1e3/(500*t))*a).toFixed(1));Qt(),K(t),tt(c),V(o),E(_.concat({type:R,rotationNumber:Number(e),rotationRateMostRecent:r,rotationRate:o})),ft(String(Number(Ot)-Wt(it)))}catch(s){alert(s)}}return Object(D.jsx)("div",{className:"App",children:Object(D.jsx)(j.a,{className:"pt-3 ".concat(Pt?"":W.a.bg_warning),children:Object(D.jsxs)(m.a,{children:[Object(D.jsxs)(d.a,{children:[Object(D.jsxs)("p",{className:"mb-0",children:[Object(D.jsx)("span",{children:Lt})," * ",Object(D.jsx)("span",{children:$})," = ",Object(D.jsx)("span",{"data-testid":"work-amount",children:Ut()})]}),Object(D.jsxs)(m.a,{className:"justify-content-between",children:[Object(D.jsx)(O.a,{className:"mb-1",variant:"primary",onClick:function(){return function(){var t=_.length;if(0!==t){zt(!0),M(_).type===R&&K(G-1);var e=_.filter((function(e,n){return n!==t-1}));if(1===e.length||0===e.length?V(0):V(M(e).rotationRate),M(_).type===R&&e.length>0){var n=M(_).rotationNumber-M(e).rotationNumber;tt($-n)}E(e),ft(String(Number(Ot)+Wt(it)))}}()},children:"1\u884c\u524a\u9664"}),Object(D.jsx)(O.a,{className:"mb-1",variant:"primary",onClick:function(){a(n-1)},children:"\u524d"}),Object(D.jsx)(O.a,{className:"mb-1",variant:"primary",onClick:function(){a(n+1)},children:"\u6b21"})]}),Object(D.jsx)(f.a,{className:"mb-1",id:"rotationNumberInput",value:i,onChange:function(t){s(t.target.value)},placeholder:"\u56de\u8ee2\u6570\u5165\u529b"}),Object(D.jsxs)(m.a,{className:"mb-2",children:[Object(D.jsx)(J,{setRotationNumberInputed:s,rotationNumberInputed:i}),Object(D.jsx)(O.a,{variant:"primary",className:"col-4",onClick:function(){return Qt()},children:"C"}),Object(D.jsx)(O.a,{variant:"primary",className:"col-4"}),Object(D.jsx)(O.a,{variant:"primary",className:"col-4 py-3",ref:Bt,onClick:function(){return Gt()},children:"\u56de\u8ee2"}),Object(D.jsx)(B,{rotationNumberInputed:i,rotationRate:A,rotations:_,clearRotationNumberInputed:Qt,setRotations:E,setIsCorrectBallNumberConfirm:zt}),Object(D.jsx)(H,{rotationNumberInputed:i,rotations:_,selectStoreRef:Dt,isResetStarted:Vt,clearRotationNumberInputed:Qt,setRotations:E})]}),Object(D.jsx)(m.a,{children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(p.a.Prepend,{children:Object(D.jsx)(p.a.Text,{children:"\u78ba\u8a8d\u7528\u7389\u6570"})}),Object(D.jsx)(f.a,{value:Ot,"data-testid":"ball-number-confirm",onChange:function(t){var e=t.target.value;ft(e)},type:"number"})]})}),Object(D.jsx)(m.a,{children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(f.a,{value:xt,"data-testid":"ball-number-auto-rotation",onChange:function(t){var e=t.target.value;Nt(e)},type:"number",placeholder:"\u7389\u6570"}),Object(D.jsx)(f.a,{value:yt,"data-testid":"ball-number-auto-rotation",onChange:function(t){var e=t.target.value;St(e)},type:"number",placeholder:"\u56de\u8ee2\u6570"}),Object(D.jsx)(p.a.Append,{children:Object(D.jsx)(O.a,{variant:"outline-primary",onClick:function(){return function(){return qt.apply(this,arguments)}()},children:"\u81ea\u56de"})})]})}),Object(D.jsx)(m.a,{children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(p.a.Prepend,{children:Object(D.jsx)(p.a.Text,{children:"\u30dc\u30fc\u30c0\u30fc"})}),Object(D.jsx)(f.a,{value:at,"data-testid":"border",onChange:function(t){rt(t.target.value)},type:"number"})]})}),Object(D.jsx)(m.a,{children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(p.a.Prepend,{children:Object(D.jsx)(p.a.Text,{children:"\u5099\u8003"})}),Object(D.jsx)(h.a.Control,{as:"textarea",rows:2,value:wt,onChange:function(t){var e=t.target.value;Ct(e)}})]})}),Object(D.jsx)(m.a,{children:Object(D.jsx)(O.a,{className:"mt-5",variant:"primary",onClick:function(){return function(){var t=new Date,e=Object(N.a)(t,"yyyy/MM/dd"),n=localStorage.getItem("startTime"),a=Object(N.a)(t,"HH:mm"),r=new URLSearchParams;r.append("date","".concat(e)),r.append("timeStart","".concat(n)),r.append("timeEnd","".concat(a)),r.append("border","".concat(at)),r.append("rotationRate","".concat(A)),r.append("rotationUnitPrice","".concat(Lt)),r.append("rotationNumberTotal","".concat($)),r.append("workAmount","".concat(Ut())),r.append("machineName","".concat(lt)),r.append("storeName","".concat(it)),r.append("remarks","".concat(wt)),Y.post("https://script.google.com/macros/s/AKfycbwAEFQ6VWnrJ67EjQiYd8WeEv0D2ogBpV2GYDgxucx9C5gf1Dmd/exec",r).then((function(t){alert("\u66f8\u8fbc\u304c\u6210\u529f\u3057\u307e\u3057\u305f\u3002"),Yt()})).catch((function(t){alert(t)}))}()},children:"\u8868\u66f8\u8fbc\uff06\u5168\u524a"})}),Object(D.jsx)(m.a,{children:Object(D.jsx)(O.a,{className:"allDeteleBtn",variant:"primary",onClick:function(){return Yt()},children:"\u5168\u884c\u524a\u9664"})})]}),Object(D.jsxs)(d.a,{children:[Object(D.jsx)(x.a,{className:"rotationList",ref:At,children:Object(D.jsx)(L,{rotations:_})}),Object(D.jsx)("div",{className:"".concat(W.a.mt_adjust_against_left),children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(p.a.Prepend,{children:Object(D.jsx)(p.a.Text,{children:"\u5e97\u540d"})}),Object(D.jsx)(h.a.Control,{as:"select",value:it,onChange:function(t){st(t.target.value)},ref:Dt,children:Object(D.jsx)(Q,{storeNames:g})})]})}),Object(D.jsx)("div",{children:Object(D.jsxs)(p.a,{size:"sm",children:[Object(D.jsx)(p.a.Prepend,{children:Object(D.jsx)(p.a.Text,{children:"\u6a5f\u7a2e\u540d"})}),Object(D.jsx)(f.a,{value:lt,onChange:function(t){var e=t.target.value;jt(e),Ht("machineName",e)}})]})}),Object(D.jsx)("div",{children:Object(D.jsxs)("div",{className:"mr-2",children:["\u4ea4\u63db\u7387:",Et]})})]})]})})})};i.a.render(Object(D.jsx)(q,{}),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.706ab924.chunk.js.map