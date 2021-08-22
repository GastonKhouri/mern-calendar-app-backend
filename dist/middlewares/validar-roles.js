"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
// Verificar que el usuario que está haciendo la accion es Admin
const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    const { role, nombre } = req.usuario;
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
// Verificar que el usuario que está haciendo la acción tenga uno de los roles dados
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(500).json({
                msg: `El servicio require uno de estos role ${roles}`
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-roles.js.map