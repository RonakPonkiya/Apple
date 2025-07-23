import { useEffect, useState } from "react";
import {
  fetchProductsapi,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../utils/api";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import ProductTable from "../components/ProductTable";
import { useAuth } from "../context/AuthContext";
import { Plus } from "lucide-react";


function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const { user } = useAuth();

  const fetchProducts = () => {
    fetchProductsapi()
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (formData) => {
    try {
      const { id, ...cleanData } = formData;
      const res= await addProduct(cleanData);
      alert(res.title ,"product add")
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const res= await updateProduct(formData.id, formData);
      alert(res.title ,"product updated")
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.title}"?`)) return;
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📦 Product Dashboard</h1>
        <div className="relative group">
          <button
            onClick={() => user && setIsModalOpen(true)}
            disabled={!user}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all ${user
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-white cursor-not-allowed"
              }`}
          >
            <Plus size={18} />
            <span>Create Product</span>
          </button>
          {!user && (
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
              Please log in to create a product
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <ProductTable
          products={products}
          onView={setViewProduct}
          onEdit={setEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ProductForm
            onClose={() => setIsModalOpen(false)}
            onSave={handleCreateProduct}
          />
        </Modal>
      )}

      {viewProduct && (
        <Modal onClose={() => setViewProduct(null)}>
          <div className="max-w-md w-full text-gray-800">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">{viewProduct.title}</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded overflow-hidden">
                <img
                  src={viewProduct.image || "https://via.placeholder.com/150"}
                  alt={viewProduct.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <span className="block text-sm text-gray-500 font-medium">Price</span>
                  <p className="text-lg font-semibold text-green-600">${viewProduct.price}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 font-medium">Category</span>
                  <p className="text-base text-gray-700">{viewProduct.category}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <span className="block text-sm text-gray-500 font-medium mb-1">Description</span>
              <p className="text-gray-700 whitespace-pre-line">{viewProduct.description}</p>
            </div>
          </div>
        </Modal>
      )}

      {editProduct && (
        <Modal onClose={() => setEditProduct(null)}>
          <ProductForm
            mode="edit"
            initialData={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleUpdateProduct}
          />
        </Modal>
      )}

    </div>
  );
}

export default Products;
