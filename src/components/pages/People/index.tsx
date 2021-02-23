import React from 'react';
import { Typography } from "@material-ui/core";
import { useStore } from "store/hooks";
import ContactLabel from './ContactLabel';
import { useLittera } from "react-littera";
import translations from "./trans";
import FloatingList from 'components/shared/FloatingList';
import { IFriend } from 'types';
import { ensureArray } from 'utils/general';
import CreateRoom from '../Rooms/CreateRoom';
import { useHistory } from 'react-router-dom';


const People = () => {
    const history = useHistory();
    const [translated] = useLittera(translations);

    const currentAccount = useStore(state => state.currentAccount);
    const isRoomOpen = history.location.pathname.includes("/room/");

    return <FloatingList
        data={ensureArray(currentAccount?.friends)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        expanded={isRoomOpen}
        // Using CreateRoom for now till we figure out what to do with the button...
        ListHeaderComponent={<CreateRoom />}
        ListEmptyComponent={<Typography variant="h4" align="center">{translated.peopleMessage}</Typography>}
    />
}

const renderItem = ({ item }: { item: IFriend }) => <ContactLabel {...item} />;
const keyExtractor = ({ item }: { item: IFriend }) => item.account_id;

export default People;