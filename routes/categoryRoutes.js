const categoryControllers = require('../controllers/categoryControllers');
const express = require('express');
const router = express.Router();


router
    .route('/')
    .get(categoryControllers.getAllCategories)
    .post(categoryControllers.createCategory)
    .delete(categoryControllers.deleteAllCategories);

router
    .route('/:categoryId')
    .get(categoryControllers.getCategory)
    .patch(categoryControllers.updateCategory)
    .delete(categoryControllers.deleteCategory);




module.exports = router;