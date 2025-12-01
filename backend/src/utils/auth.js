import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Hash password
export async function hashPassword(password) {
    
    return await bcrypt.hash(password, 10);
}

// Verificar password
export async function checkPassword(password, hashedPassword) {

    return await bcrypt.compare(password, hashedPassword);
}


// Gerar token JWT
export function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,    
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log("Token generated:", token);
  return token;
}

// Middleware de autenticação
export async function authGuard(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'no token provided' });
    }

    const token = authHeader.split(' ')[1];


    try   {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch (err) {
        console.error(err);
        return res.status(403).json({ err: 'invalid token' });    
    }
}