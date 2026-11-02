const statusEl=document.getElementById('status');
const say=(text)=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-IN';speechSynthesis.speak(u);};
async function send(action){try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});if(!tab?.id)throw Error('No active tab');chrome.tabs.sendMessage(tab.id,{action},response=>{if(chrome.runtime.lastError){statusEl.textContent='Open the Saarthi demo page (localhost) and try again.';return;}const text=response?.message||'Done.';statusEl.textContent=text;if(response?.speak!==false)say(text);});}catch(e){statusEl.textContent='Open the demo page and try again.';}}
document.getElementById('explain').onclick=()=>send('explain');
document.getElementById('listen').onclick=()=>{
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){statusEl.textContent='Speech recognition is not supported in this browser. Try Chrome or use the Explain button.';say(statusEl.textContent);return;}
 const r=new SR();r.lang='en-IN';r.interimResults=false;r.onstart=()=>statusEl.textContent='Listening…';r.onerror=()=>statusEl.textContent='Could not hear you. Try again or use a demo command.';r.onresult=e=>{const command=e.results[0][0].transcript.toLowerCase();statusEl.textContent='You said: '+command;
 if(command.includes('explain')||command.includes('page'))send('explain');
 else if(command.includes('find')||command.includes('status')||command.includes('highlight'))send('highlight');
 else if(command.includes('click')||command.includes('check')){statusEl.textContent='I can click the Check Status button. Please confirm on the page.';say(statusEl.textContent);send('prepareClick');}
 else {say('I heard '+command+'. Try saying explain this page or find the status button.');}
 };r.start();
};
document.getElementById('stop').onclick=()=>{speechSynthesis.cancel();statusEl.textContent='Audio stopped.';};