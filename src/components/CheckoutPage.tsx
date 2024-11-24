import React, { useState } from "react";
import OrderForm from "./OrderForm";

const CheckoutPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const handleFormSubmit = async (formValues: any) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const formData = [
        formValues.formattedDate,
        formValues.salutation,
        formValues.firstName,
        formValues.lastName,
        formValues.companyName ?? "",
        formValues.quantity,
        formValues.pid,
        formValues.email,
        formValues.phone ?? "",
        formValues.status,
        formValues.paid ?? "",
        formValues.street ?? "",
        formValues.postcode ?? "",
        formValues.city ?? "",
        formValues.country ?? "",
        formValues.deliveryOption ?? "",
        formValues.deliverySalutation ?? "",
        formValues.deliveryFirstName ?? "",
        formValues.deliveryLastName ?? "",
        formValues.deliveryStreet ?? "",
        formValues.deliveryPostcode ?? "",
        formValues.deliveryCity ?? "",
        formValues.deliveryCountry ?? "",
        formValues.comment ?? "",
    ];
    try {
      // Simulate API call
      const response = await fetch("/.netlify/functions/updateGoogleSheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [formData] }),
      });

      if (response.ok) {
        setSubmittedData(formData);
        setSuccessMessage("Your order has been submitted successfully!");
      } else {
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {!successMessage ? (
        <OrderForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      ) : (
        <div className="text-center">
          <h3 className="text-2xl text-green-500 mb-4">{successMessage}</h3>
          <p>Thank you for your order! Here is a summary of your submission:</p>
          <pre className="bg-gray-100 p-4 rounded mt-4 text-left">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <p className="mt-6">Further instructions will be sent to your email.</p>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-4">{errorMessage}</div>
      )}
    </div>
  );
};

export default CheckoutPage;
