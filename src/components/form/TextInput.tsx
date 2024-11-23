import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string; // Allow different input types like "text", "email", "password", etc.
  className?: string; // Optional className for custom styles
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  onChange,
  value,
  error,
  placeholder = '',
  type = 'text',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="olio-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        title={label}
        value={value}
        onChange={onChange}
        className='olio-input'
        placeholder={placeholder}
      />
      {error && <p className="olio-error">{error}</p>}
    </div>
  );
};

export default TextInput;