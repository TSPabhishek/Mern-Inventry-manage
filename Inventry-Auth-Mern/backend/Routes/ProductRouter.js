const ensureAuthenticated = require('../Middlewares/Auth');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../Controllers/ProductController');

const router = require('express').Router();

router.post('/', ensureAuthenticated, createProduct);
router.get('/', ensureAuthenticated, getAllProducts);
router.get('/:id', ensureAuthenticated, getProductById);
router.put('/:id', ensureAuthenticated, updateProduct);
router.delete('/:id', ensureAuthenticated, deleteProduct);

module.exports = router;