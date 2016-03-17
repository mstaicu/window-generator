describe('Window generator component suite', function() {
  var windowGeneratorService = null;

  /**
   * Inject the main module and the service before each spec
   */
  beforeEach(function() {
    module('windows-generator');

    /**
     * Inject the service
     */
    inject(function(_WindowGeneratorService_) {
      windowGeneratorService = _WindowGeneratorService_;
    });
  });

  it('Service loaded', function() {
    expect(windowGeneratorService).not.toBe(null);
  });
});
