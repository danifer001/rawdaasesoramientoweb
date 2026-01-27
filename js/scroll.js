// Scroll snapping mejorado
class ScrollManager {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        // Scroll con rueda
        window.addEventListener('wheel', (e) => this.handleWheel(e));
        
        // Scroll con teclas
        window.addEventListener('keydown', (e) => this.handleKeys(e));
    }
    
    handleWheel(e) {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
            this.currentSection++;
        } else if (e.deltaY < 0 && this.currentSection > 0) {
            this.currentSection--;
        }
        
        this.scrollToCurrent();
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }
    
    handleKeys(e) {
        if (e.key === 'ArrowDown' && this.currentSection < this.sections.length - 1) {
            e.preventDefault();
            this.currentSection++;
            this.scrollToCurrent();
        } else if (e.key === 'ArrowUp' && this.currentSection > 0) {
            e.preventDefault();
            this.currentSection--;
            this.scrollToCurrent();
        }
    }
    
    scrollToCurrent() {
        this.sections[this.currentSection].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicializar
let scrollManager;
document.addEventListener('DOMContentLoaded', () => {
    scrollManager = new ScrollManager();
});