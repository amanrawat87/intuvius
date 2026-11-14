/**
 * Intuivus Website - Product Data Access Layer & Shared UI Renderers
 * 
 * Provides an asynchronous data access interface for products, reading from data/products.json,
 * as well as shared template-literal card rendering (renderProductCard) to prevent UI drift.
 * 
 * Note: Must be served over HTTP/HTTPS (e.g. Live Server, localhost, or web server).
 * Running directly from the filesystem (file://) will trigger browser CORS restrictions on fetch().
 */

(function (window) {
  'use strict';

  let _productsCache = null;

  const EMBEDDED_PRODUCTS_FALLBACK = [
    {
      product_name: 'TrialOps 360',
      tagline: 'Plan on evidence. Not assumptions.',
      slug: 'trialops-360',
      category: 'Planning & Feasibility Intelligence',
      card_summary: 'Design, budget, and operationalise clinical studies using real-world data and predictive analytics.',
      hero_headline: 'Plan on evidence. Not assumptions.',
      status: 'Live',
      is_flagship: true,
      display_order: 1,
      bg_image: 'images/resource/trialops-360-dashboard.jpg'
    },
    {
      product_name: 'Feasibility Intelligence',
      tagline: 'Empirical protocol optimization grounded in real-world patient data.',
      slug: 'feasibility-intelligence',
      category: 'Protocol Analytics',
      card_summary: 'Assess protocol viability before commitment by modeling eligibility criteria and endpoints against verified patient populations.',
      hero_headline: 'Validate protocol feasibility before commitment.',
      status: 'Live',
      is_flagship: false,
      display_order: 2,
      bg_image: 'images/resource/product-bg-feasibility.jpg'
    },
    {
      product_name: 'Budget & Cost Modeling',
      tagline: 'Defensible financial planning benchmarked against historical trial costs.',
      slug: 'budget-modeling',
      category: 'Financial Intelligence',
      card_summary: 'Build defensible, benchmark-grounded study budgets and cost projections to remove financial guesswork from executive steering.',
      hero_headline: 'Precision budgeting for complex trial environments.',
      status: 'Live',
      is_flagship: false,
      display_order: 3,
      bg_image: 'images/resource/product-bg-budget.jpg'
    },
    {
      product_name: 'Site Intelligence & Selection',
      tagline: 'Identify and rank investigative sites by empirical performance.',
      slug: 'site-intelligence',
      category: 'Site Intelligence',
      card_summary: 'Identify, rank, and activate investigative sites using validated historical enrolment speed, patient access, and operational quality.',
      hero_headline: 'Empirical site selection that accelerates startup.',
      status: 'Live',
      is_flagship: false,
      display_order: 4,
      bg_image: 'images/resource/product-bg-site.jpg'
    },
    {
      product_name: 'Recruitment & Enrolment Forecasting',
      tagline: 'Predictive enrolment timelines with zero subjective guesswork.',
      slug: 'recruitment-forecasting',
      category: 'Predictive Operations',
      card_summary: 'Project patient enrolment trajectories using machine learning models accounting for screen-fail rates, dropouts, and site kinetics.',
      hero_headline: 'Predictive enrolment modeling you can bank on.',
      status: 'Live',
      is_flagship: false,
      display_order: 5,
      bg_image: 'images/resource/product-bg-recruitment.jpg'
    }
  ];

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Fetch all products from local JSON store.
   * Default behavior: filters for status === "Live" and sorts by display_order ascending.
   * Falls back to embedded product records when running over file:// or if fetch() fails.
   * 
   * @param {Object} [options]
   * @param {boolean} [options.includeDrafts=false] - Whether to include draft products
   * @param {boolean} [options.forceRefresh=false] - Bypass in-memory cache
   * @returns {Promise<Array>} Array of product objects.
   */
  async function getProducts(options) {
    const opts = options || {};

    if (!_productsCache || opts.forceRefresh) {
      if (window.location.protocol === 'file:') {
        _productsCache = EMBEDDED_PRODUCTS_FALLBACK.slice();
      } else {
        try {
          const response = await fetch('data/products.json');
          if (!response.ok) {
            throw new Error('HTTP ' + response.status + ': Failed to load data/products.json');
          }
          _productsCache = await response.json();
        } catch (error) {
          console.warn('Intuivus Data Access Layer: Falling back to embedded products (' + error.message + ')');
          _productsCache = EMBEDDED_PRODUCTS_FALLBACK.slice();
        }
      }
    }

    let list = Array.isArray(_productsCache) ? _productsCache.slice() : [];

    // Filter by status === "Live" unless drafts are explicitly requested
    if (!opts.includeDrafts) {
      list = list.filter(function (product) {
        return product && product.status === 'Live';
      });
    }

    // Sort by display_order ascending (fallback to 9999)
    list.sort(function (a, b) {
      const orderA = typeof a.display_order === 'number' ? a.display_order : 9999;
      const orderB = typeof b.display_order === 'number' ? b.display_order : 9999;
      return orderA - orderB;
    });

    return list;
  }

  /**
   * Find a single product by its URL slug.
   * Throws if data fetching fails; returns null if data loads but slug is not found.
   * 
   * @param {string} slug 
   * @param {Object} [options]
   * @returns {Promise<Object|null>} Product object or null if not found.
   */
  async function getProductBySlug(slug, options) {
    if (!slug || typeof slug !== 'string') {
      return null;
    }

    const opts = options || {};
    const products = await getProducts({ includeDrafts: opts.includeDrafts || false });
    return products.find(function (product) {
      return product && product.slug === slug;
    }) || null;
  }

  /**
   * Generates shared markup for an individual product card.
   * Used uniformly across products.html listing and index.html featured section.
   * @param {Object} product - Product record
   * @returns {string} HTML string
   */
  function getProductIconClass(slug) {
    switch (slug) {
      case 'trialops-360': return 'fa-solid fa-layer-group';
      case 'feasibility-intelligence': return 'fa-solid fa-brain';
      case 'budget-modeling': return 'fa-solid fa-calculator';
      case 'site-intelligence': return 'fa-solid fa-hospital-user';
      case 'recruitment-forecasting': return 'fa-solid fa-chart-line';
      default: return 'fa-solid fa-cube';
    }
  }

  /**
   * Generates shared markup for an individual product card.
   * Used uniformly across products.html listing.
   * @param {Object} product - Product record
   * @returns {string} HTML string
   */
  function renderProductCard(product) {
    if (!product) return '';
    const detailUrl = 'javascript:void(0)';
    const iconClass = getProductIconClass(product.slug);
    const categoryBadge = product.category 
      ? `<span class="modular-cat-badge mb-3 d-inline-block">${escapeHtml(product.category)}</span>` 
      : '';
    const tagline = product.tagline 
      ? `<div class="modular-card-tagline mb-2">${escapeHtml(product.tagline)}</div>` 
      : '';
    const summary = product.card_summary 
      ? `<p class="modular-card-summary mb-3">${escapeHtml(product.card_summary)}</p>` 
      : '';
    
    return `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="modular-card-clean">
          <div class="modular-card-header">
            ${categoryBadge}
            <div class="modular-card-icon">
              <i class="${iconClass}"></i>
            </div>
          </div>
          <h3 class="modular-card-title">
            <a href="${detailUrl}">${escapeHtml(product.product_name || '')}</a>
          </h3>
          ${tagline}
          ${summary}
          <div class="modular-card-footer">
            <a href="${detailUrl}" class="modular-explore-link">Explore Product <i class="fa-solid fa-arrow-right ms-1"></i></a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generates markup for a modular product card with full background image for Swiper carousel.
   * @param {Object} product - Product record
   * @returns {string} HTML string
   */
  function renderModularProductCard(product) {
    if (!product) return '';
    const detailUrl = 'javascript:void(0)';
    const iconClass = getProductIconClass(product.slug);
    const bgImage = product.bg_image || 'images/resource/product-bg-feasibility.jpg';
    const categoryBadge = product.category 
      ? `<span class="modular-cat-glass-badge">${escapeHtml(product.category)}</span>` 
      : '';
    const summary = product.card_summary || product.tagline || '';

    return `
      <div class="swiper-slide">
        <div class="modular-card-visual">
          <div class="modular-card-bg" style="background-image: url('${bgImage}');"></div>
          <div class="modular-card-overlay"></div>
          <div class="modular-card-top">
            ${categoryBadge}
            <div class="modular-card-glass-icon">
              <i class="${iconClass}"></i>
            </div>
          </div>
          <div class="modular-card-content">
            <h3 class="modular-card-title">
              <a href="${detailUrl}">${escapeHtml(product.product_name || '')}</a>
            </h3>
            <p class="modular-card-desc">${escapeHtml(summary)}</p>
            <div class="modular-card-action">
              <a href="${detailUrl}" class="modular-action-btn">
                <span>Explore Module</span>
                <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Expose on the window namespace
  window.IntuivusData = window.IntuivusData || {};
  window.IntuivusData.getProducts = getProducts;
  window.IntuivusData.getProductBySlug = getProductBySlug;
  window.IntuivusData.renderProductCard = renderProductCard;
  window.IntuivusData.renderModularProductCard = renderModularProductCard;
  window.IntuivusData.escapeHtml = escapeHtml;

  // Direct global aliases for convenient access
  window.getProducts = getProducts;
  window.getProductBySlug = getProductBySlug;
  window.renderProductCard = renderProductCard;
  window.renderModularProductCard = renderModularProductCard;
  window.escapeHtml = escapeHtml;

})(typeof window !== 'undefined' ? window : this);
