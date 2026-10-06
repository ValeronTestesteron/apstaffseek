import { Draggable } from '@hello-pangea/dnd';

import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

function EmployeeList({ employees, onLoadMore }) {
  const COLORS = ['bg-red-100', 'bg-orange-100', 'bg-green-100', 'bg-violet-100', 'bg-rose-100'];

  return (
    <>
      {employees ? (
        <>
          {employees.map((item, index) => (
            <div key={item.id} className="card relative block mb-4">
              <div className="relative flex items-center bg-white rounded-xl border border-gray-200 px-3 py-3 pl-6">
                <div className="absolute left-0 pl-2">⋮⋮</div>
                <Avatar
                  className="h-10 w-10 text-sm"
                  name={item.name}
                  color={COLORS[index % COLORS.length]}
                />
                <div className="ml-3">
                  <p className="text-base font-bold text-black mb-1 leading-none">{item.name}</p>
                  <p className="truncate text-xs text-stone-500 leading-tight">
                    {item.position} - {item.city}
                  </p>
                </div>
                <div className="flex gap-2 ml-auto">
                  {item.skills.map((skill, index) => (
                    <Badge key={index} text={skill} color={COLORS[index % COLORS.length]} />
                  ))}
                </div>
              </div>

              <Draggable draggableId={String(item.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="absolute h-full w-full opacity-0 top-0 left-0"></div>
                )}
              </Draggable>
            </div>
          ))}
          {employees.length >= 5 && employees.length < 50 && (
            <button
              type="button"
              onClick={() => onLoadMore()}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-6 py-3 text-sm leading-5 font-semibold text-white active:bg-violet-700 cursor-pointer">
              Загрузить еще
            </button>
          )}
        </>
      ) : (
        <div>Такого пользователя нет или данные не загрузились</div>
      )}
    </>
  );
}

export default EmployeeList;
