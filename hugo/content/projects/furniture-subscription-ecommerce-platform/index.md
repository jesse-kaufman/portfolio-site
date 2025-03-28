---
date: 2025-03-28T11:00:56-06:00
title: Furniture subscription eCommerce platform
description: This project was a major undertaking I led as sole developer for over four years—taking the company from an existing Squarespace site to a fully interactive eCommerce platform.
images:
  - /projects/furniture-subscription-ecommerce-platform/furniture.jpg
github: https://github.com/jesse-kaufman/evidencedb/tree/main/node-only
tags:
  - MySQL
  - PHP
  - WooCommerce
  - WordPress
---
{{< figure src="/projects/furniture-subscription-ecommerce-platform/furniture.jpg" alt="Photo of furniture from lifestyle shoot" caption="Photo of furniture from lifestyle shoot" class="left " >}}

This project was a major undertaking I led as sole developer for over four years—taking the company from an existing Squarespace site to a fully interactive eCommerce platform. Throughout this time, I not only handled all development but also played a key role in design work for every version except the final facelift. I also did the initial studio and lifestyle photography for the site.

## v1.0 – **Existing website**

Originally, the company operated with a simple Squarespace site featuring a basic form that stored submissions in a Google Doc. It had minimal features, analytics, and interactivity. Customers had no way to order online, pay, or even receive immediate feedback—they had to wait for a representative to contact them.

The rental model at the time was limited to three pre-defined furniture packages with minimal customization. Credit checks were conducted manually through Experian, adding another layer of inefficiency.

## v2.0 – **Interactivity & automation**

Recognizing the need for a more modern, efficient system, I spearheaded the transition to a WordPress site hosted on Azure. This version introduced significant improvements in performance, SEO, and user experience.

**Tech stack:** WordPress, WooCommerce, PHP, MySQL, jQuery

### Key improvements

- **Performance optimizations:** Implemented HTTP/2 push, preloading, prefetching, and multiple caching strategies, leading to drastically improved load times.
- **Design & responsiveness:** While marketing provided rough wire frames, I was responsible for translating them into a sleek, fully responsive website.
- **SEO enhancements:** Structured data and "rich results" optimization improved search visibility.

### Interactive request form

To streamline customer interactions, I developed an interactive web app that replaced the static request form. The new form dynamically adjusted based on user input, reducing back-and-forth and improving the customer experience. Data was submitted to a custom backend API.

### Automated credit checks with Experian API

Previously a manual process, I automated credit checks by integrating the Experian API:

- If above a threshold, requests were auto-approved
- If below, they were flagged for manual review by managers
- A custom admin panel allowed managers to review and update request statuses while ensuring private data remained masked

### Impact

- **Thousands of employee hours saved** by automating credit checks
- **Improved customer experience** with faster request processing
- **Reduced operational friction** by eliminating unnecessary back-and-forth with customers

## v3.0 – **eCommerce integration**

This version introduced eCommerce capabilities, allowing customers to configure packages, add them to a cart, and pay online—marking the company’s first foray into online transactions.

### Key features

- **WooCommerce customization:** Built custom plugins to accommodate package-based pricing and dynamic product configurations
- **Braintree API integration:** Enabled online payments and subscription functionality via WooCommerce Subscriptions and custom plugins
- **Refined credit check system integration:** Automated credit checks now linked directly to WooCommerce’s order status system for seamless approval handling
- **Location-based ordering:** Customers entered their zip code, which was validated against a database to determine if they were in the delivery area and calculate possible extra delivery charges if outside

### Additional enhancements

- Custom CSV export functionality for Sage integration
- Admin notices – used to communicate website feature updates/changes/fixes to employees when they logged into the side
- "Blackout dates" plugin allowing each city the ability to prevent customers from selecting a particular delivery date
  - used custom taxonomy and was configurable by managers via admin interface
- Improved front-end user experience and interactivity
- Backend refinements to streamline admin processes

## v4.0 – **Full site redesign**

The company underwent a full rebrand, requiring a complete site overhaul. This version introduced a **new logo, color scheme, fonts, photos, and copy**, while maintaining the core functionality.

- While I worked from mockups provided by a designer, I made critical design refinements to ensure responsiveness and usability.
- Functionality enhancements were developed in parallel with the redesign, including a new rental model: **rent by the piece.**

## v5.0 – **"By the piece" & rent-to-own**

This phase introduced a significant shift: customers could now rent individual furniture pieces rather than being locked into pre-defined packages.

### Key features

- **Flexible ordering:** Customers could build custom packages with a minimum monthly spend
- **Rent-to-own option:** Customers selecting a fixed rental term accumulated payments toward ownership
  - Payments were tracked and displayed in emails and the customer portal
  - The system dynamically adjusted the final payment to reflect any remaining balance
- **Inventory tracking:** Items were tied to specific locations, ensuring availability and accurate order fulfillment

### Challenges & solutions

- **Location-based inventory:** Implemented per-city product categories and inventory tracking
- **Subscription tracking enhancements:** Since WooCommerce Subscriptions didn’t support prorated final payments, I developed a custom solution to handle last-month adjustments

## v5.0 – **Site split & rebranding**

Initially, the site was built to handle both "by the package" and "by the piece" offerings. However, the company decided to launch **a completely separate brand and website** for the new model.

**This required:**

- **Building an entirely new website** with a distinct brand identity, design, and user experience
- **Migrating and adapting key functionalities** from the existing platform
- **Ensuring both sites remained optimized and operational simultaneously**

## Final thoughts

Over four years, I transformed this company’s online presence from a basic Squarespace form to a sophisticated, interactive, multi-site eCommerce platform.

I handled every aspect of development—back-end, front-end, API integrations, performance optimizations, automation, and even significant portions of the design process. Despite juggling multiple other projects for the company during this time, I built, optimized, and scaled the entire system without additional development support.

This project stands as a testament to my ability to architect and execute large-scale, business-critical solutions from the ground up.
