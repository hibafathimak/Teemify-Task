import axios from "axios";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  LayoutGrid,
  LayoutList,
  PlusIcon,
  Search,
  Trash2Icon,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import placeholder from "../assets/no-product.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const fetchProducts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://devservice.teemify.ai/list_products",
          {
            user_id: user.user_id,
          }
        );
        if (res.status >= 200 && res.status < 300) {
          setLoading(false);
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white p-3 rounded-xl flex flex-wrap items-center gap-2 justify-between font-bold shadow-sm">
        <div className="flex gap-1 bg-[#f7f7f7] rounded-lg p-1">
          <button className="p-2 rounded-md hover:bg-white focus:bg-white">
            <LayoutList />
          </button>
          <button className="p-2 rounded-md hover:bg-white focus:bg-white">
            <LayoutGrid />
          </button>
        </div>

        <div className="flex items-center bg-[#f7f7f7] rounded-md px-3 py-3 w-full sm:w-72">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-sm px-1"
          />
          <Search className="text-gray-600" size={18} />
        </div>

        <div className="bg-[#f7f7f7] p-3 rounded-md text-sm flex items-center gap-1">
          <span className="text-gray-700">Show:</span> All Products
          <ChevronDownIcon size={16} />
        </div>

        <div className="bg-[#f7f7f7] p-3 rounded-md text-sm flex items-center gap-1">
          <span className="text-gray-700">Sort:</span> By default
          <ChevronDownIcon size={16} />
        </div>

        <button className="flex items-center gap-1 bg-[#f7f7f7] p-3 rounded-md hover:bg-gray-100 text-sm">
          <FilterIcon size={16} /> Filter
        </button>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-teal-700 text-white p-3 rounded-md hover:bg-teal-900 text-sm"
        >
          <PlusIcon size={16} />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full bg-white shadow-md">
          <thead className="bg-white font-bold text-left text-gray-600 text-sm">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Color</th>
              <th className="p-4">Purchase Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <tr key={product?.product_id || index}>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product?.image || placeholder}
                        alt="Product"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <div className="font-medium text-gray-900 text-sm">
                        {product?.product_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="line-clamp-2">
                      {product?.product_description}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 font-medium">
                    {product?.product_color}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm font-semibold text-gray-900">
                    ${product?.product_price}
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors">
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="text-gray-500 text-sm">
                    {loading ? "Loading..." : "No Products Available"}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-2 bg-white rounded-b-lg p-4 text-sm text-gray-700">
          <button
            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <div>
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <AddProduct
        isOpen={openModal}
        modalClose={() => setOpenModal(false)}
        onProductAdd={() => {
          fetchProducts();
        }}
      />
    </div>
  );
};

export default Products;
