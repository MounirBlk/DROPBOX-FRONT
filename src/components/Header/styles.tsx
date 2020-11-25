import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "secondaryBar" | "button";// add class create

export default (theme: Theme) => createStyles<Styles,{
    /*onDrawerToggle: () => void;*/
}>({
    secondaryBar: {
        zIndex: 0,
    },
    button: {
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
});