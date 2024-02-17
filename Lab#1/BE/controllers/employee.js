const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  const index = employee.findIndex(emp => emp.id === employeeId);
  //findIndex iterates over 'emp' which is an object of the employee array
  //when emp.id === employeeID, this argument is true, therefore the index of that emp is returned
  if (index !== -1) {
    employee.splice(index, 1);
    //splice takes the index at which to start removing and how many elements to remove
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { employeeName, employeeId } = req.body;

  const newEmployee = {
    id: employeeId.toString(), 
    name: employeeName
  };

  const index = employee.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    res.status(404).json({ error: 'Employee already exists' });
  } else {
    employee.push(newEmployee);  
    res.status(201).json({ data: newEmployee });
  }
  
};
