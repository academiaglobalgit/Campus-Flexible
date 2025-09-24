import { Divider, type SxProps, type Theme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { useEffect, useState } from "react";
import type { Pregunta } from "../../../types/preguntas-frecuentes.interface";

type AccordionPreguntaProps = {
    isExternal?: boolean;
    titleDivider?: string;
    preguntas: Pregunta[];
};

export const AccordionPregunta: React.FC<AccordionPreguntaProps> = ({titleDivider, preguntas, isExternal = true}) => {
    const [data, setData] = useState<Pregunta[]>([]);
    const [ sxProps, setSxProps ] = useState<SxProps<Theme> | undefined>(undefined);
    
    useEffect(() => {
        if(preguntas) {
            setData(preguntas);
        }
    },[preguntas]);

    useEffect(() => {
        if(!isExternal) {
            setSxProps({
                backgroundColor: "#F8F8F9", 
                boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                border: "1px solid #BABABA0D"
            });
        }
    },[isExternal]);
    
    return (
        <>
            {
                titleDivider && <Divider textAlign="center">
                    <Typography component="span" variant="subtitle1" color="primary">{titleDivider}</Typography>
                </Divider>
            }
            {
                data && data.map((item, index) => (
                    <Accordion key={index} title={item.pregunta} sxProps={sxProps}>
                        <Typography key={index} component="span" variant="subtitle1">
                            <span dangerouslySetInnerHTML={{ __html: item.respuesta }} />
                        </Typography>
                    </Accordion>
                ))
            }
        </>
    );
};
