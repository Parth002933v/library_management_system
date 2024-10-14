import express, {NextFunction, Request, Response} from 'express';
import dotenv from "dotenv"
import author_router from "./routes/author-route";
import {globalErrorHandler} from "./middleware/errorHandler-middleware";
import book_router from "./routes/books-route";
import {CustomError} from "./utils/ErrorObject";

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!...');
});

app.use("/api/author/", author_router)
app.use("/api/book/", book_router)

app.use("*", (req, _, next) => {
    const error: CustomError = new CustomError({
        message: `can't find ${req.originalUrl} on the server`,
        statusCode: 404,
    });

    next(error);
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => globalErrorHandler(error, req, res, next))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
