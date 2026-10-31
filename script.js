const config=window.SITE_CONFIG||{};
const languageButton=document.querySelector('.lang');
const menuButton=document.querySelector('.menu');
const nav=document.querySelector('nav');
const strings=[...document.querySelectorAll('[data-en][data-es]')];
let language='es';

function applySettings(){
  document.querySelectorAll('[data-setting="businessName"]').forEach(el=>el.textContent=config.businessName||"Elegguacita's Raíces & Rizos");
  document.querySelectorAll('[data-setting="brandName"]').forEach(el=>el.textContent=config.brandName||"Elegguacita's");
  const brandLine=typeof config.brandLine==='string'?config.brandLine:(config.brandLine?.[language]||'Raíces & Rizos');
  document.querySelectorAll('[data-setting="brandLine"]').forEach(el=>el.textContent=brandLine);
  document.title=`${config.businessName||"Elegguacita's Raíces & Rizos"} | Hair & Beauty`;
  const description=document.querySelector('meta[name="description"]');
  if(description&&config.location)description.content=language==='es'?`Trenzas, extensiones, cuidado natural y pestañas en ${config.location}.`:`Braids, extensions, natural hair care, and lashes in ${config.location}.`;
  const location=document.querySelector('[data-setting="location"]');
  if(config.location&&location){location.textContent=language==='es'?`Ubicación: ${config.location}`:`Location: ${config.location}`;location.hidden=false;}
  const email=document.querySelector('[data-contact="email"]');
  if(email&&config.email)email.href=`mailto:${config.email}`;
  const links={facebook:config.facebook,instagram:config.instagram,whatsapp:config.whatsapp?`https://wa.me/${config.whatsapp.replace(/\D/g,'')}`:''};
  document.querySelectorAll('[data-social]').forEach(link=>{
    const url=links[link.dataset.social];
    if(url){link.href=url;link.target='_blank';link.rel='noopener noreferrer';}
  });
}

document.documentElement.lang=language;
strings.forEach(el=>el.innerHTML=el.dataset[language]);
applySettings();
languageButton.addEventListener('click',()=>{
  language=language==='en'?'es':'en';
  document.documentElement.lang=language;
  strings.forEach(el=>el.innerHTML=el.dataset[language]);
  languageButton.setAttribute('aria-pressed',String(language==='es'));
  languageButton.setAttribute('aria-label',language==='en'?'Switch language to Spanish':'Cambiar idioma a inglés');
  applySettings();
});
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open));
  menuButton.setAttribute('aria-label',language==='es'?(open?'Abrir menú':'Cerrar menú'):(open?'Open menu':'Close menu'));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',language==='es'?'Abrir menú':'Open menu');}));
document.querySelector('#year').textContent=new Date().getFullYear();
