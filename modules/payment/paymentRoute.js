//Dependencies 
let express = require('express');
let paymentCtr = require('./paymentController.js');
let paymentMiddleware = require('./paymentMiddleware.js');
let paymentRouter = express.Router();
/*
    This api for add card 
    headers : x-auth-token
    Params : token,firstName,lastName
*/
let addCardMiddleware = [paymentMiddleware.validateInput('addCard'),paymentCtr.addCard];
paymentRouter.post('/add-card',addCardMiddleware);

/*
    This api for get card 
    headers : x-auth-token
*/

let getCardsMiddleware = [paymentCtr.getCards];
paymentRouter.get('/get-card',getCardsMiddleware);

/*
    This api for delete card 
    headers : x-auth-token
    Params : cardId
*/

let deleteCardMiddleware = [paymentCtr.deleteCard];
paymentRouter.post('/delete-card',deleteCardMiddleware);

/*
    This api for default card 
    headers : x-auth-token
    Params : cardId
*/

let defaultCardMiddleware = [paymentCtr.defaultCard];
paymentRouter.post('/default-card',defaultCardMiddleware);

/*
    This api for add debit card 
    headers : x-auth-token
    Params : token,firstName,lastName,ip,dob
*/

let addDebitCardMiddleware = [paymentMiddleware.validateInput('addDebitCard'),paymentCtr.addDebitCard];
paymentRouter.post('/add-debit-card',addDebitCardMiddleware);

/*
    This api for default debit card 
    headers : x-auth-token
*/


let getDebitCardsMiddleware = [paymentCtr.getDebitCards];
paymentRouter.get('/get-debit-card',getDebitCardsMiddleware);

/*
    This api for get debit card 
    headers : x-auth-token
    Params : cardId
*/

let defaultDebitCardMiddleware = [paymentCtr.defaultDebitCard];
paymentRouter.post('/default-debit-card',defaultDebitCardMiddleware);

/*
    This api for get debit card 
    headers : x-auth-token
    Params : cardId
*/


let deleteDebitCardMiddleware = [paymentCtr.deleteDebitCard];
paymentRouter.post('/delete-debit-card',deleteDebitCardMiddleware);

/*
    This api for get dummy token
    Params : card
*/

let checkStripePaymentMiddleware = [paymentCtr.checkStripeToken];
paymentRouter.post('/check-token', checkStripePaymentMiddleware);

module.exports = paymentRouter; 

