import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    message: {
        marginBottom: '30px',
        color: '#3f31b5',
    },
    button: {
        color: '#00a0a5',
        fontSize: '1.5em',
        '&:hover': {
            color: 'red',
        },
    },
    icon: {
        marginRight: 15,
    },
});
