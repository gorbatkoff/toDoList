import React from 'react'
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { NavLink } from 'react-router-dom';


export default function Login() {
  return (
    <Form
      style={{width: "80%"}}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

      <Row align="middle" justify="space-between" style={{width: "300px"}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        
        <NavLink to="../register">Dont have an account yet? Sign Up</NavLink>
        {/* <div><a>Dont have an account yet?</a></div> */}
        </Row>
      </Form.Item>
    </Form>
  )
}


// import { Form, Input, Button, Checkbox } from 'antd';

// function Login() {
//     return (
//         <Form
//             name="basic"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 16 }}
//             initialValues={{ remember: true }}
//             autoComplete="off"
//         >
//             <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[{ required: true, message: 'Please input your username!' }]}
//             >
//                 <Input />
//             </Form.Item>

//             <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[{ required: true, message: 'Please input your password!' }]}
//             >
//                 <Input.Password />
//             </Form.Item>

//             <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
//                 <Checkbox>Remember me</Checkbox>
//             </Form.Item>

//             <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                 <Button type="primary" htmlType="submit">
//                     Submit
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };



// export default Login;