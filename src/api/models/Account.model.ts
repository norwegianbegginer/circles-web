import { Dictionary, TAccountDetails, IRoom, IFriend } from "types";

/**
 * Model representing an Account.
 */
class Account {
    id: string;
    label: string;
    created_at: Date;
    contact: Dictionary<string>;
    avatar_url?: string;

    details: TAccountDetails;

    flags?: string[];
    rooms?: IRoom[];
    friends?: IFriend[];

    constructor(account: Dictionary<any>) {
        this.id = account.id;
        this.label = account.label;
        this.created_at = new Date(account.created_at);
        this.contact = account.contact ?? [];
        this.avatar_url = account.avatar_url;
        this.details = account.details ?? {};
        this.flags = account.flags;
        this.rooms = account.rooms;
        this.friends = account.friends;
    }

    get isValid() {
        return Boolean(this.id && this.label)
    }

    name(...include: ("first_name" | "last_name" | "middle_name")[]) {
        if (!include || include.length <= 0) include = ["first_name", "last_name"];

        return include.map(inc => this?.details?.[inc] ?? null).filter(inc => !!inc).join(" ") ?? this.label;
    }

    get initials() {
        if (!this.details.first_name && !this.details.last_name)
            return "Unknown";
        return (`${this.details.first_name[0]}${this.details.last_name[0]}`).toUpperCase();
    }
}

export default Account;