const config=window.SITE_CONFIG||{};
const languageButton=document.querySelector('.lang');
const menuButton=document.querySelector('.menu');
const nav=document.querySelector('nav');
const strings=[...document.querySelectorAll('[data-en][data-es]')];
let language='es';
function installGoogleAnalytics(measurementId){
  if(!/^G-[A-Z0-9]+$/.test(measurementId||''))return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  window.gtag('config',measurementId);
  const tag=document.createElement('script');
  tag.async=true;
  tag.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(tag);
}

installGoogleAnalytics(config.googleAnalyticsId);

function applySettings(){
  document.querySelectorAll('[data-setting="businessName"]').forEach(el=>el.textContent=config.businessName||"Elegguacita's Raíces & Rizos");
  document.querySelectorAll('[data-setting="brandName"]').forEach(el=>el.textContent=config.brandName||"Elegguacita's");
  const brandLine=typeof config.brandLine==='string'?config.brandLine:(config.brandLine?.[language]||'Raíces & Rizos');
  document.querySelectorAll('[data-setting="brandLine"]').forEach(el=>el.innerHTML=brandLine.replace('&', '<i class="brand-amp">&amp;</i>'));
  const headerSizes={'--header-title-size':config.headerTitleSize||'18px','--header-subtitle-size':config.headerSubtitleSize||'8px','--header-mobile-title-size':config.headerMobileTitleSize||'16px','--header-mobile-subtitle-size':config.headerMobileSubtitleSize||'7px'};
  Object.entries(headerSizes).forEach(([property,value])=>document.documentElement.style.setProperty(property,value));
  const pageKind=window.location.pathname.endsWith('contact.html')?'contact':window.location.pathname.endsWith('gallery.html')?'gallery':'home';
  const pageTitles=pageKind==='contact'?['Contacto','Contact']:pageKind==='gallery'?['Galería','Gallery']:['Trenzas y belleza en La Habana','Braids & Beauty in Havana'];
  document.title=`${config.businessName||"Elegguacita's Raíces & Rizos"} | ${language==='es'?pageTitles[0]:pageTitles[1]}`;
  const description=document.querySelector('meta[name="description"]');
  if(description&&config.location)description.content=language==='es'?`Trenzas, extensiones, cuidado natural y pestañas en ${config.location}.`:`Braids, extensions, natural hair care, and lashes in ${config.location}.`;
  const location=document.querySelector('[data-setting="location"]');
  if(config.location&&location){location.textContent=language==='es'?`Ubicación: ${config.location}`:`Location: ${config.location}`;location.hidden=false;}
  const email=document.querySelector('[data-contact="email"]');
  if(email&&config.email){email.href=`mailto:${config.email}`;email.hidden=false;}
  const whatsappButton=document.querySelector('[data-contact="whatsapp"]');
  if(whatsappButton&&config.whatsapp){whatsappButton.href=`https://wa.me/${config.whatsapp.replace(/\D/g,'')}`;whatsappButton.hidden=false;}
  const links={facebook:config.facebook,instagram:config.instagram,whatsapp:config.whatsapp?`https://wa.me/${config.whatsapp.replace(/\D/g,'')}`:''};
  document.querySelectorAll('[data-social]').forEach(link=>{
    const url=links[link.dataset.social];
    if(url){link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.removeAttribute('aria-disabled');link.removeAttribute('tabindex');}
    else if(link.classList.contains('contact-option')){link.href='#';link.setAttribute('aria-disabled','true');link.tabIndex=-1;}
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
  renderGallery();
});
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!open));
  menuButton.setAttribute('aria-label',language==='es'?(open?'Abrir menú':'Cerrar menú'):(open?'Open menu':'Close menu'));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',language==='es'?'Abrir menú':'Open menu');}));
document.querySelector('#year').textContent=new Date().getFullYear();


function renderGallery(){
  const galleryTarget=document.querySelector('[data-gallery]');
  if(!galleryTarget||!Array.isArray(config.galleryPhotos))return;
  galleryTarget.innerHTML='';
  config.galleryPhotos.forEach((photo,index)=>{
    const figure=document.createElement('figure');
    figure.className='gallery-photo'+(index===0?' gallery-tall':'');
    const image=document.createElement('img');
    image.src=photo.src;image.alt=photo.alt||'';image.loading=index===0?'eager':'lazy';image.decoding='async';
    const caption=document.createElement('figcaption');
    const title=document.createElement('span');title.textContent=photo[language]||photo.en||'';
    const note=document.createElement('small');note.textContent='Unsplash · Inspiration';
    caption.append(title,note);figure.append(image,caption);galleryTarget.append(figure);
  });
}
renderGallery();