import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "root";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root: {
        backgroundColor: "#fff"
    }
})