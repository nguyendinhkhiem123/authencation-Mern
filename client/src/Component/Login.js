import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import axios from '../axios/index';
import { useHistory } from "react-router";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {

  const history = useHistory();  
  const onFinish = async (values) => {
      try{
            const res = await axios.post("/auth/login", values);
            console.log(res);
            if(res.data.success){
                localStorage.setItem('accessToken' , res.data.body.tokenAccess);
                localStorage.setItem('refreshToken' , res.data.body.tokenRefresh);
                history.replace("/user")
            }
      }catch(err){
          console.log(err)
      }
       
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <div style={{display : "flex" , position : "fixed" , top : "0" , bottom : "0" , left : "0" , right : "0"}}>
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{margin :  "auto"}}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password />
                </Form.Item>

            

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
    </div>
  );
}

export default Login;
