import { Layout, Avatar, Image, Dropdown, Menu } from 'antd';
import logo from 'assets/wide-logo.png';
import { LOG_OUT } from 'context/reducer';
import { AppContext } from 'context/store';
import { useContext, useMemo } from 'react';

const Header = () => {
	const context = useContext(AppContext);
	const dispatch = context?.dispatch;

	const logout = () => {
		dispatch?.({ type: LOG_OUT });
	};

	const menu = useMemo(
		() => (
			<Menu
				items={[
					{ key: '1', label: 'Account Management' },
					{ key: '2', label: 'Logout', onClick: logout },
				]}
			/>
		),
		[]
	);

	return (
		<Layout.Header>
			<img src={logo} alt='ymay' height='70%' />

			<Dropdown
				overlay={menu}
				trigger={['click']}
				overlayStyle={{ cursor: 'pointer' }}>
				<Avatar
					size={40}
					src={
						<Image
							src='https://joeschmoe.io/api/v1/random'
							style={{ width: '100%', cursor: 'pointer' }}
							preview={false}
						/>
					}
				/>
			</Dropdown>
		</Layout.Header>
	);
};

export default Header;
