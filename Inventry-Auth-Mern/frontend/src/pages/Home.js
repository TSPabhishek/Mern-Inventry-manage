import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const url = "http://localhost:5000/categories";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            
            if (result.success) {
                setCategories(result.categories || []);
            }
        } catch (err) {
            handleError('Failed to fetch categories');
        }
    }

    // Fetch Products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            let url = `http://localhost:5000/products?page=${page}&limit=3`;
            
            if (search) {
                url += `&search=${search}`;
            }
            
            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }

            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            
            console.log('API Response:', result);
            
            if (result.success && result.products) {
                setProducts(result.products);
            } else {
                setProducts([]);
                handleError('Failed to fetch products');
            }
        } catch (err) {
            console.error('Error:', err);
            setProducts([]);
            handleError('Error fetching products');
        } finally {
            setLoading(false);
        }
    }, [page, search, selectedCategory])

    // Load categories on mount
    useEffect(() => {
        fetchCategories();
    }, [])

    // Load products when filters change
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    return (
        <div className='home-container'>
            <div className='header'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Filters */}
            <div className='filters'>
                <input
                    type='text'
                    placeholder='Search products...'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
                
                <select 
                    value={selectedCategory} 
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value=''>All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products List */}
            <div className='products-container'>
                {loading ? (
                    <p className='loading-text'>Loading products...</p>
                ) : products && products.length > 0 ? (
                    <div className='products-grid'>
                        {products.map((item) => (
                            <div key={item._id} className='product-card'>
                                <div className='product-header'>
                                    <h3>{item.name}</h3>
                                    <span className='category-badge'>{item.category?.name || 'N/A'}</span>
                                </div>
                                <p className='product-description'>{item.description}</p>
                                <div className='product-footer'>
                                    <div className='price-quantity'>
                                        <span className='price'>₹{item.price.toLocaleString('en-IN')}</span>
                                        <span className='quantity'>Stock: {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='no-products'>No products found</p>
                )}
            </div>

            {/* Pagination */}
            <div className='pagination'>
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                    className='btn-pagination'
                >
                    ← Previous
                </button>
                <span className='page-info'>Page {page}</span>
                <button 
                    onClick={() => setPage(page + 1)}
                    className='btn-pagination'
                >
                    Next →
                </button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Home
