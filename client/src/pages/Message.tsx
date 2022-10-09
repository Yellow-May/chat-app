import { useState } from 'react';
import { Layout } from 'antd';

import Header from 'components/Header';
import Sider from 'components/Sider';
import MessageSection from 'components/MessageSection';
import { RoomType } from 'types';

const MessagePage = () => {
	const [room, setRoom] = useState<RoomType | null>(null);

	return (
		<Layout className='main-layout'>
			<Header {...{ setRoom }} />

			<Layout>
				<Sider {...{ room, setRoom }} />

				<MessageSection {...{ room, setRoom }} />
			</Layout>
		</Layout>
	);
};

export default MessagePage;
