const ConwayView = require('./conway_view');

document.addEventListener("DOMContentLoaded", function() {
  $(function () {
    const rootEl = $('.conway');
    new ConwayView(rootEl);
  });
});
