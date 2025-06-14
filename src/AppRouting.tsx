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
                path: AppRoutingPaths.MIRUTA,
                Component: Component.MiRuta
              },
              {
                path: AppRoutingPaths.SERVICIOS_ESCOLORES,
                Component: Component.ServiciosEscolares
              },
              {
                path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT,
                Component: Component.PreguntasFrecuentes
              },
              {
                path: AppRoutingPaths.CALENDARIO,
                Component: Component.Calendario
              },
              {
                path: AppRoutingPaths.PLAN_ESTUDIOS,
                Component: Component.PlanEstudio
              }
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