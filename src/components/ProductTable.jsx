import { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProductTable = ({ products = [], onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState(""); 
  const { user } = useAuth();
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  let filtered = products.filter((prod) => {
    return (
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || prod.category === categoryFilter)
    );
  });

  if (priceSortOrder === "asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (priceSortOrder === "desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded shadow-sm w-full"
        />


        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded shadow-sm w-full"
        >
          <option value="">Filter by Category</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priceSortOrder}
          onChange={(e) => setPriceSortOrder(e.target.value)}
          className="border p-2 rounded shadow-sm w-full"
        >
          <option value="">Sort Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching products
                </td>
              </tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border font-medium text-gray-800">{prod.title}</td>
                  <td className="p-3 border text-gray-700">${prod.price}</td>
                  <td className="p-3 border text-gray-600 truncate max-w-[250px]">{prod.description}</td>
                  <td className="p-3 border text-gray-600">{prod.category}</td>
                  <td className="p-3 border">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(prod)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      { user && (
                        <>
                          <button
                            onClick={() => onEdit(prod)}
                            className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => onDelete(prod)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
