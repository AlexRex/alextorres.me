import{S as t,i as e,s,e as a,t as l,a as r,f as n,g as o,h,d as c,b as i,k as f,l as u,m as d,w as g,q as m,o as p,z as v}from"./client.c0dbe0b4.js";function y(t,e,s){const a=t.slice();return a[2]=e[s],a}function E(t){let e,s,m,p,v,y,E,b,I=t[2].title+"",L=t[2].summary+"";return{c(){e=a("li"),s=a("a"),m=l(I),v=r(),y=a("p"),E=l(L),b=r(),this.h()},l(t){e=n(t,"LI",{});var a=o(e);s=n(a,"A",{rel:!0,href:!0});var l=o(s);m=h(l,I),l.forEach(c),v=i(a),y=n(a,"P",{class:!0});var r=o(y);E=h(r,L),r.forEach(c),b=i(a),a.forEach(c),this.h()},h(){f(s,"rel","prefetch"),f(s,"href",p="til/"+t[2].slug),f(y,"class","summary svelte-lqye5e")},m(t,a){u(t,e,a),d(e,s),d(s,m),d(e,v),d(e,y),d(y,E),d(e,b)},p(t,e){1&e&&I!==(I=t[2].title+"")&&g(m,I),1&e&&p!==(p="til/"+t[2].slug)&&f(s,"href",p),1&e&&L!==(L=t[2].summary+"")&&g(E,L)},d(t){t&&c(e)}}}function b(t){let e,s,b,I,L,j,q,x=t[1]?" about "+t[1]:"",T=t[0],k=[];for(let e=0;e<T.length;e+=1)k[e]=E(y(t,T,e));return{c(){e=r(),s=a("div"),b=a("h1"),I=l("Today I Learned"),L=l(x),j=r(),q=a("ul");for(let t=0;t<k.length;t+=1)k[t].c();this.h()},l(t){m('[data-svelte="svelte-1yh09ts"]',document.head).forEach(c),e=i(t),s=n(t,"DIV",{class:!0});var a=o(s);b=n(a,"H1",{});var l=o(b);I=h(l,"Today I Learned"),L=h(l,x),l.forEach(c),j=i(a),q=n(a,"UL",{});var r=o(q);for(let t=0;t<k.length;t+=1)k[t].l(r);r.forEach(c),a.forEach(c),this.h()},h(){document.title="Today I Learned",f(s,"class","content svelte-lqye5e")},m(t,a){u(t,e,a),u(t,s,a),d(s,b),d(b,I),d(b,L),d(s,j),d(s,q);for(let t=0;t<k.length;t+=1)k[t].m(q,null)},p(t,[e]){if(2&e&&x!==(x=t[1]?" about "+t[1]:"")&&g(L,x),1&e){let s;for(T=t[0],s=0;s<T.length;s+=1){const a=y(t,T,s);k[s]?k[s].p(a,e):(k[s]=E(a),k[s].c(),k[s].m(q,null))}for(;s<k.length;s+=1)k[s].d(1);k.length=T.length}},i:p,o:p,d(t){t&&c(e),t&&c(s),v(k,t)}}}function I({params:t,query:e,path:s}){const{tag:a}=e,l=a?"til.json?tag="+a:"til.json";return this.fetch(l).then(t=>t.json()).then(t=>({posts:t,tag:a}))}function L(t,e,s){let{posts:a}=e,{tag:l}=e;return t.$set=t=>{"posts"in t&&s(0,a=t.posts),"tag"in t&&s(1,l=t.tag)},[a,l]}export default class extends t{constructor(t){super(),e(this,t,L,b,s,{posts:0,tag:1})}}export{I as preload};
