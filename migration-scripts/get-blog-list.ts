// https://thefirstmile.co.uk/the-big-picture

interface BlogItem {
  url?: string,
  title?: string,
  text?: string,
  date?: string,
  featured?: boolean,
  img?: ResponsiveImg
}

(() => {
  const items: BlogItem[] = [];
  const blogItems = document.querySelectorAll('.blog-grid > .container > a');
  [].forEach.call(blogItems, (blockItem: HTMLAnchorElement) => {
    const item: BlogItem = {};
    const url = blockItem.getAttribute('href');

    if (url) {
      item.url = url;
    }

    item.featured = blockItem.classList.contains('blog-featured-item');
    if (item.featured) {
      const titleElement: HTMLElement | null = blockItem.querySelector('.blog-featured-item-text > h4');
      if (titleElement) {
        item.title = titleElement.textContent?.trim();
      }

      const textElement: HTMLElement | null = blockItem.querySelector('.blog-featured-item-text > p');
      if (textElement) {
        item.text = textElement.outerHTML;
      }
    } else {
      const titleElement: HTMLElement | null = blockItem.querySelector('.blog-thumb-text > h5');
      if (titleElement) {
        item.title = titleElement.textContent?.trim();
      }

      const textElement: HTMLElement | null = blockItem.querySelector('.blog-thumb-text > p');
      if (textElement) {
        item.text = textElement.outerHTML.trim()
      }

      const dateElement: HTMLElement | null = blockItem.querySelector('.blog-thumb-text > .post-date');
      if (dateElement) {
        item.date = dateElement.textContent?.trim();
      }
    }

    const backgroundImg: HTMLImageElement | null = blockItem.querySelector('img.background-img');
    if (backgroundImg) {
      const img: ResponsiveImg = {
        width: backgroundImg.getAttribute('width')?.trim(),
        height: backgroundImg.getAttribute('height')?.trim(),
        alt: backgroundImg.getAttribute('alt')?.trim(),
        src: backgroundImg.getAttribute('src')?.trim(),
        dataSrc: backgroundImg.getAttribute('data-src')?.trim(),
        dataSrcSet: backgroundImg.getAttribute('data-srcset')?.trim().replace(/[\n\t]+/gi, ''),
        dataSizes: backgroundImg.getAttribute('data-sizes')?.trim()
      };

      item.img = img;
    }

    items.push(item);
  });

  const json = JSON.stringify(items, null, '  ');
  console.log(json);

  tuyen.setClipboardText(json);
})();