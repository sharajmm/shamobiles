import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { Smartphone, Tag, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  available: boolean;
  image?: string;
  rating?: number;
  warranty?: string;
}

const Buy: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        where("available", "==", true),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];
  const filteredProducts =
    selectedBrand === "All"
      ? products
      : products.filter((p) => p.brand === selectedBrand);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refurbished Devices
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality pre-owned mobile devices, professionally refurbished with
            warranty and quality assurance.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedBrand === brand
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600"
                } border border-gray-300`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              {selectedBrand === "All"
                ? "No refurbished devices available at the moment. Please check back later."
                : `No ${selectedBrand} devices available. Try selecting a different brand.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3
                        className="text-xl font-semibold text-gray-900"
                        style={{
                          maxWidth: "8em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name.length > 18
                          ? product.name.slice(0, 15) + "..."
                          : product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i <
                            Math.max(
                              0,
                              Math.min(5, Math.round(product.rating || 0))
                            )
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } fill-current`}
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-gray-600 mb-4"
                    style={{
                      height: "2.5em",
                      overflow: "hidden",
                      display: "block",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Tag className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Contact to Buy
                    </button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Call:{" "}
                        <a
                          href="tel:+919361737788"
                          className="text-green-600 hover:underline"
                        >
                          +91 93617 73788
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Email:{" "}
                        <a
                          href="mailto:231cg045@drngpasc.ac.in"
                          className="text-green-600 hover:underline"
                        >
                          231cg045@drngpasc.ac.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 px-6 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 font-medium">
                      {product.warranty || "Warranty info not available"}
                    </span>
                    <span className="text-green-600">Quality Assured</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProduct.image && (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {selectedProduct.brand}
              </p>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <
                      Math.max(
                        0,
                        Math.min(5, Math.round(selectedProduct.rating || 0))
                      )
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } fill-current`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 whitespace-pre-line">
                {selectedProduct.description}
              </p>
              <div className="flex items-center space-x-1 mb-4">
                <Tag className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  ₹{selectedProduct.price.toLocaleString()}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-green-700 font-medium">
                  {selectedProduct.warranty || "Warranty info not available"}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Call:{" "}
                  <a
                    href="tel:+919361737788"
                    className="text-green-600 hover:underline"
                  >
                    +91 93617 73788
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  Email:{" "}
                  <a
                    href="mailto:231cg049@drngpasc.ac.in"
                    className="text-green-600 hover:underline"
                  >
                    231cg045@drngpasc.ac.in
                  </a>
                </p>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Quality Assured
            </h3>
            <p className="text-gray-600 text-sm">
              All devices thoroughly tested and certified by our technicians
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              6 Month Warranty
            </h3>
            <p className="text-gray-600 text-sm">
              Comprehensive warranty coverage on all refurbished devices
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600 text-sm">
              Competitive pricing with transparent condition reporting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
