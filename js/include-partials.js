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

  const EMBEDDED_FOOTER_HTML = `<!-- Main Footer (Shared Partial) -->
<footer class="main-footer footer-style-one" id="main-site-footer">
  <div class="widgets-section">
    <div class="footer-middle">
      <div class="container">
        <div class="row g-4 justify-content-between">

          <!-- Col 1: Brand & One-line description & LinkedIn -->
          <div class="col-xl-4 col-lg-4 col-md-12 mb-3 mb-lg-0">
            <div class="footer-widget about-widget">
              <div class="logo mb-2">
                <a href="index.html">
                  <img src="images/logo-intuivus-white.png" alt="Intuivus" style="height: 48px; width: auto; object-fit: contain;">
                </a>
              </div>
              <p class="footer-about-text">
                Smarter systems for clinical trials.
              </p>
              <!-- Social Media Handles -->
              <div class="footer-social-links">
                <a href="contact.html" class="social-link" aria-label="LinkedIn" title="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Products -->
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-3 mb-md-0">
            <div class="footer-widget links-widget">
              <div class="h6 widget-title">Products</div>
              <div class="widget-content">
                <ul class="user-links footer-links-list">
                  <li><a href="trialops360.html">TrialOps360</a></li>
                  <li><a href="other-systems.html">Other Systems</a></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Col 3: Navigation Links -->
          <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6 mb-3 mb-md-0">
            <div class="footer-widget links-widget">
              <div class="h6 widget-title">Navigation</div>
              <div class="widget-content">
                <ul class="user-links footer-links-list">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">About</a></li>
                  <li><a href="contact.html">Contact</a></li>
                  <li><a href="privacy-policy.html">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Col 4: Contact Info -->
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12">
            <div class="footer-widget consult-widget">
              <div class="h6 widget-title">Contact</div>
              <div class="widget-content">
                <ul class="footer-contact-list">
                  <li>
                    <i class="fa-solid fa-envelope contact-icon"></i>
                    <a href="mailto:bd@intuivus.com">bd@intuivus.com</a>
                  </li>
                  <li>
                    <i class="fa-solid fa-location-dot contact-icon"></i>
                    <span>100 Cambridge St, Boston, MA</span>
                  </li>
                  <li>
                    <i class="fa-brands fa-linkedin-in contact-icon"></i>
                    <a href="contact.html">linkedin.com/company/intuivus</a>
                  </li>
                </ul>
                <div class="mt-3">
                  <a href="contact.html?enquiry=demo" class="footer-consult-btn">
                    <span>Request a Demo <i class="fa fa-arrow-right ms-2"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="footer-bottom">
      <div class="container">
        <div class="inner-container d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div class="copyright-text">
            &copy; 2026 Intuivus. All rights reserved.
          </div>
          <ul class="footer-nav d-flex align-items-center gap-3 mb-0">
            <li><a href="index.html">Home</a></li>
            <li><a href="trialops360.html">TrialOps360</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>

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
    await loadPartial('#site-footer', 'partials/footer.html?v=9.0', EMBEDDED_FOOTER_HTML);
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
