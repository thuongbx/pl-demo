(() => {
  const toggleMenu = (expandLink: HTMLElement, show: boolean) => {
    let ls: HTMLElement | null = expandLink.querySelector('ul');
    let ma: HTMLElement | null = expandLink.querySelector('.menuarrow');

    if (show) {
      expandLink.classList.add('showLinks');

      if (ls) {
        let lsh = ls.scrollHeight;
        ls.style.height = lsh + "px";
      }

      if (ma) {
        ma.style.transform = 'rotate(180deg)';
      }
    } else {
      expandLink.classList.remove('showLinks');

      if (ls) {
        ls.style.height = 0 + 'px';
      }

      if (ma) {
        ma.style.transform = 'rotate(0deg)';
      }
    }
  }

  const setExpandMenu = () => {
    const expandLinks = document.querySelectorAll('.expandLinks');
    [].forEach.call(expandLinks, (exp: HTMLElement) => {
      exp.addEventListener('click', function (e: MouseEvent) {
        e.preventDefault();

        if (exp.classList.contains('showLinks')) {
          toggleMenu(exp, false);
          return;
        }
        [].forEach.call(expandLinks, (expandLink) => toggleMenu(expandLink, false));
        toggleMenu(exp, true);
      })
    });
  }

  const setToggleMobileNavigation = () => {
    const burger = document.querySelector('.burger');
    if (!burger) {
      return;
    }

    burger.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('open-mobile-navigation');
    });
  }

  setToggleMobileNavigation();
  setExpandMenu();
})();