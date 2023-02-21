import { Router } from 'express'
import { handleInputError } from './modules/middleware';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { getUpdates, getUpdate, createUpdate, deleteUpdate, updateUpdate } from './handlers/update';


const router = Router();

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', body('name').isString(), handleInputError, updateProduct)
router.post('/product', body('name').isString().isLength({ max: 255 }), handleInputError, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdates)
router.get('/update/:id', getUpdate)
router.put('/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]).optional(),
  body('version').optional(),
  handleInputError, updateUpdate)

router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputError, createUpdate)
router.delete('/update/:id', deleteUpdate)

/**
 * UpdatePoint
 */
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('desciption').optional().isString(),
  handleInputError, () => {

  })
router.post('/updatepoint',
  body('name').isString(),
  body('desciption').isString(),
  body('updateId').exists().isString(),
  handleInputError, () => { })
router.delete('/updatepoint/:id', () => { })

export default router