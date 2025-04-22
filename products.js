// products.js
const cuid = require('cuid')

const db = require('./db')

// Define our Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }], 
})

/**
 * Create a new product
 * @param {Object} product
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

/**
 * List products
 * @param {Object} query
 * @returns {Promise<Object[]>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  // Use a ternary statement to create the query object. Then pass 
  // the query object to Mongoose to filter the products
  const query = tag ? {
    tags: {
      $elemMatch: {
        title: tag
      }
    }
  } : {}
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
    
  return products
}

/**
 * Get a product
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function get(_id) {
  const product = await Product.findById(_id)
  return product
}

/**
 * Edit a product
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  const product = await get(_id)

  // todo can we use spread operators here?
  Object.keys(change).forEach(function(key) {
    product[key] = change[key]
  })
  
  await product.save()

  return product
}

/**
 * Delete a product
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function destroy(_id) {
  return await Product.deleteOne({_id})
}

module.exports = {
  create,
  list,
  get,
  edit,
  destroy
}