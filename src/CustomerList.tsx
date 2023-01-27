import { Customer } from "./types";

export const CustomerList = (props: {
  customers: Customer[];
  deleteCallback: (id: number) => void;
  editCallback: (id: number) => void;
}) => {
  return (
    <ul>
      {props.customers.map((c: Customer) => (
        <li key={c.id}>
          {c.id} - {c.name} - {c.email}{" "}
          <button onClick={() => props.deleteCallback(c.id)}>Delete</button>
          <button onClick={() => props.editCallback(c.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};
