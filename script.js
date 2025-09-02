// Year
document.getElementById('y').textContent = new Date().getFullYear();

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

// ios-style segmented indicator
(function(){
  var segment = document.querySelector('.ios-segment');
  if(!segment) return;
  var links = segment.querySelectorAll('.ios-link');
  var indicator = segment.querySelector('.ios-indicator');
  if(!links.length || !indicator) return;

  function update(){
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var target = Array.from(links).find(a=>a.getAttribute('href').split('/').pop()===path) || links[0];
    links.forEach(l=>l.classList.remove('active'));
    target.classList.add('active');
    var rect = target.getBoundingClientRect();
    var parentRect = segment.getBoundingClientRect();
    var left = rect.left - parentRect.left;
    indicator.style.width = rect.width + 'px';
    // use transform with translateX and keep translateY(-50%) for vertical centering
    indicator.style.transform = 'translateX(' + left + 'px) translateY(-50%)';
  }

  // attach click listeners for instant feedback
  links.forEach(l=>l.addEventListener('click', function(){ links.forEach(x=>x.classList.remove('active')); this.classList.add('active'); update(); }));
  window.addEventListener('resize', update);
  setTimeout(update,60);
})();
