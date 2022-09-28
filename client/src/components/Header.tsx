import { Layout, Avatar, Image, Dropdown, Menu } from 'antd';
import logo from 'assets/wide-logo.png';

const menu = (
	<Menu
		items={[
			{ key: '1', label: 'Account Management' },
			{ key: '2', label: 'Logout' },
		]}
	/>
);

const Header = () => {
	return (
		<Layout.Header>
			<img src={logo} alt='ymay' height='70%' />

			<Dropdown overlay={menu} trigger={['click']}>
				<Avatar
					size={40}
					src={
						<Image
							src='https://joeschmoe.io/api/v1/random'
							style={{ width: '100%' }}
							preview={false}
						/>
					}
				/>
			</Dropdown>
		</Layout.Header>
	);
};

export default Header;
