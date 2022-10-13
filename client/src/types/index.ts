export type UserType = {
	_id: string;
	email: string;
};

export type MessageType = {
	author: string;
	message: string;
	createdAt: number;
};

export type RoomType = {
	roomid: string;
	chatid: string;
	contact: UserType;
	messages: MessageType[];
};

export type ContactType = {
	chatid: string;
	contact: UserType;
};
