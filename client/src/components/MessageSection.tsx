import { Dispatch, SetStateAction, useEffect } from 'react';
import { Layout, Avatar, Typography, Button, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { RoomType } from 'types';

type MessageSectionProps = {
	room: RoomType | null;
	setRoom: Dispatch<SetStateAction<RoomType | null>>;
};

const MessageSection = ({ room }: MessageSectionProps) => {
	useEffect(() => {
		console.log(room);
	}, [room]);
	return (
		<Layout.Content>
			<div className='message-header'>
				<div className='user-info'>
					<Avatar
						style={{ border: 'thin solid gray', width: 40, height: 40 }}
						src='https://joeschmoe.io/api/v1/random'
					/>
					<Typography.Title level={4} style={{ marginBottom: 0 }}>
						{room?.contact?.email}
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
