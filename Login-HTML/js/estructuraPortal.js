window.ESTRUCTURA_PORTAL = {
  "admin": {
    "title": "Administrador",
    "menu": [
      {
        "id": "social",
        "label": "Social",
        "icono": "users",
        "children": [
          {
            "id": "social_admin",
            "label": "Administrar",
            "children": [
              {
                "id": "adm_afiliados",
                "label": "Administrar Afiliados",
                "widgets": [
                  {
                    "id": "w_adm_af",
                    "title": "Afiliados",
                    "size": "w-6 h-3",
                    "content": "<table class=\"wf-table\"><tr><th>Nombre</th><th>Estado</th></tr><tr><td>Juan Pérez</td><td>Activo</td></tr></table>"
                  }
                ]
              },
              {
                "id": "adm_aseguradoras",
                "label": "Administrar Aseguradoras",
                "widgets": [
                  {
                    "id": "w_adm_as",
                    "title": "Aseguradoras",
                    "size": "w-6 h-3",
                    "content": "<table class=\"wf-table\"><tr><th>Nombre</th><th>NIT</th></tr><tr><td>Seguros SAS</td><td>900.123.456</td></tr></table>"
                  }
                ]
              }
            ]
          },
          {
            "id": "social_gestion",
            "label": "Gestión",
            "children": [
              {
                "id": "gest_afiliaciones",
                "label": "Afiliaciones",
                "widgets": [
                  {
                    "id": "w_ges_af",
                    "title": "Nuevas Afiliaciones",
                    "size": "w-12 h-3",
                    "content": "<table class=\"wf-table\"><tr><th>Solicitante</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr><tr><td>María López</td><td>Hoy</td><td>Pendiente</td><td><button class=\"wf-btn\">Aprobar</button></td></tr></table>"
                  }
                ]
              },
              {
                "id": "gest_domiciliaria",
                "label": "Gestión Atención Domiciliaria",
                "widgets": [
                  {
                    "id": "w_ges_dom",
                    "title": "Atención Domiciliaria",
                    "size": "w-6 h-4",
                    "content": "<p>Solicitudes de visita domiciliaria.</p><button class=\"wf-btn wf-btn-primary\">Nueva Solicitud</button>"
                  }
                ]
              },
              {
                "id": "consulta_afiliados",
                "label": "Consulta Afiliados",
                "widgets": [
                  {
                    "id": "w_cons_af",
                    "title": "Consultar Afiliado",
                    "size": "w-12 h-3",
                    "content": "<label class=\"wf-label\">Documento</label><input type=\"text\" class=\"wf-input\" placeholder=\"Ingrese ID\"><button class=\"wf-btn wf-btn-primary\">Buscar</button>"
                  }
                ]
              }
            ]
          },
          {
            "id": "social_seguimiento",
            "label": "Seguimiento",
            "children": [
              {
                "id": "seg_casos",
                "label": "Seguimiento de Casos",
                "widgets": [
                  {
                    "id": "w_seg_cas",
                    "title": "Casos Activos",
                    "size": "w-8 h-4",
                    "content": "<table class=\"wf-table\"><tr><th>Caso</th><th>Estado</th></tr><tr><td>#1024</td><td>En Proceso</td></tr></table>"
                  }
                ]
              },
              {
                "id": "seg_reportes",
                "label": "Reportes de Seguimiento",
                "widgets": [
                  {
                    "id": "w_seg_rep",
                    "title": "Reportes",
                    "size": "w-6 h-3",
                    "content": "<button class=\"wf-btn wf-btn-primary\">Generar Reporte PDF</button>"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "usuarios",
        "label": "Gestión de Usuarios",
        "icono": "users",
        "widgets": [
          {
            "id": "w_users",
            "title": "Listado Usuarios",
            "size": "w-12 h-4",
            "content": "<table class=\"wf-table\"><tr><th>Usuario</th><th>Rol</th><th>Acciones</th></tr><tr><td>Carlos B.</td><td>Productor</td><td><button class=\"wf-btn\">Editar</button></td></tr></table>"
          }
        ]
      },
      {
        "id": "reportes",
        "label": "Reportes del Sistema",
        "icono": "chart",
        "widgets": [
          {
            "id": "w_rep_sys",
            "title": "Reportes",
            "size": "w-12 h-4",
            "content": "<p>Estadísticas generales.</p>"
          }
        ]
      },
      {
        "id": "configuracion",
        "label": "Configuración Global",
        "icono": "check",
        "widgets": [
          {
            "id": "w_config",
            "title": "Configuración",
            "size": "w-12 h-4",
            "content": "<p>Parámetros del sistema.</p>"
          }
        ]
      },
      {
        "id": "auditoria",
        "label": "Auditoría",
        "icono": "doc",
        "widgets": [
          {
            "id": "w_audit",
            "title": "Logs de Auditoría",
            "size": "w-12 h-4",
            "content": "<p>Historial de acciones.</p>"
          }
        ]
      },
      {
        "id": "seguridad",
        "label": "Seguridad",
        "icono": "check",
        "widgets": [
          {
            "id": "w_seg",
            "title": "Seguridad",
            "size": "w-12 h-4",
            "content": "<p>Roles y permisos.</p>"
          }
        ]
      },
      {
        "id": "respaldos",
        "label": "Respaldos",
        "icono": "grid",
        "widgets": [
          {
            "id": "w_back",
            "title": "Respaldos",
            "size": "w-12 h-4",
            "content": "<p>Copias de seguridad.</p>"
          }
        ]
      }
    ]
  },
  "empleado": {
    "title": "Empleado",
    "menu": [
      {
        "id": "nomina",
        "label": "Nómina y Pagos",
        "icono": "money",
        "children": [
          {
            "id": "colillas",
            "label": "Colillas de Pago",
            "widgets": [
              {
                "id": "w_colillas",
                "title": "Colillas de Pago",
                "size": "w-12 h-3",
                "content": "<table class=\"wf-table\"><tr><th>Mes</th><th>Acción</th></tr><tr><td>Octubre 2023</td><td><button class=\"wf-btn\">Descargar</button></td></tr></table>"
              }
            ]
          },
          {
            "id": "certificados",
            "label": "Certificados",
            "widgets": [
              {
                "id": "w_cert_fin",
                "title": "Certificados Financieros",
                "size": "w-12 h-3",
                "content": "<table class=\"wf-table\"><tr><th>Documento</th><th>Acción</th></tr><tr><td>Retención Fuente</td><td><button class=\"wf-btn\">Descargar</button></td></tr></table>"
              }
            ]
          }
        ]
      },
      {
        "id": "solicitudes",
        "label": "Solicitudes",
        "icono": "doc",
        "children": [
          {
            "id": "prestamos",
            "label": "Solicitudes Préstamos",
            "widgets": [
              {
                "id": "w_prest",
                "title": "Préstamos",
                "size": "w-6 h-4",
                "content": "<label class=\"wf-label\">Monto</label><input type=\"number\" class=\"wf-input\"><button class=\"wf-btn wf-btn-primary\">Solicitar</button>"
              }
            ]
          },
          {
            "id": "vacaciones",
            "label": "Solicitud Vacaciones",
            "widgets": [
              {
                "id": "w_vac",
                "title": "Vacaciones",
                "size": "w-6 h-4",
                "content": "<label class=\"wf-label\">Fecha Inicio</label><input type=\"date\" class=\"wf-input\"><button class=\"wf-btn wf-btn-primary\">Enviar</button>"
              }
            ]
          },
          {
            "id": "recibos",
            "label": "Recibos de Caja",
            "widgets": [
              {
                "id": "w_recibos",
                "title": "Recibos",
                "size": "w-6 h-4",
                "content": "<p>Consulta tus recibos emitidos.</p>"
              }
            ]
          }
        ]
      },
      {
        "id": "documentos",
        "label": "Radicación de Documentos",
        "icono": "doc",
        "widgets": [
          {
            "id": "w_rad_doc",
            "title": "Radicar Documento",
            "size": "w-12 h-3",
            "content": "<input type=\"file\" class=\"wf-input\"><button class=\"wf-btn wf-btn-primary\">Subir</button>"
          }
        ]
      },
      {
        "id": "capacitaciones",
        "label": "Capacitaciones",
        "icono": "check",
        "widgets": [
          {
            "id": "w_capacit",
            "title": "Cursos Disponibles",
            "size": "w-12 h-3",
            "content": "<p>Ingresa a los cursos internos.</p>"
          }
        ]
      },
      {
        "id": "directorio",
        "label": "Directorio Interno",
        "icono": "users",
        "widgets": [
          {
            "id": "w_directorio",
            "title": "Directorio",
            "size": "w-12 h-3",
            "content": "<table class=\"wf-table\"><tr><th>Área</th><th>Extensión</th></tr><tr><td>RRHH</td><td>102</td></tr></table>"
          }
        ]
      },
      {
        "id": "ayuda",
        "label": "Centro de Ayuda",
        "icono": "check",
        "widgets": [
          {
            "id": "w_ayuda_emp",
            "title": "Soporte",
            "size": "w-12 h-3",
            "content": "<p>Contacta al equipo de soporte.</p>"
          }
        ]
      }
    ]
  },
  "artista": {
    "title": "Artista",
    "menu": [
      {
        "id": "economico",
        "label": "Gestión Económica",
        "icono": "money",
        "children": [
          {
            "id": "anticipos",
            "label": "Anticipos y Auxilios",
            "widgets": [
              {
                "id": "w_antic",
                "title": "Solicitar Anticipo",
                "size": "w-6 h-4",
                "content": "\n                            <label class=\"wf-label\">Monto solicitado (COP)</label>\n                            <input type=\"number\" class=\"wf-input\" placeholder=\"0\">\n                            <label class=\"wf-label\">Motivo</label>\n                            <textarea class=\"wf-input\" rows=\"2\" placeholder=\"Describe el motivo de la solicitud\"></textarea>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de anticipo enviada')\">Solicitar</button>"
              }
            ]
          },
          {
            "id": "regalias",
            "label": "Recaudo de Regalías",
            "widgets": [
              {
                "id": "w_regalias",
                "title": "Regalías",
                "size": "w-6 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Periodo</th><th>Valor</th><th>Estado</th></tr>\n                                <tr><td>Oct 2025</td><td>$1.250.000</td><td>Pagado</td></tr>\n                                <tr><td>Sep 2025</td><td>$980.000</td><td>Pagado</td></tr>\n                            </table>\n                            <button class=\"wf-btn\" style=\"margin-top:10px;\" onclick=\"mostrarToast('Certificado de regalías generado')\">Descargar certificado</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "musical",
        "label": "Gestión Musical",
        "icono": "doc",
        "children": [
          {
            "id": "obras",
            "label": "Registro de Obras",
            "widgets": [
              {
                "id": "w_obras",
                "title": "Registrar Obra",
                "size": "w-6 h-4",
                "content": "\n                            <label class=\"wf-label\">Nombre de la obra</label>\n                            <input type=\"text\" class=\"wf-input\">\n                            <label class=\"wf-label\">Género</label>\n                            <input type=\"text\" class=\"wf-input\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Obra registrada correctamente')\">Registrar</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "servicios",
        "label": "Servicios Activos",
        "icono": "check",
        "widgets": [
          {
            "id": "w_serv",
            "title": "Servicios",
            "size": "w-12 h-3",
            "content": "\n                    <ul style=\"padding-left:18px; font-size:12px; line-height:1.8;\">\n                        <li>Registro Musical</li>\n                        <li>Recaudo de Regalías</li>\n                        <li>Anticipos y Auxilios</li>\n                    </ul>"
          }
        ]
      },
      {
        "id": "perfil",
        "label": "Mi Perfil Artístico",
        "icono": "users",
        "widgets": [
          {
            "id": "w_perfil_art",
            "title": "Perfil",
            "size": "w-12 h-3",
            "content": "\n                    <p style=\"font-size:12px; margin-bottom:10px;\">Actualiza tu información artística, biografía y fotografías.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"abrirPerfil()\">Abrir mi perfil</button>"
          }
        ]
      },
      {
        "id": "eventos",
        "label": "Eventos y Convocatorias",
        "icono": "chart",
        "widgets": [
          {
            "id": "w_eventos",
            "title": "Convocatorias",
            "size": "w-12 h-3",
            "content": "\n                    <table class=\"wf-table\">\n                        <tr><th>Evento</th><th>Cierre</th><th>Acción</th></tr>\n                        <tr><td>Festival Nacional</td><td>30 Nov</td><td><button class=\"wf-btn\" onclick=\"mostrarToast('Postulación registrada')\">Postularme</button></td></tr>\n                    </table>"
          }
        ]
      },
      {
        "id": "soporte",
        "label": "Soporte Técnico",
        "icono": "check",
        "widgets": [
          {
            "id": "w_sop_art",
            "title": "Ayuda",
            "size": "w-12 h-3",
            "content": "\n                    <p style=\"margin-bottom:10px;\">Abre un ticket de soporte.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Ticket de soporte creado')\">Nuevo ticket</button>"
          }
        ]
      }
    ]
  },
  "productor": {
    "title": "Productor",
    "menu": [
      {
        "id": "tramites",
        "label": "Trámites y Acreditaciones",
        "icono": "check",
        "children": [
          {
            "id": "trazabilidad",
            "label": "Trazabilidad de Trámites",
            "widgets": [
              {
                "id": "w_traz",
                "title": "Estado de Trámites",
                "size": "w-12 h-3",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Trámite</th><th>Estado</th></tr>\n                                <tr><td>Acreditación #1024</td><td>En Proceso</td></tr>\n                            </table>"
              }
            ]
          },
          {
            "id": "acreditaciones",
            "label": "Registro de Acreditaciones",
            "widgets": [
              {
                "id": "w_acred",
                "title": "Registrar Acreditación",
                "size": "w-6 h-4",
                "content": "\n                            <input type=\"text\" class=\"wf-input\" placeholder=\"Nombre de la obra\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Acreditación registrada')\">Registrar</button>"
              }
            ]
          },
          {
            "id": "documentos",
            "label": "Actualizar Documentos",
            "widgets": [
              {
                "id": "w_docs_prod",
                "title": "Documentos",
                "size": "w-6 h-4",
                "content": "\n                            <input type=\"file\" class=\"wf-input\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Documento actualizado')\">Subir</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "economico_prod",
        "label": "Gestión Económica",
        "icono": "money",
        "children": [
          {
            "id": "anticipos_prod",
            "label": "Solicitudes Anticipos",
            "widgets": [
              {
                "id": "w_antic_prod",
                "title": "Anticipos",
                "size": "w-6 h-4",
                "content": "\n                            <label class=\"wf-label\">Monto</label>\n                            <input type=\"number\" class=\"wf-input\" placeholder=\"0\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de anticipo enviada')\">Solicitar Anticipo</button>"
              }
            ]
          },
          {
            "id": "facturacion",
            "label": "Facturación",
            "widgets": [
              {
                "id": "w_fact",
                "title": "Facturas",
                "size": "w-6 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Factura</th><th>Estado</th></tr>\n                                <tr><td>FV-2025-88</td><td>Pagada</td></tr>\n                            </table>"
              }
            ]
          }
        ]
      },
      {
        "id": "servicios_prod",
        "label": "Servicios Activos",
        "icono": "check",
        "widgets": [
          {
            "id": "w_serv_prod",
            "title": "Servicios",
            "size": "w-12 h-3",
            "content": "<p>Servicios contratados.</p>"
          }
        ]
      },
      {
        "id": "informacion",
        "label": "Solicitar Información",
        "icono": "doc",
        "widgets": [
          {
            "id": "w_info_prod",
            "title": "Solicitar Info",
            "size": "w-12 h-3",
            "content": "\n                    <p style=\"margin-bottom:10px;\">Solicita información a ACINPRO.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de información enviada')\">Enviar solicitud</button>"
          }
        ]
      },
      {
        "id": "portafolio",
        "label": "Portafolio de Proyectos",
        "icono": "grid",
        "widgets": [
          {
            "id": "w_port_prod",
            "title": "Portafolio",
            "size": "w-12 h-3",
            "content": "<div class=\"wf-img\">Portafolio</div>"
          }
        ]
      },
      {
        "id": "soporte_prod",
        "label": "Soporte",
        "icono": "check",
        "widgets": [
          {
            "id": "w_sop_prod",
            "title": "Soporte",
            "size": "w-12 h-3",
            "content": "\n                    <p style=\"margin-bottom:10px;\">Contactar a soporte.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Ticket de soporte creado')\">Nuevo ticket</button>"
          }
        ]
      }
    ]
  },
  "proveedor": {
    "title": "Proveedor",
    "menu": [
      {
        "id": "prov_homologacion",
        "label": "Homologación y Cumplimiento",
        "icono": "doc",
        "children": [
          {
            "id": "prov_registro",
            "label": "Registro de Empresa / Perfil",
            "widgets": [
              {
                "id": "w_prov_registro",
                "title": "Registro Inicial",
                "size": "w-8 h-5",
                "content": "\n                            <div class=\"perfil-grid\">\n                                <div><label class=\"wf-label\">Tipo de persona</label><select class=\"wf-input\"><option>Persona Jurídica</option><option>Persona Natural</option></select></div>\n                                <div><label class=\"wf-label\">NIT / Cédula</label><input class=\"wf-input\" placeholder=\"900.123.456-7\"></div>\n                                <div><label class=\"wf-label\">Razón social / Nombre</label><input class=\"wf-input\" placeholder=\"Suministros ABC S.A.S.\"></div>\n                                <div><label class=\"wf-label\">Representante legal</label><input class=\"wf-input\" placeholder=\"Nombre completo\"></div>\n                                <div><label class=\"wf-label\">Correo de contacto</label><input class=\"wf-input\" placeholder=\"compras@empresa.com\"></div>\n                                <div><label class=\"wf-label\">Teléfono</label><input class=\"wf-input\" placeholder=\"+57 300 000 0000\"></div>\n                            </div>\n                            <label class=\"wf-label\">Actividad económica (CIIU)</label>\n                            <input class=\"wf-input\" placeholder=\"Ej. 5920 - Actividades de grabación de sonido\">\n                            <label class=\"wf-label\">Documentos de vinculación (Cámara de Comercio, RUT, certificación bancaria)</label>\n                            <input type=\"file\" class=\"wf-input\" multiple>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Registro enviado. Estado: En validación.')\">Guardar y enviar a validación</button>"
              },
              {
                "id": "w_prov_homolog",
                "title": "Estado de Homologación",
                "size": "w-4 h-5",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Requisito</th><th>Estado</th></tr>\n                                <tr><td>Registro de empresa</td><td>Completo</td></tr>\n                                <tr><td>Cámara de Comercio</td><td>Por vencer</td></tr>\n                                <tr><td>RUT</td><td>Vigente</td></tr>\n                                <tr><td>Certificación bancaria</td><td>Pendiente</td></tr>\n                                <tr><td>Póliza / ARL</td><td>Vigente</td></tr>\n                            </table>\n                            <p style=\"font-size:12px; margin-top:10px;\">Habilitación para contratar: <b>85%</b></p>\n                            <button class=\"wf-btn\" style=\"margin-top:8px;\" onclick=\"mostrarToast('Falta la certificación bancaria para completar la homologación')\">Ver detalle</button>"
              }
            ]
          },
          {
            "id": "prov_renovacion",
            "label": "Renovación de Documentos",
            "widgets": [
              {
                "id": "w_prov_docs",
                "title": "Documentos con Vencimiento",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Documento</th><th>Última renovación</th><th>Vence</th><th>Estado</th><th>Acción</th></tr>\n                                <tr>\n                                    <td>Cámara de Comercio</td><td>01/11/2025</td><td>01/12/2025</td><td>Por vencer</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalRenovar('Cámara de Comercio')\">Renovar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RUT</td><td>15/03/2025</td><td>15/03/2026</td><td>Vigente</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalRenovar('RUT')\">Actualizar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>Certificación bancaria</td><td>—</td><td>—</td><td>Pendiente</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalRenovar('Certificación bancaria')\">Cargar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>Póliza de responsabilidad civil</td><td>20/01/2025</td><td>20/01/2026</td><td>Vigente</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalRenovar('Póliza de responsabilidad civil')\">Renovar</button></td>\n                                </tr>\n                            </table>"
              }
            ]
          },
          {
            "id": "prov_portafolio",
            "label": "Portafolio, Cobertura y Contactos",
            "widgets": [
              {
                "id": "w_prov_portafolio",
                "title": "Portafolio y Cobertura",
                "size": "w-12 h-5",
                "content": "\n                            <div class=\"perfil-grid\">\n                                <div>\n                                    <label class=\"wf-label\">Portafolio de servicios</label>\n                                    <textarea class=\"wf-input\" rows=\"3\">Suministro de instrumentos musicales, sonido profesional y accesorios.</textarea>\n                                </div>\n                                <div>\n                                    <label class=\"wf-label\">Líneas de contacto</label>\n                                    <input class=\"wf-input\" value=\"comercial@abc.com\">\n                                    <input class=\"wf-input\" value=\"+57 601 555 1234\">\n                                    <input class=\"wf-input\" value=\"WhatsApp: +57 300 000 0000\">\n                                </div>\n                            </div>\n                            <label class=\"wf-label\">Zonas de cobertura</label>\n                            <div style=\"display:flex; gap:15px; flex-wrap:wrap; font-size:12px; margin-bottom:10px;\">\n                                <label><input type=\"checkbox\" checked> Bogotá D.C.</label>\n                                <label><input type=\"checkbox\" checked> Medellín</label>\n                                <label><input type=\"checkbox\"> Cali</label>\n                                <label><input type=\"checkbox\"> Barranquilla</label>\n                                <label><input type=\"checkbox\"> Nacional</label>\n                            </div>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Portafolio y cobertura actualizados')\">Guardar cambios</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "prov_compras",
        "label": "Compras y Contratación",
        "icono": "check",
        "children": [
          {
            "id": "prov_rfq",
            "label": "Solicitudes de Cotización (RFQ)",
            "widgets": [
              {
                "id": "w_prov_rfq",
                "title": "Convocatorias Abiertas",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Código</th><th>Objeto</th><th>Cierre</th><th>Estado</th><th>Acción</th></tr>\n                                <tr>\n                                    <td>RFQ-2025-0087</td><td>Suministro de micrófonos inalámbricos</td><td>28/11/2025</td><td>Abierta</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalCotizar('RFQ-2025-0087')\">Cotizar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RFQ-2025-0091</td><td>Consola de sonido profesional</td><td>02/12/2025</td><td>Abierta</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalCotizar('RFQ-2025-0091')\">Cotizar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RFQ-2025-0075</td><td>Servicio de instalación de audio</td><td>20/11/2025</td><td>Cerrada</td>\n                                    <td><button class=\"wf-btn\" onclick=\"mostrarToast('La convocatoria ya cerró')\">Ver resultado</button></td>\n                                </tr>\n                            </table>"
              }
            ]
          },
          {
            "id": "prov_propuesta",
            "label": "Enviar Propuesta Económica y Técnica",
            "widgets": [
              {
                "id": "w_prov_propuesta",
                "title": "Enviar Propuesta",
                "size": "w-8 h-5",
                "content": "\n                            <label class=\"wf-label\">Solicitud de cotización (RFQ)</label>\n                            <select class=\"wf-input\">\n                                <option>RFQ-2025-0087 — Micrófonos inalámbricos</option>\n                                <option>RFQ-2025-0091 — Consola de sonido</option>\n                            </select>\n                            <div class=\"perfil-grid\">\n                                <div><label class=\"wf-label\">Valor de la propuesta (COP)</label><input type=\"number\" class=\"wf-input\" placeholder=\"0\"></div>\n                                <div><label class=\"wf-label\">Plazo de entrega (días)</label><input type=\"number\" class=\"wf-input\" placeholder=\"15\"></div>\n                            </div>\n                            <label class=\"wf-label\">Propuesta técnica (PDF)</label>\n                            <input type=\"file\" class=\"wf-input\">\n                            <label class=\"wf-label\">Propuesta económica (PDF / XLSX)</label>\n                            <input type=\"file\" class=\"wf-input\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Propuesta enviada a la entidad para evaluación')\">Enviar propuesta</button>"
              }
            ]
          },
          {
            "id": "prov_ordenes",
            "label": "Órdenes de Compra y Contratos",
            "widgets": [
              {
                "id": "w_prov_ordenes",
                "title": "Documentos Asignados",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Documento</th><th>Tipo</th><th>Valor</th><th>Estado</th><th>Acción</th></tr>\n                                <tr>\n                                    <td>OC-2025-0147</td><td>Orden de compra</td><td>$12.500.000</td><td>Pendiente de aceptación</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalFirmar('Orden de Compra', 'OC-2025-0147')\">Aceptar / Firmar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>CT-2025-0032</td><td>Contrato de prestación de servicios</td><td>$8.000.000</td><td>Pendiente de firma</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalFirmar('Contrato de Prestación de Servicios', 'CT-2025-0032')\">Aceptar / Firmar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>OC-2025-0119</td><td>Orden de compra</td><td>$6.800.000</td><td>Firmada</td>\n                                    <td><button class=\"wf-btn\" onclick=\"mostrarToast('Descargando documento firmado')\">Descargar</button></td>\n                                </tr>\n                            </table>"
              }
            ]
          }
        ]
      },
      {
        "id": "prov_facturacion",
        "label": "Facturación y Cuentas de Cobro",
        "icono": "money",
        "children": [
          {
            "id": "prov_radicar",
            "label": "Radicar Factura / Cuenta de Cobro",
            "widgets": [
              {
                "id": "w_prov_radicar",
                "title": "Radicación",
                "size": "w-8 h-6",
                "content": "\n                            <label class=\"wf-label\">Orden de compra / Contrato activo</label>\n                            <select class=\"wf-input\">\n                                <option>OC-2025-0147 — $12.500.000 (Vigente)</option>\n                                <option>CT-2025-0032 — $8.000.000 (Vigente)</option>\n                            </select>\n                            <label class=\"wf-label\">Tipo de radicado</label>\n                            <select class=\"wf-input\" onchange=\"toggleFormaRadicado(this.value)\">\n                                <option value=\"juridica\">Factura electrónica (Persona Jurídica)</option>\n                                <option value=\"natural\">Cuenta de cobro (Persona Natural)</option>\n                            </select>\n                            <div id=\"form-radicado-juridica\">\n                                <label class=\"wf-label\">Factura electrónica — XML</label>\n                                <input type=\"file\" class=\"wf-input\">\n                                <label class=\"wf-label\">Factura electrónica — PDF</label>\n                                <input type=\"file\" class=\"wf-input\">\n                            </div>\n                            <div id=\"form-radicado-natural\" style=\"display:none;\">\n                                <label class=\"wf-label\">Número de cuenta de cobro</label>\n                                <input class=\"wf-input\" placeholder=\"CC-2025-0147\">\n                                <label class=\"wf-label\">Concepto</label>\n                                <textarea class=\"wf-input\" rows=\"2\" placeholder=\"Descripción del servicio prestado\"></textarea>\n                                <label class=\"wf-label\">Valor</label>\n                                <input type=\"number\" class=\"wf-input\" placeholder=\"0\">\n                            </div>\n                            <label class=\"wf-label\">Soportes (informe de actividades, acta de recibido, PILA)</label>\n                            <input type=\"file\" class=\"wf-input\" multiple>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Radicado RAD-2025-0457 creado. Estado: En revisión contable.')\">Radicar documentos</button>"
              }
            ]
          },
          {
            "id": "prov_soportes",
            "label": "Soportes Obligatorios",
            "widgets": [
              {
                "id": "w_prov_soportes",
                "title": "Soportes del Mes",
                "size": "w-4 h-6",
                "content": "\n                            <p style=\"font-size:12px; margin-bottom:10px;\">Soportes obligatorios del periodo:</p>\n                            <div style=\"display:flex; flex-direction:column; gap:10px;\">\n                                <div style=\"border:1px solid #000; padding:8px;\">\n                                    <label class=\"wf-label\">Informe de actividades</label>\n                                    <input type=\"file\" class=\"wf-input\" style=\"margin-bottom:6px;\">\n                                    <span style=\"font-size:11px;\">Estado: Pendiente</span>\n                                </div>\n                                <div style=\"border:1px solid #000; padding:8px;\">\n                                    <label class=\"wf-label\">Acta de recibido a satisfacción (firmada)</label>\n                                    <input type=\"file\" class=\"wf-input\" style=\"margin-bottom:6px;\">\n                                    <span style=\"font-size:11px;\">Estado: Pendiente</span>\n                                </div>\n                                <div style=\"border:1px solid #000; padding:8px;\">\n                                    <label class=\"wf-label\">Planilla de seguridad social (PILA)</label>\n                                    <input type=\"file\" class=\"wf-input\" style=\"margin-bottom:6px;\">\n                                    <span style=\"font-size:11px;\">Estado: Pendiente</span>\n                                </div>\n                            </div>\n                            <button class=\"wf-btn wf-btn-primary\" style=\"margin-top:10px;\" onclick=\"mostrarToast('Soportes adjuntados al radicado RAD-2025-0457')\">Adjuntar todos</button>"
              }
            ]
          },
          {
            "id": "prov_corregir",
            "label": "Corregir Radicados Devueltos",
            "widgets": [
              {
                "id": "w_prov_corregir",
                "title": "Radicados Devueltos",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Radicado</th><th>OC / Contrato</th><th>Motivo de devolución</th><th>Estado</th><th>Acción</th></tr>\n                                <tr>\n                                    <td>RAD-2025-0398</td><td>OC-2025-0132</td><td>El XML no coincide con el valor de la OC</td><td>Rechazado</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalCorregir('RAD-2025-0398')\">Corregir y radicar</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0361</td><td>CT-2025-0029</td><td>Falta la planilla PILA del periodo</td><td>Rechazado</td>\n                                    <td><button class=\"wf-btn wf-btn-primary\" onclick=\"abrirModalCorregir('RAD-2025-0361')\">Corregir y radicar</button></td>\n                                </tr>\n                            </table>"
              }
            ]
          }
        ]
      },
      {
        "id": "prov_financiero",
        "label": "Seguimiento Financiero y Tributario",
        "icono": "chart",
        "children": [
          {
            "id": "prov_estado",
            "label": "Estado de Radicados y Pagos",
            "widgets": [
              {
                "id": "w_prov_estado",
                "title": "Estado de Radicados",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Radicado</th><th>OC / Contrato</th><th>Valor</th><th>Estado</th><th>Acción</th></tr>\n                                <tr>\n                                    <td>RAD-2025-0461</td><td>OC-2025-0151</td><td>$3.200.000</td><td>Radicado</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalDetalleRadicado('RAD-2025-0461')\">Ver detalle</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0457</td><td>OC-2025-0147</td><td>$12.500.000</td><td>En revisión contable</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalDetalleRadicado('RAD-2025-0457')\">Ver detalle</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0432</td><td>CT-2025-0032</td><td>$8.000.000</td><td>Aprobado para pago</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalDetalleRadicado('RAD-2025-0432')\">Ver detalle</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0340</td><td>OC-2025-0119</td><td>$6.800.000</td><td>Pagado</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalDetalleRadicado('RAD-2025-0340')\">Ver detalle</button></td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0398</td><td>OC-2025-0132</td><td>$4.300.000</td><td>Rechazado</td>\n                                    <td><button class=\"wf-btn\" onclick=\"abrirModalDetalleRadicado('RAD-2025-0398')\">Ver detalle</button></td>\n                                </tr>\n                            </table>"
              }
            ]
          },
          {
            "id": "prov_descuentos",
            "label": "Descuentos y Retenciones",
            "widgets": [
              {
                "id": "w_prov_descuentos",
                "title": "Detalle de Descuentos",
                "size": "w-12 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Radicado</th><th>Valor bruto</th><th>ReteFuente</th><th>ReteIVA</th><th>ReteICA</th><th>Neto pagado</th></tr>\n                                <tr>\n                                    <td>RAD-2025-0340</td><td>$6.800.000</td><td>-$136.000</td><td>-$0</td><td>-$61.200</td><td>$6.602.800</td>\n                                </tr>\n                                <tr>\n                                    <td>RAD-2025-0312</td><td>$4.500.000</td><td>-$90.000</td><td>-$0</td><td>-$40.500</td><td>$4.369.500</td>\n                                </tr>\n                            </table>\n                            <button class=\"wf-btn\" style=\"margin-top:10px;\" onclick=\"abrirModalDescuento('RAD-2025-0340')\">Ver detalle del cálculo</button>"
              }
            ]
          },
          {
            "id": "prov_certificados",
            "label": "Certificados de Retenciones",
            "widgets": [
              {
                "id": "w_prov_certificados",
                "title": "Certificados Tributarios",
                "size": "w-6 h-4",
                "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Periodo</th><th>Tipo</th><th>Acción</th></tr>\n                                <tr><td>2025 — Bimestre 5</td><td>Retenciones practicadas</td><td><button class=\"wf-btn\" onclick=\"mostrarToast('Descargando certificado bimestral 2025-5')\">Descargar</button></td></tr>\n                                <tr><td>2025 — Bimestre 4</td><td>Retenciones practicadas</td><td><button class=\"wf-btn\" onclick=\"mostrarToast('Descargando certificado bimestral 2025-4')\">Descargar</button></td></tr>\n                                <tr><td>2024 — Anual</td><td>Certificado anual DIAN</td><td><button class=\"wf-btn\" onclick=\"mostrarToast('Descargando certificado anual 2024')\">Descargar</button></td></tr>\n                            </table>"
              }
            ]
          },
          {
            "id": "prov_pqr",
            "label": "PQR / Solicitudes",
            "widgets": [
              {
                "id": "w_prov_pqr",
                "title": "Enviar PQR",
                "size": "w-6 h-5",
                "content": "\n                            <label class=\"wf-label\">Área destinataria</label>\n                            <select class=\"wf-input\">\n                                <option>Compras</option>\n                                <option>Tesorería</option>\n                                <option>Contabilidad</option>\n                            </select>\n                            <label class=\"wf-label\">Asunto</label>\n                            <input class=\"wf-input\" placeholder=\"Motivo de la solicitud\">\n                            <label class=\"wf-label\">Mensaje</label>\n                            <textarea class=\"wf-input\" rows=\"3\" placeholder=\"Describe tu solicitud\"></textarea>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('PQR radicada. Número: PQR-2025-0231')\">Enviar PQR</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "prov_ayuda",
        "label": "Ayuda y Soporte",
        "icono": "check",
        "widgets": [
          {
            "id": "w_ayuda_prov",
            "title": "Ayuda",
            "size": "w-12 h-3",
            "content": "\n                    <p style=\"margin-bottom:10px;\">Contacto de soporte para proveedores.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Ticket de soporte creado')\">Nuevo ticket</button>"
          }
        ]
      }
    ]
  },
  "cliente": {
    "title": "Cliente",
    "menu": [
      {
        "id": "certificados_cli",
        "label": "Certificados",
        "icono": "doc",
        "children": [
          {
            "id": "paz_salvo",
            "label": "Descargar Paz y Salvo",
            "widgets": [
              {
                "id": "w_paz_salvo",
                "title": "Paz y Salvo",
                "size": "w-6 h-3",
                "content": "<button class=\"wf-btn wf-btn-primary\">Descargar PDF</button>"
              }
            ]
          },
          {
            "id": "certificados_cli_2",
            "label": "Certificados Adicionales",
            "widgets": [
              {
                "id": "w_cert_cli",
                "title": "Certificados",
                "size": "w-6 h-3",
                "content": "<p>Otros certificados.</p>"
              }
            ]
          }
        ]
      },
      {
        "id": "tramites_cli",
        "label": "Trámites",
        "icono": "check",
        "children": [
          {
            "id": "historial_cli",
            "label": "Mis Trámites",
            "widgets": [
              {
                "id": "w_hist_cli",
                "title": "Historial",
                "size": "w-12 h-3",
                "content": "<table class=\"wf-table\"><tr><th>Trámite</th><th>Estado</th></tr><tr><td>Solicitud #552</td><td>En Proceso</td></tr></table>"
              }
            ]
          },
          {
            "id": "solicitar_info_cli",
            "label": "Solicitar Información",
            "widgets": [
              {
                "id": "w_info_cli",
                "title": "Solicitar Info",
                "size": "w-12 h-3",
                "content": "<p>Pide información.</p>"
              }
            ]
          }
        ]
      },
      {
        "id": "actualizar_docs_cli",
        "label": "Actualizar Documentos",
        "icono": "doc",
        "widgets": [
          {
            "id": "w_act_cli",
            "title": "Actualizar",
            "size": "w-12 h-3",
            "content": "<input type=\"file\" class=\"wf-input\"><button class=\"wf-btn wf-btn-primary\">Subir</button>"
          }
        ]
      },
      {
        "id": "trazabilidad_cli",
        "label": "Trazabilidad de Trámites",
        "icono": "check",
        "widgets": [
          {
            "id": "w_traz_cli",
            "title": "Trazabilidad",
            "size": "w-12 h-3",
            "content": "<table class=\"wf-table\"><tr><th>Trámite</th><th>Estado</th></tr><tr><td>#552</td><td>En Proceso</td></tr></table>"
          }
        ]
      },
      {
        "id": "soporte_cli",
        "label": "Soporte",
        "icono": "check",
        "widgets": [
          {
            "id": "w_sop_cli",
            "title": "Soporte",
            "size": "w-12 h-3",
            "content": "<p>Contactar a soporte.</p>"
          }
        ]
      }
    ]
  },
  "artistaprod": {
    "title": "Artista / Productor",
    "menu": [
      {
        "id": "bloque_artista",
        "label": "ARTISTA",
        "icono": "users",
        "children": [
          {
            "id": "economico",
            "label": "Gestión Económica",
            "icono": "money",
            "children": [
              {
                "id": "anticipos",
                "label": "Anticipos y Auxilios",
                "widgets": [
                  {
                    "id": "w_antic",
                    "title": "Solicitar Anticipo",
                    "size": "w-6 h-4",
                    "content": "\n                            <label class=\"wf-label\">Monto solicitado (COP)</label>\n                            <input type=\"number\" class=\"wf-input\" placeholder=\"0\">\n                            <label class=\"wf-label\">Motivo</label>\n                            <textarea class=\"wf-input\" rows=\"2\" placeholder=\"Describe el motivo de la solicitud\"></textarea>\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de anticipo enviada')\">Solicitar</button>"
                  }
                ]
              },
              {
                "id": "regalias",
                "label": "Recaudo de Regalías",
                "widgets": [
                  {
                    "id": "w_regalias",
                    "title": "Regalías",
                    "size": "w-6 h-4",
                    "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Periodo</th><th>Valor</th><th>Estado</th></tr>\n                                <tr><td>Oct 2025</td><td>$1.250.000</td><td>Pagado</td></tr>\n                                <tr><td>Sep 2025</td><td>$980.000</td><td>Pagado</td></tr>\n                            </table>\n                            <button class=\"wf-btn\" style=\"margin-top:10px;\" onclick=\"mostrarToast('Certificado de regalías generado')\">Descargar certificado</button>"
                  }
                ]
              }
            ]
          },
          {
            "id": "musical",
            "label": "Gestión Musical",
            "icono": "doc",
            "children": [
              {
                "id": "obras",
                "label": "Registro de Obras",
                "widgets": [
                  {
                    "id": "w_obras",
                    "title": "Registrar Obra",
                    "size": "w-6 h-4",
                    "content": "\n                            <label class=\"wf-label\">Nombre de la obra</label>\n                            <input type=\"text\" class=\"wf-input\">\n                            <label class=\"wf-label\">Género</label>\n                            <input type=\"text\" class=\"wf-input\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Obra registrada correctamente')\">Registrar</button>"
                  }
                ]
              }
            ]
          },
          {
            "id": "servicios",
            "label": "Servicios Activos",
            "icono": "check",
            "widgets": [
              {
                "id": "w_serv",
                "title": "Servicios",
                "size": "w-12 h-3",
                "content": "\n                    <ul style=\"padding-left:18px; font-size:12px; line-height:1.8;\">\n                        <li>Registro Musical</li>\n                        <li>Recaudo de Regalías</li>\n                        <li>Anticipos y Auxilios</li>\n                    </ul>"
              }
            ]
          },
          {
            "id": "perfil",
            "label": "Mi Perfil Artístico",
            "icono": "users",
            "widgets": [
              {
                "id": "w_perfil_art",
                "title": "Perfil",
                "size": "w-12 h-3",
                "content": "\n                    <p style=\"font-size:12px; margin-bottom:10px;\">Actualiza tu información artística, biografía y fotografías.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"abrirPerfil()\">Abrir mi perfil</button>"
              }
            ]
          },
          {
            "id": "eventos",
            "label": "Eventos y Convocatorias",
            "icono": "chart",
            "widgets": [
              {
                "id": "w_eventos",
                "title": "Convocatorias",
                "size": "w-12 h-3",
                "content": "\n                    <table class=\"wf-table\">\n                        <tr><th>Evento</th><th>Cierre</th><th>Acción</th></tr>\n                        <tr><td>Festival Nacional</td><td>30 Nov</td><td><button class=\"wf-btn\" onclick=\"mostrarToast('Postulación registrada')\">Postularme</button></td></tr>\n                    </table>"
              }
            ]
          },
          {
            "id": "soporte",
            "label": "Soporte Técnico",
            "icono": "check",
            "widgets": [
              {
                "id": "w_sop_art",
                "title": "Ayuda",
                "size": "w-12 h-3",
                "content": "\n                    <p style=\"margin-bottom:10px;\">Abre un ticket de soporte.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Ticket de soporte creado')\">Nuevo ticket</button>"
              }
            ]
          }
        ]
      },
      {
        "id": "bloque_productor",
        "label": "PRODUCTOR",
        "icono": "doc",
        "children": [
          {
            "id": "tramites",
            "label": "Trámites y Acreditaciones",
            "icono": "check",
            "children": [
              {
                "id": "trazabilidad",
                "label": "Trazabilidad de Trámites",
                "widgets": [
                  {
                    "id": "w_traz",
                    "title": "Estado de Trámites",
                    "size": "w-12 h-3",
                    "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Trámite</th><th>Estado</th></tr>\n                                <tr><td>Acreditación #1024</td><td>En Proceso</td></tr>\n                            </table>"
                  }
                ]
              },
              {
                "id": "acreditaciones",
                "label": "Registro de Acreditaciones",
                "widgets": [
                  {
                    "id": "w_acred",
                    "title": "Registrar Acreditación",
                    "size": "w-6 h-4",
                    "content": "\n                            <input type=\"text\" class=\"wf-input\" placeholder=\"Nombre de la obra\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Acreditación registrada')\">Registrar</button>"
                  }
                ]
              },
              {
                "id": "documentos",
                "label": "Actualizar Documentos",
                "widgets": [
                  {
                    "id": "w_docs_prod",
                    "title": "Documentos",
                    "size": "w-6 h-4",
                    "content": "\n                            <input type=\"file\" class=\"wf-input\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Documento actualizado')\">Subir</button>"
                  }
                ]
              }
            ]
          },
          {
            "id": "economico_prod",
            "label": "Gestión Económica",
            "icono": "money",
            "children": [
              {
                "id": "anticipos_prod",
                "label": "Solicitudes Anticipos",
                "widgets": [
                  {
                    "id": "w_antic_prod",
                    "title": "Anticipos",
                    "size": "w-6 h-4",
                    "content": "\n                            <label class=\"wf-label\">Monto</label>\n                            <input type=\"number\" class=\"wf-input\" placeholder=\"0\">\n                            <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de anticipo enviada')\">Solicitar Anticipo</button>"
                  }
                ]
              },
              {
                "id": "facturacion",
                "label": "Facturación",
                "widgets": [
                  {
                    "id": "w_fact",
                    "title": "Facturas",
                    "size": "w-6 h-4",
                    "content": "\n                            <table class=\"wf-table\">\n                                <tr><th>Factura</th><th>Estado</th></tr>\n                                <tr><td>FV-2025-88</td><td>Pagada</td></tr>\n                            </table>"
                  }
                ]
              }
            ]
          },
          {
            "id": "servicios_prod",
            "label": "Servicios Activos",
            "icono": "check",
            "widgets": [
              {
                "id": "w_serv_prod",
                "title": "Servicios",
                "size": "w-12 h-3",
                "content": "<p>Servicios contratados.</p>"
              }
            ]
          },
          {
            "id": "informacion",
            "label": "Solicitar Información",
            "icono": "doc",
            "widgets": [
              {
                "id": "w_info_prod",
                "title": "Solicitar Info",
                "size": "w-12 h-3",
                "content": "\n                    <p style=\"margin-bottom:10px;\">Solicita información a ACINPRO.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Solicitud de información enviada')\">Enviar solicitud</button>"
              }
            ]
          },
          {
            "id": "portafolio",
            "label": "Portafolio de Proyectos",
            "icono": "grid",
            "widgets": [
              {
                "id": "w_port_prod",
                "title": "Portafolio",
                "size": "w-12 h-3",
                "content": "<div class=\"wf-img\">Portafolio</div>"
              }
            ]
          },
          {
            "id": "soporte_prod",
            "label": "Soporte",
            "icono": "check",
            "widgets": [
              {
                "id": "w_sop_prod",
                "title": "Soporte",
                "size": "w-12 h-3",
                "content": "\n                    <p style=\"margin-bottom:10px;\">Contactar a soporte.</p>\n                    <button class=\"wf-btn wf-btn-primary\" onclick=\"mostrarToast('Ticket de soporte creado')\">Nuevo ticket</button>"
              }
            ]
          }
        ]
      }
    ]
  }
};

window.ICONOS = {
    home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>`,
    user: `<circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-7 8-7s8 3 8 7"></path>`,
    users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
    doc: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>`,
    chart: `<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>`,
    check: `<polyline points="20 6 9 17 4 12"></polyline>`,
    money: `<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>`,
    music: `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
    bell: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>`,
    help: `<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>`
};




window.obtenerEstructuraRol = function (rol, tipoUsuario) {
    if (rol === "admin") return window.ESTRUCTURA_PORTAL.admin;

    const tipos = (tipoUsuario || "").toString();
    if (/\bArtista\b/i.test(tipos) && /\bProductor\b/i.test(tipos)) {
        return window.ESTRUCTURA_PORTAL.artistaprod;
    }

    const nombre = ["Empleado", "Artista", "Productor", "Proveedor", "Cliente"].find(tipo =>
        new RegExp("^" + tipo + "$", "i").test(tipos.trim())
    );
    return window.ESTRUCTURA_PORTAL[nombre ? nombre.toLowerCase() : "artista"];
};