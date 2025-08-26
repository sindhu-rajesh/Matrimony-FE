import React, { useState } from "react";

const initialPlans = [
  {
    id: 1,
    name: "Silver",
    label: "Silver Plan",
    price: 500,
    duration: "180 Days",
    priceColor: "text-purple-600",
    durationColor: "text-purple-600",
    bg: "bg-purple-50",
    checksColor: "text-purple-600",
  },
  {
    id: 2,
    name: "Gold",
    label: "Gold Plan",
    price: 1000,
    duration: "365 Days",
    priceColor: "text-orange-600",
    durationColor: "text-orange-600",
    bg: "bg-red-50",
    checksColor: "text-orange-600",
  },
  {
    id: 3,
    name: "Diamond",
    label: "Diamond Plan",
    price: 2000,
    duration: "Until the wedding is over Days",
    priceColor: "text-blue-700",
    durationColor: "text-blue-700",
    bg: "bg-blue-100",
    checksColor: "text-blue-700",
  },
];

const AdminMembershipPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    price: "",
    duration: "",
    priceColor: "",
    durationColor: "",
    bg: "",
    checksColor: "",
  });

  const openAddForm = () => {
    setFormData({
      name: "",
      label: "",
      price: "",
      duration: "",
      priceColor: "",
      durationColor: "",
      bg: "",
      checksColor: "",
    });
    setEditingPlan(null);
    setShowForm(true);
  };

  const openEditForm = (plan) => {
    setFormData(plan);
    setEditingPlan(plan);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((plan) => plan.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, label, price, duration, priceColor, durationColor, bg, checksColor } = formData;

    if (!name || !label || !price || !duration) {
      alert("Please fill all required fields");
      return;
    }

    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? formData : p)));
    } else {
      setPlans([
        ...plans,
        { ...formData, id: Date.now(), price: Number(price) },
      ]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Membership Plans</h1>

      <button
        onClick={openAddForm}
        className="mb-6 px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
      >
        Add New Plan
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl shadow-md flex flex-col items-center p-6 ${plan.bg}`}
          >
            <h2 className="text-2xl font-extrabold mb-2">{plan.name}</h2>
            <div className="w-full py-2 text-center mb-4 bg-white rounded">
              <p className="text-lg font-medium">{plan.label}</p>
            </div>
            <div className="mb-4">
              <p className={`${plan.priceColor} font-extrabold text-2xl`}>
                Rs. {plan.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className={`${plan.durationColor} text-lg`}>
                Duration: {plan.duration}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEditForm(plan)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </h2>

            <input
              name="name"
              placeholder="Plan Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="label"
              placeholder="Label"
              value={formData.label}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (in Rs.)"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Optional color inputs */}
            <input
              name="priceColor"
              placeholder="Price Text Color (Tailwind class)"
              value={formData.priceColor}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="durationColor"
              placeholder="Duration Text Color (Tailwind class)"
              value={formData.durationColor}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="bg"
              placeholder="Background Color (Tailwind class)"
              value={formData.bg}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="checksColor"
              placeholder="Checkmarks Color (Tailwind class)"
              value={formData.checksColor}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminMembershipPlans;
