# just-the-readme

*Just the Readme* is a theme and quick-install package for creating a [Jekyll](https://jekyllrb.com/) static website to the GitHub Pages of your GitHub repo using the README.md documentation through a GitHub Actions script.

The *Just the Readme* template is based on [just-the-docs](https://github.com/just-the-docs/just-the-docs) and the implementation of [a Table of Contents sidebar](https://github.com/bmndc/just-the-docs). For instance, it generates:

- [this site](https://ircama.github.io/text_console/) from this [README](https://github.com/Ircama/text_console/blob/main/README.md)
- [this site](https://ircama.github.io/epson_print_conf/) from this [README](https://github.com/Ircama/epson_print_conf/blob/main/README.md)
- etc.

Unlike [Just the Docs](https://just-the-docs.com/), from which it is derived, the README.md file does not require YAML front matter, as it is automatically added to the temporary source before generating the site.

## Installation

Files to install: jekyll-gh-pages.yml, Gemfile, just-the-readme.gemspec, _config.yml

Installation procedure:

- Copy the .jekyll-gh-pages directory to the target repo
- Edit the _config.yml file; at least:
  - aux_links
  - footer_content
  - gh_edit_repository
- Copy .github/workflows/jekyll-gh-pages.yml
- Edit .gitignore and add the following:

  ```
  # text_console exclusions:
  Gemfile.lock
  _site/
  .jekyll-gh-pages/*.md
  ```

To test it:

Install [Ruby and Jekyll](https://jekyllrb.com/docs/installation/)

```bash
cd .jekyll-gh-pages

echo "---
title: Home
layout: home
nav_order: 1
nav_enabled: false
permalink: /
---" > README.md

cat ../README.md >> README.md

bundle install
bundle exec jekyll serve
```
