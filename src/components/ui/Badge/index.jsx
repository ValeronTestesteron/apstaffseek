function Badge({ text, color }) {
  return (
    <span className={`px-3 py-1 ${color} rounded-xl text-xs font-bold text-stone-800`}>{text}</span>
  );
}

export default Badge;
