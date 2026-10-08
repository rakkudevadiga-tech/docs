# GitHub Docs <!-- omit in toc -->

Welcome to GitHub Docs! GitHub’s documentation is open source, meaning anyone from inside or outside the company can contribute. For full contributing guidelines, visit our [contributing guide](https://github.com/github/docs/blob/main/.github/CONTRIBUTING.md).

## Architecture overview

```mermaid
flowchart LR
    author[Contributors\nGitHub employees and open source contributors]
    publicRepo[github/docs\nPublic content repository]
    internalRepo[github/docs-internal\nPrivate repository for GitHub staff]
    content[Content source\n/content, /data, assets]
    validation[Linting, tests, frontmatter validation]
    build[Docs site build\nRendering + navigation + redirects]
    preview[Staging preview\nReview changes before publishing]
    cdn[Production site\ndocs.github.com]
    users[Developers, users, and GitHub customers]

    author --> publicRepo
    author --> internalRepo
    publicRepo --> content
    internalRepo --> content
    content --> validation
    validation --> build
    build --> preview
    preview --> cdn
    cdn --> users

    publicRepo -. sync .-> internalRepo
    build -. generated pages .-> users
```

This architecture shows how documentation source files are authored in the Docs repositories, validated through automated checks, transformed into rendered pages, and published to the public documentation site for users.

## Quick links by contributor type

* **Hubbers (GitHub employees):** See [CONTRIBUTING.md](https://github.com/github/docs-content/blob/main/CONTRIBUTING.md) in the `docs-content` repository for GitHub-specific processes.

* **Open source contributors:** See [CONTRIBUTING.md](https://github.com/github/docs/blob/main/.github/CONTRIBUTING.md) in the `docs` repository for a quick-start summary.

## How we sync changes across Docs repositories

There are two GitHub Docs repositories: 

- **`github/docs`** (public): Open to external contributions

- **`github/docs-internal`** (private): For GitHub employee contributions. 

The two repositories sync frequently. Content changes in one are reflected in the other.  Hubbers might prefer to post in `docs` when working with a customer, but `docs` has limitations on the types of changes it accepts.

**Important:** The `docs` repository accepts contributions to content files (`.md` files in `/content` and select `/data` sections like reusables only). Infrastructure files, workflows, and site-build changes happen in the `github/docs` repo and are managed by maintainers.

## New to contributing

Here are some resources to help you get started with open source contributions:

* [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
* [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git)
* [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
* [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## License

This project is dual-licensed under:

* **Creative Commons Attribution 4.0** - for documentation and content in the assets, content, and data folders (see [LICENSE](LICENSE))
* **MIT License** - for code (see [LICENSE-CODE](LICENSE-CODE))
