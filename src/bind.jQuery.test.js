const expect = require('expect.js');
const bind = require('./bind.jQuery.js');

/**
 * Test that bind properly calls jQuery's on() and off() methods.
 */
describe('jQuery Event Interface', () => {
  let $elm, callback, eventObject, data;

  beforeEach(() => {
    // mock the jquery interface
    // https://api.jquery.com/category/events/
    $elm = {
      on: () => {},
      off: () => {},
    };
    // mock a callback function
    callback = () => {};

    // jquery arguments to use
    data = {
      type: '🐶',
    };
    eventObject = {
      customEvent: () => {},
      click: () => {},
      'custom #selector': () => {},
    };
  });

  /**
   * Test bind's standard interface
   */
  describe('bind($elm, eventName, callback)', () => {
    it('adds event with $elm.on(eventName, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(eventName, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(cb).to.eql(callback);
        done();
      };

      bind($elm, 'click.jQuery', callback);
    });

    it('removes event with $elm.off(eventName, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(eventName, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(cb).to.eql(callback);
        done();
      };

      const unbind = bind($elm, 'click.jQuery', callback);
      unbind();
    });
  }); // bind($elm, eventName, callback)

  /**
   * Test bind's standard interface
   */
  describe('bind($elm, eventName, data, callback)', () => {
    it('adds event with $elm.on(eventName, data, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(eventName, d, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(cb).to.eql(callback);
        expect(d).to.eql(data);
        done();
      };

      bind($elm, 'click.jQuery', data, callback);
    });

    it('removes event with $elm.off(eventName, data, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(eventName, d, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(d).to.eql(data);
        expect(cb).to.eql(callback);
        done();
      };

      const unbind = bind($elm, 'click.jQuery', data, callback);
      unbind();
    });
  }); // bind($elm, eventName, data, callback)

  /**
   * Optoinal jQuery Interface
   */
  describe('bind($elm, eventName, selector, callback)', () => {
    it('adds event with $elm.on(eventName, selector, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(eventName, selector, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(selector).to.eql('.target');
        expect(cb).to.eql(callback);
        done();
      };

      bind($elm, 'click.jQuery', '.target', callback);
    });

    it('removes event with $elm.off(eventName, selector, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(eventName, selector, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(selector).to.eql('.target');
        expect(cb).to.eql(callback);
        done();
      };

      const unbind = bind($elm, 'click.jQuery', '.target', callback);
      unbind();
    });
  });

  /**
   * Test bind's standard interface
   */
  describe('bind($elm, eventName, selector, data, callback)', () => {
    it('adds event with $elm.on(eventName, selector, data, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(eventName, selector, d, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(selector).to.eql('.target');
        expect(cb).to.eql(callback);
        expect(d).to.eql(data);
        done();
      };

      bind($elm, 'click.jQuery', '.target', data, callback);
    });

    it('removes event with $elm.off(eventName, selector, data, callback)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(eventName, selector, d, cb) {
        expect(eventName).to.eql('click.jQuery');
        expect(selector).to.eql('.target');
        expect(d).to.eql(data);
        expect(cb).to.eql(callback);
        done();
      };

      const unbind = bind($elm, 'click.jQuery', '.target', data, callback);
      unbind();
    });
  }); // bind($elm, eventName, selector data, callback)

  /**
   * Optional jQuery Interface
   */
  describe('bind($elm, eventObject)', () => {
    let eventObject;

    beforeEach(() => {
      eventObject = {
        customEvent: () => {},
        click: () => {},
        'custom #selector': () => {},
      };
    });

    it('adds event with $elm.on(eventObject)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(events) {
        expect(events).to.eql(eventObject);
        done();
      };

      bind($elm, eventObject);
    });

    it('removes event with $elm.off(eventObject)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(events, selector, cb) {
        expect(events).to.eql(eventObject);
        done();
      };

      const unbind = bind($elm, eventObject);
      unbind();
    });
  }); // bind($elm, eventObject)

  /**
   * Optional jQuery Interface
   */
  describe('bind($elm, eventObject, data)', () => {
    let eventObject, data;

    beforeEach(() => {
      eventObject = {
        customEvent: () => {},
        click: () => {},
        'custom #selector': () => {},
      };
      data = {
        type: '🐶',
      };
    });

    it('adds event with $elm.on(eventObject, data)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(events, d) {
        expect(events).to.eql(eventObject);
        expect(d).to.eql(data);
        done();
      };

      bind($elm, eventObject, data);
    });

    it('removes event with $elm.off(eventObject, data)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(events, d) {
        expect(events).to.eql(eventObject);
        expect(d).to.eql(data);
        done();
      };

      const unbind = bind($elm, eventObject, data);
      unbind();
    });
  }); // bind($elm, eventObject, data)

  /**
   * Optional jQuery Interface
   */
  describe('bind($elm, eventObject, selector)', () => {
    let eventObject;

    beforeEach(() => {
      eventObject = {
        customEvent: () => {},
        click: () => {},
        'custom #selector': () => {},
      };
    });

    it('adds event with $elm.on(eventObject, selector)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(events, selector) {
        expect(events).to.eql(eventObject);
        expect(selector).to.eql('.target');
        done();
      };

      bind($elm, eventObject, '.target');
    });

    it('removes event with $elm.off(eventObject, selector)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(events, selector, cb) {
        expect(events).to.eql(eventObject);
        expect(selector).to.eql('.target');
        done();
      };

      const unbind = bind($elm, eventObject, '.target');
      unbind();
    });
  }); // bind($elm, eventObject, selector)

  /**
   * Optional jQuery Interface
   */
  describe('bind($elm, eventObject, selector, data)', () => {
    let eventObject, data;

    beforeEach(() => {
      eventObject = {
        customEvent: () => {},
        click: () => {},
        'custom #selector': () => {},
      };
    });

    it('adds event with $elm.on(eventObject, selector, data)', (done) => {
      // Stub the on method so we can test it.
      $elm.on = function(events, selector, d) {
        expect(events).to.eql(eventObject);
        expect(selector).to.eql('.target');
        expect(d).to.eql(data);
        done();
      };

      bind($elm, eventObject, '.target', data);
    });

    it('removes event with $elm.off(eventObject, selector, data)', (done) => {
      // Stub the on method so we can test it.
      $elm.off = function(events, selector, d) {
        expect(events).to.eql(eventObject);
        expect(selector).to.eql('.target');
        expect(d).to.eql(data);
        done();
      };

      const unbind = bind($elm, eventObject, '.target', data);
      unbind();
    });
  }); // bind($elm, eventObject, selector, data)

});
