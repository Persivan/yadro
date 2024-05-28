export interface CurrencyData {
  code: string;
  value: number;
}

export interface CurrencyExtResponseInterface {
  meta: {
    last_updated_at: string;
  };
  data: {
    [key: string]: CurrencyData;
  };
}
