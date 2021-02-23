import React, { useCallback, useState, useEffect, useRef } from "react";
import { Typography, Avatar, Box } from "@material-ui/core";
import { useMessages } from "api/messages";
import { IAccount, IMessage } from "types";
import { useStore } from "store/hooks";
import useStyles from "./styles";
import Flex from "components/utils/Flex";
import cx from "classnames";
import ReactMarkdown from "react-markdown";
import { makeFullName, makeInitials } from "utils/general";

const Messages = ({ roomId, accounts }: { roomId: string, accounts: IAccount[] }) => {
    const messages = useMessages(roomId) || {};

    const getAuthor = useCallback((author_id) => accounts.find(account => account.id === author_id) ?? null, [accounts]);
    const currentAccount = useStore(state => state.currentAccount ?? null);

    const hasMessages = Object.keys(messages).length !== 0;

    return <Flex flexDirection="column-reverse" style={{ marginBottom: "15px", overflowY: "scroll", height: "calc(90vh - 152px)" }}>
        {messages && !hasMessages ?
            <Typography variant="h2" style={{ marginLeft: "30px" }}>Say Hi!</Typography>
            :
            Object.keys(messages).reverse().map((message_id: string, index: number) => {

                const message = messages[message_id];

                return <Message
                    key={message_id}
                    message={message}
                    author={getAuthor(message.author)}
                    displayAvatar={message.author !== messages[Object.keys(messages).reverse()[index - 1]]?.author}
                    isOwnedNextMessage = {message.author === messages[Object.keys(messages).reverse()[index - 1]]?.author}
                    isOwnedPrevMessage = {message.author === messages[Object.keys(messages).reverse()[index + 1]]?.author}
                    isOwned={currentAccount?.id === message.author} />
            })
        }
    </Flex>
}

const Message = ({ message, author, isOwned, displayAvatar, isOwnedNextMessage, isOwnedPrevMessage }: { message: IMessage, author: IAccount | null, isOwned: boolean, displayAvatar: boolean, isOwnedNextMessage: boolean, isOwnedPrevMessage: boolean }) => {
    const classes = useStyles();
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    let value = message.value;
    try {
        value = atob(message.value);
    } catch (err) {
        console.log(err);
    }

    const rootClasses = cx(classes.message, { [classes.ownedMessage]: isOwned, [classes.notOwnedMessage]: !isOwned, [classes.messageWithManyLines]: height>150, [classes.nextMessageNotOwned]: isOwnedNextMessage && !isOwned, [classes.prevMessageNotOwned]: isOwnedPrevMessage && !isOwned, [classes.nextMessageOwned]: isOwnedNextMessage && isOwned, [classes.prevMessageOwned]: isOwnedPrevMessage && isOwned});
    const bubbleClasses = cx({[classes.ownedMessage]: isOwned ,[classes.messageRoot]: !isOwned ,[classes.equalToLine]: !displayAvatar && !isOwned})

    useEffect(() => {
        setHeight((ref as any).current.offsetHeight);
    }, [])

    const authorFullName = makeFullName(author?.details?.first_name, author?.details?.last_name, author?.label ?? "Unknown")
    const authorInitials = makeInitials(author?.details?.first_name, author?.details?.last_name, author?.label ?? "Unknown")

    return <Box alignItems="flex-end" className={bubbleClasses} style={{ alignSelf: isOwned ? "flex-end" : "flex-start" }}>
            {displayAvatar && !isOwned && author && <Avatar alt={authorFullName} className={classes.avatar} src={author.avatar_url}>{authorInitials}</Avatar>}
            <div className={rootClasses} ref={ref}>
                <ReactMarkdown source={value} />
            </div>
    </Box>
}

export default Messages;