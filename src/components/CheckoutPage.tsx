import React, { useState } from "react";
import OrderForm from "./OrderForm";
import { fieldLabels } from "./form/fieldLabels";

const CheckoutPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [rawFormData, setRawFormData] = useState<any | null>('');

  const handleFormSubmit = async (formValues: any) => {
    setRawFormData(formValues);
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const formData = [
        formValues.formattedDate,
        formValues.salutation,
        formValues.firstName,
        formValues.lastName,
        formValues.companyName ?? "",
        Number(formValues.quantity),
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
  const excludedFields = ["status", "paid", "pid"]; 
  type ProcessedDataItem = {
    label: string;
    value: string | number; 
  };


const processedData: ProcessedDataItem[] = Object.entries(rawFormData)
  .filter(([, value]) => value) 
  .filter(([key, value]) => !excludedFields.includes(key) && value)
  .map(([key, value]) => ({
    label: fieldLabels[key] || key,
    value: typeof value === 'string' || typeof value === 'number' ? value : String(value), 
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {!successMessage ? (
        <OrderForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      ) : (
        <div>
          <h3 className="text-2xl text-green-500 mb-4">{successMessage}</h3>
          <p className="text-xl pb-4">Danke für deine Bestellung!</p> 
          <p className="pb-4">Hier die Zusammenfassung deiner Bestellung:</p>
          <div className="text-lg mb-8">
            {processedData.map(({ label, value }) => (
              <div key={label} className="flex gap-4 ">
                <strong>{label}:</strong> <span>{String(value)}</span>
              </div>
            ))}
          </div>
          <p className="mt-6">Weitere Informationen schicken wir dir per Email.</p>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-4">{errorMessage}</div>
      )}
    </div>
  );
};

export default CheckoutPage;
