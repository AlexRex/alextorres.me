import{B as t,C as n,_ as e,a as r,b as a,c as s,i as c,s as o,d as i,S as u,f,t as l,k as h,l as v,m as p,h as d,o as m,p as g,r as j,v as y,e as x,q as D,j as E,z as R,A as k}from"./client.5aa76d1d.js";function H(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,s=r(t);if(n){var c=r(this).constructor;e=Reflect.construct(s,arguments,c)}else e=s.apply(this,arguments);return a(this,e)}}function b(t,n,e){var r=t.slice();return r[3]=n[e],r}function w(t){var n,e,r,a,s=t[3]+"";return{c:function(){n=f("a"),e=l("#"),r=l(s),a=l("\n       "),this.h()},l:function(t){n=h(t,"A",{href:!0});var c=v(n);e=p(c,"#"),r=p(c,s),c.forEach(d),a=p(t,"\n       "),this.h()},h:function(){m(n,"href","til?tag=".concat(t[3]))},m:function(t,s){g(t,n,s),j(n,e),j(n,r),g(t,a,s)},p:y,d:function(t){t&&d(n),t&&d(a)}}}function L(t){var n,e,r,a,s,c,o,i,u,H,L,S=new Date(t[1].date).toLocaleDateString()+"",z=t[1].title+"",A=t[0].html+"";document.title=n=t[1].title;for(var I=t[2],M=[],T=0;T<I.length;T+=1)M[T]=w(b(t,I,T));return{c:function(){e=x(),r=f("div"),a=f("h3"),s=l(S),c=l(" ·\n    ");for(var t=0;t<M.length;t+=1)M[t].c();o=x(),i=f("h1"),u=l(z),H=x(),L=f("div"),this.h()},l:function(t){D('[data-svelte="svelte-102ozkg"]',document.head).forEach(d),e=E(t),r=h(t,"DIV",{class:!0});var n=v(r);a=h(n,"H3",{class:!0});var f=v(a);s=p(f,S),c=p(f," ·\n    ");for(var l=0;l<M.length;l+=1)M[l].l(f);f.forEach(d),o=E(n),i=h(n,"H1",{class:!0});var m=v(i);u=p(m,z),m.forEach(d),H=E(n),L=h(n,"DIV",{class:!0}),v(L).forEach(d),n.forEach(d),this.h()},h:function(){m(a,"class","svelte-1ev0jt3"),m(i,"class","svelte-1ev0jt3"),m(L,"class","post-html svelte-1ev0jt3"),m(r,"class","content svelte-1ev0jt3")},m:function(t,n){g(t,e,n),g(t,r,n),j(r,a),j(a,s),j(a,c);for(var f=0;f<M.length;f+=1)M[f].m(a,null);j(r,o),j(r,i),j(i,u),j(r,H),j(r,L),L.innerHTML=A},p:function(t,e){var r=R(e,1)[0];if(2&r&&n!==(n=t[1].title)&&(document.title=n),4&r){var s;for(I=t[2],s=0;s<I.length;s+=1){var c=b(t,I,s);M[s]?M[s].p(c,r):(M[s]=w(c),M[s].c(),M[s].m(a,null))}for(;s<M.length;s+=1)M[s].d(1);M.length=I.length}1&r&&A!==(A=t[0].html+"")&&(L.innerHTML=A)},i:y,o:y,d:function(t){t&&d(e),t&&d(r),k(M,t)}}}function S(t){return z.apply(this,arguments)}function z(){return(z=t(n.mark((function t(e){var r,a,s;return n.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.params,t.next=3,this.fetch("til/".concat(r.slug,".json"));case 3:return a=t.sent,t.next=6,a.json();case 6:if(s=t.sent,200!==a.status){t.next=11;break}return t.abrupt("return",{post:s});case 11:this.error(a.status,s.message);case 12:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function A(t,n,e){var r=n.post,a=r.metadata,s=a.tags.replace(/ /g,"").split(",");return t.$set=function(t){"post"in t&&e(0,r=t.post)},[r,a,s]}var I=function(t){e(r,u);var n=H(r);function r(t){var e;return s(this,r),e=n.call(this),c(i(e),t,A,L,o,{post:0}),e}return r}();export default I;export{S as preload};