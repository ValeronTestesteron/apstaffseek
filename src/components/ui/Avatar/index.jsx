function Avatar({ name, color, className }) {
  const getInitialsByName = (name) => {
    return name[0] + name.split(' ')[1][0];
  };

  return (
    <div
      className={`flex items-center justify-center ${className} rounded-full ${color} font-bold uppercase`}>
      <span>{getInitialsByName(name)}</span>
    </div>
  );
}

export default Avatar;
