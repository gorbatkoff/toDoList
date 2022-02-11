import React from 'react'
import { Form, Input, Button, Checkbox, Row, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useNavigate } from 'react-router-dom';

export default function Login({ addUser }) {

  const onFinish = () => {
    try {

      if (password != confirmPassword) {
        message.error(`The password and confirm password fields do not match. Try again`);
      }

      addUser(login, password);

    } catch (e) {
      message.error("Something gone wrong");
    }
  };

  const onFinishFailed = () => {
    message.error("Something gone wrong!!!!");
  }


  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function enterLogin(e) {
    setLogin(e.target.value)
    console.log(login);
  }

  function enterPassword(e) {
    setPassword(e.target.value)
    console.log(password);
  }

  function enterConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    console.log(confirmPassword);
    console.log(login)
  }


  return (
    <Form
      style={{ width: "80%" }}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      // value={login}
      >
        <Input
          onChange={enterLogin}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          onChange={enterPassword}
        />
      </Form.Item>

      <Form.Item
        label="Confirm your password"
        name="Confirm"
        rules={[{ required: true, message: 'Please input your password! again' }]}
      >
        <Input.Password
          onChange={enterConfirmPassword}
        />
      </Form.Item>


      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

        <Row align="middle" justify="space-between" style={{ width: "300px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <NavLink to="../login">Already have an account? Log In</NavLink>
          {/* <div><a>Dont have an account yet?</a></div> */}
        </Row>
      </Form.Item>
    </Form>
  )
}