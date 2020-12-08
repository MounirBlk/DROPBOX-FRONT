import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "paper" | "form" | "submit";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
  paper: {
    marginTop: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '43%'
  },
  form: {
    width: '100%', // Fix IE 11 (issue).
    marginTop: theme.spacing(3),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  }
});