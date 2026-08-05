(function () {
  'use strict';

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header a[href], .mobile-nav a[href]').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('.menu-start').forEach(function (link) {
    if (!link.getAttribute('aria-label')) link.setAttribute('aria-label', 'Open navigation menu');
  });

  var progress = document.getElementById('progress');
  if (progress) {
    progress.setAttribute('role', 'button');
    progress.setAttribute('tabindex', '0');
    progress.setAttribute('aria-label', 'Back to top');
    progress.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        progress.click();
      }
    });
  }

  document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(function (control) {
    var isNext = control.classList.contains('swiper-button-next');
    control.setAttribute('role', 'button');
    control.setAttribute('tabindex', '0');
    control.setAttribute('aria-label', isNext ? 'Next slide' : 'Previous slide');
    control.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        control.click();
      }
    });
  });

  document.querySelectorAll('.accordion-item .heading[type="button"]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.setTimeout(function () {
        document.querySelectorAll('.accordion-item .heading[type="button"]').forEach(function (item) {
          item.setAttribute('aria-expanded', item.closest('.accordion-item').classList.contains('active') ? 'true' : 'false');
        });
      }, 0);
    });
  });

  document.querySelectorAll('.site-enquiry-form').forEach(function (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      var status = form.querySelector('.contact-form-status');
      var button = form.querySelector('button[type="submit"]');
      var originalLabel = button ? button.textContent : '';

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      if (status) {
        status.className = 'contact-form-status is-visible';
        status.textContent = 'Sending your enquiry…';
      }

      try {
        var response = await fetch(form.getAttribute('action') || 'contact.php', {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        var result = await response.json().catch(function () { return {}; });

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Your enquiry could not be sent.');
        }

        form.reset();
        if (status) {
          status.className = 'contact-form-status is-visible';
          status.textContent = result.message || 'Thank you. Your enquiry has been sent successfully.';
        }
      } catch (error) {
        if (status) {
          status.className = 'contact-form-status is-visible is-error';
          status.innerHTML = 'We could not submit the form just now. Please call <a href="tel:+2349060704168">+234 906 070 4168</a> or <a href="https://wa.me/2349060704168" target="_blank" rel="noopener">message us on WhatsApp</a>.';
        }
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    });
  });

  document.querySelectorAll('#subscribe-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = form.querySelector('input[type="email"]');
      var body = encodeURIComponent('Email: ' + (email ? email.value : ''));
      window.location.href = 'mailto:info@admolservices.com?subject=Newsletter subscription&body=' + body;
    });
  });
})();
