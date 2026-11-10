/* 32 ImageGen WebP artwork variants, 16 types × male/female; no external tracking. */
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
 if(!ORDER.includes(type)||!["male","female"].includes(g))return "";
 return "./assets/characters/"+type+"-"+g+".webp";
}
function applyImages(){
 if(typeof HERO_IMAGES!=="object")return;
 for(const type of ORDER)HERO_IMAGES[type]=gender==="original"?original[type]:makePortrait(type,gender);
}
function picker(compact=false){
 const opts=[["female","女生角色"],["male","男生角色"],["original","不指定（原版）"]];
 return `<fieldset class="gender-picker${compact?" compact":""}"><legend>選擇角色卡性別</legend><div class="gender-picker-options">${opts.map(([value,label])=>`<label class="gender-picker-item${gender===value?" active":""}"><input type="radio" name="mbti-role-gender" value="${value}" ${gender===value?"checked":""}><span>${label}</span></label>`).join("")}</div>${compact?"":'<p>同一人格提供男、女兩款 ImageGen 典藏角色圖。此選擇不影響測驗分數或人格判讀，可隨時更換。</p>'}</fieldset>`;
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
