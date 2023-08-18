import './styles.css';

function docsifyCopyCode(hook, vm) {
  hook.doneEach(function () {
    const targetElms = Array.from(document.querySelectorAll('pre[data-lang]'));
    const i18n = {
      buttonText: 'Copy to clipboard',
      errorText: 'Error',
      successText: 'Copied',
    };

    // Update i18n strings based on options and location.href
    if (vm.config.copyCode) {
      Object.keys(i18n).forEach((key) => {
        const textValue = vm.config.copyCode[key];

        if (typeof textValue === 'string') {
          i18n[key] = textValue;
        } else if (typeof textValue === 'object') {
          Object.keys(textValue).some((match) => {
            const isMatch = location.href.indexOf(match) > -1;

            i18n[key] = isMatch ? textValue[match] : i18n[key];

            return isMatch;
          });
        }
      });
    }

    const template = [
      '<button class="docsify-copy-code-button">',
      `<span class="label">${i18n.buttonText}</span>`,
      `<span class="error">${i18n.errorText}</span>`,
      `<span class="success">${i18n.successText}</span>`,
      '</button>',
    ].join('');

    targetElms.forEach((elm) => {
      elm.insertAdjacentHTML('beforeend', template);
    });
  });

  hook.mounted(function () {
    const listenerHost = document.querySelector('.content');

    if (listenerHost) {
      listenerHost.addEventListener('click', function (evt) {
        const isCopyCodeButton = evt.target.classList.contains(
          'docsify-copy-code-button'
        );

        if (isCopyCodeButton) {
          const buttonElm =
            evt.target.tagName === 'BUTTON'
              ? evt.target
              : evt.target.parentNode;
          const range = document.createRange();
          const preElm = buttonElm.parentNode;
          const codeElm = preElm.querySelector('code');

          let selection = window.getSelection();

          range.selectNode(codeElm);

          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }

          try {
            // Copy selected text
            const successful = document.execCommand('copy');

            if (successful) {
              buttonElm.classList.add('success');
              setTimeout(function () {
                buttonElm.classList.remove('success');
              }, 1000);
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(`docsify-copy-code: ${err}`);

            buttonElm.classList.add('error');
            setTimeout(function () {
              buttonElm.classList.remove('error');
            }, 1000);
          }

          selection = window.getSelection();

          if (selection) {
            if (typeof selection.removeRange === 'function') {
              selection.removeRange(range);
            } else if (typeof selection.removeAllRanges === 'function') {
              selection.removeAllRanges();
            }
          }
        }
      });
    }
  });
}

// Deprecation warning for v1.x: stylesheet
if (document.querySelector('link[href*="docsify-copy-code"]')) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Deprecation] Link to external docsify-copy-code stylesheet is no longer necessary.'
  );
}

// Deprecation warning for v1.x: init()
window.DocsifyCopyCodePlugin = {
  init: function () {
    return function (hook, vm) {
      hook.ready(function () {
        // eslint-disable-next-line no-console
        console.warn(
          '[Deprecation] Manually initializing docsify-copy-code using window.DocsifyCopyCodePlugin.init() is no longer necessary.'
        );
      });
    };
  },
};

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyCopyCode].concat(
  window.$docsify.plugins || []
);
