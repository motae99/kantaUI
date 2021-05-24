export const REQUEST_URL =
  'http://syberpay.test.sybertechnology.com/syberpay/getUrl';
export const PAYMENT_STATUS_URL =
  'http://syberpay.test.sybertechnology.com/syberpay/payment_status';

export const CURRENCY = 'SDG';
export const APPLICATION_ID = 'j0v@App';
export const SERVICE_ID = 'j0v@400';
export const APPLICATION_SALT = 'Ko9f3r0b4';
export const APPLICATION_KEY = '3L0ez5y7';
export const PAYEE_ID = '0010040001';

// Application id: j0v@App
// Service id: j0v@400
// key:    3L0ez5y7
// Salt:    Ko9f3r0b4
// payee id:   0010040001
//amount: 500
// http://syberpay.test.sybertechnology.com/syberpay/getUrl
// http://syberpay.test.sybertechnology.com/syberpay/payment_status

// Card: 7888450004340823
// Expiry Date: Any valid date in the future.
// iPIN: any four digits.

// correct
// Formula: key|applicationId|serviceId|amount|currency|customerRef|salt
// 20a3acf8f6aeb9727089894e8ef3067f634b6ac2a8bb966e5817e6bd28f0403d
// 20a3acf8f6aeb9727089894e8ef3067f634b6ac2a8bb966e5817e6bd28f0403d
//20a3acf8f6aeb9727089894e8ef3067f634b6ac2a8bb966e5817e6bd28f0403d

// const token = 'klfjlkaf';

// const request_hash = sha256(request_sha).then((hash) => setHash(hash));
//   // .then((hash) => console.log('hash', hash))
//   // .catch((error) => console.log(error));
//   const notify_url = `${APPLICATION_KEY}|${transactionId}|${token}|${APPLICATION_SALT}`;

//   const payment_status_request = `${APPLICATION_KEY}|${APPLICATION_ID}|${transactionId}|${APPLICATION_SALT}`;

// const Response_Format = {
//  applicationId: APPLICATION_ID,
//  payeeId: PAYEE_ID,
//  serviceId: SERVICE_ID,
//  amount: Number(amount),
//  currency: CURRENCY,
//  customerRef: costumerRef,
//  tranTimestamp: '2015-08-13,10:04:58',
//  paymentInfo: {
//    accountNo: '123456',
//    customerName: 'Mohammed Ahmed',
//    serviceType: '123',
//  },
//  responseCode: 1,
//  responseMessage: 'Approved',
//  paymentUrl:
//    'https://www.sybertechnology.com/syberpay/payment/1593135f-4110-4edc-bbd0-ebe134968498',
// };
