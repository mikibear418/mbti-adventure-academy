/* 32 variants, 16 personality types; no external tracking. */
(function roleCardAddon(){
"use strict";
const KEY="mbti_role_art_gender_v1";
const ORDER=["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"];
const THEMES={
 ISTJ:["#48638d","#dae2ff","#26375f","⚜"],ISFJ:["#568a83","#d9ffe1","#254c50","✿"],
 INFJ:["#7967a1","#efd9ff","#42345d","☾"],INTJ:["#586292","#ddd2ff","#282f5b","✧"],
 ISTP:["#828997","#edf3fa","#394353","⚙"],ISFP:["#a8769d","#ffddf1","#563657","❀"],
 INFP:["#8399bd","#f5deff","#425072","❋"],INTP:["#5b91a8","#d6f6ff","#31596b","◈"],
 ESTP:["#bc866a","#ffe1be","#704732","✦"],ESFP:["#bf689d","#ffe3f8","#713a5f","★"],
 ENFP:["#9d73b9","#f8dcff","#553977","✵"],ENTP:["#5a92ad","#d7f3ff","#385674","⚡"],
 ESTJ:["#5a8297","#cceaff","#2c5062","♜"],ESFJ:["#b58a72","#ffe8ce","#624837","✿"],
 ENFJ:["#8e78b3","#eaddff","#483770","☀"],ENTJ:["#6679af","#dedfff","#323e72","♛"]
};
const original=typeof HERO_IMAGES==="object"&&HERO_IMAGES?{...HERO_IMAGES}:{};
const cache={};
const normalize=g=>g==="male"||g==="female"?g:"original";
let gender="original";
try{gender=normalize(sessionStorage.getItem(KEY))}catch(e){}
function makePortrait(type,g){
 if(!THEMES[type]||!["male","female"].includes(g))return "";
 const k=type+"-"+g;
 if(cache[k])return cache[k];
 const idx=ORDER.indexOf(type),[main,bright,dark,emblem]=THEMES[type],female=g==="female";
 const skin=["#f4d1b7","#edbfa2","#f9dcc0","#e5af91"][idx%4];
 const hair=["#322b40","#4d3540","#77554d","#35445e","#695145","#47324a","#5f5368","#293750"][idx%8];
 const iris=["#3b5767","#466c65","#645284","#755c43"][idx%4];
 const stars=Array.from({length:38},(_,i)=>`<circle cx="${(i*197+idx*43+65)%1130+35}" cy="${(i*131+idx*37+51)%820+25}" r="${i%6===0?4:2}" fill="#fff1d4" opacity="${i%4===0?.85:.39}"/>`).join("");
 const hairBack=female
 ?`<path d="M440 312Q407 403 393 647Q380 748 437 799L496 736Q475 607 494 475Z M747 312Q798 416 809 641Q822 751 769 796L706 735Q734 602 713 464Z" fill="${hair}"/>`
 :`<path d="M435 326Q405 419 461 497L495 470L483 357Z M761 320Q793 419 733 493L701 464L715 355Z" fill="${hair}"/>`;
 const fringe=female
 ?`<path d="M420 366Q401 198 539 190Q669 146 759 258L754 375Q725 284 666 247Q591 323 451 344Z" fill="${hair}"/><path d="M450 341Q563 310 670 238" stroke="${bright}" opacity=".23" stroke-width="9" fill="none"/><path d="M742 286Q778 360 750 470" fill="none" stroke="${hair}" stroke-width="28"/><circle cx="744" cy="506" r="9" fill="#ffe9bc"/>`
 :`<path d="M431 347Q409 260 471 221L464 188L538 214Q574 162 633 185L658 212Q738 184 765 283L747 356L702 271L650 312L632 276Q559 312 515 283L463 365Z" fill="${hair}"/><path d="M470 264L523 293L553 245M675 234L700 286" stroke="${bright}" opacity=".23" stroke-width="12" fill="none"/>`;
 const mouth=female?"M577 535Q602 553 625 535":"M573 539Q601 551 631 539";
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
<defs>
<radialGradient id="bg"><stop stop-color="${main}"/><stop offset=".65" stop-color="${dark}"/><stop offset="1" stop-color="#0b1128"/></radialGradient>
<radialGradient id="aura"><stop stop-color="${bright}" stop-opacity=".55"/><stop offset="1" stop-color="${bright}" stop-opacity="0"/></radialGradient>
<linearGradient id="robe" x2=".8" y2="1"><stop stop-color="${main}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
<linearGradient id="gold"><stop stop-color="#fff2c9"/><stop offset=".5" stop-color="#b89151"/><stop offset="1" stop-color="#ffe5b2"/></linearGradient>
</defs>
<rect width="1200" height="900" fill="url(#bg)"/>
<circle cx="600" cy="356" r="395" fill="url(#aura)"/>
${stars}
<g fill="none" stroke="#e6c88f" stroke-opacity=".48"><path d="M165 900V188Q600 -102 1035 188V900" stroke-width="9"/><path d="M192 900V203Q600 -64 1008 203V900" stroke-width="2"/><circle cx="600" cy="360" r="275" stroke-dasharray="5 15"/><circle cx="600" cy="360" r="241" stroke-opacity=".38"/></g>
<path d="M204 918Q282 670 412 648L488 618H713L791 653Q926 682 1006 918" fill="url(#robe)" stroke="#f1d098" stroke-width="12"/>
<path d="M292 915Q340 723 418 672L494 920M908 915Q855 723 783 672L700 920" fill="${dark}" stroke="${bright}" stroke-width="4" opacity=".8"/>
${hairBack}
<path d="M538 566V674Q601 731 660 672V565" fill="${skin}"/>
<path d="M463 654Q598 727 735 653L846 922H355Z" fill="url(#robe)" stroke="#f1d89b" stroke-width="7"/>
<path d="M541 657L602 732L662 655M602 733V906" fill="none" stroke="#ffe3a2" stroke-width="12"/>
<ellipse cx="459" cy="463" rx="29" ry="47" fill="${skin}"/><ellipse cx="743" cy="463" rx="29" ry="47" fill="${skin}"/>
<path d="${female?"M469 325Q600 245 729 326L727 477Q718 595 601 625Q478 600 469 478Z":"M464 326Q599 253 735 326L735 476Q717 593 601 618Q481 595 464 476Z"}" fill="${skin}" stroke="#a87c70" stroke-width="5" stroke-opacity=".35"/>
<g fill="none" stroke="${hair}" stroke-width="12" stroke-linecap="round"><path d="M488 417Q524 398 560 415"/><path d="M642 415Q677 398 712 417"/></g>
<g fill="#fff" stroke="${iris}" stroke-width="7"><ellipse cx="525" cy="453" rx="${female?29:24}" ry="${female?21:17}"/><ellipse cx="677" cy="453" rx="${female?29:24}" ry="${female?21:17}"/></g>
<circle cx="528" cy="455" r="14" fill="${iris}"/><circle cx="675" cy="455" r="14" fill="${iris}"/><circle cx="533" cy="449" r="5" fill="white"/><circle cx="680" cy="449" r="5" fill="white"/>
<path d="M599 470Q588 500 605 503" stroke="#bb887d" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="${mouth}" stroke="#ad6b71" stroke-width="7" fill="none" stroke-linecap="round"/>
${female?'<ellipse cx="489" cy="481" rx="27" ry="12" fill="#d68d92" opacity=".23"/><ellipse cx="709" cy="481" rx="27" ry="12" fill="#d68d92" opacity=".23"/>':""}
${fringe}
<path d="M541 655L601 716L663 655" fill="none" stroke="#fff1c6" stroke-width="8"/>
<circle cx="601" cy="742" r="41" fill="${dark}" stroke="#f6d99f" stroke-width="8"/>
<text x="601" y="762" text-anchor="middle" font-size="42" font-family="serif" fill="#fff2c1">${emblem}</text>
<g transform="translate(240 472) rotate(${idx%2?-11:11})"><circle r="90" fill="${main}" opacity=".72" stroke="#f2d797" stroke-width="8"/><circle r="70" fill="none" stroke="#ffe5b6" stroke-width="2" stroke-dasharray="5 9"/><path d="M0 -61L15 -15L61 0L15 15L0 61L-15 15L-61 0L-15 -15Z" fill="${bright}" stroke="#fff8da" stroke-width="4"/><circle r="13" fill="#fff9e5"/></g>
<circle cx="967" cy="365" r="113" fill="#101b3b" opacity=".76" stroke="#f4d6a1" stroke-width="6"/><circle cx="967" cy="365" r="95" fill="none" stroke="#f5dfa9" stroke-dasharray="4 12" stroke-width="2"/>
<text x="967" y="398" font-size="96" font-weight="bold" text-anchor="middle" font-family="serif" fill="${bright}">${emblem}</text>
<rect x="22" y="20" width="1156" height="860" rx="24" fill="none" stroke="url(#gold)" stroke-width="8"/><rect x="40" y="38" width="1120" height="824" rx="15" fill="none" stroke="#e7cb99" stroke-width="2"/>
<g fill="#ffe8b6"><path d="M73 70l13 19-13 19-13-19z M1128 70l13 19-13 19-13-19z M73 827l13 19-13 19-13-19z M1128 827l13 19-13 19-13-19z"/></g>
</svg>`;
 return cache[k]="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}
function applyImages(){
 if(typeof HERO_IMAGES!=="object")return;
 for(const type of ORDER)HERO_IMAGES[type]=gender==="original"?original[type]:makePortrait(type,gender);
}
function picker(compact=false){
 const opts=[["female","女生角色"],["male","男生角色"],["original","不指定（原版）"]];
 return `<fieldset class="gender-picker${compact?" compact":""}"><legend>選擇角色卡性別</legend><div class="gender-picker-options">${opts.map(([value,label])=>`<label class="gender-picker-item${gender===value?" active":""}"><input type="radio" name="mbti-role-gender" value="${value}" ${gender===value?"checked":""}><span>${label}</span></label>`).join("")}</div>${compact?"":'<p>同一人格提供男女兩款不同的角色插畫。此選擇不影響測驗分數或人格判讀，可隨時更換。</p>'}</fieldset>`;
}
function decorate(){
 const view=state.view;
 if(view==="home"){
  const buttons=document.querySelector(".hero .buttons");
  if(buttons)buttons.insertAdjacentHTML("beforebegin",picker());
 }
 const grid=document.querySelector(".gallery-grid");
 if(grid&&(view==="home"||view==="gallery"))grid.insertAdjacentHTML("beforebegin",picker(true));
 if(view==="quiz"){
  const quiz=document.querySelector(".q-shell");
  if(quiz)quiz.insertAdjacentHTML("afterbegin",picker(true));
 }
 if(view==="result"){
  const image=document.querySelector(".result-visual");
  if(image){
   image.insertAdjacentHTML("beforebegin",picker());
   if(gender!=="original"){
    const target=image.querySelector(".result-id");
    if(target)target.insertAdjacentHTML("beforeend",`<div class="gender-role-note">✦ ${gender==="male"?"男生":"女生"}角色版本 · 與人格計分無關</div>`);
   }
  }
 }
}
function setGender(next){
 gender=normalize(next);
 try{sessionStorage.setItem(KEY,gender)}catch(e){}
 applyImages();
 render();
}
if(typeof module==="object"&&module.exports)module.exports={ORDER,THEMES,makePortrait};
if(typeof document==="undefined"||typeof HERO_IMAGES==="undefined"||typeof state==="undefined"||typeof render!=="function")return;
applyImages();
const oldRender=render;
render=function(){oldRender();decorate()};
document.addEventListener("change",event=>{
 const target=event.target;
 if(target&&target.matches&&target.matches('input[name="mbti-role-gender"]'))setGender(target.value);
});
window.MBTIGenderCards={getGender:()=>gender,setGender,makePortrait,typeCount:ORDER.length};
render();
})();
