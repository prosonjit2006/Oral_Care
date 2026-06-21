export interface PaymentRecord {
  $id: string;
  invoice_id?: string | null;
  stripe_session_id?: string | null;
  patient_name?: string | null;
  patient_email?: string | null;
  item_name?: string | null;
  item_type?: string | null;
  amount?: string | null;
  payment_status?: string | null;
  payment_method?: string | null;
  card_brand?: string | null;
  card_last4?: string | null;
  interval?: string | null;
  patient_id?: string | null;
  createdAt?: Date | string | null; 
}


export interface PaymentRecordState {
    isLoading: boolean,
    isError: string | null
    Payments: PaymentRecord[]
}