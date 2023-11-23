import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'tokenxd', options: {timeout: 5000, idempotencyKey: 'abc'}})

const payment = new Payment(client)

const body = {
    transaction_amount: 10,
    desciption: 'Rifle m16',
    payment_method_id: 'master',
    payer: {
        email: 'un email'
    }
}