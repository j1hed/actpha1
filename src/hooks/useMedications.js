import { useState, useEffect } from 'react';

const useMedications = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMedications = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/medications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_ACTUAL_TOKEN`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(data);
      console.log('Fetched medications:', data); // Debug log
    } catch (error) {
      console.error('Error fetching medications:', error);
      setError('Failed to fetch medications.');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await fetch('http://localhost:3001/api/medications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_ACTUAL_TOKEN`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error('Error adding medication:', error);
      setError('Failed to add medication. Please try again.');
    }
  };

  const editProduct = async (id, updatedProduct) => {
    console.log('Editing product:', updatedProduct);
    try {
      const response = await fetch(`http://localhost:3001/api/medications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_ACTUAL_TOKEN`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedData = await response.json();
      setProducts(products.map(p => p.id === id ? updatedData : p));
    } catch (error) {
      console.error('Error editing medication:', error);
      setError('Failed to edit medication.');
    }
  };

  const deleteMedication = async (id) => {
    console.log('Deleting product with ID:', id);
    const token = localStorage.getItem('token'); // Ensure you retrieve the token correctly
    try {
        const response = await fetch(`http://localhost:3001/api/medications/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const text = await response.text(); // Get the response as text
            throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        }
        setProducts(products.filter(p => p.id !== id));
    } catch (error) {
        console.error('Error deleting medication:', error);
        setError(`Failed to delete medication: ${error.message}`);
    }
  };

  const handleEdit = (product) => {
    console.log('Editing product:', product);
    setCurrentProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      if (currentProduct) {
        await editProduct(currentProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving medication:', error);
      setError('Failed to save medication.');
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return { products, loading, error, addProduct, editProduct, deleteProduct, handleEdit, handleSubmit };
};

export default useMedications;