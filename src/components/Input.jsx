import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  className = '', // For the wrapper div
  inputClassName = '', // For the input element itself
  labelClassName = '', // For the label element
  errorClassName = '', // For the error message element
  ...props // Spread any other native input attributes
}) => {
  const id = name || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseInputStyles =
    'mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed';
  const errorInputStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${inputClassName}`}
        {...props}
      />
      {error && (
        <p className={`mt-1 text-xs text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string, // Important for forms, used to generate id if not provided
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string, // Error message string
  className: PropTypes.string, // Custom class for the wrapper div
  inputClassName: PropTypes.string, // Custom class for the input element
  labelClassName: PropTypes.string, // Custom class for the label
  errorClassName: PropTypes.string, // Custom class for the error message
};

export default Input;
