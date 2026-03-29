/**
 * Valentina Portfolio 2026
 * Modern, interactive portfolio with GSAP, Three.js, and purposeful motion
 */

(function() {
  'use strict';

  // ==========================================
  // PROJECT DATA
  // ==========================================
  const PROJECTS = [
    {
      title: 'Clueplay.ai',
      category: 'OTT Platform',
      description: 'A cinematic streaming experience with immersive content discovery, personalized recommendations, and seamless cross-device continuity.',
      challenge: 'The existing platform felt cluttered and outdated. Users struggled to discover new content, and the viewing experience lacked the polish expected from modern streaming services.',
      solution: 'Designed a clean, content-first interface with intelligent categorization, smooth transitions, and a dark mode optimized for binge-watching sessions.',
      results: '40% increase in content discovery, 25% longer session times, 4.8★ App Store rating.',
      images: [
        'assets/projects/clueplay/clueplayai1.png',
        'assets/projects/clueplay/clueplayai2.png'
      ]
    },
    {
      title: 'Healthcare Operations Dashboard',
      category: 'Enterprise SaaS',
      description: 'Centralized platform for healthcare administrators to oversee appointments, manage patient records, and coordinate doctor assignments.',
      challenge: 'Healthcare staff were overwhelmed by fragmented systems. Patient data was scattered across multiple tools, leading to inefficiencies and potential errors.',
      solution: 'Created a unified dashboard with real-time updates, intuitive data visualization, and role-based access controls that streamline daily operations.',
      results: '60% reduction in administrative time, 35% fewer scheduling conflicts, 95% user satisfaction.',
      images: [
        'assets/projects/healthcare/healthcare.png'
      ]
    },
    {
      title: 'SpeakBetter',
      category: 'Mobile App',
      description: 'Real-time speech coaching app that tracks filler words and helps users develop confident, clear communication skills.',
      challenge: 'Public speaking anxiety affects millions. Existing solutions were either too complex or failed to provide actionable, real-time feedback.',
      solution: 'Built an intuitive mobile experience with instant feedback, progress tracking, and personalized exercises that gamify the improvement process.',
      results: '50K+ active users, 70% reported confidence improvement, featured on Product Hunt.',
      images: [
        'assets/projects/speakbetter/speakbetter1.png',
        'assets/projects/speakbetter/speakbetter2.png'
      ]
    },
    {
      title: 'Forex Platform',
      category: 'Fintech',
      description: 'Trading dashboard with real-time data visualization, advanced charting, and risk management tools for retail traders.',
      challenge: 'Retail traders needed institutional-grade tools without the complexity. Existing platforms were either too basic or overwhelmingly technical.',
      solution: 'Designed a clean interface that surfaces critical information while keeping advanced features accessible through progressive disclosure.',
      results: '3x faster trade execution, 45% reduction in support tickets, 4.6★ user rating.',
      images: generateImageRange(8, 'assets/projects/forex/forex', '.jpg')
    },
    {
      title: 'Praxis Richter',
      category: 'Healthcare',
      description: 'Modern dental clinic website designed to enhance patient experience and inspire confidence through clean design.',
      challenge: 'The clinic needed to modernize their digital presence to attract younger patients while maintaining trust with existing clientele.',
      solution: 'Created a calming, professional experience with online booking, treatment information, and a design language that feels both modern and trustworthy.',
      results: '50% increase in online bookings, 30% reduction in phone inquiries, 85% patient satisfaction with the digital experience.',
      images: [
        'assets/projects/praxis/praxis1.png',
        'assets/projects/praxis/praxis2.png'
      ]
    }
  ];

  function generateImageRange(count, prefix, ext) {
    return Array.from({ length: Math.min(count, 5) }, (_, i) => `${prefix}${i + 1}${ext}`);
  }

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  const header = document.querySelector('.header');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const modal = document.getElementById('project-modal');
  const modalBackdrop = modal?.querySelector('.modal-backdrop');
  const modalClose = modal?.querySelector('.modal-close');
  const modalPrev = modal?.querySelector('.modal-prev');
  const modalNext = modal?.querySelector('.modal-next');

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================
  let threeMaterial = null;

  function initTheme() {
    const saved = localStorage.getItem('valentina-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThreeJSColors(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('valentina-theme', next);
    updateThreeJSColors(next);
  }

  function updateThreeJSColors(theme) {
    if (!threeMaterial) return;

    if (theme === 'dark') {
      threeMaterial.uniforms.uColor1.value.set('#4da3ff');
      threeMaterial.uniforms.uColor2.value.set('#8ec5ff');
    } else {
      threeMaterial.uniforms.uColor1.value.set('#0066cc');
      threeMaterial.uniforms.uColor2.value.set('#4da3ff');
    }
  }

  themeToggle?.addEventListener('click', toggleTheme);

  // ==========================================
  // CUSTOM CURSOR & MAGNETIC EFFECT
  // ==========================================
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isActive = true;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isActive) {
        isActive = true;
        animate();
      }
    }, { passive: true });

    function animate() {
      if (!isActive) return;

      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      rafId = requestAnimationFrame(animate);
    }

    animate();

    // Magnetic effect for interactive elements (exclude header)
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(el => {
      if (el.closest('.header')) return;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      }, { passive: true });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });

    // Hover states (exclude header)
    const hoverElements = document.querySelectorAll('a, button, .work-card, [data-magnetic]');
    hoverElements.forEach(el => {
      if (el.closest('.header')) return;
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRing.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.opacity = '0.5';
      });
    });

    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isActive = false;
        cancelAnimationFrame(rafId);
      }
    });
  }

  // ==========================================
  // THREE.JS 3D ENVIRONMENT
  // ==========================================
  let threeScene = null;
  let threeCamera = null;
  let floatingShapes = [];
  let particles = null;

  function initThreeJS() {
    const canvas = document.getElementById('webgl-bg');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    threeScene = scene;

    // Camera with perspective
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;
    camera.position.y = 2;
    threeCamera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const accentColor = isDark ? 0x4da3ff : 0x0066cc;
    const secondaryColor = isDark ? 0x8ec5ff : 0x4da3ff;
    const subtleColor = isDark ? 0x1a3a5c : 0xe8f4fc;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(accentColor, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(secondaryColor, 0.6, 50);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // ========================================
    // FLOATING GEOMETRIC SHAPES
    // ========================================
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const shapeConfigs = [
      // Large background shapes (far Z)
      { type: 'icosahedron', count: 3, zRange: [-20, -10], size: [2, 4], color: accentColor, opacity: 0.15 },
      // Medium floating shapes (mid Z)
      { type: 'octahedron', count: 4, zRange: [-8, -2], size: [0.8, 1.5], color: secondaryColor, opacity: 0.25 },
      { type: 'tetrahedron', count: 3, zRange: [-6, -1], size: [0.6, 1.2], color: accentColor, opacity: 0.2 },
      // Small foreground shapes (near Z)
      { type: 'sphere', count: 5, zRange: [-3, 2], size: [0.2, 0.5], color: accentColor, opacity: 0.3 },
    ];

    shapeConfigs.forEach(config => {
      for (let i = 0; i < config.count; i++) {
        let geometry;
        const size = THREE.MathUtils.randFloat(config.size[0], config.size[1]);

        switch (config.type) {
          case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(size, 0);
            break;
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(size, 0);
            break;
          case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(size, 0);
            break;
          case 'sphere':
            geometry = new THREE.SphereGeometry(size, 16, 16);
            break;
        }

        const material = new THREE.MeshPhysicalMaterial({
          color: config.color,
          transparent: true,
          opacity: config.opacity,
          metalness: 0.1,
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Random position in 3D space
        mesh.position.x = THREE.MathUtils.randFloatSpread(25);
        mesh.position.y = THREE.MathUtils.randFloatSpread(15);
        mesh.position.z = THREE.MathUtils.randFloat(config.zRange[0], config.zRange[1]);

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Store animation data
        mesh.userData = {
          rotationSpeed: {
            x: THREE.MathUtils.randFloat(-0.002, 0.002),
            y: THREE.MathUtils.randFloat(-0.003, 0.003),
            z: THREE.MathUtils.randFloat(-0.001, 0.001)
          },
          floatSpeed: THREE.MathUtils.randFloat(0.3, 0.8),
          floatOffset: Math.random() * Math.PI * 2,
          originalY: mesh.position.y,
          originalZ: mesh.position.z,
          parallaxFactor: THREE.MathUtils.mapLinear(mesh.position.z, -20, 2, 0.1, 0.8)
        };

        shapesGroup.add(mesh);
        floatingShapes.push(mesh);
      }
    });

    // ========================================
    // PARTICLE FIELD
    // ========================================
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(30);     // x
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(20); // y
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-15, 5);    // z
      sizes[i] = THREE.MathUtils.randFloat(0.02, 0.08);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ========================================
    // GRID FLOOR (Subtle)
    // ========================================
    const gridHelper = new THREE.GridHelper(60, 60, accentColor, subtleColor);
    gridHelper.position.y = -8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.1;
    scene.add(gridHelper);

    // ========================================
    // CONNECTION LINES (Between nearby shapes)
    // ========================================
    const lineMaterial = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.08
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ========================================
    // MOUSE PARALLAX
    // ========================================
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ========================================
    // SCROLL-BASED Z MOVEMENT
    // ========================================
    let scrollProgress = 0;
    let targetScroll = 0;

    window.addEventListener('scroll', () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetScroll = window.scrollY / maxScroll;
    }, { passive: true });

    // ========================================
    // ANIMATION LOOP
    // ========================================
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Smooth scroll interpolation
      scrollProgress += (targetScroll - scrollProgress) * 0.03;

      // Camera parallax based on mouse
      camera.position.x = mouseX * 2;
      camera.position.y = 2 + mouseY * 1;
      camera.lookAt(0, 0, -5);

      // Animate floating shapes
      floatingShapes.forEach((shape, i) => {
        const data = shape.userData;

        // Rotation
        shape.rotation.x += data.rotationSpeed.x;
        shape.rotation.y += data.rotationSpeed.y;
        shape.rotation.z += data.rotationSpeed.z;

        // Floating Y motion
        shape.position.y = data.originalY + Math.sin(time * data.floatSpeed + data.floatOffset) * 0.5;

        // Z-depth parallax based on scroll and mouse
        const scrollOffset = scrollProgress * 8 * data.parallaxFactor;
        const mouseOffsetZ = mouseY * data.parallaxFactor * 2;
        shape.position.z = data.originalZ + scrollOffset + mouseOffsetZ;

        // Subtle X movement based on mouse
        shape.position.x += (mouseX * data.parallaxFactor * 0.5 - shape.position.x * 0.001) * 0.02;
      });

      // Animate particles
      if (particles) {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          // Float particles upward slowly
          positions[i * 3 + 1] += 0.005;
          if (positions[i * 3 + 1] > 10) {
            positions[i * 3 + 1] = -10;
          }

          // Parallax on Z based on scroll
          positions[i * 3 + 2] += scrollProgress * 0.01;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = time * 0.02;
      }

      // Update connection lines between nearby shapes
      const linePositions = [];
      const maxDistance = 8;
      const maxConnections = 3;

      for (let i = 0; i < floatingShapes.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < floatingShapes.length; j++) {
          if (connections >= maxConnections) break;

          const dist = floatingShapes[i].position.distanceTo(floatingShapes[j].position);
          if (dist < maxDistance) {
            linePositions.push(
              floatingShapes[i].position.x, floatingShapes[i].position.y, floatingShapes[i].position.z,
              floatingShapes[j].position.x, floatingShapes[j].position.y, floatingShapes[j].position.z
            );
            connections++;
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      // Grid opacity based on scroll
      gridHelper.material.opacity = 0.1 - scrollProgress * 0.05;

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle theme change
    threeMaterial = {
      uniforms: {
        uColor1: { value: new THREE.Color(isDark ? 0x4da3ff : 0x0066cc) },
        uColor2: { value: new THREE.Color(isDark ? 0x8ec5ff : 0x4da3ff) }
      }
    };
  }

  function updateThreeJSColors(theme) {
    if (!threeScene) return;

    const isDark = theme === 'dark';
    const accentColor = isDark ? 0x4da3ff : 0x0066cc;
    const secondaryColor = isDark ? 0x8ec5ff : 0x4da3ff;
    const subtleColor = isDark ? 0x1a3a5c : 0xe8f4fc;

    // Update shape colors
    floatingShapes.forEach(shape => {
      shape.material.color.setHex(accentColor);
      shape.material.emissive?.setHex(secondaryColor);
    });

    // Update particles
    if (particles) {
      particles.material.color.setHex(accentColor);
    }

    // Update lights
    threeScene.traverse(child => {
      if (child.isDirectionalLight) {
        child.color.setHex(accentColor);
      }
      if (child.isPointLight) {
        child.color.setHex(secondaryColor);
      }
      if (child.isGridHelper) {
        child.material.color.setHex(accentColor);
      }
    });
  }

  // ==========================================
  // GSAP ANIMATIONS
  // ==========================================
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Header scroll behavior
    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }
      }
    });

    // Hero text animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const lines = heroTitle.querySelectorAll('.line');
      gsap.fromTo(lines,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          delay: 0.3
        }
      );
    }

    // Hero label and description
    gsap.fromTo('.hero-label',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
    );

    gsap.fromTo('.hero-desc',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.6 }
    );

    // Counter animation
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      gsap.fromTo(counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          delay: 0.8,
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            once: true
          }
        }
      );
    });

    // Hero CTA
    gsap.fromTo('.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.9 }
    );

    // Hero stats
    gsap.fromTo('.stat-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.7
      }
    );

    // Scroll indicator
    gsap.fromTo('.hero-scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 1.2 }
    );

    // Section headers reveal
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      const title = header.querySelector('.section-title');
      const desc = header.querySelector('.section-desc');

      if (title) {
        gsap.fromTo(title,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      if (desc) {
        gsap.fromTo(desc,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: header,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    });

    // Work cards horizontal scroll
    const workSection = document.querySelector('.work-section');
    const workTrack = document.querySelector('.work-track');

    if (workSection && workTrack) {
      const cards = workTrack.querySelectorAll('.work-card');
      const totalWidth = (cards.length * (cards[0]?.offsetWidth || 900)) + ((cards.length - 1) * 32);

      gsap.to(workTrack, {
        x: () => -(totalWidth - window.innerWidth + 64),
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Card entrance animations
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: workSection,
              start: `top+=${i * 100} 80%`,
              once: true
            }
          }
        );
      });
    }

    // Skills animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((cat, i) => {
      gsap.fromTo(cat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              // Animate skill bars
              const bars = cat.querySelectorAll('.skill-item');
              bars.forEach((bar, j) => {
                const level = bar.dataset.level;
                const fill = bar.querySelector('.skill-fill');
                setTimeout(() => {
                  bar.classList.add('animate');
                  fill.style.setProperty('--level', level + '%');
                }, j * 100);
              });
            }
          }
        }
      );
    });

    // About section
    const aboutVisual = document.querySelector('.about-visual');
    const aboutContent = document.querySelector('.about-content');

    if (aboutVisual) {
      gsap.fromTo(aboutVisual,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: aboutVisual,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    if (aboutContent) {
      gsap.fromTo(aboutContent,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutContent,
            start: 'top 75%',
            once: true
          }
        }
      );
    }

    // Contact section
    const contactContent = document.querySelector('.contact-content');
    const contactCta = document.querySelector('.contact-cta-large');

    if (contactContent) {
      gsap.fromTo(contactContent,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contactContent,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    if (contactCta) {
      gsap.fromTo(contactCta,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: contactCta,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-socials a');
    gsap.fromTo(footerLinks,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          once: true
        }
      }
    );

    // 3D Tilt effect on work cards
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          translateZ: 30,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    // 3D Tilt on skill categories
    const skillCats = document.querySelectorAll('.skill-category');
    skillCats.forEach(cat => {
      cat.addEventListener('mousemove', (e) => {
        const rect = cat.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        gsap.to(cat, {
          rotateX: (y - centerY) / 30,
          rotateY: (centerX - x) / 30,
          translateZ: 20,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      cat.addEventListener('mouseleave', () => {
        gsap.to(cat, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  // ==========================================
  // PROCESS SECTION - THREE.JS 3D CAMERA JOURNEY
  // ==========================================
  function initProcess() {
    const canvas = document.getElementById('process-canvas');
    const container = document.getElementById('scroll-container');
    const progressFill = document.querySelector('.camera-progress .progress-fill');
    const progressCurrent = document.querySelector('.camera-current');
    const coordX = document.querySelector('.coord-x');
    const coordY = document.querySelector('.coord-y');
    const coordZ = document.querySelector('.coord-z');
    const scrollHint = document.querySelector('.scroll-hint');
    const stepDots = document.querySelectorAll('.step-dot');
    const cameraProgress = document.querySelector('.camera-progress');

    if (!canvas || !container || typeof THREE === 'undefined') return;

    // Register GSAP plugins (must happen before any ScrollTrigger use)
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
      if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
    }

    // -------- Scene --------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080810);
    scene.fog = new THREE.FogExp2(0x080810, 0.0012);

    // -------- Sizing (use container, fallback to window) --------
    let w = container.offsetWidth || window.innerWidth;
    let h = container.offsetHeight || window.innerHeight;

    // -------- Camera --------
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
    camera.position.set(0, 0, 0);

    // -------- Renderer --------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // -------- Lighting --------
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0x4da3ff, 0.6);
    sun.position.set(100, 200, 150);
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xff6b6b, 0.15);
    fill.position.set(-100, -50, -100);
    scene.add(fill);

    // -------- Step definitions --------
    const steps = [
      {
        title: 'Discovery', subtitle: 'Understanding the Problem',
        desc: ['Stakeholder interviews & workshops', 'User research & persona creation', 'Competitive landscape analysis', 'Opportunity mapping'],
        color: 0x4da3ff,
        cam: { x: 0, y: 0, z: 0 },
        lookAt: { x: 0, y: 0, z: 100 },
        panel: { x: 0, y: 0, z: 100 }
      },
      {
        title: 'Strategy', subtitle: 'Defining the Vision',
        desc: ['Information architecture', 'User flow definition', 'Design system foundations', 'Technical feasibility review'],
        color: 0x00cc88,
        cam: { x: 0, y: 0, z: 200 },
        lookAt: { x: 0, y: 0, z: 300 },
        panel: { x: 0, y: 0, z: 300 }
      },
      {
        title: 'Design', subtitle: 'Crafting the Experience',
        desc: ['High-fidelity interface design', 'Typography & spacing systems', 'Interaction design details', 'Prototype & validate'],
        color: 0xff6b6b,
        cam: { x: 100, y: 0, z: 200 },
        lookAt: { x: 200, y: 0, z: 200 },
        panel: { x: 200, y: 0, z: 200 }
      },
      {
        title: 'Build', subtitle: 'Bringing It to Life',
        desc: ['Clean, semantic code', 'Modern framework integration', 'Performance optimization', 'Cross-browser testing'],
        color: 0xffaa00,
        cam: { x: 100, y: -100, z: 200 },
        lookAt: { x: 100, y: -200, z: 200 },
        panel: { x: 100, y: -200, z: 200 }
      },
      {
        title: 'Launch', subtitle: 'Launch & Optimize',
        desc: ['Analytics & monitoring setup', 'Performance benchmarking', 'User feedback collection', 'Continuous iteration'],
        color: 0xaa66ff,
        cam: { x: 100, y: -100, z: 100 },
        lookAt: { x: 100, y: -100, z: 0 },
        panel: { x: 100, y: -100, z: 0 }
      }
    ];

    // -------- Canvas texture helpers --------
    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function createPanelTexture(step, index) {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 576;
      const ctx = c.getContext('2d');
      const hex = '#' + step.color.toString(16).padStart(6, '0');

      ctx.fillStyle = 'rgba(12, 12, 20, 0.95)';
      roundRect(ctx, 0, 0, 1024, 576, 32);
      ctx.fill();

      ctx.strokeStyle = hex;
      ctx.lineWidth = 3;
      roundRect(ctx, 6, 6, 1012, 564, 28);
      ctx.stroke();

      const glow = ctx.createLinearGradient(0, 0, 1024, 0);
      glow.addColorStop(0, 'transparent');
      glow.addColorStop(0.3, hex);
      glow.addColorStop(0.7, hex);
      glow.addColorStop(1, 'transparent');
      ctx.strokeStyle = glow;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 10);
      ctx.lineTo(984, 10);
      ctx.stroke();

      ctx.fillStyle = hex;
      ctx.globalAlpha = 0.06;
      ctx.font = 'bold 280px "Space Grotesk", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(String(index + 1).padStart(2, '0'), 990, 480);
      ctx.globalAlpha = 1;

      ctx.fillStyle = hex;
      ctx.globalAlpha = 0.15;
      roundRect(ctx, 60, 48, 130, 44, 22);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = hex;
      ctx.font = '500 20px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Step ' + (index + 1), 125, 78);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Space Grotesk", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(step.title, 60, 180);

      ctx.fillStyle = hex;
      ctx.font = '500 26px "Inter", sans-serif';
      ctx.fillText(step.subtitle, 60, 225);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 255);
      ctx.lineTo(964, 255);
      ctx.stroke();

      ctx.font = '400 22px "Inter", sans-serif';
      step.desc.forEach((line, i) => {
        ctx.fillStyle = hex;
        ctx.fillText('\u2014', 60, 300 + i * 42);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fillText(line, 90, 300 + i * 42);
      });

      for (let d = 0; d < 5; d++) {
        ctx.beginPath();
        ctx.arc(60 + d * 22, 520, 4, 0, Math.PI * 2);
        ctx.fillStyle = d <= index ? hex : 'rgba(255, 255, 255, 0.12)';
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(c);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    // -------- Create panels --------
    const panels = [];
    const panelGlows = [];

    steps.forEach((step, i) => {
      const tex = createPanelTexture(step, i);
      const geo = new THREE.PlaneGeometry(80, 45);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        emissive: new THREE.Color(step.color),
        emissiveIntensity: 0.05,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true
      });

      const panel = new THREE.Mesh(geo, mat);
      panel.position.set(step.panel.x, step.panel.y, step.panel.z);

      const dir = new THREE.Vector3(
        step.cam.x - step.panel.x,
        step.cam.y - step.panel.y,
        step.cam.z - step.panel.z
      ).normalize();
      if (Math.abs(dir.y) > 0.9) {
        panel.up.set(0, 0, -Math.sign(dir.y));
      }
      panel.lookAt(step.cam.x, step.cam.y, step.cam.z);
      panel.rotation.x += 0.03;

      panel.userData = {
        baseY: step.panel.y,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.4 + Math.random() * 0.3,
        floatAmp: 1.5 + Math.random() * 1
      };

      panels.push(panel);
      scene.add(panel);

      const glowLight = new THREE.PointLight(step.color, 0.4, 120);
      glowLight.position.copy(panel.position);
      scene.add(glowLight);
      panelGlows.push(glowLight);
    });

    // -------- Connecting path between panels --------
    const curvePoints = steps.map(s =>
      new THREE.Vector3(s.panel.x, s.panel.y, s.panel.z)
    );
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);
    const curvGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(200));
    const curvMat = new THREE.LineBasicMaterial({
      color: 0x4da3ff, transparent: true, opacity: 0.1
    });
    scene.add(new THREE.Line(curvGeo, curvMat));

    // -------- Particles --------
    const PARTICLE_COUNT = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let pi = 0; pi < PARTICLE_COUNT; pi++) {
      pPos[pi * 3]     = (Math.random() - 0.5) * 700;
      pPos[pi * 3 + 1] = (Math.random() - 0.5) * 500;
      pPos[pi * 3 + 2] = (Math.random() - 0.5) * 700;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x4da3ff, size: 1.5, transparent: true, opacity: 0.35, sizeAttenuation: true
    });
    const particleMesh = new THREE.Points(pGeo, pMat);
    scene.add(particleMesh);

    // -------- Decorative floating shapes --------
    const decoMeshes = [];
    steps.forEach((step) => {
      for (let j = 0; j < 3; j++) {
        const sz = 1 + Math.random() * 2;
        const geos = [
          new THREE.OctahedronGeometry(sz, 0),
          new THREE.TetrahedronGeometry(sz, 0),
          new THREE.IcosahedronGeometry(sz, 0)
        ];
        const g = geos[Math.floor(Math.random() * geos.length)];
        const m = new THREE.MeshStandardMaterial({
          color: step.color, transparent: true, opacity: 0.18,
          roughness: 0.6, metalness: 0.2, wireframe: Math.random() > 0.5
        });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set(
          step.panel.x + (Math.random() - 0.5) * 80,
          step.panel.y + (Math.random() - 0.5) * 60,
          step.panel.z + (Math.random() - 0.5) * 80
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        mesh.userData.rot = {
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.008
        };
        decoMeshes.push(mesh);
        scene.add(mesh);
      }
    });

    // -------- State --------
    let scrollProgress = 0;
    let currentStep = 0;
    const clock = new THREE.Clock();
    const currentLookAt = new THREE.Vector3(
      steps[0].lookAt.x, steps[0].lookAt.y, steps[0].lookAt.z
    );
    const targetLookAt = new THREE.Vector3(
      steps[0].lookAt.x, steps[0].lookAt.y, steps[0].lookAt.z
    );
    camera.lookAt(currentLookAt);

    // -------- GSAP ScrollTrigger --------
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=5000',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgress = self.progress;

            if (progressFill) {
              progressFill.style.strokeDashoffset = 283 - scrollProgress * 283;
            }

            const newStep = Math.min(Math.floor(scrollProgress * 5), 4);
            if (newStep !== currentStep) {
              currentStep = newStep;
              updateUI(currentStep);
            }

            if (progressCurrent) {
              progressCurrent.textContent = String(currentStep + 1).padStart(2, '0');
            }

            updateCoords();

            if (scrollHint) {
              scrollHint.classList.toggle('hidden', scrollProgress > 0.02);
            }
          },
          onToggle: (self) => {
            if (cameraProgress) {
              cameraProgress.classList.toggle('hidden', !self.isActive);
            }
          },
          onLeave: () => {
            if (cameraProgress) cameraProgress.classList.add('hidden');
          },
          onEnterBack: () => {
            if (cameraProgress) cameraProgress.classList.remove('hidden');
          }
        }
      });

      const seg = 1 / (steps.length - 1);
      for (let si = 1; si < steps.length; si++) {
        tl.to(camera.position, {
          x: steps[si].cam.x,
          y: steps[si].cam.y,
          z: steps[si].cam.z,
          duration: seg,
          ease: 'none'
        }, (si - 1) * seg);
      }
    }

    function updateUI(active) {
      stepDots.forEach((dot, i) => {
        dot.classList.remove('active', 'passed');
        if (i === active) dot.classList.add('active');
        else if (i < active) dot.classList.add('passed');
      });

      panels.forEach((p, i) => {
        const isActive = i === active;
        gsap.to(p.material, {
          emissiveIntensity: isActive ? 0.2 : 0.03,
          duration: 0.6, ease: 'power2.out'
        });
        gsap.to(p.scale, {
          x: isActive ? 1.08 : 1,
          y: isActive ? 1.08 : 1,
          z: isActive ? 1.08 : 1,
          duration: 0.6, ease: 'expo.out'
        });
      });

      panelGlows.forEach((g, i) => {
        gsap.to(g, {
          intensity: i === active ? 0.8 : 0.3,
          duration: 0.6
        });
      });
    }

    function updateCoords() {
      if (!coordX || !coordY || !coordZ) return;
      const p = scrollProgress * (steps.length - 1);
      const idx = Math.floor(p);
      const t = p - idx;
      const a = steps[Math.min(idx, steps.length - 1)].cam;
      const b = steps[Math.min(idx + 1, steps.length - 1)].cam;
      coordX.textContent = 'x: ' + Math.round(a.x + (b.x - a.x) * t);
      coordY.textContent = 'y: ' + Math.round(a.y + (b.y - a.y) * t);
      coordZ.textContent = 'z: ' + Math.round(a.z + (b.z - a.z) * t);
    }

    stepDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const st = ScrollTrigger.getAll().find(t => t.trigger === container);
        if (st) {
          gsap.to(window, {
            scrollTo: { y: st.start + (st.end - st.start) * (i / (steps.length - 1)) },
            duration: 1.2, ease: 'expo.inOut'
          });
        }
      });
    });

    // -------- Render first frame immediately --------
    renderer.render(scene, camera);

    // -------- Render loop --------
    function animate() {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      const p = scrollProgress * (steps.length - 1);
      const idx = Math.floor(p);
      const t = p - idx;
      const a = steps[Math.min(idx, steps.length - 1)].lookAt;
      const b = steps[Math.min(idx + 1, steps.length - 1)].lookAt;

      targetLookAt.set(
        a.x + (b.x - a.x) * t,
        a.y + (b.y - a.y) * t,
        a.z + (b.z - a.z) * t
      );
      currentLookAt.lerp(targetLookAt, 0.08);
      camera.lookAt(currentLookAt);

      panels.forEach((panel) => {
        const d = panel.userData;
        panel.position.y = d.baseY + Math.sin(time * d.floatSpeed + d.floatPhase) * d.floatAmp;
      });

      decoMeshes.forEach((m) => {
        m.rotation.x += m.userData.rot.x;
        m.rotation.y += m.userData.rot.y;
        m.rotation.z += m.userData.rot.z;
      });

      particleMesh.rotation.y = time * 0.008;

      renderer.render(scene, camera);
    }

    animate();

    // -------- Resize --------
    function onResize() {
      const rw = container.offsetWidth || window.innerWidth;
      const rh = container.offsetHeight || window.innerHeight;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    }
    window.addEventListener('resize', onResize);

    updateUI(0);
  }

  // ==========================================
  // PROJECT MODAL
  // ==========================================
  let currentProjectIndex = 0;
  let currentImageIndex = 0;

  function openModal(projectIndex) {
    const project = PROJECTS[projectIndex];
    if (!project) return;

    currentProjectIndex = projectIndex;
    currentImageIndex = 0;

    // Populate modal
    modal.querySelector('.modal-category').textContent = project.category;
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-desc').textContent = project.description;
    modal.querySelector('.detail-challenge').textContent = project.challenge;
    modal.querySelector('.detail-solution').textContent = project.solution;
    modal.querySelector('.detail-results').textContent = project.results;

    // Set main image
    const mainImg = modal.querySelector('.gallery-main img');
    mainImg.src = project.images[0];
    mainImg.alt = project.title;

    // Create thumbnails
    const thumbsContainer = modal.querySelector('.gallery-thumbs');
    thumbsContainer.innerHTML = '';
    project.images.forEach((img, i) => {
      const thumb = document.createElement('button');
      thumb.className = `gallery-thumb ${i === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${img}" alt="${project.title} - ${i + 1}" />`;
      thumb.addEventListener('click', () => {
        currentImageIndex = i;
        updateModalImage(project);
      });
      thumbsContainer.appendChild(thumb);
    });

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Animate in
    gsap.fromTo(modal.querySelector('.modal-container'),
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' }
    );
  }

  function updateModalImage(project) {
    const mainImg = modal.querySelector('.gallery-main img');
    gsap.to(mainImg, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        mainImg.src = project.images[currentImageIndex];
        gsap.to(mainImg, { opacity: 1, duration: 0.3 });
      }
    });

    // Update thumbnails
    modal.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentImageIndex);
    });
  }

  function closeModal() {
    gsap.to(modal.querySelector('.modal-container'), {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'expo.in',
      onComplete: () => {
        modal.hidden = true;
        document.body.style.overflow = '';
      }
    });
  }

  function nextProject() {
    const next = (currentProjectIndex + 1) % PROJECTS.length;
    gsap.to(modal.querySelector('.modal-content'), {
      x: -20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        openModal(next);
        gsap.fromTo(modal.querySelector('.modal-content'),
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  }

  function prevProject() {
    const prev = (currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    gsap.to(modal.querySelector('.modal-content'), {
      x: 20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        openModal(prev);
        gsap.fromTo(modal.querySelector('.modal-content'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  }

  // Modal event listeners
  document.querySelectorAll('.work-card-btn').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(i);
    });
  });

  modalBackdrop?.addEventListener('click', closeModal);
  modalClose?.addEventListener('click', closeModal);
  modalNext?.addEventListener('click', nextProject);
  modalPrev?.addEventListener('click', prevProject);

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
  });

  // ==========================================
  // MOBILE MENU
  // ==========================================
  menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav?.classList.toggle('open');
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn?.classList.remove('open');
      nav?.classList.remove('open');
    });
  });

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backTop = document.querySelector('.back-top');
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // FADE UP ELEMENTS ON SCROLL
  // ==========================================
  function initScrollReveal() {
    const fadeElements = document.querySelectorAll('[data-fade-up]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // ==========================================
  // SCROLL-BASED 3D PARALLAX FOR CONTENT
  // ==========================================
  function initScrollParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Parallax sections at different Z depths
    const parallaxSections = [
      { selector: '.hero-content', speed: 0.3 },
      { selector: '.work-section', speed: 0.2 },
      { selector: '.skills-section', speed: 0.25 },
      { selector: '.about-section', speed: 0.2 },
      { selector: '.contact-section', speed: 0.1 }
    ];

    parallaxSections.forEach(({ selector, speed }) => {
      const section = document.querySelector(selector);
      if (!section) return;

      gsap.to(section, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Hero parallax on scroll - text moves into Z space
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        scale: 0.9,
        opacity: 0.5,
        filter: 'blur(5px)',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  // ==========================================
  // INITIALIZE
  // ==========================================
  function init() {
    initTheme();
    initCursor();
    initThreeJS();
    initScrollReveal();

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initGSAP();
      initProcess();
      initScrollParallax();
    } else {
      window.addEventListener('load', () => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          initGSAP();
          initProcess();
          initScrollParallax();
        }
      });
    }
  }

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
