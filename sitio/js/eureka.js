// Motion: aparición al scroll (solo para lo que arranca fuera de pantalla) y contadores de casos
(()=>{
  if(!("IntersectionObserver" in window))return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const els=[...document.querySelectorAll("section > .in > .head, .duo, .team-t, .contact-l, #lead")];
  document.querySelectorAll(".pains,.svcs,.cases,.acc,.work,.steps,.plans,.quotes,.faq,.incl,.rel").forEach(g=>
    [...g.children].forEach((c,i)=>{c.style.setProperty("--d",(i*.09)+"s");els.push(c)}));
  const count=el=>{
    const to=parseFloat(el.dataset.count),pre=el.dataset.prefix||"",suf=el.dataset.suffix||"",t0=performance.now();
    const tick=t=>{const k=Math.min(1,(t-t0)/1400),v=to*(1-Math.pow(1-k,3));
      el.textContent=pre+(Number.isInteger(to)?Math.round(v):v.toFixed(1))+suf;if(k<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick)};
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.remove("pre");io.unobserve(e.target);
    e.target.querySelectorAll("[data-count]").forEach(count)}),{rootMargin:"0px 0px -8% 0px"});
  els.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add("rv","pre");io.observe(el)});
})();

// Formulario en 3 pasos: primero el negocio, después qué necesita y al final el WhatsApp.
// Sin JS se ven los tres pasos juntos y el envío funciona igual.
(()=>{
  const f=document.getElementById("lead");if(!f)return;
  const pasos=[...f.querySelectorAll(".paso")],nombres=["Tu negocio","En qué te ayudamos","A dónde te lo mandamos"];
  const err=document.getElementById("err"),back=document.getElementById("f-back"),nextT=document.getElementById("f-next-t");
  const ok=document.getElementById("ok"),waLink=document.getElementById("wa-link"),nav=f.querySelector(".f-nav"),prog=f.querySelector(".prog");
  let i=0;f.classList.add("js-pasos");
  const show=(n,dir)=>{i=n;pasos.forEach((p,k)=>{p.classList.toggle("on",k===i);p.classList.toggle("back",k===i&&dir<0)});
    document.getElementById("prog-t").textContent=`Paso ${i+1} de 3 · ${nombres[i]}`;
    document.getElementById("prog-b").style.width=((i+1)/3*100)+"%";
    back.hidden=i===0;nextT.textContent=i===2?"Quiero mi diagnóstico":"Siguiente";err.hidden=true;
    if(i===2){const n=f.nombre.value.trim().split(/\s+/)[0];
      document.getElementById("paso3-t").textContent=(n?`Listo, ${n}. `:"")+"¿A qué WhatsApp te mandamos el diagnóstico?"}};
  const falta=campos=>{const v=campos.filter(n=>!f[n].value.trim());campos.forEach(n=>f[n].setAttribute("aria-invalid",v.includes(n)));return v};
  const msg=()=>{const busca=[...f.querySelectorAll('[name=busca]:checked')].map(x=>x.value).join(", ")||"No sé, quiero el diagnóstico";
    const origen=f.querySelector('[name=origen]:checked')?.value;
    return `Hola Eureka! Soy ${f.nombre.value.trim()} (${f.negocio.value.trim()}). Busco: ${busca}. Inversión en anuncios: ${f.querySelector('[name=inv]:checked').value}.`+(origen?` Los encontré por: ${origen}.`:"")+` Mi WhatsApp: ${f.wa.value.trim()}.`};
  const link=()=>waLink.href="https://wa.me/5493415014376?text="+encodeURIComponent(msg());
  back.addEventListener("click",()=>show(i-1,-1));
  f.addEventListener("submit",e=>{e.preventDefault();
    const req=[["nombre","negocio"],[],["wa"]][i],v=falta(req);
    if(v.length){err.hidden=false;err.textContent=v.includes("wa")?"Dejanos tu WhatsApp para mandarte el diagnóstico.":"Completá tu nombre y tu negocio para seguir.";f[v[0]].focus();return}
    if(i<2){show(i+1,1);pasos[i].querySelector("input")?.focus({preventScroll:true});return}
    pasos.forEach(p=>p.classList.remove("on"));nav.hidden=true;prog.hidden=true;err.hidden=true;ok.hidden=false;link();
  });
  f.querySelectorAll('[name=origen]').forEach(r=>r.addEventListener("change",link));
  show(0,1);
})();

// Reel de un caso: se carga recién cuando se abre, para no traer Instagram en la home
document.querySelectorAll(".acc-i").forEach(d=>{
  const load=()=>d.querySelectorAll("iframe[data-src]").forEach(f=>{if(!f.getAttribute("src"))f.src=f.dataset.src});
  d.addEventListener("toggle",()=>{if(d.open)load()});
  if(d.open)load();
});

// Casos: el fondo se ilumina siguiendo el mouse
document.querySelectorAll(".acc-i").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();
  c.style.setProperty("--x",(e.clientX-r.left)+"px");c.style.setProperty("--y",(e.clientY-r.top)+"px")}));

// Pestañas de servicios: sin JS se ven los tres paneles
document.querySelectorAll('[role="tablist"]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role="tab"]')];
  const show=t=>{tabs.forEach(x=>{const on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;
    document.getElementById(x.getAttribute("aria-controls")).hidden=!on})};
  tabs.forEach((t,i)=>{
    t.addEventListener("click",()=>show(t));
    t.addEventListener("keydown",e=>{const d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;
      if(!d)return;e.preventDefault();const n=tabs[(i+d+tabs.length)%tabs.length];n.focus();show(n)})});
  show(tabs.find(t=>t.getAttribute("aria-selected")==="true")||tabs[0]);
});

// Titular del hero: "en likes" → "en clics" → "en ventas". Sin JS o con movimiento reducido queda "ventas".
(()=>{
  const em=document.querySelector(".hero h1 em"),h1=em?.closest("h1");
  if(!em||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const words=["likes","clics",em.textContent],w=document.createElement("span");
  h1.setAttribute("aria-label",h1.textContent.replace(/\s+/g," ").trim());
  w.className="rw-w";w.setAttribute("aria-hidden","true");w.textContent=words[0];
  em.textContent="";em.append(w);em.classList.add("rw");em.parentElement.classList.add("rw-ln");
  let i=0;const wait=ms=>new Promise(r=>setTimeout(r,ms));
  (async()=>{
    await wait(1300);
    while(++i<words.length){
      em.classList.add("out");await wait(650);
      em.classList.add("swap");await wait(250);
      w.textContent=words[i];em.classList.remove("out","swap");
      if(i<words.length-1)await wait(1000);
    }
    em.classList.add("done");
  })();
})();

// Casos como lomos de libros: se abre uno y el resto queda parado al costado
document.querySelectorAll(".sb").forEach(g=>{const cs=[...g.querySelectorAll(".sb-c")];
  const open=c=>cs.forEach(x=>{const on=x===c;x.classList.toggle("on",on);x.setAttribute("aria-expanded",on)});
  cs.forEach(c=>{c.addEventListener("click",()=>{if(!c.classList.contains("on"))open(c)});
    c.addEventListener("keydown",e=>{if(e.target===c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();open(c)}})})});
