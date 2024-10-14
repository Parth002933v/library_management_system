import {Router, Request, Response} from "express"
import {AuthorController} from "../controllers/author-controller";

const router = Router();


router.get("/", AuthorController.getAllAuthors)
router.get("/:id", AuthorController.getAuthorByID)

export default router