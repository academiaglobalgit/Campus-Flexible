import * as Icons from "@iconsCustomizeds";
import { AppRoutingPaths, TitleScreen } from "./constants";

export interface Menu {
    id:       number;
    text:     string;
    icon:     any;
    path:     string;
    order:    number;
    visible:  number;
    children: Child[];
    menu: 'main' | 'more';
    hasCount?: boolean;
}

export interface Child {
    text: string;
    path: string;
}

export const MenuRoutes: Menu[] = [
    { id: 1, text: TitleScreen.PLAN_ESTUDIOS, icon: Icons.Home, path: AppRoutingPaths.PLAN_ESTUDIOS, order: 0, visible: 1, children:[], menu: 'main' },
    { id: 2, text: TitleScreen.CURSOS_ACTIVOS, icon: Icons.CursosCertificaciones, path: AppRoutingPaths.CURSOS_ACTIVOS, order: 1, visible: 1, children:[], menu: 'main', hasCount: true },
    { id: 3, text: TitleScreen.CALIFICACIONES, icon: Icons.Calificaciones, path: AppRoutingPaths.CALIFICACIONES, order: 2, visible: 1, children:[], menu: 'main' },
    { id: 4, text: TitleScreen.CALENDARIO, icon: Icons.Calendario, path: AppRoutingPaths.CALENDARIO, order: 3, visible: 1, children:[], menu: 'main' },
    { id: 5, text: TitleScreen.BIBLIOTECA, icon: Icons.Biblioteca, path: AppRoutingPaths.BIBLIOTECA, order: 4, visible: 1, children:[], menu: 'main' },
    { id: 6, text: TitleScreen.CONSEJERIA, icon: Icons.CursosCertificaciones, path: AppRoutingPaths.CONSEJERIA_ESTUDIANTIL, order: 5, visible: 1, children:[], menu: 'main'},
    { id: 7, text: TitleScreen.SALA_CONVERSACIONES, icon: Icons.SalaConversacion, path: AppRoutingPaths.SALA_CONVERSACIONES, order: 6, visible: 1, children:[], menu: 'main' },
    { id: 8, text: TitleScreen.BOLETIN_EDUCATIVO, icon: Icons.BoletinAcademico, path: AppRoutingPaths.BOLETIN_EDUCATIVO, order: 7, visible: 1, children:[], menu: 'more' },
    { id: 9, text: TitleScreen.CERTIFICACIONES, icon: Icons.Certificaciones, path: AppRoutingPaths.CERTIFICACIONES, order: 8, visible: 1, children:[], menu: 'more' },
    { id: 10, text: TitleScreen.BOLSA_TRABAJO, icon: Icons.BolsaTrabajo, path: AppRoutingPaths.BOLSA_TRABAJO, order: 9, visible: 1, children:[], menu: 'more' },
    { id: 11, text: TitleScreen.PIZARRON, icon: Icons.PizarronExito, path: AppRoutingPaths.PIZARRON, order: 10, visible: 1, children:[], menu: 'more' },
    { id: 12, text: TitleScreen.MI_TRAYECTO, icon: Icons.MiTrayecto, path: AppRoutingPaths.MI_TRAYECTO, order: 11, visible: 1, children:[], menu: 'more' },
    { id: 13, text: TitleScreen.APRENDE_MAS, icon: Icons.VerMas, path: AppRoutingPaths.APRENDE_MAS, order: 12, visible: 1, children:[], menu: 'more' },
] as const;

export type MenuRoutes = typeof MenuRoutes;

export const MenuInformacion = [
    { text: TitleScreen.SERVICIOS_ESCOLORES, icon: Icons.ServiciosEscolares, path: AppRoutingPaths.SERVICIOS_ESCOLORES, order: 0, visible: 1 },
    { text: TitleScreen.AYUDA, icon: Icons.Ayuda, path: AppRoutingPaths.AYUDA_INTERIOR, order: 1, visible: 0 },
    { text: TitleScreen.CONTACTO, icon: Icons.Contacto, path: AppRoutingPaths.CONTACTO, order: 2, visible: 1 },
    { text: TitleScreen.FAQS, icon: Icons.PreguntasFrecuentes, path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT, order: 3, visible: 0 },
    { text: TitleScreen.LINEAMIENTOS, icon: Icons.Lineamientos, path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT, order: 4, visible: 1 },
    { text: TitleScreen.MANUALES_USUARIOS, icon: Icons.ManualInduccion, path: AppRoutingPaths.MANUAL_INDUCCION, order: 5, visible: 1 },
] as const;

export type MenuInformacion = typeof MenuInformacion;

export type MenuType = 'menuRoutes' | 'menuInformacion';

