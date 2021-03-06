import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "list" | "fullList";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    list: {
        width: 350
      },
      fullList: {
        width: "auto"
      }
})