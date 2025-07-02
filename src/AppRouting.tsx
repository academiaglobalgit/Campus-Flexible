import App from "./App";
import { AppRoutingPaths } from "@constants";
import { createHashRouter } from "react-router-dom";
// createBrowserRouter
// createHashRouter
import * as Component from "@components";
import { ProtectedRoute } from "./components/templates/ProtectedRoute";

export const AppRouting = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: AppRoutingPaths.LOGIN,
        Component: Component.LoginPage,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            Component: Component.MainTemplate, // Layout para las rutas protegidas
            children: [
              {
                path: AppRoutingPaths.BLANK,
                Component: Component.Home
              },
              {
                path: AppRoutingPaths.CALIFICACIONES,
                Component: Component.Calificaciones
              },
              {
                path: AppRoutingPaths.MI_TRAYECTO,
                Component: Component.MiTrayecto
              },
              {
                path: AppRoutingPaths.SERVICIOS_ESCOLORES,
                Component: Component.ServiciosEscolares
              },
              {
                path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT,
                Component: Component.PreguntasFrecuentesInternas
              },
              {
                path: AppRoutingPaths.CALENDARIO,
                Component: Component.Calendario
              },
              {
                path: AppRoutingPaths.PLAN_ESTUDIOS,
                Component: Component.PlanEstudio
              },
              {
                path: AppRoutingPaths.BIBLIOTECA,
                Component: Component.BibliotecaVideoteca
              },
              {
                path: AppRoutingPaths.MI_PERFIL,
                Component: Component.MiPerfil
              },
              {
                path: AppRoutingPaths.CURSOS_ACTIVOS,
                Component: Component.CursoActivo
              },
              {
                path: AppRoutingPaths.CURSOS_ACTIVOS_DETALLES,
                Component: Component.CursosActivosDetalles
              },
              {
                path: AppRoutingPaths.AYUDA_INTERIOR,
                Component: Component.Ayuda
              },
              {
                path: AppRoutingPaths.CURSOS_CERTIFICACIONES,
                Component: Component.CurosCertificaciones
              },
              {
                path: AppRoutingPaths.CERTIFICACIONES,
                Component: Component.Certificaciones
              },
              {
                path: AppRoutingPaths.SALA_CONVERSACIONES,
                Component: Component.SalaConversacion
              },
              {
                path: AppRoutingPaths.CONSEJERIA,
                Component: Component.Consejeria
              },
              {
                path: AppRoutingPaths.TERMINOS_CONDICIONES,
                Component: Component.terminosCondiciones
              },
            ]
          }
        ]
      },
      {
        path: AppRoutingPaths.PREGUNTAS_FRECUENTES,
        Component: Component.PreguntasFrecuentes
      },
      {
        path: AppRoutingPaths.AYUDA_EXTERIOR,
        Component: Component.AyudaLogin
      },
      {
        path: AppRoutingPaths.NOTFOUND,
        Component: Component.NotFound
      }
    ]
  }
]);


// export const AppRouting = createBrowserRouter([
//     {
//         Component: App,
//         children: [
//             {
//                 path: '/',
//                 Component: MainTemplate,
//                 children: [
//                     {
//                         path: AppRoutingPaths.BLANK,
//                         Component: Home,
//                     },
//                     {
//                         path: AppRoutingPaths.CALIFICACIONES,
//                         Component: Calificaciones,
//                     },
//                     {
//                         path: AppRoutingPaths.MIRUTA,
//                         Component: MiRuta,
//                     },
//                     {
//                         path: AppRoutingPaths.NOTFOUND,
//                         Component: NotFound
//                     }
//                 ]
//             },
//         ],
//     }
// ]);
