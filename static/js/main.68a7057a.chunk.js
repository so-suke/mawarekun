(this.webpackJsonpmawarekun=this.webpackJsonpmawarekun||[]).push([[0],{24:function(e,t,n){e.exports={bg_warning:"App_bg_warning__2uihL",font_button:"App_font_button__uusV8"}},42:function(e,t,n){e.exports={font_button:"NumberButtons_font_button__1NMiq"}},52:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a,r,c=n(0),o=n(35),i=n.n(o),s=(n(52),n(22)),u=n.n(s),b=n(36),j=n(6),l=n(16),m=(n(54),n(79)),d=n(80),O=n(44),f=n(85),p=n(45),h=n(83),x=n(81),N=n(84),g=n(82),v=n(10),S=["DoruNakano","LiNakano","NtNakano"],y=new Map([[S[0],4.38],[S[1],4],[S[2],4]]),R=(a={},Object(v.a)(a,S[0],114),Object(v.a)(a,S[1],125),Object(v.a)(a,S[2],125),a),k="normal",w="continueStart",C="resetStart",I="\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3092\u3057\u307e\u3057\u3087\u3046",_="\u65e2\u306b\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u3059",E="\u56de\u8ee2\u6570\u3092\u5165\u529b\u3057\u307e\u3057\u3087\u3046",B="\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002",T="\u30a8\u30e9\u30fc\u53ef\u80fd\u6027\u3002\u5b58\u5728\u3057\u306a\u3044\u5e97\u540d\u304c\u6e21\u3055\u308c\u307e\u3057\u305f\u3002",z="\u30a8\u30e9\u30fc\n\u5927\u5f53\u305f\u308a\u7389\u6570\u306b\u95a2\u3057\u3066\n\u5927\u5f53\u524d\u3088\u308a\u5927\u5f53\u5f8c\u306e\u65b9\u304c\u5927\u304d\u304f\u306a\u308b\u3088\u3046\u306b\u3057\u307e\u3057\u3087\u3046",M=function(e){return e[e.length-1]},P=function(e){return new Promise((function(t){return setTimeout(t,e)}))},F=n(37),A=n(38),H=Object(A.a)(f.a)(r||(r=Object(F.a)(["\n  font-size: 0.4rem;\n"]))),D=n(1);function J(e){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(H,{variant:"primary",className:"col-4",onClick:function(){return function(){try{if(""===e.rotationNumberInputed)throw E;e.setIsCorrectBallNumberConfirm(!1),e.setRotations(e.rotations.concat({type:w,rotationNumber:Number(e.rotationNumberInputed),rotationRateMostRecent:0,rotationRate:e.rotationRate})),e.clearRotationNumberInputed()}catch(t){alert(t)}}()},children:"\u7d99\u7d9a\u30b9\u30bf\u30fc\u30c8"})," "]})}function L(e){return Object(D.jsx)(D.Fragment,{children:Object(D.jsx)(H,{id:"resetStartButton",variant:"primary",className:"col-4",onClick:function(){return function(){try{if(e.isResetStarted())throw _;if(""===e.rotationNumberInputed)throw E;if(""===e.selectStoreRef.current.value)throw B;e.setRotations(e.rotations.concat({type:C,rotationNumber:Number(e.rotationNumberInputed),rotationRateMostRecent:0,rotationRate:0})),e.clearRotationNumberInputed();var t=new Date,n=Object(g.a)(t,"HH:mm");e.setRemarks((function(t){var a=""===t?"":"\n";e.setRemarks("".concat(t).concat(a,"\u958b\u59cb\u6642\u9593\uff1a").concat(n))})),localStorage.setItem("startTime",n)}catch(a){alert(a)}}()},children:"\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8"})})}var K=n(42),U=n.n(K);function Q(e){return Object(D.jsx)(D.Fragment,{children:["7","8","9","4","5","6","1","2","3","0"].map((function(t){return Object(D.jsx)(f.a,{className:"col-4 ".concat(U.a.font_button),onClick:function(){return e.setRotationNumberInputed(e.rotationNumberInputed+t)},style:e.getStyleSizeTenKey(),children:t},t)}))})}function V(e){return Object(D.jsx)(D.Fragment,{children:e.rotations.map((function(e,t){var n="";return e.type===C?n="".concat(e.rotationNumber," --start--"):e.type===w?n="".concat(e.rotationNumber," > start"):e.type===k&&(n="".concat(e.rotationNumber," ").concat(e.rotationRateMostRecent," ").concat(e.rotationRate)),Object(D.jsx)(h.a.Item,{className:"py-1",children:n},t)}))})}var q=n(46);function G(e){var t=[Object(D.jsx)("option",{value:"",disabled:!0,hidden:!0,children:"\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002"},"defaultValue")],n=e.storeNames.map((function(e){return Object(D.jsx)("option",{value:e,children:e},e)})),a=[t].concat(Object(q.a)(n));return Object(D.jsx)(D.Fragment,{children:a})}var W=n(43),X=n(24),Y=n.n(X),Z=n(57).default,$={delta:100};var ee=function(){var e=Object(W.useSwipeable)(Object(l.a)({onSwipedLeft:function(e){return At()},onSwipedRight:function(e){return Ft()}},$)),t=Object(c.useState)(0),n=Object(j.a)(t,2),a=n[0],r=n[1],o=Object(c.useState)("12"),i=Object(j.a)(o,2),s=i[0],v=i[1],_=Object(c.useState)(""),E=Object(j.a)(_,2),B=E[0],F=E[1],A=Object(c.useState)([]),H=Object(j.a)(A,2),K=H[0],U=H[1],q=Object(c.useState)(0),X=Object(j.a)(q,2),ee=X[0],te=X[1],ne=Object(c.useState)(0),ae=Object(j.a)(ne,2),re=ae[0],ce=ae[1],oe=Object(c.useState)(0),ie=Object(j.a)(oe,2),se=ie[0],ue=ie[1],be=Object(c.useState)(""),je=Object(j.a)(be,2),le=je[0],me=je[1],de=Object(c.useState)(""),Oe=Object(j.a)(de,2),fe=Oe[0],pe=Oe[1],he=Object(c.useState)(""),xe=Object(j.a)(he,2),Ne=xe[0],ge=xe[1],ve=Object(c.useState)(""),Se=Object(j.a)(ve,2),ye=Se[0],Re=Se[1],ke=Object(c.useState)(""),we=Object(j.a)(ke,2),Ce=we[0],Ie=we[1],_e=Object(c.useState)(""),Ee=Object(j.a)(_e,2),Be=Ee[0],Te=Ee[1],ze=Object(c.useState)(""),Me=Object(j.a)(ze,2),Pe=Me[0],Fe=Me[1],Ae=Object(c.useState)(""),He=Object(j.a)(Ae,2),De=He[0],Je=He[1],Le=Object(c.useState)(!0),Ke=Object(j.a)(Le,2),Ue=Ke[0],Qe=Ke[1],Ve=Object(c.useState)(""),qe=Object(j.a)(Ve,2),Ge=qe[0],We=qe[1],Xe=Object(c.useState)(""),Ye=Object(j.a)(Xe,2),Ze=Ye[0],$e=Ye[1],et=Object(c.useState)(0),tt=Object(j.a)(et,2),nt=tt[0],at=tt[1],rt=Object(c.useState)(""),ct=Object(j.a)(rt,2),ot=ct[0],it=ct[1],st=Object(c.useState)(""),ut=Object(j.a)(st,2),bt=ut[0],jt=ut[1],lt=Object(c.useState)(0),mt=Object(j.a)(lt,2),dt=mt[0],Ot=mt[1],ft=Object(c.useState)(0),pt=Object(j.a)(ft,2),ht=pt[0],xt=pt[1],Nt=Object(c.useState)(""),gt=Object(j.a)(Nt,2),vt=gt[0],St=gt[1],yt=Object(c.useRef)(null),Rt=Object(c.useRef)(document.createElement("select")),kt=Object(c.useRef)(document.createElement("button")),wt=Object(c.useCallback)((function(e,t){localStorage.setItem("".concat(e,"_").concat(a),t)}),[a]),Ct=Object(c.useCallback)((function(e,t){return localStorage.getItem("".concat(e,"_").concat(a))||t}),[a]),It=Object(c.useCallback)((function(){return{paddingTop:"".concat(s,"px"),paddingBottom:"".concat(s,"px")}}),[s]);Object(c.useEffect)((function(){var e=Number(localStorage.getItem("pageIndex")||"0");r(e)}),[]),Object(c.useEffect)((function(){var e=localStorage.getItem("spreadSheetId")||"",t=localStorage.getItem("sizeTenKey")||"10",n=Ct("investmentCnt","0"),a=JSON.parse(Ct("rotations","[]")),r=Ct("storeName",""),c=Ct("machineName",""),o=Ct("ballNumberConfirm",""),i=Ct("border","18.0"),s=Ct("remarks",""),u=Ct("ballNumberBigHitBefore","0"),b=Ct("ballNumberBigHitAfter","0"),j=Number(Ct("roundBase","")),l=Ct("roundRecord",""),m=Ct("wonBallNumberRecord","");St(e),v(t),ce(Number(n)),U(a),te(function(e){return 0===e.length?0:M(e).rotationRate}(a)),ue(function(e){var t=0;return e.forEach((function(n,a){n.type!==C&&n.type!==w&&(t+=n.rotationNumber-e[a-1].rotationNumber)})),t}(a)),pe(r),ge(c),Re(o),me(i),Fe(s),We(u),$e(b),at(j),it(l),jt(m)}),[Ct]);var _t=function(e){return e.split(/[\n.,]/).map((function(e){return Number(e)})).reduce((function(e,t){return e+t}),0)};Object(c.useEffect)((function(){localStorage.setItem("spreadSheetId",vt)}),[vt]),Object(c.useEffect)((function(){localStorage.setItem("sizeTenKey",s)}),[s]),Object(c.useEffect)((function(){wt("wonBallNumberRecord",bt);var e=_t(bt);xt(e)}),[bt,wt]),Object(c.useEffect)((function(){wt("roundRecord",ot);var e=_t(ot);Ot(e)}),[ot,wt]),Object(c.useEffect)((function(){var e=Number((ht/dt).toFixed(1));at(e),wt("roundBase",""+e)}),[dt,ht,wt]),Object(c.useEffect)((function(){yt.current.scrollTop=yt.current.scrollHeight,wt("rotations",JSON.stringify(K))}),[K,wt]),Object(c.useEffect)((function(){wt("investmentCnt",""+re)}),[re,wt]),Object(c.useEffect)((function(){wt("border",le)}),[le,wt]),Object(c.useEffect)((function(){wt("ballNumberConfirm",ye)}),[ye,wt]),Object(c.useEffect)((function(){wt("remarks",Pe)}),[Pe,wt]),Object(c.useEffect)((function(){wt("machineName",Ne)}),[Ne,wt]),Object(c.useEffect)((function(){var e=y.get(fe);Je(String(e)),wt("storeName",fe)}),[fe,wt]);var Et=Object(c.useMemo)((function(){return 0===ee?0:Number((1e3/Number(le)-1e3/ee).toFixed(1))}),[le,ee]);function Bt(){return K.length>0&&K[0].type===C}function Tt(){return"NtNakano"===fe}function zt(){F("")}function Mt(){return(Et*se).toFixed(0)}function Pt(e){try{if(!R.hasOwnProperty(e))throw new Error(T);return R[e]}catch(t){return alert(t),125}}function Ft(){0!==a&&(localStorage.setItem("pageIndex",""+(a-1)),r(a-1))}function At(){10!==a&&(localStorage.setItem("pageIndex",""+(a+1)),r(a+1))}function Ht(){window.confirm("\u5168\u884c\u524a\u9664\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f")&&(U([]),te(0),ce(0),ue(0),Re(""),ge(""),Fe(""),it(""),jt(""),Tt()&&(We(""),$e("")))}function Dt(){return(Dt=Object(b.a)(u.a.mark((function e(){var t,n,a,r,c,o,i,s,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==Ce&&""!==Be){e.next=3;break}return alert("\u7389\u6570\u307e\u305f\u306f\u56de\u8ee2\u6570\u3092\u6307\u5b9a\u3057\u307e\u3057\u3087\u3046"),e.abrupt("return");case 3:if(!((t=Number(ye)-Number(Ce))<0)){e.next=7;break}return alert("\u81ea\u52d5\u56de\u8ee2\u306e\u7389\u6570\u306f\u3001\u78ba\u8a8d\u7528\u7389\u6570\u3088\u308a\u5927\u304d\u3044\u5024\u3092\u6307\u5b9a\u3057\u307e\u3057\u3087\u3046\u3002"),e.abrupt("return");case 7:if(n=function(){return P(1).then((function(){return kt.current.click()}))},a=t/Pt(fe),r=Number(Be)-M(K).rotationNumber,Number.isInteger(a)){e.next=17;break}if(window.confirm("\u6295\u8cc7\u56de\u6570\u304c\u6574\u6570\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\n\u534a\u7aef\u3092\u9664\u3044\u3066\u8a08\u7b97\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f")){e.next=13;break}return e.abrupt("return");case 13:c=a-parseInt(String(a)),a-=c,o=Math.round(r*c),r-=o;case 17:if(i=Math.floor(r/a),window.confirm("\u81ea\u52d5\u56de\u8ee2\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f\n\u6295\u8cc7\u56de\u6570\uff1a".concat(a,"\u56de\n\u5e73\u5747\u56de\u8ee2\u6570\uff1a").concat(i))){e.next=20;break}return e.abrupt("return");case 20:s=0;case 21:if(!(s<a)){e.next=29;break}return b=Number(Be)-i*(a-1-s),F(String(b)),e.next=26,n();case 26:s++,e.next=21;break;case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Jt(){try{if(!1===Bt())throw I;Number(ye)<Pt(fe)?Qe(!1):Qe(!0);var e=re+1,t=String(B).length<3&&String(M(K).rotationNumber).length>1?function(){var e=String(M(K).rotationNumber),t=function(){var t=Number(e.slice(0,-2));return function(e,t){return e>t}(Number(e.slice(-2)),Number(B))?t+1:t}(),n=("00"+B).slice(-2);return Number(t+n)}():Number(B),n=Number(t)-M(K).rotationNumber,a=Number(De)/4,r=Number((2*n*a).toFixed(1)),c=se+n,o=Number((c*(1e3/(500*e))*a).toFixed(1));zt(),ce(e),ue(c),te(o),U(K.concat({type:k,rotationNumber:Number(t),rotationRateMostRecent:r,rotationRate:o})),Re(String(Number(ye)-Pt(fe)))}catch(i){alert(i)}}return Object(D.jsx)("div",{className:"App",children:Object(D.jsxs)(m.a,Object(l.a)(Object(l.a)({className:"pt-3 ".concat(Ue?"":Y.a.bg_warning)},e),{},{children:[Object(D.jsxs)(d.a,{children:[Object(D.jsxs)(O.a,{children:[Object(D.jsx)("p",{className:"mb-0",children:Object(D.jsxs)("span",{children:[a,"\u30da\u30fc\u30b8\u76ee"]})}),Object(D.jsxs)("p",{className:"mb-0",children:[Object(D.jsx)("span",{children:Et})," * ",Object(D.jsx)("span",{children:se})," = ",Object(D.jsx)("span",{"data-testid":"work-amount",children:Mt()})]}),Object(D.jsxs)(d.a,{className:"justify-content-between",children:[Object(D.jsx)(f.a,{className:"mb-1",variant:"primary",onClick:function(){return function(){var e=K.length;if(0!==e){Qe(!0),M(K).type===k&&ce(re-1);var t=K.filter((function(t,n){return n!==e-1}));if(1===t.length||0===t.length?te(0):te(M(t).rotationRate),M(K).type===k&&t.length>0){var n=M(K).rotationNumber-M(t).rotationNumber;ue(se-n)}U(t),Re(String(Number(ye)+Pt(fe)))}}()},children:"1\u884c\u524a\u9664"}),Object(D.jsx)(f.a,{className:"mb-1 ".concat(0===a?"d-none":""),variant:"primary",onClick:function(){return Ft()},children:"\u524d"}),Object(D.jsx)(f.a,{className:"mb-1",variant:"primary",onClick:function(){return At()},children:"\u6b21"})]}),Object(D.jsx)(p.a,{className:"mb-1",id:"rotationNumberInput",value:B,onChange:function(e){F(e.target.value)},placeholder:"\u56de\u8ee2\u6570\u5165\u529b"}),Object(D.jsxs)(d.a,{className:"mb-2",children:[Object(D.jsx)(Q,{setRotationNumberInputed:F,rotationNumberInputed:B,getStyleSizeTenKey:It}),Object(D.jsx)(f.a,{variant:"primary",className:"col-4 ".concat(Y.a.font_button),onClick:function(){return zt()},children:"C"}),Object(D.jsx)(f.a,{variant:"primary",className:"col-4"}),Object(D.jsx)(f.a,{variant:"primary",className:"col-4",style:It(),ref:kt,onClick:function(){return Jt()},children:"\u56de\u8ee2"}),Object(D.jsx)(J,{rotationNumberInputed:B,rotationRate:ee,rotations:K,clearRotationNumberInputed:zt,setRotations:U,setIsCorrectBallNumberConfirm:Qe}),Object(D.jsx)(L,{rotationNumberInputed:B,rotations:K,selectStoreRef:Rt,isResetStarted:Bt,clearRotationNumberInputed:zt,setRotations:U,setRemarks:Fe})]})]}),Object(D.jsxs)(O.a,{children:[Object(D.jsx)(h.a,{className:"rotationList",ref:yt,children:Object(D.jsx)(V,{rotations:K})}),Object(D.jsxs)("div",{className:"mt-2",children:[Object(D.jsxs)("div",{className:"mb-2 ".concat(Tt()?"":"d-none"),children:[Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u5927\u5f53\u524d\u7389\u6570"})}),Object(D.jsx)(p.a,{type:"number",value:Ge,onChange:function(e){var t=e.target.value;wt("ballNumberBigHitBefore",t),We(t)}})]}),Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u5927\u5f53\u5f8c\u7389\u6570"})}),Object(D.jsx)(p.a,{type:"number",value:Ze,onChange:function(e){var t=e.target.value;wt("ballNumberBigHitAfter",t),$e(t)}})]}),Object(D.jsx)(f.a,{variant:"primary",size:"sm",onClick:function(){return function(){try{if(window.confirm("\u7372\u5f97\u7389\u6570\u306e\u8a08\u7b97\u3001\u5165\u529b\u3092\u884c\u3044\u307e\u3059")){var e=Number(Ze)-Number(Ge);if(e<0)throw z;var t=""===bt?"":"\n";jt("".concat(bt).concat(t).concat(e,","))}}catch(n){alert(n)}}()},children:"\u7372\u5f97\u7389\u6570\u8a08\u7b97"})]}),Object(D.jsx)("span",{className:"mb-0",children:"\u7372\u5f97\u7389\u6570"}),Object(D.jsx)(x.a,{children:Object(D.jsx)(p.a,{as:"textarea",rows:2,placeholder:"\u7372\u5f97\u7389\u6570",inputMode:"numeric",value:bt,onChange:function(e){var t=e.target.value;jt(t)}})}),Object(D.jsx)("span",{className:"mb-0",children:"\u30e9\u30a6\u30f3\u30c9\u6570"}),Object(D.jsx)(x.a,{children:Object(D.jsx)(p.a,{as:"textarea",rows:2,placeholder:"\u30e9\u30a6\u30f3\u30c9",inputMode:"numeric",value:ot,onChange:function(e){var t=e.target.value;it(t)}})}),Object(D.jsxs)("p",{className:"mb-0",children:["rb: ",nt]})]})]})]}),Object(D.jsxs)(d.a,{children:[Object(D.jsxs)(O.a,{children:[Object(D.jsx)(d.a,{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u78ba\u8a8d\u7528\u7389\u6570"})}),Object(D.jsx)(p.a,{value:ye,"data-testid":"ball-number-confirm",onChange:function(e){var t=e.target.value;Re(t)},type:"number"})]})}),Object(D.jsx)(d.a,{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(p.a,{value:Ce,"data-testid":"ball-number-auto-rotation",onChange:function(e){var t=e.target.value;Ie(t)},type:"number",placeholder:"\u7389\u6570"}),Object(D.jsx)(p.a,{value:Be,"data-testid":"ball-number-auto-rotation",onChange:function(e){var t=e.target.value;Te(t)},type:"number",placeholder:"\u56de\u8ee2\u6570"}),Object(D.jsx)(x.a.Append,{children:Object(D.jsx)(f.a,{variant:"outline-primary",onClick:function(){return function(){return Dt.apply(this,arguments)}()},children:"\u81ea\u56de"})})]})}),Object(D.jsx)(d.a,{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u30dc\u30fc\u30c0\u30fc"})}),Object(D.jsx)(p.a,{value:le,"data-testid":"border",onChange:function(e){me(e.target.value)},type:"number"})]})}),Object(D.jsx)(d.a,{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u5099\u8003"})}),Object(D.jsx)(N.a.Control,{as:"textarea",rows:2,value:Pe,onChange:function(e){var t=e.target.value;Fe(t)}})]})}),Object(D.jsx)(d.a,{children:Object(D.jsx)(f.a,{className:"mt-5",variant:"primary",onClick:function(){return function(){var e=new Date,t=Object(g.a)(e,"yyyy/MM/dd"),n=localStorage.getItem("startTime"),a=Object(g.a)(e,"HH:mm");if(""!==vt){var r=new URLSearchParams;r.append("spreadsheetId","".concat(vt)),r.append("date","".concat(t)),r.append("timeStart","".concat(n)),r.append("timeEnd","".concat(a)),r.append("border","".concat(le)),r.append("rotationRate","".concat(ee)),r.append("rotationUnitPrice","".concat(Et)),r.append("rotationNumberTotal","".concat(se)),r.append("roundBase","".concat(nt)),r.append("workAmount","".concat(Mt())),r.append("machineName","".concat(Ne)),r.append("storeName","".concat(fe)),r.append("remarks","".concat(Pe)),Z.post("https://script.google.com/macros/s/AKfycbydAmOiNiksjhFoqxh1e_GUPQMuaJLCUJ0IssMpDjf_asz3gAdBQUjkS13GD9an40u0VQ/exec",r).then((function(e){alert("\u66f8\u8fbc\u304c\u6210\u529f\u3057\u307e\u3057\u305f\u3002"),Ht()})).catch((function(e){alert(e)}))}else alert("ssid\u3092\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\u3002")}()},children:"\u8868\u66f8\u8fbc\uff06\u5168\u524a"})}),Object(D.jsx)(d.a,{children:Object(D.jsx)(f.a,{className:"allDeteleBtn",variant:"primary",onClick:function(){return Ht()},children:"\u5168\u884c\u524a\u9664"})})]}),Object(D.jsxs)(O.a,{children:[Object(D.jsx)("div",{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u5e97\u540d"})}),Object(D.jsx)(N.a.Control,{as:"select",value:fe,onChange:function(e){pe(e.target.value)},ref:Rt,children:Object(D.jsx)(G,{storeNames:S})})]})}),Object(D.jsx)("div",{children:Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u6a5f\u7a2e\u540d"})}),Object(D.jsx)(p.a,{value:Ne,onChange:function(e){var t=e.target.value;ge(t)}})]})}),Object(D.jsx)("div",{children:Object(D.jsxs)("div",{className:"mr-2",children:["\u4ea4\u63db\u7387:",De]})}),Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"\u30dc\u30bf\u30f3\u5927\u304d\u3055"})}),Object(D.jsx)(p.a,{value:s,min:"1",max:"30",onChange:function(e){v(e.target.value)},type:"number"})]}),Object(D.jsxs)(x.a,{size:"sm",children:[Object(D.jsx)(x.a.Prepend,{children:Object(D.jsx)(x.a.Text,{children:"ssid"})}),Object(D.jsx)(p.a,{value:vt,onChange:function(e){St(e.target.value)}})]})]})]})]}))})};i.a.render(Object(D.jsx)(ee,{}),document.getElementById("root"))}},[[78,1,2]]]);
//# sourceMappingURL=main.68a7057a.chunk.js.map