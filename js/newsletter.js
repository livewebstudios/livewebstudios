/* =========================================================================
   newsletter.js — Live Web Studios
   - Client-side email validation, inline error, no page reload
   - Subscribes via Mailchimp's post-json endpoint (JSONP, since the
     standard subscribe endpoint blocks a CORS POST from the browser)
   - Falls back to a plain form POST if JSONP errors or times out
   - Inline confirmation replaces the form on success
   ========================================================================= */

(function () {
  'use strict';

  var form = document.getElementById('newsletterForm');
  if (!form) return;

  var emailEl   = document.getElementById('mce-EMAIL');
  var errorEl   = document.getElementById('newsletter-error');
  var submitEl  = document.getElementById('newsletterSubmit');
  var confirmEl = document.getElementById('newsletterConfirm');
  var confirmMsgEl = document.getElementById('newsletterConfirmMsg');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  var TIMEOUT_MS = 8000;
  var submitting = false;

  /* Mailchimp returns messages with markup and a leading field index ("0 - ..."). */
  function plainText(msg) {
    var box = document.createElement('div');
    box.innerHTML = String(msg || '');
    return (box.textContent || '').replace(/^\d+\s*-\s*/, '').trim();
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.textContent = '';
    errorEl.hidden = true;
  }

  function setBusy(busy) {
    submitting = busy;
    submitEl.disabled = busy;
    submitEl.classList.toggle('is-busy', busy);
  }

  function showConfirm(msg) {
    if (msg) confirmMsgEl.textContent = msg;
    form.hidden = true;
    confirmEl.hidden = false;
    confirmEl.focus && confirmEl.focus();
  }

  /* Build the post-json URL from the form's own action + fields, so the
     Mailchimp ids, tags and bot-trap field stay in one place (the HTML). */
  function jsonpURL(callbackName) {
    var url = form.getAttribute('action').replace('/post?', '/post-json?');
    var fields = form.querySelectorAll('input[name]');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      url += '&' + encodeURIComponent(f.name) + '=' + encodeURIComponent(f.value);
    }
    return url + '&c=' + callbackName;
  }

  function subscribe() {
    var callbackName = 'lwsMc' + Date.now();
    var script = document.createElement('script');
    var settled = false;

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
      clearTimeout(timer);
    }

    /* JSONP unavailable or blocked: plain form POST into a hidden iframe, so
       the visitor stays on this page. The response is cross-origin and cannot
       be read, so the confirmation is shown optimistically. */
    function fallback() {
      if (settled) return;
      settled = true;
      cleanup();

      var sink = document.getElementById('newsletterSink');
      if (!sink) {
        sink = document.createElement('iframe');
        sink.id = 'newsletterSink';
        sink.name = 'newsletterSink';
        sink.className = 'newsletter-sink';
        sink.setAttribute('aria-hidden', 'true');
        sink.setAttribute('tabindex', '-1');
        document.body.appendChild(sink);
      }

      form.target = 'newsletterSink';
      HTMLFormElement.prototype.submit.call(form);
      setBusy(false);
      showConfirm();
    }

    window[callbackName] = function (data) {
      if (settled) return;
      settled = true;
      cleanup();
      setBusy(false);

      if (data && data.result === 'success') {
        showConfirm(plainText(data.msg));
      } else {
        var msg = plainText(data && data.msg) || 'That did not go through. Try again in a moment.';
        showError(msg);
        emailEl.focus();
      }
    };

    var timer = setTimeout(fallback, TIMEOUT_MS);
    script.src = jsonpURL(callbackName);
    script.onerror = fallback;
    document.body.appendChild(script);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitting) return;

    var value = emailEl.value.trim();
    if (!value) {
      showError('Enter your email address so we know where to send it.');
      emailEl.focus();
      return;
    }
    if (!EMAIL_RE.test(value)) {
      showError('That email address does not look right. Check it and try again.');
      emailEl.focus();
      return;
    }

    clearError();
    setBusy(true);
    subscribe();
  });

  emailEl.addEventListener('input', function () {
    if (!errorEl.hidden) clearError();
  });

})();
