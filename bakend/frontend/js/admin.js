 // Handle student form submission
document.getElementById("studentForm").addEventListener("submit", (e) => {
   e.preventDefault();
   
   // Get values from input fields
   const name = document.getElementById("studentName").value.trim();
   const rollNumber = document.getElementById("rollNumber").value.trim();
   const password = document.getElementById("studentPassword").value.trim();

   // Send a POST request to add a new student
   fetch("/api/students/add", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, rollNumber, password })
   })
   .then(res => {
       if (!res.ok) throw new Error("Failed to add student");
       return res.json();
   })
   .then(data => {
       alert("Student added successfully!");
       loadStudents(); // Refresh the student records
   })
   .catch(err => alert(err.message));
});

// Function to load existing students from the database
function loadStudents() {
   fetch("/api/students/get-all")
       .then(res => {
           if (!res.ok) throw new Error("Failed to load students");
           return res.json();
       })
       .then(students => {
           const container = document.getElementById("studentRecords");
           container.innerHTML = ""; // Clear previous records

           if (students.length === 0) {
               container.innerHTML = "<p>No students found.</p>";
               return;
           }

           // Display students in the UI as a table
           const table = document.createElement('table');
           const headerRow = table.insertRow();
           headerRow.innerHTML = `<th>Name</th><th>Roll Number</th><th>Action</th>`; // Table headers

           // Add each student as a row in the table
           students.forEach(student => {
               const row = table.insertRow();
               row.innerHTML = `<td>${student.name}</td><td>${student.rollNumber}</td><td><button onclick="deleteStudent('${student.rollNumber}')">Delete</button></td>`;
           });

           container.appendChild(table); // Append the table to the container
       })
       .catch(err => console.error("Error loading students:", err));
}

// Function to delete a student by roll number
function deleteStudent(rollNumber) {
   fetch(`/api/students/delete/${rollNumber}`, {
       method: "DELETE"
   })
   .then(res => {
       if (!res.ok) throw new Error("Failed to delete student");
       loadStudents(); // Refresh the student records
   })
   .catch(err => alert(err.message));
}

// Load students when the page is loaded
loadStudents();
