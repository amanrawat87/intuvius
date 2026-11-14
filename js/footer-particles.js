/**
 * Intuivus - Interactive Dot Matrix Particle Text
 * Renders "INTUIVUS" as a grid of crisp LED dots with real-time
 * magnetic vortex dispersion on mouse hover and touch interaction.
 */

(function (window) {
  'use strict';

  function initFooterParticles() {
    var canvas = document.getElementById('footer-particle-canvas');
    var container = document.getElementById('footer-particle-container');
    if (!canvas || !container) {
      return;
    }

    // Prevent duplicate re-initialization on multiple calls
    if (canvas._particleInitialized) {
      if (typeof canvas._rebuildParticles === 'function') {
        canvas._rebuildParticles();
      }
      return;
    }
    canvas._particleInitialized = true;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var mouse = {
      x: -9999,
      y: -9999,
      radius: 130,
      isHovered: false
    };

    function Particle(originX, originY, radius) {
      this.originX = originX;
      this.originY = originY;
      this.x = originX + (Math.random() - 0.5) * 8;
      this.y = originY + (Math.random() - 0.5) * 8;
      this.vx = 0;
      this.vy = 0;
      this.radius = radius;
      this.baseRadius = radius;
      this.spring = 0.08 + Math.random() * 0.04;
      this.friction = 0.82;
      this.activeGlow = 0;
    }

    Particle.prototype.update = function () {
      if (mouse.isHovered) {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          var force = (mouse.radius - dist) / mouse.radius;
          var angle = Math.atan2(dy, dx);

          // Radial repulsion
          var repelStrength = force * 16;
          var repelX = Math.cos(angle) * repelStrength;
          var repelY = Math.sin(angle) * repelStrength;

          // Vortex / Orbital swirl matching Image 3
          var swirlAngle = angle + Math.PI / 2;
          var swirlStrength = force * 9;
          var swirlX = Math.cos(swirlAngle) * swirlStrength;
          var swirlY = Math.sin(swirlAngle) * swirlStrength;

          this.vx += repelX + swirlX;
          this.vy += repelY + swirlY;
          this.activeGlow = Math.min(1, this.activeGlow + 0.28);
        }
      }

      // Spring physics back to grid origin
      this.vx += (this.originX - this.x) * this.spring;
      this.vy += (this.originY - this.y) * this.spring;
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;

      this.activeGlow = Math.max(0, this.activeGlow - 0.025);
    };

    Particle.prototype.draw = function (context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      if (this.activeGlow > 0.08) {
        // Dispersed / glowing blue-cyan look matching Image 3
        var g = Math.floor(180 + 75 * this.activeGlow);
        var b = Math.floor(225 + 30 * this.activeGlow);
        context.fillStyle = 'rgba(140, ' + g + ', ' + b + ', ' + (0.75 + this.activeGlow * 0.25) + ')';
        context.shadowColor = 'rgba(96, 165, 250, 0.85)';
        context.shadowBlur = 6 * this.activeGlow;
      } else {
        // Clean crisp white LED dot matching Image 2
        context.fillStyle = 'rgba(255, 255, 255, 0.94)';
        context.shadowBlur = 0;
      }
      context.fill();
    };

    function buildParticles() {
      width = container.clientWidth || 1200;
      height = container.clientHeight || 220;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles = [];

      var offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      var offCtx = offscreen.getContext('2d');

      // Font size responsive to container width
      var fontSize = Math.min(Math.floor(width / 6.2), Math.floor(height * 0.85));
      offCtx.fillStyle = '#ffffff';
      offCtx.font = '900 ' + fontSize + 'px "Inter", "Plus Jakarta Sans", "Poppins", "Arial Black", sans-serif';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      if ('letterSpacing' in offCtx) {
        offCtx.letterSpacing = '0.04em';
      }

      var text = 'INTUIVUS';
      offCtx.fillText(text, width / 2, height / 2 + 4);

      var imgData = offCtx.getImageData(0, 0, width, height);
      var data = imgData.data;

      // Grid dot spacing
      var dotSpacing = width > 1100 ? 6.5 : (width > 768 ? 5.5 : 4.5);
      var dotRadius = width > 1100 ? 2.1 : (width > 768 ? 1.7 : 1.3);

      for (var y = 0; y < height; y += dotSpacing) {
        for (var x = 0; x < width; x += dotSpacing) {
          var px = Math.floor(x);
          var py = Math.floor(y);
          var index = (py * width + px) * 4;
          var alpha = data[index + 3];

          if (alpha > 130) {
            particles.push(new Particle(x, y, dotRadius));
          }
        }
      }
    }

    canvas._rebuildParticles = buildParticles;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      requestAnimationFrame(animate);
    }

    function updateMousePos(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    }

    container.addEventListener('mousemove', updateMousePos);
    container.addEventListener('mouseenter', function () { mouse.isHovered = true; });
    container.addEventListener('mouseleave', function () {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    container.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
      }
    }, { passive: true });

    container.addEventListener('touchend', function () {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildParticles();
      }, 150);
    });

    buildParticles();
    animate();
  }

  window.initFooterParticles = initFooterParticles;

  // Auto-init when DOM ready or when partials load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initFooterParticles, 150);
    });
  } else {
    setTimeout(initFooterParticles, 150);
  }

})(typeof window !== 'undefined' ? window : this);
