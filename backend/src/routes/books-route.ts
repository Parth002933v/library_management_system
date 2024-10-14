import {Router} from "express"
import {BookController} from "../controllers/book-controller";
import {validateBook} from "../middleware/body-validation-middleware";

const router = Router();

router.get("/", BookController.getAllBooks)
router.get("/:isbn", BookController.geBookByID)

router.post("/", validateBook, BookController.postBook)
router.put("/:isbn", validateBook, BookController.editBook)
router.delete("/:isbn", BookController.deleteBook)

export default router