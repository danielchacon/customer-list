import { useState } from "react";
import { formPlaceholder } from "./placeholders";
import { CustomerForm as ICustomerForm } from "./types";

const enum Errors {
  REQUIRED = "Поле обязательно для заполнения",
  EMAIL = "Некорректно указан адрес email",
}

export const CustomerForm = (props: {
  submitCallback: (form: ICustomerForm) => void;
  editMode?: boolean;
  initialValues?: {
    name: string;
    email: string;
  };
}) => {
  const [form, setForm] = useState({
    ...formPlaceholder,
    ...(props.initialValues ? props.initialValues : {}),
  });
  const [validationState, setValidationState] = useState({
    name: "",
    email: "",
  });

  const validateRequired = (value: string) => value.length > 0;

  const validateEmail = (email: string) => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
  };

  const validate = () => {
    const nameError = validateRequired(form.name) ? "" : Errors.REQUIRED;
    const emailError = validateRequired(form.email)
      ? validateEmail(form.email)
        ? ""
        : Errors.EMAIL
      : Errors.REQUIRED;

    return {
      name: nameError,
      email: emailError,
    };
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationResult = validate();
        const isValid = Object.values(validationResult).every(
          (el) => el.length === 0
        );
        setValidationState(validationResult);
        if (isValid) {
          props.submitCallback(form);
          setForm(formPlaceholder);
        }
      }}
    >
      <input
        type="text"
        placeholder="Имя"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }}
      />

      <input
        type="text"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
      />

      <button type="submit">
        {props.editMode ? "Сохранить" : "Добавить клиента"}
      </button>
    </form>
  );
};
