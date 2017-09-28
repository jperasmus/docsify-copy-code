# docsify-copy-code

A docsify plugin that adds a button to easily copy code blocks to your clipboard.

## Usage

Assuming you have a working [docsify](https://docsify.js.org) app set up, it is easy to use this plugin.

### Add stylesheet

Simply add the following style tag to the `<head>` of `index.html` file below your theme css:

```html
<link rel="stylesheet" href="//unpkg.com/docsify-copy-code/styles.css">
```

This will always load the latest version of this plugin's stylesheet. If you want to load a specific version, you can also insert the stylesheet like this, specifying the version number (0.1.0 in the example):

```html
<link rel="stylesheet" href="//unpkg.com/docsify-copy-code@0.1.0/styles.css">
```

### Add script

Add the following `script` tag above your `window.$docsify = {}` configuration:

```html
<script src="//unpkg.com/docsify-copy-code/index.js"></script>
```

Again, you can also specify a specific version if you want to.

### Initialize plugin

Finally, after you've added the stylesheet and script file, you can initialize this plugin like this:

```javascript
window.$docsify = {
  // Other docsify config options go here
  plugins: [
    // Other plugins might go here
    window.DocsifyCopyCodePlugin.init()
  ]
}
```

That is it! If all went well, any preformatted code should now have a `Click to copy!` link on hover.
