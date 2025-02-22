import clsx from 'clsx';

const FormField = ({ 
  label, 
  id, 
  register, 
  error, 
  validation, 
  ...props 
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...register(id, validation)}
      className={clsx(
        'w-full px-4 py-3 border rounded-xl focus:ring-2',
        error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
      )}
      {...props}
    />
    {error && (
      <p className="text-red-600 text-sm mt-1">
        {error.type === 'required' && 'This field is required'}
        {error.type === 'min' && `Minimum ${validation.min}`}
        {error.type === 'max' && `Maximum ${validation.max}`}
      </p>
    )}
  </div>
);

export default FormField;