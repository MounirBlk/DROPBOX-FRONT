/* eslint-disable import/no-anonymous-default-export */
import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "labelRoot" | "labelIcon" | "labelText" | "paper" | "searchBar" | "block" | "addFile" | "contentWrapper" | "roottreeview" | "secondaryBar";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
        display: 'block',
    },
    addFile: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    roottreeview: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    secondaryBar:{
        zIndex: 0,
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
      },
      labelIcon: {
        marginRight: theme.spacing(1),
      },
      labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
      },
});