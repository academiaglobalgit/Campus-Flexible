import type { ReactElement } from "react";
import { useDocumentos } from "../../../context/DocumentosContext";
import Button from "../../atoms/Button/Button";
import type { Documento } from "../../../types/Documentos.interface";

interface ManualsButtonProps {
    idTipoManual: number;
    icon?: ReactElement;
    variant?: 'text' | 'outlined' | 'contained';
    onClick?: (manual: Documento) => void;
}

export const ManualsButton: React.FC<ManualsButtonProps> = ({ idTipoManual, icon = undefined, variant = 'contained', onClick }) => {
    const { documentos } = useDocumentos();
    const manual = documentos.find(doc => doc.id_tipo_manual === idTipoManual);

    const handleOpen = () => {
        if (manual) {
            if (manual.id_tipo_manual === 6) {
                if (onClick) onClick(manual);
            } else {
                if (manual.url_archivo) {
                    const domain = `https://campusflexible.academiaglobal.mx/`
                    const url = manual.url_archivo.startsWith('http') ? manual.url_archivo : `${domain}${manual.url_archivo}`;
                    window.open(url, '_blank');
                }
            }
        }
    }

    return(
        manual && <Button
            fullWidth
            variant={variant}
            color="primary"
            onClick={() => manual!.url_archivo && handleOpen()}
            disabled={manual!.url_archivo === null || manual!.url_archivo === ""}
            icon={icon}
            iconPosition={icon ? "start" : undefined}
        >
          {manual!.titulo}
        </Button>
    );
}