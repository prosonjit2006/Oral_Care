import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { Check, IndianRupee } from "lucide-react";
// import { plans } from "../../services/json/data.json";
import type { BillingType } from "../../type/type/global.type";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import { fetchPlanList, setCheckoutPlan } from "../../store/slices/plan.slice";
import { useLocation, useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie'

const SubscriptionPlans = () => {
  // const navigate = useNavigate();

  // const checkAuth = Cookies.get('user')
  // const isAuth = checkAuth ? JSON.parse(checkAuth) : null

  const navigate = useNavigate();
  const location = useLocation()

  const dispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state.plan);

  useEffect(() => {
    dispatch(fetchPlanList());
  }, [dispatch]);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [billing, setBilling] = useState<BillingType>("monthly");

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlanId");

    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("selectedPlanId", selectedPlan);
    }
  }, [selectedPlan]);

  // const handleSubscribe = (planId: string) => {
  //   localStorage.setItem("selectedPlanId", planId);

  // navigate("/payment");
  // };

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        {/* Billing Toggle */}
        {location.pathname !== "/" && (
          <div className="flex justify-center items-center gap-3 mb-10">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-3xl text-sm font-medium transition duration-300 ${
                billing === "monthly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
            >
              Monthly Billing
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`relative px-4 py-2 rounded-3xl text-sm font-medium transition duration-300 ${
                billing === "yearly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
            >
              Yearly Billing
              {/* Optional: Tiny discount badge that sits on the corner */}
              <span className="absolute -top-3 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                Save 20%
              </span>
            </button>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans
            .filter((itm) => itm.status === true)
            .map((itm) => {
              const isActive = selectedPlan === itm.$id;

              return (
                <div
                  key={itm.$id}
                  onClick={() => setSelectedPlan(itm.$id)}
                  className={`flex flex-col justify-between rounded-3xl relative border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-blue-700 bg-blue-200 scale-[1.02]"
                      : "border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200"
                  }`}
                >
                  {itm.recomended && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs px-3 py-2 rounded-full">
                      Recommended
                    </span>
                  )}

                  <div className="p-6">
                    <p className="text-gray-700">{itm.planname}</p>

                    <h3 className="text-3xl font-bold mt-2 flex items-center">
                      <IndianRupee /> {itm.price}
                      <span className="text-sm font-normal">
                        {itm.planname}
                      </span>
                    </h3>

                    <p className="text-sm text-gray-600 mt-3">
                      {itm.description}
                    </p>

                    <hr className="my-5 border-gray-400/40" />

                    <ul className="space-y-3 text-sm">
                      {itm.feature.split(",").map((data, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check size={18} className="text-blue-700" />
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      setSelectedPlan(itm.$id);
                      setLoadingPlan(itm.$id);
                      try {
                        // if(!isAuth) return
                        //  await checkout(itm.$id, itm.planname, itm.price);
                        dispatch(setCheckoutPlan(itm));
                        navigate("/payment");
                      } catch (error) {
                        console.error("Checkout failed:", error);
                      } finally {
                        setLoadingPlan(null);
                      }
                    }}
                    className={`py-3 font-medium rounded-b-3xl transition ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {loadingPlan === itm.$id
                      ? "Processing..."
                      : `Subscribe ${itm.planname}`}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
