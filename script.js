/* ================================================
   Mahmoud Morsy // Portfolio — script.js
   - 10 projects (5 web, 5 security)
   - Category & skill filtering (with extra "go" skill)
   - Slow, soft GSAP animations
   ================================================ */

(function () {
    'use strict';

    /* ---------- 1. Project data (10 entries) ---------- */
    const projects = [
        // Web Apps
        {
            id: 1,
            title: 'NEXUS_DASHBOARD',
            category: 'web',
            skills: ['html', 'js'],
            description: 'A real-time analytics dashboard with terminal-style UI, live data charts, and WebSocket feeds.',
            link: '#'
        },
        {
            id: 2,
            title: 'CIPHER_CHAT',
            category: 'web',
            skills: ['js', 'react'],
            description: 'End-to-end encrypted messaging prototype built with React and the Web Crypto API.',
            link: '#'
        },
        {
            id: 3,
            title: 'GHOST_MART',
            category: 'web',
            skills: ['html', 'js', 'react'],
            description: 'Anonymous e-commerce front-end with stealth-mode toggle and onion-routing notes.',
            link: '#'
        },
        {
            id: 4,
            title: 'PULSE_API',
            category: 'web',
            skills: ['go', 'js'],
            description: 'High-throughput REST API in Go serving telemetry from IoT devices with sub-10ms p99 latency.',
            link: '#'
        },
        {
            id: 5,
            title: 'AURORA_CMS',
            category: 'web',
            skills: ['html', 'js', 'react'],
            description: 'A headless CMS with a markdown-first editor, role-based access, and a clean admin panel.',
            link: '#'
        },
        // Security
        {
            id: 6,
            title: 'PHANTOM_SCANNER',
            category: 'security',
            skills: ['python', 'linux'],
            description: 'Network reconnaissance tool that maps exposed services and flags misconfigured hosts.',
            link: '#'
        },
        {
            id: 7,
            title: 'ZERO_DAY_FUZZER',
            category: 'security',
            skills: ['python'],
            description: 'A targeted input-fuzzing harness for binary parsers, built around coverage-guided mutation.',
            link: '#'
        },
        {
            id: 8,
            title: 'ROOTKIT_HUNTER',
            category: 'security',
            skills: ['linux', 'python'],
            description: 'Linux kernel integrity monitor that surfaces hidden processes, modules, and persistence hooks.',
            link: '#'
        },
        {
            id: 9,
            title: 'CIPHER_AUDIT',
            category: 'security',
            skills: ['go', 'linux'],
            description: 'Static analyzer for Go services that detects common crypto misuse and unsafe deserialization patterns.',
            link: '#'
        },
        {
            id: 10,
            title: 'SPECTER_VPN',
            category: 'security',
            skills: ['go', 'linux'],
            description: 'A minimal WireGuard-based mesh VPN prototype with hardware-key authentication.',
            link: '#'
        }
    ];

    /* ---------- 2. State for combined filtering ---------- */
    const state = {
        category: 'all',   // 'all' | 'web' | 'security'
        skill: 'all'       // 'all' | 'html' | 'js' | 'python' | 'react' | 'linux' | 'go'
    };

    /* ---------- 3. DOM references ---------- */
    const grid         = document.getElementById('project-grid');
    const emptyState   = document.getElementById('empty-state');
    const statusEl     = document.getElementById('filter-status');
    const catFilters   = document.querySelectorAll('#category-filters .filter-btn');
    const skillFilters = document.querySelectorAll('#skill-filters .skill-btn');
    const yearEl       = document.getElementById('year');
    const mobileBtn    = document.getElementById('mobile-menu-btn');
    const mobileMenu   = document.getElementById('mobile-menu');
    const contactForm  = document.getElementById('contact-form');
    const formStatus   = document.getElementById('form-status');

    /* ---------- 4. Helpers ---------- */
    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function matchesProject(p) {
        const catOk   = state.category === 'all' || p.category === state.category;
        const skillOk = state.skill === 'all'    || p.skills.includes(state.skill);
        return catOk && skillOk;
    }

    /* ---------- 5. Render project cards ---------- */
    function renderProjects() {
        if (!grid) return;

        const visible = projects.filter(matchesProject);
        grid.innerHTML = '';

        if (visible.length === 0) {
            emptyState.classList.remove('hidden');
            if (statusEl) statusEl.textContent = 'No projects match the current filter.';
            return;
        }
        emptyState.classList.add('hidden');
        if (statusEl) {
            const catLabel   = state.category === 'all' ? 'all categories' : state.category;
            const skillLabel = state.skill === 'all' ? 'any skill' : state.skill.toUpperCase();
            statusEl.textContent = `Showing ${visible.length} project(s) in ${catLabel} filtered by ${skillLabel}.`;
        }

        const frag = document.createDocumentFragment();
        visible.forEach(p => {
            const li = document.createElement('li');
            li.className = 'project-card border border-neon/20 bg-bg-card p-5 flex flex-col rounded';
            li.setAttribute('data-category', p.category);
            li.setAttribute('data-skills', p.skills.join(','));
            li.style.opacity = '0'; // GSAP will fade in

            const skillsHTML = p.skills
                .map(s => `<span class="text-[10px] font-mono tracking-widest border border-neon/40 text-neon-dim px-2 py-0.5 rounded">${escapeHTML(s.toUpperCase())}</span>`)
                .join(' ');

            const catColorClass = p.category === 'web' ? 'text-rose' : 'text-neon';

            li.innerHTML = `
                <div class="flex items-start justify-between mb-2 font-mono text-[10px] tracking-widest">
                    <span class="${catColorClass}">[ ${escapeHTML(p.category.toUpperCase())} ]</span>
                    <span class="text-ink-soft">#${String(p.id).padStart(3, '0')}</span>
                </div>
                <h3 class="font-mono text-lg font-bold text-ink mb-2">
                    ${escapeHTML(p.title)}
                </h3>
                <p class="font-sans text-sm text-ink-dim mb-4 flex-grow leading-relaxed">${escapeHTML(p.description)}</p>
                <div class="flex flex-wrap gap-1.5 mb-4" aria-label="Skills used">
                    ${skillsHTML}
                </div>
                <a href="${escapeHTML(p.link)}"
                   class="self-start font-mono text-xs border border-rose/60 text-rose px-3 py-1.5 rounded hover:bg-rose hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2 focus:ring-offset-bg"
                   aria-label="Open project ${escapeHTML(p.title)}">
                    &gt; open_project
                </a>
            `;
            frag.appendChild(li);
        });

        grid.appendChild(frag);
        animateCardsIn();
    }

    /* ---------- 6. Filtering logic ---------- */
    function setCategory(cat) {
        state.category = cat;
        catFilters.forEach(btn => {
            const isActive = btn.getAttribute('data-category') === cat;
            btn.setAttribute('aria-pressed', String(isActive));
            btn.classList.toggle('bg-rose', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('border-rose', isActive);
            btn.classList.toggle('is-active', isActive);
            btn.classList.toggle('text-rose', !isActive);
            btn.classList.toggle('border-rose/60', !isActive);
        });
        renderProjects();
    }

    function setSkill(skill) {
        state.skill = skill;
        skillFilters.forEach(btn => {
            const isActive = btn.getAttribute('data-skill') === skill;
            btn.setAttribute('aria-pressed', String(isActive));
            btn.classList.toggle('bg-neon/15', isActive);
            btn.classList.toggle('text-neon', isActive);
            btn.classList.toggle('border-neon/70', isActive);
            btn.classList.toggle('is-active', isActive);
            btn.classList.toggle('text-neon-dim', !isActive);
            btn.classList.toggle('border-neon/40', !isActive);
        });
        renderProjects();
    }

    /* ---------- 7. GSAP animations — slow & soft ---------- */
    function animateHero() {
        if (typeof gsap === 'undefined') return;
        gsap.from('.hero-line', {
            y: 24,
            opacity: 0,
            duration: 1.2,        // slower
            ease: 'power2.out',
            stagger: 0.2,
            delay: 0.3
        });
    }

    function animateCardsIn() {
        if (typeof gsap === 'undefined') return;
        const cards = grid.querySelectorAll('.project-card');
        gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.0,     // slower
                ease: 'power2.out',
                stagger: 0.1
            }
        );
    }

    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('section h2').forEach(h => {
            gsap.from(h, {
                scrollTrigger: { trigger: h, start: 'top 85%' },
                y: 20,
                opacity: 0,
                duration: 1.0,    // slower
                ease: 'power2.out'
            });
        });

        const form = document.getElementById('contact-form');
        if (form) {
            gsap.from(form, {
                scrollTrigger: { trigger: form, start: 'top 85%' },
                y: 30,
                opacity: 0,
                duration: 1.1,
                ease: 'power2.out'
            });
        }
    }

    /* ---------- 8. Mobile menu ---------- */
    function toggleMobileMenu(force) {
        const isOpen = force !== undefined
            ? force
            : mobileMenu.classList.contains('hidden');

        mobileMenu.classList.toggle('hidden', !isOpen);
        mobileMenu.classList.toggle('flex', isOpen);
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
    }

    /* ---------- 9. Contact form ---------- */
    function handleContactSubmit(e) {
        e.preventDefault();
        const name    = contactForm.name.value.trim();
        const email   = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = 'Error: All fields are required.';
            return;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
            formStatus.textContent = 'Error: Please enter a valid email address.';
            return;
        }

        formStatus.textContent = `Success: Message transmitted by ${name}.`;
        contactForm.reset();
    }

    /* ---------- 10. Event wiring ---------- */
    function wireEvents() {
        catFilters.forEach(btn => {
            btn.addEventListener('click', () => setCategory(btn.getAttribute('data-category')));
        });
        skillFilters.forEach(btn => {
            btn.addEventListener('click', () => setSkill(btn.getAttribute('data-skill')));
        });

        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => toggleMobileMenu());
            mobileMenu.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => toggleMobileMenu(false));
            });
        }

        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
    }

    /* ---------- 11. Boot ---------- */
    function init() {
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        wireEvents();
        renderProjects();
        animateHero();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
