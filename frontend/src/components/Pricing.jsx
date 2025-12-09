import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const plans = [
    { title: "Basic", price: "$0", features: ["1 Resume", "Basic Templates"] },
    { title: "Pro", price: "$9/mo", features: ["Unlimited Resumes", "Premium Templates", "AI Review"] },
    { title: "Expert", price: "$19/mo", features: ["Everything in Pro", "1:1 Resume Support"] },
  ];

  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    navigate('/checkout', { state: { planId: plan.title.toLowerCase() } });
  };

  return (
    <section id="pricing" className="py-16 px-6 lg:px-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {plans.map((p, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 border dark:border-gray-700 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{p.title}</h3>
              <div className="text-4xl font-bold text-purple-600 mt-4">{p.price}</div>

              <ul className="mt-6 text-gray-700 dark:text-gray-300 space-y-2">
                {p.features.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(p)}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
