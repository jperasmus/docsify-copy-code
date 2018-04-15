// Dependencies
// =============================================================================
// eslint-disable-next-line no-unused-vars
import styles from './styles.css';


// Plugin
// =============================================================================
function docsifyCopyCode(hook, vm) {
    hook.doneEach(function() {
        const codeBlocks = Array.apply(null, document.querySelectorAll('pre[v-pre]'));

        codeBlocks.forEach(function(element, i, obj) {
            const button = document.createElement('button');

            button.appendChild(document.createTextNode('Click to copy'));
            button.classList.add('docsify-copy-code-button');

            if (vm.config.themeColor) {
                button.style.background = vm.config.themeColor;
            }

            button.addEventListener('click', function(event) {
                const range = document.createRange();
                const codeBlock = element.querySelector('code');

                let selection = window.getSelection();

                range.selectNode(codeBlock);
                selection.removeAllRanges();
                selection.addRange(range);

                try {
                    // Now that we've selected the anchor text, execute the copy command
                    const successful = document.execCommand('copy');

                    if (successful) {
                        button.classList.add('success');
                        setTimeout(function() {
                            button.classList.remove('success');
                        }, 1000);
                    }
                } catch (err) {
                    button.classList.add('error');
                    setTimeout(function() {
                        button.classList.remove('error');
                    }, 1000);
                }

                selection = window.getSelection();

                if (typeof selection.removeRange === 'function') {
                    selection.removeRange(range);
                } else if (typeof selection.removeAllRanges === 'function') {
                    selection.removeAllRanges();
                }
            });

            element.appendChild(button);
        });
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyCopyCode].concat(window.$docsify.plugins || []);
