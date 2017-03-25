const bind = require('./bind.dom.js');

// Test that bind works with a DOM interface
describe('DOM EventTarget Interface', () => {
  let elm, callback;

  beforeEach(() => {
    // mock the jquery interface
    elm = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    // mock a callback function
    callback = jest.fn();
  });

  describe('bind(element, eventName, callback)', () => {
    test('eventName: "customEvent"', () => {
      bind(elm, 'customEvent', callback);
      expect(elm.addEventListener).toHaveBeenCalledWith('customEvent', callback);
    });

    test('unbind "customEvent"', () => {
      const unbind = bind(elm, 'customEvent', callback);
      unbind();
      expect(elm.removeEventListener).toHaveBeenCalledWith('customEvent', callback);
    });

  }); // bind(element, eventName, callback)
});
