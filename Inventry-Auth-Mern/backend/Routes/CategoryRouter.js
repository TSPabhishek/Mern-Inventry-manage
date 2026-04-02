const ensureAuthenticated = require('../Middlewares/Auth');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../Controllers/CategoryController');

const router = require('express').Router();

router.post('/', ensureAuthenticated, createCategory);
router.get('/', ensureAuthenticated, getAllCategories);
router.get('/:id', ensureAuthenticated, getCategoryById);
router.put('/:id', ensureAuthenticated, updateCategory);
router.delete('/:id', ensureAuthenticated, deleteCategory);

module.exports = router;
