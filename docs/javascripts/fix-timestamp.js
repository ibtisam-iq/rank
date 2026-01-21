// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Fix 1: Add AM/PM to timestamp
  function fixTimestamp() {
    var timestampEl = document.querySelector('.md-source-file__fact');
    if (!timestampEl) return;
    
    var text = timestampEl.textContent;
    
    // Check if AM/PM already present
    if (text.indexOf(' AM') !== -1 || text.indexOf(' PM') !== -1) {
      return;
    }
    
    // Match: "Last Updated: January 19, 2026 10:19:18 PKT"
    var match = text.match(/Last Updated:\s+(\w+ \d+, \d+)\s+(\d{1,2}):(\d{2}):(\d{2})\s+PKT/);
    
    if (match) {
      var date = match[1];
      var hour = parseInt(match[2]);
      var minute = match[3];
      var second = match[4];
      
      var period = hour >= 12 ? 'PM' : 'AM';
      var hour12 = hour % 12 || 12;
      
      var newText = 'Last Updated: ' + date + ' ' + hour12 + ':' + minute + ':' + second + ' ' + period + ' PKT';
      timestampEl.textContent = newText;
    }
  }
  
  // Fix 2: Add site name to mobile drawer
  function fixMobileDrawer() {
    var drawerTitle = document.querySelector('.md-nav--primary .md-nav__title[for="__drawer"]');
    if (!drawerTitle) return;
    
    // Check if already has site name
    var existingLabel = drawerTitle.querySelector('.md-nav__button + .md-ellipsis');
    if (existingLabel && existingLabel.textContent.trim() !== '') {
      return; // Already has title
    }
    
    // Create or update site name
    var labelEl = existingLabel || document.createElement('span');
    if (!existingLabel) {
      labelEl.className = 'md-ellipsis';
      labelEl.style.fontWeight = '600';
      labelEl.style.fontSize = '1.05rem';
      drawerTitle.appendChild(labelEl);
    }
    labelEl.textContent = 'Ibtisam IQ';
  }
  
  // Run fixes
  fixTimestamp();
  fixMobileDrawer();
  
  // Re-run on instant navigation (MkDocs Material feature)
  var observer = new MutationObserver(function() {
    fixTimestamp();
    fixMobileDrawer();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
