// Smooth scroll + active header tweaks
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href'); if(href==="#") return;
    const el=document.querySelector(href); if(!el) return;
    e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
