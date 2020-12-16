import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles =  "root";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root:{
        backgroundColor: "#fff",
        height: "100vh",
        width: "100vw",
        border: "1px solid white",
        padding: "0px",
        margin: '0px',
        overflowX: "hidden"
    }
})