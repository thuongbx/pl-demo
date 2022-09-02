/* global PluginUIExtension, pluginDesign */
"use strict";

window.optimizelyJs = window.optimizelyJs || {
  changeViewNames: function () {
    const sizeList = [...document.querySelectorAll(".pl-c-size-list .pl-c-size-list__item")];
    sizeList.forEach(size => {
      const icon = size.querySelector("pl-icon");
      const tooltipText = size.querySelector(".pl-tooltip__text");
      if (!icon || !icon.name || !tooltipText) {
        return;
      }

      const svgUse = icon.querySelector(".c-icon use");
      if (!svgUse) {
        return;
      }

      if (icon.name == "phone") {
        tooltipText.textContent = "Mobile";
      }

      if (icon.name == "tablet") {
        tooltipText.textContent = "Tablet";
        // svgUse.setAttribute('xlink:href', "#laptop");
      }

      if (icon.name == "laptop") {
        tooltipText.textContent = "Desktop";
        svgUse.setAttribute('xlink:href', "#desktop");
      }

      if (icon.name == "desktop") {
        svgUse.setAttribute('xlink:href', "#hay");
      }
    });
  },
  addStateSelector: function () {
    const plToolList = document.querySelector(".pl-c-tools__list");
    if (!plToolList) {
      return;
    }

    const localStorageKey = "pl-show-state-selector";
    const showStateSelector = localStorage.getItem(localStorageKey);
    const text = showStateSelector ? "Hide state modifier" : "Show state modifier";

    const stateAnimationHtml = showStateSelector
      ? ''
      : `
        <ul class="pl-state-toggle__circles">
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
          <li class="pl-state-toggle__circle"></li>
        </ul>
      `;

    const stateSelectorHtml = `<li class="pl-c-tools__item pl-state-toggle">
      <div class="pl-state-toggle__container">
        ${stateAnimationHtml}
        <div class="pl-state-toggle__content">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display: none;">
            <symbol viewBox="0 0 24 24" id="pl-states">
              <path d="M7 16c.55 0 1 .45 1 1 0 1.1-.9 2-2 2-.17 0-.33-.02-.5-.05.31-.55.5-1.21.5-1.95 0-.55.45-1 1-1M18.67 3c-.26 0-.51.1-.71.29L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41l-1.34-1.34c-.2-.2-.45-.29-.7-.29zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" />
            </symbol>
          </svg>
          <a class="pl-c-button pl-c-button--medium pl-c-button__state-selector-toggle">
            <span class="pl-c-button__text ">${text}</span>
            <span class="pl-c-button__icon">
              <svg class="c-icon c-icon--auto" viewBox="0 0 24 24" style="fill: currentColor;">
                <use xlink:href="#pl-states"></use>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </li>`;

    plToolList.insertAdjacentHTML('afterbegin', stateSelectorHtml);

    const button = plToolList.querySelector(".pl-c-button__state-selector-toggle");
    if (button) {
      button.addEventListener("click", () => {
        if (showStateSelector) {
          localStorage.removeItem(localStorageKey);
        } else {
          localStorage.setItem(localStorageKey, 'true');
        }
        location.reload();
      });

      setTimeout(() => {
        const circles = [...plToolList.querySelectorAll(".pl-state-toggle__circle")];
        circles.forEach(circle => {
          circle.classList.add("no-animation");
        });
      }, 20000);
    }
  },
  allowFrameFeature: function (frame, token) {
    if (!frame.sandbox.supports(token)) {
      return;
    }

    frame.sandbox.add(token);
  },
  allowFrameFeatures: function () {
    const frames = [...document.querySelectorAll(".pl-c-viewport__iframe")];
    frames.forEach(frame => {
      let shouldReload = frame.sandbox && ![...frame.sandbox].includes('allow-downloads');

      this.allowFrameFeature(frame, 'allow-downloads');
      this.allowFrameFeature(frame, 'allow-forms');
      this.allowFrameFeature(frame, 'allow-modals');
      this.allowFrameFeature(frame, 'allow-popups');
      this.allowFrameFeature(frame, 'allow-popups-to-escape-sandbox');
      this.allowFrameFeature(frame, 'allow-presentation');
      this.allowFrameFeature(frame, 'allow-same-origin');
      this.allowFrameFeature(frame, 'allow-scripts');
      this.allowFrameFeature(frame, 'allow-top-navigation');

      if (shouldReload) {
        // Reload the frame
        frame.src += '';
      }
    });
  }
}

var PluginUIExtension = {
  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: () => {
    console.log("Optimizely enhancement loaded.");
    window.optimizelyJs.changeViewNames();
    window.optimizelyJs.addStateSelector();
    window.optimizelyJs.allowFrameFeatures();
  },
};