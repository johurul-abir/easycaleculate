//formula data
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        const container = document.getElementById("formulas");

        data.formuls.map((item) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <a href="#calculator"><button
                    onclick="selectEquation(${item.click})"
                    id=${item.id}
                    class="equation-btn p-2 sm:p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                    <div class="text-sm sm:text-lg font-mono text-blue-600">
                        ${item.formula}
                    </div>  
                </button></a>
            `;
            container.appendChild(div);
        });
    })
    .catch((error) => {
        console.error("Error loading JSON:", error);
    });

