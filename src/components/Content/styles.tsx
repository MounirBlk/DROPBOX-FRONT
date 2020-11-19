/* eslint-disable import/no-anonymous-default-export */
import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "paper" | "searchBar" | "searchInput" | "block" | "addUser" | "contentWrapper";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});