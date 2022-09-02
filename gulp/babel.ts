import { } from "@babel/core";

export interface BabelIncludedFunction {
  origin: string,
  pattern: string
}

export const includedFunctions: BabelIncludedFunction[] = [
  {
    origin: 'function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}',
    pattern: 'function _toConsumableArray(___){return _arrayWithoutHoles(___)||_iterableToArray(___)||_unsupportedIterableToArray(___)||_nonIterableSpread()}'
  },
  {
    origin: 'function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}',
    pattern: 'function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}'
  },
  {
    origin: 'function _unsupportedIterableToArray(r,e){if(r){if("string"==typeof r)return _arrayLikeToArray(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Map"===(t="Object"===t&&r.constructor?r.constructor.name:t)||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,e):void 0}}',
    pattern: 'function _unsupportedIterableToArray(___,___){if(___){if("string"==typeof ___)return _arrayLikeToArray(___,___);var ___=Object.prototype.toString.call(___).slice(8,-1);return"Map"===(___="Object"===___&&___.constructor?___.constructor.name:___)||"Set"===___?Array.from(___):"Arguments"===___||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(___)?_arrayLikeToArray(___,___):void 0}}'
  },
  {
    origin: 'function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}',
    pattern: 'function _iterableToArray(___){if("undefined"!=typeof Symbol&&null!=___[Symbol.iterator]||null!=___["@@iterator"])return Array.from(___)}'
  },
  {
    origin: 'function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}',
    pattern: 'function _arrayWithoutHoles(___){if(Array.isArray(___))return _arrayLikeToArray(___)}'
  },
  {
    origin: 'function _arrayLikeToArray(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}',
    pattern: 'function _arrayLikeToArray(___,___){(null==___||___>___.length)&&(___=___.length);for(var ___=0,___=new Array(___);___<___;___++)___[___]=___[___];return ___}',
  },
  {
    origin: 'function _createForOfIteratorHelper(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==t.return||t.return()}finally{if(i)throw a}}}}',
    pattern: 'function _createForOfIteratorHelper(___,___){var ___="undefined"!=typeof Symbol&&___[Symbol.iterator]||___["@@iterator"];if(!___){if(Array.isArray(___)||(___=_unsupportedIterableToArray(___))||___&&___&&"number"==typeof ___.length){___&&(___=___);var ___=0,___=function(){};return{___:___,___:function(){return ___>=___.length?{done:!0}:{done:!1,___:___[___++]}},___:function(___){throw ___},___:___}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var ___,___=!0,___=!1;return{___:function(){___=___.call(___)},___:function(){var ___=___.next();return ___=___.done,___},___:function(___){___=!0,___=___},___:function(){try{___||null==___.return||___.return()}finally{if(___)throw ___}}}}'
  },
  {
    origin: 'function ownKeys(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}',
    pattern: 'function ownKeys(___,___){var ___,___=Object.keys(___);return Object.getOwnPropertySymbols&&(___=Object.getOwnPropertySymbols(___),___&&(___=___.filter(function(___){return Object.getOwnPropertyDescriptor(___,___).enumerable})),___.push.apply(___,___)),___}'
  },
  {
    origin: 'function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}',
    pattern: 'function _objectSpread(___){for(var ___=1;___<arguments.length;___++){var ___=null!=arguments[___]?arguments[___]:{};___%2?ownKeys(Object(___),!0).forEach(function(___){_defineProperty(___,___,___[___])}):Object.getOwnPropertyDescriptors?Object.defineProperties(___,Object.getOwnPropertyDescriptors(___)):ownKeys(Object(___)).forEach(function(___){Object.defineProperty(___,___,Object.getOwnPropertyDescriptor(___,___))})}return ___}'
  },
  {
    origin: 'function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}',
    pattern: 'function _defineProperty(___,___,___){return ___ in ___?Object.defineProperty(___,___,{___:___,___:!0,___:!0,___:!0}):___[___]=___,___}'
  }
];