(this.webpackJsonpmawarekun=this.webpackJsonpmawarekun||[]).push([[0],{49:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a(0),r=a(30),o=a.n(r),i=(a(49),a(42)),s=a(7),l=a(31),u=a(32),j=(a(50),a(81)),b=a(80),m=a(75),O=a(76),d=a(39),h=a(40),f=a(77),p=a(79),x=a(78),g="normal",N="continueStart",v="resetStart",S="\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3092\u3057\u307e\u3057\u3087\u3046",y="\u65e2\u306b\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u3059",C="\u56de\u8ee2\u6570\u3092\u5165\u529b\u3057\u307e\u3057\u3087\u3046",k="\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002";function w(){var e=Object(l.a)(["\n  font-size: 0.4rem;\n"]);return w=function(){return e},e}var I=a(51).default,R=Object(u.a)(j.a)(w());var E=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)([]),l=Object(s.a)(o,2),u=l[0],w=l[1],E=Object(n.useState)(0),T=Object(s.a)(E,2),M=T[0],D=T[1],H=Object(n.useState)(0),P=Object(s.a)(H,2),z=P[0],F=P[1],J=Object(n.useState)(0),A=Object(s.a)(J,2),B=A[0],L=A[1],V=Object(n.useState)("18.0"),Q=Object(s.a)(V,2),U=Q[0],W=Q[1],Y=Object(n.useState)([]),G=Object(s.a)(Y,2),K=G[0],q=G[1],X=Object(n.useState)(""),Z=Object(s.a)(X,2),$=Z[0],_=Z[1],ee=Object(n.useState)(""),te=Object(s.a)(ee,2),ae=te[0],ce=te[1],ne=Object(n.useState)(""),re=Object(s.a)(ne,2),oe=re[0],ie=re[1],se=Object(n.useState)(""),le=Object(s.a)(se,2),ue=le[0],je=le[1],be=Object(n.useState)(new Map),me=Object(s.a)(be,2),Oe=me[0],de=me[1],he=Object(n.useState)(""),fe=Object(s.a)(he,2),pe=fe[0],xe=fe[1],ge=Object(n.useRef)(null),Ne=Object(n.useRef)(document.createElement("select"));Object(n.useEffect)((function(){!function(){var e=["DoruNakano","LiNakano","NtNakano"];q(e),de(Oe.set(e[0],4.38)),de(Oe.set(e[1],4)),de(Oe.set(e[2],4))}();var e=localStorage.getItem("investmentCnt")||"0",t=JSON.parse(localStorage.getItem("rotations")||"[]"),a=localStorage.getItem("storeName")||"",c=localStorage.getItem("machineName")||"",n=localStorage.getItem("ballNumberComfirm")||"",r=localStorage.getItem("border")||"",o=localStorage.getItem("remarks")||"";F(Number(e)),_(a),w(t),ce(c),ie(n),W(r),je(o),D(function(e){return 0===e.length?0:e[e.length-1].rotationRate}(t)),L(function(e){var t=0;return e.forEach((function(a,c){a.type!==v&&a.type!==N&&(t+=a.rotationNumber-e[c-1].rotationNumber)})),t}(t))}),[]),Object(n.useEffect)((function(){ge.current.scrollTop=ge.current.scrollHeight,localStorage.setItem("rotations",JSON.stringify(u))}),[u]),Object(n.useEffect)((function(){localStorage.setItem("investmentCnt",""+z)}),[z]),Object(n.useEffect)((function(){localStorage.setItem("border",U)}),[U]),Object(n.useEffect)((function(){localStorage.setItem("ballNumberComfirm",oe)}),[oe]),Object(n.useEffect)((function(){localStorage.setItem("remarks",ue)}),[ue]),Object(n.useEffect)((function(){var e=Oe.get($);xe(e),localStorage.setItem("storeName",$)}),[$]);var ve=Object(n.useMemo)((function(){return 0===M?0:Number((1e3/Number(U)-1e3/M).toFixed(1))}),[U,M]);function Se(){return u.length>0&&u[0].type===v}function ye(){r("")}function Ce(){return(ve*B).toFixed(0)}function ke(e){var t=Oe.get(e);return Number((500/t).toFixed())}function we(){navigator.clipboard.writeText(function(){var e=new Date,t=Object(x.a)(e,"yyyy/MM/dd"),a=localStorage.getItem("startTime"),c=Object(x.a)(e,"HH:mm");return["".concat(t," ").concat(a,"\u301c").concat(c),"\u30dc\u30fc\u30c0\u30fc\uff1a".concat(U),"\u56de\u8ee2\u7387\uff1a".concat(M),"\u56de\u8ee2\u5358\u4fa1\uff1a".concat(ve),"\u7dcf\u56de\u8ee2\u6570\uff1a".concat(B),"".concat(Ce()),"".concat(ae),"".concat($),"".concat(ue)].join("\t")}())}function Ie(){var e=Number(a);if(String(a).length<3&&String(u[u.length-1].rotationNumber).length>1){var t=("000"+u[u.length-1].rotationNumber).slice(-3);e+=100*(e>Number(String(u[u.length-1].rotationNumber).slice(1,3))?Number(t[0]):Number(t[0])+1)}return e}var Re=function(){var e=[Object(c.jsx)("option",{value:"",disabled:!0,hidden:!0,children:"\u5e97\u540d\u3092\u9078\u629e\u3057\u3066\u4e0b\u3055\u3044\u3002"},"defaultValue")],t=K.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}));return[e].concat(Object(i.a)(t))}(),Ee=["7","8","9","4","5","6","1","2","3","0"].map((function(e){return Object(c.jsx)(j.a,{variant:"primary",className:"col-4",onClick:function(){return r(a+e)},children:e},e)})),Te=u.map((function(e,t){var a="";return e.type===v?a="".concat(e.rotationNumber," --start--"):e.type===N?a="".concat(e.rotationNumber," > start"):e.type===g&&(a="".concat(e.rotationNumber," ").concat(e.rotationRateMostRecent," ").concat(e.rotationRate)),Object(c.jsx)(b.a.Item,{children:a},t)}));return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(m.a,{className:"pt-3",children:Object(c.jsxs)(O.a,{children:[Object(c.jsxs)(d.a,{children:[Object(c.jsxs)("p",{className:"mb-0",children:["\u56de\u8ee2\u5358\u4fa1\uff1a",Object(c.jsx)("span",{children:ve})]}),Object(c.jsxs)("p",{className:"mb-0",children:["\u7dcf\u56de\u8ee2\u6570\uff1a",Object(c.jsx)("span",{children:B})]}),Object(c.jsxs)("p",{className:"mb-0",children:["\u4ed5\u4e8b\u91cf\uff1a",Object(c.jsx)("span",{children:Ce()})]}),Object(c.jsxs)(O.a,{children:[Object(c.jsx)(j.a,{className:"mr-1 mb-1",variant:"primary",onClick:function(){return we()},children:"\u30b3\u30d4\u30fc"}),Object(c.jsx)(j.a,{className:"mb-1",variant:"primary",onClick:function(){return function(){var e=u.length;if(0!==e){var t=u[u.length-1];t.type===g&&F(z-1);var a=u.filter((function(t,a){return a!==e-1}));if(1===a.length||0===a.length?D(0):D(a[a.length-1].rotationRate),t.type===g&&a.length>0){var c=u[u.length-1].rotationNumber-a[a.length-1].rotationNumber;L(B-c)}w(a),ie(String(Number(oe)+ke($)))}}()},children:"1\u884c\u524a\u9664"})]}),Object(c.jsx)(h.a,{className:"mb-1",id:"rotationNumberInput",value:a,onChange:function(e){r(e.target.value)},placeholder:"\u56de\u8ee2\u6570\u5165\u529b"}),Object(c.jsxs)(O.a,{className:"m-0 mb-2",children:[Ee,Object(c.jsx)(j.a,{variant:"primary",className:"col-4",onClick:function(){return ye()},children:"C"}),Object(c.jsx)(j.a,{variant:"primary",className:"col-4"}),Object(c.jsx)(j.a,{variant:"primary",className:"col-4",onClick:function(){return function(){try{if(!1===Se())throw S;var e=z+1,t=Ie(),a=Number(t)-u[u.length-1].rotationNumber,c=Number(pe)/4,n=Number((2*a*c).toFixed(1)),r=B+a,o=Number((r*(1e3/(500*e))*c).toFixed(1));ye(),F(e),L(r),D(o),w(u.concat({type:g,rotationNumber:Number(t),rotationRateMostRecent:n,rotationRate:o})),ie(String(Number(oe)-ke($)))}catch(i){alert(i)}}()},children:"\u56de\u8ee2"}),Object(c.jsx)(R,{variant:"primary",className:"col-4",onClick:function(){return function(){try{if(""===a)throw C;w(u.concat({type:N,rotationNumber:Number(a),rotationRateMostRecent:0,rotationRate:M})),ye()}catch(e){alert(e)}}()},children:"\u7d99\u7d9a\u30b9\u30bf\u30fc\u30c8"}),Object(c.jsx)(R,{id:"resetStartButton",variant:"primary",className:"col-4",onClick:function(){return function(){try{if(Se())throw y;if(""===a)throw C;if(""===Ne.current.value)throw k;w(u.concat({type:v,rotationNumber:Number(a),rotationRateMostRecent:0,rotationRate:0})),ye(),localStorage.setItem("startTime",Object(x.a)(new Date,"HH:mm"))}catch(e){alert(e)}}()},children:"\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8"})]}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(f.a,{size:"sm",children:[Object(c.jsx)(f.a.Prepend,{children:Object(c.jsx)(f.a.Text,{children:"\u78ba\u8a8d\u7528\u7389\u6570"})}),Object(c.jsx)(h.a,{value:oe,onChange:function(e){var t=e.target.value;ie(t)},type:"number"})]})}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(f.a,{size:"sm",children:[Object(c.jsx)(f.a.Prepend,{children:Object(c.jsx)(f.a.Text,{children:"\u30dc\u30fc\u30c0\u30fc"})}),Object(c.jsx)(h.a,{value:U,onChange:function(e){W(e.target.value)}})]})}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(f.a,{size:"sm",children:[Object(c.jsx)(f.a.Prepend,{children:Object(c.jsx)(f.a.Text,{children:"\u5e97\u540d"})}),Object(c.jsx)(p.a.Control,{as:"select",value:$,onChange:function(e){_(e.target.value)},ref:Ne,children:Re})]})}),Object(c.jsxs)(O.a,{children:[Object(c.jsx)("div",{className:"mr-2",children:"\u4ea4\u63db\u7387:"}),Object(c.jsx)("div",{children:pe})]}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(f.a,{size:"sm",children:[Object(c.jsx)(f.a.Prepend,{children:Object(c.jsx)(f.a.Text,{children:"\u6a5f\u7a2e\u540d"})}),Object(c.jsx)(h.a,{value:ae,onChange:function(e){var t=e.target.value;ce(t),localStorage.setItem("machineName",t)}})]})}),Object(c.jsx)(O.a,{children:Object(c.jsxs)(f.a,{size:"sm",children:[Object(c.jsx)(f.a.Prepend,{children:Object(c.jsx)(f.a.Text,{children:"\u5099\u8003"})}),Object(c.jsx)(p.a.Control,{as:"textarea",rows:2,value:ue,onChange:function(e){var t=e.target.value;je(t)}})]})}),Object(c.jsx)(O.a,{children:Object(c.jsx)(j.a,{className:"mt-5",variant:"primary",onClick:function(){return function(){var e=new Date,t=Object(x.a)(e,"yyyy/MM/dd"),a=localStorage.getItem("startTime"),c=Object(x.a)(e,"HH:mm"),n=new URLSearchParams;n.append("date","".concat(t," ").concat(a,"\u301c").concat(c)),n.append("border","\u30dc\u30fc\u30c0\u30fc\uff1a".concat(U)),n.append("rotationRate","\u56de\u8ee2\u7387\uff1a".concat(M)),n.append("rotationUnitPrice","\u56de\u8ee2\u5358\u4fa1\uff1a".concat(ve)),n.append("rotationNumberTotal","\u7dcf\u56de\u8ee2\u6570\uff1a".concat(B)),n.append("workAmount","".concat(Ce())),n.append("machineName","".concat(ae)),n.append("storeName","".concat($)),n.append("remarks","".concat(ue)),I.post("https://script.google.com/macros/s/AKfycbwAEFQ6VWnrJ67EjQiYd8WeEv0D2ogBpV2GYDgxucx9C5gf1Dmd/exec",n).then((function(e){alert("\u66f8\u8fbc\u304c\u6210\u529f\u3057\u307e\u3057\u305f\u3002")})).catch((function(e){alert(e)}))}()},children:"\u30b7\u30fc\u30c8\u66f8\u8fbc"})}),Object(c.jsx)(O.a,{children:Object(c.jsx)(j.a,{className:"allDeteleBtn",variant:"primary",onClick:function(){window.confirm("\u5168\u884c\u524a\u9664\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b\uff1f")&&(w([]),D(0),F(0),L(0))},children:"\u5168\u884c\u524a\u9664"})})]}),Object(c.jsx)(d.a,{children:Object(c.jsx)(b.a,{className:"rotationList",ref:ge,children:Te})})]})})})};o.a.render(Object(c.jsx)(E,{}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.2f461e78.chunk.js.map