function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function e(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function r(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var e=[],r=!0,o=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(r=(a=c.next()).done)&&(e.push(a.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return e}}(t,n)||e(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o,i=function(t,n,e){return t(e={path:n,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&e.path)}},e.exports),e.exports}((function(n){var e=function(n){var e=Object.prototype,r=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,n,e,r){var o=n&&n.prototype instanceof l?n:l,i=Object.create(o.prototype),a=new E(r||[]);return i._invoke=function(t,n,e){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return S()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=$(a,e);if(c){if(c===f)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var u=s(t,n,e);if("normal"===u.type){if(r=e.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(r="completed",e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function s(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=u;var f={};function l(){}function p(){}function h(){}var v={};v[i]=function(){return this};var d=Object.getPrototypeOf,m=d&&d(d(_([])));m&&m!==e&&r.call(m,i)&&(v=m);var y=h.prototype=l.prototype=Object.create(v);function g(t){["next","throw","return"].forEach((function(n){t[n]=function(t){return this._invoke(n,t)}}))}function b(n,e){var o;this._invoke=function(i,a){function c(){return new e((function(o,c){!function o(i,a,c,u){var f=s(n[i],n,a);if("throw"!==f.type){var l=f.arg,p=l.value;return p&&"object"===t(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){o("next",t,c,u)}),(function(t){o("throw",t,c,u)})):e.resolve(p).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,u)}))}u(f.arg)}(i,a,o,c)}))}return o=o?o.then(c,c):c()}}function $(t,n){var e=t.iterator[n.method];if(void 0===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,$(t,n),"throw"===n.method))return f;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=s(e,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,f;var o=r.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,f):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,f)}function x(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function w(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function _(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,o=function n(){for(;++e<t.length;)if(r.call(t,e))return n.value=t[e],n.done=!1,n;return n.value=void 0,n.done=!0,n};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return p.prototype=y.constructor=h,h.constructor=p,h[c]=p.displayName="GeneratorFunction",n.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===p||"GeneratorFunction"===(n.displayName||n.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(y),t},n.awrap=function(t){return{__await:t}},g(b.prototype),b.prototype[a]=function(){return this},n.AsyncIterator=b,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new b(u(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(y),y[c]="Generator",y[i]=function(){return this},y.toString=function(){return"[object Generator]"},n.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},n.values=_,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function e(e,r){return a.type="throw",a.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=n,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),f},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),w(e),f}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;w(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:_(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),f}},n}(n.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));function a(t,n,e,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?n(u):Promise.resolve(u).then(r,o)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var i=t.apply(n,e);function c(t){a(i,r,o,c,u,"next",t)}function u(t){a(i,r,o,c,u,"throw",t)}c(void 0)}))}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,n){return(s=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function f(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&s(t,n)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(n,e){return!e||"object"!==t(e)&&"function"!=typeof e?l(n):e}function h(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||e(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function d(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(){}function y(t,n){for(var e in n)t[e]=n[e];return t}function g(t){return t()}function b(){return Object.create(null)}function $(t){t.forEach(g)}function x(t){return"function"==typeof t}function w(n,e){return n!=n?e==e:n!==e||n&&"object"===t(n)||"function"==typeof n}function E(t,n,e,r){if(t){var o=_(t,n,e,r);return t[0](o)}}function _(t,n,e,r){return t[1]&&r?y(e.ctx.slice(),t[1](r(n))):e.ctx}function S(n,e,r,o){if(n[2]&&o){var i=n[2](o(r));if(void 0===e.dirty)return i;if("object"===t(i)){for(var a=[],c=Math.max(e.dirty.length,i.length),u=0;u<c;u+=1)a[u]=e.dirty[u]|i[u];return a}return e.dirty|i}return e.dirty}function R(t,n){t.appendChild(n)}function L(t,n,e){t.insertBefore(n,e||null)}function j(t){t.parentNode.removeChild(t)}function P(t,n){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function A(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function O(){return k(" ")}function C(){return k("")}function D(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function N(t){return Array.from(t.childNodes)}function q(t,n,e,r){for(var o=0;o<t.length;o+=1){var i=t[o];if(i.nodeName===n){for(var a=0;a<i.attributes.length;){var c=i.attributes[a];e[c.name]?a++:i.removeAttribute(c.name)}return t.splice(o,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):A(n)}function I(t,n){for(var e=0;e<t.length;e+=1){var r=t[e];if(3===r.nodeType)return r.data=""+n,t.splice(e,1)[0]}return k(n)}function T(t){return I(t," ")}function U(t,n){n=""+n,t.data!==n&&(t.data=n)}function H(t,n,e,r){t.style.setProperty(n,e,r?"important":"")}function G(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;return Array.from(n.querySelectorAll(t))}function F(t){o=t}function z(){if(!o)throw new Error("Function called outside component initialization");return o}var V=[],B=[],Y=[],J=[],M=Promise.resolve(),K=!1;function W(t){Y.push(t)}var X=!1,Q=new Set;function Z(){if(!X){X=!0;do{for(var t=0;t<V.length;t+=1){var n=V[t];F(n),tt(n.$$)}for(V.length=0;B.length;)B.pop()();for(var e=0;e<Y.length;e+=1){var r=Y[e];Q.has(r)||(Q.add(r),r())}Y.length=0}while(V.length);for(;J.length;)J.pop()();K=!1,X=!1,Q.clear()}}function tt(t){if(null!==t.fragment){t.update(),$(t.before_update);var n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(W)}}var nt,et=new Set;function rt(){nt={r:0,c:[],p:nt}}function ot(){nt.r||$(nt.c),nt=nt.p}function it(t,n){t&&t.i&&(et.delete(t),t.i(n))}function at(t,n,e,r){if(t&&t.o){if(et.has(t))return;et.add(t),nt.c.push((function(){et.delete(t),r&&(e&&t.d(1),r())})),t.o(n)}}function ct(t,n){for(var e={},r={},o={$$scope:1},i=t.length;i--;){var a=t[i],c=n[i];if(c){for(var u in a)u in c||(r[u]=1);for(var s in c)o[s]||(e[s]=c[s],o[s]=1);t[i]=c}else for(var f in a)o[f]=1}for(var l in r)l in e||(e[l]=void 0);return e}function ut(n){return"object"===t(n)&&null!==n?n:{}}function st(t){t&&t.c()}function ft(t,n){t&&t.l(n)}function lt(t,n,e){var r=t.$$,o=r.fragment,i=r.on_mount,a=r.on_destroy,c=r.after_update;o&&o.m(n,e),W((function(){var n=i.map(g).filter(x);a?a.push.apply(a,h(n)):$(n),t.$$.on_mount=[]})),c.forEach(W)}function pt(t,n){var e=t.$$;null!==e.fragment&&($(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ht(t,n){-1===t.$$.dirty[0]&&(V.push(t),K||(K=!0,M.then(Z)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function vt(t,n,e,r,i,a){var c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[-1],u=o;F(t);var s=n.props||{},f=t.$$={fragment:null,ctx:null,props:a,update:m,not_equal:i,bound:b(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:b(),dirty:c},l=!1;if(f.ctx=e?e(t,s,(function(n,e){var r=!(arguments.length<=2)&&arguments.length-2?arguments.length<=2?void 0:arguments[2]:e;return f.ctx&&i(f.ctx[n],f.ctx[n]=r)&&(f.bound[n]&&f.bound[n](r),l&&ht(t,n)),e})):[],f.update(),l=!0,$(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){var p=N(n.target);f.fragment&&f.fragment.l(p),p.forEach(j)}else f.fragment&&f.fragment.c();n.intro&&it(t.$$.fragment),lt(t,n.target,n.anchor),Z()}F(u)}var dt=function(){function t(){v(this,t)}var n,e,r;return n=t,(e=[{key:"$destroy",value:function(){pt(this,1),this.$destroy=m}},{key:"$on",value:function(t,n){var e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),function(){var t=e.indexOf(n);-1!==t&&e.splice(t,1)}}},{key:"$set",value:function(){}}])&&d(n.prototype,e),r&&d(n,r),t}(),mt=[];function yt(t){var n,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,r=[];function o(e){if(w(t,e)&&(t=e,n)){for(var o=!mt.length,i=0;i<r.length;i+=1){var a=r[i];a[1](),mt.push(a,t)}if(o){for(var c=0;c<mt.length;c+=2)mt[c][0](mt[c+1]);mt.length=0}}}function i(n){o(n(t))}function a(i){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,c=[i,a];return r.push(c),1===r.length&&(n=e(o)||m),i(t),function(){var t=r.indexOf(c);-1!==t&&r.splice(t,1),0===r.length&&(n(),n=null)}}return{set:o,update:i,subscribe:a}}var gt={},bt=function(){return{}};function $t(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function xt(t){var n,e;return{c:function(){n=A("a"),e=k(t[2]),this.h()},l:function(r){var o=N(n=q(r,"A",{style:!0,href:!0,class:!0}));e=I(o,t[2]),o.forEach(j),this.h()},h:function(){H(n,"--theme-color",t[1]),H(n,"--theme-content",'"'.concat(t[2],'"')),D(n,"href",t[0]),D(n,"class","svelte-1a59aal")},m:function(t,r){L(t,n,r),R(n,e)},p:function(t,o){var i=r(o,1)[0];4&i&&U(e,t[2]),2&i&&H(n,"--theme-color",t[1]),4&i&&H(n,"--theme-content",'"'.concat(t[2],'"')),1&i&&D(n,"href",t[0])},i:m,o:m,d:function(t){t&&j(n)}}}function wt(t,n,e){var r=n.url,o=n.color,i=n.text;return t.$set=function(t){"url"in t&&e(0,r=t.url),"color"in t&&e(1,o=t.color),"text"in t&&e(2,i=t.text)},[r,o,i]}var Et=function(t){f(e,dt);var n=$t(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,wt,xt,w,{url:0,color:1,text:2}),r}return e}();function _t(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function St(t){var n,e,r,o,i,a,c,u,s,f,l,p=new Et({props:{url:"/",color:"rgba(166, 186, 61, 0.5)",text:"alex torres"}}),h=new Et({props:{url:"/bio",color:"rgba(254, 101, 1, 0.7)",text:"bio"}}),v=new Et({props:{url:"/til",color:"rgba(255, 237, 13, 1)",text:"til"}}),d=new Et({props:{url:"/photos",color:"rgba(208, 13, 255, 0.5)",text:"photos"}});return{c:function(){n=A("nav"),e=A("div"),r=A("h1"),st(p.$$.fragment),o=O(),i=A("div"),a=A("h2"),st(h.$$.fragment),c=O(),u=A("h2"),st(v.$$.fragment),s=O(),f=A("h2"),st(d.$$.fragment),this.h()},l:function(t){var l=N(n=q(t,"NAV",{class:!0})),m=N(e=q(l,"DIV",{class:!0})),y=N(r=q(m,"H1",{}));ft(p.$$.fragment,y),y.forEach(j),m.forEach(j),o=T(l);var g=N(i=q(l,"DIV",{class:!0})),b=N(a=q(g,"H2",{class:!0}));ft(h.$$.fragment,b),b.forEach(j),c=T(g);var $=N(u=q(g,"H2",{class:!0}));ft(v.$$.fragment,$),$.forEach(j),s=T(g);var x=N(f=q(g,"H2",{class:!0}));ft(d.$$.fragment,x),x.forEach(j),g.forEach(j),l.forEach(j),this.h()},h:function(){D(e,"class","name svelte-6s1izy"),D(a,"class","svelte-6s1izy"),D(u,"class","svelte-6s1izy"),D(f,"class","svelte-6s1izy"),D(i,"class","links svelte-6s1izy"),D(n,"class","svelte-6s1izy")},m:function(t,m){L(t,n,m),R(n,e),R(e,r),lt(p,r,null),R(n,o),R(n,i),R(i,a),lt(h,a,null),R(i,c),R(i,u),lt(v,u,null),R(i,s),R(i,f),lt(d,f,null),l=!0},p:m,i:function(t){l||(it(p.$$.fragment,t),it(h.$$.fragment,t),it(v.$$.fragment,t),it(d.$$.fragment,t),l=!0)},o:function(t){at(p.$$.fragment,t),at(h.$$.fragment,t),at(v.$$.fragment,t),at(d.$$.fragment,t),l=!1},d:function(t){t&&j(n),pt(p),pt(h),pt(v),pt(d)}}}var Rt=function(t){f(e,dt);var n=_t(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,null,St,w,{}),r}return e}();function Lt(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function jt(t){var n,e,r,o=(new Date).getFullYear()+"";return{c:function(){n=A("div"),e=k(o),r=k(" Alex Torres"),this.h()},l:function(t){var i=N(n=q(t,"DIV",{class:!0}));e=I(i,o),r=I(i," Alex Torres"),i.forEach(j),this.h()},h:function(){D(n,"class","svelte-1p9jtq9")},m:function(t,o){L(t,n,o),R(n,e),R(n,r)},p:m,i:m,o:m,d:function(t){t&&j(n)}}}var Pt=function(t){f(e,dt);var n=Lt(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,null,jt,w,{}),r}return e}();function At(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function kt(t){var n,e,o,i,a=new Rt({}),c=t[1].default,u=E(c,t,t[0],null),s=new Pt({});return{c:function(){st(a.$$.fragment),n=O(),e=A("main"),u&&u.c(),o=O(),st(s.$$.fragment),this.h()},l:function(t){ft(a.$$.fragment,t),n=T(t);var r=N(e=q(t,"MAIN",{class:!0}));u&&u.l(r),r.forEach(j),o=T(t),ft(s.$$.fragment,t),this.h()},h:function(){D(e,"class","svelte-ggff4g")},m:function(t,r){lt(a,t,r),L(t,n,r),L(t,e,r),u&&u.m(e,null),L(t,o,r),lt(s,t,r),i=!0},p:function(t,n){var e=r(n,1)[0];u&&u.p&&1&e&&u.p(_(c,t,t[0],null),S(c,t[0],e,null))},i:function(t){i||(it(a.$$.fragment,t),it(u,t),it(s.$$.fragment,t),i=!0)},o:function(t){at(a.$$.fragment,t),at(u,t),at(s.$$.fragment,t),i=!1},d:function(t){pt(a,t),t&&j(n),t&&j(e),u&&u.d(t),t&&j(o),pt(s,t)}}}function Ot(t,n,e){var r=n.$$slots,o=void 0===r?{}:r,i=n.$$scope;return t.$set=function(t){"$$scope"in t&&e(0,i=t.$$scope)},[i,o]}var Ct=function(t){f(e,dt);var n=At(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,Ot,kt,w,{}),r}return e}();function Dt(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function Nt(t){var n,e,r=t[1].stack+"";return{c:function(){n=A("pre"),e=k(r)},l:function(t){var o=N(n=q(t,"PRE",{}));e=I(o,r),o.forEach(j)},m:function(t,r){L(t,n,r),R(n,e)},p:function(t,n){2&n&&r!==(r=t[1].stack+"")&&U(e,r)},d:function(t){t&&j(n)}}}function qt(t){var n,e,o,i,a,c,u,s,f,l=t[1].message+"";document.title=n=t[0];var p=t[2]&&t[1].stack&&Nt(t);return{c:function(){e=O(),o=A("h1"),i=k(t[0]),a=O(),c=A("p"),u=k(l),s=O(),p&&p.c(),f=C(),this.h()},l:function(n){G('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(j),e=T(n);var r=N(o=q(n,"H1",{class:!0}));i=I(r,t[0]),r.forEach(j),a=T(n);var h=N(c=q(n,"P",{class:!0}));u=I(h,l),h.forEach(j),s=T(n),p&&p.l(n),f=C(),this.h()},h:function(){D(o,"class","svelte-8od9u6"),D(c,"class","svelte-8od9u6")},m:function(t,n){L(t,e,n),L(t,o,n),R(o,i),L(t,a,n),L(t,c,n),R(c,u),L(t,s,n),p&&p.m(t,n),L(t,f,n)},p:function(t,e){var o=r(e,1)[0];1&o&&n!==(n=t[0])&&(document.title=n),1&o&&U(i,t[0]),2&o&&l!==(l=t[1].message+"")&&U(u,l),t[2]&&t[1].stack?p?p.p(t,o):((p=Nt(t)).c(),p.m(f.parentNode,f)):p&&(p.d(1),p=null)},i:m,o:m,d:function(t){t&&j(e),t&&j(o),t&&j(a),t&&j(c),t&&j(s),p&&p.d(t),t&&j(f)}}}function It(t,n,e){var r=n.status,o=n.error;return t.$set=function(t){"status"in t&&e(0,r=t.status),"error"in t&&e(1,o=t.error)},[r,o,!1]}var Tt=function(t){f(e,dt);var n=Dt(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,It,qt,w,{status:0,error:1}),r}return e}();function Ut(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=u(t);if(n){var o=u(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return p(this,e)}}function Ht(t){var n,e,r=[t[4].props],o=t[4].component;function i(t){for(var n={},e=0;e<r.length;e+=1)n=y(n,r[e]);return{props:n}}if(o)var a=new o(i());return{c:function(){a&&st(a.$$.fragment),n=C()},l:function(t){a&&ft(a.$$.fragment,t),n=C()},m:function(t,r){a&&lt(a,t,r),L(t,n,r),e=!0},p:function(t,e){var c=16&e?ct(r,[ut(t[4].props)]):{};if(o!==(o=t[4].component)){if(a){rt();var u=a;at(u.$$.fragment,1,0,(function(){pt(u,1)})),ot()}o?(st((a=new o(i())).$$.fragment),it(a.$$.fragment,1),lt(a,n.parentNode,n)):a=null}else o&&a.$set(c)},i:function(t){e||(a&&it(a.$$.fragment,t),e=!0)},o:function(t){a&&at(a.$$.fragment,t),e=!1},d:function(t){t&&j(n),a&&pt(a,t)}}}function Gt(t){var n,e=new Tt({props:{error:t[0],status:t[1]}});return{c:function(){st(e.$$.fragment)},l:function(t){ft(e.$$.fragment,t)},m:function(t,r){lt(e,t,r),n=!0},p:function(t,n){var r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i:function(t){n||(it(e.$$.fragment,t),n=!0)},o:function(t){at(e.$$.fragment,t),n=!1},d:function(t){pt(e,t)}}}function Ft(t){var n,e,r,o,i=[Gt,Ht],a=[];function c(t,n){return t[0]?0:1}return n=c(t),e=a[n]=i[n](t),{c:function(){e.c(),r=C()},l:function(t){e.l(t),r=C()},m:function(t,e){a[n].m(t,e),L(t,r,e),o=!0},p:function(t,o){var u=n;(n=c(t))===u?a[n].p(t,o):(rt(),at(a[u],1,1,(function(){a[u]=null})),ot(),(e=a[n])||(e=a[n]=i[n](t)).c(),it(e,1),e.m(r.parentNode,r))},i:function(t){o||(it(e),o=!0)},o:function(t){at(e),o=!1},d:function(t){a[n].d(t),t&&j(r)}}}function zt(t){for(var n,e=[{segment:t[2][0]},t[3].props],o={$$slots:{default:[Ft]},$$scope:{ctx:t}},i=0;i<e.length;i+=1)o=y(o,e[i]);var a=new Ct({props:o});return{c:function(){st(a.$$.fragment)},l:function(t){ft(a.$$.fragment,t)},m:function(t,e){lt(a,t,e),n=!0},p:function(t,n){var o=r(n,1)[0],i=12&o?ct(e,[4&o&&{segment:t[2][0]},8&o&&ut(t[3].props)]):{};147&o&&(i.$$scope={dirty:o,ctx:t}),a.$set(i)},i:function(t){n||(it(a.$$.fragment,t),n=!0)},o:function(t){at(a.$$.fragment,t),n=!1},d:function(t){pt(a,t)}}}function Vt(t,n,e){var r,o,i,a=n.stores,c=n.error,u=n.status,s=n.segments,f=n.level0,l=n.level1,p=void 0===l?null:l,h=n.notify;return r=h,z().$$.after_update.push(r),o=gt,i=a,z().$$.context.set(o,i),t.$set=function(t){"stores"in t&&e(5,a=t.stores),"error"in t&&e(0,c=t.error),"status"in t&&e(1,u=t.status),"segments"in t&&e(2,s=t.segments),"level0"in t&&e(3,f=t.level0),"level1"in t&&e(4,p=t.level1),"notify"in t&&e(6,h=t.notify)},[c,u,s,f,p,a,h]}var Bt,Yt=function(t){f(e,dt);var n=Ut(e);function e(t){var r;return v(this,e),vt(l(r=n.call(this)),t,Vt,zt,w,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6}),r}return e}(),Jt=[/^\/photos\.json$/,/^\/photos\/([^\/]+?)\.json$/,/^\/til\.json$/,/^\/til\/([^\/]+?)\.json$/],Mt=[{js:function(){return import("./index.db8d0125.js")},css:[]},{js:function(){return import("./index.5983dc79.js")},css:[]},{js:function(){return import("./[slug].20c0cf74.js")},css:[]},{js:function(){return import("./bio.846a84e6.js")},css:[]},{js:function(){return import("./index.1406d963.js")},css:[]},{js:function(){return import("./[slug].3c959d23.js")},css:[]}],Kt=(Bt=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/photos\/?$/,parts:[{i:1}]},{pattern:/^\/photos\/([^\/]+?)\/?$/,parts:[null,{i:2,params:function(t){return{slug:Bt(t[1])}}}]},{pattern:/^\/bio\/?$/,parts:[{i:3}]},{pattern:/^\/til\/?$/,parts:[{i:4}]},{pattern:/^\/til\/([^\/]+?)\/?$/,parts:[null,{i:5,params:function(t){return{slug:Bt(t[1])}}}]}]);function Wt(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{replaceState:!1},e=yn(new URL(t,document.baseURI));return e?(vn[n.replaceState?"replaceState":"pushState"]({id:fn},"",t),bn(e,null).then((function(){}))):(location.href=t,new Promise((function(t){})))}var Xt,Qt,Zt,tn,nn,en="undefined"!=typeof __SAPPER__&&__SAPPER__,rn=!1,on=[],an="{}",cn={page:function(t){var n=yt(t),e=!0;return{notify:function(){e=!0,n.update((function(t){return t}))},set:function(t){e=!1,n.set(t)},subscribe:function(t){var r;return n.subscribe((function(n){(void 0===r||e&&n!==r)&&t(r=n)}))}}}({}),preloading:yt(null),session:yt(en&&en.session)};cn.session.subscribe(function(){var t=c(i.mark((function t(n){var e,r,o,a,c,u;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(tn=n,rn){t.next=3;break}return t.abrupt("return");case 3:return nn=!0,e=yn(new URL(location.href)),r=Qt={},t.next=8,_n(e);case 8:if(o=t.sent,a=o.redirect,c=o.props,u=o.branch,r===Qt){t.next=14;break}return t.abrupt("return");case 14:return t.next=16,xn(a,u,c,e.page);case 16:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}());var un,sn=null;var fn,ln=1;var pn,hn,vn="undefined"!=typeof history?history:{pushState:function(t,n,e){},replaceState:function(t,n,e){},scrollRestoration:""},dn={};function mn(n){var e=Object.create(null);return n.length>0&&n.slice(1).split("&").forEach((function(n){var o=r(/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(n.replace(/\+/g," "))),3),i=o[1],a=o[2],c=void 0===a?"":a;"string"==typeof e[i]&&(e[i]=[e[i]]),"object"===t(e[i])?e[i].push(c):e[i]=c})),e}function yn(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(en.baseUrl))return null;var n=t.pathname.slice(en.baseUrl.length);if(""===n&&(n="/"),!Jt.some((function(t){return t.test(n)})))for(var e=0;e<Kt.length;e+=1){var r=Kt[e],o=r.pattern.exec(n);if(o){var i=mn(t.search),a=r.parts[r.parts.length-1],c=a.params?a.params(o):{},u={host:location.host,path:n,query:i,params:c};return{href:t.href,route:r,match:o,page:u}}}}function gn(){return{x:pageXOffset,y:pageYOffset}}function bn(t,n,e,r){return $n.apply(this,arguments)}function $n(){return($n=c(i.mark((function t(n,e,r,o){var a,c,u,s,f,l,p,h,v;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e?fn=e:(a=gn(),dn[fn]=a,e=fn=++ln,dn[fn]=r?a:{x:0,y:0}),fn=e,Xt&&cn.preloading.set(!0),c=sn&&sn.href===n.href?sn.promise:_n(n),sn=null,u=Qt={},t.next=8,c;case 8:if(s=t.sent,f=s.redirect,l=s.props,p=s.branch,u===Qt){t.next=14;break}return t.abrupt("return");case 14:return t.next=16,xn(f,p,l,n.page);case 16:document.activeElement&&document.activeElement.blur(),r||(h=dn[e],o&&(v=document.getElementById(o.slice(1)))&&(h={x:0,y:v.getBoundingClientRect().top+scrollY}),dn[fn]=h,h&&scrollTo(h.x,h.y));case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function xn(t,n,e,r){return wn.apply(this,arguments)}function wn(){return(wn=c(i.mark((function t(n,e,r,o){var a,c;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=2;break}return t.abrupt("return",Wt(n.location,{replaceState:!0}));case 2:if(cn.page.set(o),cn.preloading.set(!1),!Xt){t.next=8;break}Xt.$set(r),t.next=18;break;case 8:return r.stores={page:{subscribe:cn.page.subscribe},preloading:{subscribe:cn.preloading.subscribe},session:cn.session},t.next=11,Zt;case 11:if(t.t0=t.sent,r.level0={props:t.t0},r.notify=cn.page.notify,a=document.querySelector("#sapper-head-start"),c=document.querySelector("#sapper-head-end"),a&&c){for(;a.nextSibling!==c;)jn(a.nextSibling);jn(a),jn(c)}Xt=new Yt({target:un,props:r,hydrate:!0});case 18:on=e,an=JSON.stringify(o.query),rn=!0,nn=!1;case 22:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function En(t,n,e,r){if(r!==an)return!0;var o=on[t];return!!o&&(n!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(e.slice(1,t+2)))||void 0))}function _n(t){return Sn.apply(this,arguments)}function Sn(){return(Sn=c(i.mark((function t(n){var e,r,o,a,u,s,f,l,p,h,v;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.route,r=n.page,o=r.path.split("/").filter(Boolean),a=null,u={error:null,status:200,segments:[o[0]]},s={fetch:function(t){function n(n,e){return t.apply(this,arguments)}return n.toString=function(){return t.toString()},n}((function(t,n){return fetch(t,n)})),redirect:function(t,n){if(a&&(a.statusCode!==t||a.location!==n))throw new Error("Conflicting redirects");a={statusCode:t,location:n}},error:function(t,n){u.error="string"==typeof n?new Error(n):n,u.status=t}},Zt||(Zt=en.preloaded[0]||bt.call(s,{host:r.host,path:r.path,query:r.query,params:{}},tn)),l=1,t.prev=7,p=JSON.stringify(r.query),h=e.pattern.exec(r.path),v=!1,t.next=13,Promise.all(e.parts.map(function(){var t=c(i.mark((function t(e,a){var c,f,d,m,y,g;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=o[a],En(a,c,h,p)&&(v=!0),u.segments[l]=o[a+1],e){t.next=5;break}return t.abrupt("return",{segment:c});case 5:if(f=l++,nn||v||!on[a]||on[a].part!==e.i){t.next=8;break}return t.abrupt("return",on[a]);case 8:return v=!1,t.next=11,Ln(Mt[e.i]);case 11:if(d=t.sent,m=d.default,y=d.preload,!rn&&en.preloaded[a+1]){t.next=25;break}if(!y){t.next=21;break}return t.next=18,y.call(s,{host:r.host,path:r.path,query:r.query,params:e.params?e.params(n.match):{}},tn);case 18:t.t0=t.sent,t.next=22;break;case 21:t.t0={};case 22:g=t.t0,t.next=26;break;case 25:g=en.preloaded[a+1];case 26:return t.abrupt("return",u["level".concat(f)]={component:m,props:g,segment:c,match:h,part:e.i});case 27:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}()));case 13:f=t.sent,t.next=21;break;case 16:t.prev=16,t.t0=t.catch(7),u.error=t.t0,u.status=500,f=[];case 21:return t.abrupt("return",{redirect:a,props:u,branch:f});case 22:case"end":return t.stop()}}),t,null,[[7,16]])})))).apply(this,arguments)}function Rn(t){var n="client/".concat(t);if(!document.querySelector('link[href="'.concat(n,'"]')))return new Promise((function(t,e){var r=document.createElement("link");r.rel="stylesheet",r.href=n,r.onload=function(){return t()},r.onerror=e,document.head.appendChild(r)}))}function Ln(t){var n="string"==typeof t.css?[]:t.css.map(Rn);return n.unshift(t.js()),Promise.all(n).then((function(t){return t[0]}))}function jn(t){t.parentNode.removeChild(t)}function Pn(t){var n=yn(new URL(t,document.baseURI));if(n)return sn&&t===sn.href||function(t,n){sn={href:t,promise:n}}(t,_n(n)),sn.promise}function An(t){clearTimeout(pn),pn=setTimeout((function(){kn(t)}),20)}function kn(t){var n=Cn(t.target);n&&"prefetch"===n.rel&&Pn(n.href)}function On(n){if(1===function(t){return null===t.which?t.button:t.which}(n)&&!(n.metaKey||n.ctrlKey||n.shiftKey||n.defaultPrevented)){var e=Cn(n.target);if(e&&e.href){var r="object"===t(e.href)&&"SVGAnimatedString"===e.href.constructor.name,o=String(r?e.href.baseVal:e.href);if(o!==location.href){if(!e.hasAttribute("download")&&"external"!==e.getAttribute("rel")&&!(r?e.target.baseVal:e.target)){var i=new URL(o);if(i.pathname!==location.pathname||i.search!==location.search){var a=yn(i);if(a)bn(a,null,e.hasAttribute("sapper-noscroll"),i.hash),n.preventDefault(),vn.pushState({id:fn},"",i.href)}}}else location.hash||n.preventDefault()}}}function Cn(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Dn(t){if(dn[fn]=gn(),t.state){var n=yn(new URL(location.href));n?bn(n,t.state.id):location.href=location.href}else(function(t){fn=t})(ln=ln+1),vn.replaceState({id:fn},"",location.href)}hn={target:document.querySelector("#sapper")},"scrollRestoration"in vn&&(vn.scrollRestoration="manual"),addEventListener("beforeunload",(function(){vn.scrollRestoration="auto"})),addEventListener("load",(function(){vn.scrollRestoration="manual"})),function(t){un=t}(hn.target),addEventListener("click",On),addEventListener("popstate",Dn),addEventListener("touchstart",kn),addEventListener("mousemove",An),Promise.resolve().then((function(){var t=location,n=t.hash,e=t.href;vn.replaceState({id:ln},"",e);var r,o,i,a,c,u,s,f,l=new URL(location.href);if(en.error)return r=location,o=r.host,i=r.pathname,a=r.search,c=en.session,u=en.preloaded,s=en.status,f=en.error,Zt||(Zt=u&&u[0]),void xn(null,[],{error:f,status:s,session:c,level0:{props:Zt},level1:{props:{status:s,error:f},component:Tt},segments:u},{host:o,path:i,query:mn(a),params:{}});var p=yn(l);return p?bn(p,ln,!0,n):void 0}));export{P as A,c as B,i as C,U as D,E,_ as F,S as G,Et as L,dt as S,f as _,u as a,p as b,v as c,l as d,O as e,A as f,st as g,j as h,vt as i,T as j,q as k,N as l,I as m,ft as n,D as o,L as p,G as q,R as r,w as s,k as t,lt as u,m as v,it as w,at as x,pt as y,r as z};