import { useState, useEffect } from "react";
import { CustomerList } from "./CustomerList";
import { CustomerForm } from "./CustomerForm";
import { EditModal } from "./EditModal";
import { Customer, CustomerForm as ICustomerForm } from "./types";
import { Typography } from "antd";

const App = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

  const { Title } = Typography;

  const addCustomer = (form: ICustomerForm) => {
    const newCustomer = {
      id: customers.length + 1,
      name: form.name,
      email: form.email,
    };
    localStorage.setItem(
      "customers",
      JSON.stringify([...customers, newCustomer])
    );
    setCustomers([...customers, newCustomer]);
  };

  const editCustomer = (form: ICustomerForm) => {
    const updatedCustomersList = customers.map((c) => {
      if (c.id === editCustomerId) {
        return {
          id: editCustomerId,
          name: form.name,
          email: form.email,
        };
      } else {
        return c;
      }
    });
    localStorage.setItem("customers", JSON.stringify(updatedCustomersList));
    setCustomers(updatedCustomersList);
  };

  const deleteCustomer = (id: number) => {
    const updatedCustomersList = customers.filter((c) => c.id !== id);
    localStorage.setItem("customers", JSON.stringify(updatedCustomersList));
    setCustomers(updatedCustomersList);
  };

  useEffect(() => {
    const localCustomers = localStorage.getItem("customers");

    if (localCustomers) {
      setCustomers(JSON.parse(localCustomers));
    }
  }, []);

  return (
    <div>
      <Title>Список покупателей</Title>
      <CustomerList
        customers={customers}
        deleteCallback={(id) => deleteCustomer(id)}
        editCallback={(id) => {
          setModalIsOpen(true);
          setEditCustomerId(id);
        }}
      />
      <CustomerForm submitCallback={(form) => addCustomer(form)} />
      {modalIsOpen && (
        <EditModal
          modalIsOpen={modalIsOpen}
          editCustomer={customers.find((el) => el.id === editCustomerId)}
          submitCallback={(form) => {
            editCustomer(form);
            setModalIsOpen(false);
            setEditCustomerId(null);
          }}
          cancelCallback={() => {
            setModalIsOpen(false);
            setEditCustomerId(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
