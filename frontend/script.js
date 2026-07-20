/* ================================================
   Mahmoud Morsy // Portfolio — script.js
   - Optimized for Performance & High Lighthouse Score
   ================================================ */

(function () {
    'use strict';

    /* ---------- 1. Project data ---------- */
    let projects = [];

    /* ---------- 2. State for combined filtering ---------- */
    const state = {
        category: 'all', 
        skill: 'all'
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
            if (emptyState) emptyState.classList.remove('hidden');
            if (statusEl) statusEl.textContent = 'No projects match the current filter.';
            return;
        }
        if (emptyState) emptyState.classList.add('hidden');
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
        
        // Run light animation after render
        if (typeof gsap !== 'undefined') {
            gsap.from('.project-card', {
                opacity: 0,
                y: 15,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power1.out',
                clearProps: 'all' // Clear inline styles after animation to avoid layout shifts
            });
        }
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

    /* ---------- 7. Deferred GSAP Animations ---------- */
    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        // Lightweight Hero animation
        gsap.from('.hero-line', {
            y: 15,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power1.out',
            clearProps: 'all'
        });

        // ScrollTrigger deferred setup
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray('section h2').forEach(h => {
                gsap.from(h, {
                    scrollTrigger: { trigger: h, start: 'top 90%' },
                    y: 15,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.out',
                    clearProps: 'all'
                });
            });

            const form = document.getElementById('contact-form');
            if (form) {
                gsap.from(form, {
                    scrollTrigger: { trigger: form, start: 'top 90%' },
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power1.out',
                    clearProps: 'all'
                });
            }
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
    async function handleContactSubmit(e) {
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

        formStatus.textContent = 'Sending message...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (data.success) {
                formStatus.textContent = `Success: Message transmitted by ${name}.`;
                contactForm.reset();
            } else {
                formStatus.textContent = 'Error: Failed to send message.';
            }
        } catch (error) {
            console.error("Error sending message:", error);
            formStatus.textContent = 'Error: Server is unreachable.';
        }
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
    async function fetchProjectsFromServer() {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            projects = data;
            renderProjects();
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    function init() {
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        wireEvents();
        fetchProjectsFromServer();
        
        // Defer non-critical GSAP animations after frame render
        requestAnimationFrame(() => {
            setTimeout(initAnimations, 100);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();