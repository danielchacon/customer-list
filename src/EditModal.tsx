import { CustomerForm } from "./CustomerForm";
import { Customer, CustomerForm as ICustomerForm } from "./types";

export const EditModal = (props: {
  submitCallback: (form: ICustomerForm) => void;
  editCustomer?: Customer;
}) => {
  return (
    <>
      <div>Модалка</div>
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
    </>
  );
};
