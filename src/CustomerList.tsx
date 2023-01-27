import { Customer } from "./types";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const CustomerList = (props: {
  customers: Customer[];
  deleteCallback: (id: number) => void;
  editCallback: (id: number) => void;
}) => {
  const dataSource = () => {
    return props.customers.map((el) => ({
      key: el.id,
      id: el.id,
      name: el.name,
      email: el.email,
    }));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Имя",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_: any, record: Customer) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => props.editCallback(record.id)}
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => props.deleteCallback(record.id)}>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
      width: 1,
    },
  ];

  return <Table dataSource={dataSource()} columns={columns} scroll={{x: true}}/>;
};
