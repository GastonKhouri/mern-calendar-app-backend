"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});
const Role = mongoose_1.model('Role', RoleSchema);
exports.default = Role;
//# sourceMappingURL=role.js.map