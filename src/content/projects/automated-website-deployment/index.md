---
date: 2025-03-13T17:00:56-06:00
title: Automated deployment for portfolio site
description: This project implements a streamlined CI/CD pipeline (with Github actions) for my self-hosted portfolio website, built with Hugo CMS and deployed as static files. The automated deployment process ensures seamless updates while maintaining a clear separation between development and production environments.
tags:
  - ci/cd
  - github-actions
  - docker
  - nginx
---
This project implements a streamlined CI/CD pipeline (using Github actions) for my self-hosted portfolio website, built with Hugo CMS and deployed as static files. When commits are pushed to the Github repository, an automated deployment workflow is triggered to publish the changes to the live site.

## Architecture & Workflow

My portfolio is built using [Hugo](https://gohugo.io/)—a fast and flexible static site generator. Hugo compiles the site into static HTML, CSS, and JavaScript files, creating a performant site with reduced attack surface for optimal security.

### Self-Hosting & Directory Structure

The site is hosted on my own infrastructure, with separate development and production environments in a single root directory, as shown below:

```bash
/home/containers/portfolio/
├── src/
│   ├── content
│   ├── public
│   └── ...
├── build/
└── live/
    ├── config/
    ├── logs/
    └── public/
```

## Development process

1. Run `hugo server`, which serves the website from the `./public` directory at `http://localhost:1313`
2. Make edits to content or Sass stylesheets, committing locally to git as necessary
    - *Hugo automatically rebuilds files when modifications are detected*
3. Once edits are finalized, local commits are pushed to Github and Github actions run the deployment workflow below

***This ensures that there is never an administrative UI exposed to external threats.***

### Github actions workflow

1. Github actions creates an Ubuntu environment to run the workflow
2. The main branch of my portfolio is checked out, including submodules
3. Hugo extended version is installed
4. All submodules are pulled
5. The `hugo` command is run to build the site in the test environment
6. If sucessful, a POST request is sent to my webhook deployment API with an `Authorization: Bearer <token>` header

### Custom deployment API for continuous deployment

I developed a lightweight API using **Node.js and Express** to automate deployments. This API listens for webhook requests from **GitHub**, allowing updates to be triggered automatically whenever changes are pushed to the repository. It runs inside a Docker container using Traefik for a reverse proxy.

**The API performs the following tasks:**

1. Validates the request using CORS and an API secret
2. Runs `hugo --minify --destination ../build` in the development environment to build the static files for the site into `/home/containers/portfolio/build`
3. Uses `rsync` to copy files from the build directory to the live directory

## Benefits

- **Automated Deployment** – No manual file transfers or server-side updates required
- **Optimized Performance** – Hugo’s `--minify` flag ensures lightweight, efficient files
- **Fast & Secure Updates** – `rsync` minimizes downtime by syncing only the necessary changes
- **Self-Hosted & Controlled** – No reliance on external CD services, giving full control over hosting and deployment
