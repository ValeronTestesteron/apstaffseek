import axios from 'axios';

export default class EmployeesService {
  static async getAll() {
    const response = await axios.get('./employees.json');
    return response.data.employees;
  }
}
