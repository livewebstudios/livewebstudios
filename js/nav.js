/* =========================================================================
   nav.js — Live Web Studios
   White / Premium Build | April 2026
   - Strip existing .site-header / .site-nav before injecting
   - Sticky glassmorphic nav, shadow on scroll
   - Mega-menu dropdowns for SERVICES and INDUSTRIES (icon grid)
   - Mobile hamburger
   - Active link detection
   - Uppercase link text via CSS (not HTML)
   ========================================================================= */

(function () {
  'use strict';

  /* Detect folder depth for relative paths */
  var path = window.location.pathname;
  var depth = 0;
  if (/\/(services|industries|pricing|ecosystem|blog|admin|live-band-studios|live-band-web-studios|namesake|decap)\//.test(path)) depth = 1;
  if (/\/live-band-web-studios\/forms\//.test(path)) depth = 2;   /* forms hub is two levels deep */
  if (/\/forms\/[^/]+\//.test(path)) depth = 2;                   /* top-level forms/<name>/ is two levels deep */
  var p = depth === 2 ? '../../' : (depth === 1 ? '../' : '');

  /* ── Mega-menu helper: icon + label link ── */
  function navItem(href, svgPath, label) {
    return '<a href="' + p + href + '" class="nav-dropdown-item">' +
           '<span class="nav-ico-wrap">' +
           '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + svgPath + '</svg>' +
           '</span>' + label + '</a>';
  }

  /* ── Services (2-col grid) ── */
  var svcItems =
    navItem('services/website-design.html',      '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',                                                   'Website Design') +
    navItem('services/ai-platform.html',          '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>', 'AI Platform') +
    navItem('services/seo.html',                  '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',                                                                    'SEO &amp; AI Search') +
    navItem('services/hosting.html',              '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',  'Web Hosting') +
    navItem('services/ai-business-services.html', '<path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>', 'AI Business Services') +
    navItem('services/ai-workflow.html',           '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',                  'AI Workflow') +
    navItem('services/branding.html',              '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',                                                          'Logo &amp; Branding') +
    navItem('services/ecommerce.html',             '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',  'Ecommerce') +
    navItem('services/maintenance-plans.html',     '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',  'Maintenance Plans') +
    navItem('services/consulting.html',            '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',  'Audits &amp; Consulting') +
    navItem('services/ai-image.html',              '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',    'AI Image Services') +
    navItem('services/logo-design.html',           '<circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>',  'Logo Design');

  /* ── Industries (1-col list) ── */
  var indItems =
    navItem('industries/healthcare.html',         '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',                                                                                          'Healthcare') +
    navItem('industries/law-firm.html',            '<path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M7 8l5-6 5 6"/>',                                                       'Law Firms') +
    navItem('industries/financial-services.html',  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',                        'Financial Services') +
    navItem('industries/construction.html',         '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>',                                                              'Construction') +
    navItem('industries/real-estate.html',          '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',                        'Real Estate') +
    navItem('industries/manufacturing.html',        '<path d="M2 20h20M4 20V10l4-4 4 4V4l4 4v12"/>',                                                                                'Manufacturing') +
    navItem('industries/dental.html',               '<path d="M12 2a5 5 0 0 0-5 5c0 3 2 5 2 8a3 3 0 0 0 6 0c0-3 2-5 2-8a5 5 0 0 0-5-5z"/>',                                        'Dental') +
    navItem('industries/nonprofit.html',            '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',  'Nonprofits') +
    navItem('industries/b2b.html',                  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',                     'B2B') +
    navItem('industries/insurance.html',            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',                                                                       'Insurance');

  /* ── Namesake promo — sibling vertical, sits alongside the Live Band Web Studios promo ── */
  var nsPromo =
    '<a href="' + p + 'namesake/index.html" class="services-lbs-promo" aria-label="Namesake — personal pages for professionals">' +
      '<span class="lbs-promo-pulse" aria-hidden="true"></span>' +
      '<span class="lbs-promo-badge">NEW</span>' +
      '<span class="lbs-promo-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">' +
          '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' +
        '</svg>' +
      '</span>' +
      '<span class="lbs-promo-text">' +
        '<span class="lbs-promo-headline">New Service: NAMESAKE</span>' +
        '<span class="lbs-promo-sub">Personal pages for professionals</span>' +
      '</span>' +
      '<span class="lbs-promo-arrow" aria-hidden="true">&rarr;</span>' +
    '</a>';

  var navHTML =
    '<nav class="site-nav" id="siteNav">' +
      '<div class="nav-inner">' +
        '<a href="' + p + 'index.html" class="nav-logo">' +
          '<img src="' + p + 'images/Inverted_Color.png" alt="Live Web Studios">' +
        '</a>' +
        '<ul class="nav-links" id="navLinks">' +

          /* ABOUT — first link */
          '<li><a href="' + p + 'about.html" data-page="about">About</a></li>' +
          '<li><a href="' + p + 'faq.html" data-page="faq">FAQ</a></li>' +

          /* SERVICES mega-menu */
          '<li class="nav-item">' +
            '<a href="' + p + 'services.html" data-page="services" aria-haspopup="true" aria-expanded="false">Services</a>' +
            '<div class="nav-dropdown nav-mega services-dropdown" role="menu">' +
              '<div class="mega-columns">' +
                /* Columns 1–2: the 12 Live Web Studios services (2-col grid) */
                '<div class="mega-services">' +
                  '<a href="' + p + 'services.html" class="mega-col-head mega-col-head--center">Services</a>' +
                  '<div class="dropdown-grid">' + svcItems + '</div>' +
                '</div>' +
                /* Column 3: Live Band Web Studios vertical */
                '<div class="mega-col">' +
                  '<a href="' + p + 'live-band-web-studios/index.html" class="mega-col-head">Live Band Web Studios</a>' +
                  '<a href="' + p + 'live-band-web-studios/index.html" class="mega-col-link">Home</a>' +
                  '<a href="' + p + 'live-band-web-studios/pricing.html" class="mega-col-link">Pricing</a>' +
                  '<a href="' + p + 'live-band-web-studios/forms.html" class="mega-col-link">Forms</a>' +
                  '<a href="' + p + 'live-band-web-studios/personal-sites.html" class="mega-col-link">Personal Sites</a>' +
                  '<a href="' + p + 'live-band-web-studios/portfolio.html" class="mega-col-link">Portfolio</a>' +
                  '<a href="' + p + 'decap/" class="mega-col-link">Page Edit Docs</a>' +
                '</div>' +
                /* Column 4: Namesake vertical */
                '<div class="mega-col">' +
                  '<a href="' + p + 'namesake/index.html" class="mega-col-head">Namesake <span class="mega-col-badge">NEW</span></a>' +
                  '<a href="' + p + 'namesake/index.html" class="mega-col-link">Overview</a>' +
                  '<a href="' + p + 'namesake/how-it-works.html" class="mega-col-link">How It Works</a>' +
                  '<a href="' + p + 'namesake/start.html" class="mega-col-link">Start</a>' +
                '</div>' +
              '</div>' +
              /* Bright CTA — sits below the two-column list */
              '<a href="' + p + 'services/custom-styles-and-carousel-cards.html" class="mega-cta-bright" aria-label="Custom Styles and Carousel Cards">' +
                '<span class="mega-cta-sparkle" aria-hidden="true">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>' +
                '</span>' +
                'Custom Styles &amp; Carousel Cards' +
                '<span class="mega-cta-tag">New</span>' +
                '<span class="mega-cta-arrow" aria-hidden="true">&rarr;</span>' +
              '</a>' +
              '<div class="mega-footer">' +
                '<a href="' + p + 'services.html" class="mega-view-all">View all services →</a>' +
              '</div>' +
            '</div>' +
          '</li>' +

          /* INDUSTRIES mega-menu */
          '<li class="nav-item">' +
            '<a href="' + p + 'industries/index.html" data-page="industries" aria-haspopup="true" aria-expanded="false">Industries</a>' +
            '<div class="nav-dropdown nav-mega industries-dropdown" role="menu">' +
              '<div class="dropdown-list">' + indItems + '</div>' +
              /* Live Band Web Studios promo — same callout as Services dropdown */
              '<a href="' + p + 'live-band-web-studios/index.html" class="services-lbs-promo" aria-label="Live Band Web Studios — websites for musicians">' +
                '<span class="lbs-promo-pulse" aria-hidden="true"></span>' +
                '<span class="lbs-promo-badge">NEW</span>' +
                '<span class="lbs-promo-icon" aria-hidden="true">' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">' +
                    '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' +
                  '</svg>' +
                '</span>' +
                '<span class="lbs-promo-text">' +
                  '<span class="lbs-promo-headline">Musicians, go here</span>' +
                  '<span class="lbs-promo-sub">Custom sites for bands &amp; solo artists at <em>Live Band Web Studios</em></span>' +
                '</span>' +
                '<span class="lbs-promo-arrow" aria-hidden="true">&rarr;</span>' +
              '</a>' +
              /* Custom Styles & Carousel Cards promo — sits under the "Musicians, go here" strip */
              '<a href="' + p + 'services/custom-styles-and-carousel-cards.html" class="services-lbs-promo" aria-label="Custom Styles and Carousel Cards — graphic styles for your site">' +
                '<span class="lbs-promo-pulse" aria-hidden="true"></span>' +
                '<span class="lbs-promo-badge">NEW</span>' +
                '<span class="lbs-promo-icon" aria-hidden="true">' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">' +
                    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' +
                  '</svg>' +
                '</span>' +
                '<span class="lbs-promo-text">' +
                  '<span class="lbs-promo-headline">Custom Styles &amp; Carousel Cards</span>' +
                  '<span class="lbs-promo-sub">Archie, Mid-Century &amp; Pop-Art graphics for <em>your site</em></span>' +
                '</span>' +
                '<span class="lbs-promo-arrow" aria-hidden="true">&rarr;</span>' +
              '</a>' +
              nsPromo +
              '<div class="mega-footer">' +
                '<a href="' + p + 'industries/index.html" class="mega-view-all">View all industries →</a>' +
              '</div>' +
            '</div>' +
          '</li>' +

          /* Verticals as direct links — the mega-dropdown promos don't open on mobile, so these surface them */
          '<li class="nav-mobile-vertical"><a href="' + p + 'namesake/index.html" data-page="namesake">Namesake <span class="nav-mobile-new">New</span></a></li>' +
          '<li class="nav-mobile-vertical"><a href="' + p + 'live-band-web-studios/index.html">Live Band Web Studios</a></li>' +
          '<li><a href="' + p + 'portfolio.html" data-page="portfolio">Portfolio</a></li>' +
          '<li><a href="' + p + 'blog/" data-page="blog">Blog</a></li>' +
          /* Newsletter — surfaced on mobile, where the Contact dropdown doesn't open */
          '<li class="nav-mobile-vertical"><a href="' + p + 'newsletter.html" data-page="newsletter">Newsletter</a></li>' +

          /* CONTACT — simple dropdown (Contact + Newsletter) */
          '<li class="nav-item">' +
            '<a href="' + p + 'contact.html" data-page="contact" class="nav-contact-link" aria-haspopup="true" aria-expanded="false">Contact</a>' +
            '<div class="nav-dropdown contact-dropdown" role="menu">' +
              navItem('contact.html',    '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>', 'Contact') +
              navItem('newsletter.html', '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>',                                                              'Newsletter') +
            '</div>' +
          '</li>' +
        '</ul>' +
        '<a href="' + p + 'contact.html" class="btn-primary nav-cta">Get a Proposal <span class="btn-arrow">&rarr;</span></a>' +
        '<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navLinks" id="navToggle">&#9776;</button>' +
      '</div>' +
    '</nav>';

  function ensureFooterIndustries() {
    var footer = document.querySelector('footer.site-footer');
    if (!footer) return;
    var grid = footer.querySelector('.footer-grid');
    if (!grid) return;

    /* Fix logo to white/inverted version on every page */
    var logoImg = footer.querySelector('.footer-brand img');
    if (logoImg && logoImg.getAttribute('src') && logoImg.src.indexOf('Standard_Color') !== -1) {
      logoImg.src = logoImg.src.replace('Standard_Color', 'Inverted_Color');
    }

    /* Inject circuit canvas as first child of footer (if not already present) */
    if (!footer.querySelector('#circuitCanvas')) {
      var cvs = document.createElement('canvas');
      cvs.id = 'circuitCanvas';
      cvs.setAttribute('aria-hidden', 'true');
      footer.insertBefore(cvs, footer.firstChild);
    }

    /* Wrap footer logo in a homepage link on every page */
    if (logoImg && logoImg.parentNode && logoImg.parentNode.tagName !== 'A') {
      var logoLink = document.createElement('a');
      logoLink.href = p + 'index.html';
      logoLink.setAttribute('aria-label', 'Live Web Studios — Home');
      logoLink.style.display = 'inline-block';
      logoImg.parentNode.insertBefore(logoLink, logoImg);
      logoLink.appendChild(logoImg);
    }

    /* Newsletter link in the footer utility row, alongside Privacy / Terms */
    var utilityRow = footer.querySelector('.footer-bottom span');
    if (utilityRow && utilityRow.innerHTML.indexOf('newsletter.html') === -1) {
      utilityRow.insertAdjacentHTML('beforeend',
        ' &middot; <a href="' + p + 'newsletter.html">Newsletter</a>');
    }

    /* Only run injection + migration once */
    if (footer.innerHTML.indexOf('<h4>Industries</h4>') !== -1) return;

    /* Migrate Contact column into brand column first */
    var brandCol = grid.querySelector('.footer-brand');
    if (brandCol) {
      var allCols = grid.querySelectorAll('.footer-col');
      for (var i = 0; i < allCols.length; i++) {
        var col = allCols[i];
        if (col === brandCol) continue;
        var h4 = col.querySelector('h4');
        if (h4 && h4.textContent.trim().toLowerCase() === 'contact') {
          var contactWrap = document.createElement('div');
          contactWrap.className = 'footer-brand-contact';
          var kids = Array.prototype.slice.call(col.childNodes);
          for (var j = 0; j < kids.length; j++) {
            if (kids[j].nodeName !== 'H4') contactWrap.appendChild(kids[j].cloneNode(true));
          }
          brandCol.appendChild(contactWrap);
          col.parentNode.removeChild(col);
          break;
        }
      }
    }

    /* Remove the retired "Quick Links" column */
    var allCols2 = grid.querySelectorAll('.footer-col');
    for (var q = 0; q < allCols2.length; q++) {
      var qh4 = allCols2[q].querySelector('h4');
      if (qh4 && qh4.textContent.trim().toLowerCase() === 'quick links') {
        allCols2[q].parentNode.removeChild(allCols2[q]);
        break;
      }
    }

    /* Inject Industries at the end */
    grid.insertAdjacentHTML('beforeend',
      '<div class="footer-col">' +
        '<h4>Industries</h4>' +
        '<ul>' +
          '<li><a href="' + p + 'industries/healthcare.html">Healthcare</a></li>' +
          '<li><a href="' + p + 'industries/law-firm.html">Law Firms</a></li>' +
          '<li><a href="' + p + 'industries/financial-services.html">Financial</a></li>' +
          '<li><a href="' + p + 'industries/construction.html">Construction</a></li>' +
          '<li><a href="' + p + 'industries/real-estate.html">Real Estate</a></li>' +
          '<li><a href="' + p + 'industries/insurance.html">Insurance</a></li>' +
          '<li><a href="' + p + 'industries/manufacturing.html">Manufacturing</a></li>' +
          '<li><a href="' + p + 'industries/dental.html">Dental</a></li>' +
          '<li><a href="' + p + 'industries/nonprofit.html">Nonprofits</a></li>' +
          '<li><a href="' + p + 'industries/b2b.html">B2B</a></li>' +
        '</ul>' +
      '</div>');

    /* Inject Live Band Web Studios column at the far right (every page) */
    grid.insertAdjacentHTML('beforeend',
      '<div class="footer-col">' +
        '<h4>Live Band Web Studios</h4>' +
        '<ul>' +
          '<li><a href="' + p + 'live-band-web-studios/index.html">Home</a></li>' +
          '<li><a href="' + p + 'live-band-web-studios/pricing.html">Pricing</a></li>' +
          '<li><a href="' + p + 'live-band-web-studios/personal-sites.html">Personal Sites</a></li>' +
          '<li><a href="' + p + 'live-band-web-studios/portfolio.html">Portfolio</a></li>' +
          '<li><a href="' + p + 'live-band-web-studios/forms.html">Forms</a></li>' +
          '<li><a href="' + p + 'decap/">Page Edit Docs</a></li>' +
        '</ul>' +
      '</div>');

    /* Inject Namesake column at the far right (every page) */
    grid.insertAdjacentHTML('beforeend',
      '<div class="footer-col">' +
        '<h4>Namesake</h4>' +
        '<ul>' +
          '<li><a href="' + p + 'namesake/index.html">Overview</a></li>' +
          '<li><a href="' + p + 'namesake/how-it-works.html">How It Works</a></li>' +
          '<li><a href="' + p + 'namesake/start.html">Start</a></li>' +
        '</ul>' +
      '</div>');
  }

  function inject() {
    var existing = document.querySelectorAll('nav.site-nav, header.site-header');
    for (var i = 0; i < existing.length; i++) existing[i].parentNode.removeChild(existing[i]);
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    bindEvents();
    setActive();
    ensureFooterIndustries();
  }

  function bindEvents() {
    var toggle = document.getElementById('navToggle');
    var links  = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var isOpen = links.classList.toggle('open');
        toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      var anchors = links.querySelectorAll('a');
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function () {
          if (window.innerWidth <= 820) {
            links.classList.remove('open');
            toggle.innerHTML = '&#9776;';
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }

    /* Scroll shadow */
    var nav = document.getElementById('siteNav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Keyboard support for dropdowns */
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.addEventListener('focusin',  function () { item.classList.add('is-focused'); });
      item.addEventListener('focusout', function () { item.classList.remove('is-focused'); });
    });
  }

  function setActive() {
    var page = document.body.getAttribute('data-page');
    if (!page) {
      var f = path.split('/').pop().replace('.html', '');
      if (!f || f === 'index') {
        if (path.indexOf('/blog/')       !== -1 || path.indexOf('/blog.html')       !== -1) page = 'blog';
        else if (path.indexOf('/industries/') !== -1) page = 'industries';
        else page = 'home';
      } else if (path.indexOf('/services/')   !== -1) page = 'services';
        else if (path.indexOf('/industries/') !== -1) page = 'industries';
        else page = f;
    }
    var link = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if (link) link.classList.add('active');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
