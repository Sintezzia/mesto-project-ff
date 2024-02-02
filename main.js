(()=>{"use strict";var e=document.querySelector("#card-template").content,t=function(e){e.classList.add("popup_is-opened");var t=r(e),n=o(e),u=c(e);e.addEventListener("click",u),document.addEventListener("keydown",n),e.querySelector(".popup__close").addEventListener("click",t),e.closeEventListeners={handleClosePopupClick:t,handleEscKeyPress:n,handleOverlayClick:u}},n=function(e){e.classList.remove("popup_is-opened");var t=e.closeEventListeners,n=t.handleClosePopupClick,r=t.handleEscKeyPress,o=t.handleOverlayClick;e.removeEventListener("click",o),document.removeEventListener("keydown",r),e.querySelector(".popup__close").removeEventListener("click",n)},r=function(e){return function(){n(e)}},o=function(e){return function(t){"Escape"===t.key&&n(e)}},c=function(e){return function(t){t.target===e&&n(e)}},u=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},i=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),r.disabled=!0},a=function(e,t){t.disabled=!!function(e){return e.some((function(e){return!e.validity.valid}))}(e)},l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-5",headers:{authorization:"d9f51b19-9a8e-4f34-b290-a0dcbdf65c0c","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},d=function(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n={method:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",headers:l.headers,body:t?JSON.stringify(t):void 0};return fetch("".concat(l.baseUrl,"/").concat(e),n).then(s)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".places__list"),m=document.querySelector(".profile__image"),v=document.querySelector(".avatar__edit-button"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),q=h.querySelector(".popup__image"),E=h.querySelector(".popup__caption"),g=document.querySelector(".popup_type_avatar"),k=document.querySelector(".popup_type_delete"),L=k.querySelector(".popup__button_confirm-delete"),C=document.querySelector(".popup_type_error"),x=C.querySelector(".popup__button"),w=C.querySelector(".popup__error"),A=C.querySelector(".popup__button"),T=document.forms["new-avatar"],P=T.elements.link,I=document.forms["new-place"],U=I.elements["place-name"],j=I.elements.link,O=document.forms["edit-profile"],D=O.elements.name,M=O.elements.description,B=document.querySelector(".profile__title"),H=document.querySelector(".profile__description"),K=document.querySelector(".profile__title"),N=document.querySelector(".profile__description"),V={globalUserId:null},z=function(e){t(e);var n=e.querySelector(".popup__form");n&&(n.reset(),i(n,Y))},G=function(e,n){q.src=e,q.alt=n,E.textContent=n,t(h)},J=function(e,r){t(k),L.onclick=function(){(function(e){return d("cards/".concat(e),"DELETE")})(e).then((function(){r.remove(),n(k)})).catch((function(e){console.log(e)}))}},R=function(e,t,n){(function(e,t){return d("cards/likes/".concat(e),t)})(t,n.classList.contains("card__like-button_is-active")?"DELETE":"PUT").then((function(t){!function(e,t,n){n.classList.toggle("card__like-button_is-active"),e.target.closest(".card").querySelector(".card__like-counter").textContent=t}(e,t.likes.length,n)})).catch((function(e){console.error(e)}))},$=function(e){return new Promise((function(t,n){var r=new Image;r.onload=function(){return t(e)},r.onerror=function(){return n(new Error("Не удалось загрузить изображение по URL: ".concat(e)))},r.src=e}))},F=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]?(e.dataset.originalText=e.textContent,e.textContent="Сохранение..."):e.textContent=e.dataset.originalText||"Сохранить"},Q=function(t,n,r,o,c,u){var i=function(t,n,r,o,c,u,i,a,l){var s=e.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__delete-button"),p=s.querySelector(".card__image"),f=s.querySelector(".card__title"),m=s.querySelector(".card__like-button"),v=s.querySelector(".card__like-counter");return p.src=n,p.alt=t,f.textContent=t,v.textContent=r.length,d.style.display=c===u?"block":"none",r.some((function(e){return e._id===u}))&&m.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){return l(n,t)})),d.addEventListener("click",(function(){return i(o,s)})),m.addEventListener("click",(function(e){return a(e,o,m)})),s}(t,n,r,o,c,u,J,R,G);f.prepend(i)},W=function(e){setTimeout((function(){return e.reset()}),300)};_.addEventListener("click",(function(){z(b),D.value=B.textContent,M.value=H.textContent})),y.addEventListener("click",(function(){return z(S)})),I.addEventListener("submit",(function(e){e.preventDefault(),F(e.submitter,!0);var r=U.value,o=j.value;$(o).then((function(e){return d("cards","POST",{name:r,link:e})})).then((function(e){Q(e.name,e.link,e.likes,e._id,e.owner._id,V.globalUserId),n(S)})).catch((function(e){w.textContent="".concat(e.message),t(C),x.disabled=!1})).finally((function(){F(e.submitter,!1),i(I,Y),W(I)}))})),O.addEventListener("submit",(function(e){e.preventDefault(),F(e.submitter,!0);var t,r,o=D.value,c=M.value;(t=o,r=c,d("users/me","PATCH",{name:t,about:r})).then((function(e){console.log("Данные пользователя обновлены:",e),B.textContent=o,H.textContent=c,n(b)})).catch((function(e){console.log(e)})).finally((function(){F(e.submitter,!1),W(O),i(O,Y)}))})),v.addEventListener("click",(function(){return z(g)})),T.addEventListener("submit",(function(e){e.preventDefault(),F(e.submitter,!0);var r=P.value;$(r).then((function(e){return d("users/me/avatar","PATCH",{avatar:e})})).then((function(e){m.style.backgroundImage="url(".concat(e.avatar,")"),n(g)})).catch((function(e){w.textContent="".concat(e.message),t(C),x.disabled=!1})).finally((function(){F(e.submitter,!1),W(T),i(T,Y)}))})),A.addEventListener("click",(function(){return n(C)}));var X,Y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};X=Y,Array.from(document.querySelectorAll(X.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);a(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),a(n,r,t)}))}))}(e,X)})),Promise.all([d("users/me"),d("cards")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];V.globalUserId=o._id,K.textContent=o.name,N.textContent=o.about,m.style.backgroundImage="url(".concat(o.avatar,")"),m.classList.remove("preloader"),K.classList.remove("preloader"),N.classList.remove("preloader"),document.querySelector(".cards-preloader").classList.remove("cards-preloader"),document.querySelectorAll(".card-preloader").forEach((function(e){e.remove()})),c.reverse().forEach((function(e){Q(e.name,e.link,e.likes,e._id,e.owner._id,V.globalUserId)}))})).catch((function(e){console.log(e)}))})();