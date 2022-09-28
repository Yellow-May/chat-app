import { useState } from 'react';
import { Layout } from 'antd';

import Header from 'components/Header';
import Sider from 'components/Sider';
import MessageSection from 'components/MessageSection';

const MessagePage = () => {
	const [room, setRoom] = useState<string | null>(null);

	return (
		<Layout className='main-layout'>
			<Header />

			<Layout>
				<Sider {...{ room, setRoom }} />

				<MessageSection {...{ room, setRoom }} />
			</Layout>
		</Layout>
	);
};

export default MessagePage;
