let validator = {};
validator.getuserValidator = (req, type) => {
    let input = {
            login: {
                userName: ["notEmpty", req.t("USERNAME_REQUIRE")],
                password: ["notEmpty", req.t("USER_PASSWORD_REQUIRE")],
            },
        };
        return input[type];
}

module.exports = validator;

