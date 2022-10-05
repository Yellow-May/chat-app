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

type SiderProps = {
	room: string | null;
	setRoom: Dispatch<SetStateAction<string | null>>;
};

const Sider = ({ room, setRoom }: SiderProps) => {
	const [users, setUsers] = useState<{ id: string; email: string }[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const context = useContext(AppContext);
	const token = context?.state.accessToken;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get('http://localhost:5000/users', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(res.data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log(error);
				message.error(error?.response?.data?.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUsers();

		return () => {
			setUsers([]);
		};
	}, []);

	return (
		<Layout.Sider className={room ? 'close' : ''}>
			<List
				header={<Typography.Title level={4}>My Contacts</Typography.Title>}
				dataSource={users}
				loading={isLoading}
				renderItem={item => (
					<List.Item
						style={{ cursor: 'pointer' }}
						onClick={() => setRoom(item.id)}>
						<List.Item.Meta
							avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
							title={<Typography.Text>{item.email}</Typography.Text>}
							description='Last message...'
						/>
					</List.Item>
				)}
			/>
			<Button
				title='start new chat'
				className='fab-new'
				icon={<PlusOutlined />}
				onClick={() => setRoom('1')}
			/>
		</Layout.Sider>
	);
};

export default Sider;
