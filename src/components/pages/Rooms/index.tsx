import React from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from "store/hooks";
import { IRoom } from "types";
import { ensureArray } from 'utils/general';
import FloatingList from 'components/shared/FloatingList';
import { RoomsItem } from './RoomsItem';
import CreateRoom from './CreateRoom';

const Rooms = () => {
    const history = useHistory();

    const isRoomOpen = history.location.pathname.includes("/room/");

    const currentAccount = useStore(state => state.currentAccount);

    return <FloatingList
        data={ensureArray(currentAccount?.rooms)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<CreateRoom />}
        expanded={isRoomOpen}
    />
}

const renderItem = ({ item }: { item: IRoom }) => <RoomsItem {...item} />;
const keyExtractor = ({ item }: { item: IRoom }) => item.id;

export default Rooms;