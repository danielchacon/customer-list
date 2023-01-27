export interface CustomerForm {
  name: string;
  email: string;
}

export interface Customer extends CustomerForm {
  id: number;
}
