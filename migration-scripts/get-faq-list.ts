interface FAQItem {
  q?: string,
  a?: string
}
(() => {
  const faqs: FAQItem[] = [];
  const faqElements = document.querySelectorAll('.faq-answer');
  [].forEach.call(faqElements, (faqElement: HTMLElement) => {
    const faq: FAQItem = {
      q: faqElement.querySelector(':scope > .faq-question')?.textContent?.trim(),
      a: faqElement.querySelector(':scope > .faq-answer-wrapper')?.innerHTML?.trim()
    }

    faqs.push(faq);
  });

  const json = JSON.stringify(faqs, null, '  ');
  console.log(json);
  tuyen.setClipboardText(json);
})();