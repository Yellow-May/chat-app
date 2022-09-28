import { Dispatch, SetStateAction } from 'react';
import { Layout, Avatar, Typography, Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import data from 'data/dummy.json';

type SiderProps = {
	room: string | null;
	setRoom: Dispatch<SetStateAction<string | null>>;
};

const Sider = ({ room, setRoom }: SiderProps) => {
	return (
		<Layout.Sider className={room ? 'close' : ''}>
			<List
				header={<Typography.Title level={4}>My Contacts</Typography.Title>}
				dataSource={data}
				renderItem={item => (
					<List.Item
						style={{ cursor: 'pointer' }}
						onClick={() => setRoom(item.id)}>
						<List.Item.Meta
							avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
							title={<Typography.Text>{item.username}</Typography.Text>}
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
