import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '', // Allow additional custom classes
  ...props // Spread any other native button attributes
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    'social-google':
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500', // Basic Google red
    'social-linkedin':
      'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-600', // Basic LinkedIn blue
  };

  // Specific icons or text for social buttons
  let socialIcon = null;
  if (variant === 'social-google') {
    socialIcon = (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.02 10.188c.11-.71.165-1.43.165-2.162C12.185 6.12 10.97 5 9.508 5c-1.892 0-3.427 1.555-3.427 3.466 0 1.912 1.535 3.467 3.427 3.467.905 0 1.72-.37 2.308-.98l-1.046-1.046c-.292.23-.66.37-1.062.37-.88 0-1.595-.715-1.595-1.596s.716-1.595 1.596-1.595c.535 0 .995.276 1.28.68l.11.162h-1.39V8.812h2.58c.055.315.082.63.082.945 0 .52-.055 1.02-.165 1.495l-.055.237zM22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10c5.28 0 9.584-4.087 9.956-9.223H12.188v-1.555H22zm-1.87-3.018A8.504 8.504 0 0012 3.5C7.292 3.5 3.5 7.292 3.5 12s3.792 8.5 8.5 8.5c4.343 0 7.965-3.278 8.435-7.472H12.188v-1.528h7.942z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (variant === 'social-linkedin') {
    socialIcon = (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {socialIcon}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'social-google',
    'social-linkedin',
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
