export default function InputField({
  label,
  type = 'text',
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2">
        {label}
      </label>
      <input
        className="rounded-sm border border-gray-06 bg-gray-02 p-3 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
