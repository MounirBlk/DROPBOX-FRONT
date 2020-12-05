import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "pos" | "root" | "title" | "btnEditer" | "btnDelete" |"formControl" | "selectEmpty" | "drawer";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root: {
        minWidth: 275,
        marginTop: theme.spacing(4)
        },
    title: {
        fontSize: 45,
    },
    pos: {
        marginBottom: 12,
    },
    btnEditer:{
        color: '#fff',
        backgroundColor: '#0055ff',
        '&:hover':{
            color: '#0055ff',
            backgroundColor: '#fff'
        }
    },
    formControl: {
        minWidth: "100%",
        MarginBottom: theme.spacing(1)
      },
    btnDelete:{
        color: '#fff',
        backgroundColor: '#ff3333',
        '&:hover':{
            color: '#ff3333',
            backgroundColor: '#fff'
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: 200,
          flexShrink: 0,
        },
    },
});