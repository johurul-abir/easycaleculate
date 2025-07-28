fetch('data.json');
const formulaData = {
  formuls: [
    {
      id: 'eq-1',
      formula: 'v = u + at',
      type: 'Final velocity',
      variables: ['v', 'u', 'a', 't'],
      click: 1,
    },
    {
      id: 'eq-2',
      formula: 's = ut + ½at²',
      type: 'Displacement',
      variables: ['s', 'u', 'a', 't'],
      click: 2,
    },
    {
      id: 'eq-3',
      formula: 'v² = u² + 2as',
      type: 'Velocity-displacement',
      variables: ['v', 'u', 'a', 's'],
      click: 3,
    },
    {
      id: 'eq-4',
      formula: 's= {(u+v)/2}t',
      type: 'displacement',
      variables: ['s', 'u', 'v', 't'],
      click: 4,
    },
    {
      id: 'eq-5',
      formula: 'v = u + gt',
      type: 'displacement',
      variables: ['v', 'u', 'g', 't'],
      click: 5,
    },
    {
      id: 'eq-6',
      formula: 'h = ut + ½gt²',
      type: 'Height',
      variables: ['h', 'u', 'g', 't'],
      click: 6,
    },
    {
      id: 'eq-7',
      formula: 'v² = u² + 2gh',
      type: 'Height',
      variables: ['v', 'u', 'g', 'h'],
      click: 7,
    },
    {
      id: 'eq-8',
      formula: 'F = ma',
      type: 'Force',
      variables: ['F', 'm', 'a'],
      click: 8,
    },
    {
      id: 'eq-9',
      formula: 'W = mg',
      type: 'Weight',
      variables: ['w', 'm', 'g'],
      click: 9,
    },
    {
      id: 'eq-10',
      formula: 'P = mv',
      type: 'Momentum',
      variables: ['p', 'm', 'v'],
      click: 10,
    },
    {
      id: 'eq-11',
      formula: 'K = p²/m',
      type: 'Kinetic energy & Momentum',
      variables: ['K', 'p', 'm'],
      click: 11,
    },
    {
      id: 'eq-12',
      formula: 'K = ½mv²',
      type: 'Kinetic energy',
      variables: ['K', 'm', 'v'],
      click: 12,
    },
    {
      id: 'eq-13',
      formula: 'U = mgh',
      type: 'Potential energy',
      variables: ['U', 'm', 'g', 'h'],
      click: 13,
    },
    {
      id: 'eq-14',
      formula: 'W = Fscos𝛳',
      type: 'Work',
      variables: ['W', 'F', 's', 'theta'],
      click: 14,
    },
    {
      id: 'eq-15',
      formula: 'P = W/t',
      type: 'Power',
      variables: ['P', 'W', 't'],
      click: 15,
    },
    {
      id: 'eq-16',
      formula: 'V = IR',
      type: 'Ohm’s Law',
      variables: ['V', 'I', 'R'],
      click: 16,
    },
    {
      id: 'eq-17',
      formula: 'R = ρL/A',
      type: 'Ohm’s Law',
      variables: ['R', 'rho', 'L', 'A'],
      click: 17,
    },
    {
      id: 'eq-18',
      formula: 'v = ωr',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['v', 'omega', 'r'],
      click: 18,
    },
    {
      id: 'eq-19',
      formula: 'F𝚌 = mv²/r',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['Fc', 'm', 'v', 'r'],
      click: 19,
    },
    {
      id: 'eq-20',
      formula: 'a = v²/r',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['a', 'v', 'r'],
      click: 20,
    },
    {
      id: 'eq-21',
      formula: 'E = 1/2Iω²',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['E', 'I', 'omega'],
      click: 21,
    },
    {
      id: 'eq-22',
      formula: 'I = mr²',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['I', 'm', 'r'],
      click: 22,
    },
    {
      id: 'eq-23',
      formula: 'τ = Iα',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['τ', 'I', 'alpha'],
      click: 23,
    },
    {
      id: 'eq-24',
      formula: 'tanθ = v²/rg',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['theta', 'v', 'r', 'g'],
      click: 24,
    },
    {
      id: 'eq-25',
      formula: 'P = Fv',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['P', 'F', 'v'],
      click: 25,
    },
  ],
};

let allFormulas = [];

// Function to render formulas
function renderFormulas(formulas) {
  const container = document.getElementById('formulas');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  container.innerHTML = '';

  if (formulas.length === 0) {
    noResults.classList.remove('hidden');
    resultsCount.textContent = '';
    return;
  }

  noResults.classList.add('hidden');
  resultsCount.textContent = `Found ${formulas.length} formula${
    formulas.length !== 1 ? 's' : ''
  }`;

  formulas.map(item => {
    const div = document.createElement('div');
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
}

// Function to filter formulas based on search input
function filterFormulas(searchTerm) {
  if (!searchTerm.trim()) {
    return allFormulas;
  }

  // Split search term by comma or space and clean up
  const searchVariables = searchTerm
    .toLowerCase()
    .split(/[,\s]+/)
    .map(v => v.trim())
    .filter(v => v.length > 0);

  return allFormulas.filter(formula => {
    return searchVariables.every(searchVar =>
      formula.variables.some(formulaVar =>
        formulaVar.toLowerCase().includes(searchVar.toLowerCase())
      )
    );
  });
}

// Search input event listener
document.getElementById('searchInput').addEventListener('input', e => {
  const searchTerm = e.target.value;
  const filteredFormulas = filterFormulas(searchTerm);
  renderFormulas(filteredFormulas);
});

// Initialize the app
function initializeApp() {
  // In your real app, replace this with actual fetch
  // fetch("data.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //         allFormulas = data.formuls;
  //         renderFormulas(allFormulas);
  //     })
  //     .catch((error) => {
  //         console.error("Error loading JSON:", error);
  //     });

  // Using sample data for demo
  allFormulas = formulaData.formuls;
  renderFormulas(allFormulas);
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', initializeApp);
