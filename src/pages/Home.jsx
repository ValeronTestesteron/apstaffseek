import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import EmployeesService from '../API/EmployeesService';

import Search from '../components/ui/Search';
import EmployeeList from '../components/EmployeeList';
import SelectedEmployeeCard from '../components/SelectedEmployeeCard';
import Spinner from '../components/ui/Spinner';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  const [fetchEmployees, isEmployeesLoading, employeesError] = useFetching(async () => {
    const allEmployees = await EmployeesService.getAll();
    setEmployees(allEmployees);
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const tiemr = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 400);

    return () => clearTimeout(tiemr);
  }, [searchQuery]);

  const searchedEmployees = useMemo(() => {
    const query = debounceQuery.trim().toLowerCase();

    if (!query) return employees;

    return employees.filter((employee) => {
      const name = employee.name.toLowerCase();
      const position = employee.position.toLowerCase();
      const skills = employee.skills.some((skill) => skill.toLowerCase().includes(query));

      return name.includes(query) || position.includes(query) || skills;
    });
  }, [debounceQuery, employees]);

  const displayedEmployees = (arr) => {
    return arr.slice(0, visibleCount);
  };

  const loadMore = () => {
    setVisibleCount(visibleCount + 5);
  };

  const removeEmployeById = (employeeId) => {
    if (!employeeId) return;

    setSelectEmployees((selectEmployees) =>
      selectEmployees.filter((item) => item.id !== employeeId),
    );
    console.log(`Удален сотрудник ID: ${employeeId}`);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || destination.droppableId === 'employees-pool') return;

    if (source.droppableId === 'employees-pool' && destination.droppableId === 'selected-pool') {
      const draggedEmployee = searchedEmployees[source.index];

      if (selectEmployees.some((employee) => employee.id === draggedEmployee.id)) {
        console.log('Такой пользователь уже есть');
        return;
      }

      setSelectEmployees((selectEmployees) => [...selectEmployees, draggedEmployee]);
      console.log(selectEmployees, draggedEmployee);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-screen bg-slate-200 flex items-center justify-center">
        <div className="container max-w-6xl grid grid-cols-3 gap-4">
          <div className="col-span-2 relative p-8 bg-white rounded-2xl shadow-[0_0_1px_#091e4240] text-stone-700">
            <h1 className="text-2xl font-bold text-black">Сотрудники</h1>
            <div className="mt-2 mb-5">Найти человека по имени, роли или навыку</div>
            <Search
              value={searchQuery}
              setVisibleCount={setVisibleCount}
              onSearchChange={setSearchQuery}
              onDebounceChange={setDebounceQuery}
              placeholder="Поиск..."
            />
            {employeesError && (
              <div className="mt-5 text-xl font-bold">Возникла ошибка: {employeesError}</div>
            )}
            {isEmployeesLoading ? (
              <Spinner className="mt-5 mx-auto size-8 animate-spin text-black" />
            ) : (
              <Droppable
                droppableId="employees-pool"
                isDropDisabled={true}
                renderClone={(provided, snapshot, rubric) => {
                  const item = searchedEmployees[rubric.source.index];
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-full max-w-[309px]">
                      <SelectedEmployeeCard key={item.id} employee={item} />
                    </div>
                  );
                }}>
                {(provided) => (
                  <div
                    className="mt-5 h-full max-h-[460px] overflow-y-auto"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <EmployeeList
                      employees={displayedEmployees(searchedEmployees)}
                      visibleCount={visibleCount}
                      searchCount={searchedEmployees.length}
                      onLoadMore={loadMore}
                    />
                  </div>
                )}
              </Droppable>
            )}
          </div>

          <div className="col-span-1 flex flex-col p-8 rounded-2xl shadow-[0_0_1px_#091e4240] bg-white">
            <div className="mb-5 text-2xl font-bold text-black">Выбранные пользователи:</div>
            <Droppable droppableId="selected-pool">
              {(provided) => (
                <div
                  className="flex flex-col gap-4 flex-1 max-h-[480px] min-h-[230px] overflow-x-hidden overflow-y-auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {selectEmployees.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={`selected-${item.id}`}
                      index={index}
                      isDragDisabled={true}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <SelectedEmployeeCard
                            key={item.id}
                            employee={item}
                            remove={removeEmployeById}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Home;
