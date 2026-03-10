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

    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(el => {
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

    // Hover states
    const hoverElements = document.querySelectorAll('a, button, .work-card, [data-magnetic]');
    hoverElements.forEach(el => {
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
  // PROCESS SECTION - INTERACTIVE JOURNEY
  // ==========================================
  function initProcess() {
    const stepBtns = document.querySelectorAll('.process-step-btn');
    const steps = document.querySelectorAll('.process-step');

    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const stepIndex = btn.dataset.step;

        // Update buttons
        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update steps with animation
        steps.forEach(step => {
          if (step.dataset.step === stepIndex) {
            step.classList.add('active');
            // Restart progress animation
            const progress = step.querySelector('.step-progress::after');
            if (progress) {
              progress.style.animation = 'none';
              progress.offsetHeight; // Trigger reflow
              progress.style.animation = 'progressGrow 1.5s ease-out forwards';
            }
          } else {
            step.classList.remove('active');
          }
        });
      });
    });
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
      { selector: '.process-section', speed: 0.15 },
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
    initProcess();
    initScrollReveal();

    // Initialize GSAP after page load
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initGSAP();
      initScrollParallax();
    } else {
      // Retry if GSAP isn't loaded yet
      window.addEventListener('load', () => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          initGSAP();
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
