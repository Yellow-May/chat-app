import { Dispatch, SetStateAction, useContext, useMemo } from 'react';
import { Layout, Avatar, Image, Dropdown, Menu } from 'antd';
import { LOG_OUT } from 'context/reducer';
import { AppContext } from 'context/store';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { RoomType } from 'types';
import logo from 'assets/wide-logo.png';

type HeaderProps = {
	setRoom: Dispatch<SetStateAction<RoomType | null>>;
};

const Header = ({ setRoom }: HeaderProps) => {
	const context = useContext(AppContext);
	const dispatch = context?.dispatch;
	const { width } = useWindowDimensions();

	const menu = useMemo(
		() => (
			<Menu
				items={[
					{ key: '1', label: 'Account Management' },
					{
						key: '2',
						label: 'Logout',
						onClick: () => dispatch?.({ type: LOG_OUT }),
					},
				]}
			/>
		),
		[]
	);

	return (
		<Layout.Header>
			<img
				src={logo}
				alt='ymay'
				height='70%'
				onClick={() => width <= 900 && setRoom(null)}
			/>

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
