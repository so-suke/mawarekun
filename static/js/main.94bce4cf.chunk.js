(this.webpackJsonpmawarekun=this.webpackJsonpmawarekun||[]).push([[0],{30:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(2),r=n(0),c=n(14),o=n.n(c),i=(n(30),n(6)),s=n(15),l=n(16),u=(n(31),n(46)),b=n(45),j=n(41),m=n(42),O=n(43),h=n(47),f=n(48),N=n(44),d=function(t){return("0"+t).slice(-2)};function p(){var t=Object(s.a)(["\n  font-size: 0.4rem;\n"]);return p=function(){return t},t}var x=Object(l.a)(u.a)(p());var g=function(){var t=Object(r.useState)(18),e=Object(i.a)(t,2),n=e[0],c=e[1],o=Object(r.useState)(""),s=Object(i.a)(o,2),l=s[0],p=s[1],g=Object(r.useState)([]),v=Object(i.a)(g,2),y=v[0],S=v[1],R=Object(r.useState)(0),C=Object(i.a)(R,2),k=C[0],I=C[1],M=Object(r.useState)(0),w=Object(i.a)(M,2),E=w[0],F=w[1],J=Object(r.useState)(0),T=Object(i.a)(J,2),z=T[0],B=T[1],H=Object(r.useState)(4),P=Object(i.a)(H,2),A=P[0],D=P[1],L=Object(r.useRef)(null),q="normal",G="continueStart",K="resetStart",Q=["7","8","9","4","5","6","1","2","3","0"].map((function(t){return Object(a.jsx)(u.a,{variant:"primary",className:"col-4",onClick:function(){return p(l+t)},children:t},t)})),U=y.map((function(t,e){var n="";return t.type===K?n="".concat(t.rotationNumber," --start--"):t.type===G?n="".concat(t.rotationNumber," > start"):t.type===q&&(n="".concat(t.rotationNumber," ").concat(t.rotationRateMostRecent," ").concat(t.rotationRate)),Object(a.jsx)(b.a.Item,{children:n},e)}));function V(){p("")}function W(){return(X*z).toFixed(0)}Object(r.useEffect)((function(){var t=localStorage.getItem("investmentCnt"),e=localStorage.getItem("rotations");if(null!==t&&null!==e){var n=JSON.parse(e),a=function(t){return t[t.length-1].rotationRate}(n),r=function(t){var e=0;return t.forEach((function(n,a){n.type!==K&&n.type!==G&&(e+=n.rotationNumber-t[a-1].rotationNumber)})),e}(n);I(a),B(r),F(Number(t)),S(n),alert("hi")}}),[]),Object(r.useEffect)((function(){L.current.scrollTop=700,localStorage.setItem("rotations",JSON.stringify(y))}),[y]),Object(r.useEffect)((function(){localStorage.setItem("investmentCnt",""+E)}),[E]);var X=Object(r.useMemo)((function(){return 0===k?0:Number((1e3/n-1e3/k).toFixed(1))}),[n,k]);function Y(){if(!1!==(0!==y.length&&y[0].type===K)){var t=E+1;F(t);var e=A/4,n=y[y.length-1].rotationNumber,a=l;if(a.length<3&&3===String(y[y.length-1].rotationNumber).length){var r=String(y[y.length-1].rotationNumber).slice(0,1),c=String(y[y.length-1].rotationNumber).slice(1,3);a=Number(a)>Number(c)?r+d(Number(a)):String(Number(r)+1)+d(Number(a))}var o=Number(a)-n,i=Number((2*o*e).toFixed(1)),s=z+o;B(s);var u=Number((s*(1e3/(500*t))*e).toFixed(1));console.log(t),I(u),S(y.concat({type:q,rotationNumber:Number(a),rotationRateMostRecent:i,rotationRate:u})),V()}else alert("\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3092\u3057\u307e\u3057\u3087\u3046")}function Z(){var t=function(){var t=Object(N.a)(new Date,"yyyy/MM/dd HH:mm");return"".concat(t,"\n\u56de\u8ee2\u7387\uff1a").concat(k,", \u4ed5\u4e8b\u91cf\uff1a").concat(X,"\u5186\xd7").concat(z,"\u56de(").concat(W(),"\u5186)")}();navigator.clipboard.writeText(t).then((function(){console.log("\u30af\u30ea\u30c3\u30d7\u30dc\u30fc\u30c9\u66f8\u304d\u8fbc\u307f\u6210\u529f")}),(function(){console.log("\u30af\u30ea\u30c3\u30d7\u30dc\u30fc\u30c9\u66f8\u304d\u8fbc\u307f\u6210\u529f")}))}function $(){y.length>0&&y[0].type===K?alert("\u65e2\u306b\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u3059"):""!==l?(S(y.concat({type:K,rotationNumber:Number(l),rotationRateMostRecent:0,rotationRate:0})),V()):alert("\u56de\u8ee2\u6570\u3092\u5165\u529b\u3057\u307e\u3057\u3087\u3046")}return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(j.a,{className:"pt-3",children:Object(a.jsxs)(m.a,{children:[Object(a.jsxs)(O.a,{children:[Object(a.jsxs)("p",{className:"mb-0",children:["\u56de\u8ee2\u5358\u4fa1\uff1a",Object(a.jsx)("span",{children:X})]}),Object(a.jsxs)("p",{className:"mb-0",children:["\u7dcf\u56de\u8ee2\u6570\uff1a",Object(a.jsx)("span",{children:z})]}),Object(a.jsxs)("p",{className:"mb-0",children:["\u4ed5\u4e8b\u91cf\uff1a",Object(a.jsx)("span",{children:W()})]}),Object(a.jsxs)(m.a,{children:[Object(a.jsx)(u.a,{className:"mr-1 mb-1",variant:"primary",onClick:function(){return Z()},children:"\u30b3\u30d4\u30fc"}),Object(a.jsx)(u.a,{className:"mb-1",variant:"primary",onClick:function(){return function(){var t=y.length;if(0!==t){var e=y[y.length-1];e.type===q&&F(E-1);var n=y.filter((function(e,n){return n!==t-1}));if(1===n.length||0===n.length?I(0):I(n[n.length-1].rotationRate),e.type===q&&n.length>0){var a=y[y.length-1].rotationNumber-n[n.length-1].rotationNumber;B(z-a)}S(n)}}()},children:"1\u884c\u524a\u9664"})]}),Object(a.jsx)(h.a,{className:"mb-1",id:"rotationNumberInput",value:l,onChange:function(t){p(t.target.value)},placeholder:"\u56de\u8ee2\u6570\u5165\u529b"}),Object(a.jsxs)(m.a,{className:"m-0 mb-2",children:[Q,Object(a.jsx)(u.a,{variant:"primary",className:"col-4",onClick:function(){return V()},children:"C"}),Object(a.jsx)(u.a,{variant:"primary",className:"col-4"}),Object(a.jsx)(u.a,{variant:"primary",className:"col-4",onClick:function(){return Y()},children:"\u56de\u8ee2"}),Object(a.jsx)(x,{variant:"primary",className:"col-4",onClick:function(){""!==l?(S(y.concat({type:G,rotationNumber:Number(l),rotationRateMostRecent:0,rotationRate:k})),V()):alert("\u56de\u8ee2\u6570\u3092\u5165\u529b\u3057\u307e\u3057\u3087\u3046")},children:"\u7d99\u7d9a\u30b9\u30bf\u30fc\u30c8"}),Object(a.jsx)(x,{id:"resetStartButton",variant:"primary",className:"col-4",onClick:function(){return $()},children:"\u30ea\u30bb\u30c3\u30c8\u30b9\u30bf\u30fc\u30c8"})]}),Object(a.jsx)(m.a,{children:Object(a.jsxs)(f.a,{size:"sm",children:[Object(a.jsx)(f.a.Prepend,{children:Object(a.jsx)(f.a.Text,{children:"\u30dc\u30fc\u30c0\u30fc"})}),Object(a.jsx)(h.a,{value:n,onChange:function(t){c(Number(t.target.value))}})]})}),Object(a.jsx)(m.a,{children:Object(a.jsxs)(f.a,{size:"sm",children:[Object(a.jsx)(f.a.Prepend,{children:Object(a.jsx)(f.a.Text,{children:"\u4ea4\u63db\u7387"})}),Object(a.jsx)(h.a,{value:A,onChange:function(t){D(Number(t.target.value))}})]})})]}),Object(a.jsx)(O.a,{children:Object(a.jsx)(b.a,{className:"rotationList",ref:L,children:U})})]})})})};o.a.render(Object(a.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.94bce4cf.chunk.js.map