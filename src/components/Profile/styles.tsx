import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles =  "pos" |  "div" | "root" | "title" | "btnEditer" | "btnDelete" |"formControl" | "selectEmpty" | "drawer";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root: {
        minWidth: 275,
        marginTop: theme.spacing(4)
        },
        div:{
            marginTop: "10%"
        },
    title: {
        fontSize: 45,
    },
    pos: {
        marginBottom: 12,
    },
    btnEditer:{
        marginTop: theme.spacing(4),
        color: '#fff',
        backgroundColor: '#3f51b5',
        '&:hover':{
            color: '#fff',
            backgroundColor: '#2277aa'
        }
    },
    formControl: {
        minWidth: "100%",
        MarginBottom: theme.spacing(1)
      },
    btnDelete:{
        marginTop: theme.spacing(4),
        color: '#fff',
        backgroundColor: '#ff2222',
        '&:hover':{
            color: '#fff',
            backgroundColor: '#ff7777'
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
    }  
});