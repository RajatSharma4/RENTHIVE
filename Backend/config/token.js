import jwt from 'jsonwebtoken'

export const genToken = (userId, role = 'user', extra = {}) => {
    const secret = process.env.JWT_SECRET || 'renthive_jwt_secret_key_prod_2026'
    return jwt.sign({ userId, role, ...extra }, secret, { expiresIn: "7d" })
}