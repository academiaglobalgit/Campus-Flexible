import { Divider } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { useEffect, useState } from "react";

type AccordionPreguntaProps = {
    titleDivider: string;
    preguntas: any[];
};

export const AccordionPregunta: React.FC<AccordionPreguntaProps> = ({titleDivider, preguntas}) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if(preguntas) {
            setData(preguntas);
        }
    },[preguntas]);
    
    return (
        <>
            <Divider textAlign="center"
                sx={{ 
                    my: 2, 
                    '&::before, &::after': {
                        borderColor: 'primary.main',
                    },
                }}>
                <Typography component="span" variant="subtitle1" color="primary">{titleDivider}</Typography>
            </Divider>
            {
                data && data.map((item, index) => (
                    <Accordion key={index} title={"Pregunta Frecuente " + item}>
                        <Typography key={index} component="span" variant="subtitle1">
                            Aquí va la respuesta a la pregunta frecuente número {item}.
                        </Typography>
                    </Accordion>
                ))
            }
        </>
    );
};
