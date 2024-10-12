import express, {Request, Response} from 'express';
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});