import express from "express";  
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllStats ,getAllUsers,updateRole} from "../controllers/admin.controller.js";
import { isAdmin, isAuth } from "../midddlewares/isAuth.js";
import { upload } from "../midddlewares/multer.js";

const router = express.Router();
router.post('/course/new',isAuth,isAdmin,upload,createCourse)
router.post('/course/:id',isAuth,isAdmin,upload,addLecture)
router.delete('/lecture/:id',isAuth,isAdmin,deleteLecture)
router.delete('/course/:id',isAuth,isAdmin,deleteCourse)
router.get('/stats',isAuth,isAdmin,getAllStats)
router.get('/users', isAuth, isAdmin, getAllUsers)
router.put('/user/:id',isAuth, isAdmin, updateRole)

export default router;