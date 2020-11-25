import { createStyles, Theme } from '@material-ui/core';//makeStyles

export type Styles = "root" | "image" | "paper" | "avatar" | "form" | "submit" | "bg" | "progress";// add class create

export default (theme: Theme) => createStyles<Styles,{}>({
    root: {
        height: '100vh',
    },
    progress: {
        width:"100vw"
    },
    bg:{
        backgroundColor: 'lightgray',
    },
    image: {
        backgroundImage: 'url(https://image.jimcdn.com/app/cms/image/transf/none/path/s4aeeaf31f631cd80/image/i54bdaac389a91c34/version/1553158243/image.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});