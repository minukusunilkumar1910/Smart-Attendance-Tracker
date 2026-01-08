document.getElementById("submitAttendance").addEventListener("click", async () => {
    const name = document.getElementById("nameInput").value.trim();
    const code = document.getElementById("codeInput").value.trim();
    const period = document.getElementById("periodSelect").value; // Get selected period

    if (!name || !code || !period) {
        alert("Please enter your name, attendance code, and select a period.");
        return;
    }

    // Disable the submit button to prevent multiple submissions
    const submitButton = document.getElementById("submitAttendance");
    submitButton.disabled = true;

    try {
        const response = await fetch("/api/attendance/submit-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student: name, code, period }) // Send period along with data
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message); // Show error if attendance fails

        document.getElementById("responseMessage").innerText = data.message;

        setTimeout(() => {
            location.reload(); // Refresh the page
        }, 2000);
    } catch (err) {
        document.getElementById("responseMessage").innerText = err.message;
    } finally {
        // Re-enable the submit button after processing
        submitButton.disabled = false;
    }
});
