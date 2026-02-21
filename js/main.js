// RAW UX - JavaScript CORREGIDO (solo funcionalidades solicitadas)
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTerminal();
    initForm();
    initMobileMenu();      // NUEVO: manejo del menú hamburguesa
    initWhatsappPulse();
    console.log('✅ RAW UX inicializado');
});

// ===== 1. Navegación suave y activo =====
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            // Actualizar clase activa
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Scroll suave con offset de navbar
            const offset = 80;
            const targetPosition = targetSection.offsetTop - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            // Cerrar menú móvil si está abierto
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.menu-toggle');
            if (menu && toggle) {
                menu.classList.remove('show');
                toggle.classList.remove('active');
            }
        });
    });

    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.id;
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 2. Terminal animation (solo si existe el elemento) =====
function initTerminal() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    // Si no hay un span .command dentro, lo creamos
    let commandSpan = typingElement.querySelector('.command');
    if (!commandSpan) {
        commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        typingElement.innerHTML = '';
        typingElement.appendChild(commandSpan);
    }

    const commands = [
        'generate_report --honest',
        'optimize_images --quality=80',
        'fix_navigation --simplify',
        'audit_ux --complete'
    ];

    let index = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentText = commands[index];
        if (!isDeleting && charIndex <= currentText.length) {
            commandSpan.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 50);
        } else if (isDeleting && charIndex >= 0) {
            commandSpan.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 30);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                index = (index + 1) % commands.length;
            }
            setTimeout(type, 1500);
        }
    }
    setTimeout(type, 1000);
}

// ===== 3. Formulario – CONEXIÓN REAL con n8n =====
function initForm() {
    const form = document.getElementById('form-ux');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalHTML = submitBtn.innerHTML;
        const spanText = submitBtn.querySelector('span:first-child');

        // Mostrar estado de envío
        spanText.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        // Capturar datos del formulario
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        try {
            // Usar la URL del atributo action del formulario (ngrok o la que corresponda)
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                alert('✅ DIAGNÓSTICO ENVIADO\nTe contactaremos en menos de 24h.');
                form.reset();
            } else {
                alert('❌ Error en el servidor. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('❌ No se pudo conectar. Verifica tu conexión o usa WhatsApp.');
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
}

// ===== 4. Menú hamburguesa – toggle =====
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('show');
    });
}

// ===== 5. Efecto de pulso en WhatsApp float =====
function initWhatsappPulse() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (!whatsappBtn) return;
    setInterval(() => {
        whatsappBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}