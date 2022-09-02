// https://thefirstmile.co.uk/the-big-picture/do-you-have-to-wash-your-recycling

interface RichTextBlock {
  richText: boolean;
  text?: string;
}

interface TextImageBlock {
  imageText: boolean;
  reverse?: boolean;
  img?: ResponsiveImg,
  title?: string,
  text?: string
}

const output: (RichTextBlock | TextImageBlock)[] = [];

const items = document.querySelectorAll('.blog-content .article-body > div');
[].forEach.call(items, (item: HTMLElement) => {
  if (item.classList.contains('text-block')) {
    const rtb: RichTextBlock = {
      richText: true,
      text: item.querySelector(':scope > .row > .columns')?.innerHTML.trim()
    }

    output.push(rtb);
  } else if (item.classList.contains('text-image-block')) {
    const tib: TextImageBlock = {
      imageText: true,
      reverse: item.classList.contains('align-right'),
      title: item.querySelector(':scope > .row > .columns:nth-child(2) > h4')?.textContent?.trim()
    }

    const children = item.querySelector(':scope > .row > .columns:nth-child(2)')?.childNodes;
    if (children) {
      let text = '';
      [].forEach.call(children, (child: Node) => {
        if (child.nodeType === Node.ELEMENT_NODE && child.nodeName !== 'H4') {
          text += (child as HTMLElement).outerHTML.trim()
        }
      })
      if (text) {
        tib.text = text;
      }
    }

    const imgElement: HTMLImageElement | null = item.querySelector(':scope > .row > .columns > img');
    if (imgElement) {
      const img: ResponsiveImg = {
        width: imgElement.getAttribute('width')?.trim(),
        height: imgElement.getAttribute('height')?.trim(),
        alt: imgElement.getAttribute('alt')?.trim(),
        src: imgElement.getAttribute('src')?.trim(),
        dataSrc: imgElement.getAttribute('data-src')?.trim(),
        dataSrcSet: imgElement.getAttribute('data-srcset')?.trim().replace(/[\n\t]+/gi, ''),
        dataSizes: imgElement.getAttribute('data-sizes')?.trim()
      };

      tib.img = img;
    }

    output.push(tib);
  }

  const json = JSON.stringify(output, null, '  ');
  console.log(json);

  tuyen.setClipboardText(json);
});