(function () {
  function findStatus(button) {
    var container = button.closest('.share-actions');
    return container ? container.querySelector('[data-share-status]') : null;
  }

  function showStatus(button, message) {
    var status = findStatus(button);
    if (!status) {
      return;
    }
    status.textContent = message;
    status.hidden = false;
    window.clearTimeout(status._shareTimeout);
    status._shareTimeout = window.setTimeout(function () {
      status.hidden = true;
    }, 2400);
  }

  function copyText(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showStatus(button, 'Link copied for Instagram.');
      }).catch(function () {
        window.prompt('Copy this link for Instagram:', text);
      });
      return;
    }

    window.prompt('Copy this link for Instagram:', text);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-share-copy]');
    if (!button) {
      return;
    }
    copyText(button.getAttribute('data-share-copy'), button);
  });
}());
