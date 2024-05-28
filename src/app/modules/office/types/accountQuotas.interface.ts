export interface Quota {
  total: number;
  used: number;
  remaining: number;
}

export interface Quotas {
  month: Quota;
  grace: Quota;
}

export interface AccountQuotas {
  account_id: number;
  quotas: Quotas;
}
