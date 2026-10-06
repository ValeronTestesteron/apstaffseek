function Search({ value, onInputChange, setVisibleCount, placeholder }) {
  return (
    <div className="search relative flex items-center">
      <input
        className="w-full p-3.5 pl-12 bg-slate-100 rounded-xl border border-gray-200 focus:outline-none"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => {
          onInputChange(e.target.value);
          setVisibleCount(5);
        }}
      />
      <svg
        className="w-6 h-6 absolute ml-4 left-0 text-dark-gray"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      {value && (
        <svg
          onClick={() => {
            onInputChange('');
            setVisibleCount(5);
          }}
          className="w-5 h-5 absolute mr-4 right-0 text-stone-700 cursor-pointer"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#48494a"
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
    </div>
  );
}

export default Search;
