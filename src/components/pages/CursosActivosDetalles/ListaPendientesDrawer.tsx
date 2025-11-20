import { useParams } from "react-router-dom";
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, useMediaQuery, useTheme } from "@mui/material";
import { ListaTareas } from "../../../assets/icons";
import { Typography } from "../../atoms/Typography/Typography";
import { DrawerListaTareas } from "../../atoms/DrawerListaTareas/DrawerListaTareas";
import { flexColumn, flexRows } from "@styles";
import { useGetListaPendientes } from "../../../services/CursosActivosService";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import type { ListaPendientes as IListaPendientes } from "@constants";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
import Button from "../../atoms/Button/Button";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DsSvgIcon from "../../atoms/Icon/Icon";
import { usePlanEstudio } from "../../../context/PlanEstudioContext";

interface Props {
    goToTab: (tabIndex: number) => void;
}

const TipoRecursoIds: Record<string, number> = {
    Actividades: 1,
    Evaluaciones: 2,
    Contenido: 3,
    'Evaluación Final': 4,
    Foros: 5,
    Clase: 6,
    'Lista de pendientes': 7,
};

export const ListaPendientesDrawer: React.FC<Props> = ({ goToTab }) => {
    const theme = useTheme();
    const { config: configPlanEstudio } = usePlanEstudio();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams<{ id: string }>();
    const { data: lista, isLoading } = useGetListaPendientes(Number(id!));
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    const Sections = (items: IListaPendientes[]) => {
        return (
            <Box sx={{ ...flexColumn, alignItems: 'normal', gap: '10px' }}>
                {items.map((item, i) => {
                    const idTipo = TipoRecursoIds[item.tipo_recurso] ?? 0;

                    return (
                        <Box
                            key={i}
                            onClick={() => handleGoTo(idTipo, item.entregado)}
                            sx={{
                                ...flexRows,
                                justifyContent: 'space-between',
                                cursor: item.entregado === 1 ? 'default' : 'pointer',
                            }}
                        >
                            <Typography component="span" variant="body1" sxProps={{ color: '#fff' }}>
                                {item.titulo}
                            </Typography>

                            {item.entregado === 1 ? (
                                <CheckBoxIcon sx={{ color: '#fff' }} />
                            ) : (
                                <CheckBoxOutlineBlankIcon sx={{ color: '#fff' }} />
                            )}
                        </Box>
                    );
                })}
            </Box>
        );
    };


    const handleGoTo = (tab: number, entregado: number) => {
        if (entregado === 0) {
            goTo(tab);
        } else {
            return;
        }
    }

    const goTo = (tab: number) => {
        toggleDrawer(false)()
        goToTab(tab);
    };

    const DrawerButton = () => {
        return (
            <Button
                onClick={toggleDrawer(true)}
                variant="contained"
                icon={<DsSvgIcon component={ListaTareas} color={isMobile ? "primary" : "white"} />}
                iconPosition="start"
                disabled={isLoading}
                sxProps={{
                    position: "fixed",
                    top: 100,
                    right: 0,
                    backgroundColor: isMobile ? "#fff" : configPlanEstudio?.getColorDrawerListaTareas('rgba(0, 90, 155, 0.80)'),
                    borderRadius: "10px 0px 0px 10px",
                    padding: "8px 20px",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "none",
                    gap: "20px",
                }}
            >
                {!isMobile && 'Lista de Pendientes'}
            </Button>);
    }

    const CollapsibleListItem = ({ title, items }: { title: any, items: IListaPendientes[] }) => {
        const [open, setOpen] = React.useState(false);

        const icons = {
            'Actividades': AutoStoriesIcon,
            'Contenido': WorkspacePremiumIcon,
            'Foros': ThumbsUpDownIcon,
            'Evaluaciones': StarBorderIcon,
            'Clases': StarBorderIcon,
            'Tutorias': StarBorderIcon,
        } as const;

        const IconComponent =
            (title in icons
                ? icons[title as keyof typeof icons]
                : ListaTareas);

        return (
            <>

                <ListItemButton
                    onClick={() => setOpen(!open)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>

                    <ListItemIcon sx={{ color: 'white', justifyContent: 'center', minWidth: '36px' }}>
                        <DsSvgIcon component={IconComponent} color="white" />
                    </ListItemIcon>
                    <Typography component="p" variant="body2" sxProps={{ color: '#fff' }}>
                        {title}
                    </Typography>

                    {open ? <ExpandLess color="white" /> : <ExpandMore color="white" />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ pl: 2, py: 1.5 }}>{Sections(items)}</Box>
                </Collapse>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 1)' }} />

            </>

        );
    };


    return (
            <>
                <DrawerListaTareas isOpen={openDrawer} onClose={() => setOpenDrawer(false)}>

                    <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start', p: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column-reverse', alignItems: "flex-start", gap: 1 }}>
                            <DsSvgIcon component={ListaTareas} color="white" sxProps={{ width: '36px' }} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="h5" component="h5" sxProps={{ color: '#fff' }}>
                                Lista de pendientes
                            </Typography>
                            <Typography variant="body2" component="span" sxProps={{ color: '#fff', mt: 1, textAlign: 'justify' }}>
                                Aquí puedes llevar el control de tus tareas pendientes de forma rápida y organizada.
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                        <List>
                            {lista &&
                                Object.entries(lista).map(([title, items], index) => (
                                    <CollapsibleListItem key={index} title={title} items={items} />
                                ))}
                        </List>
                    </Box>

                </DrawerListaTareas>
                <DrawerButton />
            </>
    )
}