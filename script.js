let students = [];

fetch("students.json")
  .then(res => res.json())
  .then(data => {
    students = data;
  })
  .catch(err => {
    console.error("Failed to load student data", err);
  });

function findSeat() {
  const input = document.getElementById("rollInput").value.trim().toUpperCase();
  const resultDiv = document.getElementById("result");
  const layoutDiv = document.getElementById("layout");
  const loader = document.getElementById("loader");

  resultDiv.classList.add("hidden");
  layoutDiv.innerHTML = "";
  loader.classList.remove("hidden");

  setTimeout(() => {
    const student = students.find(s => s.roll.toUpperCase() === input);

    loader.classList.add("hidden");

    if (!student) {
      resultDiv.innerHTML = "❌ Roll number not found.";
      resultDiv.classList.remove("hidden");
      return;
    }

    const roomStudents = students
      .filter(s => s.room === student.room && s.block === student.block)
      .sort((a, b) => a.roll.localeCompare(b.roll));

    const index = roomStudents.findIndex(s => s.roll === student.roll);
    const benchNumber = (index % 30) + 1;
    const totalBenches = 30;

    resultDiv.innerHTML = `
      <p><strong>College:</strong> SRIT</p>
      <p><strong>Name:</strong> ${student.name}</p>
      <p><strong>Exam Center:</strong> ${student.block}-${student.room}</p>
      <p><strong>Bench Number:</strong> ${benchNumber} / ${totalBenches}</p>
    `;
    resultDiv.classList.remove("hidden");

    renderLayout(totalBenches, benchNumber);
  }, 1000);
}

function renderLayout(totalBenches, highlightBench) {
  const layoutDiv = document.getElementById("layout");
  layoutDiv.innerHTML = "";

  layoutDiv.style.display = "grid";
  layoutDiv.style.gridTemplateColumns = "repeat(5, 1fr)";
  layoutDiv.style.gap = "10px";

  for (let i = 1; i <= totalBenches; i++) {
    const bench = document.createElement("div");
    bench.className = "bench";
    bench.textContent = `Bench ${i}`;
    if (i === highlightBench) {
      bench.classList.add("highlight");
      bench.style.backgroundColor = "#4CAF50";
      bench.style.color = "white";
      bench.style.fontWeight = "bold";
    }
    layoutDiv.appendChild(bench);
  }
}
