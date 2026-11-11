/* Student-facing single-purpose test and downloadable full report. */
(function studentMode(){
'use strict';
if(typeof state==='undefined'||typeof render!=='function'||typeof TYPES==='undefined')return;
const prevRender=render;
function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function tidy(){
  if(!['home','quiz','result'].includes(state.view))state.view='home';
  document.body.dataset.studentView=state.view;
  const nav=document.querySelector('.topbar .nav');
  if(nav)nav.innerHTML='<button onclick="startQuiz()">開始測驗</button>';
  const qr=document.getElementById('mbtiQrDialog');
  if(qr)qr.remove();
  if(state.view==='home'){
    const hero=document.querySelector('.hero');
    if(hero){
      const h=hero.querySelector('h1');
      if(h)h.innerHTML='MBTI 性格冒險學院<span>探索你的專屬角色</span>';
      const buttons=hero.querySelector('.buttons');
      if(buttons)buttons.innerHTML='<button class="btn primary" onclick="startQuiz()">開始 80 題性格探索 ✦</button>';
      const lede=hero.querySelector('.lede');
      if(lede)lede.textContent='依照平常最像自己的反應作答，探索四組個性偏好。完成後可領取角色卡與完整結果說明，免費且不必登入。';
    }
    document.querySelector('.feature-row')?.remove();
    document.querySelector('.gallery')?.remove();
    document.querySelector('.teacher')?.remove();
    document.querySelector('.axis-grid')?.closest('section')?.remove();
  }
  if(state.view==='result'){
    const layout=document.querySelector('.result-layout');
    const image=document.querySelector('.result-visual');
    if(!layout||!image)return;
    const side=layout.children[1];
    const story=side?.querySelector('.result-panel');
    if(story){story.classList.add('student-story');image.after(story);}
    const cardPanel=image.parentElement?.querySelector('.result-panel:not(.student-story)');
    const bar=cardPanel?.querySelector('.result-actionbar');
    if(bar&&!bar.querySelector('.student-report-download')){
      const btn=document.createElement('button');
      btn.className='btn primary sm student-report-download';
      btn.type='button';
      btn.textContent='下載角色卡＋完整結果說明 PNG';
      btn.addEventListener('click',downloadFullRoleReport);
      bar.prepend(btn);
      const hint=document.createElement('p');
      hint.className='note';
      hint.textContent='完整報告會將你所選的角色插畫、人格解讀、學習建議與四個偏好方向合併成一張可保存或列印的圖片。';
      bar.after(hint);
    }
    const out=side?.querySelector('.result-actionbar');
    if(out)for(const btn of out.querySelectorAll('button'))if(btn.textContent.includes('其他 15 位角色'))btn.remove();
    const heading=document.querySelector('.result-heading h1');
    if(heading)heading.textContent='你的性格冒險結果';
    const footer=document.createElement('p');
    footer.className='student-report-disclaimer';
    footer.textContent='這是自我探索活動，結果不代表能力高低，也不適合用於分班、評分或診斷。';
    if(!document.querySelector('.student-report-disclaimer'))layout.after(footer);
  }
}
render=function studentRender(){
 if(!['home','quiz','result'].includes(state.view))state.view='home';
 prevRender();
 tidy();
};
showGallery=function(){setView('home');};
showTeacher=function(){setView('home');};
demo=function(){startQuiz();};
function rounded(ctx,x,y,w,h,r){
 ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
function wrap(ctx,text,x,y,maxWidth,lineHeight,maxLines=5){
 let line='',count=0;
 for(const ch of Array.from(String(text??''))){
  if(ctx.measureText(line+ch).width>maxWidth&&line){
    ctx.fillText(line,x,y+count*lineHeight);count++;line=ch;
    if(count>=maxLines)return count*lineHeight;
  }else line+=ch;
 }
 if(line){ctx.fillText(line,x,y+count*lineHeight);count++;}
 return count*lineHeight;
}
async function downloadFullRoleReport(){
 const completed=state.answers?.length===80&&state.answers.every(x=>x!==null);
 if(!completed||state.demoType){alert('請先完成全部 80 題，才能下載個人完整報告。');return;}
 const result=calcScores(),type=result.type,data=TYPES[type];
 if(!data)return;
 const img=new Image();
 img.src=HERO_IMAGES[type];
 try{await img.decode();}catch(e){alert('角色圖片尚未載入，請確認網路後再試一次。');return;}
 const canvas=document.createElement('canvas');canvas.width=1100;canvas.height=2700;
 const ctx=canvas.getContext('2d');
 if(!ctx){alert('你的瀏覽器無法產生報告圖片。');return;}
 let bg=ctx.createLinearGradient(0,0,1100,2700);
 bg.addColorStop(0,'#141d3a');bg.addColorStop(.53,'#233051');bg.addColorStop(1,'#101a31');
 ctx.fillStyle=bg;ctx.fillRect(0,0,1100,2700);
 ctx.strokeStyle='#d9b97b';ctx.lineWidth=7;rounded(ctx,28,28,1044,2644,28);ctx.stroke();
 ctx.strokeStyle='#806a4f';ctx.lineWidth=2;rounded(ctx,43,43,1014,2614,22);ctx.stroke();
 ctx.textAlign='center';ctx.fillStyle='#f3d99f';ctx.font='bold 36px sans-serif';
 ctx.fillText('✦  MBTI 16 型人格冒險學院  ✦',550,107);
 ctx.fillStyle='#d9def4';ctx.font='24px sans-serif';ctx.fillText('80 題自我探索 · 個人角色卡與結果說明',550,151);
 rounded(ctx,106,187,888,672,18);ctx.save();ctx.clip();
 ctx.drawImage(img,106,187,888,672);ctx.restore();
 ctx.strokeStyle='#e4c68b';ctx.lineWidth=4;rounded(ctx,106,187,888,672,18);ctx.stroke();
 ctx.fillStyle='#f9e1a7';ctx.font='bold 53px sans-serif';ctx.fillText(type+'　'+data.name,550,934);
 ctx.fillStyle='#f0f2ff';ctx.font='30px sans-serif';ctx.fillText(data.motto,550,984);
 ctx.textAlign='left';
 const parts=[
   ['你的性格故事',data.summary],
   ['角色天賦',data.strengths],
   ['成長提醒',data.growth],
   ['適合的學習方式',data.study],
   ['小組合作定位',data.team],
   ['今日冒險挑戰',data.quest]
 ];
 let y=1032;
 for(const [title,detail] of parts){
  const height=155;
  ctx.fillStyle='#253354';rounded(ctx,98,y,904,height,16);ctx.fill();
  ctx.strokeStyle='#67728c';ctx.lineWidth=1.5;ctx.stroke();
  ctx.fillStyle='#f4d795';ctx.font='bold 32px sans-serif';ctx.fillText(title,130,y+43);
  ctx.fillStyle='#f0f2fa';ctx.font='27px sans-serif';
  wrap(ctx,detail,130,y+88,820,39,2);
  y+=height+12;
 }
 y+=22;
 ctx.fillStyle='#f5dda5';ctx.font='bold 31px sans-serif';ctx.fillText('四個偏好方向（本次作答）',103,y);y+=28;
 const labels={EI:['外向 E','內向 I'],SN:['實感 S','直覺 N'],TF:['思考 T','情感 F'],JP:['判斷 J','感知 P']};
 for(const key of ['EI','SN','TF','JP']){
  const score=result.sums[key],ends=labels[key];
  y+=59;ctx.fillStyle='#e5eafa';ctx.font='25px sans-serif';
  ctx.fillText(ends[0],118,y);ctx.textAlign='right';ctx.fillText(ends[1],982,y);ctx.textAlign='left';
  ctx.fillStyle='#596481';rounded(ctx,340,y-20,408,24,12);ctx.fill();
  const x=340+408*(score+40)/80;
  ctx.fillStyle='#eed396';ctx.beginPath();ctx.arc(Math.max(350,Math.min(738,x)),y-8,15,0,2*Math.PI);ctx.fill();
 }
 ctx.textAlign='center';ctx.font='21px sans-serif';ctx.fillStyle='#bac8e1';
 ctx.fillText('這是自我探索，不是官方心理衡鑑；類型不代表能力或永久標籤。',550,2625);
 const a=document.createElement('a');
 a.download='MBTI_'+type+'_'+data.name+'_角色卡與結果說明.png';
 a.href=canvas.toDataURL('image/png');
 document.body.appendChild(a);a.click();a.remove();
}
window.downloadFullRoleReport=downloadFullRoleReport;
render();
})();