import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router";
import PageTitle from "../../../components/shared/PageTitle";

// CheckoutForm component for handling Stripe payment
export const CheckoutForm = ({
  agreement,
  finalRent,
  couponCode,
  month,
  appliedCoupon,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const navigate = useNavigate();

  const amount = finalRent;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      Swal.fire({
        icon: "error",
        title: "Payment System Error",
        text: "Stripe has not loaded yet. Please try again.",
        confirmButtonColor: "#ef4444",
      });
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      Swal.fire({
        icon: "error",
        title: "Card Error",
        text: "Card element not found.",
        confirmButtonColor: "#ef4444",
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Validate the card and create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Card Validation Failed",
          text: error.message,
          confirmButtonColor: "#ef4444",
        });
        setIsProcessing(false);
        return;
      }

      console.log("Payment method created:", paymentMethod);

      // Step 2: Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
          confirmButtonColor: "#ef4444",
        });
      } else {
        // Payment succeeded
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;

          // Step 4: Save payment data
          const paymentData = {
            userEmail: user.email,
            userName: user.displayName,
            apartmentNo: agreement.apartmentNo,
            floor: agreement.floor,
            block: agreement.block,
            month: month,
            year: new Date().getFullYear(),
            originalRent: agreement.rent,
            couponCode: couponCode,
            discountPercentage: appliedCoupon?.discount || 0,
            discountAmount: appliedCoupon ? agreement.rent - finalRent : 0,
            finalAmount: finalRent,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
            status: "paid",
          };

          await axiosSecure.post("/payments", paymentData);

          // Show success message
          await Swal.fire({
            icon: "success",
            title: "🎉 Payment Successful!",
            html: `
              <div style="text-align: center; padding: 20px;">
                <h3 style="color: #059669; margin-bottom: 15px;">Payment Completed Successfully!</h3>
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <p><strong>Transaction ID:</strong></p>
                  <code style="background: white; padding: 8px; border-radius: 4px; font-family: monospace;">${transactionId}</code>
                </div>
                <div style="text-align: left; background: #f8fafc; padding: 15px; border-radius: 8px;">
                  <p><strong>Month:</strong> ${month} ${new Date().getFullYear()}</p>
                  <p><strong>Amount Paid:</strong> ৳${finalRent.toLocaleString()}</p>
                  <p><strong>Apartment:</strong> ${
                    agreement.apartmentNo
                  }, Floor ${agreement.floor}, Block ${agreement.block}</p>
                  ${
                    appliedCoupon
                      ? `<p><strong>Coupon Applied:</strong> ${appliedCoupon.code} (${appliedCoupon.discount}% off)</p>`
                      : ""
                  }
                </div>
                <p style="color: #059669; margin-top: 15px;"><strong>✅ Your rent payment has been processed successfully!</strong></p>
              </div>
            `,
            confirmButtonColor: "#10b981",
            confirmButtonText: "Continue",
            allowOutsideClick: false,
          });


          //redirect to member dashboard
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack,
      });

      let errorMessage = "An unexpected error occurred. Please try again.";

      // Handle specific error types
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;

        if (status === 400) {
          errorMessage =
            data.message ||
            "Invalid payment request. Please check your information.";
        } else if (status === 401) {
          errorMessage = "Authentication failed. Please login again.";
        } else if (status === 403) {
          errorMessage = "Payment not authorized. Please contact support.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage =
            data.message || `Server error (${status}). Please try again.`;
        }
      } else if (err.request) {
        // Network error
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (err.message) {
        // Other errors
        errorMessage = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: errorMessage,
        footer: import.meta.env.DEV ? `Error: ${err.message}` : undefined,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center mb-3">
          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
            💳
          </span>
          <label className="text-lg font-semibold text-gray-800">
            Card Information
          </label>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 focus-within:border-blue-400 transition-colors duration-200">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: "500",
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                  iconColor: "#6B7280",
                },
                invalid: {
                  color: "#EF4444",
                  iconColor: "#EF4444",
                },
                complete: {
                  color: "#059669",
                  iconColor: "#059669",
                },
              },
              hidePostalCode: true,
            }}
            onChange={(event) => {
              setCardComplete(event.complete);
            }}
          />
        </div>

        <div className="flex items-center mt-2 text-sm text-gray-600">
          <span className="mr-2">🔒</span>
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={!stripe || isProcessing || !month || !cardComplete}
          className={`
            w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200
            ${
              isProcessing
                ? "bg-yellow-500 text-white"
                : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            }
            ${
              !stripe || !month || !cardComplete
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <span className="text-xl">💳</span>
              <div className="text-center">
                <div className="font-bold">Pay Now</div>
                <div className="text-sm opacity-90">
                  ৳{finalRent.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </button>

        {(!stripe || !month || !cardComplete) && (
          <div className="text-center py-2">
            <p className="text-sm text-gray-500">
              {!month
                ? "⬆️ Please select a month first"
                : !cardComplete
                ? "💳 Please complete card information"
                : "⏳ Loading payment system..."}
            </p>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🛡️</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Secure Payment Guarantee
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                256-bit SSL encryption
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                PCI DSS compliant
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Stripe secure processing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No card details stored
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

// Main Payment component
const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch member's agreement details
  const {
    data: agreement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberAgreement", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/agreements?email=${user?.email}`
      );
      return (
        response.data.find((agreement) => agreement.status === "checked") ||
        null
      );
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Loading Payment Portal
            </h2>
            <p className="text-gray-600 mb-6">
              Fetching your agreement details...
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agreement) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-red-600">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              No Active Agreement Found
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
              You need to have an active apartment agreement to make payments.
              Please contact the administration or create an agreement first.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Go Back
              </button>
              <p className="text-sm text-gray-500">
                Need help? Contact support at support@buildingmanagement.com
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <PageTitle title="Payment" />
      <PaymentForm agreement={agreement} />
    </div>
  );
};

export default Payment;
