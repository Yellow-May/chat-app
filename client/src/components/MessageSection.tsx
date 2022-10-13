import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Layout, Avatar, Typography, Button, Form, Input, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ScrollToBottom from 'react-scroll-to-bottom';
import { MessageType, RoomType } from 'types';
import { io } from 'socket.io-client';
import { AppContext } from 'context/store';

const socket = io('http://localhost:5000');

const getTime = (date: Date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours < 10 ? `0${hours}` : hours}:${
		minutes < 10 ? `0${minutes}` : minutes
	}`;
};

type MessageSectionProps = {
	room: RoomType | null;
	setRoom: Dispatch<SetStateAction<RoomType | null>>;
};

const MessageSection = ({ room }: MessageSectionProps) => {
	const [messageList, setList] = useState<MessageType[]>([]);
	const [form] = Form.useForm<{ message: string }>();
	const context = useContext(AppContext);
	const user = context?.state.user;

	useEffect(() => {
		console.log(room);
		if (room) {
			setList(room?.messages);
			socket.emit('join_room', room?.roomid);

			socket.on('receive_message', (data: MessageType) => {
				setList(prev => [...prev, data]);
			});
		}

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('receive_message');
			setList([]);
		};
	}, [room, socket]);

	const sendMessage = (values: { message: string }) => {
		if (values.message && user) {
			const newMessage = {
				author: user._id,
				message: values.message,
				createdAt: Date.now(),
			};
			socket.emit('send_message', {
				roomid: room?.roomid,
				chatid: room?.chatid,
				...newMessage,
			});
			setList(prev => [...prev, newMessage]);
			form.resetFields();
		}
	};

	if (!room) {
		return null;
	}

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
			<ScrollToBottom className='message-body'>
				<List
					className='message-view'
					itemLayout='horizontal'
					dataSource={messageList}
					renderItem={({ author, message, createdAt }, idx) => {
						const allowImg = author !== messageList?.[idx - 1]?.author;
						const time = getTime(new Date(createdAt));

						return (
							<li
								key={createdAt}
								className={author === user?._id ? 'sent' : 'received'}>
								{allowImg ? (
									<Avatar
										size={25}
										style={{ border: 'thin solid gray' }}
										src='https://joeschmoe.io/api/v1/random'
									/>
								) : (
									<span className='empty' style={{ width: 25 }} />
								)}
								<p>{message}</p>
								<span className='time'>{time}</span>
							</li>
						);
					}}
				/>
			</ScrollToBottom>
			<div className='message-footer'>
				<Form
					form={form}
					layout='inline'
					size='large'
					onFinish={sendMessage}
					autoComplete='off'>
					<Form.Item name='message' className='message-box'>
						<Input type='text' placeholder='Enter message...' autoFocus />
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
