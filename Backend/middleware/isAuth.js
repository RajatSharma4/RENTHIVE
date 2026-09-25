import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    try {
        let token = null

        // 1. Check Authorization header: Bearer <token>
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1]
        } 
        // 2. Check cookies if cookie-parser is used
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token
        }
        // 3. Fallback to query param if needed
        else if (req.query && req.query.auth_token) {
            token = req.query.auth_token
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication token is missing. Please log in." 
            })
        }

        const secret = process.env.JWT_SECRET || 'renthive_jwt_secret_key_prod_2026'
        const decoded = jwt.verify(token, secret)

        if (!decoded) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid or expired authentication token." 
            })
        }

        req.userId = decoded.userId
        req.userRole = decoded.role || 'user'
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: "Authentication failed. Session expired or token invalid." 
        })
    }
}

export const isRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}` 
            })
        }
        next()
    }
}
