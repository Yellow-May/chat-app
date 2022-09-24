// import { io } from 'socket.io-client';

import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

// io('http://localhost:5000');

const App = () => {
	return (
		<Layout className='main-layout'>
			<Header>Header</Header>

			<Layout>
				<Sider>Sider</Sider>
				<Content>Content</Content>
			</Layout>
		</Layout>
	);
};

export default App;
