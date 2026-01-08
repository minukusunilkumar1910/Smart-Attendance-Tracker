// attendence-system\backend\frontend\js\teacher.js
document.getElementById("generateCode").addEventListener("click", async () => {
    const period = document.getElementById("periodSelect").value;
    const subject = document.getElementById("subjectInput").value.trim();

    if (!subject) {
        alert("Please enter the subject!");
        return;
    }

    try {
        const response = await fetch("/api/attendance/generate-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ period, subject }) // Send period along with subject
        });

        const data = await response.json();

        if (!response.ok) throw new Error("Error generating code.");

        document.getElementById("codeDisplay").innerText = `Code: ${data.code} (Period ${data.period} - ${data.subject})`;
    } catch (err) {
        console.error("Error generating code:", err);
    }
});

// ------------
document.getElementById("loadAllRecords").addEventListener("click", () => {
    const date = document.getElementById("dateFilter").value; // Get the date from the input

    fetch(`/api/attendance/get-all-attendance?date=${date}`)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(records => {
            // Clear previous records from all tables
            for (let i = 1; i <= 6; i++) {
                const tbody = document.querySelector(`#period${i}Table tbody`);
                tbody.innerHTML = ""; // Clear previous records
            }

            if (records.length === 0) {
                alert("No records found for the selected date.");
                return;
            }

            // Distribute records into respective period tables
            records.forEach(record => {
                const tbody = document.querySelector(`#period${record.period}Table tbody`);
                tbody.innerHTML += `<tr>
                    <td>${record.student}</td>
                    <td>${record.rollNumber}</td> <!-- Assuming rollNumber is part of the record -->
                    <td>${record.subject}</td>
                    <td>${new Date(record.time).toLocaleString()}</td>
                    <td>${record.codeEntered}</td>
                </tr>`;
            });
        })
        .catch(err => {
            console.error("Error loading records:", err);
            alert("Failed to load records. Check the console for details.");
        });
});

//----pdf
async function downloadPDF(period) { 
    if (!window.jsPDF) {
        console.error("❌ Error: jsPDF is not available.");
        return;
    }

    const doc = new window.jsPDF();

    // Set title
    doc.setFontSize(18);
    doc.text(`Attendance Records for Period ${period}`, 14, 10);

    // Table headers
    const headers = ["Student Name", "Roll Number", "Subject", "Time", "Code Entered"];
    let y = 20; // Starting Y position for table

    // Draw table headers
    doc.setFontSize(12);
    headers.forEach((header, i) => {
        // Adjusting the gaps
        const gaps = [30, 30, 30, 50, 30]; // Decreased gaps between first three columns, increased gap between Time and Code
        doc.text(header, 14 + gaps.slice(0, i).reduce((a, b) => a + b, 0), y);
    });

    y += 10; // Move to next line

    // Get attendance data
    const tbody = document.querySelector(`#period${period}Table tbody`);
    const rowsData = tbody.querySelectorAll("tr");

    // Extract data from table and add to PDF
    rowsData.forEach((row) => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell, i) => {
            // Adjusting the gaps for cell data
            const gaps = [30, 30, 30, 50, 30]; // Same gaps as headers
            doc.text(cell.innerText, 14 + gaps.slice(0, i).reduce((a, b) => a + b, 0), y);
        });
        y += 10; // Move to next line
    });

    // Save PDF
    doc.save(`attendance_period_${period}.pdf`);
}
