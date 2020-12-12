import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "root"|"title"|"submit";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
  root: {
    minWidth: 275,
    alignItems: 'center',
    textAlign:"center"
  },
  title: {
    fontSize: 44,
    alignItems: 'center',
    textAlign:"center",
    color: "#5555ff",
    paddingTop:  theme.spacing(10),
    marginBottom:  theme.spacing(10)
  },
  submit: {
          backgroundColor: "#4444ff",
          alignItems: 'center',
          textAlign:"center",
          fontSize: 44,
          minWidth: "85%"
      },
})