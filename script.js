/*
  Social hover preview:
  - Each .social button has data-embed (URL) and data-label (string)
  - On hover, we show a fixed iframe preview (if allowed by the site).
  - On click, we open the regular profile link (data-href) in a new tab.
*/
(function(){
  const preview = document.getElementById('preview');
  if(!preview) return;
  const frame = document.getElementById('previewFrame');
  const title = document.getElementById('previewTitle');

  let hideTimer = null;

  function show(label, embedUrl){
    if (window.matchMedia("(max-width: 720px)").matches) return;
    if(!embedUrl) return;
    title.textContent = label || "Preview";
    frame.src = embedUrl;
    preview.style.display = 'block';
  }

  function hide(){
    preview.style.display = 'none';
    frame.src = 'about:blank';
  }

  function scheduleHide(){
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 180);
  }

  document.querySelectorAll('[data-social]').forEach(el=>{
    const href = el.getAttribute('data-href');
    const embed = el.getAttribute('data-embed');
    const label = el.getAttribute('data-label') || 'Social';

    el.addEventListener('mouseenter', ()=>{
      clearTimeout(hideTimer);
      show(label, embed);
    });
    el.addEventListener('mouseleave', scheduleHide);
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      if(href) window.open(href, '_blank', 'noopener');
    });
  });

  preview.addEventListener('mouseenter', ()=>clearTimeout(hideTimer));
  preview.addEventListener('mouseleave', scheduleHide);

  // Optional: close with Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') hide();
  });
})();
