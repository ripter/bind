const bind = require('./index.js');

// Test that bind works with a jQuery interface
describe('jQuery Event Interface', () => {
  let $elm, callback;

  beforeEach(() => {
    // mock the jquery interface
    $elm = {
      on: jest.fn(),
      off: jest.fn(),
    };
    // mock a callback function
    callback = jest.fn();
  });

  describe('bind(elm, eventName, callback)', () => {
    test('eventName: "customEvent"', () => {
      bind($elm, 'customEvent', callback);
      expect($elm.on).toHaveBeenCalledWith('customEvent', callback);
    });

    test('eventName "click .child"', () => {
      bind($elm, 'click .child', callback);
      expect($elm.on).toHaveBeenCalledWith('click', '.child', callback);
    });

    test('unbind "customEvent"', () => {
      const unbind = bind($elm, 'customEvent', callback);
      unbind();
      expect($elm.off).toHaveBeenCalledWith('customEvent', callback);
    });

    test('unbind "click #child"', () => {
      const unbind = bind($elm, 'click #child', callback);
      unbind();
      expect($elm.off).toHaveBeenCalledWith('click', '#child', callback);
    });
  }); // bind($elm, eventName, callback)

  describe('bind($elm, eventObject)', () => {
    let eventObject;

    beforeEach(() => {
      eventObject = {
        customEvent: jest.fn(),
        click: jest.fn(),
        'custom #selector': jest.fn(),
      };
    });

    test('calls on for each key in eventObject', () => {
      bind($elm, eventObject);
      expect($elm.on.mock.calls).toEqual([
        ['customEvent', eventObject.customEvent],
        ['click', eventObject.click],
        ['custom', '#selector', eventObject['custom #selector']],
      ]);
    });

    test('unbind removes events', () => {
      const unbind = bind($elm, eventObject);
      unbind();

      expect($elm.off.mock.calls).toEqual([
        ['customEvent', eventObject.customEvent],
        ['click', eventObject.click],
        ['custom', '#selector', eventObject['custom #selector']],
      ]);
    });
  }); // bind($elm, eventObject)

  describe('Guards', () => {
    test('$elm has on method', () => {
      $elm.on = null;
      expect(() => {
        bind($elm, 'customEvent', () => {});
      }).toThrowError('$elm is missing the on method from jQuery API.');
    });

    test('$elm has off method', () => {
      $elm.off = null;
      expect(() => {
        bind($elm, 'customEvent', () => {});
      }).toThrowError('$elm is missing the off method from jQuery API.');
    });

    test('eventName syntax errors if callback is not defined', () => {
      expect(() => {
        bind($elm, 'customEvent');
      }).toThrowError('callback must be a function');
    });

    test('eventObject syntax errors if callback is not defined', () => {
      expect(() => {
        bind($elm, {
          'click': null,
        });
      }).toThrowError('callback must be a function');
    });
  }); // Guards

});
