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
    {
      id: 'eq-26',
      formula: 'g = GM/R²',
      type: 'Realtion between Linier and Angular velocity',
      variables: ['g', 'M', 'R'],
      click: 26,
    },
    {
      id: 'eq-27',
      formula: 'g<sub>h</sub> = g((1-2h/R)',
      type: 'Calculate Gravity At Height',
      variables: ['g_h', 'g', 'h', 'R'],
      click: 27,
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

// 3x3 Linear Equation System Solver
function determinant3x3(matrix) {
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

function cramerRule(coeffMatrix, constants) {
  const det = determinant3x3(coeffMatrix);

  if (Math.abs(det) < 1e-10) {
    return null; // System is singular
  }

  // Create matrices for Cramer's rule
  const matrixX = [
    [-constants[0], coeffMatrix[0][1], coeffMatrix[0][2]],
    [-constants[1], coeffMatrix[1][1], coeffMatrix[1][2]],
    [-constants[2], coeffMatrix[2][1], coeffMatrix[2][2]],
  ];

  const matrixY = [
    [coeffMatrix[0][0], -constants[0], coeffMatrix[0][2]],
    [coeffMatrix[1][0], -constants[1], coeffMatrix[1][2]],
    [coeffMatrix[2][0], -constants[2], coeffMatrix[2][2]],
  ];

  const matrixZ = [
    [coeffMatrix[0][0], coeffMatrix[0][1], -constants[0]],
    [coeffMatrix[1][0], coeffMatrix[1][1], -constants[1]],
    [coeffMatrix[2][0], coeffMatrix[2][1], -constants[2]],
  ];

  return {
    x: determinant3x3(matrixX) / det,
    y: determinant3x3(matrixY) / det,
    z: determinant3x3(matrixZ) / det,
  };
}

function getInputValues() {
  const coeffMatrix = [
    [
      parseFloat(document.getElementById('a1').value) || 0,
      parseFloat(document.getElementById('b1').value) || 0,
      parseFloat(document.getElementById('c1').value) || 0,
    ],
    [
      parseFloat(document.getElementById('a2').value) || 0,
      parseFloat(document.getElementById('b2').value) || 0,
      parseFloat(document.getElementById('c2').value) || 0,
    ],
    [
      parseFloat(document.getElementById('a3').value) || 0,
      parseFloat(document.getElementById('b3').value) || 0,
      parseFloat(document.getElementById('c3').value) || 0,
    ],
  ];

  const constants = [
    parseFloat(document.getElementById('d1').value) || 0,
    parseFloat(document.getElementById('d2').value) || 0,
    parseFloat(document.getElementById('d3').value) || 0,
  ];

  return { coeffMatrix, constants };
}

function displayResult(result, status) {
  const resultX = document.getElementById('resultX');
  const resultY = document.getElementById('resultY');
  const resultZ = document.getElementById('resultZ');
  const statusMessage = document.getElementById('statusMessage');

  if (result) {
    resultX.textContent = result.x.toFixed(4);
    resultY.textContent = result.y.toFixed(4);
    resultZ.textContent = result.z.toFixed(4);
    statusMessage.textContent = '✅ Solution found!';
    statusMessage.className =
      'mt-4 p-3 rounded-lg text-center font-medium bg-green-500 bg-opacity-30';
  } else {
    resultX.textContent = '-';
    resultY.textContent = '-';
    resultZ.textContent = '-';
    statusMessage.textContent = status || '❌ No unique solution exists';
    statusMessage.className =
      'mt-4 p-3 rounded-lg text-center font-medium bg-red-500 bg-opacity-30';
  }
}

function solveEquations() {
  const { coeffMatrix, constants } = getInputValues();

  // Check if all coefficients are zero
  const allZero = coeffMatrix.every(row => row.every(val => val === 0));
  if (allZero) {
    displayResult(null, '⚠️ Please enter some coefficients');
    return;
  }

  const result = cramerRule(coeffMatrix, constants);

  if (result) {
    displayResult(result);
  } else {
    displayResult(null, '❌ System has no unique solution (determinant = 0)');
  }
}

function loadExample() {
  // Example: 2x + 3y + z - 8 = 0, x - y + 2z - 1 = 0, 3x + 2y - z - 2 = 0
  document.getElementById('a1').value = '';
  document.getElementById('b1').value = '';
  document.getElementById('c1').value = '';
  document.getElementById('d1').value = '';

  document.getElementById('a2').value = '';
  document.getElementById('b2').value = '';
  document.getElementById('c2').value = '';
  document.getElementById('d2').value = '';

  document.getElementById('a3').value = '';
  document.getElementById('b3').value = '';
  document.getElementById('c3').value = '';
  document.getElementById('d3').value = '';

  const resultX = document.getElementById('resultX');
  const resultY = document.getElementById('resultY');
  const resultZ = document.getElementById('resultZ');

  resultX.textContent = '-';
  resultY.textContent = '-';
  resultZ.textContent = '-';
}

const clearBtn = document.getElementById('clear-btn');
const linearQueationResult = document.getElementById('linearQueationResult');

clearBtn.addEventListener('click', function () {
  loadExample();
  this.style.display = 'none';
  linearQueationResult.style.display = 'none';
});

// Event listeners
document.getElementById('solveBtn').addEventListener('click', () => {
  clearBtn.style.display = 'block';
  linearQueationResult.style.display = 'block';
  solveEquations();
});

// Allow Enter key to solve
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    solveEquations();
  }
});
// Start the app when page loads
window.addEventListener('DOMContentLoaded', initializeApp);
