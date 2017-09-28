(function(win) {
  win.DocsifyCopyCodePlugin = {
    init: function() {
      return function(hook, vm) {
        hook.doneEach(function() {
          var codeBlocks = document.querySelectorAll("pre[v-pre]");

          codeBlocks.forEach((element, i, obj) => {
            var button = document.createElement("button");
            button.appendChild(document.createTextNode("Click to copy"));
            button.classList.add("docsify-copy-code-button");

            if (vm.config.themeColor) {
              button.style.background = vm.config.themeColor;
            }

            button.addEventListener("click", function(event) {
              var range = document.createRange();
              var codeBlock = element.querySelector("code");
              range.selectNode(codeBlock);
              window.getSelection().addRange(range);

              try {
                // Now that we've selected the anchor text, execute the copy command
                var successful = document.execCommand("copy");
                if (successful) {
                  button.classList.add("success");
                  setTimeout(function() {
                    button.classList.remove("success");
                  }, 1000);
                }
              } catch (err) {
                button.classList.add("error");
                setTimeout(function() {
                  button.classList.remove("error");
                }, 1000);
              }

              var selection = window.getSelection();
              if (typeof selection.removeRange === "function") {
                selection.removeRange(range);
              } else if (typeof selection.removeAllRanges === "function") {
                selection.removeAllRanges();
              }
            });

            element.appendChild(button);
          });
        });
      };
    }
  };
})(window);
