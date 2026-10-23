// Motion: aparición al scroll (solo para lo que arranca fuera de pantalla) y contadores de casos
(()=>{
  if(!("IntersectionObserver" in window))return;
  const els=[...document.querySelectorAll("section > .in > .head, .duo, .team-t, .contact-l, #lead")];
  document.querySelectorAll(".pains,.services,.cases,.work,.steps,.plans,.quotes,.faq,.incl,.rel").forEach(g=>
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

document.getElementById("lead")?.addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.target, ok=document.getElementById("ok");
  const req=["nombre","wa","negocio"].filter(n=>!f[n].value.trim());
  ok.hidden=false;
  if(req.length){ok.textContent="Completá nombre, WhatsApp y negocio para seguir.";f[req[0]].focus();return}
  const msg=`Hola Eureka! Soy ${f.nombre.value.trim()} (${f.negocio.value.trim()}). Busco: ${f.busca.value}. Inversión en anuncios: ${f.inv.value}. Los encontré por: ${f.origen.value}. Mi WhatsApp: ${f.wa.value.trim()}.`;
  const url="https://wa.me/5493415014376?text="+encodeURIComponent(msg);
  ok.innerHTML=`Listo. <a href="${url}" target="_blank" rel="noopener">Abrí WhatsApp para enviarnos tu consulta →</a>`;
});
