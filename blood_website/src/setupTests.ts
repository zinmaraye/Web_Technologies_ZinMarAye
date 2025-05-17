// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

// Add TextEncoder and TextDecoder polyfills for react-router-dom
class TextEncoderPolyfill {
  encode(input) {
    const utf8 = unescape(encodeURIComponent(input));
    const result = new Uint8Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) {
      result[i] = utf8.charCodeAt(i);
    }
    return result;
  }
}

class TextDecoderPolyfill {
  decode(input) {
    return decodeURIComponent(escape(String.fromCharCode.apply(null, input)));
  }
}

global.TextEncoder = TextEncoderPolyfill;
global.TextDecoder = TextDecoderPolyfill;
