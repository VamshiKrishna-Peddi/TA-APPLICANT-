import React from 'react';
import { LockOutlined, UserOutlined , MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input ,Select} from 'antd';
import { Modal } from 'antd'; 
import { useState} from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { setEmail, setUserType } from '../actions/userActions';
import { setName } from '../actions/userActions';
import axios from 'axios';
const { Option } = Select;
const LoginFunction = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email,setEmailA]=useState('');
  const [password,setPassword]=useState('');
  const [usertype,setUsertypeA]=useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const[nameP,setLoggedInUserName]=useState('');
  const[id,setID]=useState('');
  const onFinish = (event) => {
    console.log('Received values of form: ', event);
    axios
      .post('http://backend-production-16a6.up.railway.app/login', { email, password, usertype,id })
      .then((res) => {
        console.log(res);
        if (res.data.message === 'Login success') {
          const { name } = res.data;
          setLoggedInUserName(name);
          dispatch(setEmail(email));
          dispatch(setUserType(usertype));
          dispatch(setName(name));
          
          // Store the 'name' in a variable, e.g., 'loggedInUserName'
          setSuccessModalVisible(true); // Show the success modal
         console.log(name);
        } else {
          setFailModalVisible(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOkClick = () => {
    setSuccessModalVisible(false); // Close the success modal
    if(usertype==='TA Applicant')
    {
              router.push('/taApplicantDashboard');
           
     
    }
    else if(usertype==='TA Committee Member')
    {
      router.push('/taCommitteeMemberDashboard');
    }
    else if(usertype==='Administrator')
    {
      router.push('/administratorDashboard');
    }
    else
    {
      router.push('/instructorDashboard');
    }
  };
  const handleOkFailClick = () => {
    setFailModalVisible(false); // Close the success modal
    router.push('/loginPage');
  };
  const boxStyle = {
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white
    backdropFilter: 'blur(5px)', // Apply a blur effect to the background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://cdn.wallpapersafari.com/83/90/xmWSjz.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
   
 

    <div style={backgroundStyle}>
       
      <div style={boxStyle}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          
        >
          <h2 style={headingStyle}>Sign in to Florida Atlantic University</h2>

          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={e=>setEmailA(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: 'Please input your ID!',
              },
            ]}
          >
                     <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="ID" onChange={e =>setID(e.target.value)}/>

          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={e =>setPassword(e.target.value)}
            />
          </Form.Item>
          
          <Form.Item
  name="usertype"
  rules={[
    {
      required: true,
      message: 'Please choose the usertype',
    },
  ]}
>
  <Select
  prefix={<UserOutlined />}

    placeholder="Select User Type"
    onChange={value => setUsertypeA(value)}
  >
    <Option value="TA Applicant" >TA Applicant</Option>
    <Option value="Administrator">Administrator</Option>
    <Option value="TA Committee Member">TA Committee Member</Option>
    <Option value="Instructor">Instructor</Option>
  </Select>
</Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span style={{ margin: '0 8px' }}>Or</span>
            <a href="/register">Register now!</a>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Login Successful"
        visible={successModalVisible}
        onOk={handleOkClick}
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="sign-in" type="primary" onClick={handleOkClick}>
            Ok
          </Button>,
        ]}
      >
        <p>Login successful. Click the "Ok" button to redirect to dashboard.</p>
      </Modal>
      <Modal
        title="Login Failed"
        visible={failModalVisible}
        onOk={handleOkFailClick}
        onCancel={() => setFailModalVisible(false)}
        footer={[
          <Button key="sign-in" type="primary" onClick={handleOkFailClick}>
            Ok
          </Button>,
        ]}
      >
        <p>Login Failed. Invalid Credentails.</p>
      </Modal>
     
    </div>

  );
};


export default  LoginFunction;