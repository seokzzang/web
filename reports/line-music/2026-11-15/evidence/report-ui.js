
const shotData=JSON.parse(document.getElementById('shot-data').textContent);
const shotIds=Object.keys(shotData);
document.querySelectorAll('img[data-shot]').forEach(img=>{const s=shotData[img.dataset.shot];img.src=s.src;});
const modal=document.getElementById('screen-modal');let current=0;let priorFocus=null;
function openShot(id){const s=shotData[id];if(!s)return;current=shotIds.indexOf(id);document.getElementById('modal-image').src=s.src;document.getElementById('modal-image').alt=s.title+' 실제 앱 캡처';document.getElementById('modal-title').textContent=s.title;document.getElementById('modal-note').textContent=s.note;document.getElementById('modal-meta').textContent='화면 '+id.slice(0,2)+' / '+shotIds.length+' · '+s.captured_at;document.getElementById('download-shot').href=s.src;document.getElementById('download-shot').download=id+'.png';if(!modal.open){priorFocus=document.activeElement;modal.showModal();document.body.style.overflow='hidden';}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-open]');if(t)openShot(t.dataset.open);});
document.getElementById('modal-close').addEventListener('click',()=>modal.close());
document.getElementById('prev-shot').addEventListener('click',()=>openShot(shotIds[(current-1+shotIds.length)%shotIds.length]));
document.getElementById('next-shot').addEventListener('click',()=>openShot(shotIds[(current+1)%shotIds.length]));
modal.addEventListener('close',()=>{document.body.style.overflow='';if(priorFocus)priorFocus.focus({preventScroll:true});});
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
document.addEventListener('keydown',e=>{if(!modal.open)return;if(e.key==='ArrowRight'){e.preventDefault();openShot(shotIds[(current+1)%shotIds.length]);}if(e.key==='ArrowLeft'){e.preventDefault();openShot(shotIds[(current-1+shotIds.length)%shotIds.length]);}});
const q=document.getElementById('feature-search'),filter=document.getElementById('status-filter');
const rows=[...document.querySelectorAll('#inventory-table tbody tr')];
function searchFeatures(){const query=q.value.trim().toLocaleLowerCase();let visible=0;for(const row of rows){const show=(!query||row.textContent.toLocaleLowerCase().includes(query))&&(!filter.value||row.dataset.status===filter.value);row.hidden=!show;if(show)visible++;}document.getElementById('result-count').textContent=visible+' / '+rows.length+'개 항목';document.getElementById('empty-search').hidden=visible!==0;}
q.addEventListener('input',searchFeatures);filter.addEventListener('change',searchFeatures);searchFeatures();
document.getElementById('clear-search').addEventListener('click',()=>{q.value='';filter.value='';searchFeatures();q.focus();});
document.getElementById('print-button').addEventListener('click',()=>window.print());
let beforePrintState=[];window.addEventListener('beforeprint',()=>{beforePrintState=rows.map(r=>r.hidden);rows.forEach(r=>r.hidden=false);});window.addEventListener('afterprint',()=>{rows.forEach((r,i)=>r.hidden=beforePrintState[i]||false);});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){document.querySelectorAll('.sidebar a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}}},{rootMargin:'-10% 0px -70% 0px',threshold:0});document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));}
