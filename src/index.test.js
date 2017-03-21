const bind = require('./index.js');
const $ = require('jquery');

// Test that bind works with a jQuery interface
describe('jQuery Event Interface', () => {
  let $elm;

  beforeEach(() => {
    $elm = $('<div></div>');
  });

  test('can bind event', () => {
    return new Promise((resolve, reject) => {
      // basic single event syntax
      bind($elm, 'customEvent', () => {
        // success if called
        resolve();
      });

      // trigger the event
      $elm.trigger('customEvent');
    });
  });

  describe('unbind', () => {
    test('returns a function that unbinds the event', () => {
      const unbind = bind($elm, 'customEvent', () => {
        // fail if called
        expect(true).toBe('should not trigger after unbind()');
      });

      unbind();
      $elm.trigger('customEvent');
    });

    test('does not unbind other jquery events', () => {
      return new Promise((resolve, reject) => {
        const unbind = bind($elm, 'click', () => {
          // fail if called
          reject();
        });
        // native bind after, so if the unbind fails reject can be called before resolve
        $elm.on('click', () => {
          // Should be called
          resolve();
        });

        unbind();
        $elm.click();
      });
    });

    test('does not unbind other bind events', () => {
      return new Promise((resolve, reject) => {
        const unbind = bind($elm, 'click', () => {
          // fail if called
          reject();
        });
        // bind after, so if the unbind fails reject can be called before resolve
        bind($elm, 'click', () => {
          // Should be called
          resolve();
        });

        unbind();
        $elm.click();
      });
    });
  }); // unbind


  describe('Guards', () => {
    test('$elm has on method', () => {
      $elm.on = null;
      expect(() => {
        bind($elm, 'customEvent', () => {});
      }).toThrowError('$elm is missing the on method from jQuery API.')
    });

    test('$elm has off method', () => {
      $elm.off = null;
      expect(() => {
        bind($elm, 'customEvent', () => {});
      }).toThrowError('$elm is missing the off method from jQuery API.')
    });
  }); // Guards

  describe('Sanity Tests', () => {
    test('jquery native events work', () => {
      // Returning a promise makes the test async
      return new Promise((resolve, reject) => {
        $elm.on('click', () => {
          // success if called
          resolve();
        });

        $elm.click();
      });
    });

    test('jquery custom events work', () => {
      // Returning a promise makes the test async
      return new Promise((resolve, reject) => {
        $elm.on('customEvent', () => {
          // success if called
          resolve();
        });

        $elm.trigger('customEvent');
      });
    });
  }); // Sanity Tests

});
