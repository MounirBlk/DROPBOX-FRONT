/* eslint-disable import/no-anonymous-default-export */
import { createMuiTheme, createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "root" | "app" | "main" | "footer" | "drawer";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: 200,
          flexShrink: 0,
        },
    },
});


