// Year
document.getElementById('y').textContent = new Date().getFullYear();

// Simple mobile menu: convert links to a drawer on small screens
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');
const mq = window.matchMedia('(max-width: 760px)');

function setupMobileNav(active){
  if(active){
    btn.style.display = 'inline-block';
    nav.style.position = 'absolute';
    nav.style.top = 'var(--header-h)';
    nav.style.right = '20px';
    nav.style.padding = '12px';
    nav.style.background = '#fff';
    nav.style.border = '1px solid rgba(0,0,0,.08)';
    nav.style.borderRadius = '14px';
    nav.style.boxShadow = '0 12px 24px rgba(0,0,0,.12)';
    nav.style.display = 'none';
    nav.dataset.mode = 'mobile';
  }else{
    btn.style.display = 'none';
    nav.removeAttribute('style');
    nav.dataset.mode = 'desktop';
  }
}
setupMobileNav(mq.matches);
mq.addEventListener('change', e => setupMobileNav(e.matches));

btn.addEventListener('click', () => {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  if(nav.style.display === 'none'){ nav.style.display = 'flex'; }
  else{ nav.style.display = 'none'; }
});

// Close drawer when clicking a link on mobile
nav.addEventListener('click', e => {
  if(nav.dataset.mode === 'mobile' && e.target.tagName === 'A'){
    nav.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
  }
});

// Project filter pills functionality
const filterContainer = document.getElementById('project-filters');
const pills = filterContainer ? filterContainer.querySelectorAll('.pill') : [];
const cards = document.querySelectorAll('.cards .card');
let activeCat = null;

if(filterContainer) {
  filterContainer.addEventListener('click', e => {
    if(e.target.classList.contains('pill')) {
      const cat = e.target.getAttribute('data-cat');
      if(activeCat === cat) {
        // Show all cards if same pill is clicked again
        cards.forEach(card => card.style.display = '');
        activeCat = null;
        pills.forEach(p => p.classList.remove('active'));
      } else {
        // Filter cards by category
        cards.forEach(card => {
          const cardCat = card.getAttribute('data-cat') || '';
          card.style.display = cardCat.includes(cat) ? '' : 'none';
        });
        activeCat = cat;
        pills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
      }
    }
  });
}

// Make entire card clickable when it has an action link
const projectCards = document.querySelectorAll('.cards .card');
projectCards.forEach(card => {
  let link = card.querySelector('.actions a.btn');
  // fallback to data-link attribute if no action button exists
  if(!link){
    const href = card.getAttribute('data-link');
    if(href){
      // create a temporary object with href for reuse
      link = { href };
    }
  }
  if(link){
    card.classList.add('clickable');
    card.addEventListener('click', e => {
      const tag = e.target.tagName.toLowerCase();
      if(tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) return;
      window.open(link.href, '_blank', 'noopener');
    });
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        window.open(link.href, '_blank', 'noopener');
      }
    });
  }
});

// Ensure page title is correct and re-apply if something else overrides it
(function enforceTitle(){
  var desired = "DARYL MILANES — Portfolio";
  try{
    document.title = desired;
    window.addEventListener('load', function(){ document.title = desired; });
    document.addEventListener('visibilitychange', function(){ if(!document.hidden) document.title = desired; });
  }catch(e){/* ignore */}
})();
