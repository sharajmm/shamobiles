import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Smartphone, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface RepairRequest {
  id: string;
  ticketId: string;
  brand: string;
  model: string;
  imei: string;
  issue: string;
  status: "Pending" | "In Progress" | "Done";
  price?: number;
  notes?: string;
  createdAt: Date;
}

const Services: React.FC = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    imei: "",
    issue: "",
  });
  const [myRepairs, setMyRepairs] = useState<RepairRequest[]>([]);
  const [searchToken, setSearchToken] = useState("");
  const [searchedRepair, setSearchedRepair] = useState<RepairRequest | null>(
    null
  );
  const [searching, setSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTicketId, setLastTicketId] = useState<string | null>(null);

  const services = [
    {
      title: "Screen Replacement",
      description: "Professional screen repair for all major brands",
      price: "Starting from ₹2,500",
    },
    {
      title: "Battery Replacement",
      description: "Original battery replacement with warranty",
      price: "Starting from ₹1,500",
    },
    {
      title: "Water Damage Repair",
      description: "Complete water damage assessment and repair",
      price: "Starting from ₹3,000",
    },
    {
      title: "Software Issues",
      description: "Operating system and software problem fixes",
      price: "Starting from ₹800",
    },
    {
      title: "Camera Repair",
      description: "Front and rear camera repair/replacement",
      price: "Starting from ₹2,000",
    },
    {
      title: "Charging Port Fix",
      description: "Charging port cleaning and replacement",
      price: "Starting from ₹1,200",
    },
  ];

  useEffect(() => {
    if (currentUser) {
      fetchMyRepairs();
    }
  }, [currentUser]);

  const fetchMyRepairs = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "mobiles"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const repairs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as RepairRequest[];

      setMyRepairs(repairs);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    }
  };

  // Helper to generate a unique token
  const generateToken = () => {
    return "TICKET-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);

    try {
      const token = generateToken();
      const repairData = {
        userId: currentUser.uid,
        brand: formData.brand,
        model: formData.model,
        imei: formData.imei,
        issue: formData.issue,
        status: "Pending" as const,
        createdAt: new Date(),
        ticketId: token,
      };

      await addDoc(collection(db, "mobiles"), repairData);
      setFormData({ brand: "", model: "", imei: "", issue: "" });
      setLastTicketId(token);
      setShowSuccess(true);
      fetchMyRepairs();

      setTimeout(() => {
        setShowSuccess(false);
        setLastTicketId(null);
      }, 10000);
    } catch (error) {
      console.error("Error submitting repair request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "In Progress":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "Done":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Smartphone className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to submit repair requests and track your device
              status.
            </p>
            <a
              href="/login"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Login Now
            </a>
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
            Repair Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional mobile repair services with quality parts and
            comprehensive warranty.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-green-600 font-semibold">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Request Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Repair Request
            </h2>

            {showSuccess && lastTicketId && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <div>Repair request submitted successfully!</div>
                <div className="mt-2 font-bold">
                  Your Ticket ID:{" "}
                  <span className="text-green-900">{lastTicketId}</span>
                </div>
                <div className="text-xs mt-1">
                  Please note this Ticket ID for future reference and tracking.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Brand *
                </label>
                <select
                  id="brand"
                  required
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Realme">Realme</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Model *
                </label>
                <input
                  type="text"
                  id="model"
                  required
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  placeholder="e.g., iPhone 13, Galaxy S23"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="imei"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  IMEI Number *
                </label>
                <input
                  type="text"
                  id="imei"
                  required
                  value={formData.imei}
                  onChange={(e) =>
                    setFormData({ ...formData, imei: e.target.value })
                  }
                  placeholder="15-digit IMEI number"
                  maxLength={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="issue"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Problem Description *
                </label>
                <textarea
                  id="issue"
                  required
                  value={formData.issue}
                  onChange={(e) =>
                    setFormData({ ...formData, issue: e.target.value })
                  }
                  placeholder="Describe the issue with your device..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Repair Request"}
              </button>
            </form>
          </div>

          {/* My Repairs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Repair Requests
            </h2>
            {/* Search Bar for Token ID */}
            <div className="mb-6 flex gap-2">
              <input
                id="searchToken"
                name="searchToken"
                type="text"
                placeholder="Search by Token ID..."
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                onClick={async () => {
                  setSearching(true);
                  setSearchedRepair(null);
                  if (!searchToken.trim()) return;
                  const q = query(
                    collection(db, "mobiles"),
                    where("ticketId", "==", searchToken.trim().toUpperCase())
                  );
                  const snap = await getDocs(q);
                  if (!snap.empty) {
                    const doc = snap.docs[0];
                    setSearchedRepair({
                      id: doc.id,
                      ...doc.data(),
                      createdAt: doc.data().createdAt.toDate(),
                    } as RepairRequest);
                  } else {
                    setSearchedRepair(null);
                  }
                  setSearching(false);
                }}
              >
                Search
              </button>
            </div>

            {searchToken ? (
              searching ? (
                <p className="text-gray-500 text-center py-8">Searching...</p>
              ) : searchedRepair ? (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <p className="text-lg text-gray-600">
                      <span className="block">
                        Phone:{" "}
                        <a
                          href="tel:+919361773788"
                          className="hover:text-green-600 transition-colors"
                        >
                          +91 93617 73788
                        </a>
                      </span>
                      <span className="block">
                        Email:{" "}
                        <a
                          href="mailto:231cg049@drngpasc.ac.in"
                          className="hover:text-green-600 transition-colors"
                        >
                          231cg049@drngpasc.ac.in
                        </a>
                      </span>
                    </p>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {searchedRepair.brand} {searchedRepair.model}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Token: {searchedRepair.ticketId}
                  </p>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      searchedRepair.status
                    )}`}
                  >
                    {getStatusIcon(searchedRepair.status)}
                    <span>{searchedRepair.status}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{searchedRepair.issue}</p>
                  {searchedRepair.price && (
                    <p className="text-green-600 font-semibold mb-2">
                      Repair Price: ₹{searchedRepair.price}
                    </p>
                  )}
                  {searchedRepair.notes && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-2">
                      <p className="text-sm text-gray-700">
                        {searchedRepair.notes}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Submitted: {searchedRepair.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No repairs pending for this Token ID.
                </p>
              )
            ) : myRepairs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No repair requests found. Submit your first repair request using
                the form.
              </p>
            ) : (
              <div className="space-y-4">
                {myRepairs.map((repair) => (
                  <div
                    key={repair.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {repair.brand} {repair.model}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Token: {repair.ticketId}
                        </p>
                      </div>
                      <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          repair.status
                        )}`}
                      >
                        {getStatusIcon(repair.status)}
                        <span>{repair.status}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{repair.issue}</p>
                    {repair.price && (
                      <p className="text-green-600 font-semibold mb-2">
                        Repair Price: ₹{repair.price}
                      </p>
                    )}
                    {repair.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p className="text-sm text-gray-700">{repair.notes}</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Submitted: {repair.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
