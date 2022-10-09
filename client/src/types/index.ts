export type UserType = {
	_id: string;
	email: string;
};

type MessageType = {
	author: string;
	message: string;
	createdAt: string;
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
