import React, { useState, useCallback } from "react";

const OrderForm = () => {
  // Separate state for each field
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [isCompany, setIsCompany] = useState(false);
  const [isDifferentDelivery, setIsDifferentDelivery] = useState(false);

  // State for error handling
  const [errors, setErrors] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postcode: "",
    country: "",

  });

// Regular handleChange function without throttle
const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  console.log('handleChange', name, value)
  if (name === "salutation") setSalutation(value);
  if (name === "firstName") setFirstName(value);
  if (name === "lastName") setLastName(value);
  if (name === "email") setEmail(value);
  if (name === "phone") setPhone(value);
  if (name === "street") setStreet(value);
  if (name === "city") setCity(value);
  if (name === "postcode") setPostcode(value);
  if (name === "country") setCountry(value);
  if (name === "deliveryOption") setDeliveryOption(value);
  if (name === "companyName") setCompanyName(value);
}, []);

const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { checked, name } = e.target;
  console.log('select', checked, name)
  if (name === "isCompany") setIsCompany(checked); // Update the state based on the checkbox's checked status
  if (name === "isDifferentDelivery") setIsDifferentDelivery(checked); // Update the state based on the checkbox's checked status
};

  // Form validation
  const validateForm = () => {
    const newErrors: any = {};
    if (!salutation) newErrors.salutation = "Anrede fehlt";
    if (!firstName) newErrors.firstName = "Vorname fehlt";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!street) newErrors.street = "Street is required.";
    if (!city) newErrors.city = "City is required.";
    if (!postcode) newErrors.postcode = "Postcode is required.";
    if (!country) newErrors.county = "County is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = [
    [
      "Name",
      "PID",
      "Email",
      "Quantity",
      "Status",
      "Company",
      "Date",
      "Paid",
      "Street",
      "PLZ",
      "City",
      "Country",
      "Delivery",
      "Delivery Street",
      "Delivery PLZ",
      "Delivery City",
      "Delivery Country",
      "Comment",
    ],
    [
      "John Doe",
      "12345",
      "john.doe@example.com",
      10,
      "Shipped",
      "Example Co.",
      "2024-11-18",
      "Yes",
      "Main St.",
      "10001",
      "New York",
      "USA",
      "DHL",
      "Second St.",
      "10002",
      "Brooklyn",
      "USA",
      "No comment",
    ],
  ];

  try {
    const response = await fetch("/.netlify/functions/updateGoogleSheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: formData }),
    });

    const result = await response.json();
    console.log("Serverless Function Response:", result);
    alert("Data successfully sent to Google Sheets!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to update Google Sheets.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleSubmit}
        className="w-full max-w-lg p-6"
      >
        <h3 className="text-xl uppercase text-center mb-6">Persönliche Daten</h3>
        <div className="row flex mb-4">
          <div className="w-2/5">
            <label htmlFor="anrede" className="olio-label">
              Anrede *
            </label>
            <select onChange={handleChange} className="select input-bordered rounded-none w-full max-w-xs" title="salutation" name="salutation">
              <option disabled selected>Anrede</option>
              <option>Herr</option>
              <option>Frau</option>
              <option>Divers</option>
            </select>
          {errors.salutation && (
            <p className="olio-error">{errors.firstName}</p>
          )}
          </div>
          {/* First Name */}
          <div className="flex-grow ml-4">
          <label htmlFor="lastName" className="olio-label">
            Vorname *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="Vorname hier..."
            className="olio-input"
          />
          {errors.firstName && (
            <p className="olio-error">{errors.firstName}</p>
          )}
          </div>
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="olio-label">
            Nachname *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="olio-input w-full"
          />
          {errors.lastName && (
            <p className="olio-error">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="olio-labe">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="olio-input"
          />
          {errors.email && (
            <p className="olio-error">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-8">
          <label htmlFor="phone" className="olio-label">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="olio-input"
          />
          {errors.phone && (
            <p className="olio-error">{errors.phone}</p>
          )}
        </div>
        <h3 className="text-xl uppercase text-center mb-6">Adresse & Versand</h3>
        {/* Delivery or Pickup */}
        <div className="mb-4">
          <label className="olio-label">Versand oder Pickup</label>
          <select
            name="deliveryOption"
            title="delivery or pickup"
            value={deliveryOption}
            onChange={handleChange}
            className="select select-bordered w-full mt-2"
          >
            <option value="delivery">Versand</option>
            <option value="pickup">Pickup</option>
          </select>
        </div>
        {/* Street */}
        <div className="mb-4">
          <label htmlFor="street" className="olio-label">
            Straße
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={handleChange}
            className="olio-input"
          />
          {errors.street && (
            <p className="olio-error">{errors.street}</p>
          )}
        </div>
        <div className="mb-4 row flex">
            {/* Postcode */}
          <div className="w-2/5">
            <label htmlFor="postcode" className="olio-label">
              Postleitzahl
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={postcode}
              onChange={handleChange}
              className="olio-input"
              />
            {errors.postcode && (
              <p className="olio-error">{errors.postcode}</p>
            )}
          </div>
          {/* City */}
          <div className="flex-grow ml-4">
            <label htmlFor="city" className="olio-label">
              Stadt
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleChange}
              className="olio-input"
            />
            {errors.city && (
              <p className="olio-error">{errors.city}</p>
            )}
          </div>
        </div>
        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country" className="olio-label">
            Land
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={handleChange}
            className="olio-input"
          />
          {errors.country && (
            <p className="olio-error">{errors.country}</p>
          )}
        </div>
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
          <div className="mb-4">
            <label htmlFor="country" className="olio-label">
              Firmen Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={companyName}
              onChange={handleChange}
              className="olio-input"
            />
            {errors.country && (
              <p className="olio-error">{errors.country}</p>
            )}
          </div>
        )}
        {/* Delivery Address */}
        <div className="mb-4 flex">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" onChange={handleCheckboxChange} title="isDifferentDelivery" id="isDifferentDelivery" name="isDifferentDelivery" checked={isDifferentDelivery} className="" />
              <span className="label-text ml-4 uppercase">Abweichende Lieferadresse</span>
            </label>
          </div>
        </div>
        {isDifferentDelivery && (
          <>
        <h3 className="text-xl uppercase text-center mb-6">Liefer Adresse</h3>
        <div className="row flex mb-4">
          <div className="w-2/5">
            <label htmlFor="anrede" className="olio-label">
              Anrede *
            </label>
            <select className="select input-bordered rounded-none w-full max-w-xs" title="deliveryAnrede">
              <option disabled selected>Anrede</option>
              <option>Herr</option>
              <option>Frau</option>
              <option>Divers</option>
            </select>
          </div>
          {/* First Name */}
          <div className="flex-grow ml-4">
          <label htmlFor="deliveryLastName" className="olio-label">
            Vorname *
          </label>
          <input
            type="text"
            id="deliveryFirstName"
            name="deliveryFirstName"
            value={firstName}
            onChange={handleChange}
            placeholder="Vorname hier..."
            className="olio-input"
          />
          {errors.firstName && (
            <p className="olio-error">{errors.firstName}</p>
          )}
          </div>
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="deliveryLastName" className="olio-label">
            Nachname *
          </label>
          <input
            type="text"
            id="deliveryLastName"
            name="deliveryLastName"
            value={lastName}
            onChange={handleChange}
            className="olio-input w-full"
          />
          {errors.lastName && (
            <p className="olio-error">{errors.lastName}</p>
          )}
        </div>
            {/* Delivery Street */}
            <div className="mb-4">
              <label htmlFor="street" className="olio-label">
                Straße
              </label>
              <input
                type="text"
                id="deliveryStreet"
                name="deliveryStreet"
                title="Delivery Street"
                value={street}
                onChange={handleChange}
                className="olio-input"
              />
              {errors.street && (
                <p className="olio-error">{errors.street}</p>
              )}
            </div>
            <div className="mb-4 row flex">
                {/* Delivery Postcode */}
              <div className="w-2/5">
                <label htmlFor="postcode" className="olio-label">
                  Postleitzahl
                </label>
                <input
                  type="text"
                  id="deliveryPostcode"
                  name="deliveryPostcode"
                  title="Delivery Postcode"
                  value={postcode}
                  onChange={handleChange}
                  className="olio-input"
                  />
                {errors.postcode && (
                  <p className="olio-error">{errors.postcode}</p>
                )}
              </div>
              {/* Delivery City */}
              <div className="flex-grow ml-4">
                <label htmlFor="city" className="olio-label">
                  Stadt
                </label>
                <input
                  type="text"
                  id="deliveryCity"
                  name="deliveryCity"
                  title="Delivery City"
                  value={city}
                  onChange={handleChange}
                  className="olio-input"
                />
                {errors.city && (
                  <p className="olio-error">{errors.city}</p>
                )}
              </div>
            </div>
            {/* Delivery Country */}
            <div className="mb-4">
              <label htmlFor="country" className="olio-label">
                Land
              </label>
              <input
                type="text"
                id="deliveryCountry"
                name="deliveryCountry"
                title="Delivery Country"
                value={country}
                onChange={handleChange}
                className="olio-input"
              />
              {errors.country && (
                <p className="olio-error">{errors.country}</p>
              )}
            </div>
          </>
        )}
        {/* Submit Button */}
        <button type="submit" className="btn bg-slate-900 text-white_smoke-800 w-full rounded-none mt-6">
          Absenden
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
