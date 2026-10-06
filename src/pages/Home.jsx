import axios from 'axios';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import Search from '../components/ui/Search';
import EmployeeList from '../components/EmployeeList';
import SelectedEmployeeCard from '../components/SelectedEmployeeCard';

function Home() {
  const [inputQuery, setInputQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (id) {
          const response = await axios.get(`./employees/${id}`);
          setEmployees(response.data.employees);
        } else {
          const response = await axios.get('./employees.json');
          setEmployees(response.data.employees);
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      }
    };
    fetchEmployees();
  }, [id]);

  const searchEmployees = (query) => {
    const modQuery = query.trim().toLowerCase();

    const result = employees.filter((employee) => {
      const name = employee.name.toLowerCase();
      const position = employee.position.toLowerCase();
      const skills = employee.skills.some((skill) => skill.toLowerCase().includes(modQuery));

      return name.includes(modQuery) || position.includes(modQuery) || skills;
    });
    setDebounceQuery(displayedEmployees(result));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(inputQuery);
      searchEmployees(inputQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputQuery, employees, visibleCount]);

  const displayedEmployees = (arr) => {
    return arr.slice(0, visibleCount);
  };

  const loadMore = () => {
    setVisibleCount(visibleCount + 5);
  };

  const handleRemoveEmployee = (employeeId) => {
    console.log(`Удален сотрудник ID: ${employeeId}`);
    setSelectEmployees((selectEmployees) =>
      selectEmployees.filter((item) => item.id !== employeeId),
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || destination.droppableId === 'employees-pool') return;

    if (source.droppableId === 'employees-pool' && destination.droppableId === 'selected-pool') {
      const draggedEmployee = employees[source.index];

      if (selectEmployees.some((employee) => employee.id === draggedEmployee.id)) {
        console.log('Такой пользователь уже есть');
        return;
      }

      setSelectEmployees((selectEmployees) => [...selectEmployees, draggedEmployee]);
      console.log(selectEmployees);
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
              value={inputQuery}
              setVisibleCount={setVisibleCount}
              onInputChange={setInputQuery}
              placeholder="Поиск..."
            />
            <Droppable
              droppableId="employees-pool"
              isDropDisabled={true}
              renderClone={(provided, snapshot, rubric) => {
                const item = debounceQuery[rubric.source.index];
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style, boxSizing: 'border-box' }}
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
                  <EmployeeList employees={debounceQuery} onLoadMore={loadMore} />
                </div>
              )}
            </Droppable>
          </div>
          <div className="col-span-1 flex flex-col p-8 rounded-2xl shadow-[0_0_1px_#091e4240] bg-white">
            <div className="mb-5 text-2xl font-bold text-black">Выбранные пользователи:</div>
            <Droppable droppableId="selected-pool">
              {(provided) => (
                <div
                  className="flex flex-col flex-1 gap-4 max-h-[480px] overflow-x-hidden overflow-y-auto"
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
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, boxSizing: 'border-box' }}>
                          <SelectedEmployeeCard
                            key={item.id}
                            employee={item}
                            onRemove={handleRemoveEmployee}
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
