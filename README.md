# WIP: Webpack boilerplate for component based apps

This boilerplate is targeting backend devs looking to modernize their systems using new 
tech without fully committing to a SPA, while still using the fully-featured ecosystem.

For those new to Webpack, it bundles everything you require based on an entry point to your
application, which can also be a standalone component thats part of a page. 
This bundling doesn't stop on Javascript and HTML, but every resource required.
There are also a ton of plugins to manipulate the in/output.

The way everything is configured is based on the fact that you want separate
ad hoc modules/entry points to modernize parts of your system without going overboard.

- Want to use ReactJS for a specific purpose?
- Or maybe a single file Vue component with scoped css for another?
- Less, SCSS or both?
 ant to modernize your app with ReactJS/Vue.js standalone components using JSX
- Or just modularize your standlone Javascript thats used on a ad hoc basis, not by manually exposing all the required resources in hrefs, but by requiring the dependencies you need from npm repos(bundling)
- You want to stay away from SPA's(usually requires a rebuild) and just build standalone components

## Examples:

component1

- Includes 2 stylesheets, one .sss and one .css, output is component1.css
- Uses a modified Bootstrap modal thats appended to the DOM. This modal also uses an image, which gets automatically copied and linked to using the file-loader.  
- Requires a shared module which gets concatenated into common.js

The page that uses this component has header refs to component.js/css, vendor.js and common.js

## Enables:

- Lints CSS and Js
- Watches files and rebuilds modules
- Splits chunks of code into common/vendor files for caching strategies and faster pageloads
- LESS/SCSS/SugarSS
- ReactJS components
- Vue.js components
- Sourcemapping in dev
- PostCSS plug with cssnext, autoprefixer and cssnano

## Plugins and components used:

### extract-text-webpack-plugin

Extracts the final css to have it in separate files instead of having it inline.

### clean-webpack-plugin

Cleans the dist dir before every build

### webpack/lib/optimize/CommonsChunkPlugin

Commonly used modules will be concatenated in a separate common.js file and the specified vendor
libraries and webpack runtime will be in vendor.js.

### [PostCSS](https://github.com/postcss/postcss)

Does a ton of things you dont want to be bothered with, lints your post-compiled css,
uses [autoprefixer](https://github.com/postcss/autoprefixer), 
allows you to write in the latest css specs with [cssnext](http://cssnext.io/),
minifies and optimizes using [cssnano](http://cssnano.co/) and a ton of other stuff.

[sugarss](https://github.com/postcss/sugarss) is enabled by default for .sss files.

## Tricks &amp; notes

**I'm already using a taskrunner that has some common vendors also used by this webpack setup**

Simple add another entry point similar to `vendor` like `vendor_ignore` with the vendors that you already 
have setup using the taskrunner. Then simply dont include the compiled file. 

**Why isn't there a postcss.config.js?**

Settings in here are contextual, cssnano only in production, sugarss only on .sss files, etc. This is doable with the postcss-loader only, but parameters passed(with the context)
isn't enforced by postcss-loader-config, so it's up to the implementation to follow the standard.

As a result, vue-loader doesn't pass the context when requesting the config.