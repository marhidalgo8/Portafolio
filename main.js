/**
 * main.js - Portafolio Mar Hidalgo
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR ICONOS DE LUCIDE AL CARGAR
    const refreshIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    refreshIcons();

    /**
     * 2. GESTIÓN DE MODO OSCURO (UNIFICADA)
     */
    const initDarkMode = () => {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const html = document.documentElement; 
        
        // Función para actualizar físicamente el icono
        const updateDarkModeIcon = (isDark) => {
            const iconElement = darkModeToggle.querySelector('i');
            if (iconElement) {
                // Cambiamos el atributo para Lucide
                iconElement.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
                // Limpiamos el interior para que Lucide genere el nuevo SVG
                iconElement.innerHTML = ''; 
                refreshIcons();
            }
        };

        // Comprobar preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            html.classList.add('dark-mode');
            updateDarkModeIcon(true);
        } else {
            html.classList.remove('dark-mode');
            updateDarkModeIcon(false);
        }
        
        // Evento de clic único
        darkModeToggle.addEventListener('click', () => {
            const isDarkNow = html.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
            updateDarkModeIcon(isDarkNow);
        });
    };

    /**
     * 3. LÓGICA DE SERVICIOS (Giro Elástico)
     */
    const initServices = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('is-spinning');
            });
            card.addEventListener('animationend', () => {
                card.classList.remove('is-spinning');
            });
        });
    };

    /**
     * 4. LÓGICA DE PROYECTOS (Acordeón)
     */
    const initProjectAccordions = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.addEventListener('click', function() {
                const container = this.closest('.accordion-container');
                container.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
                this.classList.add('active');
            });
        });
    };

    /**
     * 5. SMOOTH SCROLL
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    window.scrollTo({
                        top: target.offsetTop - navbarHeight - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // EJECUCIÓN
    initDarkMode();
    initServices();
    initProjectAccordions();
    initSmoothScroll();
});