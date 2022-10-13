import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Layout, Avatar, Typography, Button, List, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AppContext } from 'context/store';
import { LOG_OUT } from 'context/reducer';
import { ContactType, RoomType } from 'types';
import NewChatModal from './NewChatModal';

type SiderProps = {
	room: RoomType | null;
	setRoom: Dispatch<SetStateAction<RoomType | null>>;
};

const Sider = ({ room, setRoom }: SiderProps) => {
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const context = useContext(AppContext);
	const token = context?.state.accessToken;
	const dispatch = context?.dispatch;

	const fetchContacts = async () => {
		try {
			const res = await axios.get('http://localhost:5000/contacts', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setContacts(res.data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			message.error(error?.response?.data?.message);
			if (error?.response.status === 403) {
				dispatch?.({ type: LOG_OUT });
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchContacts();

		return () => {
			setContacts([]);
		};
	}, []);

	const joinRoom = async ({ chatid, contact, unread }: ContactType) => {
		try {
			const res = await axios.get(`http://localhost:5000/chats/${chatid}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRoom({
				roomid: res.data?.room,
				messages: res.data?.messages,
				chatid,
				contact,
			});
			if (unread)
				setContacts(prev =>
					prev.map(e => {
						if (chatid === e.chatid) {
							return { ...e, unread: false };
						}
						return e;
					})
				);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			message.error(error?.response?.data?.message);
			if (error?.response.status === 403) {
				dispatch?.({ type: LOG_OUT });
			}
		}
	};

	return (
		<>
			<Layout.Sider className={room ? 'close' : ''}>
				<List
					header={<Typography.Title level={4}>My Contacts</Typography.Title>}
					dataSource={contacts}
					loading={isLoading}
					renderItem={item => (
						<List.Item
							style={{ cursor: 'pointer', position: 'relative' }}
							onClick={() => joinRoom(item)}>
							<List.Item.Meta
								avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
								title={<Typography.Text>{item.contact.email}</Typography.Text>}
								description='Last message...'
							/>
							{item.unread && <span className='unread' />}
						</List.Item>
					)}
				/>
				<Button
					title='start new chat'
					className='fab-new'
					icon={<PlusOutlined />}
					onClick={() => setIsModalOpen(true)}
				/>
			</Layout.Sider>

			{isModalOpen && (
				<NewChatModal
					{...{ isModalOpen, setIsModalOpen, setRoom, fetchContacts }}
				/>
			)}
		</>
	);
};

export default Sider;
