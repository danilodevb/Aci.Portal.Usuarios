/* =========================================================
   Motor de Widgets con Auto-Embalaje (Anti-Espacios Blancos)
   ========================================================= */
let activeWidget = null;
let startX = 0, startY = 0, startW = 0, startH = 0;
let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
const COLS = 12;
const ROW_HEIGHT = 90;
const GAP = 16;

function obtenerEstado() {
    return JSON.parse(localStorage.getItem("acinpro_widget_layout") || "{}");
}

function guardarEstado(idSeccion) {
    const grid = document.getElementById('grid');
    const estado = {};
    Array.from(grid.children).forEach(el => {
        if (el.classList.contains('widget')) {
            const id = el.id.replace('widget-', '');
            estado[id] = {
                col: parseInt(el.dataset.col) || 1,
                row: parseInt(el.dataset.row) || 1,
                colSpan: parseInt(el.dataset.colSpan) || 6,
                rowSpan: parseInt(el.dataset.rowSpan) || 3,
                minimizado: el.classList.contains('minimizado'),
                fijo: el.classList.contains('widget-fijo')
            };
        }
    });
    const global = obtenerEstado();
    global[idSeccion] = estado;
    localStorage.setItem("acinpro_widget_layout", JSON.stringify(global));
}

function renderizarSeccion(idSeccion, widgets) {
    const toolbar = document.getElementById('toolbar');
    const grid = document.getElementById('grid');
    const canvas = document.getElementById('canvas-principal');
    const esDashboard = Boolean(widgets && widgets.length === 1 && widgets[0].dashboard);

    grid.classList.remove('perfil-mode');
    grid.classList.toggle('dashboard-mode', esDashboard);
    if (canvas) canvas.classList.remove('sin-scroll');
    if (canvas) canvas.classList.toggle('dashboard-mode', esDashboard);
    if (toolbar) toolbar.style.display = esDashboard ? 'none' : '';
    toolbar.innerHTML = '<span class="toolbar-label">Acciones disponibles:</span>';
    grid.innerHTML = '';
    grid.style.position = 'relative';

    if (esDashboard) {
        grid.innerHTML = widgets[0].content;
        return;
    }

    if (!widgets || widgets.length === 0) {
        grid.innerHTML = '<div style="text-align:center; padding:50px; color:#5d7d82; border:2px dashed #7ad9d1; border-radius:14px; width:100%;">Selecciona una opción con contenido</div>';
        return;
    }

    const layoutGlobal = obtenerEstado();
    const layoutSeccion = layoutGlobal[idSeccion] || {};

    widgets.forEach(w => {
        const chip = document.createElement('div');
        chip.className = 'draggable-chip';
        chip.textContent = w.title;
        chip.onclick = () => {
            if (!document.getElementById('widget-' + w.id)) {
                insertarWidget(w, idSeccion);
                empacarTodo(idSeccion);
                mostrarToast(`"${w.title}" agregado`);
            } else {
                mostrarToast('Esta herramienta ya está en pantalla');
            }
        };
        toolbar.appendChild(chip);
    });

    widgets.forEach((w, index) => {
        insertarWidget(w, idSeccion, layoutSeccion[w.id], index);
    });

    empacarTodo(idSeccion);
}

function insertarWidget(w, idSeccion, estadoGuardado, indexDefecto = 0) {
    const grid = document.getElementById('grid');
    if (document.getElementById('widget-' + w.id)) return;

    const coincidenciaCol = String(w.size || '').match(/\bw-(\d+)/);
    const coincidenciaFila = String(w.size || '').match(/\bh-(\d+)/);

    const el = document.createElement('div');
    el.className = `widget`;
    el.id = `widget-${w.id}`;
    el.innerHTML = `
        <div class="widget-head">
            <span>${w.title}</span>
            <div class="widget-tools">
                <button class="widget-btn" title="Minimizar" onclick="toggleMinimizar('${w.id}', '${idSeccion}', this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <button class="widget-btn" title="Fijar" onclick="toggleFijo('${w.id}', '${idSeccion}', this)">Fijar</button>
                <button class="widget-btn" title="Cerrar" onclick="eliminarWidget('${w.id}', '${idSeccion}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
        <div class="widget-body">${w.content}</div>
        <div class="widget-resize"></div>
    `;

    let colSpan = Math.max(1, Math.min(COLS,
        estadoGuardado?.colSpan || parseInt(coincidenciaCol?.[1], 10) || 6));
    let col = Math.max(1, Math.min(COLS - colSpan + 1, estadoGuardado?.col || 1));
    let row = Math.max(1, estadoGuardado?.row || 1);
    let rowSpan = Math.max(1, estadoGuardado?.rowSpan || parseInt(coincidenciaFila?.[1], 10) || 3);

    if (estadoGuardado?.minimizado) el.classList.add('minimizado');
    if (estadoGuardado?.fijo) el.classList.add('widget-fijo');

    el.dataset.col = col;
    el.dataset.row = row;
    el.dataset.colSpan = colSpan;
    el.dataset.rowSpan = rowSpan;

    actualizarPosicionCSS(el);
    grid.appendChild(el);
    initDragAndDrop(el, idSeccion);
}

function actualizarPosicionCSS(el) {
    const colSpan = Math.max(1, Math.min(COLS, parseInt(el.dataset.colSpan) || 1));
    const col = Math.max(1, Math.min(COLS - colSpan + 1, parseInt(el.dataset.col) || 1));
    const row = Math.max(1, parseInt(el.dataset.row) || 1);
    const rowSpan = el.classList.contains('minimizado')
        ? 1
        : Math.max(1, parseInt(el.dataset.rowSpan) || 1);

    el.style.gridColumn = `${col} / span ${colSpan}`;
    el.style.gridRow = `${row} / span ${rowSpan}`;
}

/* =========================================================
   ALGORITMO AUTO-PACKING (Evita espacios blancos)
   ========================================================= */
function empacarTodo(idSeccion) {
    const grid = document.getElementById('grid');
    const widgets = Array.from(grid.children).filter(c => c.classList.contains('widget'));

    // Ordenar por fila y columna para mantener la intención del usuario
    widgets.sort((a, b) => {
        const rA = parseInt(a.dataset.row), cA = parseInt(a.dataset.col);
        const rB = parseInt(b.dataset.row), cB = parseInt(b.dataset.col);
        if (rA !== rB) return rA - rB;
        return cA - cB;
    });

    const totalFilas = widgets.reduce((total, widget) => total + obtenerSpanFila(widget), 0);
    const grillaOcupada = Array.from(
        { length: Math.max(100, totalFilas + 1) },
        () => Array(COLS).fill(false)
    );

    widgets.forEach(w => {
        const colSpan = obtenerSpanColumna(w);
        const rowSpan = obtenerSpanFila(w);
        const posicion = buscarPosicionLibre(grillaOcupada, colSpan, rowSpan);
        asignarPosicion(w, posicion.col, posicion.row);
        ocuparPosicion(grillaOcupada, posicion.row, posicion.col, colSpan, rowSpan);
    });

    guardarEstado(idSeccion);
}

function obtenerSpanColumna(widget) {
    return Math.max(1, Math.min(COLS, parseInt(widget.dataset.colSpan) || 1));
}

function obtenerSpanFila(widget) {
    return widget.classList.contains('minimizado')
        ? 1
        : Math.max(1, parseInt(widget.dataset.rowSpan) || 1);
}

function asignarPosicion(widget, col, row) {
    widget.dataset.col = col;
    widget.dataset.row = row;
    actualizarPosicionCSS(widget);
}

function buscarPosicionLibre(grilla, colSpan, rowSpan, filaPreferida = 1, columnaPreferida = 1) {
    const columna = Math.max(1, Math.min(COLS - colSpan + 1, columnaPreferida));
    const fila = Math.max(1, filaPreferida);
    if (estaLibre(grilla, fila, columna, colSpan, rowSpan)) {
        return { col: columna, row: fila };
    }

    for (let row = 1; ; row++) {
        for (let col = 1; col <= COLS - colSpan + 1; col++) {
            if (estaLibre(grilla, row, col, colSpan, rowSpan)) {
                return { col, row };
            }
        }
    }
}

function ocuparPosicion(grilla, row, col, colSpan, rowSpan) {
    for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
            grilla[r][c] = true;
        }
    }
}

function empacarConWidgetAnclado(widgetAnclado, fila, columna, posicionesBase) {
    const grid = document.getElementById('grid');
    const widgets = Array.from(grid.children).filter(el => el.classList.contains('widget'));
    const colSpanAnclado = obtenerSpanColumna(widgetAnclado);
    const rowSpanAnclado = obtenerSpanFila(widgetAnclado);
    const filaAnclada = Math.max(1, fila);
    const columnaAnclada = Math.max(1, Math.min(COLS - colSpanAnclado + 1, columna));
    const totalFilas = widgets.reduce((total, el) => total + obtenerSpanFila(el), 0);
    const grillaOcupada = Array.from(
        { length: Math.max(100, filaAnclada + totalFilas + 1) },
        () => Array(COLS).fill(false)
    );

    asignarPosicion(widgetAnclado, columnaAnclada, filaAnclada);
    ocuparPosicion(grillaOcupada, filaAnclada, columnaAnclada, colSpanAnclado, rowSpanAnclado);

    widgets
        .filter(el => el !== widgetAnclado)
        .sort((a, b) => {
            const posA = posicionesBase.get(a) || { row: parseInt(a.dataset.row) || 1, col: parseInt(a.dataset.col) || 1 };
            const posB = posicionesBase.get(b) || { row: parseInt(b.dataset.row) || 1, col: parseInt(b.dataset.col) || 1 };
            return posA.row - posB.row || posA.col - posB.col;
        })
        .forEach(el => {
            const colSpan = obtenerSpanColumna(el);
            const rowSpan = obtenerSpanFila(el);
            const base = posicionesBase.get(el) || { row: 1, col: 1 };
            const posicion = buscarPosicionLibre(grillaOcupada, colSpan, rowSpan, base.row, base.col);
            asignarPosicion(el, posicion.col, posicion.row);
            ocuparPosicion(grillaOcupada, posicion.row, posicion.col, colSpan, rowSpan);
        });
}

function estaLibre(grilla, row, col, spanX, spanY) {
    for (let r = row; r < row + spanY; r++) {
        for (let c = col; c < col + spanX; c++) {
            if (!grilla[r] || grilla[r][c]) return false;
        }
    }
    return true;
}

function eliminarWidget(id, idSeccion) {
    const el = document.getElementById('widget-' + id);
    if (el) el.remove();
    mostrarToast('Widget cerrado');
    empacarTodo(idSeccion); // Reacomodar los demás
}

function toggleFijo(id, idSeccion, btn) {
    const el = document.getElementById('widget-' + id);
    if (!el) return;
    el.classList.toggle('widget-fijo');
    const fijo = el.classList.contains('widget-fijo');
    btn.textContent = fijo ? 'Anclado' : 'Fijar';
    btn.title = fijo ? 'Liberar widget' : 'Fijar widget';
    mostrarToast(fijo ? 'Widget anclado' : 'Widget liberado');
    guardarEstado(idSeccion);
}

function toggleMinimizar(id, idSeccion, btn) {
    const el = document.getElementById('widget-' + id);
    if (!el) return;
    el.classList.toggle('minimizado');

    if (el.classList.contains('minimizado')) {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        btn.title = "Maximizar";
    } else {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
        btn.title = "Minimizar";
    }
    actualizarPosicionCSS(el);
    empacarTodo(idSeccion);
}

/* =========================================================
   INTERACCIÓN (Arrastrar y Redimensionar)
   ========================================================= */
function initDragAndDrop(w, idSeccion) {
    const head = w.querySelector('.widget-head');
    const resize = w.querySelector('.widget-resize');
    const grid = document.getElementById('grid');

    head.addEventListener('mousedown', (e) => {
        if (e.button !== 0 || isDragging || e.target.closest('.widget-btn')
            || w.classList.contains('minimizado') || w.classList.contains('widget-fijo')) return;

        e.preventDefault();
        const rect = w.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        const posicionesBase = new Map(
            Array.from(grid.children)
                .filter(el => el.classList.contains('widget'))
                .map(el => [el, {
                    col: parseInt(el.dataset.col) || 1,
                    row: parseInt(el.dataset.row) || 1
                }])
        );
        isDragging = true;
        w.classList.add('widget-arrastrando');
        document.body.style.cursor = 'grabbing';

        function onMove(ev) {
            if (!isDragging) return;

            const gridRect = grid.getBoundingClientRect();
            const estilosGrid = getComputedStyle(grid);
            const columnaInicial = parseFloat(estilosGrid.gridTemplateColumns.split(' ')[0]) || gridRect.width / COLS;
            const contenidoIzquierdo = gridRect.left
                + parseFloat(estilosGrid.borderLeftWidth || 0)
                + parseFloat(estilosGrid.paddingLeft || 0);
            const contenidoSuperior = gridRect.top
                + parseFloat(estilosGrid.borderTopWidth || 0)
                + parseFloat(estilosGrid.paddingTop || 0);
            const leftDeseado = ev.clientX - dragOffsetX;
            const topDeseado = ev.clientY - dragOffsetY;
            const newCol = Math.max(1, Math.min(
                COLS - obtenerSpanColumna(w) + 1,
                Math.floor((leftDeseado - contenidoIzquierdo + GAP / 2) / (columnaInicial + GAP)) + 1
            ));
            const newRow = Math.max(1,
                Math.floor((topDeseado - contenidoSuperior + GAP / 2) / (ROW_HEIGHT + GAP)) + 1);

            if (newCol !== parseInt(w.dataset.col) || newRow !== parseInt(w.dataset.row)) {
                empacarConWidgetAnclado(w, newRow, newCol, posicionesBase);
            }
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            if (!isDragging) return;

            isDragging = false;
            w.classList.remove('widget-arrastrando');
            document.body.style.cursor = '';
            guardarEstado(idSeccion);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    resize.addEventListener('mousedown', (e) => {
        if (w.classList.contains('widget-fijo')) return;
        e.preventDefault(); e.stopPropagation();

        startX = e.clientX;
        startY = e.clientY;
        const rect = w.getBoundingClientRect();
        startW = rect.width;
        startH = rect.height;
        const filaInicial = parseInt(w.dataset.row) || 1;
        const columnaInicial = parseInt(w.dataset.col) || 1;
        const posicionesBase = new Map(
            Array.from(grid.children)
                .filter(el => el.classList.contains('widget'))
                .map(el => [el, {
                    col: parseInt(el.dataset.col) || 1,
                    row: parseInt(el.dataset.row) || 1
                }])
        );
        w.classList.add('widget-arrastrando');

        function onMove(ev) {
            const deltaX = ev.clientX - startX;
            const deltaY = ev.clientY - startY;
            const gridRect = grid.getBoundingClientRect();
            const estilosGrid = getComputedStyle(grid);
            const cellW = parseFloat(estilosGrid.gridTemplateColumns.split(' ')[0]) || gridRect.width / COLS;
            const maxColSpan = COLS - columnaInicial + 1;
            const minColSpan = Math.min(maxColSpan, Math.max(1, Math.ceil((200 + GAP) / (cellW + GAP))));
            const colSpan = Math.max(minColSpan, Math.min(
                maxColSpan,
                Math.round((startW + deltaX + GAP) / (cellW + GAP))
            ));
            const rowSpan = Math.max(1, Math.round((startH + deltaY + GAP) / (ROW_HEIGHT + GAP)));

            w.dataset.colSpan = colSpan;
            w.dataset.rowSpan = rowSpan;
            empacarConWidgetAnclado(w, filaInicial, columnaInicial, posicionesBase);
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            w.classList.remove('widget-arrastrando');
            guardarEstado(idSeccion);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

// Utilidades
function mostrarToast(mensaje) {
    const toast = document.createElement('div');
    toast.className = 'toast visible';
    toast.innerHTML = `<div class="toast-icono">✓</div><div class="toast-texto"><strong>${mensaje}</strong></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove('visible'), 3000);
    setTimeout(() => toast.remove(), 3500);
}

window.abrirModal = function (contenido) {
    document.querySelectorAll('.perfil-modal-overlay').forEach(el => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'perfil-modal-overlay';
    overlay.innerHTML = `<div class="perfil-modal">${contenido}</div>`;
    overlay.addEventListener('click', event => {
        if (event.target === overlay) cerrarModal();
    });
    document.body.appendChild(overlay);
};

window.cerrarModal = function () {
    document.querySelectorAll('.perfil-modal-overlay').forEach(el => el.remove());
};

window.abrirModalRenovar = function (doc) {
    abrirModal(`
        <h3>Renovar documento</h3>
        <p style="font-size:12px;margin-bottom:12px;">Documento: <b>${doc}</b></p>
        <label class="wf-label">Archivo PDF</label><input type="file" class="wf-input">
        <label class="wf-label">Fecha de expedición</label><input type="date" class="wf-input">
        <label class="wf-label">Fecha de vencimiento</label><input type="date" class="wf-input">
        <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarModal()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="cerrarModal(); mostrarToast('${doc} renovado correctamente')">Radicar renovación</button></div>
    `);
};

window.abrirModalCotizar = function (codigo) {
    abrirModal(`
        <h3>Cotizar ${codigo}</h3>
        <div class="perfil-seccion"><p><b>Objeto:</b> Suministro de equipos de audio profesional</p><p><b>Cierre:</b> 28/11/2025</p><p><b>Condiciones:</b> Entrega en Bogotá, garantía mínima de 12 meses.</p></div>
        <label class="wf-label">Valor de la oferta (COP)</label><input type="number" class="wf-input" placeholder="0">
        <label class="wf-label">Plazo de entrega (días)</label><input type="number" class="wf-input" placeholder="15">
        <label class="wf-label">Propuesta técnica (PDF)</label><input type="file" class="wf-input">
        <label class="wf-label">Propuesta económica (PDF / XLSX)</label><input type="file" class="wf-input">
        <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarModal()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="cerrarModal(); mostrarToast('Propuesta enviada para ${codigo}')">Enviar propuesta</button></div>
    `);
};

window.abrirModalFirmar = function (tipo, codigo) {
    abrirModal(`
        <h3>${tipo}</h3>
        <p style="font-size:12px;margin-bottom:12px;">Documento: <b>${codigo}</b></p>
        <div class="perfil-seccion"><p><b>Objeto:</b> Suministro de equipos de audio</p><p><b>Valor:</b> $12.500.000</p><p><b>Plazo:</b> 30 días calendario</p><p><b>Supervisor:</b> Área de Compras ACINPRO</p></div>
        <label class="perfil-check"><input type="checkbox"> Acepto las condiciones y autorizo la firma electrónica.</label>
        <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarModal()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="cerrarModal(); mostrarToast('${codigo} firmado y aceptado correctamente')">Firmar / Aceptar</button></div>
    `);
};

window.abrirModalCorregir = function (radicado) {
    abrirModal(`
        <h3>Corregir radicado ${radicado}</h3>
        <div class="perfil-seccion"><p><b>Motivo de devolución:</b> El documento no coincide con el valor de la orden de compra.</p></div>
        <label class="wf-label">Documento corregido</label><input type="file" class="wf-input">
        <label class="wf-label">Observación para contabilidad</label><textarea class="wf-input" rows="2" placeholder="Describe la corrección realizada"></textarea>
        <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarModal()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="cerrarModal(); mostrarToast('${radicado} corregido y radicado nuevamente')">Volver a radicar</button></div>
    `);
};

window.abrirModalDetalleRadicado = function (radicado) {
    abrirModal(`
        <h3>Detalle del radicado</h3>
        <p style="font-size:12px;margin-bottom:12px;">Radicado: <b>${radicado}</b></p>
        <table class="wf-table"><tr><th>Estado</th><th>Fecha</th><th>Observación</th></tr><tr><td>Radicado</td><td>02/11/2025</td><td>Documentos recibidos</td></tr><tr><td>En revisión contable</td><td>05/11/2025</td><td>Validación de soportes</td></tr><tr><td>Aprobado para pago</td><td>10/11/2025</td><td>Programado en tesorería</td></tr></table>
        <div class="perfil-acciones"><button class="wf-btn wf-btn-primary" onclick="cerrarModal()">Cerrar</button></div>
    `);
};

window.abrirModalDescuento = function (radicado) {
    abrirModal(`
        <h3>Detalle de descuentos</h3>
        <p style="font-size:12px;margin-bottom:12px;">Radicado: <b>${radicado}</b></p>
        <table class="wf-table"><tr><th>Concepto</th><th>Base</th><th>Tarifa</th><th>Valor</th></tr><tr><td>ReteFuente</td><td>$6.800.000</td><td>2%</td><td>-$136.000</td></tr><tr><td>ReteIVA</td><td>$0</td><td>0%</td><td>$0</td></tr><tr><td>ReteICA</td><td>$6.800.000</td><td>0.9%</td><td>-$61.200</td></tr></table>
        <p style="font-size:12px;margin-top:10px;"><b>Neto pagado:</b> $6.602.800</p>
        <div class="perfil-acciones"><button class="wf-btn wf-btn-primary" onclick="cerrarModal()">Cerrar</button></div>
    `);
};

window.inicializarOjosContrasena = function (contenedor) {
    const raiz = contenedor || document;
    raiz.querySelectorAll('input[type="password"]').forEach(input => {
        if (input.dataset.ojoInicializado === "true" || input.closest('.password-field-wrapper')) return;
        input.dataset.ojoInicializado = "true";

        const wrapper = document.createElement('div');
        wrapper.className = 'password-field-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'password-toggle';
        boton.setAttribute('aria-label', 'Mostrar contraseña');
        boton.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        boton.addEventListener('click', () => {
            const visible = input.type === 'text';
            input.type = visible ? 'password' : 'text';
            boton.classList.toggle('activo', !visible);
            boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
            boton.innerHTML = visible
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
        });
        wrapper.appendChild(boton);
    });
};

window.toggleFormaRadicado = function (tipo) {
    const juridica = document.getElementById('form-radicado-juridica');
    const natural = document.getElementById('form-radicado-natural');
    if (juridica) juridica.style.display = tipo === 'juridica' ? '' : 'none';
    if (natural) natural.style.display = tipo === 'natural' ? '' : 'none';
};

window.modoPerfil = window.modoPerfil || function (activo) {
    const canvas = document.getElementById('canvas-principal');
    const toolbar = document.getElementById('toolbar');
    if (canvas) canvas.classList.toggle('sin-scroll', activo);
    if (toolbar) toolbar.style.display = activo ? 'none' : '';
};

window.ajustarPerfil = window.ajustarPerfil || function () {
    const canvas = document.getElementById('canvas-principal');
    const pagina = document.querySelector('#grid .perfil-page');
    if (!canvas || !pagina || !canvas.clientHeight) return;
    pagina.style.zoom = 1;
    pagina.style.height = 'auto';
    if (window.innerWidth <= 700) return;

    const estilos = getComputedStyle(canvas);
    const disponible = canvas.clientHeight
        - parseFloat(estilos.paddingTop)
        - parseFloat(estilos.paddingBottom)
        - 4;
    const alto = pagina.offsetHeight;
    if (alto > disponible && disponible > 0) pagina.style.zoom = disponible / alto;
};
window.addEventListener('resize', window.ajustarPerfil);

window.mostrarTabPerfil = window.mostrarTabPerfil || function (tab, boton) {
    document.querySelectorAll('.perfil-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.perfil-tab-content').forEach(el => el.classList.remove('active'));
    boton.classList.add('active');
    const contenido = document.getElementById('perfil-tab-' + tab);
    if (contenido) contenido.classList.add('active');
    window.ajustarPerfil();
};

window.abrirPerfil = window.abrirPerfil || function () {
    const sesionActual = JSON.parse(localStorage.getItem('acinpro_sesion') || '{}');
    const tipo = (sesionActual.tipoUsuario || 'Empleado').toString();
    const esProveedor = /Proveedor/i.test(tipo);
    const esMixto = /Artista/i.test(tipo) && /Productor/i.test(tipo);
    const roles = sesionActual.rol === 'admin'
        ? ['Administrador', 'Empleado']
        : esMixto ? ['Artista', 'Productor'] : [esProveedor ? 'Proveedor' : tipo];
    const chips = roles.map(rol => `<span class="perfil-chip">${rol}</span>`).join('');
    const identidad = esProveedor ? `
        <div class="perfil-grid cols-3">
            <div><label class="wf-label">Razón social</label><input class="wf-input" value="Suministros Musicales ABC S.A.S."></div>
            <div><label class="wf-label">NIT</label><input class="wf-input" value="900.123.456-7"></div>
            <div><label class="wf-label">Representante legal</label><input class="wf-input" value="${sesionActual.nombre || ''}"></div>
            <div><label class="wf-label">Correo corporativo</label><input class="wf-input" value="${sesionActual.correo || ''}"></div>
            <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 601 555 1234"></div>
            <div><label class="wf-label">Dirección</label><input class="wf-input" value="Calle 100 # 15-20, Bogotá"></div>
        </div>` : `
        <div class="perfil-grid cols-4">
            <div><label class="wf-label">Nombres</label><input class="wf-input" value="${sesionActual.nombre || ''}"></div>
            <div><label class="wf-label">Apellidos</label><input class="wf-input" value="Bermúdez Ruiz"></div>
            <div><label class="wf-label">Tipo de documento</label><select class="wf-input"><option>CC</option><option>CE</option><option>Pasaporte</option></select></div>
            <div><label class="wf-label">Número de documento</label><input class="wf-input" value="1.020.304.050"></div>
            <div><label class="wf-label">Fecha de nacimiento</label><input type="date" class="wf-input" value="1990-05-14"></div>
            <div><label class="wf-label">Correo electrónico</label><input class="wf-input" value="${sesionActual.correo || ''}"></div>
            <div><label class="wf-label">Teléfono</label><input class="wf-input" value="+57 300 000 0000"></div>
            <div><label class="wf-label">Dirección</label><input class="wf-input" value="Carrera 45 # 22-10, Bogotá"></div>
        </div>`;
    const banco = esMixto ? `
        <div class="perfil-cuenta-compartida"><label><input type="checkbox"> Usar la misma cuenta bancaria para regalías y facturación</label></div>
        <div class="perfil-columnas cols-2">
            ${bloqueBancoSimple('Cuenta para regalías y anticipos (Artista)', sesionActual.nombre)}
            ${bloqueBancoSimple('Cuenta para pagos de facturación (Productor)', sesionActual.nombre)}
        </div>` : bloqueBancoSimple(esProveedor ? 'Cuenta para pagos de facturas' : sesionActual.rol === 'admin' ? 'Cuenta de nómina' : 'Cuenta bancaria', esProveedor ? 'Suministros Musicales ABC S.A.S.' : sesionActual.nombre, 'cols-4');

    const grid = document.getElementById('grid');
    grid.className = 'widget-grid perfil-mode';
    grid.innerHTML = `
        <div class="perfil-page">
            <div class="perfil-encabezado"><h3>Mi perfil</h3><div class="perfil-roles">${chips}</div></div>
            <div class="perfil-tabs">
                <button class="perfil-tab active" onclick="mostrarTabPerfil('personal', this)">Información personal</button>
                <button class="perfil-tab" onclick="mostrarTabPerfil('bancaria', this)">Información bancaria</button>
                <button class="perfil-tab" onclick="mostrarTabPerfil('cuenta', this)">Ajustes de cuenta</button>
            </div>
            <div class="perfil-tab-content active" id="perfil-tab-personal">
                <div class="perfil-seccion"><h4>Datos de identificación</h4>${identidad}</div>
                <div class="perfil-seccion"><h4>Roles y permisos</h4><div class="perfil-roles">Roles activos en el portal: ${chips}</div></div>
                <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Información personal actualizada')">Guardar cambios</button></div>
            </div>
            <div class="perfil-tab-content" id="perfil-tab-bancaria">${banco}<div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Información bancaria actualizada')">Guardar cambios</button></div></div>
            <div class="perfil-tab-content" id="perfil-tab-cuenta">
                <div class="perfil-columnas cols-3">
                    <div class="perfil-seccion"><h4>Seguridad</h4><label class="wf-label">Contraseña actual</label><input type="password" class="wf-input"><label class="wf-label">Nueva contraseña</label><input type="password" class="wf-input"><label class="wf-label">Confirmar nueva contraseña</label><input type="password" class="wf-input"><label class="perfil-check"><input type="checkbox" checked> Autenticación en dos pasos (2FA)</label></div>
                    <div class="perfil-seccion"><h4>Notificaciones</h4><label class="perfil-check"><input type="checkbox" checked> Correo electrónico</label><label class="perfil-check"><input type="checkbox"> SMS</label><label class="perfil-check"><input type="checkbox" checked> Notificaciones en el portal</label></div>
                    <div class="perfil-seccion"><h4>Preferencias</h4><label class="wf-label">Idioma</label><select class="wf-input"><option>Español</option><option>Inglés</option></select><label class="wf-label">Zona horaria</label><select class="wf-input"><option>(GMT-5) Bogotá</option></select></div>
                </div>
                <div class="perfil-acciones"><button class="wf-btn" onclick="cerrarPerfil()">Cancelar</button><button class="wf-btn wf-btn-primary" onclick="mostrarToast('Ajustes de cuenta guardados')">Guardar cambios</button></div>
            </div>
        </div>`;
    document.getElementById('breadcrumb-title').textContent = 'Mi perfil';
    inicializarOjosContrasena(document.getElementById('grid'));
    modoPerfil(true);
    window.ajustarPerfil();
};

function bloqueBancoSimple(titulo, titular, columnas = '') {
    return `<div class="perfil-seccion"><h4>${titulo}</h4><div class="perfil-grid ${columnas}"><div><label class="wf-label">Banco</label><select class="wf-input"><option>Bancolombia</option><option>Davivienda</option><option>BBVA Colombia</option><option>Banco de Bogotá</option><option>Banco Popular</option></select></div><div><label class="wf-label">Tipo de cuenta</label><select class="wf-input"><option>Ahorros</option><option>Corriente</option></select></div><div><label class="wf-label">Número de cuenta</label><input class="wf-input" value="**** **** **** 4821"></div><div><label class="wf-label">Titular</label><input class="wf-input" value="${titular || ''}"></div></div><label class="wf-label">Certificación bancaria (PDF, no mayor a 30 días)</label><div class="perfil-fila"><input type="file" class="wf-input"><button class="wf-btn" onclick="mostrarToast('Certificación bancaria actualizada')">Subir</button></div></div>`;
}

window.cerrarPerfil = window.cerrarPerfil || function () {
    const grid = document.getElementById('grid');
    modoPerfil(false);
    grid.className = 'widget-grid';
    grid.innerHTML = '<div style="grid-column:span 12;text-align:center;padding:50px;color:#5d7d82;border:2px dashed #7ad9d1;border-radius:14px;">Mi perfil cerrado. Selecciona una opción del menú lateral.</div>';
    document.getElementById('breadcrumb-title').textContent = 'Inicio';
};

function filtrarMenu(texto) {
    const term = texto.toLowerCase().trim();
    const allItems = document.querySelectorAll('.nav-grupo-header, .nav-submenu-item, .admin-nav-item');

    if (term === '') {
        allItems.forEach(el => el.style.display = '');
        document.querySelectorAll('.nav-submenu').forEach(el => el.classList.remove('open'));
        return;
    }

    allItems.forEach(el => {
        const label = el.textContent.replace('+', '').replace('-', '').trim().toLowerCase();
        if (label.includes(term)) {
            el.style.display = 'flex';
            let parent = el.closest('.nav-submenu');
            if (parent) {
                parent.classList.add('open');
                if (parent.previousElementSibling) parent.previousElementSibling.querySelector('.toggle').textContent = '-';
            }
        } else {
            el.style.display = 'none';
        }
    });
}

window.inicializarNotificaciones = function () {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo || document.getElementById("btnNotif")) return;

    const notifHTML = `
        <div class="notif-wrapper">
            <button class="notif-btn" id="btnNotif" title="Notificaciones">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span class="notif-badge">3</span>
            </button>
            <div class="notif-dropdown" id="notifDropdown">
                <div class="notif-header">Notificaciones</div>
                    <button class="notif-item" type="button" onclick="mostrarToast('Nuevo usuario registrado')">Nuevo usuario registrado</button>
                    <button class="notif-item" type="button" onclick="mostrarToast('Solicitud aprobada')">Solicitud aprobada</button>
                    <button class="notif-item" type="button" onclick="mostrarToast('Documento actualizado')">Documento actualizado</button>
            </div>
        </div>
    `;
    userInfo.insertAdjacentHTML('afterbegin', notifHTML);

    const btnNotif = document.getElementById("btnNotif");
    const notifDropdown = document.getElementById("notifDropdown");

    btnNotif.addEventListener("click", (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => notifDropdown.classList.remove("show"));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") notifDropdown.classList.remove("show");
    });
};