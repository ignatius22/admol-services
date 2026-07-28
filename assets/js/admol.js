(function () {
  'use strict';

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header a[href], .mobile-nav a[href]').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('#contact-form, #subscribe-form, .need-expert form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var isContact = form.id === 'contact-form' || form.closest('.need-expert');
      if (isContact) {
        var values = Array.from(form.querySelectorAll('input, textarea, select'))
          .filter(function (field) { return field.value && field.type !== 'submit'; })
          .map(function (field) { return (field.name || field.placeholder || 'Detail') + ': ' + field.value; });
        var body = encodeURIComponent(values.join('\n'));
        window.location.href = 'mailto:info@admolservices.com?subject=Website enquiry&body=' + body;
      } else {
        window.location.href = 'mailto:info@admolservices.com?subject=Newsletter subscription';
      }
    });
  });
})();
