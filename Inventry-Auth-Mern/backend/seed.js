require('dotenv').config();
const mongoose = require('mongoose');
const CategoryModel = require('./Models/Category');
const ProductModel = require('./Models/Product');

const MONGO_CONN = process.env.MONGO_CONN;

const categories = [
    { name: 'Electronics', description: 'Electronic devices and gadgets' },
    { name: 'Clothing', description: 'Apparel and fashion items' },
    { name: 'Books', description: 'Books and literature' },
    { name: 'Groceries', description: 'Food and grocery items' },
    { name: 'Furniture', description: 'Furniture and home decor' }
];

const products = [
    // Electronics
    {
        name: 'iPhone 15',
        description: 'Apple smartphone with A16 chip and dual camera',
        price: 79900,
        category: 'Electronics',
        quantity: 15
    },
    {
        name: 'Samsung Galaxy S23',
        description: 'Flagship Android phone with Snapdragon processor',
        price: 74999,
        category: 'Electronics',
        quantity: 20
    },
    {
        name: 'OnePlus 11',
        description: 'Fast performance phone with AMOLED display',
        price: 56999,
        category: 'Electronics',
        quantity: 18
    },
    {
        name: 'Xiaomi 13 Pro',
        description: 'Premium phone with Leica camera system',
        price: 79999,
        category: 'Electronics',
        quantity: 12
    },
    {
        name: 'Realme GT Neo 3',
        description: 'Gaming-focused smartphone with fast charging',
        price: 36999,
        category: 'Electronics',
        quantity: 25
    },
    {
        name: 'Vivo V27 Pro',
        description: 'Stylish phone with strong selfie camera',
        price: 37999,
        category: 'Electronics',
        quantity: 22
    },
    {
        name: 'Oppo Reno 10 Pro',
        description: 'Slim phone with portrait camera features',
        price: 39999,
        category: 'Electronics',
        quantity: 16
    },
    {
        name: 'Google Pixel 7',
        description: 'Clean Android experience with AI camera',
        price: 59999,
        category: 'Electronics',
        quantity: 14
    },
    {
        name: 'Motorola Edge 40',
        description: 'Lightweight phone with near-stock Android',
        price: 29999,
        category: 'Electronics',
        quantity: 30
    },
    {
        name: 'iQOO Neo 7',
        description: 'High-performance gaming phone',
        price: 34999,
        category: 'Electronics',
        quantity: 19
    },
    // Clothing
    {
        name: 'Men\'s Cotton T-Shirt',
        description: 'Soft breathable casual wear',
        price: 599,
        category: 'Clothing',
        quantity: 50
    },
    {
        name: 'Women\'s Kurti',
        description: 'Traditional wear with modern design',
        price: 899,
        category: 'Clothing',
        quantity: 40
    },
    {
        name: 'Denim Jeans',
        description: 'Slim fit durable jeans',
        price: 1499,
        category: 'Clothing',
        quantity: 35
    },
    {
        name: 'Formal Shirt',
        description: 'Office wear full-sleeve shirt',
        price: 1299,
        category: 'Clothing',
        quantity: 28
    },
    {
        name: 'Hoodie Sweatshirt',
        description: 'Warm hoodie for winter',
        price: 1799,
        category: 'Clothing',
        quantity: 22
    },
    {
        name: 'Track Pants',
        description: 'Comfortable sportswear',
        price: 999,
        category: 'Clothing',
        quantity: 45
    },
    {
        name: 'Saree',
        description: 'Elegant traditional Indian wear',
        price: 2499,
        category: 'Clothing',
        quantity: 15
    },
    {
        name: 'Jacket',
        description: 'Winter jacket with insulation',
        price: 2999,
        category: 'Clothing',
        quantity: 18
    },
    {
        name: 'Shorts',
        description: 'Casual summer shorts',
        price: 699,
        category: 'Clothing',
        quantity: 38
    },
    {
        name: 'Blazer',
        description: 'Formal party wear blazer',
        price: 3499,
        category: 'Clothing',
        quantity: 12
    },
    // Books
    {
        name: 'Rich Dad Poor Dad',
        description: 'Personal finance guide',
        price: 399,
        category: 'Books',
        quantity: 40
    },
    {
        name: 'The Alchemist',
        description: 'Inspirational novel by Paulo Coelho',
        price: 299,
        category: 'Books',
        quantity: 55
    },
    {
        name: 'Atomic Habits',
        description: 'Book on building good habits',
        price: 499,
        category: 'Books',
        quantity: 35
    },
    {
        name: 'Ikigai',
        description: 'Japanese concept of purpose in life',
        price: 350,
        category: 'Books',
        quantity: 28
    },
    {
        name: 'Think and Grow Rich',
        description: 'Classic wealth-building book',
        price: 299,
        category: 'Books',
        quantity: 32
    },
    {
        name: 'Wings of Fire',
        description: 'Autobiography of A.P.J. Abdul Kalam',
        price: 399,
        category: 'Books',
        quantity: 45
    },
    {
        name: 'Do Epic Shit',
        description: 'Motivational modern life lessons',
        price: 499,
        category: 'Books',
        quantity: 20
    },
    {
        name: 'Harry Potter Series',
        description: 'Fantasy fiction series',
        price: 2999,
        category: 'Books',
        quantity: 15
    },
    {
        name: 'The Power of Now',
        description: 'Spiritual self-help book',
        price: 399,
        category: 'Books',
        quantity: 38
    },
    {
        name: 'Deep Work',
        description: 'Productivity and focus guide',
        price: 599,
        category: 'Books',
        quantity: 25
    },
    // Groceries
    {
        name: 'Basmati Rice (5kg)',
        description: 'Premium long-grain rice',
        price: 699,
        category: 'Groceries',
        quantity: 60
    },
    {
        name: 'Wheat Flour (10kg)',
        description: 'Whole wheat atta',
        price: 499,
        category: 'Groceries',
        quantity: 75
    },
    {
        name: 'Cooking Oil (1L)',
        description: 'Refined sunflower oil',
        price: 180,
        category: 'Groceries',
        quantity: 100
    },
    {
        name: 'Milk (1L)',
        description: 'Fresh dairy milk',
        price: 60,
        category: 'Groceries',
        quantity: 80
    },
    {
        name: 'Eggs (12 pcs)',
        description: 'Farm fresh eggs',
        price: 90,
        category: 'Groceries',
        quantity: 120
    },
    {
        name: 'Sugar (1kg)',
        description: 'Fine granulated sugar',
        price: 45,
        category: 'Groceries',
        quantity: 90
    },
    {
        name: 'Salt (1kg)',
        description: 'Iodized table salt',
        price: 25,
        category: 'Groceries',
        quantity: 150
    },
    {
        name: 'Tea Powder (500g)',
        description: 'Strong Assam tea',
        price: 250,
        category: 'Groceries',
        quantity: 50
    },
    {
        name: 'Coffee (200g)',
        description: 'Instant coffee powder',
        price: 320,
        category: 'Groceries',
        quantity: 40
    },
    {
        name: 'Biscuits Pack',
        description: 'Assorted snack biscuits',
        price: 120,
        category: 'Groceries',
        quantity: 110
    },
    // Furniture
    {
        name: 'Wooden Bed',
        description: 'Queen-size solid wood bed',
        price: 18999,
        category: 'Furniture',
        quantity: 8
    },
    {
        name: 'Sofa Set',
        description: '3-seater comfortable sofa',
        price: 24999,
        category: 'Furniture',
        quantity: 5
    },
    {
        name: 'Dining Table',
        description: '4-seater dining table',
        price: 12999,
        category: 'Furniture',
        quantity: 10
    },
    {
        name: 'Office Chair',
        description: 'Ergonomic adjustable chair',
        price: 6999,
        category: 'Furniture',
        quantity: 20
    },
    {
        name: 'Study Table',
        description: 'Compact desk for study/work',
        price: 4999,
        category: 'Furniture',
        quantity: 15
    },
    {
        name: 'Wardrobe',
        description: '3-door wooden wardrobe',
        price: 15999,
        category: 'Furniture',
        quantity: 7
    },
    {
        name: 'Bookshelf',
        description: 'Multi-layer storage shelf',
        price: 3499,
        category: 'Furniture',
        quantity: 18
    },
    {
        name: 'TV Unit',
        description: 'Modern TV cabinet',
        price: 7999,
        category: 'Furniture',
        quantity: 12
    },
    {
        name: 'Coffee Table',
        description: 'Small center table',
        price: 2999,
        category: 'Furniture',
        quantity: 25
    },
    {
        name: 'Recliner Chair',
        description: 'Comfortable lounge chair',
        price: 14999,
        category: 'Furniture',
        quantity: 9
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_CONN);
        console.log('Connected to MongoDB');

        // Clear existing data
        await CategoryModel.deleteMany({});
        await ProductModel.deleteMany({});
        console.log('Cleared existing data');

        // Add categories
        const createdCategories = await CategoryModel.insertMany(categories);
        console.log(`Added ${createdCategories.length} categories`);

        // Map category names to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        // Add products with category references
        const productsWithCategoryId = products.map(product => ({
            ...product,
            category: categoryMap[product.category],
            sku: product.name.toLowerCase().replace(/\s+/g, '-')
        }));

        const createdProducts = await ProductModel.insertMany(productsWithCategoryId);
        console.log(`Added ${createdProducts.length} products`);

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
