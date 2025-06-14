import App from "./App";
import { AppRoutingPaths } from "@constants";
import { createHashRouter } from "react-router-dom";
// createBrowserRouter
// createHashRouter
import { 
    Calificaciones,
    Home, 
    LoginPage,
    MainTemplate, 
    MiRuta,
    PreguntasFrecuentes,
    NotFound,
    AyudaLogin,
    ServiciosEscolares
} from "@components";

import { ProtectedRoute } from "./components/templates/ProtectedRoute";


export const AppRouting = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: AppRoutingPaths.LOGIN,
        Component: LoginPage,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            Component: MainTemplate, // Layout para las rutas protegidas
            children: [
              {
                path: AppRoutingPaths.BLANK,
                Component: Home
              },
              {
                path: AppRoutingPaths.CALIFICACIONES,
                Component: Calificaciones
              },
              {
                path: AppRoutingPaths.MIRUTA,
                Component: MiRuta
              },
              {
                path: AppRoutingPaths.SERVICIOS_ESCOLORES,
                Component: ServiciosEscolares
              },
              {
                path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT,
                Component: PreguntasFrecuentes
              }
            ]
          }
        ]
      },
      {
        path: AppRoutingPaths.PREGUNTAS_FRECUENTES,
        Component: PreguntasFrecuentes
      },
      {
        path: AppRoutingPaths.AYUDA_EXTERIOR,
        Component: AyudaLogin
      },
      {
        path: '*',
        Component: NotFound
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