import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "root"| "bullet"| "submit" | "title"| "pos";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
   root: {
    minWidth: 275,
    alignItems: 'center',
    textAlign:"center"
  },
submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#5555ff",
    },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})