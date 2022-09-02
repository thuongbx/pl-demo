declare class Flickity {
  constructor(selector: string | Element, options?: Flickity.Options);

  slides: Element[];
  selectedIndex: number;
  x: number;
  slideableWidth: number;
  dragEndRestingSelect: () => number;
  updateSelectedSlide: () => void;
  settle: (x: number) => void;
}
