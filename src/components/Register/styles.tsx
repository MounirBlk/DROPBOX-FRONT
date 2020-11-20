/* eslint-disable import/no-anonymous-default-export */
import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "paper" | "avatar" | "form" | "submit";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0055ff",
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: "#0055ff",
      }
});