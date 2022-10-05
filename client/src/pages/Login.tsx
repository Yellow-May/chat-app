import { Link } from 'react-router-dom';
import { Button, Form, Input, Layout, Typography, message } from 'antd';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from 'context/store';
import { LOG_IN } from 'context/reducer';

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const context = useContext(AppContext);
	const dispatch = context?.dispatch;

	const onFinish = async (values: { email: string; password: string }) => {
		setIsLoading(true);
		try {
			const res = await axios.post('http://localhost:5000/auth/login', values);
			message.success(res.data?.message);
			dispatch?.({ type: LOG_IN, payload: res.data.data });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			message.error(error?.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout className='main-layout form-layout'>
			<Form layout='vertical' onFinish={onFinish}>
				<Typography.Title level={3} style={{ marginBottom: 24 }}>
					LOGIN
				</Typography.Title>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{ required: true, message: 'Please input your email' },
						{ type: 'email', message: 'Enter valid email' },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label='Password'
					rules={[{ required: true, message: 'Please input your password' }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button block type='primary' htmlType='submit' loading={isLoading}>
						Login
					</Button>
				</Form.Item>

				<Typography.Text>
					Don&lsquo;t have an account?&nbsp;
					<Link to='/register'>Register Now</Link>
				</Typography.Text>
			</Form>
		</Layout>
	);
};

export default LoginPage;
