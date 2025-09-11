import React from 'react';
import { loadConfig } from '../../../config/configStorage';

const AvatarDid: React.FC = () => {

    const [config, setConfig] = React.useState<any>(null);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    React.useEffect(() => {
        if (config) {
            if (config?.data?.id_plan_estudio === 17) { // Diplomados
                // Validar si ya existe el script
                const scriptName = 'script[data-name="did-agent"]';
                const existingScript = document.querySelector<HTMLScriptElement>(scriptName);

                if (!existingScript) {
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = 'https://agent.d-id.com/v2/index.js';
                    script.setAttribute('data-mode', 'fabio');
                    script.setAttribute(
                        'data-client-key',
                        'Z29vZ2xlLW9hdXRoMnwxMTgyODc4NjM3MDQwODcyOTIzNTI6dXlUbGxjbDJuWlhWY003OUh3cDA0'
                    );
                    script.setAttribute('data-agent-id', 'v2_agt_4Yofx9b_');
                    script.setAttribute('data-name', 'did-agent'); // 👈 clave para evitar duplicados
                    script.setAttribute('data-monitor', 'true');
                    script.setAttribute('data-position', 'right');

                    document.head.appendChild(script);
                }

                // Cleanup: solo borrar si el componente desmonta y el script existe
                return () => {
                    const script = document.querySelector<HTMLScriptElement>(scriptName);
                    if (script) {
                        document.head.removeChild(script);
                    }
                };
            }
        }

    }, [config]);

    return null;
};

export default AvatarDid;