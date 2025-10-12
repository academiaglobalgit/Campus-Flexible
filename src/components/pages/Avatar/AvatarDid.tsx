import React from 'react';
import { loadConfig } from '../../../config/configStorage';
import Button from '../../atoms/Button/Button';
import { AvatarButton } from "@iconsCustomizeds";
import DsSvgIcon from '../../atoms/Icon/Icon';
import { useMediaQuery } from '@mui/material';
import theme from '../../../themes/theme';

const AvatarDid: React.FC = () => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [config, setConfig] = React.useState<any>(null);
    const [verAva, setVerAvatarDid] = React.useState<boolean>(false);

    const handleVerAvatarDid = () => {
        // Ajustar la posición del botón dentro del shadow DOM
        const divElement = document.querySelector("body > div.didagent_target > div ");
        if (divElement && divElement.shadowRoot) {
            const shadowRoot = divElement.shadowRoot;
            const spanDiv = shadowRoot.querySelector("span");
            const button10 = shadowRoot.querySelector("span > button");

            if (button10) {
                (button10 as HTMLButtonElement).click();
            }

            if (spanDiv && spanDiv instanceof HTMLElement) {
                spanDiv.style.bottom = "6vh";
            }

        }

        setVerAvatarDid(prev => !prev);
    };

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    React.useEffect(() => {
        if (config) {
            // Mapea id_plan_estudio a sus keys
            const agentConfigs: Record<number, { clientKey: string; agentId: string }> = {
                17: {
                    clientKey: 'Z29vZ2xlLW9hdXRoMnwxMTgyODc4NjM3MDQwODcyOTIzNTI6dXlUbGxjbDJuWlhWY003OUh3cDA0',
                    agentId: 'v2_agt_4Yofx9b_',
                },
                19: {
                    clientKey: 'Z29vZ2xlLW9hdXRoMnwxMDkzMjkwOTg4MzA0Mzk1ODA4OTA6VnptQUZQOXVsSEZOWUJoc3lrWkxy',
                    agentId: 'v2_agt_XOcOADSD',
                },
            };

            const planId = config?.data?.id_plan_estudio;
            const currentAgent = agentConfigs[planId];

            if (currentAgent) {
                // Validar si ya existe el script
                const scriptName = 'script[data-name="did-agent"]';
                const existingScript = document.querySelector<HTMLScriptElement>(scriptName);

                if (!existingScript) {
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = 'https://agent.d-id.com/v2/index.js';
                    script.setAttribute('data-mode', 'fabio');
                    script.setAttribute('data-client-key', currentAgent.clientKey);
                    script.setAttribute('data-agent-id', currentAgent.agentId);
                    script.setAttribute('data-name', 'did-agent');
                    script.setAttribute('data-monitor', 'true');
                    script.setAttribute('data-orientation', 'horizontal');
                    script.setAttribute('data-position', 'right');

                    document.head.appendChild(script);

                    // esperar a que DID inserte el div y ocultarlo
                    const observer = new MutationObserver(() => {
                        const target = document.querySelector<HTMLDivElement>('.didagent_target');
                        if (target) {
                            target.style.display = 'none'; // oculto desde inicio
                            observer.disconnect();
                        }
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                }

                // Cleanup en un return (si es dentro de useEffect)
                return () => {
                    const script = document.querySelector<HTMLScriptElement>(scriptName);
                    if (script) {
                        document.head.removeChild(script);
                    }
                };
            }
        }


    }, [config]);

    React.useEffect(() => {
        const target = document.querySelector<HTMLDivElement>('.didagent_target');
        if (target) {
            if (verAva) {
                target.style.display = "block";
            } else {
                target.style.display = "none";
            }
        }
    }, [verAva]);

    return (

        <Button
            sxProps={{ position: 'fixed', bottom: 10, right: 16, zIndex: 999, width: isMobile ? 'auto' : '197px', height: '40px', borderRadius: '12px', gap: '8px', boxShadow: '0 2px 4px 0 rgba(107, 187, 228, 0.30)' }}
            onClick={handleVerAvatarDid}
            variant="contained"
            color="primary"
        >
            <DsSvgIcon component={AvatarButton} color="white" />
            {!isMobile && 'Asistente Virtual'}
        </Button>

    );
};

export default AvatarDid;