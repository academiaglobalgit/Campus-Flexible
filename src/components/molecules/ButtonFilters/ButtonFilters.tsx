import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

type ButtonFilterType = {
    filter: string[];
    onClick: (filter: string) => void;
    defaultSelected?: string; // Opcional: botón seleccionado por defecto
}

export const ButtonFilters: React.FC<ButtonFilterType> = ({
    filter, 
    onClick, 
    defaultSelected
}) => {
    const [selected, setSelected] = useState<string>(defaultSelected || filter[0]);

    const handleClick = (item: string) => {
        setSelected(item);
        if(onClick) onClick(item);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            {
                filter.map((item, index) => (
                    <Button 
                        key={index}
                        variant={selected === item ? "contained" : "outlined"}
                        onClick={() => handleClick(item)}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: selected === item ? 'primary.main' : 'grey.300',
                            color: selected === item ? 'white' : 'text.primary',
                            '&:hover': {
                                backgroundColor: selected === item ? 'primary.dark' : 'grey.400',
                            },
                            ...(selected !== item && {
                                borderColor: 'transparent',
                            }),
                        }}
                    >
                        {item}
                    </Button>
                ))
            }
        </Box>
    );
}