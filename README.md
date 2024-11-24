# just-the-readme

This template is based on [just-the-docs](https://github.com/just-the-docs/just-the-docs) and the implementation of [a TOC](https://github.com/bmndc/just-the-docs).

## Use the template

### jekyll-gh-pages.yml

```yaml
# Workflow for building and deploying a Jekyll site to GitHub Pages
name: Deploy Jekyll with GitHub Pages dependencies preinstalled

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job (github-pages-build)
  build:
    name: Build (github-pages-build gem)
    runs-on: ubuntu-latest
    env:
      PAGES_REPO_NWO: ${{ github.repository }}
      JEKYLL_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      JEKYLL_ENV: production
      NODE_ENV: production
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Setup Ruby Environment
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.3"
          bundler-cache: true # runs 'bundle install' to install and cache gems
      - name: Add a YAML front matter to README.md
        run: |
          ex README.md <<EOF
          1i
          ---
          title: Home
          layout: home
          nav_order: 1
          nav_enabled: false
          permalink: /
          ---
          .
          wq
          EOF
      - name: Build Jekyll Site
        run: bundle exec jekyll build
      - name: Upload artifact for Pages
        uses: actions/upload-pages-artifact@v3

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Gemfile

```yaml
source "https://rubygems.org"
gemspec

gem "jekyll-github-metadata", ">= 2.15"

gem "jekyll-include-cache", group: :jekyll_plugins
gem "jekyll-sitemap", group: :jekyll_plugins

gem "html-proofer", "~> 5.0", :group => :development

gem 'jekyll-autolinks'

gem 'kramdown-parser-gfm'
gem "jekyll-remote-theme"

#------------------------------------------------------------------------------------------------
# After modifying the Gemfile:
#------------------------------------------------------------------------------------------------
#bundle install
#bundle exec jekyll serve
```

### just-the-readme.gemspec

```yaml
# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "just-the-readme"
  spec.version       = "0.0.1"
  spec.authors       = ["Ircama"]

  spec.summary       = %q{A modern, highly customizable, and responsive Jekyll theme for README documentation with built-in search.}
  spec.homepage      = "https://github.com/Ircama/just-the-readme"
  spec.license       = "MIT"

  spec.add_development_dependency "bundler", ">= 2.3.5"
  spec.add_runtime_dependency "sass-embedded", "~> 1.78.0"  # Fix use of deprecated sass lighten() and darken()
  spec.add_runtime_dependency "jekyll", ">= 3.8.5"
  spec.add_runtime_dependency "jekyll-seo-tag", ">= 2.0"
  spec.add_runtime_dependency "jekyll-include-cache"
  spec.add_runtime_dependency "rake", ">= 12.3.1"
  spec.add_runtime_dependency "base64"
  spec.add_runtime_dependency "csv"
end
```

### _config.yml

```yaml
remote_theme: ircama/just-the-readme

# Enable or disable the site search
# Supports true (default) or false
search_enabled: true

# For copy button on code
enable_copy_code_button: true

# Table of Contents
# Enable or disable the Table of Contents globally
# Supports true (default) or false
toc_enabled: true
toc:
  # Minimum header level to include in ToC
  # Default: 1
  min_level: 1
  # Maximum header level to include in ToC
  # Default: 6
  max_level: 6
  # Display the ToC as ordered list instead of an unordered list
  # Supports true (default) or false
  ordered: true
  # Whether ToC will be a single level list
  # Supports true or false (default)
  flat_toc: false

# By default, consuming the theme as a gem leaves mermaid disabled; it is opt-in
mermaid:
  # Version of mermaid library
  # Pick an available version from https://cdn.jsdelivr.net/npm/mermaid/
  version: "9.1.6"
  # Put any additional configuration, such as setting the theme, in _includes/mermaid_config.js
  # See also docs/ui-components/code
  # To load mermaid from a local library, also use the `path` key to specify the location of the library; e.g.
  # for (v10+):
  # path: "/assets/js/mermaid.esm.min.mjs"
  # for (<v10):
  # path: "/assets/js/mermaid.min.js"
  # Note: copy both `mermaid.esm.min.mjs` (v10+) or `mermaid.min.js` (<v10) and the associated `.map` file from the specified version of `mermaid/dist` to `/assets/js/`.

# Enable or disable heading anchors
heading_anchors: true

# Aux links for the upper right navigation
aux_links:
  "text_console on GitHub":
    - "https://github.com/Ircama/text_console/"

# Makes Aux links open in a new tab. Default is false
aux_links_new_tab: true

# Enable or disable the side/mobile menu globally
# Nav menu can also be selectively enabled or disabled using page variables or the minimal layout
nav_enabled: true

# Sort order for navigation links
# nav_sort: case_insensitive # default, equivalent to nil
nav_sort: case_sensitive # Capital letters sorted before lowercase

# External navigation links
nav_external_links:
  - title: Just the Docs on GitHub
    url: https://github.com/just-the-docs/just-the-docs

# Show navigation error report
nav_error_report: true # default is false/nil.

liquid:
  error_mode: strict
  strict_filters: true

# Footer content
# appears at the bottom of every page's main content

# Back to top link
back_to_top: true
back_to_top_text: "Back to top"

footer_content: 'Copyright &copy; 2024-2025 Ircama. Distributed by an <a href="https://raw.githubusercontent.com/Ircama/text_console/refs/heads/main/LICENSE">MIT license.</a>'

# Footer last edited timestamp
last_edit_timestamp: true # show or hide edit time - page must have `last_modified_date` defined in the frontmatter
last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html

# Footer "Edit this page on GitHub" link text
gh_edit_link: true # show or hide edit this page link
gh_edit_link_text: "Edit this page on GitHub"
gh_edit_repository: "https://github.com/Ircama/text_console" # the github URL for your repo
gh_edit_branch: "main" # the branch that your docs is served from
# gh_edit_source: docs # the source that your files originate from
gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately

# Color scheme currently only supports "dark", "light"/nil (default), or a custom scheme that you define
color_scheme: nil

callouts_level: quiet # or loud
callouts:
  highlight:
    color: yellow
  important:
    title: Important
    color: blue
  new:
    title: New
    color: green
  note:
    title: Note
    color: purple
  warning:
    title: Warning
    color: red

# Google Analytics Tracking (optional)
# Supports a CSV of tracking ID strings (eg. "UA-1234567-89,G-1AB234CDE5")
# Note: the main Just the Docs site does *not* use Google Analytics.
# ga_tracking: UA-2709176-10,G-5FG1HLH3XQ
# ga_tracking_anonymize_ip: true # Use GDPR compliant Google Analytics settings (true/nil by default)

plugins:
  - jekyll-seo-tag
  - jekyll-github-metadata
  - jekyll-sitemap
  - jekyll-autolinks
  - jekyll-include-cache # Optional, for caching
  - jekyll-remote-theme # Add if not already present

kramdown:
  syntax_highlighter_opts:
    block:
      line_numbers: false

compress_html:
  clippings: all
  comments: all
  endings: all
  startings: []
  blanklines: false
  profile: false
  # ignore:
  #   envs: all

autolinks:
  link_attr: 'target="_blank"'
  skip_tags: ["a", "pre", "code", "kbd", "script"]
```
