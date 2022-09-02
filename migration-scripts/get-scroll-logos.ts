interface ScrollLogo {
  url?: string,
  src?: string,
  alt?: string,
  width?: string,
  height?: string
}
(() => {
  const list: ScrollLogo[] = [];
  const items = document.querySelectorAll('#main .scroll-logos a');
  [].forEach.call(items, (item: HTMLElement) => {
    const img: HTMLImageElement | null = item.querySelector('img');
    if (!img) {
      return;
    }

    const url = item.getAttribute('href')?.trim();
    const src = img.getAttribute('src')?.trim();
    const alt = img.getAttribute('alt')?.trim();
    const width = img.getAttribute("width")?.trim();
    const height = img.getAttribute("height")?.trim();

    list.push({
      url,
      src,
      alt,
      width,
      height
    });
  });

  const output = JSON.stringify(list, null, '  ');
  console.log(output);

  tuyen.setClipboardText(output);
})();
