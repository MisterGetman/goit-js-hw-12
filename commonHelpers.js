import{a as b,S as L,i as w}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))g(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&g(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function g(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const S=e=>`<li class="gallery-item">
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
          </li>`;function p(e){return e.map(S).join("")}function k(e,t){return new URLSearchParams({key:"44691469-d7e9dab06c3e716fb34c6ceb9",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}).toString()}async function f(e,t){const{data:r}=await b.get(`https://pixabay.com/api/?${k(e,t)}`);return r}const v=15,d=document.querySelector("form"),m=document.querySelector(".gallery"),i=document.querySelector(".loader-wrapper"),u=document.querySelector("[data-load]"),h=new L(".gallery a",{captionsData:"alt",captionDelay:250});let l,n;d.addEventListener("submit",C);u.addEventListener("click",P);function C(e){if(e.preventDefault(),n=1,l=d.keyWord.value.trim(),l===""){s({title:"<b>Error:</b>",message:"Input can not be blank.",backgroundColor:"tomato"});return}d.keyWord.value="",m.innerHTML="",q()}function P(){n++,E()}async function q(){try{i.classList.toggle("hidden");const{hits:e,totalHits:t}=await f(l,n);i.classList.toggle("hidden"),e.length>0?(m.insertAdjacentHTML("afterbegin",p(e)),h.refresh(),y(t)):s({title:"<b>Oops!</b>",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"deepskyblue"})}catch(e){s({title:"<b>Error:</b>",message:e.message,backgroundColor:"tomato"})}}async function E(){try{i.classList.toggle("hidden");const{hits:e,totalHits:t}=await f(l,n);i.classList.toggle("hidden"),m.insertAdjacentHTML("beforeend",p(e)),h.refresh(),$(),y(t)}catch(e){s({title:"<b>Error:</b>",message:e.message,backgroundColor:"tomato"})}}function y(e){O(e)?u.classList.remove("hidden"):(u.classList.add("hidden"),s({title:"<b>Oops!</b>",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"deepskyblue"}))}function O(e){return Math.ceil(e/v)>n}function s({title:e,message:t,backgroundColor:r}){w.show({title:e,message:t,backgroundColor:r,position:"center"})}function $(){const t=document.querySelector("li").getBoundingClientRect();window.scrollBy({top:t.height*2+24,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
