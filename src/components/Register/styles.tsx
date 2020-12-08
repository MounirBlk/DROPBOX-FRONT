import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "paper" | "avatar" | "form" | "submit" | "formControl" | "selectEmpty" ;// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        padding:"3%",
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
          margin: theme.spacing(3, 0, 2),
      },
      formControl: {
        minWidth: "100%",
        MarginBottom: theme.spacing(1)
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
});