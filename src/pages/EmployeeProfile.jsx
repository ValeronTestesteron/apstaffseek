import { useLocation } from 'react-router-dom';

import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

function EmployeeProfile() {
  const location = useLocation();
  const employee = location.state.currentEmployee;

  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center">
      <div className="container max-w-6xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-xl w-full mx-auto text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            <Avatar className="text-3xl" name={employee.name} />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
            {employee.name}
          </h1>

          <p className="mt-2 text-sm font-medium text-blue-600">
            {employee.position} - {employee.city}
          </p>

          <div className="mt-2">
            <p className="text-sm text-stone-700">{employee.info}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap justify-center gap-2">
              {employee.skills.map((skill, index) => (
                <Badge key={index} text={skill} color="bg-rose-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
