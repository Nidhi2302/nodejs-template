let fs = require('fs'); 
let StripeUtility = require('../../helper/stripeUtils');
let jwt = require('../../helper/jwt');
let usersModel = require('../demo/demoModel.js');
let demoCtr = require('../demo/demoController.js');
var paymentCtr = {}
paymentCtr.addCard = (req, res) => {
    let userId = jwt.getUserId(req.headers["x-auth-token"]);
    usersModel.getUsersById(userId,function(result){
        console.log(result.stripeCustomerId)
       if (result) {
				if (!result.stripeCustomerId) {
					// Stripe Customer not found - Add Card by creating Customer
					StripeUtility.createCustomerWithCard(result.email, { firstname: req.body.firstname, lastname: req.body.lastname}, req.body.token).then(function (customer) {
						params ={stripeCustomerId :customer.id}
						demoCtr.userUpdate("users",params,"id="+userId,function(results){
                            if(result){
                                res.json({ message: req.t("STRIPE_CRADIT_CARD") });        
                            }
                        })
					}, function (err) {
						res.status(400).json({ message: err.message });
					});
				} else {
					// Add Card to Customer
					StripeUtility.stripeAddCardToCustomer(result.stripeCustomerId, req.body.token).then((card) => {
						res.json({ message: req.t("STRIPE_CRADIT_CARD") });
					}, (err) => {
						res.status(err.statusCode).json({ message: err.message });
					})
				}
            } else {
                 res.status(400).json(req.t("NOT_VALID_USER"));
            } 
    });
}
paymentCtr.getCards = (req, res) => {
	let params = req.body;
	var err = '';
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
		usersModel.getUsersById(userId,function(results){
            if (results.stripeCustomerId) {
				StripeUtility.getCustomer(results.stripeCustomerId).then((customer) => {
					res.json({ defaultCard: customer.default_source, cards: customer.sources.data });
				}, (err) => {
					res.status(err.statusCode).json({ message: err.message });
				});
			} else {
				res.json({ cards: [] });
			}
        })
}
paymentCtr.getDebitCards = (req, res) => {
	let params = req.body;
	var err = '';
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId,function(user){
			if (user.stripeAccountId) {
				StripeUtility.getAccount(user.stripeAccountId).then((account) => {
					var defaultCard = '';
					for (var x in account.external_accounts.data) {
						let card = account.external_accounts.data[x];
						if (card.default_for_currency == true) {
							defaultCard = card.id;
						}
					}
					res.json({ defaultCard: defaultCard, cards: account.external_accounts.data /*, account: account */ });
				}, (err) => {
					res.status(err.statusCode).json({ message: err.message });
				});
			} else {
				res.json({ cards: [] });
			}
		});
	
}
paymentCtr.defaultDebitCard = (req, res) => {
	let params = req.body;
	var err = '';
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId,function(user){
			if (user) {
				if (user.stripeAccountId) {
					StripeUtility.defaultExternalAccountCard(user.stripeAccountId, params.cardId).then((card) => {
						StripeUtility.getAccount(user.stripeAccountId).then((account) => {
							var defaultCard = '';
							for (var x in account.external_accounts.data) {
								let card = account.external_accounts.data[x];
								if (card.default_for_currency == true) {
									defaultCard = card.id;
								}
							}
							res.json({ defaultCard: defaultCard, cards: account.external_accounts.data /*, account: account */ });
						}, (err) => {
							res.status(err.statusCode).json({ message: err.message });
						});
					}, (err) => {
						res.status(err.statusCode).json({ message: err.message });
					});
				} else {
					res.status(400).json({ message: req.t("CARD_INVALID") });
				}
			} else {
				res.status(400).json(req.t("NOT_VALID_USER"));
			}
		});
	
}
paymentCtr.deleteDebitCard = (req, res) => {
	let params = req.body;
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId ,function(user){
			if (user) {
				if (user.stripeAccountId) {
					StripeUtility.deleteExternalAccountCard(user.stripeAccountId, params.cardId).then((confirmation) => {
						res.json({ confirmation: confirmation });
					}, (err) => {
						res.status(err.statusCode).json({ message: err.message });
					});
				} else {
					res.status(400).json({ message: req.t("ACCOUNT_INVALID") });
				}
			} else {
				res.status(400).json({ message: req.t("NOT_VALID_USER") });
			}
	});
}
paymentCtr.deleteCard = (req, res) => {
	let params = req.body;
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId,function(user){
        if (user) {
            if (user.stripeCustomerId) {
                StripeUtility.deleteCustomerCard(user.stripeCustomerId, params.cardId).then((confirmation) => {
                    res.json({ confirmation: confirmation });
                }, (err) => {
                    res.status(err.statusCode).json({ message: err.message });
                });
            } else {
                res.status(400).json({ message: req.t("CARD_INVALID") });
            }
        } else {
           res.status(400).json({ message: req.t("NOT_VALID_USER") });
        }
	});
	
}
paymentCtr.defaultCard = (req, res) => {
	let params = req.body;
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId,function(user){
        if (user) {
            if (user.stripeCustomerId) {
                StripeUtility.defaultCustomerCard(user.stripeCustomerId, params.cardId).then((customer) => {
                    res.json({ defaultCard: customer.default_source, cards: customer.sources.data });
                }, (err) => {
                    res.status(err.statusCode).json({ message: err.message });
                });
            } else {
                res.status(400).json({ message: req.t("CARD_INVALID") });
            }
        } else {
            res.status(400).json({ message: req.t("NOT_VALID_USER") });
        }
	});
}
paymentCtr.addDebitCard = (req, res) => {
	let params = req.body;
	let userId = jwt.getUserId(req.headers["x-auth-token"]);
	usersModel.getUsersById(userId,function(user){
            if (!user.stripeAccountId) {
                // Stripe Customer not found - Add Card by creating Customer
                StripeUtility.createAccountWithCard(user.email, { firstName: params.firstname, lastName: params.lastname, ip: params.ip, dob: params.dob }).then(function (account) {
                    user.stripeAccountId = account.id;
                    user.save((err, result) => {
                        if (!err) {
                            // Add card to Account
                            StripeUtility.addDebitCardToAccount(account.id, params.token).then((card) => {
                                res.json({ message: req.t("DEBIT_CARD_ADDED") });        
                            }, (err) => {
                                res.status(err.statusCode).json({ message: err.message });
                            })
                        } else {
                            res.status(400).json({ message: err });
                        }
                    })
                }, function (err) {
                    res.status(err.statusCode).json({ message: err.message });
                });
            } else {
                // Add Card to Account
                StripeUtility.addDebitCardToAccount(user.stripeAccountId, params.token).then((card) => {
                    res.json({ message: req.t("DEBIT_CARD_ADDED") });        
                }, (err) => {
                    res.status(err.statusCode).json({ message: err.message });
                })
            }
    });
}
paymentCtr.checkStripeToken = (req,res) =>{
    console.log(req.body);
    StripeUtility.stripeDummyToken(req.body.card).then(function (result) {
        res.status(200).json({ result: result });    
    }, function (err) {
        res.status(err.statusCode).json({ message: err.message });
    });
 
}
module.exports = paymentCtr; 
