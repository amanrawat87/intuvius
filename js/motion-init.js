/**
 * Intuivus Global Motion.dev Animation Controller
 * Uses Motion v12 (window.Motion: animate, inView, stagger, scroll, hover, press)
 */
(function () {
  'use strict';

  function readCssMs(el, prop, fallback) {
    var val = window.getComputedStyle(el).getPropertyValue(prop).trim();
    if (val.endsWith('ms')) return parseFloat(val) || fallback;
    if (val.endsWith('s')) return (parseFloat(val) * 1000) || fallback;
    return fallback;
  }

  function setupPageLoader() {
    var loader = document.querySelector('[data-loader]');
    if (!loader) return;

    var root = document.documentElement;
    var gapEl = loader.querySelector('[data-loader-gap]');
    var countEl = loader.querySelector('[data-loader-count]');
    var stackEl = loader.querySelector('[data-loader-stack]');
    var shots = stackEl ? Array.prototype.slice.call(stackEl.querySelectorAll('.o-loader__shot')) : [];
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finishCleanup() {
      root.classList.remove('has-loader', 'is-ready', 'is-filling', 'is-loaded');
      document.dispatchEvent(new CustomEvent('loader:complete'));
    }

    if (reducedMotion || !root.classList.contains('has-loader') || !gapEl || !countEl) {
      finishCleanup();
      return;
    }

    var easeOutCubic = function (t) {
      return 1 - Math.pow(1 - t, 3);
    };

    var pct = 0;
    var pageLoaded = false;
    var done = false;
    var finishing = false;
    var startTs = performance.now();

    function setProgress(nextPct) {
      pct = nextPct;
      countEl.textContent = String(Math.round(nextPct));
      var maxGap = Math.max(92, Math.min(0.3 * window.innerWidth, 420));
      gapEl.style.setProperty('--loader-gap', (nextPct / 100) * maxGap + 'px');
    }

    function runFinalFill() {
      if (finishing || done) return;
      finishing = true;
      var fromPct = pct;
      var fillStart = performance.now();

      function tickFinal(now) {
        if (done) return;
        var t = Math.min(1, (now - fillStart) / 420);
        setProgress(fromPct + (100 - fromPct) * easeOutCubic(t));
        if (t < 1) {
          window.requestAnimationFrame(tickFinal);
          return;
        }
        if (done) return;
        done = true;

        var rect = gapEl.getBoundingClientRect();
        var scaleX = (window.innerWidth / Math.max(rect.width, 1)) * 1.04;
        var scaleY = (window.innerHeight / Math.max(rect.height, 1)) * 1.04;
        var hideMs = readCssMs(loader, '--loader-hide', 180);
        var fillMs = readCssMs(loader, '--loader-fill', 520);
        var liftMs = readCssMs(loader, '--loader-lift', 620);

        root.classList.add('is-filling');
        window.setTimeout(function () {
          gapEl.style.transform = 'scale(' + scaleX + ', ' + scaleY + ')';
          window.setTimeout(function () {
            root.classList.add('is-loaded');
            window.setTimeout(finishCleanup, liftMs);
          }, fillMs);
        }, hideMs);
      }

      window.requestAnimationFrame(tickFinal);
    }

    function tickIntroCount(now) {
      if (done || finishing) return;
      var t = Math.min(1, (now - startTs) / 1100);
      setProgress(Math.max(pct, 92 * easeOutCubic(t)));
      if (t >= 1 && pageLoaded) {
        runFinalFill();
      } else {
        window.requestAnimationFrame(tickIntroCount);
      }
    }

    function markLoaded() {
      pageLoaded = true;
    }

    function startWordCounter() {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          root.classList.add('is-ready');
        });
      });
      window.setTimeout(function () {
        startTs = performance.now();
        window.requestAnimationFrame(tickIntroCount);
      }, 420);
    }

    setProgress(0);

    if (shots.length) {
      shots.forEach(function (shot, idx) {
        shot.style.zIndex = String(idx + 1);
        window.setTimeout(function () {
          shot.classList.add('is-in');
        }, 150 * idx);
      });

      var stackDuration = 150 * (shots.length - 1) + 170;
      window.setTimeout(function () {
        shots.slice().reverse().forEach(function (shot, idx) {
          window.setTimeout(function () {
            shot.classList.add('is-out');
          }, 52 * idx);
        });
        var exitStagger = 52 * (shots.length - 1);
        window.setTimeout(startWordCounter, exitStagger + 720 * 0.7);
      }, stackDuration);
    } else {
      startWordCounter();
    }

    if (document.readyState === 'complete') {
      markLoaded();
    } else {
      window.addEventListener('load', markLoaded, { once: true });
    }

    // Safety guard so loader always completes cleanly
    window.setTimeout(function () {
      markLoaded();
      runFinalFill();
    }, 6500);
  }

  function initIntuivusMotion() {
    setupPageLoader();

    if (!window.Motion) return;

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    var animate = window.Motion.animate;
    var inView = window.Motion.inView;
    var stagger = window.Motion.stagger;
    var scroll = window.Motion.scroll;
    var hover = window.Motion.hover;
    var press = window.Motion.press;

    var EASE_OUT = [0.22, 1, 0.36, 1];
    var SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 24 };

    function toArray(target) {
      if (!target) return [];
      if (typeof target === 'string') return Array.prototype.slice.call(document.querySelectorAll(target));
      if (target instanceof Element) return [target];
      return Array.prototype.slice.call(target);
    }

    function setInitial(elements, styles) {
      elements.forEach(function (el) {
        if (!el || el.dataset.motionDone === '1') return;
        Object.keys(styles).forEach(function (key) {
          el.style[key] = styles[key];
        });
      });
    }

    // 1. Top Scroll Progress Bar (Motion.scroll)
    function setupScrollProgress() {
      if (document.querySelector('.intuvius-scroll-progress')) return;
      var bar = document.createElement('div');
      bar.className = 'intuvius-scroll-progress';
      bar.setAttribute('aria-hidden', 'true');
      bar.style.cssText =
        'position:fixed;top:0;left:0;right:0;height:3px;z-index:99999;pointer-events:none;' +
        'transform-origin:0% 50%;transform:scaleX(0);' +
        'background:linear-gradient(90deg,#6332D1 0%,#C084FC 55%,#FD904A 100%);' +
        'box-shadow:0 0 10px rgba(192,132,252,0.55);';
      document.body.appendChild(bar);
      scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
    }

    // 2. Hero Entrance & Slide Transition Animation
    function animateHeroSlide(slideEl, delayBase) {
      if (!slideEl) return;
      var items = toArray(
        slideEl.querySelectorAll('.slide-kicker-row, .slide-trust-box, .slide-title, .slide-desc, .slide-btn-box, .hero-meta-pills, .hero-media-frame')
      );
      if (!items.length) return;
      items.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
      });
      animate(
        items,
        { opacity: [0, 1], y: [16, 0] },
        { duration: 0.56, delay: stagger(0.055, { startDelay: delayBase || 0 }), ease: EASE_OUT }
      );
    }

    function setupHeroMotion() {
      var bannerSlider = document.querySelector('.banner-slider-one');
      if (!bannerSlider) return;

      var preloader = document.querySelector('.preloader');
      var oLoader = document.querySelector('[data-loader]');
      var hasOloader = !!(oLoader && document.documentElement.classList.contains('has-loader'));
      var initialSlide = bannerSlider.querySelector('.swiper-slide-active') || bannerSlider.querySelector('.swiper-slide');

      var portalStageWrap = document.getElementById('hero-portal-stage-wrap');
      if (portalStageWrap) {
        // Initial hero slide visibility and slide switching are orchestrated smoothly by setupPortalCurtainReveal()
      } else if (hasOloader) {
        var oHeroTriggered = false;
        var triggerOHero = function () {
          if (oHeroTriggered) return;
          oHeroTriggered = true;
          var activeSlide = bannerSlider.querySelector('.swiper-slide-active') || initialSlide;
          animateHeroSlide(activeSlide, 0.08);
        };
        var rootObs = new MutationObserver(function () {
          if (document.documentElement.classList.contains('is-loaded') || !document.documentElement.classList.contains('has-loader')) {
            rootObs.disconnect();
            setTimeout(triggerOHero, 180);
          }
        });
        rootObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        document.addEventListener('loader:complete', function () {
          rootObs.disconnect();
          triggerOHero();
        }, { once: true });
        setTimeout(function () {
          rootObs.disconnect();
          triggerOHero();
        }, 6800);
      } else if (preloader) {
        // Wait smoothly until preloader starts fading out (capped at 2.2s)
        var heroTriggered = false;
        var triggerHero = function () {
          if (heroTriggered) return;
          heroTriggered = true;
          var activeSlide = bannerSlider.querySelector('.swiper-slide-active') || initialSlide;
          animateHeroSlide(activeSlide, 0.08);
        };
        var obs = new MutationObserver(function () {
          if (!document.querySelector('.preloader') || preloader.classList.contains('is-loaded')) {
            obs.disconnect();
            setTimeout(triggerHero, 220);
          }
        });
        obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
        setTimeout(function () {
          obs.disconnect();
          triggerHero();
        }, 2150);
      } else {
        animateHeroSlide(initialSlide, 0.05);
      }

      // Hook active slide transitions & live counter
      var counterEl = document.getElementById('hero-slide-counter');
      var syncHeroCounter = function (slideEl) {
        if (!counterEl || !slideEl) return;
        var wrapperEl = slideEl.parentNode;
        var totalSlides = 3;
        var attrIdx = slideEl.getAttribute('data-swiper-slide-index');
        var idx = attrIdx !== null
          ? parseInt(attrIdx, 10)
          : (wrapperEl ? Array.prototype.indexOf.call(wrapperEl.children, slideEl) : 0);
        if (isNaN(idx) || idx < 0) idx = 0;
        counterEl.textContent = '0' + ((idx % totalSlides) + 1) + ' / 0' + totalSlides;
      };
      syncHeroCounter(initialSlide);

      var wrapper = bannerSlider.querySelector('.swiper-wrapper');
      if (wrapper) {
        var lastActive = bannerSlider.querySelector('.swiper-slide-active');
        var slideObs = new MutationObserver(function () {
          var currentActive = bannerSlider.querySelector('.swiper-slide-active');
          if (currentActive && currentActive !== lastActive) {
            lastActive = currentActive;
            syncHeroCounter(currentActive);
            animateHeroSlide(currentActive, 0.04);
          }
        });
        slideObs.observe(wrapper, { subtree: true, attributes: true, attributeFilter: ['class'] });
      }
    }

    // 2B. Unified Sticky Scroll Stage: Smooth Violet Portal Curtain -> Continuous Scroll-Scrubbed 3-Slide Hero -> Next Section
    function setupPortalCurtainReveal() {
      var stageWrap = document.getElementById('hero-portal-stage-wrap');
      var portal = document.getElementById('scs-portal');
      var slider = document.getElementById('banner-showcase');
      if (!stageWrap || !portal || !slider) return;
      if (stageWrap.dataset.portalInit === '1') return;
      stageWrap.dataset.portalInit = '1';

      var lineTop = document.getElementById('scs-line-top');
      var lineBot = document.getElementById('scs-line-bot');
      var orb = document.getElementById('scs-portal-orb');
      var bottom = document.getElementById('scs-portal-bottom');
      var backdrop = document.getElementById('scs-portal-backdrop');
      var grid = (backdrop && backdrop.querySelector('.scs-portal-grid')) || portal.querySelector('.scs-portal-grid');
      var orbInner = orb ? orb.querySelector('.scs-orb-inner') : null;
      var orbReticle = orb ? orb.querySelector('.scs-orb-reticle') : null;
      var orbAura = orb ? orb.querySelector('.scs-orb-aura') : null;
      var slides = toArray(slider.querySelectorAll('.hero-deck-wrapper > .banner-slide-modern'));
      if (!lineTop || !lineBot || !orb || !slides.length) return;

      var topText = lineTop.querySelector('.scs-line-text');
      var topGlow = lineTop.querySelector('.scs-line-glow');
      var botText = lineBot.querySelector('.scs-line-text');
      var botGlow = lineBot.querySelector('.scs-line-glow');
      var rail = document.getElementById('hero-scroll-rail');
      var railCounter = document.getElementById('hero-rail-counter');
      var railBars = rail ? Array.prototype.slice.call(rail.querySelectorAll('.rail-bar')) : [];
      var deckWrapper = slider.querySelector('.hero-deck-wrapper');
      var slideMeta = slides.map(function (el) {
        var content = el.querySelector('.slide-content-left');
        return {
          el: el,
          bg: el.querySelector('.slide-bg-ambient'),
          content: content
        };
      });

      var cachedVw = 1280;
      var cachedVh = 720;
      var cachedTravel = 1;
      var cachedStageTop = 0;
      var cachedOrbW = 365;
      var cachedOrbH = 420;
      var cachedFullScale = 4.4;

      function updateMetrics() {
        cachedVw = Math.max(320, window.innerWidth || 1280);
        cachedVh = Math.max(320, window.innerHeight || 720);
        cachedTravel = Math.max(1, stageWrap.offsetHeight - cachedVh);
        var r = stageWrap.getBoundingClientRect();
        cachedStageTop = r.top + (window.pageYOffset || window.scrollY || 0);
        cachedOrbW = Math.max(180, orb.offsetWidth || 365);
        cachedOrbH = Math.max(207, orb.offsetHeight || 420);
        var halfW = cachedVw * 0.5;
        var halfH = cachedVh * 0.52;
        var needHoriz = halfW / (0.47 * cachedOrbW);
        var needSlope = ((halfW / (0.47 * cachedOrbW)) * 0.23739 + (halfH / cachedOrbH)) / 0.47826;
        cachedFullScale = Math.max(4.4, needHoriz, needSlope) * 1.08;
      }

      function clamp01(v) {
        return v < 0 ? 0 : (v > 1 ? 1 : v);
      }

      function smoothStep(v) {
        var t = clamp01(v);
        return t * t * (3 - 2 * t);
      }

      // Unified Expanding Hexagon Aperture -> Seamless Upward Layered Slide Showcase
      // Timeline across stageWrap (480vh height -> 380vh sticky travel):
      // 0.00 -> 0.25 : Hero Banner peeks gently inside Hexagon -> slowly expands into 100% full screen
      // 0.25 -> 0.35 : Slide 1 (Intuivus) resting full-screen
      // 0.35 -> 0.57 : Seamless crossfade + upward kinetic glide Slide 1 -> Slide 2
      // 0.57 -> 0.67 : Slide 2 (Connected Systems) resting full-screen
      // 0.67 -> 0.89 : Seamless crossfade + upward kinetic glide Slide 2 -> Slide 3
      // 0.89 -> 1.00 : Slide 3 (TrialOps360) resting full-screen, then unpins into Clients strip
      function applyTrackPositions(p) {
        if (deckWrapper) {
          deckWrapper.style.transform = '';
        }

        var t1 = clamp01((p - 0.35) / 0.22);
        var t2 = clamp01((p - 0.67) / 0.22);

        var bgEase1 = smoothStep(t1);
        var bgEase2 = smoothStep(t2);

        // Continuous, bidirectional crossfade with zero hard popping in either scroll direction:
        var s1Opacity = 1 - smoothStep((t1 - 0.65) / 0.35);
        var s2Opacity = smoothStep(t1) * (1 - smoothStep((t2 - 0.65) / 0.35));
        var s3Opacity = smoothStep(t2);

        var slideOpacities = [s1Opacity, s2Opacity, s3Opacity];
        var slideZIndexes = [1, 2, 3];

        var scales = [
          1.0 + 0.065 * bgEase1,
          1.06 - 0.06 * bgEase1 + 0.065 * bgEase2,
          1.06 - 0.06 * bgEase2
        ];

        var contentOpacities = [
          1 - smoothStep(t1 / 0.38),
          smoothStep((t1 - 0.46) / 0.46) * (1 - smoothStep(t2 / 0.38)),
          smoothStep((t2 - 0.46) / 0.46)
        ];

        var contentOffsets = [
          -44 * smoothStep(t1 / 0.42),
          (1 - smoothStep((t1 - 0.44) / 0.48)) * 48 - smoothStep(t2 / 0.42) * 44,
          (1 - smoothStep((t2 - 0.44) / 0.48)) * 48
        ];

        return {
          t1: t1,
          t2: t2,
          slideOpacities: slideOpacities,
          slideZIndexes: slideZIndexes,
          scales: scales,
          contentOpacities: contentOpacities,
          contentOffsets: contentOffsets
        };
      }

      function applyPortalCurtain(raw) {
        var p = clamp01(raw);

        // --- Part 1: Expanding Hexagon Hero Aperture (0.00 -> 0.26) ---
        var portalT = clamp01(p / 0.26);
        var portalEased = 0.28 * portalT + 0.72 * smoothStep(portalT);

        // Headline halves part upward & downward cleanly around the growing hexagon window
        var splitP = clamp01(p / 0.15);
        var splitEased = 1 - Math.pow(1 - splitP, 2.0);
        var lineOpacity = p <= 0.025 ? 1 : Math.max(0, 1 - (p - 0.025) / 0.085);
        var glowPeak = p <= 0.035
          ? (p / 0.035) * 0.45
          : (p <= 0.08 ? 0.45 + ((p - 0.035) / 0.045) * 0.55 : Math.max(0, 1 - (p - 0.08) / 0.05));

        var scaleLine = 1 + 0.48 * splitEased;
        var shiftVh = 38 * splitEased;

        lineTop.style.transform = 'translate3d(0, ' + (-shiftVh).toFixed(3) + 'vh, 0) scale(' + scaleLine.toFixed(4) + ')';
        lineTop.style.opacity = String(lineOpacity);
        lineBot.style.transform = 'translate3d(0, ' + shiftVh.toFixed(3) + 'vh, 0) scale(' + scaleLine.toFixed(4) + ')';
        lineBot.style.opacity = String(lineOpacity);

        if (topGlow) topGlow.style.opacity = String(glowPeak);
        if (botGlow) botGlow.style.opacity = String(glowPeak);
        if (topText) topText.style.opacity = String(1 - glowPeak * 0.46);
        if (botText) botText.style.opacity = String(1 - glowPeak * 0.46);

        // Exact dynamic scale needed for the central SVG hexagon to clear all 4 viewport corners
        var orbScale = 1 + (cachedFullScale - 1) * portalEased;
        orb.style.transform = 'scale(' + orbScale.toFixed(4) + ')';

        // Dissolve center hexagon mask & foreground haze right as Hero peeks clearly through
        var innerMaskOut = smoothStep(p / 0.065);
        if (orbInner) orbInner.style.opacity = String(1 - innerMaskOut);
        if (orbReticle) orbReticle.style.opacity = String(1 - smoothStep(p / 0.04));
        if (orbAura) orbAura.style.opacity = String(Math.max(0, 0.78 * (1 - smoothStep(p / 0.08))));

        if (grid) {
          grid.style.transform = 'scale(' + (1 + 0.55 * portalEased).toFixed(4) + ')';
          grid.style.opacity = String(Math.max(0, 1 - p / 0.22));
        }

        if (bottom) {
          var botFade = clamp01(p / 0.075);
          var botOp = 1 - botFade;
          bottom.style.opacity = String(botOp);
          bottom.style.transform = 'translate3d(0, ' + (26 * botFade).toFixed(2) + 'px, 0)';
          bottom.style.visibility = botOp > 0.002 ? 'visible' : 'hidden';
        }

        // Continuous hexagon polygon clip-path: avoid switching to/from 'none' to eliminate layer re-allocation hitches
        var rxPct = ((0.47 * cachedOrbW * orbScale) / cachedVw) * 100;
        var ryTipPct = ((0.47826 * cachedOrbH * orbScale) / cachedVh) * 100;
        var ryShPct = ((0.24087 * cachedOrbH * orbScale) / cachedVh) * 100;
        var hexPoly = 'polygon(' +
          '50% ' + (52 - ryTipPct).toFixed(2) + '%, ' +
          (50 + rxPct).toFixed(2) + '% ' + (52 - ryShPct).toFixed(2) + '%, ' +
          (50 + rxPct).toFixed(2) + '% ' + (52 + ryShPct).toFixed(2) + '%, ' +
          '50% ' + (52 + ryTipPct).toFixed(2) + '%, ' +
          (50 - rxPct).toFixed(2) + '% ' + (52 + ryShPct).toFixed(2) + '%, ' +
          (50 - rxPct).toFixed(2) + '% ' + (52 - ryShPct).toFixed(2) + '%)';
        slider.style.clipPath = hexPoly;
        slider.style.webkitClipPath = hexPoly;

        // Hero peeks progressively inside the expanding Hexagon, then fills screen cleanly
        var heroPeekOpacity = smoothStep(p / 0.09);
        slider.style.opacity = String(heroPeekOpacity);
        slider.style.visibility = heroPeekOpacity > 0.002 ? 'visible' : 'hidden';
        slider.style.pointerEvents = p >= 0.14 ? 'auto' : 'none';

        var portalFadeOut = smoothStep((p - 0.19) / 0.07);
        var portalOp = 1 - portalFadeOut;
        portal.style.opacity = String(portalOp);
        portal.style.visibility = portalOp > 0.002 ? 'visible' : 'hidden';
        portal.style.pointerEvents = p >= 0.14 ? 'none' : 'auto';
        if (backdrop) {
          backdrop.style.opacity = String(portalOp);
          backdrop.style.visibility = portalOp > 0.002 ? 'visible' : 'hidden';
        }

        // Subtle interior scale inside the Hexagon aperture (0.82 -> 1.00 across 0.00 -> 0.26)
        var innerHeroScale = p < 0.26 ? (0.82 + 0.18 * portalEased) : 1;

        // --- Part 2: Seamless Layered Slide Dissolve + Upward Kinetic Motion ---
        var dominantIdx = p < 0.46 ? 0 : (p < 0.78 ? 1 : 2);
        if (dominantIdx >= slideMeta.length) dominantIdx = slideMeta.length - 1;

        if (rail) {
          rail.classList.toggle('is-visible', p >= 0.20);
        }
        if (railCounter) {
          railCounter.textContent = '0' + (dominantIdx + 1) + ' / 0' + slideMeta.length;
        }
        railBars.forEach(function (bar, bIdx) {
          bar.classList.toggle('is-active', bIdx === dominantIdx);
        });

        var trackState = applyTrackPositions(p);
        slideMeta.forEach(function (item, idx) {
          var isDominant = idx === dominantIdx;
          var sOpacity = trackState.slideOpacities[idx];
          item.el.classList.toggle('is-scroll-active', isDominant);
          item.el.style.zIndex = String(trackState.slideZIndexes[idx]);
          item.el.style.opacity = sOpacity.toFixed(4);
          item.el.style.visibility = sOpacity > 0.004 ? 'visible' : 'hidden';
          item.el.style.pointerEvents = isDominant && p >= 0.14 ? 'auto' : 'none';
          if (idx === 0) {
            item.el.style.transform = innerHeroScale < 0.9999 ? 'scale(' + innerHeroScale.toFixed(4) + ')' : '';
          }
          if (item.bg) {
            item.bg.style.transform = 'scale(' + trackState.scales[idx].toFixed(4) + ')';
          }
          if (item.content) {
            item.content.style.opacity = trackState.contentOpacities[idx].toFixed(4);
            item.content.style.transform = 'translate3d(0, ' + trackState.contentOffsets[idx].toFixed(2) + 'px, 0)';
          }
        });
      }

      // 100% Direct frame-synced requestAnimationFrame scroll renderer:
      // Eliminates artificial exponential lerp lag, trailing float, and reverse-scroll freezes.
      var scheduledP = null;
      var lastRenderedP = null;
      var rafId = null;

      function measureCurrentProgress() {
        var currentY = window.pageYOffset || window.scrollY || 0;
        if (currentY <= 0) return 0;
        return clamp01((currentY - cachedStageTop) / cachedTravel);
      }

      function renderFrame() {
        rafId = null;
        if (scheduledP === lastRenderedP) return;
        lastRenderedP = scheduledP;
        applyPortalCurtain(scheduledP);
      }

      function onViewportScroll() {
        var currentY = window.pageYOffset || window.scrollY || 0;
        var p = (currentY <= 0) ? 0 : clamp01((currentY - cachedStageTop) / cachedTravel);
        if (p === scheduledP && p === lastRenderedP) return;
        scheduledP = p;
        if (!rafId) {
          rafId = requestAnimationFrame(renderFrame);
        }
      }

      updateMetrics();
      scheduledP = measureCurrentProgress();
      lastRenderedP = scheduledP;
      applyPortalCurtain(scheduledP);

      window.addEventListener('scroll', onViewportScroll, { passive: true });
      window.addEventListener('resize', function () {
        updateMetrics();
        onViewportScroll();
      }, { passive: true });

      // Clickable right-side progress bars to glide cleanly to each slide
      var SLIDE_TARGETS = [0.30, 0.62, 0.94];
      railBars.forEach(function (bar, bIdx) {
        bar.setAttribute('role', 'button');
        bar.setAttribute('tabindex', '0');
        bar.setAttribute('aria-label', 'Go to slide ' + (bIdx + 1));
        bar.addEventListener('click', function () {
          var pTarget = SLIDE_TARGETS[Math.min(bIdx, SLIDE_TARGETS.length - 1)];
          window.scrollTo({ top: Math.round(cachedStageTop + pTarget * cachedTravel), behavior: 'smooth' });
        });
      });
    }

    // 2C. The Lonely Pixel Style Interactive Stage Micro-Motion
        // 3b. The Lonely Pixel Scrollytelling Hero Motion (Card Carousel & Synchronized Copy)
    function setupTlpHeroMotion() {
      var wrap = document.getElementById('hero-showcase');
      if (!wrap) return;

      var textSlides = toArray(wrap.querySelectorAll('.tlp-text-slide'));
      var visualStage = document.getElementById('tlp-visual-stage');
      var card1 = document.getElementById('tlp-card-1');
      var card2 = document.getElementById('tlp-card-2');
      var card3 = document.getElementById('tlp-card-3');
      var slideDots = toArray(wrap.querySelectorAll('.tlp-slide-dot'));

      if (!card1 || !card2 || !card3) return;

      var activeIndex = -1;
      var ticking = false;

      function setSlot(el, slotClass) {
        el.classList.remove('tlp-slot-top', 'tlp-slot-center', 'tlp-slot-bottom');
        // Force reflow to reliably restart 3D cylindrical smile-bend keyframe animation
        void el.offsetWidth;
        el.classList.add(slotClass);
      }

      function updateSlide(targetIndex) {
        if (targetIndex === activeIndex) return;
        activeIndex = targetIndex;

        // 1. Synchronize Left Column Copy
        textSlides.forEach(function (slide, idx) {
          if (idx === targetIndex) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });

        // 2. Synchronize Right Column Connected Cards along the Trail
        if (targetIndex === 0) {
          // Slide 1: Card 2 (TrialOps360 Core) is front & center
          setSlot(card1, 'tlp-slot-top');
          setSlot(card2, 'tlp-slot-center');
          setSlot(card3, 'tlp-slot-bottom');
        } else if (targetIndex === 1) {
          // Slide 2: Card 1 (Study Budgeting Engine) glides to center
          setSlot(card2, 'tlp-slot-top');
          setSlot(card1, 'tlp-slot-center');
          setSlot(card3, 'tlp-slot-bottom');
        } else {
          // Slide 3: Card 3 (Site Intelligence & Operations) glides to center
          setSlot(card1, 'tlp-slot-top');
          setSlot(card3, 'tlp-slot-center');
          setSlot(card2, 'tlp-slot-bottom');
        }

        if (visualStage) {
          visualStage.setAttribute('data-active-slide', targetIndex);
        }

        // 3. Update Indicator Dots
        slideDots.forEach(function (dot, idx) {
          if (idx === targetIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }

      function onScroll() {
        var rect = wrap.getBoundingClientRect();
        var scrollRange = rect.height - window.innerHeight;
        if (scrollRange <= 0) return;

        var progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
        var targetIndex = 0;
        if (progress < 0.33) {
          targetIndex = 0;
        } else if (progress < 0.67) {
          targetIndex = 1;
        } else {
          targetIndex = 2;
        }

        updateSlide(targetIndex);

        // Manage sticky header visibility on home page
        if (rect.bottom <= 80) {
          document.body.classList.add('scrolled-past-hero');
        } else {
          document.body.classList.remove('scrolled-past-hero');
        }

        ticking = false;
      }

      window.setTlpHeroSlide = updateSlide;

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      // Initialize Slide 0 immediately
      updateSlide(0);

      // Interactive Click navigation on indicator dots
      slideDots.forEach(function (dot) {
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          var targetIdx = parseInt(dot.getAttribute('data-goto-slide'), 10);
          updateSlide(targetIdx);
          var rect = wrap.getBoundingClientRect();
          var scrollRange = rect.height - window.innerHeight;
          var scrollY = window.pageYOffset || document.documentElement.scrollTop;
          var targetScroll = scrollY + rect.top + (targetIdx * (scrollRange / 2.2));
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        });
      });

      // Interactive Click on floating cards to focus them
      card1.addEventListener('click', function () {
        updateSlide(1);
        var rect = wrap.getBoundingClientRect();
        var scrollRange = rect.height - window.innerHeight;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: scrollY + rect.top + (1 * (scrollRange / 2.2)), behavior: 'smooth' });
      });
      card2.addEventListener('click', function () {
        updateSlide(0);
        var rect = wrap.getBoundingClientRect();
        var scrollRange = rect.height - window.innerHeight;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: scrollY + rect.top + (0 * (scrollRange / 2.2)), behavior: 'smooth' });
      });
      card3.addEventListener('click', function () {
        updateSlide(2);
        var rect = wrap.getBoundingClientRect();
        var scrollRange = rect.height - window.innerHeight;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: scrollY + rect.top + (2 * (scrollRange / 2.2)), behavior: 'smooth' });
      });

      // Subtle mouse cursor parallax when hovering the stage
      var isHovered = false;
      var mouseX = 0, mouseY = 0, curX = 0, curY = 0;
      var pRafId = null;

      function renderMouseParallax() {
        if (!isHovered && Math.abs(curX) < 0.001 && Math.abs(curY) < 0.001) {
          card1.style.translate = '';
          card2.style.translate = '';
          card3.style.translate = '';
          pRafId = null;
          return;
        }

        curX += (mouseX - curX) * 0.08;
        curY += (mouseY - curY) * 0.08;

        card1.style.translate = (curX * -10) + 'px ' + (curY * -8) + 'px';
        card2.style.translate = (curX * 12) + 'px ' + (curY * 10) + 'px';
        card3.style.translate = (curX * -6) + 'px ' + (curY * 12) + 'px';

        pRafId = requestAnimationFrame(renderMouseParallax);
      }

      var cardCanvas = wrap.querySelector('.tlp-canvas-card');
      if (cardCanvas) {
        cardCanvas.addEventListener('mousemove', function (e) {
          var cRect = cardCanvas.getBoundingClientRect();
          isHovered = true;
          mouseX = (e.clientX - cRect.left) / cRect.width - 0.5;
          mouseY = (e.clientY - cRect.top) / cRect.height - 0.5;
          if (!pRafId) pRafId = requestAnimationFrame(renderMouseParallax);
        }, { passive: true });

        cardCanvas.addEventListener('mouseleave', function () {
          isHovered = false;
          mouseX = 0;
          mouseY = 0;
        }, { passive: true });
      }
    }

    function setupPageTitleMotion() {
      var pageTitle = document.querySelector('.page-title');
      if (!pageTitle) return;
      var els = toArray(pageTitle.querySelectorAll('.title, .page-breadcrumb, .lead'));
      if (!els.length) return;
      setInitial(els, { opacity: '0', transform: 'translateY(18px)' });
      animate(
        els,
        { opacity: [0, 1], y: [18, 0] },
        { duration: 0.65, delay: stagger(0.08, { startDelay: 0.06 }), ease: EASE_OUT }
      );
      els.forEach(function (el) { el.dataset.motionDone = '1'; });
    }

    // 4. Helper for In-View Staggered Reveals
    function observeStagger(containerSelector, itemSelector, options) {
      var opts = options || {};
      var containers = toArray(containerSelector);
      containers.forEach(function (container) {
        if (!container || container.dataset.motionObserved === '1') return;
        var items = itemSelector ? toArray(container.querySelectorAll(itemSelector)) : [container];
        items = items.filter(function (item) {
          return item && item.dataset.motionDone !== '1';
        });
        if (!items.length) return;

        container.dataset.motionObserved = '1';
        var startY = typeof opts.y === 'number' ? opts.y : 26;
        var startX = typeof opts.x === 'number' ? opts.x : 0;
        var startScale = typeof opts.scale === 'number' ? opts.scale : 1;

        items.forEach(function (el) {
          el.style.opacity = '0';
          el.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)' + (startScale !== 1 ? ' scale(' + startScale + ')' : '');
        });

        var stop = inView(
          container,
          function () {
            items.forEach(function (el) { el.dataset.motionDone = '1'; });
            var keyframes = { opacity: [0, 1] };
            if (startY !== 0) keyframes.y = [startY, 0];
            if (startX !== 0) keyframes.x = [startX, 0];
            if (startScale !== 1) keyframes.scale = [startScale, 1];

            var controls = animate(
              items,
              keyframes,
              {
                duration: opts.duration || 0.62,
                delay: stagger(opts.staggerDelay || 0.085),
                ease: EASE_OUT
              }
            );
            Promise.resolve(controls && controls.finished).then(function () {
              // Clear inline transform so CSS hover transitions continue cleanly
              items.forEach(function (el) {
                el.style.transform = '';
              });
            });
            stop();
          },
          { amount: opts.amount || 0.12 }
        );
      });
    }

    // 5. Scroll Reveal Orchestration across Sections & Pages
    function setupScrollReveals() {
      // Clients / Trust strip
      observeStagger('.clients-section .outer-box', '.client-title, .clients-swiper', { y: 20, staggerDelay: 0.1 });

      // About right visual + badge (left column on index already handled by initAboutTextReveal via .about-reveal-wrap)
      observeStagger('.about-image-wrapper', '.image-inner, .experience-badge', { y: 26, scale: 0.97, staggerDelay: 0.14, duration: 0.72 });
      observeStagger('.about-section .col-xl-6:not(.about-reveal-wrap) .text, .about-section .col-lg-10 .text', 'p', { y: 18, staggerDelay: 0.08 });

      // Section headers (outside .about-reveal-wrap)
      toArray('.sec-title').forEach(function (secTitle) {
        if (secTitle.closest('.about-reveal-wrap')) return;
        observeStagger([secTitle], '.sub-title, .title, .text, .sec-title-desc', { y: 20, staggerDelay: 0.08 });
      });
      observeStagger('.metrics-header', '.metrics-pill-badge, .metrics-title, .metrics-sub-desc', { y: 20, staggerDelay: 0.08 });
      observeStagger('.modular-section-header-wrap', '.metrics-pill-badge, .title, p, .modular-carousel-controls', { y: 20, staggerDelay: 0.07 });

      // TrialOps360 Showcase Section (index.html)
      observeStagger('.trialops-canvas-section .flagship-caps-grid', '.flagship-cap-item', { y: 22, scale: 0.96, staggerDelay: 0.08 });
      observeStagger('.trialops-canvas-section .flagship-metrics-band', '.flagship-metric-pod', { y: 18, scale: 0.95, staggerDelay: 0.1 });
      observeStagger('.trialops-canvas-section .trialops-canvas-visual-box', '', { x: 24, y: 16, scale: 0.97, duration: 0.75 });

      // Card Grids on Home + Inner Pages
      observeStagger('#metrics .row', '.clean-stat-card', { y: 28, scale: 0.96, staggerDelay: 0.09 });
      observeStagger('.why-us-section .row, .about-section .row', '.pillar-card-minimal', { y: 28, scale: 0.97, staggerDelay: 0.09 });
      observeStagger('#who-it-is-for .row', '.audience-card-v2', { y: 26, scale: 0.97, staggerDelay: 0.09 });
      observeStagger('.modular-products-section .modular-products-swiper, .modular-products-section .row', '.modular-card-visual', { y: 24, staggerDelay: 0.08 });
      observeStagger('.modern-faq-section .accordion, .modern-faq-section .row', '.modern-faq-card', { y: 20, staggerDelay: 0.07 });

      // Contact Page Cards & Form
      observeStagger('.contact-details__info', 'li', { x: -20, y: 12, staggerDelay: 0.09 });
      observeStagger('.contact-details #contact_form', ':scope > .row, :scope > .mb-3, :scope > .mb-4', { y: 16, staggerDelay: 0.06 });

      // Closing CTA
      observeStagger('.cta-section-layout1 .outer-box', '.sec-title, .cta-action-wrap', { y: 24, staggerDelay: 0.12 });
    }

    // 6. Subtle Scroll-Linked Parallax (Motion.scroll)
    function setupParallax() {
      if (window.innerWidth < 992) return;
      var parallaxTargets = ['.about-image-wrapper .image-inner', '.trialops-canvas-visual-box .trialops-img-frame'];
      parallaxTargets.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        scroll(
          animate(el, { y: [-10, 10] }, { ease: 'linear' }),
          { target: el, offset: ['start end', 'end start'] }
        );
      });
    }

    // 7. Interactive Hover & Spring Press Micro-Animations
    function setupMicroInteractions() {
      // Spring press feel on primary CTA buttons
      var buttonSelectors = [
        '.btn-style-one',
        '.btn-style-two',
        '.btn-style-three',
        '.header-btn-main',
        '.trialops-primary-btn',
        '.trialops-ghost-btn',
        '.cta-glass-btn',
        '.modular-action-btn',
        '.back-to-top-btn'
      ];
      buttonSelectors.forEach(function (sel) {
        if (!document.querySelector(sel)) return;
        press(sel, function (el) {
          animate(el, { scale: 0.96 }, SPRING_SNAPPY);
          return function () {
            animate(el, { scale: 1 }, SPRING_SNAPPY).finished.then(function () {
              el.style.transform = '';
            });
          };
        });
      });

      // Bouncy spring nudge on card icons when hovering cards
      var iconParents = [
        { card: '.pillar-card-minimal', icon: '.pillar-card-icon' },
        { card: '#who-it-is-for .audience-card-v2', icon: '.audience-icon-box-v2' },
        { card: '.flagship-cap-item', icon: 'i' },
        { card: '.contact-details__info li', icon: '.icon' }
      ];
      iconParents.forEach(function (pair) {
        if (!document.querySelector(pair.card)) return;
        hover(pair.card, function (cardEl) {
          var iconEl = cardEl.querySelector(pair.icon);
          if (!iconEl) return;
          animate(iconEl, { scale: 1.09, rotate: -4 }, SPRING_SNAPPY);
          return function () {
            animate(iconEl, { scale: 1, rotate: 0 }, SPRING_SNAPPY).finished.then(function () {
              iconEl.style.transform = '';
            });
          };
        });
      });
    }

    // 8. Footer Reveal (runs once footer partial is injected)
    function setupFooterReveal() {
      var footerRoot = document.getElementById('site-footer');
      if (!footerRoot) return;
      var tryFooter = function () {
        var cols = toArray(footerRoot.querySelectorAll('.footer-widget, .links-widget, .contact-widget, .about-widget'));
        if (!cols.length) return false;
        observeStagger('#site-footer footer', '.footer-widget, .about-widget, .links-widget, .contact-widget', { y: 20, staggerDelay: 0.08 });
        return true;
      };
      if (!tryFooter()) {
        var fObs = new MutationObserver(function () {
          if (tryFooter()) fObs.disconnect();
        });
        fObs.observe(footerRoot, { childList: true, subtree: true });
        setTimeout(function () { fObs.disconnect(); }, 5000);
      }
    }

    setupScrollProgress();
    setupHeroMotion();
    setupPortalCurtainReveal();
    setupTlpHeroMotion();
    setupPageTitleMotion();
    setupScrollReveals();
    setupParallax();
    setupMicroInteractions();
    setupFooterReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntuivusMotion);
  } else {
    initIntuivusMotion();
  }
})();
