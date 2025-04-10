document.addEventListener('DOMContentLoaded', function () {
    new Splide('#card-carousel', {
      accessibility: true,
      type: 'loop',       // Infinite loop
      perPage: 3,         // Show 3 cards on desktop
      perMove: 1,         // Move 1 card at a time
      gap: '20px',        // Space between cards
      autoplay: true,     // Auto-scroll
      interval: 3000,     // Change every 3 seconds
      pagination: false,
      breakpoints: {
        1024: { perPage: 2 }, // 2 cards on tablets
        768: { perPage: 1 }   // 1 card on mobile
      }
    }).mount();
});

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.splide__slide');

  slides.forEach((slide) => {
    // Check if there is an unnecessary role attribute
    if (slide.hasAttribute('role') && slide.getAttribute('role') !== 'listitem') {
      slide.removeAttribute('role');
    }
  });
});


