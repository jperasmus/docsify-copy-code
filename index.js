// Fix for v1.x installations
(function() {
    // Deprecation warning for v1.x: init()
    window.DocsifyCopyCodePlugin = {
        init: function() {
            return function(hook, vm) {
                hook.ready(function() {
                    // eslint-disable-next-line no-console
                    console.warn('[Update] docsify-copy-code has been updated. Please see new installation instructions at https://github.com/jperasmus/docsify-copy-code.');
                });
            };
        }
    };
})();
