# ND College, Purnea - Official Website

Welcome to the repository for the official website of ND College, Purnea. This is a fast, responsive, and installable Progressive Web App (PWA) built completely with static HTML, CSS, and vanilla JavaScript. 

Live Website: https://akramsts.github.io/nd-college/

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [PWA & Service Worker](#pwa--service-worker)

## Overview
ND College is a premier private institution affiliated with Purnea University. This website serves as the primary digital touchpoint for students, offering details on programs (B.Sc., B.A., B.Com), admission inquiries, and a dedicated Student Corner. It also includes a standalone A4 Cover Page generator for student assignments.

## Key Features
- Zero Dependencies: No build tools, bundlers, or frameworks required. 
- Progressive Web App (PWA): Fully installable with offline support via Service Workers.
- Light/Dark Mode: System-aware theme toggling with localStorage persistence.
- Responsive Design: Optimized for desktop, tablet, and mobile devices.
- Cover Page Generator: A dedicated utility (cover-page.html) to create and print A4 assignment front pages.
- SEO Optimized: Includes meta tags, Open Graph properties, robots.txt, and a sitemap.

## Project Structure
The project uses a flat directory structure. All files are located in the root folder to simplify hosting and paths.

index.html         - Main landing page
cover-page.html    - Assignment cover page generator tool
style.css          - Global stylesheets and homepage design
cover-page.css     - Styles and print media queries for the cover page
animations.js      - Scroll reveal and counter animations
cover-page.js      - Logic for dynamic cover page generation and printing
forms.js           - Real-time form validation logic
misc.js            - Helper functions (e.g., dynamic copyright year)
navigation.js      - Mobile menu and sticky navbar behavior
swiper-init.js     - Carousel initialization logic
theme.js           - Light and dark theme management
sw.js              - Service Worker for caching and offline capabilities
manifest.json      - Web App Manifest for PWA installation
sitemap.xml        - Search engine sitemap
robots.txt         - Crawler directives (excludes cover-page.html)
logo.png           - Main college logo
logo-192.png       - PWA icon (192x192)
logo-512.png       - PWA icon (512x512)

## Local Development
Since this is a static website, you only need a basic local server to run it.

Using Python 3:
python -m http.server 8000

Using Node.js:
npx serve .

Once the server is running, open http://localhost:8000 in your browser.

## Deployment
This project is currently deployed on GitHub Pages. To deploy updates:
1. Commit and push your changes to the main branch.
2. Ensure your GitHub repository settings have GitHub Pages enabled and pointing to the root directory of your main branch.

## PWA & Service Worker
The website uses a cache-first strategy for maximum performance. 

Important note for updates: If you modify any CSS, JavaScript, or HTML files, you must open `sw.js` and increment the `CACHE_NAME` variable (e.g., change `nd-college-cache-v2` to `nd-college-cache-v3`). This ensures that returning visitors download the latest version of the site instead of loading stale files from their local cache.

---
Copyright 2026 ND College, Purnea. All rights reserved.