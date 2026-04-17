(function() {
  var PASS_HASH = '0f5f42a79fb6a3654cedda39cfb419cf9b638c1cf95de9b43b4f814631296cf0';
  var SESSION_KEY = 'm6exams_auth';

  function sha256(str) {
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', buf).then(function(hash) {
      return Array.from(new Uint8Array(hash)).map(function(b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  function showContent() {
    document.getElementById('auth-wall').style.display = 'none';
    document.getElementById('main-content').style.display = '';
  }

  function init() {
    if (sessionStorage.getItem(SESSION_KEY) === 'ok') {
      showContent();
      return;
    }
    document.getElementById('auth-wall').style.display = '';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('auth-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var pw = document.getElementById('auth-pass').value;
      sha256(pw).then(function(hash) {
        if (hash === PASS_HASH) {
          sessionStorage.setItem(SESSION_KEY, 'ok');
          showContent();
        } else {
          document.getElementById('auth-error').textContent = 'パスワードが違います';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
