import theme from "../themes/default";

export const flexRows = { display: "flex", alignItems: "center", justifyContent: "center" };
export const flexColumn = { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" };
export const accordionStyle = { backgroundColor: "#F8F8F9", boxShadow: "0px 2px 4px 0px #6BBBE44D", border: "1px solid #eceaea0d" };
export const innerHTMLStyle = {
    '& h1, h2': {
        font: theme.typography.h4
    },
    '& h1, h2, h3': {
        color: 'primary.main',
    },
    '& p': {
        marginBottom: '1rem',
        lineHeight: 1.6,
        color: 'text.primary'
    },
    '& ul': {
        paddingLeft: '1.5rem',
        listStyleType: 'disc',
    },
    '& a': {
        color: theme.palette.primary.main,
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    pl: 3, pr: 3
};

export const stylesEvaluaciones = {
    "& .evaluacion__star": {
        fontSize: "2rem",
        color: "grey",
        marginLeft: "-4px",
    },

    "& .evaluacion__clasificacion": {
        direction: "rtl",
        unicodeBidi: "bidi-override",
        padding: 0,
        margin: 0,
    },

    '& input.evaluacion__estrellas': {
        display: "none",
        paddingLeft: "5px",
    },

    '& input.evaluacion__estrellas:enabled ~ label:hover, \
   input.evaluacion__estrellas:enabled ~ label:hover ~ label': {
        color: "var(--accent-color)",
    },

    '& input.evaluacion__estrellas:checked ~ label': {
        color: "var(--accent-color)",
    },

    "& .evaluacion__wrapper.foro": {
        marginLeft: "1%",
    },

    "& .margin__left": {
        marginLeft: "5px",
    },
    "& button": {
        borderRadius: theme.shape.borderRadius * 2,   // bordes más redondeados
        padding: theme.spacing(1, 3),                // espaciado consistente
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: "none",                       // evita uppercase automático
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.primary.dark,
        color: 'white !important',
        transition: theme.transitions.create(
            ["background-color", "box-shadow", "transform"],
            { duration: theme.transitions.duration.short }
        ),

        "&:hover": {
            backgroundColor: 'white !important',
            boxShadow: theme.shadows[4],
            color: 'black !important',
            transform: "translateY(-2px)", // efecto sutil al pasar el mouse
        },

        "&:active": {
            boxShadow: theme.shadows[1],
            transform: "translateY(0px)",
        },

        "&.disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
            boxShadow: "none",
        },
    }
};
