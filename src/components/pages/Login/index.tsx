import React, { useState } from 'react';
import { useLittera } from "react-littera";
import useStyles from "./styles"
import translations from "./trans"
import { Button, TextField, Typography, Fab, Icon, CircularProgress, Backdrop } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Flex from "components/utils/Flex";
import loginImage from "assets/verifed.svg";
import waveAsset from "assets/wave.svg";
import { signInWithCredentials, signInWithPopup } from "api/auth";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatchCommand } from "api/hooks";
import { AccountInfo } from "api/commands";
import { useDispatch } from "store/hooks";
import { setCurrentAccount } from "store/actions";
import { useRestrictedPageForCurrentAccount } from 'utils/hooks/general';
import Account from 'api/models/Account.model';

// TODO: Translations...?

/**
 * Login page component.
 */
const Login = () => {
    const history = useHistory();
    const [translated] = useLittera(translations);
    const classes = useStyles();
    const dispatchCommand = useDispatchCommand();
    const dispatchStore = useDispatch();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useRestrictedPageForCurrentAccount();

    const handleLogin = async (result: any) => {
        const account = await dispatchCommand(AccountInfo, result?.user?.uid || "", true);

        if (account.status === 200) {
            //const accountIdToken = await getCurrentUserIdToken();

            // ! Remember account id token.
            //storageSetter("accountIdToken", accountIdToken ?? "");
            dispatchStore(setCurrentAccount(new Account({ id: result?.user?.uid, ...account.data })));

            if (account.data?.flags?.includes("needs_init"))
            {
                history.push("/welcome");
            } else {
                // TODO: Save device_token.
                // const device_token = await getDeviceToken();
                history.push("/home");

            }
        } else if(account.status === 404) {
            // TODO: Account not found! What shall be done then?
            setErrorMsg("Account not found!");
        }
        if(account.status !== 0) setIsLoading(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMsg("");
        setIsLoading(true)

        if (!isLoading) {
            const email = emailInput;
            const password = passwordInput;
            signInWithCredentials(email, password).then(handleLogin).catch(err => {
                setErrorMsg(err.message);
                setIsLoading(false);
            });
        }
    }

    const handlePopupLogin = () => {
        setErrorMsg("");
        setIsLoading(true);
        signInWithPopup()
            .then(handleLogin)
            .catch((error) => {
                setErrorMsg(error.message);
                setIsLoading(false);
            });

    }

    const handleInputChange = (inputName: string) => (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // @ts-ignore
        const newValue = event?.target?.value ?? "";

        if (!isLoading) {
            if (inputName === "email") setEmailInput(newValue);
            if (inputName === "password") setPasswordInput(newValue);
        }
    }
    
    const handleBack = () => {
        history.push("/signup");
    }

    return <div style={{ width: "100%" }}>

        <div className={classes.imgContainer}>
            <img className={classes.loginImage} src={loginImage} alt="loginImage" />
            <img className={classes.wave} src={waveAsset} alt="" />
        </div>


        <Flex justifyContent="center" width="100%" className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h3" paragraph>
                    {translated.title}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Flex className={classes.inputWrapper} flexDirection="column">
                        <TextField style={{ marginBottom: "15px" }} id="email-input" value={emailInput} onChange={handleInputChange("email")} type="email" label="E-Mail" variant="outlined" />
                        <TextField style={{ marginBottom: "15px" }} id="password-input" value={passwordInput} onChange={handleInputChange("password")} type="password" label="Password" variant="outlined" />
                    </Flex>

                    {errorMsg && <Alert style={{ margin: "10px 0" }} severity="error">
                        <AlertTitle>Upps...</AlertTitle>
                        {errorMsg}
                    </Alert>}

                    <Flex justifyContent="space-between">
                        <Button onClick={handleBack} color="primary" type="button">Sign Up</Button>
                        <Fab color="primary" aria-label="add" type="submit">
                            <Icon style={{ color: "white" }}>keyboard_arrow_right</Icon>
                        </Fab>
                    </Flex>

                </form>
                <Button onClick={handlePopupLogin} type="button">Login with Google!</Button>
            </div>
        </Flex>
        <Flex className={classes.footerWrapper} alignItems="center" justifyContent="flex-end" height="42px">
            <Typography align="right">Forgot password?</Typography>
        </Flex>

        {!isLoading ? null :
            <Backdrop open={true} style={{zIndex:5}}>
                <CircularProgress color="primary" />
            </Backdrop>}

    </div>
}



export default Login;