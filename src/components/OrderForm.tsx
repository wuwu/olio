import React, { useState } from "react";
import TextInput from './form/TextInput';
import { fieldLabels } from "./form/fieldLabels";

interface OrderFormProps {
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

const OrderForm: React.FC<OrderFormProps> =  ({ onSubmit, isSubmitting}) => {
  const [formValues, setFormValues] = useState({
    formattedDate: new Date(Date.now()).toLocaleDateString('de-DE'),
    salutation: '',
    firstName: '',
    lastName: '',
    companyName: '',
    quantity: '1', // TODO - get quantity from product selection
    pid: 'o_2024_0500',
    email: '',
    phone: '',
    status: 'open',
    paid: 'false',
    street: '',
    postcode: '',
    city: '',
    country: '',
    deliveryOption: 'pickup',
    deliverySalutation: '',
    deliveryFirstName: '',
    deliveryLastName: '',
    deliveryStreet: '',
    deliveryPostcode: '',
    deliveryCity: '',
    deliveryCountry: '',
    comment: '',

  });
  
  // form settings
  const [isCompany, setIsCompany] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [isDifferentDelivery, setIsDifferentDelivery] = useState(false);
  
  // State for error handling
  const [errors, setErrors] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
    deliverySalutation: "",
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryStreet: "",
    deliveryPostcode: "",
    deliveryCity: "",
    deliveryCountry: "",
  });

// Regular handleChange function without throttle
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ 
      ...formValues, 
      [name as keyof typeof formValues]: value,
    });
  };

const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { checked, name } = e.target;
  if (name === "isCompany") setIsCompany(checked); // Update the state based on the checkbox's checked status
  if (name === "isDifferentDelivery") setIsDifferentDelivery(checked); // Update the state based on the checkbox's checked status
};

  // Form validation
  const validateForm = (): boolean => {
    const requiredFields: Partial<Record<keyof typeof formValues, string>> = {
      salutation: "Anrede fehlt",
      firstName: "Vorname fehlt",
      lastName: "Nachname fehlt",
      email: "E-Mail-Adresse fehlt",
      street: formValues.deliveryOption === "delivery" ? "Straße fehlt" : "",
      city: formValues.deliveryOption === "delivery" ? "Stadt fehlt" : "",
      postcode: formValues.deliveryOption === "delivery" ? "Postleitzahl fehlt" : "",
      country: formValues.deliveryOption === "delivery" ? "Land fehlt" : "",
    };

    const deliveryFields: Partial<Record<keyof typeof formValues, string>> = {
      deliverySalutation: "Anrede fehlt",
      deliveryFirstName: "Vorname fehlt",
      deliveryLastName: "Nachname fehlt",
      deliveryStreet: "Straße fehlt",
      deliveryPostcode: "Postleitzahl fehlt",
      deliveryCity: "Stadt fehlt",
      deliveryCountry: "Land fehlt",
    };

    const newErrors: Partial<Record<keyof typeof formValues, string>> = {};

    Object.entries(requiredFields).forEach(([field, errorMessage]) => {
      const key = field as keyof typeof formValues;
      // Only add error message if required field is empty (or undefined if not required)
      if (formValues[key] === undefined || formValues[key] === "") {
        if (errorMessage) {
          newErrors[key] = errorMessage;
        }
      }
    });

    // Conditionally validate companyName if isCompany is true
    if (isCompany && !formValues.companyName) {
      newErrors.companyName = "Firmenname fehlt";
    }

    if (isDifferentDelivery) {
      Object.entries(deliveryFields).forEach(([field, errorMessage]) => {
        const key = field as keyof typeof formValues;
        if (!formValues[key]) newErrors[key] = errorMessage;
      });
    }

    // Log all the errors for debugging
    console.log("Validation Errors:", JSON.stringify(newErrors));

    setErrors(newErrors as typeof errors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0] as keyof typeof formValues;
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLInputElement;
      errorElement?.focus();
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
        return;
      }
    onSubmit(formValues);
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleSubmit}
        className="w-full max-w-lg p-6"
      >
        <h3 className="text-xl uppercase text-center mb-6">Persönliche Daten</h3>
        <div className="row flex mb-4">
          {/* Anrede */}
        <div className="w-2/5">
          <label htmlFor="salutation" className="olio-label">
            Anrede *
          </label>
          <select
            onChange={handleChange}
            value={formValues.salutation} // Ensure this is tied to state
            className="select input-bordered rounded-none w-full max-w-xs focus:bg-lime-50"
            name="salutation"
            title={fieldLabels.salutation}
          >
            <option value="" disabled>
              Anrede
            </option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
          {errors.salutation && (
            <p className="olio-error">{errors.salutation}</p>
          )}
        </div>
          {/* First Name */}
          <TextInput
            label={fieldLabels.firstName}
            id="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            error={errors.firstName}
            className="flex-grow ml-4"
            placeholder=""
            required
          />
        </div>
        {/* Last Name */}
        <TextInput
          label={fieldLabels.lastName}
          id="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
        {/* Email */}
        <TextInput
          label={fieldLabels.email}
          id="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        {/* Phone */}
        <TextInput
          label={fieldLabels.phone}
          id="phone"
          type="tel"
          value={formValues.phone}
          onChange={handleChange}
        />
        <h3 className="text-xl uppercase text-center mt-4 mb-6">Adresse & Versand</h3>
        {/* Delivery or Pickup */}
        <div className="mb-4">
          <label className="olio-label">Versand oder Pickup</label>
          <select
            name="deliveryOption"
            title="delivery or pickup"
            value={formValues.deliveryOption}
            onChange={handleChange}
            className="select select-bordered w-full mt-2"
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Versand</option>
          </select>
        </div>
        {formValues.deliveryOption === "delivery" && (
        <>
          {/* Street */}
          <TextInput
            label={fieldLabels.street}
            id="street"
            value={formValues.street}
            onChange={handleChange}
            error={errors.street}
            required
          />
          <div className="mb-4 row flex">
          {/* Postcode */}
          <TextInput
            label={fieldLabels.postcode}
            id="postcode"
            value={formValues.postcode}
            onChange={handleChange}
            error={errors.postcode}
            className="w-2/5"
            required
          />
          {/* City */}
          <TextInput
            label={fieldLabels.city}
            id="city"
            value={formValues.city}
            onChange={handleChange}
            error={errors.city}
            className="flex-grow ml-4"
            required
          />
          </div>
        {/* Country */}
        <TextInput
          label={fieldLabels.country}
          id="country"
          value={formValues.country}
          onChange={handleChange}
          error={errors.country}
          required
        />
        {/* isCompany */}
        <div className="mb-2 flex">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" onChange={handleCheckboxChange} title="company" id="isCompany" name="isCompany" checked={isCompany} className="" />
              <span className="label-text ml-4 uppercase">Ich bin eine Firma</span>
            </label>
          </div>
        </div>
        {/* Company Name */}
        {isCompany && (
          <TextInput
            label={fieldLabels.companyName}
            id="companyName"
            value={formValues.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />
        )}
        {/* Delivery Address */}
        <div className="mb-4 flex">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input 
                type="checkbox" 
                onChange={handleCheckboxChange} 
                title="isDifferentDelivery" 
                id="isDifferentDelivery" 
                name="isDifferentDelivery" 
                checked={isDifferentDelivery}
              />
              <span className="label-text ml-4 uppercase">Abweichende Lieferadresse</span>
            </label>
          </div>
        </div>
        {isDifferentDelivery && (
          <>
        <h3 className="text-xl uppercase text-center mb-6">Liefer Adresse</h3>
        <div className="row flex mb-4">
          <div className="w-2/5">
            <label htmlFor="deliverySalutation" className="olio-label">
              {`${fieldLabels.salutation}*`}
            </label>
            <select
              onChange={handleChange}
              value={formValues.deliverySalutation} 
              title="deliverySalutation"
              name="deliverySalutation"
              className="select input-bordered rounded-none w-full max-w-xs focus:bg-lime-50"            
            >
              <option value="" disabled>Anrede</option>
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
              <option value="Divers">Divers</option>
            </select>
          {errors.deliverySalutation && (
            <p className="olio-error">{errors.deliverySalutation}</p>
          )}
          </div>
          {/* First Name */}
          <TextInput
            label={fieldLabels.firstName}
            id="deliveryFirstName"
            value={formValues.deliveryFirstName}
            onChange={handleChange}
            error={errors.deliveryFirstName}
            className="flex-grow ml-4"
            required
          />
        </div>
        {/* Last Name */}
          <TextInput
            label={fieldLabels.lastName}
            id="deliveryLastName"
            value={formValues.deliveryLastName}
            onChange={handleChange}
            error={errors.deliveryLastName}
            required
          />
            {/* Delivery Street */}
          <TextInput
            label={fieldLabels.street}
            id="deliveryStreet"
            value={formValues.deliveryStreet}
            onChange={handleChange}
            error={errors.deliveryStreet}
            required
          />
            <div className="mb-4 row flex">
              {/* Delivery Postcode */}
              <TextInput
                label={fieldLabels.postcode}
                id="deliveryPostcode"
                value={formValues.deliveryPostcode}
                onChange={handleChange}
                error={errors.deliveryPostcode}
                className="w-2/5"
                required
              />
              {/* Delivery City */}
              <TextInput
                label={fieldLabels.city}
                id="deliveryCity"
                value={formValues.deliveryCity}
                onChange={handleChange}
                error={errors.deliveryCity}
                className="flex-grow ml-4"
                required
              />
            </div>
            {/* Delivery Country */}
            <TextInput
              label={fieldLabels.country}
              id="deliveryCountry"
              value={formValues.deliveryCountry}
              onChange={handleChange}
              error={errors.deliveryCountry}
              required
            />
          </>
        )}
        </>
        )}
        <div className="mb-4">
          <label htmlFor="comment" className="olio-label">Kommentar</label>
          <textarea
            name="comment"  // Name to associate it with formValues
            placeholder={formValues.deliveryOption === 'pickup' ? `z.B.: Hallo {Wuwu, Kai, Jockey},\nwann kann ich mein Öl abholen?\n\nGruß ${formValues.firstName}` : ""}
            value={formValues.comment}  // Bind value to form state
            onChange={handleChange}  // Handle changes
            className="textarea textarea-bordered textarea-md w-full h-40 rounded-none focus:bg-lime-50"
          ></textarea>
        </div>
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn bg-slate-900 text-white_smoke-800 w-full font-semibold rounded-none mt-6 hover:text-primary hover:bg-slate-800">
          {isSubmitting ? "Nachricht wird gesendet..." : "Absenden"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
