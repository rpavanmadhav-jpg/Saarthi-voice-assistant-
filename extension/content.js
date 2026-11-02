function visible(el){return !!(el.offsetWidth||el.offsetHeight||el.getClientRects().length)}
function candidates(){return [...document.querySelectorAll('button,a,input,select,textarea,[role="button"]')].filter(visible)}
function label(el){return (el.innerText||el.getAttribute('aria-label')||el.placeholder||el.value||el.title||el.tagName).trim()}
function clearHighlights(){document.querySelectorAll('.saarthi-highlight').forEach(el=>el.classList.remove('saarthi-highlight'))}
function findStatus(){return candidates().find(el=>/check status|status|search/i.test(label(el)))}
chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
 if(msg.action==='explain'){
  const els=candidates().slice(0,12).map(label).filter(Boolean);
  const message=els.length?'I can see '+els.length+' interactive items. They include: '+els.slice(0,5).join(', ')+'. Tell me what you want to do.':'I could not find interactive items on this page.';
  sendResponse({message});return true;
 }
 if(msg.action==='highlight'){
  clearHighlights();const el=findStatus();
  if(el){el.classList.add('saarthi-highlight');el.scrollIntoView({behavior:'smooth',block:'center'});sendResponse({message:'I highlighted '+label(el)+'.'});}
  else sendResponse({message:'I could not find a status or search button on this page.'});
  return true;
 }
 if(msg.action==='prepareClick'){
  const el=findStatus();
  if(!el){sendResponse({message:'I could not find the Check Status button.'});return true;}
  clearHighlights();el.classList.add('saarthi-highlight');el.scrollIntoView({behavior:'smooth',block:'center'});
  const old=document.getElementById('saarthi-confirm');if(old)old.remove();
  const box=document.createElement('div');box.id='saarthi-confirm';box.innerHTML='<strong>Saarthi</strong><p>Click “Continue” to activate '+label(el)+'.</p><button id="saarthi-yes">Continue</button><button id="saarthi-no">Cancel</button>';
  document.body.appendChild(box);
  box.querySelector('#saarthi-yes').onclick=()=>{box.remove();el.click();};
  box.querySelector('#saarthi-no').onclick=()=>box.remove();
  sendResponse({message:'I highlighted the button and opened a confirmation. Choose Continue to proceed.'});return true;
 }
});