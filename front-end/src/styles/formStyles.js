import { makeStyles } from "@material-ui/core/styles";

export const formStyles = makeStyles({
    row: {
        display: "flex",
        gap: 40,
        marginBottom: 48
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: 220
    }
});