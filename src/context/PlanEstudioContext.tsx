import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useAuth } from "./AuthContext";
import { AppRoutingPaths, TitleScreen } from "@constants";

import DiplomadoCoppel from "../assets/reestablecer_password.png";
import HomeDiplomado from "../assets/login_diplomado.png";
import type { BotonesCalificacionProps } from "../types/Calificaciones.interface";
import React from "react";
import Button from "../components/atoms/Button/Button";
import Box from "@mui/material/Box";
import { truncateText } from "../utils/Helpers";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DsSvgIcon from "../components/atoms/Icon/Icon";
import ListItemText from "@mui/material/ListItemText";

// Constantes de planes
export const PLAN_ESTUDIOS: Record<string, number[]> = {
  DIPLOMADOS: [17, 19], // IDs de planes de diplomados NO AGREGAR MAS PLANES AQUÍ, siempre y cuando muestren la misma configuración
//   OTRO_CAMPUS: [20],
};

export const EXCLUDED_MENU_ROUTES_IDS = {
  DIPLOMADOS: [1, 7, 6, 8, 9, 10, 11, 12, 14],
//   OTRO_CAMPUS: [1, 7, 6, 8],
};

interface CursosActivosConfig {
    tutorVer: boolean;
    tipoVideo: number;
    isOpenVideo: boolean;
    isPlan?: boolean;
}

interface ReestablecerPassConfig {
    background: any;
    verLogo: boolean;
}

interface ActividadesConfig {
    verBotones: boolean; 
    verCalificacion: boolean; 
    subirArchivos: boolean;
}

interface CalificacionesConfig { 
    titulo: string; 
    loading: string;
    mostrarPromedio: boolean;
    mostrarGlosario: boolean;
    mostrarPeriodos: boolean;
}

interface MenuMobile {
    menu: any[];
    handleNavigation: (item: any) => void;
    menuItemStyle: any;
    isMobile: boolean;
    menuType: string;
}

interface PlanEstudioConfig {
    id: number;
    renderConditionalComponent: <T extends Record<string, any>>(
        componentName: string,
        defaultComponent: JSX.Element,
        props?: T
    ) => JSX.Element;
    getFilteredMenuRoutes: <T extends { id: number }>(routes: T[]) => T[];
    getLabelPeriodosTabs: (label: string) => string;
    getTabsAyuda: <T extends string>(tabs: T[]) => T[];
    goToPageTerminosCondiciones: (label: string) => string;
    getConfiguracionCursosActivos: (defaults: CursosActivosConfig) => CursosActivosConfig;
    getReestablecerPassword: (defaults: ReestablecerPassConfig) => ReestablecerPassConfig;
    getConfiguracionLogin: (defaults: ReestablecerPassConfig) => ReestablecerPassConfig;
    getConfiguracionActividades: (defaults: ActividadesConfig) => ActividadesConfig;
    getConfiguracionCalificaciones: (defaults: CalificacionesConfig) => CalificacionesConfig;
    renderBotonesCalificacion: (props: BotonesCalificacionProps) => JSX.Element;
    getValidarCalificacion: (curso: any) => string;
    getSortedMenuInformacionIconTopBar: (data: any) => any[];
    getMenuMobile: (props: MenuMobile) => JSX.Element[];
    shouldPromediarDiplomados: (data: any) => boolean;
    hiddenTabsCursosActivosDetalles: () => {hiddenTabs: number[], allowDownload: boolean};
    getWidthLogoLogin: () => string | undefined;
    getColorDrawerListaTareas: (color: string) => string;
}

type PlanEstudioContextType = {
    idPlanEstudio: number | null;
    config: PlanEstudioConfig | null;
    isInAnyPlan: () => boolean;
    loading: boolean;
};

const PlanEstudioContext = createContext<PlanEstudioContextType | undefined>(undefined);

interface PlanEstudioProviderProps {
  children: ReactNode;
}

export const PlanEstudioProvider: React.FC<PlanEstudioProviderProps> = ({ children }) => {
    const { configPlataforma } = useAuth();
    const [idPlanEstudio, setIdPlanEstudio] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const id = configPlataforma?.id_plan_estudio;
            setIdPlanEstudio(id || null);
        } catch (error) {
            console.error('Error al obtener idPlanEstudio:', error);
            setIdPlanEstudio(null);
        } finally {
            setLoading(false);
        }
    }, [configPlataforma]);

    const getConfig = (id: number | null): PlanEstudioConfig | null => {
        if (!id) return null;

        const baseConfig: PlanEstudioConfig = {
            id,
            renderConditionalComponent: (_componentName, defaultComponent) => defaultComponent,
            getFilteredMenuRoutes: (routes) => routes,
            getLabelPeriodosTabs: (label) => label,
            getTabsAyuda: (tabs) => tabs,
            goToPageTerminosCondiciones: (label) => label,
            getConfiguracionCursosActivos: (defaults) => ({...defaults, isPlan: false }),
            getReestablecerPassword: (defaults) => ({...defaults }),
            getConfiguracionLogin: (defaults) => ({...defaults }),
            getConfiguracionActividades: (defaults) => ({...defaults }),
            getConfiguracionCalificaciones: (defaults) => ({...defaults }),
            renderBotonesCalificacion: (props) => (
                <React.Fragment>
                    <Button onClick={() => props.handleDetalle(props.curso.id_curso)} fullWidth>
                        Detalles Calificación
                    </Button>
                    <Button onClick={() => props.handleIrCurso(props.curso)} fullWidth>
                        Ir al Curso
                    </Button>
                </React.Fragment>
            ),
            getValidarCalificacion: (curso) => (curso.estatus_curso_alumno === 'Finalizado' ? curso.calificacion : 'Pendiente'),
            getSortedMenuInformacionIconTopBar: (data) => data,
            getMenuMobile: (props) => {
                return (
                    props.menu.filter((item) => item.visible === 1).map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => props.handleNavigation(item)}
                            sx={[
                                { ...props.menuItemStyle, mt: index === 0 ? 0 : 2 },
                                !props.isMobile && { width: '100%', maxWidth: '232px' }
                            ]}
                        >
                            {
                                props.menuType === 'menuRoutes'
                                    ?
                                    item.text
                                    :
                                    <>
                                        <ListItemIcon>
                                            <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: configPlataforma?.color_primary }} />
                                        </ListItemIcon>
                                        <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                                    </>
                            }
                        </MenuItem>
                    ))
                );
            },
            shouldPromediarDiplomados: () => false,
            hiddenTabsCursosActivosDetalles: () => ({ hiddenTabs: [], allowDownload: true }),
            getWidthLogoLogin: () => undefined,
            getColorDrawerListaTareas: (color) => color,
        };

        // Configuración para planes especiales (17, 19)
        if (PLAN_ESTUDIOS.DIPLOMADOS.includes(id)) {
            return {
                ...baseConfig,
                renderConditionalComponent: (componentName, defaultComponent, props) => {
                    if (componentName === 'BottomBar') {
                        return (
                            <BottomNavigationAction 
                                sx={{ visibility: 'hidden' }} 
                                disabled 
                            />
                        );
                    }
                    if (componentName === 'customButton') {
                        return (
                            <BottomNavigationAction 
                                {...props}
                                sx={{ 
                                    backgroundColor: 'primary.main',
                                    ...props?.sx 
                                }} 
                            />
                        );
                    }
                    return defaultComponent;
                },
                getFilteredMenuRoutes: <T extends { id: number }>(routes: T[]) => {
                    return routes.filter(
                        (item) => !EXCLUDED_MENU_ROUTES_IDS.DIPLOMADOS.includes(item.id)
                    );
                },
                getLabelPeriodosTabs: () => 'Certificaciones',
                getTabsAyuda: <T extends string>(tabs: T[]) => {
                    return tabs.filter(tab => tab !== "Contacto con docente");
                },
                goToPageTerminosCondiciones: () => AppRoutingPaths.CURSOS_ACTIVOS,
                getConfiguracionCursosActivos: () => ({ isPlan: true, tutorVer: false, tipoVideo: 4, isOpenVideo: true }),
                getReestablecerPassword: () => {
                    const background = idPlanEstudio === 19 ? DiplomadoCoppel : HomeDiplomado;
                    // const verLogo = idPlanEstudio === 19 ? true : false;
                    const verLogo = true;
                    return { background, verLogo }
                },
                getConfiguracionLogin: () => {
                    const background = idPlanEstudio === 19 ? DiplomadoCoppel : HomeDiplomado;
                    const verLogo = true;
                    return { background, verLogo }
                },
                getConfiguracionActividades: () => ({ verBotones: false, verCalificacion: false, subirArchivos: false }),
                getConfiguracionCalificaciones: () => ({ titulo: TitleScreen.CALIFICACIONES, loading: `Cargando ${TitleScreen.CALIFICACIONES}...`, mostrarPromedio: false, mostrarGlosario: false, mostrarPeriodos: true }),
                renderBotonesCalificacion: ({
                    curso,
                    loadingEncuesta,
                    encuestas,
                    handleIrCurso,
                    handleReporteCurso,
                    isMobile,
                }) => {
                    if (loadingEncuesta) {
                        return (
                            <Button disabled fullWidth onClick={() => { }}>
                                Cargando reportes...
                            </Button>
                        );
                    }

                    const encuestasCompletadas =
                        encuestas?.data
                            ?.filter(
                                (e: any) =>
                                    e.estatus?.toLowerCase() === "completada" &&
                                    e.id_curso === curso.id_curso &&
                                    e.html_result !== null
                            )
                            ?.sort((a: any, b: any) => Number(a.id_encuesta ?? 0) - Number(b.id_encuesta ?? 0)) ?? [];

                    const encuestasLimitadas = encuestasCompletadas.slice(0, 3);

                    return (
                        <Box
                            sx={{
                                display: "grid",
                                gap: 1.2,
                                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
                                width: "100%",
                                alignItems: "stretch",
                            }}
                        >
                            <Button
                                onClick={() => handleIrCurso(curso)}
                                fullWidth
                                variant="contained"
                            >
                                Ir al Curso
                            </Button>

                            {encuestasLimitadas.map((encuesta: any) => (
                                <Button
                                    key={encuesta.id_encuesta}
                                    onClick={() => handleReporteCurso(encuesta.html_result, encuesta.titulo)}
                                    fullWidth
                                    sxProps={{
                                        ...(isMobile
                                            ? {
                                                textOverflow: "ellipsis",
                                                p: 1.5,
                                                lineHeight: 1.3,
                                            }
                                            : {
                                                whiteSpace: "normal",
                                                wordBreak: "break-word",
                                                textAlign: "center",
                                                p: 1.5,
                                                lineHeight: 1.3,
                                            }),
                                    }}
                                >
                                    {truncateText(encuesta.titulo)}
                                </Button>
                            ))}
                        </Box>
                    );
                },
                getValidarCalificacion: (curso) => (curso.calificacion === null
                                ? 'Pendiente'
                                : Number(curso.calificacion) < 6
                                    ? 'No aprobado'
                                    : 'Aprobado'),
                getSortedMenuInformacionIconTopBar: (data) => {
                    return data.map((item: any) => {
                        if (item.text === TitleScreen.SERVICIOS_ESCOLORES) {
                            return { ...item, visible: 0 };
                        }
                        return item;
                    });
                },
                getMenuMobile: (props) => {
                    // console.log(props.menu);
                    return (
                        props.menu.filter((item) => item.visible === 1).map((item, index) => (
                            <MenuItem
                                key={index}
                                disabled={item.text === 'Inducción'}
                                onClick={() => props.handleNavigation(item)}
                                sx={[
                                    { ...props.menuItemStyle, mt: index === 0 ? 0 : 2 },
                                    !props.isMobile && { width: '100%', maxWidth: '232px' }
                                ]}
                            >
                                {
                                    props.menuType === 'menuRoutes'
                                        ?
                                        item.text
                                        :
                                        <>
                                            <ListItemIcon>
                                                <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: configPlataforma?.color_primary }} />
                                            </ListItemIcon>
                                            <ListItemText sx={{ fontSize: '18px', fontWeight: 400, lineHeight: '24px' }}>{item.text}</ListItemText>
                                        </>
                                }
                            </MenuItem>
                        ))
                    );
                },
                shouldPromediarDiplomados: (item) => (item.estatus.toLowerCase() === 'cursando' && Number(item.progreso) === 100),
                hiddenTabsCursosActivosDetalles: () => ({ hiddenTabs: [5, 2], allowDownload: false }),
                getWidthLogoLogin: () => ( idPlanEstudio === 17 ? '279px !important' : undefined),
                getColorDrawerListaTareas: (color) => (idPlanEstudio === 17 ? 'primary.main' : color),
            };
        }

        // Configuración para plan alternativo (20)
        // if (PLANES.OTRO_CAMPUS.includes(id)) {
        //     return {
        //         ...baseConfig,
        //         getFilteredMenuRoutes: <T extends { id: number }>(routes: T[]) => {
        //             return routes.filter(
        //                 (item) => !EXCLUDED_MENU_ROUTES_IDS.OTRO_CAMPUS.includes(item.id)
        //             );
        //         },
        //     };
        // }

        return baseConfig;
    };

    const config = getConfig(idPlanEstudio);

    const isInAnyPlan = (): boolean => {
        return Object.values(PLAN_ESTUDIOS).some(planes => 
            planes.includes(Number(idPlanEstudio))
        ); 
    }

    return (
        <PlanEstudioContext.Provider value={{
            idPlanEstudio,
            config,
            loading,
            isInAnyPlan
        }}>
            {children}
        </PlanEstudioContext.Provider>
    );
};

export const usePlanEstudio = () => {
  const context = useContext(PlanEstudioContext);
  if (context === undefined) {
    throw new Error('usePlanEstudio debe usarse dentro de PlanEstudioProvider');
  }
  return context;
};