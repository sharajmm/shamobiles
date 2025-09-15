import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  Smartphone,
  ShoppingBag,
  FileText,
  Edit3,
  Trash2,
  Plus,
  Check,
  Clock,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";

interface RepairRequest {
  id: string;
  userId: string;
  brand: string;
  model: string;
  imei: string;
  issue: string;
  status: "Pending" | "In Progress" | "Done";
  price?: number;
  notes?: string;
  createdAt: Date;
}

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

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  image?: string;
}

const AdminDashboard: React.FC = () => {
  const [repairForm, setRepairForm] = useState({
    status: "",
    price: "",
    notes: "",
  });
  const [activeTab, setActiveTab] = useState("repairs");
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingRepair, setEditingRepair] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    rating: "",
    warranty: "",
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  const deleteRepair = async (repairId: string) => {
    if (
      window.confirm("Are you sure you want to delete this repair request?")
    ) {
      try {
        await deleteDoc(doc(db, "mobiles", repairId));
        fetchData();
      } catch (error) {
        console.error("Error deleting repair request:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const repairsQuery = query(
        collection(db, "mobiles"),
        orderBy("createdAt", "desc")
      );
      const repairsSnapshot = await getDocs(repairsQuery);
      const repairsList = repairsSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as RepairRequest[];
      setRepairs(repairsList);

      const productsQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
      );
      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsList);

      const blogQuery = query(
        collection(db, "blog"),
        orderBy("createdAt", "desc")
      );
      const blogSnapshot = await getDocs(blogQuery);
      const blogList = blogSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as BlogPost[];
      setBlogPosts(blogList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRepair = async (repairId: string) => {
    try {
      const updateData: any = {
        status: repairForm.status || "Pending",
      };

      if (repairForm.price) {
        updateData.price = parseInt(repairForm.price);
      }
      if (repairForm.notes) {
        updateData.notes = repairForm.notes;
      }

      await updateDoc(doc(db, "mobiles", repairId), updateData);

      if (repairForm.status === "Done") {
        console.log("Repair completed - notification would be sent here");
      }

      setEditingRepair(null);
      setRepairForm({ status: "", price: "", notes: "" });
      fetchData();
    } catch (error) {
      console.error("Error updating repair:", error);
    }
  };

  const addProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        name: productForm.name,
        brand: productForm.brand,
        description: productForm.description,
        price: parseInt(productForm.price),
        image: productForm.image,
        rating: productForm.rating ? parseFloat(productForm.rating) : 0,
        warranty: productForm.warranty,
        available: true,
        createdAt: serverTimestamp(),
      });

      setShowAddProduct(false);
      setProductForm({
        name: "",
        brand: "",
        description: "",
        price: "",
        image: "",
        rating: "",
        warranty: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (productId: string) => {
    try {
      await updateDoc(doc(db, "products", productId), {
        name: productForm.name,
        brand: productForm.brand,
        description: productForm.description,
        price: parseInt(productForm.price),
        image: productForm.image,
        rating: productForm.rating ? parseFloat(productForm.rating) : 0,
        warranty: productForm.warranty,
      });

      setEditingProduct(null);
      setProductForm({
        name: "",
        brand: "",
        description: "",
        price: "",
        image: "",
        rating: "",
        warranty: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        fetchData();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const addBlogPost = async () => {
    try {
      await addDoc(collection(db, "blog"), {
        title: blogForm.title,
        content: blogForm.content,
        image: blogForm.image,
        createdAt: new Date(),
      });

      setShowAddBlog(false);
      setBlogForm({ title: "", content: "", image: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  const updateBlogPost = async (postId: string) => {
    try {
      await updateDoc(doc(db, "blog", postId), {
        title: blogForm.title,
        content: blogForm.content,
        image: blogForm.image,
      });

      setEditingBlog(null);
      setBlogForm({ title: "", content: "", image: "" });
      fetchData();
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const deleteBlogPost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteDoc(doc(db, "blog", postId));
        fetchData();
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "In Progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "Done":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const stats = {
    totalRepairs: repairs.length,
    pendingRepairs: repairs.filter((r: RepairRequest) => r.status === "Pending")
      .length,
    inProgressRepairs: repairs.filter(
      (r: RepairRequest) => r.status === "In Progress"
    ).length,
    completedRepairs: repairs.filter((r: RepairRequest) => r.status === "Done")
      .length,
    totalProducts: products.length,
    availableProducts: products.filter((p: Product) => p.available).length,
    totalBlogs: blogPosts.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage repairs, products, and blog posts
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Contact Info
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">+91 93617 73788</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">231cg049@drngpasc.ac.in</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Repairs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalRepairs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingRepairs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.availableProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Blog Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalBlogs}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "repairs", name: "Repair Requests", icon: Smartphone },
                { id: "products", name: "Products", icon: ShoppingBag },
                { id: "blog", name: "Blog Posts", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "repairs" && (
              <div className="space-y-6">
                {repairs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No repair requests found.
                  </p>
                ) : (
                  repairs.map((repair: RepairRequest) => (
                    <div
                      key={repair.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {repair.brand} {repair.model}
                          </h3>
                          <p className="text-sm text-gray-500">
                            IMEI: {repair.imei}
                          </p>
                          <p className="text-sm text-gray-500">
                            Ticket: {repair.id}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(repair.status)}
                          <span className="text-sm font-medium">
                            {repair.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{repair.issue}</p>

                      {repair.price && (
                        <p className="text-green-600 font-semibold mb-2">
                          Price: ₹{repair.price}
                        </p>
                      )}

                      {repair.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-gray-700">
                            {repair.notes}
                          </p>
                        </div>
                      )}

                      {editingRepair === repair.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              value={repairForm.status}
                              onChange={(e) =>
                                setRepairForm({
                                  ...repairForm,
                                  status: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Done">Done</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price (₹)
                            </label>
                            <input
                              type="number"
                              value={repairForm.price}
                              onChange={(e) =>
                                setRepairForm({
                                  ...repairForm,
                                  price: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder="Enter price"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Notes
                            </label>
                            <input
                              type="text"
                              value={repairForm.notes}
                              onChange={(e) =>
                                setRepairForm({
                                  ...repairForm,
                                  notes: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              placeholder="Add notes"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateRepair(repair.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingRepair(null);
                                setRepairForm({
                                  status: "",
                                  price: "",
                                  notes: "",
                                });
                              }}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xs text-gray-500">
                            Submitted: {repair.createdAt.toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => {
                                setEditingRepair(repair.id);
                                setRepairForm({
                                  status: repair.status,
                                  price: repair.price?.toString() || "",
                                  notes: repair.notes || "",
                                });
                              }}
                              className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                            >
                              <Edit3 className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => deleteRepair(repair.id)}
                              className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Manage Products
                  </h2>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                {showAddProduct && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Add New Product
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Image URL (external link)"
                        value={productForm.image}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            image: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="number"
                        placeholder="Rating (0-5)"
                        min="0"
                        max="5"
                        step="0.1"
                        value={productForm.rating}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            rating: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Warranty (e.g. 6 Month Warranty)"
                        value={productForm.warranty}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            warranty: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Brand"
                        value={productForm.brand}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            brand: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <textarea
                        placeholder="Description"
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            description: e.target.value,
                          })
                        }
                        className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={3}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: e.target.value,
                          })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={addProduct}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Add Product
                      </button>
                      <button
                        onClick={() => {
                          setShowAddProduct(false);
                          setProductForm({
                            name: "",
                            brand: "",
                            description: "",
                            price: "",
                            image: "",
                            rating: "",
                            warranty: "",
                          });
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: Product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {editingProduct === product.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="text"
                            placeholder="Image URL (external link)"
                            value={productForm.image}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                image: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="number"
                            placeholder="Rating (0-5)"
                            min="0"
                            max="5"
                            step="0.1"
                            value={productForm.rating}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                rating: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="text"
                            placeholder="Warranty (e.g. 6 Month Warranty)"
                            value={productForm.warranty}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                warranty: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <input
                            type="text"
                            value={productForm.brand}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                brand: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <textarea
                            value={productForm.description}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows={3}
                          />
                          <input
                            type="number"
                            value={productForm.price}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                price: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateProduct(product.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingProduct(null);
                                setProductForm({
                                  name: "",
                                  brand: "",
                                  description: "",
                                  price: "",
                                  image: "",
                                  rating: "",
                                  warranty: "",
                                });
                              }}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.brand}
                          </p>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <p className="text-lg font-bold text-green-600 mb-3">
                            ₹{product.price.toLocaleString()}
                          </p>
                          <div className="flex justify-between items-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                product.available
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.available ? "Available" : "Sold"}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product.id);
                                  setProductForm({
                                    name: product.name || "",
                                    brand: product.brand || "",
                                    description: product.description || "",
                                    price: product.price
                                      ? product.price.toString()
                                      : "",
                                    image: product.image || "",
                                    rating: product.rating
                                      ? product.rating.toString()
                                      : "",
                                    warranty: product.warranty || "",
                                  });
                                }}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "blog" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Manage Blog Posts
                  </h2>
                  <button
                    onClick={() => setShowAddBlog(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Blog Post</span>
                  </button>
                </div>

                {showAddBlog && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Add New Blog Post
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Blog Title"
                        value={blogForm.title}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <textarea
                        placeholder="Blog Content"
                        value={blogForm.content}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, content: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={8}
                      />
                      <input
                        type="text"
                        placeholder="Image URL (external link)"
                        value={blogForm.image}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, image: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={addBlogPost}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Add Post
                      </button>
                      <button
                        onClick={() => {
                          setShowAddBlog(false);
                          setBlogForm({ title: "", content: "", image: "" });
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {blogPosts.map((post: BlogPost) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      {editingBlog === post.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={blogForm.title}
                            onChange={(e) =>
                              setBlogForm({
                                ...blogForm,
                                title: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <textarea
                            value={blogForm.content}
                            onChange={(e) =>
                              setBlogForm({
                                ...blogForm,
                                content: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows={8}
                          />
                          <input
                            type="text"
                            placeholder="Image URL (external link)"
                            value={blogForm.image}
                            onChange={(e) =>
                              setBlogForm({
                                ...blogForm,
                                image: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateBlogPost(post.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingBlog(null);
                                setBlogForm({
                                  title: "",
                                  content: "",
                                  image: "",
                                });
                              }}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {post.title}
                            </h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingBlog(post.id);
                                  setBlogForm({
                                    title: post.title,
                                    content: post.content,
                                    image: post.image || "",
                                  });
                                }}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteBlogPost(post.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {post.content}
                          </p>
                          <p className="text-xs text-gray-500">
                            Created: {post.createdAt.toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
