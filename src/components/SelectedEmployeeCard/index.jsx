import { Link } from 'react-router-dom';

import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

function SelectedEmployeeCard({ employee, onRemove }) {
  return (
    <div className="card relative flex items-center flex-col bg-white text-center rounded-xl border border-gray-200 px-3 py-4">
      {onRemove && (
        <svg
          onClick={() => onRemove(employee.id)}
          className="w-4 h-4 absolute mr-4 right-0 text-stone-700 cursor-pointer"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#c30003"
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
      <Avatar className="h-10 w-10 text-sm" name={employee.name} color="bg-sky-200" />
      <div className="mt-2">
        <p className="text-base font-bold text-black mb-1 leading-none">{employee.name}</p>
        <p className="truncate text-xs text-stone-500 leading-tight">
          {employee.position} - {employee.city}
        </p>
      </div>
      <div className="flex gap-2 mt-3">
        {employee.skills.map((item, index) => (
          <Badge key={index} text={item} color="bg-violet-100" />
        ))}
      </div>
      <div className="w-full mt-4 pt-4 border-t border-slate-100">
        <Link
          to={`/employees/${employee.id}`}
          state={{ currentEmployee: employee }}
          className="px-3 py-1 bg-stone-700 text-white rounded-sm text-xs mt-4 font-bold">
          Профиль
        </Link>
      </div>
    </div>
  );
}

export default SelectedEmployeeCard;
