import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Layout, Avatar, Typography, Button, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import data from 'data/dummy.json';

type MessageSectionProps = {
	room: string | null;
	setRoom: Dispatch<SetStateAction<string | null>>;
};

type UserProps = {
	id: string;
	username: string;
};

const MessageSection = ({ room }: MessageSectionProps) => {
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const findUser = data.find(e => e.id === room);
		if (findUser) setUser(findUser);
	}, [room]);

	if (!room) return null;

	return (
		<Layout.Content>
			<div className='message-header'>
				<div className='user-info'>
					<Avatar
						style={{ border: 'thin solid gray', width: 40, height: 40 }}
						src='https://joeschmoe.io/api/v1/random'
					/>
					<Typography.Title level={4} style={{ marginBottom: 0 }}>
						{user?.username}
					</Typography.Title>
				</div>
			</div>
			<div className='message-body'>Message List</div>
			<div className='message-footer'>
				<Form layout='inline' size='large'>
					<Form.Item className='message-box'>
						<Input type='text' placeholder='Enter message...' />
					</Form.Item>

					<Form.Item className='send'>
						<Button icon={<SendOutlined />} />
					</Form.Item>
				</Form>
			</div>
		</Layout.Content>
	);
};

export default MessageSection;