import{B as t,C as a,_ as e,a as r,b as s,c as o,i as c,s as n,d as i,S as l,e as u,f,t as p,q as h,h as v,j as d,k as m,l as g,m as j,o as E,p as y,r as b,z as R,D as S,v as w}from"./client.da7d00ab.js";function x(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,o=r(t);if(a){var c=r(this).constructor;e=Reflect.construct(o,arguments,c)}else e=o.apply(this,arguments);return s(this,e)}}function D(t){var a,e,r,s,o,c,n,i,l,x,D,F,B,I,P,C,H,O,k,A,M,U,V,q,N,z,G,L,T,$,_,J,K,Q,W,X,Y,Z,tt,at,et,rt,st,ot,ct,nt,it,lt,ut,ft,pt,ht,vt,dt=new Date(t[1].date).toLocaleDateString()+"",mt=t[0].id+"",gt=t[1].cameraBrand+"",jt=t[1].cameraModel+"",Et=t[1].lensModel+"",yt=t[1].exposure+"",bt=t[1].aperture+"",Rt=t[1].iso+"",St=t[1].focal+"";return document.title=a=t[0].id,{c:function(){e=u(),r=f("div"),s=f("h3"),o=p(dt),c=u(),n=f("h1"),i=p(mt),l=u(),x=f("div"),D=f("div"),F=f("picture"),B=f("source"),P=u(),C=f("source"),O=u(),k=f("img"),U=u(),V=f("p"),q=f("span"),N=f("b"),z=p("Hardware:"),G=u(),L=p(gt),T=u(),$=p(jt),_=p(" | "),J=p(Et),K=u(),Q=f("br"),W=u(),X=f("span"),Y=f("b"),Z=p("Setup:"),tt=u(),at=p(yt),et=p(" | "),rt=p(bt),st=p(" | "),ot=p(Rt),ct=p(" | "),nt=p(St),it=u(),lt=f("br"),ut=u(),ft=f("a"),pt=f("b"),ht=p("Original"),this.h()},l:function(t){h('[data-svelte="svelte-1ter1gm"]',document.head).forEach(v),e=d(t),r=m(t,"DIV",{class:!0});var a=g(r);s=m(a,"H3",{class:!0});var u=g(s);o=j(u,dt),u.forEach(v),c=d(a),n=m(a,"H1",{class:!0});var f=g(n);i=j(f,mt),f.forEach(v),a.forEach(v),l=d(t),x=m(t,"DIV",{class:!0});var p=g(x);D=m(p,"DIV",{class:!0});var E=g(D);F=m(E,"PICTURE",{});var y=g(F);B=m(y,"SOURCE",{srcset:!0,type:!0}),P=d(y),C=m(y,"SOURCE",{srcset:!0,type:!0}),O=d(y),k=m(y,"IMG",{src:!0,alt:!0,class:!0}),y.forEach(v),E.forEach(v),U=d(p),V=m(p,"P",{class:!0});var b=g(V);q=m(b,"SPAN",{});var R=g(q);N=m(R,"B",{});var S=g(N);z=j(S,"Hardware:"),S.forEach(v),G=d(R),L=j(R,gt),T=d(R),$=j(R,jt),_=j(R," | "),J=j(R,Et),R.forEach(v),K=d(b),Q=m(b,"BR",{}),W=d(b),X=m(b,"SPAN",{});var w=g(X);Y=m(w,"B",{});var I=g(Y);Z=j(I,"Setup:"),I.forEach(v),tt=d(w),at=j(w,yt),et=j(w," | "),rt=j(w,bt),st=j(w," | "),ot=j(w,Rt),ct=j(w," | "),nt=j(w,St),w.forEach(v),it=d(b),lt=m(b,"BR",{}),ut=d(b),ft=m(b,"A",{href:!0});var H=g(ft);pt=m(H,"B",{});var A=g(pt);ht=j(A,"Original"),A.forEach(v),H.forEach(v),b.forEach(v),p.forEach(v),this.h()},h:function(){E(s,"class","svelte-193a64j"),E(n,"class","svelte-193a64j"),E(r,"class","header svelte-193a64j"),E(B,"srcset",I=t[0].resolutions[1080].webpFile),E(B,"type","image/webp"),E(C,"srcset",H=t[0].resolutions[1080].jpgFile),E(C,"type","image/jpeg"),k.src!==(A=t[0].resolutions[1080].jpgFile)&&E(k,"src",A),E(k,"alt",M=t[0].metadata.id),E(k,"class","svelte-193a64j"),E(D,"class","photo svelte-193a64j"),E(ft,"href",vt=t[0].resolutions.original.jpgFile),E(V,"class","details svelte-193a64j"),E(x,"class","photo-container svelte-193a64j")},m:function(t,a){y(t,e,a),y(t,r,a),b(r,s),b(s,o),b(r,c),b(r,n),b(n,i),y(t,l,a),y(t,x,a),b(x,D),b(D,F),b(F,B),b(F,P),b(F,C),b(F,O),b(F,k),b(x,U),b(x,V),b(V,q),b(q,N),b(N,z),b(q,G),b(q,L),b(q,T),b(q,$),b(q,_),b(q,J),b(V,K),b(V,Q),b(V,W),b(V,X),b(X,Y),b(Y,Z),b(X,tt),b(X,at),b(X,et),b(X,rt),b(X,st),b(X,ot),b(X,ct),b(X,nt),b(V,it),b(V,lt),b(V,ut),b(V,ft),b(ft,pt),b(pt,ht)},p:function(t,e){var r=R(e,1)[0];1&r&&a!==(a=t[0].id)&&(document.title=a),1&r&&mt!==(mt=t[0].id+"")&&S(i,mt),1&r&&I!==(I=t[0].resolutions[1080].webpFile)&&E(B,"srcset",I),1&r&&H!==(H=t[0].resolutions[1080].jpgFile)&&E(C,"srcset",H),1&r&&k.src!==(A=t[0].resolutions[1080].jpgFile)&&E(k,"src",A),1&r&&M!==(M=t[0].metadata.id)&&E(k,"alt",M),1&r&&vt!==(vt=t[0].resolutions.original.jpgFile)&&E(ft,"href",vt)},i:w,o:w,d:function(t){t&&v(e),t&&v(r),t&&v(l),t&&v(x)}}}function F(t){return B.apply(this,arguments)}function B(){return(B=t(a.mark((function t(e){var r,s,o;return a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.params,e.query,t.next=3,this.fetch("photos/".concat(r.slug,".json"));case 3:return s=t.sent,t.next=6,s.json();case 6:if(o=t.sent,200!==s.status){t.next=11;break}return t.abrupt("return",{photo:o});case 11:this.error(s.status,o.message);case 12:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function I(t,a,e){var r=a.photo,s=r.metadata;return t.$set=function(t){"photo"in t&&e(0,r=t.photo)},[r,s]}var P=function(t){e(r,l);var a=x(r);function r(t){var e;return o(this,r),e=a.call(this),c(i(e),t,I,D,n,{photo:0}),e}return r}();export default P;export{F as preload};
