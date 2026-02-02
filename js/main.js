// RAW UX - JavaScript Optimizado
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTerminal();
    initForm();
    initScrollEffects();
    
    console.log('✅ RAW UX inicializado');
});

// Navegación
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Actualizar activo
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll suave
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Detectar sección activa al scroll
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
        
        // Actualizar navegación
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Terminal animation
function initTerminal() {
    const typingLine = document.querySelector('.typing');
    if (!typingLine) return;
    
    const commands = [
        'generate_report --honest',
        'optimize_images --quality=80',
        'fix_navigation --simplify',
        'audit_ux --complete'
    ];
    
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = commands[index];
        const commandSpan = typingLine.querySelector('.command');
        
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

// Formulario
function initForm() {
    const form = document.getElementById('form-ux');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Mostrar loading
        submitBtn.querySelector('span').textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        
        form.addEventListener('submit', async function(e) { // <-- Agregamos 'async' aquí
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const spanText = submitBtn.querySelector('span');
            const originalText = spanText.textContent;
            
            // Mostrar loading
            spanText.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Capturar los datos de los campos del formulario
            const formData = new FormData(form);
            const datos = Object.fromEntries(formData.entries());
    
            try {
                // CONEXIÓN REAL: Enviamos los datos a n8n
                const response = await fetch("https://peninsula-acre-designs-brother.trycloudflare.com/webhook-test/contacto-web", {
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
                console.error("Error de conexión:", error);
                alert('❌ No se pudo conectar con el servidor. ¿Está el túnel abierto?');
            } finally {
                // Restaurar botón al estado original
                spanText.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
    
}

// Efectos de scroll
function initScrollEffects() {
    const elements = document.querySelectorAll('.service-card, .case-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// WhatsApp float effect
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}