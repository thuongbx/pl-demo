(() => {
  // speed of ticker
  const tickerSpeed = 1;
  const slideshowEl: HTMLElement | null = document.querySelector('.scroll-logos');

  if (!slideshowEl) {
    return;
  }

  const options = {
    cellAlign: 'left',
    setGallerySize: true,
    dragThreshold: 25,
    pageDots: false,
    prevNextButtons: false,
    autoPlay: false,
    draggable: false,
    wrapAround: true,
    selectedAttraction: 0.015,
    friction: 0.25,
  };

  // create flickity instance
  const flickity = new Flickity(slideshowEl, options);

  flickity.x = 0;

  // functions
  const update = () => {
    if (flickity.slides) {
      flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
      flickity.selectedIndex = flickity.dragEndRestingSelect();
      flickity.updateSelectedSlide();
      flickity.settle(flickity.x);
    }
    requestAnimationFrame(update);
  };

  update();
})();