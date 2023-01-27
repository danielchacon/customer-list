import { CustomerForm as ICustomerForm } from "./types";
import { Button, Form, Input } from "antd";

const enum Errors {
  REQUIRED = "Поле обязательно для заполнения",
  EMAIL = "Некорректный Email",
}

export const CustomerForm = (props: {
  submitCallback: (form: ICustomerForm) => void;
  editMode?: boolean;
  initialValues?: {
    name: string;
    email: string;
  };
}) => {
  return (
    <Form
      initialValues={props.initialValues}
      onFinish={(values: any) => {
        props.submitCallback(values);
      }}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: Errors.REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: Errors.REQUIRED },
          {
            type: "email",
            message: Errors.EMAIL,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {props.editMode ? "Сохранить" : "Добавить клиента"}
        </Button>
      </Form.Item>
    </Form>
  );
};
