//Handling HTTP routes
import  express, { NextFunction, Request, Response,RequestHandler } from "express";

import cors from "cors";


//Db client for Prisma
import { PrismaClient } from "./generated/prisma";

//Encrypt password
import bcrypt from "bcryptjs"; 

//Generate JW token
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
 
//create server
const app = express();

app.use(cors({
  origin:  "http://localhost:5173",
  credentials: true, 
}
));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Auth service running");
    return;
  });


//create prisma client
const prisma = new PrismaClient();


const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET!;


//Register route
app.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { email, password } = req.body;
  
        // 1. Validate input
        if (!email || !password) {
          res.status(400).json({ error: "Email and password are required." });
          return;
        }
  
        // 2. Check for existing user
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
          res.status(400).json({ error: "Email already in use." });
          return;
        }
  
        // 3. Hash the password
        const passwordHash = await bcrypt.hash(password, 10);
  
        // 4. Create the user
        const user = await prisma.user.create({
          data: { email, passwordHash },
        });
  
        // 5. Issue a JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        // 6. Send back the user ID and token
        res.status(201).json({ userId: user.id, token });
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  );

//Login route
app.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;

            // 1. Validate input
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required." });
                return;
            }
            // 2. Find the user
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                res.status(401).json({ error: "Invalid username." });
                return;
              }
            // 3. Check the password
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) {
                res.status(401).json({ error: "Invalid password." });
                return;
              }
            
            // 4. Issue a JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: "1h" }
              );

            // 5. Send back the user ID and token
            res.json({ userId: user.id, token });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
);


const requireAuth: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // send 401 and exit (no return value)
      res.status(401).json({ error: "Missing or invalid Authorization header." });
      return;
    }
  
    const token = authHeader.slice(7); // drop "Bearer "
    try {
      const payload = jwt.verify(
        token,
        JWT_SECRET
      ) as { userId: string; email: string };
  
      // attach the payload for downstream handlers
      ;(req as any).user = payload;
  
      next(); // proceed (void)
      return;
    } catch {
      res.status(401).json({ error: "Invalid or expired token." });
      return;
    }
  };

app.get("/me", requireAuth, (req, res) => {
    // @ts-ignore
    const { userId, email } = req.user;
    res.json({ userId, email });
  });
  

app.listen(PORT, () => {
        console.log(`Auth service running on port ${PORT}`);
    });