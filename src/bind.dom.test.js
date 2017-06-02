const expect = require('expect.js');
const bind = require('./bind.dom.js');

/**
 * Test that bind.dom.js calls the DOM API's addEventListener and removeEventListener
 */
describe('DOM EventTarget Interface', () => {
  let elm, callback;

  beforeEach(() => {
    // mock the EventTarget interface
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
    elm = {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    // mock a callback function
    callback = () => {};
  });

  /**
   * Test bind's standard interface
   */
  describe('bind(element, eventName, callback)', () => {
    it('adds event with element.addEventListener(eventName, callback)', (done) => {
      // bind should trigger this call.
      elm.addEventListener = function(eventName, cb) {
        expect(eventName).to.eql('customEvent');
        expect(cb).to.eql(callback);
        done();
      };
      // Call bind
      bind(elm, 'customEvent', callback);
    });

    it('removes event with element.removeEventListener(eventName, callback)', (done) => {
      // unbind should trigger this call.
      elm.removeEventListener = function(eventName, cb) {
        expect(eventName).to.eql('customEvent');
        expect(cb).to.eql(callback);
        done();
      };

      // call bind to create the unbind method
      const unbind = bind(elm, 'customEvent', callback);
      // call unbind to test
      unbind();
    });

    // test('unbind "customEvent"', () => {
    //   const unbind = bind(elm, 'customEvent', callback);
    //   unbind();
    //   expect(elm.removeEventListener).toHaveBeenCalledWith('customEvent', callback);
    // });

  }); // bind(element, eventName, callback)
});
