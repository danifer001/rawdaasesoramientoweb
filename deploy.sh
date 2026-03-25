#!/bin/bash
# =============================================
# deploy.sh - Sincroniza GitHub con el VPS
# rawDA Asesoramiento Web
# Uso: bash deploy.sh
# =============================================

REPO="https://raw.githubusercontent.com/danifer001/rawdaasesoramientoweb/main"
WEB_ROOT="/var/www/rawdaasesoramientoweb/html"

echo "🚀 Iniciando sincronización con GitHub..."

# --- Archivos principales ---
echo "📄 Actualizando archivos principales..."
wget -q -O "$WEB_ROOT/index.html"       "$REPO/index.html"
wget -q -O "$WEB_ROOT/css/styles.css"   "$REPO/css/styles.css"
wget -q -O "$WEB_ROOT/css/animations.css" "$REPO/css/animations.css"
wget -q -O "$WEB_ROOT/js/main.js"       "$REPO/js/main.js"

# --- Imágenes ---
echo "🖼️  Actualizando imágenes..."
wget -q -O "$WEB_ROOT/img/logo-rawda4.png"          "$REPO/img/logo-rawda4.png"
wget -q -O "$WEB_ROOT/img/mockup-landing.png"        "$REPO/img/mockup-landing.png"
wget -q -O "$WEB_ROOT/img/mockup-responsive.jpg"     "$REPO/img/mockup-responsive.jpg"
wget -q -O "$WEB_ROOT/img/feriaverde.png"            "$REPO/img/feriaverde.png"
wget -q -O "$WEB_ROOT/img/feriaverdeinicioia.png"    "$REPO/img/feriaverdeinicioia.png"

echo "✅ ¡Sincronización completa!"
echo "🌐 Sitio actualizado en: https://www.rawdaasesoramientoweb.net.ar"
