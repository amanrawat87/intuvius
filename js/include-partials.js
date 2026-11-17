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
          <div class="mobile-nav-toggler" aria-label="Open navigation menu" role="button" tabindex="0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" aria-label="Mobile Navigation" role="dialog" aria-modal="true">
    <div class="menu-backdrop"></div>
    <nav class="menu-box">
      <div class="upper-box">
        <div class="nav-logo">
          <a href="index.html" class="d-inline-flex align-items-center text-decoration-none">
            <img src="images/logo-intuivus-white.png" alt="Intuivus" style="height: 44px; width: auto; object-fit: contain;">
          </a>
        </div>
        <div class="close-btn" aria-label="Close navigation menu" role="button" tabindex="0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
      <ul class="navigation clearfix">
        <!-- Populated and synchronized by js/include-partials.js -->
      </ul>
      <div class="drawer-cta-box p-3 d-flex flex-column gap-2">
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
  <div class="outer-box">
    <div class="footer-container">
      <div class="footer-top-grid">

        <!-- Col 1: Services & Company -->
        <div class="footer-links-col">
          <div class="footer-col-title">SERVICES &amp; COMPANY</div>
          <ul class="footer-slash-links">
            <li class="footer-link-item">
              <a href="index.html">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-solid fa-house"></i></span>
                <span>HOME</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="trialops360.html">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-solid fa-chart-pie"></i></span>
                <span>TRIALOPS360</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="other-systems.html">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-solid fa-network-wired"></i></span>
                <span>OTHER SYSTEMS</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="about.html">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-solid fa-circle-info"></i></span>
                <span>ABOUT US</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="contact.html">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-solid fa-envelope"></i></span>
                <span>CONTACT</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 2: Dotted Matrix INTUIVUS (Moved up to replace center section) -->
        <div class="footer-center-col footer-brand-particle-col">
          <div class="footer-particle-container" id="footer-particle-container">
            <canvas id="footer-particle-canvas"></canvas>
          </div>
        </div>

        <!-- Col 3: Social -->
        <div class="footer-right-col">
          <div class="footer-col-title">SOCIAL</div>
          <ul class="footer-slash-links">
            <li class="footer-link-item">
              <a href="https://linkedin.com/company/intuivus" target="_blank" rel="noopener">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-brands fa-linkedin-in"></i></span>
                <span>LINKEDIN</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="https://twitter.com/intuivus" target="_blank" rel="noopener">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-brands fa-twitter"></i></span>
                <span>TWITTER</span>
              </a>
            </li>
            <li class="footer-link-item">
              <a href="https://instagram.com/intuivus" target="_blank" rel="noopener">
                <span class="footer-link-icon" aria-hidden="true"><i class="fa-brands fa-instagram"></i></span>
                <span>INSTAGRAM</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-middle-divider"></div>

      <div class="footer-copy-row">
        <span>&copy; 2026 ALL RIGHTS RESERVED</span>
        <span>INTUIVUS &bull; CONNECTED INTELLIGENCE</span>
      </div>
    </div>
  </div>
</footer>
<!-- Request Demo Modal (Side-by-side Image & Form Layout - Compact & Luxury Dark) -->
<div class="modal fade demo-popup-modal" id="requestDemoModal" tabindex="-1" aria-labelledby="requestDemoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered demo-modal-dialog">
    <div class="modal-content demo-modal-content">
      <div class="modal-body p-0">
        <button type="button" class="btn-close demo-modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="row g-0 align-items-stretch">
          
          <!-- Left Column: Visual Showcase -->
          <div class="col-md-5 d-none d-md-flex flex-column justify-content-between demo-modal-media-col" style="background: linear-gradient(180deg, rgba(13, 8, 36, 0.90) 0%, rgba(9, 5, 24, 0.97) 100%), url('images/resource/about-clinical-research.jpg') center center / cover no-repeat;">
            <div>
              <div class="demo-modal-brand-badge mb-3">
                <span class="badge-dot">●</span> Intuivus Live Demo
              </div>
              <h3 class="demo-modal-media-title">Experience Clinical Intelligence Live</h3>
              <p class="demo-modal-media-desc">
                Schedule a tailored 30-minute walkthrough to see how TrialOps360 automates study budgets, global site allocations, and execution plans with board-ready certainty.
              </p>
              
              <ul class="demo-modal-feature-list">
                <li>
                  <i class="fa-solid fa-circle-check"></i>
                  <span>1-on-1 session with clinical operations leaders</span>
                </li>
                <li>
                  <i class="fa-solid fa-circle-check"></i>
                  <span>Protocol synopsis to bottom-up budget demo</span>
                </li>
                <li>
                  <i class="fa-solid fa-circle-check"></i>
                  <span>Interactive country &amp; site allocation simulation</span>
                </li>
              </ul>
            </div>
            
            <div class="demo-modal-media-footer mt-3 pt-3 border-top border-white-10">
              <span class="text-white-50" style="font-size: 0.74rem;"><i class="fa-solid fa-shield-halved text-purple me-1"></i> Enterprise GxP &amp; 21 CFR Part 11 compliant.</span>
            </div>
          </div>

          <!-- Right Column: Interactive Form -->
          <div class="col-md-7 p-4 p-lg-4 demo-modal-form-col">
            <div class="demo-modal-header mb-3">
              <span class="metrics-pill-badge mb-2">
                <span class="badge-dot">●</span> 30-Min Walkthrough
              </span>
              <h3 class="title fw-bold mb-1" id="requestDemoModalLabel" style="color: #ffffff; font-size: 1.35rem; line-height: 1.25;">Request a Product Demo</h3>
              <p class="mb-0" style="color: #94a3b8; font-size: 0.82rem;">Fill in your details below and our clinical team will confirm your session.</p>
            </div>

            <form id="popup_demo_form" name="popup_demo_form" novalidate>
              <div class="row g-2 mb-2">
                <div class="col-sm-6">
                  <label for="demo_full_name" class="form-label">Full Name <span class="text-danger">*</span></label>
                  <input id="demo_full_name" name="full_name" class="form-control" type="text" placeholder="Dr. Sarah Chen" required>
                  <div class="invalid-feedback">Please enter your full name.</div>
                </div>
                <div class="col-sm-6">
                  <label for="demo_work_email" class="form-label">Work Email <span class="text-danger">*</span></label>
                  <input id="demo_work_email" name="work_email" class="form-control" type="email" placeholder="sarah.chen@biopharma.com" required>
                  <div class="invalid-feedback">Please enter a valid work email.</div>
                </div>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-sm-6">
                  <label for="demo_company" class="form-label">Company / Org <span class="text-danger">*</span></label>
                  <input id="demo_company" name="company" class="form-control" type="text" placeholder="BioPharma Innovations" required>
                  <div class="invalid-feedback">Please enter your organization.</div>
                </div>
                <div class="col-sm-6">
                  <label for="demo_job_title" class="form-label">Job Title</label>
                  <input id="demo_job_title" name="job_title" class="form-control" type="text" placeholder="VP Clinical Operations">
                </div>
              </div>

              <div class="mb-2">
                <label for="demo_focus_area" class="form-label">Primary Area of Interest</label>
                <select id="demo_focus_area" name="focus_area" class="form-control">
                  <option value="TrialOps360 Full Platform">TrialOps360 Full Platform Walkthrough</option>
                  <option value="Clinical Trial Budgeting">Clinical Trial Budgeting &amp; Modeling</option>
                  <option value="Site Allocation & Feasibility">Site Allocation &amp; Feasibility Simulation</option>
                  <option value="Custom Scenario Comparison">Custom Scenario Comparison</option>
                </select>
              </div>

              <div class="mb-2">
                <label for="demo_notes" class="form-label">Study Details or Questions (optional)</label>
                <textarea id="demo_notes" name="notes" class="form-control" rows="2" placeholder="Briefly describe your trial phase, indication, or planning timeline..."></textarea>
              </div>

              <div class="mt-3">
                <button type="submit" class="header-btn-primary demo-modal-submit-btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 border-0">
                  <span class="btn-text">Schedule Demo Walkthrough</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div id="demo-success-alert" class="alert alert-success mt-2 mb-0 py-2" style="display: none; background: rgba(34, 197, 94, 0.18); border-color: rgba(34, 197, 94, 0.35); color: #4ade80; font-size: 0.85rem;" role="status">
                Thank you! We have received your request and will reach out within 24 hours to coordinate your live demo.
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>`;

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

  // Ensure .mobile-menu is attached directly to document.body
  // so it is NEVER constrained by headers with backdrop-filter or overflow-x clip
  function attachMobileMenuToBody() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.parentElement !== document.body) {
      document.body.appendChild(mobileMenu);
    }
  }

  function syncThemeNavigation() {
    markActiveNavigation();

    // Ensure mobile drawer is attached to body
    attachMobileMenuToBody();

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

    // Direct jQuery handlers as fallback
    $('.mobile-nav-toggler').off('click').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      attachMobileMenuToBody();
      $('body').addClass('mobile-menu-visible');
    });

    $('.mobile-menu .close-btn, .mobile-menu .menu-backdrop').off('click').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $('body').removeClass('mobile-menu-visible');
    });

    $('.mobile-menu li.dropdown .dropdown-btn').off('click').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = $(this).closest('li.dropdown');
      parentLi.toggleClass('open');
      $(this).toggleClass('active');
      parentLi.find('> ul').slideToggle(280);
    });

    // Close mobile drawer when an inner link is clicked
    $('.mobile-menu .navigation a:not(.nav-dropdown-toggle)').off('click.closeDrawer').on('click.closeDrawer', function () {
      $('body').removeClass('mobile-menu-visible');
    });
  }

  // Global Delegated Listeners (Vanilla JS with capture: true for bulletproof execution)
  if (typeof document !== 'undefined' && !window._intuivusMobileMenuAttached) {
    window._intuivusMobileMenuAttached = true;

    document.addEventListener('click', function (e) {
      // Toggle button clicked
      const toggler = e.target.closest('.mobile-nav-toggler');
      if (toggler) {
        e.preventDefault();
        e.stopPropagation();
        attachMobileMenuToBody();
        document.body.classList.add('mobile-menu-visible');
        return;
      }

      // Close button or backdrop clicked
      const closer = e.target.closest('.mobile-menu .close-btn, .mobile-menu .menu-backdrop');
      if (closer) {
        e.preventDefault();
        e.stopPropagation();
        document.body.classList.remove('mobile-menu-visible');
        return;
      }

      // Dropdown arrow clicked in mobile menu
      const ddBtn = e.target.closest('.mobile-menu li.dropdown .dropdown-btn');
      if (ddBtn) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = ddBtn.closest('li.dropdown');
        if (parentLi) {
          parentLi.classList.toggle('open');
          ddBtn.classList.toggle('active');
          const subMenu = parentLi.querySelector('ul');
          if (subMenu) {
            subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
          }
        }
        return;
      }

      // Nav link clicked in mobile menu (close drawer)
      const navLink = e.target.closest('.mobile-menu .navigation a:not(.nav-dropdown-toggle)');
      if (navLink) {
        document.body.classList.remove('mobile-menu-visible');
      }
    }, true);

    // Escape key closes mobile menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-visible')) {
        document.body.classList.remove('mobile-menu-visible');
      }
    });
  }

  
  function initDemoModalHandler() {
    // Intercept any click on Request a Demo buttons/links to show the modal
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('a, button');
      if (!btn) return;
      var text = (btn.textContent || '').trim().toLowerCase();
      var href = btn.getAttribute('href') || '';
      var isDemoTrigger = btn.dataset.bsTarget === '#requestDemoModal' ||
                          btn.hasAttribute('data-open-demo-modal') ||
                          href === '#requestDemoModal' ||
                          href.indexOf('enquiry=demo') !== -1 ||
                          text === 'request a demo' ||
                          text === 'request a 30-min demo';
      if (isDemoTrigger) {
        var modalEl = document.getElementById('requestDemoModal');
        if (modalEl) {
          if (modalEl.parentElement !== document.body) {
            document.body.appendChild(modalEl);
          }
          if (window.bootstrap && window.bootstrap.Modal) {
            e.preventDefault();
            var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        }
      }
    });

    // Handle popup demo form submit
    document.addEventListener('submit', function (e) {
      if (e.target && e.target.id === 'popup_demo_form') {
        e.preventDefault();
        var form = e.target;
        var fullName = document.getElementById('demo_full_name');
        var workEmail = document.getElementById('demo_work_email');
        var company = document.getElementById('demo_company');
        var alertBox = document.getElementById('demo-success-alert');

        var isValid = true;
        if (!fullName || !fullName.value.trim()) {
          if (fullName) fullName.classList.add('is-invalid');
          isValid = false;
        } else if (fullName) {
          fullName.classList.remove('is-invalid');
        }

        if (!workEmail || !workEmail.value.trim() || !workEmail.value.includes('@')) {
          if (workEmail) workEmail.classList.add('is-invalid');
          isValid = false;
        } else if (workEmail) {
          workEmail.classList.remove('is-invalid');
        }

        if (!company || !company.value.trim()) {
          if (company) company.classList.add('is-invalid');
          isValid = false;
        } else if (company) {
          company.classList.remove('is-invalid');
        }

        if (!isValid) return;

        if (alertBox) {
          alertBox.style.display = 'block';
        }
        form.reset();
        setTimeout(function() {
          var modalEl = document.getElementById('requestDemoModal');
          if (modalEl && window.bootstrap && window.bootstrap.Modal) {
            var modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            if (alertBox) alertBox.style.display = 'none';
          }
        }, 3000);
      }
    });
  }

  async function initPartials() {
    initDemoModalHandler();
    await loadPartial('#site-header', 'partials/header.html?v=9.3', EMBEDDED_HEADER_HTML);
    attachMobileMenuToBody();
    if (document.body && document.body.classList.contains('home-page-tlp')) {
      var heroLogo = document.querySelector('.main-header.header-style-two .logo-box .logo img');
      if (heroLogo) heroLogo.src = 'images/logo-intuivus-white.png'; heroLogo.style.height = '48px'; heroLogo.style.width = 'auto';
    }
    syncThemeNavigation();
    await loadPartial('#site-footer', 'partials/footer.html?v=10.0', EMBEDDED_FOOTER_HTML);
    var modalEl = document.getElementById('requestDemoModal');
    if (modalEl && modalEl.parentElement !== document.body) {
      document.body.appendChild(modalEl);
    }
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
