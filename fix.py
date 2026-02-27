import sys

# 1. FIX INDEX.HTML
html_file = r'c:\Users\danif\OneDrive\Escritorio\Todositios\rawdaasesoramientoweb\index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Fix unclosed nav-container
if '            <div class="nav-menu">' in html_content:
    html_content = html_content.replace(
'''            <div class="nav-menu">
                <a href="#inicio" class="nav-link active">INICIO</a>
                <a href="#servicios" class="nav-link">SERVICIOS</a>
                <a href="#metodo" class="nav-link">MÉTODO</a>
                <a href="#casos" class="nav-link">CASOS</a>
                <a href="#contacto" class="nav-link">CONTACTO</a>
            
        </div>
    </nav>''',
'''            <div class="nav-menu">
                <a href="#inicio" class="nav-link active">INICIO</a>
                <a href="#servicios" class="nav-link">SERVICIOS</a>
                <a href="#metodo" class="nav-link">MÉTODO</a>
                <a href="#casos" class="nav-link">CASOS</a>
                <a href="#contacto" class="nav-link">CONTACTO</a>
            </div>
        </div>
    </nav>'''
    )

# Fix stray divs in hero
if '<!-- Imagen comercial (mobile) -->' in html_content:
    html_content = html_content.replace(
'''                    <!-- Imagen comercial (mobile) -->
                 <div class="mockup-mobile">
                          <img src="img/mockup-responsive.jpg" alt="Soluciones web profesionales">
                                </div>

                            </div>
                              
                        </div>
                    </div>
                </div>
            </div>
        </section>''',
'''                    <!-- Imagen comercial (mobile) -->
                    <div class="mockup-mobile">
                        <img src="img/mockup-responsive.jpg" alt="Soluciones web profesionales">
                    </div>
                </div>
            </div>
        </section>'''
    )

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

# 2. FIX STYLES.CSS
css_file = r'c:\Users\danif\OneDrive\Escritorio\Todositios\rawdaasesoramientoweb\css\styles.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_lines = f.readlines()

new_css = ""
for line in css_lines:
    if line.strip() == '/* ===== RESPONSIVE ===== */':
        break
    new_css += line

desktop_css = """
/* ===== LOGO ===== */
.logo img {
    height: 72px;
    width: auto;
    display: block;
}

/* ===== MOCKUP MOBILE: OCULTO EN DESKTOP ===== */
.mockup-mobile {
    display: none;
}

/* ===== HERO BASE (DESKTOP) ===== */
.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    min-height: calc(100vh - 80px);
}

.hero-text {
    flex: 1;
}

.hero-mockup {
    flex: 1;
    display: flex;
    justify-content: center;
}

/* Mockup celular */
.phone-frame {
    width: 260px;
    background: none;
    padding: 0;
    box-shadow: 0 30px 60px rgba(0,0,0,.45);
    display: flex;
    justify-content: center;
}

.phone-frame img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

/* ===== TÍTULOS (Sobreescrituras) ===== */
.title-glitch {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 30px;
}

.line1, .line2 {
    display: block;
}

.line2 {
    color: var(--green);
    font-size: 3.2rem;
    margin-top: 8px;
}

.section-title {
    font-size: 1.6rem;
    line-height: 1.6;
    margin-bottom: 40px;
}

/* ===== SECCIÓN CASOS ===== */
.cases-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
}

.case-card {
    position: relative;
    background: var(--dark);
    border: 3px solid var(--white);
    padding: 25px;
    overflow: hidden;
}

.case-image-wrap {
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
}

.case-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
}

.case-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px 15px;
    font-family: var(--font-term);
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 2px;
    border: 2px solid var(--white);
    z-index: 10;
}

.badge-antes {
    background: var(--red);
    color: var(--black);
}

.badge-despues {
    background: var(--green);
    color: var(--black);
}

/* ===== MENÚ HAMBURGUESA ===== */
.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
}

.hamburger,
.hamburger::before,
.hamburger::after {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: var(--white);
    transition: all 0.3s ease;
    position: relative;
}

.hamburger::before {
    top: -8px;
}

.hamburger::after {
    top: 8px;
}

.menu-toggle.active .hamburger {
    background: transparent;
}

.menu-toggle.active .hamburger::before {
    transform: rotate(45deg);
    top: 0;
}

.menu-toggle.active .hamburger::after {
    transform: rotate(-45deg);
    top: 0;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 992px) {
    .hero {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .contact-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    /* Header & Nav */
    .navbar {
        padding: 10px 0;
    }
    .nav-container {
        flex-direction: column;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .logo img {
        height: 52px;
    }
    
    .menu-toggle {
        display: block;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    
    .nav-menu {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px 0;
        background: var(--blue);
        border-top: 2px solid var(--white);
        margin-top: 10px;
    }
    
    .nav-menu.show {
        display: flex;
    }

    /* Hero */
    .hero {
        flex-direction: column;
        text-align: center;
        gap: 16px;
        padding: 20px 0 40px;
        min-height: auto;
    }
    .hero-mockup,
    .phone-frame {
        display: none;
    }
    .mockup-mobile {
        display: block;
        order: 1;
        width: 100%;
        max-width: 320px;
        margin: 0 auto 10px;
    }
    .mockup-mobile img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 15px 30px rgba(0,0,0,.3);
    }
    .hero-text {
        order: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0;
    }
    .hero-text .btn-primary {
        margin-bottom: 32px;
    }

    /* Typography */
    .title-glitch {
        font-size: 2.5rem;
    }
    .line2 {
        font-size: 1.6rem;
    }
    .subtitle {
        font-size: 1rem;
        display: none;
    }
    .section-title {
        font-size: 2.2rem;
    }

    /* Grids & Layouts */
    .services-grid,
    .cases-grid,
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 0 10px;
    }
    .service-card,
    .case-card,
    .contact-form,
    .contact-info {
        padding: 20px 15px;
        border: 2px solid var(--white);
    }
    .case-image-wrap {
        aspect-ratio: 4/3;
    }
    .case-badge {
        font-size: 0.8rem;
        padding: 5px 12px;
    }

    /* Container Spacing */
    .container {
        padding: 20px 10px;
    }
    .section {
        padding: 30px 0;
        overflow-x: hidden;
    }

    /* Forms & Contact Details */
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        font-size: 1rem;
        margin-bottom: 5px;
    }
    .form-group input,
    .form-group textarea {
        padding: 10px 8px;
        font-size: 0.9rem;
    }
    .btn-submit {
        padding: 15px 10px;
        font-size: 1.1rem;
    }
    .contact-method {
        padding: 15px 10px;
        gap: 10px;
    }
    .method-icon {
        font-size: 1.5rem;
    }
    .method-name {
        font-size: 1.1rem;
    }
    .method-desc {
        font-size: 0.8rem;
    }
    .social-link {
        padding: 15px 10px;
        font-size: 1rem;
        gap: 10px;
    }

    /* Fix Scroll Offset */
    html {
        scroll-padding-top: 0;
    }
    .section {
        scroll-margin-top: 0;
    }
    #inicio {
        padding-top: 120px;
    }

    /* Footer */
    .footer-logo {
        display: none;
    }
    .footer-brand {
        display: block;
    }
    .footer-logo-img {
        height: 36px;
        display: block;
        margin: 0 auto;
    }

    /* WhatsApp button */
    .whatsapp-float {
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 20px 15px;
    }
    .title-glitch {
        font-size: 2rem;
    }
    .line2 {
        font-size: 1.3rem;
    }
    .btn-primary {
        padding: 15px 25px;
        font-size: 1.2rem;
    }
    .term-line {
        font-size: 0.9rem;
    }
}

@media (min-width: 769px) {
    html {
        scroll-padding-top: 80px;
    }
    .section {
        scroll-margin-top: 80px;
    }
    .footer-logo-img {
        display: none;
    }
    .footer-brand {
        display: block;
    }
}
"""

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(new_css + desktop_css)

print("SUCCESS")
