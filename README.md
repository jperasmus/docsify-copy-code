# docsify-copy-code

A docsify plugin that adds a button to easily copy code blocks to your clipboard.

## Usage

Assuming you have a working [docsify](https://docsify.js.org) app set up, it is easy to use this plugin.

#### Production

Add the following script tag to your `index.html`:

```html
<!-- Latest v2.x.x -->
<script src="https://unpkg.com/docsify-copy-code@2"></script>
```

This will load the latest v2.x of the plugin. Specifying the version ensures that the release of a major update (v3.x) will not break your production site.

#### Development

If you prefer to load the latest version of the library, you may do so my omitting the `@[version]` from the above URL:

```html
<!-- Latest (not recommended for production) -->
<script src="https://unpkg.com/docsify-copy-code"></script>
```

That is it! If all went well, any preformatted code should now have a `Click to copy!` link on hover.
