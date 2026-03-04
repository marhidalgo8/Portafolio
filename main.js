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

    /**
     * 2. GESTIÓN DE MODO OSCURO (OPTIMIZADA)
     */
    const initDarkMode = () => {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const html = document.documentElement; 
        
        // Buscamos o creamos el contenedor del icono para que Lucide no rompa la referencia
        let iconContainer = document.getElementById('theme-icon-container');
        if (!iconContainer && darkModeToggle) {
            iconContainer = document.createElement('span');
            iconContainer.id = 'theme-icon-container';
            const originalIcon = darkModeToggle.querySelector('i');
            if (originalIcon) {
                darkModeToggle.replaceChild(iconContainer, originalIcon);
            } else {
                darkModeToggle.appendChild(iconContainer);
            }
        }

        const updateDarkModeIcon = (isDark) => {
            if (iconContainer) {
                // Limpiamos el contenido anterior (el SVG generado por Lucide)
                iconContainer.innerHTML = ''; 
                
                // Creamos un nuevo elemento <i> para que Lucide lo transforme
                const newIcon = document.createElement('i');
                newIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
                iconContainer.appendChild(newIcon);
                
                // Forzamos a Lucide a renderizar el nuevo icono
                refreshIcons();
            }
        };

        // Comprobar preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        if (isDark) {
            html.classList.add('dark-mode');
        } else {
            html.classList.remove('dark-mode');
        }
        
        updateDarkModeIcon(isDark);
        
        // Evento de clic
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
                if (container) {
                    container.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                }
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
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
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