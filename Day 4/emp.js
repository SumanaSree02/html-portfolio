let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editId = null;

displayEmployees();

function addEmployee() {
    let name = document.getElementById("empName").value.trim();
    let age = document.getElementById("empAge").value;
    let department = document.getElementById("empDepartment").value;
    let salary = document.getElementById("empSalary").value;

    if (name === "" || age === "" || department === "" || salary === "") {
        alert("Please fill all fields");
        return;
    }

    if (age < 18 || age > 60) {
        alert("Age must be between 18 and 60");
        return;
    }

    if (salary <= 0) {
        alert("Salary must be greater than 0");
        return;
    }

    if (editId === null) {
        let employee = {
            id: Date.now(),
            name: name,
            age: age,
            department: department,
            salary: salary
        };

        employees.push(employee);
        alert("Employee added successfully");
    } else {
        employees = employees.map(function(emp) {
            if (emp.id === editId) {
                return {
                    id: editId,
                    name: name,
                    age: age,
                    department: department,
                    salary: salary
                };
            }
            return emp;
        });

        editId = null;
        document.getElementById("addBtn").innerText = "Add Employee";
        alert("Employee updated successfully");
    }

    saveData();
    clearForm();
    displayEmployees();
}

function displayEmployees() {
    let table = document.getElementById("employeeTable");
    let searchValue = document.getElementById("search").value.toLowerCase();
    let filterDepartment = document.getElementById("filterDepartment").value;
    let sortSalary = document.getElementById("sortSalary").value;

    let filteredEmployees = employees.filter(function(emp) {
        let matchName = emp.name.toLowerCase().includes(searchValue);
        let matchDepartment =
            filterDepartment === "" || emp.department === filterDepartment;

        return matchName && matchDepartment;
    });

    if (sortSalary === "low") {
        filteredEmployees.sort(function(a, b) {
            return Number(a.salary) - Number(b.salary);
        });
    }

    if (sortSalary === "high") {
        filteredEmployees.sort(function(a, b) {
            return Number(b.salary) - Number(a.salary);
        });
    }

    table.innerHTML = "";

    if (filteredEmployees.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" class="no-data">No employee records found</td>
            </tr>
        `;
    } else {
        filteredEmployees.forEach(function(emp, index) {
            table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${emp.name}</td>
                    <td>${emp.age}</td>
                    <td>${emp.department}</td>
                    <td>₹${emp.salary}</td>
                    <td>
                        <button class="edit-btn" onclick="editEmployee(${emp.id})">
                            Edit
                        </button>

                        <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    updateStats();
}

function editEmployee(id) {
    let employee = employees.find(function(emp) {
        return emp.id === id;
    });

    document.getElementById("empName").value = employee.name;
    document.getElementById("empAge").value = employee.age;
    document.getElementById("empDepartment").value = employee.department;
    document.getElementById("empSalary").value = employee.salary;

    editId = id;
    document.getElementById("addBtn").innerText = "Update Employee";
}

function deleteEmployee(id) {
    let confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (confirmDelete) {
        employees = employees.filter(function(emp) {
            return emp.id !== id;
        });

        saveData();
        displayEmployees();
        alert("Employee deleted successfully");
    }
}

function clearForm() {
    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("empDepartment").value = "";
    document.getElementById("empSalary").value = "";

    editId = null;
    document.getElementById("addBtn").innerText = "Add Employee";
}

function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function updateStats() {
    document.getElementById("totalEmployees").innerText = employees.length;

    if (employees.length === 0) {
        document.getElementById("avgSalary").innerText = "₹0";
        document.getElementById("highestSalary").innerText = "₹0";
        return;
    }

    let totalSalary = employees.reduce(function(sum, emp) {
        return sum + Number(emp.salary);
    }, 0);

    let avgSalary = totalSalary / employees.length;

    let highestSalary = Math.max(
        ...employees.map(function(emp) {
            return Number(emp.salary);
        })
    );

    document.getElementById("avgSalary").innerText = "₹" + avgSalary.toFixed(0);
    document.getElementById("highestSalary").innerText = "₹" + highestSalary;
}