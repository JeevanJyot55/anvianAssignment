import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import cors from 'cors';
dotenv.config();

console.log("🚀 Customer Service index.ts loaded");

console.log("→ Loaded JWT_SECRET:", process.env.JWT_SECRET);


import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable");
  process.exit(1);
}

console.log("Customer Service JWT_SECRET:", process.env.JWT_SECRET);

const requireAuth: RequestHandler = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const token = auth.slice(7);
    try {
        console.log("Incoming token:", token);
        const decoded = jwt.verify(token, JWT_SECRET!);
        (req as any).user = decoded; 
        next();
        return;
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
  }

import { PrismaClient } from '@prisma/client';
import express ,{ Request,Response } from 'express';

// Initialize application
const app = express();

app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.path}`);
  next();
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


app.use(express.json());


const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.get('/', async (_req, res) => {
    res.send("Customer service running");
  return;
});

//Customer list
app.get('/customers', requireAuth, async (_req: Request, res:Response) => {
    const customers = await prisma.customer.findMany();
    res.json(customers);
    return;
});

//Customer search by ID
app.get('/customers/:id', async (req: Request, res:Response) => {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({where : {id}});

    if(!customer){
      res.status(404).json({error: "Not found."});
      return;
    }

    res.json(customer);
    return;
  });

//Create new customer
app.post('/customers', async (req: Request, res:Response) => {
    const {name,email,phone} = req.body;

    if (!name || !email){
      res.status(404).json({error: "Name and email required."})
      return;
    }
    const createdCust = await prisma.customer.create({data : {name,email,phone},})
  
    res.status(201).json(createdCust);
    return;

  });

//Upadte existing customer
app.put('/customers/:id', requireAuth,async (req: Request, res:Response) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try{
      const updated = await prisma.customer.update({
        where: {id},
        data: {name,email,phone},
      })
      res.json(updated)
    }
    catch{
      res.status(404).json({error:"not found"});
    }
    return;
  });

//Delete custoemr by ID
app.delete('/customers/:id', requireAuth, async (req: Request, res:Response) => {
    const { id } = req.params;

    try{
      await prisma.customer.delete({where: {id}});
      res.status(204).send();
    }
    catch{
      res.status(404).json({error:"not found"});
    }
    return;
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});