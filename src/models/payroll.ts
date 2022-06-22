export interface IPayroll {
    status?: string
    async_status: string;
    currency: string;
    volume_input_in_input_currency: number;
    payroll_id: string;
  
    company_id: string;
    approved?: boolean;
    canceled?: boolean;
    confirmed?: boolean;
    date_canceled?: string | null;
    date_confirmed?: string | null;
    date_fulfilled?: string | null;
    date_matched?: string | null;
    date_processed?: string | null;
    date_received?: string | null;
    date_released?: string | null;
    fees?: number;
    fulfilled?: boolean;
    is_premium?: boolean;
    matched?: boolean;
    number_of_recipients?: number;
    payment_type?: string;
    received?: boolean;
    released?: boolean;
    subpayroll_ids?: string[] | null;
    time_created?: string;
    deposit_address?: string;
    funding_buy_rate?: number | string;
    funding_currency?: string;
    funding_flat_fee_in_input_currency?: number;
    funding_percentage_fee?: number;
    funding_sell_rate?: number | string;
}