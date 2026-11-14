/**
 * Intuivus Website - Shared Partials Loader & Navigation Synchronizer
 *
 * Fetches and injects partials/header.html and partials/footer.html into #site-header
 * and #site-footer, with embedded fallbacks so file:// works identically to hosting.
 */

(function (window) {
  'use strict';

  const EMBEDDED_HEADER_HTML = `<!-- Main Header (Shared Partial) -->
<header class="main-header header-style-two">
  <div class="outer-box">
    <div class="header-lower">
      <!-- Main box -->
      <div class="main-box">
        <div class="logo-box">
          <div class="logo">
            <a href="index.html" class="d-inline-flex align-items-center text-decoration-none">
              <img src="images/logo-intuivus-white.png" alt="Intuivus" style="height: 48px; width: auto; object-fit: contain;">
            </a>
          </div>
        </div>

        <!-- Nav Box -->
        <div class="nav-outer">
          <nav class="nav main-menu">
            <ul class="navigation">
              <li><a href="index.html">Home</a></li>
              <li class="dropdown">
                <a href="trialops360.html" class="nav-dropdown-toggle">
                  <span>Technology</span>
                  <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </a>
                <ul class="nav-dropdown-menu">
                  <li class="nav-dd-header" aria-hidden="true">
                    <span class="nav-dd-eyebrow">Clinical Systems</span>
                    <span class="nav-dd-eyebrow-pill">Intuivus Suite</span>
                  </li>
                  <li class="nav-dd-item">
                    <a href="trialops360.html" class="nav-dd-card">
                      <span class="nav-dd-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                      </span>
                      <span class="nav-dd-body">
                        <span class="nav-dd-title-row">
                          <span class="nav-dd-title">TrialOps360</span>
                          <span class="nav-dd-badge">Flagship</span>
                        </span>
                        <span class="nav-dd-desc">Clinical trial budgeting, forecasting &amp; planning</span>
                      </span>
                      <span class="nav-dd-arrow" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </span>
                    </a>
                  </li>
                  <li class="nav-dd-item">
                    <a href="other-systems.html" class="nav-dd-card">
                      <span class="nav-dd-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>
                      </span>
                      <span class="nav-dd-body">
                        <span class="nav-dd-title-row">
                          <span class="nav-dd-title">Other Systems</span>
                        </span>
                        <span class="nav-dd-desc">Connected trial infrastructure &amp; modules</span>
                      </span>
                      <span class="nav-dd-arrow" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </span>
                    </a>
                  </li>
                  <li class="nav-dd-footer">
                    <a href="contact.html?enquiry=budget" class="nav-dd-footer-link">
                      <span class="nav-dd-footer-text">Need a study plan? <strong>Get Complimentary Budget</strong></span>
                      <span class="nav-dd-footer-arrow" aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
        </div>

        <!-- Action Box -->
        <div class="action-box">
          <div class="header-btn" style="gap: 12px; display: flex; align-items: center;">
            <a class="header-btn-secondary" href="contact.html?enquiry=budget"><span class="btn-text">Get Complimentary Budget</span></a>
            <a class="header-btn-primary" href="contact.html?enquiry=demo"><span class="btn-text">Request a Demo</span></a>
          </div>

          <!-- Mobile Nav toggler -->
          <div class="mobile-nav-toggler">
            <div class="shape-line-img"><i class="fas fa-bars"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu">
    <div class="menu-backdrop"></div>
    <nav class="menu-box">
      <div class="upper-box">
        <div class="nav-logo">
          <a href="index.html" class="d-inline-flex align-items-center text-decoration-none">
            <img src="images/logo-intuivus-white.png" alt="Intuivus" style="height: 48px; width: auto; object-fit: contain;">
          </a>
        </div>
        <div class="close-btn"><i class="icon fa fa-times"></i></div>
      </div>
      <ul class="navigation clearfix">
        <!-- Populated and synchronized by js/include-partials.js -->
      </ul>
      <div class="p-3 d-flex flex-column gap-2">
        <a class="header-btn-primary w-100 text-center" href="contact.html?enquiry=demo"><span class="btn-text">Request a Demo</span></a>
        <a class="header-btn-secondary w-100 text-center" href="contact.html?enquiry=budget"><span class="btn-text">Get Complimentary Budget</span></a>
      </div>
    </nav>
  </div>
  <!-- End Mobile Menu -->

  <!-- Sticky Header -->
  <div class="sticky-header">
    <div class="auto-container">
      <div class="inner-container">
        <div class="logo">
          <a href="index.html" class="d-inline-flex align-items-center text-decoration-none">
            <img src="images/logo-intuivus-white.png" alt="Intuivus" style="height: 48px; width: auto; object-fit: contain;">
          </a>
        </div>

        <div class="nav-outer">
          <nav class="main-menu">
            <div class="navbar-collapse show collapse clearfix">
              <ul class="navigation clearfix">
                <!-- Populated and synchronized by js/include-partials.js -->
              </ul>
            </div>
          </nav>
          <div class="mobile-nav-toggler"><span class="icon lnr-icon-bars"></span></div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Sticky Menu -->
</header>
`;

  const EMBEDDED_FOOTER_HTML = `<!-- Main Footer (Tycoon Dotted Particle Style) -->
<footer class="main-footer footer-style-one tycoon-footer" id="main-site-footer">
  <div class="footer-top-grid">

    <!-- Col 1: Services & Company -->
    <div class="footer-links-col">
      <div class="footer-col-title">SERVICES &amp; COMPANY</div>
      <ul class="footer-slash-links">
        <li class="footer-link-item"><a href="index.html"><span class="slash">/</span> HOME</a></li>
        <li class="footer-link-item"><a href="trialops360.html"><span class="slash">/</span> TRIALOPS360</a></li>
        <li class="footer-link-item"><a href="other-systems.html"><span class="slash">/</span> OTHER SYSTEMS</a></li>
        <li class="footer-link-item"><a href="about.html"><span class="slash">/</span> ABOUT US</a></li>
        <li class="footer-link-item"><a href="contact.html"><span class="slash">/</span> CONTACT</a></li>
      </ul>
    </div>

    <!-- Col 2: Reach Out To Us -->
    <div class="footer-center-col">
      <div class="footer-col-title">REACH OUT TO US</div>
      <div class="footer-contact-info">
        <a href="tel:+918527458950" class="footer-contact-line">
          <span class="footer-contact-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </span>
          +91 8527458950
        </a>
        <a href="mailto:bd@intuivus.com" class="footer-contact-line email-line">
          <span class="footer-contact-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </span>
          bd@intuivus.com
        </a>
      </div>
      <a href="contact.html?enquiry=connect" class="footer-connect-btn">
        <span>Let's Connect</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>

    <!-- Col 3: Social -->
    <div class="footer-right-col">
      <div class="footer-col-title">SOCIAL</div>
      <ul class="footer-slash-links">
        <li class="footer-link-item"><a href="https://linkedin.com/company/intuivus" target="_blank" rel="noopener"><span class="slash">/</span> LINKEDIN</a></li>
        <li class="footer-link-item"><a href="https://twitter.com/intuivus" target="_blank" rel="noopener"><span class="slash">/</span> TWITTER</a></li>
        <li class="footer-link-item"><a href="https://instagram.com/intuivus" target="_blank" rel="noopener"><span class="slash">/</span> INSTAGRAM</a></li>
        <li class="footer-link-item"><a href="https://github.com/amanrawat87/intuvius" target="_blank" rel="noopener"><span class="slash">/</span> GITHUB</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-middle-divider"></div>

  <div class="footer-copy-row">
    <span>&copy; 2026 ALL RIGHTS RESERVED</span>
    <span>INTUIVUS &bull; CONNECTED INTELLIGENCE</span>
  </div>

  <!-- Giant Dotted Matrix Particle Brand Name -->
  <div class="footer-particle-container" id="footer-particle-container">
    <canvas id="footer-particle-canvas"></canvas>
  </div>
</footer>`;

  async function loadPartial(selector, url, fallbackHtml) {
    const target = document.querySelector(selector);
    if (!target) {
      return false;
    }

    if (window.location.protocol === 'file:' && fallbackHtml) {
      target.innerHTML = fallbackHtml;
      return true;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ' loading ' + url);
      }
      target.innerHTML = await response.text();
      return true;
    } catch (error) {
      if (fallbackHtml) {
        target.innerHTML = fallbackHtml;
        return true;
      }
      console.error('Intuivus Partials: Error loading ' + url + ':', error);
      return false;
    }
  }

  function markActiveNavigation() {
    const path = window.location.pathname || '';
    const pageName = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.main-header .main-menu .navigation a').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('?')[0];
      if (href === pageName || (pageName === '' && href === 'index.html')) {
        const li = link.closest('li');
        if (li) li.classList.add('current');
        const parentDropdown = link.closest('li.dropdown');
        if (parentDropdown) parentDropdown.classList.add('current');
      }
    });
  }

  function syncThemeNavigation() {
    markActiveNavigation();

    if (!window.jQuery) return;
    const $ = window.jQuery;

    $('.main-header .navigation li.dropdown').each(function () {
      if (!$(this).children('.dropdown-btn').length) {
        $(this).append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
      }
    });

    const navContent = $('.main-header .main-menu .navigation').html();
    if (navContent) {
      if ($('.mobile-menu .navigation').length) {
        $('.mobile-menu .navigation').html(navContent);
      }
      if ($('.sticky-header .navigation').length) {
        $('.sticky-header .navigation').html(navContent);
      }
    }

    $('.mobile-nav-toggler').off('click').on('click', function () {
      $('body').addClass('mobile-menu-visible');
    });

    $('.mobile-menu .close-btn, .mobile-menu .menu-backdrop').off('click').on('click', function () {
      $('body').removeClass('mobile-menu-visible');
    });

    $('.mobile-menu li.dropdown .dropdown-btn').off('click').on('click', function () {
      $(this).prev('ul').slideToggle(500);
      $(this).toggleClass('active');
    });
  }

  async function initPartials() {
    await loadPartial('#site-header', 'partials/header.html?v=9.2', EMBEDDED_HEADER_HTML);
    if (document.body && document.body.classList.contains('home-page-tlp')) {
      var heroLogo = document.querySelector('.main-header.header-style-two .logo-box .logo img');
      if (heroLogo) heroLogo.src = 'images/logo-intuivus-white.png'; heroLogo.style.height = '48px'; heroLogo.style.width = 'auto';
    }
    syncThemeNavigation();
    await loadPartial('#site-footer', 'partials/footer.html?v=10.0', EMBEDDED_FOOTER_HTML);
    if (typeof window.initFooterParticles === 'function') {
      window.initFooterParticles();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartials);
  } else {
    initPartials();
  }

  window.IntuivusPartials = {
    loadPartial: loadPartial,
    initPartials: initPartials,
    syncThemeNavigation: syncThemeNavigation
  };

})(typeof window !== 'undefined' ? window : this);
