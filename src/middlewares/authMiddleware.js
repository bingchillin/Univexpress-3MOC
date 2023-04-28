"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateAuthMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        console.log(req.auth);
        const currentRole = req.auth?.role;
        if (!allowedRoles.includes(currentRole)) {
            res.status(401).send({
                status: 401,
                message: "You cannot access this resource."
            });
        }
        else {
            next();
        }
    };
};
exports.default = generateAuthMiddleware;
