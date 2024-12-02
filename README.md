# just-the-readme

*Just the Readme* is a theme and quick-install package for creating a [Jekyll](https://jekyllrb.com/) static website with the content of a README.md ([Markdown](https://en.wikipedia.org/wiki/Markdown) documentation) that can be published to the [GitHub Pages](https://pages.github.com/) of a GitHub repo through a [GitHub Actions](https://github.com/features/actions) script.

The *Just the Readme* template is based on [just-the-docs](https://github.com/just-the-docs/just-the-docs) and the implementation of [a Table of Contents sidebar](https://github.com/bmndc/just-the-docs). For instance, it generates:

- [this site](https://ircama.github.io/ELM327-emulator) from this [README](https://github.com/Ircama/ELM327-emulator/blob/master/README.md)
- [this site](https://ircama.github.io/text_console/) from this [README](https://github.com/Ircama/text_console/blob/main/README.md)
- [this site](https://ircama.github.io/epson_print_conf/) from this [README](https://github.com/Ircama/epson_print_conf/blob/main/README.md)
- etc.

Unlike [Just the Docs](https://just-the-docs.com/), from which it is derived, the README.md file does not require a [YAML front matter](https://jekyllrb.com/docs/front-matter/), as it is automatically added to the temporary source by the GitHub Actions script while generating the site.

The site is fully responsive and optimized with a mobile breakpoint.

## Installation

Files to install:

- jekyll-gh-pages.yml (GitHub Actions script, no need of configuration),
- Gemfile (gem dependencies for Ruby programs, no need of configuration),
- just-the-readme.gemspec (metadata and dependencies, no need of configuration),
- _config.yml (configuration options)

Installation procedure:

* Copy the .jekyll-gh-pages directory to the target repo (included files: _config.yml, Gemfile, just-the-readme.gemspec)
* Edit the _config.yml file; at least:
  - aux_links
  - footer_content
  - gh_edit_repository
  - nav_external_links
* Copy .github/workflows/jekyll-gh-pages.yml to the same path of the the target repo
* Edit .gitignore and add the following:

  ```
  # Just-The-Readme exclusions:
  .jekyll-gh-pages/Gemfile.lock
  .jekyll-gh-pages/_site/
  .jekyll-gh-pages/*.md
  ```
* Publishing with a custom [GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) workflow:
  - On GitHub, navigate to your site's repository.
  - Under your repository name, click  *Settings*.
  - In the *Code and automation* section of the sidebar, click *Pages*.
  - Under *Build and deployment*, under *Source*, select *GitHub Actions*.

## Example of Python program

```python
import webbrowser

def usage():
    "Open a web browser showing the online documentation."
    url = "https://....github.io/..."
    try:
        ret = webbrowser.open(url)
        if ret:
            print("The web browser is being opened.")
        else:
            print(
                "Unable to open the web browser."
                " Please open it manually by visiting:\n%s" % url
            )
    except Exception as e:
        print(
            "Unable to open the web browser (%s)."
            " Please open it manually by visiting:\n%s", (e, url)
        )
```

## Local testing

To test it locally, you could to create a Markdown file with YAML front matter in the *.jekyll-gh-pages* directory ([not needed for online testing](https://github.com/Ircama/just-the-readme/blob/main/.github/workflows/jekyll-gh-pages.yml#L49-L55)) and run `bundle exec jekyll serve` in that directory:

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
