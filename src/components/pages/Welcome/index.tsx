import React, { useState } from "react";
import { useLittera } from "react-littera";
import useStyles from "./styles"
import translations from "./trans"
import { Typography } from "@material-ui/core";
import { useStore, useDispatch } from "store/hooks";
import { TextField } from '@material-ui/core';
import Flex from "components/utils/Flex";
import Button from '@material-ui/core/Button';
import waveAsset from "assets/wave.svg";
import personalInformationImage from "assets/personal.svg";
import { useDispatchCommand } from "api/hooks";
import { AccountChange, AccountInfo } from "api/commands";
import { setCurrentAccount } from "store/actions";
import { useHistory } from "react-router-dom";
import Account from "api/models/Account.model";

type EditableField = "label" | "first_name" | "middle_name" | "last_name" | "birthday" | "sex";

/**
 * Welcome page component.
 */
const Welcome = () => {
    const history = useHistory();
    const [translated] = useLittera(translations);
    const classes = useStyles();

    const dispatchStore = useDispatch();
    const dispatchCommand = useDispatchCommand();
    const currentAccount = useStore(state => state.currentAccount);

    const [labelField, setLabelField] = useState(currentAccount?.label ?? "");
    const [firstNameField, setFirstNameField] = useState(currentAccount?.details?.first_name ?? "");
    const [middleNameField, setMiddleNameField] = useState(currentAccount?.details?.middle_name ?? "");
    const [lastNameField, setLastNameField] = useState(currentAccount?.details?.last_name ?? "");
    const [dateOfBirth, setDateOfBirth] = useState(currentAccount?.details?.birthdate ?? new Date());
    const [sex, setSex] = useState(currentAccount?.details?.sex ?? "O");


    const handleChange = (event: any) => {
        const field = (event?.target?.id ?? "") as EditableField;
        const value = event?.target?.value ?? "";

        switch (field) {
            case "label":
                setLabelField(value)
                break;
            case "first_name":
                setFirstNameField(value)
                break;
            case "middle_name":
                setMiddleNameField(value)
                break;
            case "last_name":
                setLastNameField(value)
                break;
            case "birthday":
                setDateOfBirth(value)
                break;
            case "sex":
                setSex(value)
                break;
            // ...
        }
    }

    const handleSubmit = async () => {

        if (labelField && firstNameField && middleNameField && lastNameField && dateOfBirth && sex) {
            const changeRq = await dispatchCommand(AccountChange, currentAccount?.id || "", JSON.parse(JSON.stringify({ label: labelField, details: {  first_name: firstNameField, middle_name: middleNameField, last_name: lastNameField, birthdate: dateOfBirth.toString(), sex: sex } })));

            if (changeRq.status === 204) {
                const account = await dispatchCommand(AccountInfo, currentAccount?.id || "", true);

                if (account.status === 200) {
                    dispatchStore(setCurrentAccount(new Account({ id: currentAccount?.id, ...account.data })));
                }

                history.push("/home");
            }
        } else {
            // TODO: Error message and Alert component!
            alert("Implement error handling!");
        }
    }

    return <div>
        <div className={classes.imgContainer}>
            <img className={classes.personalImage} src={personalInformationImage} alt="PersonalInformation" />
            <img className={classes.wave} src={waveAsset} alt="wave" />
        </div>
        <div className={classes.root}>

            <Typography className={classes.welcomeTitle} variant="h2">{translated.title} {currentAccount?.label}</Typography>

            <Typography style={{ opacity: "0.7", marginBottom: "35px" }} paragraph>Here you need to provide us with some data about you. Name, Surname etc.</Typography>

            <Typography style={{ paddingBottom: "16px" }} variant="h4">Personal information</Typography>
            <Flex flexDirection="column" className={classes.inputWrapper}>
                <TextField style={{ marginBottom: "15px" }} id="label" label="Label" variant="outlined" value={labelField} onChange={handleChange} />
                <TextField style={{ marginBottom: "15px" }} id="first_name" label="First Name" variant="outlined" value={firstNameField} onChange={handleChange} />
                <TextField style={{ marginBottom: "15px" }} id="middle_name" label="Middle Name" helperText="Optional" variant="outlined" value={middleNameField} onChange={handleChange} />
                <TextField style={{ marginBottom: "15px" }} id="last_name" label="Last Name" variant="outlined" value={lastNameField} onChange={handleChange} />
                <TextField id="birthday" label="Birthday" type="date" defaultValue="1990-01-01" InputLabelProps={{ shrink: true, }} value={dateOfBirth} onChange={handleChange}/>
            </Flex>

            <Button style={{ color: "white", float: "right", marginBottom: "15px" }} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>

        </div>

    </div>
}

export default Welcome;