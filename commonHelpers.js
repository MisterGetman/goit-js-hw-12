import{a as w,S,i as P}from"./assets/vendor-c493984e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function p(t){if(t.ep)return;t.ep=!0;const a=l(t);fetch(t.href,a)}})();const v=e=>`<li class="gallery-item">
            <a href="${e.largeImageURL}">
              <img
                class="gallery-item-img"
                src="${e.webformatURL}"
                alt="${e.tags}"
                width="360"
              />
            </a>
            <ul class="img-info-list">
              <li>
                <p class="img-data-name">Likes</p>
                <p class="img-data">${e.likes}</p>
              </li>
              <li>
                <p class="img-data-name">Views</p>
                <p class="img-data">${e.views}</p>
              </li>
              <li>
                <p class="img-data-name">Comments</p>
                <p class="img-data">${e.comments}</p>
              </li>
              <li>
                <p class="img-data-name">Downloads</p>
                <p class="img-data">${e.downloads}</p>
              </li>
            </ul>
          </li>`;function g(e){return e.map(v).join("")}async function f(e){return(await w.get(`https://pixabay.com/api?${e}`)).data}const h=15,k="44691469-d7e9dab06c3e716fb34c6ceb9",d=document.querySelector("form"),m=document.querySelector(".gallery"),r=document.querySelector(".loader-wrapper"),u=document.querySelector("[data-load]"),y=new S(".gallery a",{captionsData:"alt",captionDelay:250});let s,i;d.addEventListener("submit",E);u.addEventListener("click",q);function b(e){return new URLSearchParams({key:k,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:h}).toString()}async function E(e){e.preventDefault(),r.classList.toggle("hidden"),i=1,s=d.keyWord.value.trim(),d.keyWord.value="",m.innerHTML="",await C(),r.classList.toggle("hidden")}async function q(){r.classList.toggle("hidden"),i++,await O(),r.classList.toggle("hidden")}async function C(){try{if(s==="")return Promise.reject("Input can not be blank.");const e=await f(b(s));e.hits.length>0?(m.insertAdjacentHTML("afterbegin",g(e.hits)),y.refresh(),L(e.totalHits)):n({title:"<b>Oops!</b>",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"deepskyblue"})}catch(e){n({title:"<b>Error:</b>",message:e.message,backgroundColor:"tomato"})}}async function O(){try{const e=await f(b(s));m.insertAdjacentHTML("beforeend",g(e.hits)),y.refresh(),A(),L(e.totalHits)}catch(e){n({title:"<b>Error:</b>",message:e.message,backgroundColor:"tomato"})}}function L(e){$(e)?u.classList.remove("hidden"):(u.classList.add("hidden"),n({title:"<b>Oops!</b>",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"deepskyblue"}))}function $(e){return Math.ceil(e/h)>i}function n({title:e,message:o,backgroundColor:l}){P.show({title:e,message:o,backgroundColor:l,position:"center"})}function A(){const o=document.querySelector("li").getBoundingClientRect();window.scrollBy({top:o.height*2+24,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
