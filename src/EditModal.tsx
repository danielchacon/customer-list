import { CustomerForm } from "./CustomerForm";
import { Customer, CustomerForm as ICustomerForm } from "./types";
import { Modal } from 'antd'

export const EditModal = (props: {
  modalIsOpen: boolean;
  editCustomer?: Customer;
  submitCallback: (form: ICustomerForm) => void;
  cancelCallback: () => void
}) => {
  return (
    <Modal title="Редактировать покупателя" open={props.modalIsOpen} onCancel={props.cancelCallback} footer={null}>
      {props.editCustomer && (
        <CustomerForm
          submitCallback={props.submitCallback}
          editMode={true}
          initialValues={{
            name: props.editCustomer.name,
            email: props.editCustomer.email,
          }}
        />
      )}
    </Modal>
  );
};
