import { useParams } from "react-router-dom";
import { Box, Collapse, Divider, Drawer, List, ListItemButton, ListItemIcon, useMediaQuery, useTheme } from "@mui/material";
import { ListaTareas } from "../../../assets/icons";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn, flexRows } from "@styles";
import { useGetListaPendientes } from "../../../services/CursosActivosService";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import type { ListaPendientes as IListaPendientes } from "@constants";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
import Button from "../../atoms/Button/Button";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DsSvgIcon from "../../atoms/Icon/Icon";

interface Props {
    goToTab: (tabIndex: number) => void;
}

export const ListaPendientesDrawer: React.FC<Props> = ({ goToTab }) => {
    const theme = useTheme();
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
                {
                    items.map((item, i) => (
                        <Box onClick={() => handleGoTo(1, item.entregado)} key={i} sx={{ ...flexRows, justifyContent: 'space-between', cursor: item.entregado === 1 ? 'default' : 'pointer' }}>
                            <Typography component="span" variant="body1" color="white">{item.titulo}</Typography>
                            {
                                item.entregado === 1 ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="white" />
                            }
                        </Box>
                    ))
                }
            </Box>
        )
    }

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
                sxProps={{
                    position: "fixed",
                    top: 100,
                    right: 0,
                    backgroundColor: isMobile ? "#fff" : " rgba(0, 90, 155, 0.80)",
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

    const CollapsibleListItem = ({ title, items }: { title: 'Actividades' | 'Contenido', items: IListaPendientes[] }) => {
        const [open, setOpen] = React.useState(false);
        const icons = {
            'Actividades': AutoStoriesIcon,
            'Contenido': WorkspacePremiumIcon,
            'Foros': ThumbsUpDownIcon,
            'Evaluaciones': StarBorderIcon,
        } as const;

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
                        <DsSvgIcon component={icons[title] ?? ListaTareas} color="white" />
                    </ListItemIcon>
                    <Typography component="p" variant="body2" color="white">
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

    const DrawerSection = () => {
        return (
            <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
                <Box
                    sx={{
                        width: isMobile ? 300 : 440,
                        height: "100vh",
                        backgroundColor: "#1A6FA7",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    <Box sx={{ display: 'flex', gap: '30px', alignItems: 'flex-start', p: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column-reverse', alignItems: "flex-start", gap: 1 }}>
                            <DsSvgIcon component={ListaTareas} color="white" sxProps={{ width: '36px' }} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="h5" component="h5" color="white">
                                Lista de pendientes
                            </Typography>
                            <Typography variant="body2" color="white" sx={{ mt: 1, textAlign: 'justify' }}>
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
                </Box>
            </Drawer>
        )
    }

    return (
        isLoading
            ?
            <LoadingCircular Text="Cargando Lista de pendientes..." />
            :
            <>
                <DrawerSection />
                <DrawerButton />
            </>
    )
}