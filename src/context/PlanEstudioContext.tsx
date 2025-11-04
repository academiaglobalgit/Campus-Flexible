import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useAuth } from "./AuthContext";
import { AppRoutingPaths } from "@constants";

import DiplomadoCoppel from "../assets/reestablecer_password.png";
import HomeDiplomado from "../assets/login_diplomado.png";
import type { BotonesCalificacionProps } from "../types/Calificaciones.interface";
import React from "react";
import Button from "../components/atoms/Button/Button";
import Box from "@mui/material/Box";

// Constantes de planes
export const PLAN_ESTUDIOS: Record<string, number[]> = {
  DIPLOMADOS: [17, 19],
  OTRO_CAMPUS: [20],
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
    renderBotonesCalificacion: (props: BotonesCalificacionProps) => JSX.Element;
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

        console.log(id);

        const baseConfig: PlanEstudioConfig = {
            id,
            renderConditionalComponent: (componentName, defaultComponent) => defaultComponent,
            getFilteredMenuRoutes: (routes) => routes,
            getLabelPeriodosTabs: (label) => label,
            getTabsAyuda: (tabs) => tabs,
            goToPageTerminosCondiciones: (label) => label,
            getConfiguracionCursosActivos: (defaults) => ({...defaults, isPlan: false }),
            getReestablecerPassword: (defaults) => ({...defaults }),
            getConfiguracionLogin: (defaults) => ({...defaults }),
            getConfiguracionActividades: (defaults) => ({...defaults }),
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
                    const verLogo = idPlanEstudio === 19 ? true : false;
                    return { background, verLogo }
                },
                getConfiguracionLogin: () => {
                    const background = idPlanEstudio === 19 ? DiplomadoCoppel : HomeDiplomado;
                    const verLogo = true;
                    return { background, verLogo }
                },
                getConfiguracionActividades: () => ({ verBotones: false, verCalificacion: false, subirArchivos: false }),
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
                                    {encuesta.titulo}
                                </Button>
                            ))}
                        </Box>
                    );
                },
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