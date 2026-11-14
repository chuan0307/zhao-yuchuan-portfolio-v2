const ASSET = './assets/';
const STORAGE_KEY = 'objects-portfolio-v1';
const viewerMode = new URLSearchParams(location.search).get('view') === '1';
const migrationMode = new URLSearchParams(location.search).get('migrate') === '1';
if(viewerMode) document.documentElement.classList.add('viewer-mode');
if(migrationMode) document.documentElement.classList.add('migration-mode');
const works = [
  {id:'sofa', title:'FLOATING ISLET', sub:'SOFA SYSTEM / 沙发系统', category:'design', year:'2026', meta:'DESIGN WORKS · PRODUCT DESIGN', image:'floating-islet-sofa.jpg', lead:'一个关于漂浮、围合与自由组合的居住系统。模块化的软体单元围绕深色木质平台展开，让生活场景可以不断被重新组织。'},
  {id:'sideboard', title:'MOON ECLIPSE', sub:'SIDEBOARD / 月蚀边柜', category:'design', year:'2026', meta:'DESIGN WORKS · STORAGE SYSTEM', image:'moon-eclipse-sideboard.jpg', lead:'以月蚀为形态线索的收纳柜体。弧形门扇、隐藏抽屉与悬浮底座共同构成一件安静而有秩序的家居物件。'},
  {id:'cenyu', title:'CENYU FLOATING UNIT', sub:'SIDE TABLE / 浮台边柜', category:'design', year:'2026', meta:'DESIGN WORKS · SIDE TABLE', image:'cenyu-floating-unit.jpg', lead:'上下错层的悬浮边柜，以木材、微水泥与圆润的体块关系，建立一处适合日常停留的小型功能景观。'},
  {id:'lunar', title:'LUNAR SURFACE', sub:'COFFEE TABLE / 月相茶几', category:'design', year:'2026', meta:'DESIGN WORKS · COFFEE TABLE', image:'lunar-surface-coffee-table.png', lead:'一张将月面光泽凝固在桌面上的茶几。黑色曲面底座托起如轨道般的椭圆台面，探索重量与漂浮之间的关系。'},
  {id:'arc-console', title:'ARC FRAME CONSOLE', sub:'SIDEBOARD / 弧线边柜', category:'design', year:'2026', meta:'DESIGN WORKS · SIDEBOARD', image:'arc-frame-console.png', lead:'以连续弧线构成支撑与收纳关系的边柜。悬臂式结构让柜体像被一条金属曲线托起，在稳定、轻盈与功能之间建立清晰的视觉秩序。'},
  {id:'aurora-tide', title:'AURORA TIDE', sub:'ART COFFEE TABLE / 弧汐艺术茶几', category:'design', year:'2026', meta:'DESIGN WORKS · ART FURNITURE', image:'aurora-tide-coffee-table.png', lead:'弧汐 AURORA TIDE 是一款以潮汐弧线为灵感的高端现代茶几。它像一块被水流切开的建筑石材，悬浮、错位并留有缝隙；隐藏收纳、临时办公、无线充电与移动托盘等功能被安静地嵌入结构之中。让茶几不再只是放置物品的家具，而成为客厅中的一件静态艺术装置。'},
  {id:'cocoon', title:'COCOON', sub:'LOUNGE CHAIR / 茧形休闲椅', category:'design', year:'2026', meta:'DESIGN WORKS · LOUNGE CHAIR', image:'cocoon-lounge-chair.jpg', lead:'COCOON 是一把受到生物形态启发的茧形休闲椅。连续的肋骨状镂空结构包裹身体，形成半封闭的私密感；柔软的多层坐垫为不同姿态提供支撑，让家具同时成为具有雕塑感的空间装置。'},
  {id:'matryona', title:'MATRYONA', sub:'BLUETOOTH SPEAKER / 氛围音箱', category:'design', year:'2026', meta:'DESIGN WORKS · AUDIO / AMBIENT LIGHT', image:'matryona-speaker.jpg', lead:'一个结合声音与暖光的陪伴型产品。透明穹顶、柔软的中心角色与模块化底座，共同形成一件带有情绪温度的桌面物件。'},
  {id:'lumiere', title:'LUMIÈRE', sub:'AROMA LAMP / 香薰灯', category:'design', year:'2026', meta:'DESIGN WORKS · AROMA SYSTEM', image:'lumiere-aroma-lamp.jpg', lead:'将香气、光线与时间编织在一起的桌面系统。椭圆光环像一条被托起的轨道，形成轻盈、安静的感官界面。'},
  {id:'thermos', title:'MATRYONA', sub:'SMART THERMOS CUP / 智能水杯', category:'design', year:'2026', meta:'DESIGN WORKS · SMART COMPANION', image:'matryona-smart-thermos.jpg', lead:'为饮水习惯设计的情绪化智能伙伴。产品以温度显示、饮水提醒与亲和的机器人形体，建立可被日常使用的陪伴感。'},
  {id:'coca', title:'COCA-COLA ENJOY', sub:'TUMBLER / 随行杯', category:'design', year:'2026', meta:'DESIGN WORKS · DRINKWARE', image:'coca-cola-enjoy-tumbler.jpg', lead:'将经典红色识别与日常饮水体验结合的随行杯。金属盖、弧线握把与醒目的白色线带，塑造出轻松而直接的使用记忆。'},
  {id:'lotus', title:'ZEN LOTUS', sub:'AROMA DIFFUSER / 莲花香薰灯', category:'design', year:'2026', meta:'DESIGN WORKS · WELLNESS OBJECT', image:'zen-lotus-aroma-diffuser.jpg', lead:'以莲花为形的香薰灯，将手工质感、木质底座与柔和的暖光结合，为空间带来一处安静的疗愈景观。'},
  {id:'photo-sunlit-pause', title:'SUNLIT PAUSE', sub:'PHOTOGRAPHY / 阳光停驻', category:'photography', year:'2026', meta:'PHOTOGRAPHY · ANIMAL / OBSERVATION', image:'photo-sunlit-pause.jpg', lead:'一只猫躺在午后的石板路上，木材、砖石与身体的柔软形成静默的对照。画面捕捉的是一段没有被打扰的日常时间。'},
  {id:'photo-above-weather', title:'ABOVE THE WEATHER', sub:'PHOTOGRAPHY / 云上', category:'photography', year:'2026', meta:'PHOTOGRAPHY · SKY / FLIGHT', image:'photo-above-the-weather.jpg', lead:'从飞机舷窗望向高空，云层像一片正在生成的山脉。发动机的冷色金属把观看的位置保留下来，让天空同时具有辽阔与重量。'},
  {id:'photo-moving-horizon', title:'MOVING HORIZON', sub:'PHOTOGRAPHY / 移动的地平线', category:'photography', year:'2026', meta:'PHOTOGRAPHY · TRANSIT / LANDSCAPE', image:'photo-moving-horizon.jpg', lead:'行进中的列车把电线、桥梁和水面切割成短暂的几何构图。速度让城市景观变得模糊，却让蓝色的空气更加清晰。'},
  {id:'photo-window-harbour', title:'WINDOW TO THE HARBOUR', sub:'PHOTOGRAPHY / 窗外港湾', category:'photography', year:'2026', meta:'PHOTOGRAPHY · CITY / DISTANCE', image:'photo-window-harbour.jpg', lead:'建筑之间打开一扇面向海湾的窗口。远处的山、桥与船被窗框重新组织，日常居所因此成为观看城市的取景器。'},
  {id:'photo-industrial-tide', title:'INDUSTRIAL TIDE', sub:'PHOTOGRAPHY / 工业潮汐', category:'photography', year:'2026', meta:'PHOTOGRAPHY · HARBOUR / INFRASTRUCTURE', image:'photo-industrial-tide.jpg', lead:'港口起重机与海面共同构成一幅工业风景。树木的绿色、天空的蓝和钢铁结构的红色在同一水平线上相遇。'},
  {id:'photo-blossoms-in-motion', title:'BLOSSOMS IN MOTION', sub:'PHOTOGRAPHY / 流动花影', category:'photography', year:'2026', meta:'PHOTOGRAPHY · MOTION / NIGHT', image:'photo-blossoms-in-motion.jpg', lead:'夜色中的花枝因移动而化开，花朵不再是静止的对象，而成为一层不断流动的光。模糊在这里记录了身体经过的方向。'},
  {id:'photo-afterglow-city', title:'AFTERGLOW CITY', sub:'PHOTOGRAPHY / 暮色城市', category:'photography', year:'2025', meta:'PHOTOGRAPHY · CITY / TWILIGHT', image:'photo-afterglow-city.jpg', lead:'橙色暮光把城市轮廓压成沉默的剪影。建筑、树枝与微亮的窗口共同组成一天结束前的短暂舞台。'},
  {id:'photo-amber-eyes', title:'AMBER EYES', sub:'PHOTOGRAPHY / 琥珀目光', category:'photography', year:'2025', meta:'PHOTOGRAPHY · ANIMAL / PORTRAIT', image:'photo-amber-eyes.jpg', lead:'猫的眼睛在低角度的阳光里呈现出琥珀色的光。近距离的凝视让一只普通的街头动物获得了肖像般的存在感。'},
  {id:'photo-moon-bird-blue', title:'MOON, BIRD, BLUE', sub:'PHOTOGRAPHY / 月鸟蓝', category:'photography', year:'2025', meta:'PHOTOGRAPHY · SKY / ENCOUNTER', image:'photo-moon-bird-blue.jpg', lead:'一只飞鸟经过半月与蓝天之间，留下一个轻微失焦的瞬间。画面以极少的元素，保存了偶遇的轻盈与距离。'},
  {id:'photo-lantern-alley', title:'LANTERN ALLEY', sub:'PHOTOGRAPHY / 灯影深巷', category:'photography', year:'2025', meta:'PHOTOGRAPHY · NIGHT / ARCHITECTURE', image:'photo-lantern-alley.jpg', lead:'狭窄巷道被一盏暖黄色的灯切开，旧墙、门框和电线把视线引向更深处。光成为这条城市缝隙里的唯一方向。'},
  {id:'photo-nocturne-branches', title:'NOCTURNE BRANCHES', sub:'PHOTOGRAPHY / 夜枝', category:'photography', year:'2025', meta:'PHOTOGRAPHY · NIGHT / BRANCHES', image:'photo-nocturne-branches.jpg', lead:'路灯照亮无叶的枝条，枝杈在深蓝夜色中交织成一张近乎抽象的网络。明亮的边缘让黑暗拥有了结构。'},
  {id:'photo-spring-in-blue', title:'SPRING IN BLUE', sub:'PHOTOGRAPHY / 蓝色春枝', category:'photography', year:'2026', meta:'PHOTOGRAPHY · BLOSSOM / SKY', image:'photo-spring-in-blue.jpg', lead:'春天的花枝伸向一整片蓝色天空，花朵的明亮与枝条的方向感让画面保持开放。季节在这里以轻而明确的方式出现。'},
  {id:'photo-last-light', title:'LAST LIGHT', sub:'PHOTOGRAPHY / 航迹余晖', category:'photography', year:'2026', meta:'PHOTOGRAPHY · FLIGHT / ATMOSPHERE', image:'photo-last-light.jpg', lead:'飞机尾翼穿过云层最后的光，暮色被压低成灰蓝与橙色的渐变。飞行留下的不只是距离，也是一段被光线保存的时间。'},
  {id:'photo-white-matter', title:'WHITE MATTER', sub:'PHOTOGRAPHY / 白色物质', category:'photography', year:'2026', meta:'PHOTOGRAPHY · MATERIAL / DETAIL', image:'photo-white-matter.jpg', lead:'半透明的白色材质在光线下展开复杂的表面起伏。它既像冰、纸，也像某种正在生成的建筑，边界因此保持开放。'},
  {id:'photo-harbour-observatory', title:'HARBOUR OBSERVATORY', sub:'PHOTOGRAPHY / 港湾观景', category:'photography', year:'2026', meta:'PHOTOGRAPHY · HARBOUR / VIEWPOINT', image:'photo-harbour-observatory.jpg', lead:'从高处望向港湾，栏杆、灯具、树冠与船只形成多层的观看距离。城市并非背景，而是一组持续运动的生活证据。'},
  {id:'photo-end', title:'END', sub:'PHOTOGRAPHY / 终止', category:'photography', year:'2026', meta:'PHOTOGRAPHY · SIGN / TRANSITION', image:'photo-end.jpg', lead:'“End”标志悬在复杂的交通结构之间，像一个明确却并不真正结束的句号。警示、方向与人的经过在此叠合。'},
  {id:'photo-open-sky', title:'OPEN SKY', sub:'PHOTOGRAPHY / 开阔云层', category:'photography', year:'2026', meta:'PHOTOGRAPHY · CLOUDS / FLIGHT', image:'photo-open-sky.jpg', lead:'从高空俯视云海，太阳把云层推向近乎白色的亮面。画面没有地平线，观看因此变成一种纯粹的悬浮。'},
  {id:'photo-orange-window', title:'ORANGE WINDOW', sub:'PHOTOGRAPHY / 橙色窗口', category:'photography', year:'2026', meta:'PHOTOGRAPHY · FLIGHT / FRAME', image:'photo-orange-window.jpg', lead:'飞机舷窗把天空框成一幅温暖的画，橙色边缘与远处的海面形成柔软的层次。旅行在这里被压缩成一个内部的观看瞬间。'},
  {id:'photo-shadow-garden', title:'SHADOW GARDEN', sub:'PHOTOGRAPHY / 墙上庭园', category:'photography', year:'2025', meta:'PHOTOGRAPHY · LIGHT / VEGETATION', image:'photo-shadow-garden.jpg', lead:'墙面、屋檐与植物的影子被夕光拉长，平整的建筑表面因此拥有了庭园般的生长感。光线让静止的墙面开始呼吸。'}
];

const fallbackBlocks = work => [];
let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const DB_NAME = 'objects-portfolio-db'; const DB_STORE = 'snapshots'; const DB_KEY = 'portfolio';
const dbReady = typeof indexedDB === 'undefined' ? Promise.reject(new Error('IndexedDB unavailable')) : new Promise((resolve,reject)=>{ const request=indexedDB.open(DB_NAME,1); request.onupgradeneeded=()=>request.result.createObjectStore(DB_STORE); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error); });
function saveToDatabase(){ return dbReady.then(db=>new Promise((resolve,reject)=>{ const tx=db.transaction(DB_STORE,'readwrite'); tx.objectStore(DB_STORE).put(saved,DB_KEY); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); })).catch(()=>{}); }
function loadFromDatabase(){ return dbReady.then(db=>new Promise((resolve,reject)=>{ const tx=db.transaction(DB_STORE,'readonly'); const request=tx.objectStore(DB_STORE).get(DB_KEY); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error); })).catch(()=>null); }
function clearDatabase(){ return dbReady.then(db=>new Promise(resolve=>{ const tx=db.transaction(DB_STORE,'readwrite'); tx.objectStore(DB_STORE).delete(DB_KEY); tx.oncomplete=resolve; tx.onerror=resolve; })).catch(()=>{}); }
loadFromDatabase().then(snapshot=>{ if(snapshot && typeof snapshot==='object'){ saved=snapshot; if(openId) renderDetail(); } else saveToDatabase(); });
let filter = 'design'; let active = 0; let selectedIndex = -1; let position = 0; let target = 0; let openId = null; let editMode = false; let drag = null; let clickTimer = null; let lastTapePointerDown = 0; let lastTapePointer = null; let skipNextClick = false; let suppressClickUntil = 0; let lastLayoutPosition=NaN; let lastLayoutSelected=-2; let lastLayoutWidth=0; let lastLayoutHeight=0; let lastLayoutCount=-1; let lastFrame = performance.now();
const $ = s => document.querySelector(s);
const stage = $('#stage');

function getData(work){ const stored=saved[work.id] && typeof saved[work.id]==='object' ? saved[work.id] : {}; const data={title:stored.title || work.title, sub:stored.sub || work.sub, lead:stored.lead || work.lead, blocks:Array.isArray(stored.blocks)?stored.blocks:fallbackBlocks(work)}; if(data.blocks?.some(block=>block.type==='text' && block.value===work.lead)){ data.blocks=data.blocks.filter(block=>!(block.type==='text' && block.value===work.lead)); } return data; }
function persist(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }catch{ try{ localStorage.removeItem(STORAGE_KEY); }catch{} } saveToDatabase(); }
function filtered(){
  if(filter==='design') return works.filter(w=>w.category==='design');
  if(filter==='photography') return works.filter(w=>w.category==='photography');
  return works.filter(w=>w.category===filter);
}
function mod(n,m){ return ((n%m)+m)%m; }
function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
function bookSpread(r){ const abs=Math.abs(r); return abs<1 ? (r+Math.sin(Math.PI*r)/Math.PI)/2 : Math.sign(r)*.5; }
function getActiveWork(){ const list=filtered(); return list[clamp(active,0,Math.max(0,list.length-1))] || works[0]; }
function resetShelf(){ const list=filtered(); const center=filter==='photography'?Math.min(6,Math.max(0,list.length-1)):(list.length-1)/2; selectedIndex=-1; active=clamp(Math.round(center),0,Math.max(0,list.length-1)); position=target=center; }
function restoreShelf(){ selectedIndex=-1; }
function renderStage(){
  stage.innerHTML = '';
  const list = filtered();
  list.forEach((work, i) => {
    const tape = document.createElement('button'); tape.type='button'; tape.className='tape'; tape.dataset.virtual=i; tape.dataset.id=work.id; tape.style.setProperty('--book-width','calc(var(--h) * .53)'); tape.style.setProperty('--book-depth','calc(var(--h) * .18)'); tape.setAttribute('aria-label',`打开 ${work.title}`);
    const book = document.createElement('span'); book.className='book';
    const spineSrc=work.category==='photography'?`thumbs/${work.image}`:work.image;
    const front = document.createElement('span'); front.className='book-face book-front'; front.dataset.src=work.image; front.dataset.thumb=spineSrc;
    const back = document.createElement('span'); back.className='book-face book-back';
    const spine = document.createElement('span'); spine.className='book-face book-spine'; spine.dataset.src=spineSrc; spine.innerHTML=`<span class="spine-title">${work.title} / ${work.year}</span>`;
    const foreEdge = document.createElement('span'); foreEdge.className='book-face book-fore-edge';
    const topEdge = document.createElement('span'); topEdge.className='book-face book-top-edge';
    const bottomEdge = document.createElement('span'); bottomEdge.className='book-face book-bottom-edge';
    book.append(front, back, spine, foreEdge, topEdge, bottomEdge); tape.append(book);
    tape.addEventListener('pointerdown',()=>{
      const now=performance.now();
      if(lastTapePointer===tape && now-lastTapePointerDown<280){ clearTimeout(clickTimer); clickTimer=null; skipNextClick=true; }
      lastTapePointer=tape; lastTapePointerDown=now;
    });
    tape.addEventListener('pointerenter',()=>tape.classList.add('hovered'));
    tape.addEventListener('pointerleave',()=>tape.classList.remove('hovered'));
    tape.addEventListener('click',e=>{
      e.stopPropagation();
      if(drag?.moved || performance.now()<suppressClickUntil) return;
      if(skipNextClick){ skipNextClick=false; return; }
      clearTimeout(clickTimer);
      clickTimer=setTimeout(()=>{
        const relative=i-position;
        if(selectedIndex>=0 && Math.abs(relative)<.55 && Math.abs(target-position)<.35){ restoreShelf(); clickTimer=null; return; }
        selectedIndex=i;
        target=clamp(i,0,Math.max(0,filtered().length-1));
        clickTimer=null;
      },105);
    });
    tape.addEventListener('dblclick',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(drag?.moved || performance.now()<suppressClickUntil) return;
      clearTimeout(clickTimer);
      clickTimer=null;
      selectedIndex=i;
      target=i;
      openDetail(work.id);
    });
    stage.appendChild(tape);
  });
  updateTabs();
}
function updateTabs(){ const tabs=[...document.querySelectorAll('.tab')]; const current=getActiveWork(); tabs.forEach(t=>t.classList.toggle('active',t.dataset.filter===filter)); const on=tabs.find(t=>t.dataset.filter===filter); const indicator=$('.tab-indicator'); if(on){indicator.style.width=`${on.offsetWidth}px`;indicator.style.transform=`translateX(${on.offsetLeft}px)`;} }
function setCaption(work){ const d=getData(work); const list=filtered(); const index=Math.max(0,list.indexOf(work)); $('#captionTitle').textContent=d.title; $('#captionSub').textContent=d.sub; $('#captionYear').textContent=`${String(index+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`; }
function layout(){
  const list=filtered(); const tapes=[...stage.children]; const h=Math.min(innerHeight*.48,innerWidth*.32); const spine=h*.18; const cover=h*.53; const gap=h*.035; const spacing=spine+gap;
  const settled=Math.abs(target-position)<.003;
  tapes.forEach((tape,i)=>{ const r=i-position; const abs=Math.abs(r); const isIdle=selectedIndex<0; const openness=isIdle?0:Math.pow(Math.max(0,1-abs),2)*(3-2*Math.max(0,1-abs)); const center=isIdle?r*spacing:(r*spacing)+(cover-spine+gap*1.6)*bookSpread(r); const angle=90*(1-openness); const visible=Math.abs(center)<=innerWidth/2+cover*1.2; const front=tape.querySelector('.book-front'); const spineFace=tape.querySelector('.book-spine'); if(visible){ if(!isIdle && abs<1.35){ const src=settled?front.dataset.src:front.dataset.thumb; if(front.dataset.current!==src){front.style.backgroundImage=`url("${ASSET+src}")`;front.dataset.current=src;} } if(!spineFace.style.backgroundImage)spineFace.style.backgroundImage=`url("${ASSET+spineFace.dataset.src}")`; } tape.classList.toggle('active',!isIdle && abs<.5); tape.style.setProperty('--shade',String(openness*.55)); tape.style.setProperty('--front-shade',String((1-openness)*.12)); tape.style.setProperty('--book-rotate-z',`${-4.5*openness}deg`); tape.style.setProperty('--book-rotate-y',`${angle}deg`); tape.style.setProperty('--book-lift','0px'); tape.style.transform=`translate3d(${center}px,${-openness*h*.025}px,${openness*h*.16}px)`; tape.style.zIndex=String(Math.round(100-abs*4)); tape.style.visibility=visible?'visible':'hidden'; tape.style.setProperty('--book-width',`${cover}px`); tape.style.setProperty('--book-depth',`${spine}px`); });
  const next=clamp(Math.round(position),0,Math.max(0,list.length-1)); if(next!==active){active=next;setCaption(list[active]);updateTabs();}
  const openButton=$('#openActive'); if(openButton)openButton.disabled=selectedIndex<0;
}
function tick(now=performance.now()){ const dt=Math.min(50,now-lastFrame); lastFrame=now; const moving=Math.abs(target-position)>.0001; if(moving){ position += (target-position)*(1-Math.exp(-7*dt/1000)); if(Math.abs(target-position)<.0001)position=target; } const needsLayout=moving || position!==lastLayoutPosition || selectedIndex!==lastLayoutSelected || innerWidth!==lastLayoutWidth || innerHeight!==lastLayoutHeight || stage.childElementCount!==lastLayoutCount; if(needsLayout){ layout(); lastLayoutPosition=position; lastLayoutSelected=selectedIndex; lastLayoutWidth=innerWidth; lastLayoutHeight=innerHeight; lastLayoutCount=stage.childElementCount; } requestAnimationFrame(tick); }
function move(delta){ const list=filtered(); selectedIndex=clamp(Math.round(target)+delta,0,Math.max(0,list.length-1)); target=selectedIndex; }
function openDetail(id=getActiveWork().id){ openId=id; editMode=false; const scroll=$('#detailView .detail-scroll'); if(scroll)scroll.scrollTop=0; $('#detailView').classList.remove('closing'); $('#detailView').classList.add('open'); $('#detailView').setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; renderDetail(); requestAnimationFrame(()=>{ if(scroll)scroll.scrollTop=0; }); }
function moveDetail(delta){ const list=filtered(); const current=Math.max(0,list.findIndex(work=>work.id===openId)); const next=mod(current+delta,list.length); openId=list[next].id; const scroll=$('#detailView .detail-scroll'); if(scroll)scroll.scrollTop=0; renderDetail(); requestAnimationFrame(()=>{if(scroll)scroll.scrollTop=0;}); }
function closeDetail(){ $('#detailView').classList.remove('open'); $('#detailView').classList.add('closing'); $('#detailView').setAttribute('aria-hidden','true'); document.body.style.overflow=''; setTimeout(()=>$('#detailView').classList.remove('closing'),800); }
function renderDetail(){ const work=works.find(w=>w.id===openId)||works[0]; const d=getData(work); const list=filtered(); const index=Math.max(0,list.indexOf(work)); $('#detailKicker').textContent=`${work.category==='photography'?'PHOTOGRAPHY':work.category==='design'?'DESIGN WORKS':work.category.toUpperCase()} / ${work.year}`; $('#detailTitle').textContent=d.title; $('#detailMeta').textContent=work.meta; $('#detailLead').textContent=d.lead; $('#detailCover').src=ASSET+work.image; $('#detailCover').alt=d.title; $('#detailIndex').textContent=String(index+1).padStart(2,'0'); $('.board-section').hidden=work.category==='photography'; renderBlocks(d.blocks||fallbackBlocks(work)); setEdit(false); }
function renderBlocks(blocks){ const wrap=$('#contentBlocks'); const empty=$('.board-empty'); const board=$('#boardCanvas'); wrap.innerHTML=''; empty.hidden=blocks.length>0; board.classList.toggle('has-content',blocks.length>0); wrap.classList.toggle('single-block',blocks.length===1); blocks.forEach((block,index)=>{ const el=document.createElement('article'); el.className=`content-block ${block.type==='image'?'content-image':'content-text'}`; const del=document.createElement('button'); del.className='block-delete'; del.type='button'; del.textContent='DELETE'; del.onclick=()=>{ const d=getData(works.find(w=>w.id===openId)); d.blocks.splice(index,1); saved[openId]=d; persist(); renderBlocks(d.blocks); }; if(block.type==='image'){ const img=document.createElement('img'); img.src=block.value; img.alt='项目图片'; el.append(img); } else { const p=document.createElement('p'); p.textContent=block.value; if(editMode){ const ta=document.createElement('textarea'); ta.value=block.value; ta.addEventListener('input',e=>{const d=getData(works.find(w=>w.id===openId));d.blocks[index].value=e.target.value;saved[openId]=d;persist();}); el.append(ta); } else el.append(p); } el.append(del); wrap.append(el); }); }
function addTextBlock(){ const d=getData(works.find(w=>w.id===openId)); d.blocks.push({type:'text',value:'在这里输入新的项目文字……'}); saved[openId]=d; persist(); renderBlocks(d.blocks); }
async function addImageFiles(files){ const d=getData(works.find(w=>w.id===openId)); for(const file of [...files]){ if(!file.type.startsWith('image/')) continue; const value=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(file)}); d.blocks.push({type:'image',value}); } saved[openId]=d; persist(); renderBlocks(d.blocks); }
function setEdit(value){ if(viewerMode) value=false; editMode=value; $('#detailView').classList.toggle('editing',value); $('#editorTools').hidden=!value; $('#editState').textContent=value?'EDIT MODE / 编辑中':'VIEW MODE'; $('#editToggle').textContent=value?'DONE / 完成':'EDIT / 编辑'; const title=$('#detailTitle'),lead=$('#detailLead'); title.contentEditable=String(value); lead.contentEditable=String(value); title.oninput=lead.oninput=()=>{ if(viewerMode)return; const d=getData(works.find(w=>w.id===openId)); d.title=title.textContent; d.lead=lead.textContent; saved[openId]=d; persist(); }; renderBlocks(getData(works.find(w=>w.id===openId)).blocks); }
function bind(){
  if(migrationMode){ $('#migrationExport').hidden=false; $('#migrationExport').onclick=()=>{ const blob=new Blob([JSON.stringify(saved,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='objects-portfolio-content.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); }; }
  document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{filter=t.dataset.filter;resetShelf();renderStage();setCaption(getActiveWork());});
  $('#prevItem').onclick=()=>move(-1); $('#nextItem').onclick=()=>move(1); $('#openActive').onclick=()=>openDetail(getActiveWork().id); $('#closeDetail').onclick=closeDetail; $('#detailPrev').onclick=()=>moveDetail(-1); $('#detailNext').onclick=()=>moveDetail(1); $('#editToggle').onclick=()=>setEdit(!editMode);
  $('#addText').onclick=addTextBlock; $('#boardAddText').onclick=e=>{e.stopPropagation();addTextBlock();}; $('#boardAddImage').onclick=e=>{e.stopPropagation();$('#addImage').click();};
  $('#addImage').onchange=async e=>{ await addImageFiles(e.target.files); e.target.value=''; };
  $('#boardCanvas').addEventListener('click',e=>{if(!editMode || e.target.closest('button,.content-block'))return;if(e.target.closest('.board-empty') || e.target===e.currentTarget)addTextBlock();});
  $('#boardCanvas').addEventListener('dragover',e=>{if(editMode){e.preventDefault();e.currentTarget.classList.add('drop-ready');}});
  $('#boardCanvas').addEventListener('dragleave',e=>e.currentTarget.classList.remove('drop-ready'));
  $('#boardCanvas').addEventListener('drop',async e=>{if(!editMode)return;e.preventDefault();e.currentTarget.classList.remove('drop-ready');await addImageFiles(e.dataTransfer.files);});
  $('#clearContent').onclick=()=>{ if(confirm('清空当前作品的展板内容？')){const d=getData(works.find(w=>w.id===openId));d.blocks=[];saved[openId]=d;persist();renderBlocks([]);} };
  $('#exportData').onclick=()=>{const blob=new Blob([JSON.stringify(saved,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='objects-portfolio-content.json';a.click();URL.revokeObjectURL(a.href);};
  document.addEventListener('keydown',e=>{if($('#detailView').classList.contains('open')){if(e.key==='Escape')closeDetail();return;} if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);if(e.key==='Enter')openDetail();});
  stage.addEventListener('pointerdown',e=>{if(!e.target.closest('.tape'))return;drag={x:e.clientX,moved:false,start:target};});
  window.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>5)drag.moved=true;const h=Math.min(innerHeight*.48,innerWidth*.32);target=clamp(drag.start-dx/Math.max(50,h*.215),0,Math.max(0,filtered().length-1));});
  window.addEventListener('pointerup',()=>{if(!drag)return;if(!drag.moved) { setTimeout(()=>drag=null,0); return; } selectedIndex=clamp(Math.round(target),0,Math.max(0,filtered().length-1));target=selectedIndex;suppressClickUntil=performance.now()+120;setTimeout(()=>drag=null,0);});
  window.addEventListener('pointercancel',()=>{if(drag){target=clamp(Math.round(target),0,Math.max(0,filtered().length-1));suppressClickUntil=performance.now()+120;drag=null;}});
}
resetShelf(); renderStage(); setCaption(getActiveWork()); bind(); requestAnimationFrame(tick);
