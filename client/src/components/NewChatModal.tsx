import {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Avatar, Button, List, message, Modal, Typography } from 'antd';
import { RoomType, UserType } from 'types';
import { LOG_OUT } from 'context/reducer';
import { AppContext } from 'context/store';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

type NewChatModalProps = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	setRoom: Dispatch<SetStateAction<RoomType | null>>;
	fetchContacts: () => Promise<void>;
};

const NewChatModal = ({
	isModalOpen,
	setIsModalOpen,
	setRoom,
	fetchContacts,
}: NewChatModalProps) => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const context = useContext(AppContext);
	const token = context?.state.accessToken;
	const dispatch = context?.dispatch;

	const fetchUsers = useCallback(async () => {
		try {
			const res = await axios.get('http://localhost:5000/users', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUsers(res.data);
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
	}, [token]);

	useEffect(() => {
		fetchUsers();

		return () => {
			setUsers([]);
		};
	}, []);

	const createRoom = async (contact: UserType) => {
		try {
			const res = await axios.post(
				`http://localhost:5000/chats`,
				{ contactid: contact._id },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setIsModalOpen(false);
			setRoom({
				roomid: res.data?.room,
				messages: res.data?.messages,
				chatid: res.data?._id,
				contact,
			});
			fetchContacts();
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
		<Modal
			title='Start New Chat'
			open={isModalOpen}
			onCancel={() => {
				setIsModalOpen(false);
			}}
			footer={false}
			centered
			destroyOnClose={true}>
			<List
				dataSource={users}
				loading={isLoading}
				renderItem={item => (
					<List.Item
						style={{
							cursor: 'pointer',
							justifyContent: 'flex-start',
							gap: '8px',
						}}>
						<Avatar src='https://joeschmoe.io/api/v1/random' />
						<Typography.Text style={{ flexGrow: 1 }}>
							{item.email}
						</Typography.Text>
						<Button
							icon={<PlusOutlined />}
							style={{ borderRadius: '50%' }}
							onClick={() => createRoom(item)}
						/>
					</List.Item>
				)}
			/>
		</Modal>
	);
};

export default NewChatModal;
