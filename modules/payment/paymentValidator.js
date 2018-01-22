let validator = {};
validator.paymentValidator = (req, type) => {
    let input = {
            addCard: {
                token: ["notEmpty", req.t("TOKEN_REQUIRE")],
                firstName: ["notEmpty", req.t("FIRSTNAME_REQUIRE")],
                lastName: ["notEmpty", req.t("LASTNAME_REQUIRE")]
            },
            addDebitCard: {
                token: ["notEmpty", req.t("TOKEN_REQUIRE")],
                firstName: ["notEmpty", req.t("FIRSTNAME_REQUIRE")],
                lastName: ["notEmpty", req.t("LASTNAME_REQUIRE")],
                ip: ["notEmpty", req.t("IP_REQUIRE")],
                dob: ["notEmpty", req.t("DOB_REQUIRE")]
            },
        };
        return input[type];
}

module.exports = validator;

