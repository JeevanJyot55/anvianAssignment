import dotenv from 'dotenv';
import { RequestHandler } from 'express';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable");
  process.exit(1);
}

const requireAuth: RequestHandler = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const token = auth.slice(7);
    try {
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
app.use(express.json());
app.use("/customers", requireAuth);


const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.get('/', async (_req, res) => {
    res.send("Customer service running");
  return;
});

//Customer list
app.get('/customers', async (_req: Request, res:Response) => {
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
app.put('/customers/:id', async (req: Request, res:Response) => {
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
app.delete('/customers/:id', async (req: Request, res:Response) => {
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