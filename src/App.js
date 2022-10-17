import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Button, Upload, Input } from "antd";
import "./App.css";

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onReset = () => form.resetFields();

  const handleSubmit = (values) => {
    const { url, token, product } = values;
    const formData = new FormData();
    const files = fileList.map((file) => file.originFileObj);

    formData.append("images", files);
    formData.append("product", JSON.stringify(product));

    console.log("values", values);
    console.log("files", files);

    axios({
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div className="App">
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ width: "100%", maxWidth: "480px" }}
        initialValues={{
          url: "http://localhost:5675/api/0.2/flyers/product",
        }}
      >
        <Form.Item label="URL" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Token" name="token">
          <Input />
        </Form.Item>
        <Form.Item label="Product" name="product">
          <Input.TextArea />
        </Form.Item>
        <br />
        <Upload
          listType="picture"
          defaultFileList={[...fileList]}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Request
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
