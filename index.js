// Set current year dynamically - run immediately
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Try to set year immediately
setCurrentYear();

// Also set it when DOM is loaded
document.addEventListener('DOMContentLoaded', setCurrentYear);

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

document.getElementById('resume-button-1').addEventListener("click", () => {
  window.open("https://drive.google.com/file/d/1UAj5f-fHiInGHRnJJjCvNHGGwzpm3RMo/view?usp=share_link", "_blank");
});



// Certificate Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const showAllBtn = document.getElementById('showAllCertificates');
  const certificateContainer = document.getElementById('certificateSliderContainer');
  const certificateSlider = document.getElementById('certificateSlider');
  
  if (showAllBtn && certificateContainer && certificateSlider) {
    let isShowingAll = false;
    
    showAllBtn.addEventListener('click', function() {
      isShowingAll = !isShowingAll;
      
      if (isShowingAll) {
        // Show all certificates in grid
        certificateContainer.classList.add('show-all');
        showAllBtn.classList.add('showing-all');
        showAllBtn.innerHTML = '<i class="bx bx-slideshow"></i>Show Slider View';

        // Ensure ALL cards are visible in grid view
        const cards = certificateSlider.querySelectorAll('.card');
        cards.forEach(card => { card.style.display = 'block'; });

        // Enable vertical scrolling and disable horizontal scrolling
        certificateSlider.style.overflowX = 'hidden';
        certificateSlider.style.overflowY = 'auto';
      } else {
        // Show slider view
        certificateContainer.classList.remove('show-all');
        showAllBtn.classList.remove('showing-all');
        showAllBtn.innerHTML = '<i class="bx bx-grid-alt"></i>Show All Certificates';

        // Ensure ALL cards are visible in slider view as well
        const cards = certificateSlider.querySelectorAll('.card');
        cards.forEach(card => { card.style.display = 'block'; });

        // Reset overflow for slider view
        certificateSlider.style.overflowX = 'visible';
        certificateSlider.style.overflowY = 'visible';
      }
    });
  }
});

// Certificate Slider Enhancement
document.addEventListener('DOMContentLoaded', function() {
  const certificateContainer = document.querySelector('.certificate-slider-container');
  const certificateSlider = document.querySelector('.certificate-slider');
  
  if (certificateContainer && certificateSlider) {
    // Ensure seamless loop by cloning the slides once (for CSS marquee effect)
    if (!certificateSlider.dataset.cloned) {
      const items = Array.from(certificateSlider.children);
      items.forEach((node) => {
        const clone = node.cloneNode(true);
        clone.classList.add('clone');
        certificateSlider.appendChild(clone);
      });
      certificateSlider.dataset.cloned = 'true';
    }

    // Keep loop speed constant regardless of number of items
    const updateSliderDuration = () => {
      if (certificateContainer.classList.contains('show-all')) {
        // No animation in grid mode
        certificateSlider.style.animationDuration = '';
        return;
      }
      const totalWidth = certificateSlider.scrollWidth; // includes clones
      // Distance per loop is 50% of total width (original content width)
      const distancePx = totalWidth * 0.5;
      const pixelsPerSecond = 80; // adjust to taste (lower = slower)
      const durationSec = Math.max(distancePx / pixelsPerSecond, 15); // set a sensible minimum
      certificateSlider.style.animationDuration = `${durationSec}s`;
    };

    // Initial set and on resize
    updateSliderDuration();
    window.addEventListener('resize', updateSliderDuration);

    let isScrolling = false;
    let scrollTimeout;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    // Helper to know if we're in grid (show-all) mode
    const inShowAllMode = () => certificateContainer.classList.contains('show-all');
    
    // Mouse wheel horizontal scrolling
    certificateContainer.addEventListener('wheel', function(e) {
      // In show-all mode, do not hijack the wheel; allow natural vertical scroll
      if (inShowAllMode()) {
        return;
      }
      // If the user's intent is vertical scrolling, allow default behavior
      const horizontalIntent = e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontalIntent) {
        return; // let page scroll vertically
      }
      e.preventDefault();
      
      // Pause animation during manual scroll
      certificateSlider.style.animationPlayState = 'paused';
      
      // Scroll horizontally (prefer deltaX if available, otherwise use deltaY)
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      certificateContainer.scrollLeft += delta;
      
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Resume animation after scrolling stops
      scrollTimeout = setTimeout(() => {
        certificateSlider.style.animationPlayState = 'running';
      }, 1000);
    }, { passive: false });
    
    // Click and drag functionality
    certificateContainer.addEventListener('mousedown', function(e) {
      if (inShowAllMode()) return; // Skip drag in grid mode
      isDragging = true;
      startX = e.pageX - certificateContainer.offsetLeft;
      startY = e.pageY - certificateContainer.offsetTop;
      scrollLeft = certificateContainer.scrollLeft;
      scrollTop = certificateContainer.scrollTop;
      
      // Change cursor to indicate dragging
      certificateContainer.style.cursor = 'grabbing';
      certificateContainer.style.userSelect = 'none';
      
      // Pause animation during drag
      certificateSlider.style.animationPlayState = 'paused';
      
      e.preventDefault();
    });
    
    certificateContainer.addEventListener('mousemove', function(e) {
      if (inShowAllMode()) return; // Skip drag logic in grid mode
      if (!isDragging) return;
      
      e.preventDefault();
      
      const x = e.pageX - certificateContainer.offsetLeft;
      const y = e.pageY - certificateContainer.offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      
      certificateContainer.scrollLeft = scrollLeft - walkX;
      certificateContainer.scrollTop = scrollTop - walkY;
    });
    
    certificateContainer.addEventListener('mouseup', function() {
      if (inShowAllMode()) return; // Nothing to do in grid mode
      isDragging = false;
      
      // Reset cursor
      certificateContainer.style.cursor = 'grab';
      certificateContainer.style.userSelect = 'auto';
      
      // Resume animation after drag ends
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        certificateSlider.style.animationPlayState = 'running';
      }, 1000);
    });
    
    certificateContainer.addEventListener('mouseleave', function() {
      if (inShowAllMode()) return;
      if (isDragging) {
        isDragging = false;
        certificateContainer.style.cursor = 'grab';
        certificateContainer.style.userSelect = 'auto';
        
        // Resume animation after drag ends
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          certificateSlider.style.animationPlayState = 'running';
        }, 1000);
      }
    });
    
    // Touch scrolling for mobile devices
    certificateContainer.addEventListener('touchstart', function(e) {
      if (inShowAllMode()) return; // Let native vertical scroll work in grid mode
      startX = e.touches[0].pageX - certificateContainer.offsetLeft;
      startY = e.touches[0].pageY - certificateContainer.offsetTop;
      scrollLeft = certificateContainer.scrollLeft;
      scrollTop = certificateContainer.scrollTop;
      
      // Pause animation during touch
      certificateSlider.style.animationPlayState = 'paused';
    }, { passive: true });
    
    certificateContainer.addEventListener('touchmove', function(e) {
      if (inShowAllMode()) return; // Let native vertical scroll work in grid mode
      if (startX == null) return;
      
      e.preventDefault();
      
      const x = e.touches[0].pageX - certificateContainer.offsetLeft;
      const y = e.touches[0].pageY - certificateContainer.offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      
      certificateContainer.scrollLeft = scrollLeft - walkX;
      certificateContainer.scrollTop = scrollTop - walkY;
    }, { passive: false });
    
    certificateContainer.addEventListener('touchend', function() {
      if (inShowAllMode()) return;
      startX = null;
      startY = null;
      
      // Resume animation after touch ends
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        certificateSlider.style.animationPlayState = 'running';
      }, 1000);
    });
    
    // Pause animation on hover/active states
    certificateContainer.addEventListener('mouseenter', function() {
      if (inShowAllMode()) return; // Do not pause in grid mode
      if (!isDragging) {
        certificateSlider.style.animationPlayState = 'paused';
      }
    });
    
    certificateContainer.addEventListener('mouseleave', function() {
      if (inShowAllMode()) return; // Do not resume in grid mode
      if (!isDragging) {
        certificateSlider.style.animationPlayState = 'running';
      }
    });
  }
});

// document.getElementById('resume-button-2').addEventListener("click", () => {
//   window.open("https://drive.google.com/file/d/1UAj5f-fHiInGHRnJJjCvNHGGwzpm3RMo/view?usp=share_link", "_blank");
// });

// // owl carousel script 
// $('.carousel').owlCarousel({
//   margin: 20,
//   loop: true,
//   autoplay: true,
//   autoplayTimeOut: 2000,
//   autoplayHoverPause: true,
//   responsive: {
//     0: {
//       items: 1,
//       nav: false
//     },
//     800: {
//       items: 2,
//       nav: false
//     },
//     // 1000: {
//     //   items: 3,
//     //   nav: false
//     // }
//   }
// });


