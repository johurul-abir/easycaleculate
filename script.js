// size calculation for useing clamp

function calculateClick() {
  const size = document.getElementById('size').value;
  const screenSize = document.getElementById('screen-size').value;
  const vw = document.getElementById('vw');

  if (size && screenSize) {
    const resutl = (vw.value = (size * 100) / screenSize);
    vw.value = resutl.toFixed(2);
  } else {
    vw.value = 'Input valu Invalid';
  }
}

function clearClick() {
  document.getElementById('size').value = '';
  document.getElementById('screen-size').value = '';
  document.getElementById('vw').value = '';
}

//================================
//==caleculate physics formula ===
//================================

let currentEquation = null;
let selectedVariable = null;
const equations = {
  1: {
    formula: 'v = u + at',
    variables: ['v', 'u', 'a', 't'],
    units: { v: 'm/s', u: 'm/s', a: 'm/s²', t: 's' },
    labels: {
      v: 'Final velocity',
      u: 'Initial velocity',
      a: 'Acceleration',
      t: 'Time',
    },
  },
  2: {
    formula: 's = ut + ½at²',
    variables: ['s', 'u', 'a', 't'],
    units: { s: 'm', u: 'm/s', a: 'm/s²', t: 's' },
    labels: {
      s: 'Displacement',
      u: 'Initial velocity',
      a: 'Acceleration',
      t: 'Time',
    },
  },
  3: {
    formula: 'v² = u² + 2as',
    variables: ['v', 'u', 'a', 's'],
    units: { v: 'm/s', u: 'm/s', a: 'm/s²', s: 'm' },
    labels: {
      v: 'Final velocity',
      u: 'Initial velocity',
      a: 'Acceleration',
      s: 'Displacement',
    },
  },
  4: {
    formula: 's = {(u+v)/2}t',
    variables: ['s', 'u', 'v', 't'],
    units: { v: 'm/s', u: 'm/s', t: 's', s: 'm' },
    labels: {
      v: 'Final velocity',
      u: 'Initial velocity',
      t: 'Time',
      s: 'Displacement',
    },
  },
  5: {
    formula: 'v = u + gt',
    variables: ['v', 'u', 'g', 't'],
    units: { v: 'm/s', u: 'm/s', g: 'm/s²', t: 's' },
    labels: {
      v: 'Final velocity',
      u: 'Initial velocity',
      t: 'Time',
      g: 'Gravitational acceleration',
    },
  },
  6: {
    formula: 'h = ut + ½gt²',
    variables: ['h', 'u', 'g', 't'],
    units: { h: 'm', u: 'm/s', g: 'm/s²', t: 's' },
    labels: {
      h: 'Height',
      u: 'Initial velocity',
      t: 'Time',
      g: 'Gravitational acceleration',
    },
  },
  7: {
    formula: 'v² = u² + 2gh',
    variables: ['v', 'u', 'g', 'h'],
    units: { v: 'm/s', u: 'm/s', g: 'm/s²', h: 'm' },
    labels: {
      v: 'Final velocity',
      u: 'Initial velocity',
      h: 'Height',
      g: 'Gravitational acceleration',
    },
  },
  8: {
    formula: 'F = ma',
    variables: ['F', 'm', 'a'],
    units: { F: 'N', m: 'kg', a: 'm/s²' },
    labels: {
      F: 'Force',
      m: 'Mass',
      a: 'Acceleration',
    },
  },
  9: {
    formula: 'W = mg',
    variables: ['w', 'm', 'g'],
    units: { w: 'N', m: 'kg', a: 'm/s²' },
    labels: {
      w: 'Weight',
      m: 'Mass',
      g: 'Gravitational acceleration',
    },
  },
  10: {
    formula: 'P = mv',
    variables: ['p', 'm', 'v'],
    units: { p: 'kgm/s', m: 'kg', v: 'm/s' },
    labels: {
      p: 'Momentum',
      m: 'Mass',
      v: 'Valucity',
    },
  },
  11: {
    formula: 'K = p²/m',
    variables: ['K', 'p', 'm'],
    units: { K: 'J', p: 'kgm/s', m: 'kg' },
    labels: {
      K: 'Kinetic energy',
      p: 'Momentum',
      m: 'Mass',
    },
  },
  12: {
    formula: 'K = ½mv²',
    variables: ['K', 'm', 'v'],
    units: { K: 'J', m: 'kg', v: 'm/s' },
    labels: {
      K: 'Kinetic energy',
      v: 'Valucity',
      m: 'Mass',
    },
  },
  13: {
    formula: 'U = mgh',
    variables: ['U', 'm', 'g', 'h'],
    units: { U: 'J', m: 'kg', g: 'm/s²', h: 'h' },
    labels: {
      U: 'Potential energy',
      m: 'Mass',
      g: 'Gravitational acceleration',
      h: 'Height',
    },
  },
  14: {
    formula: 'W = Fscos𝛳',
    variables: ['W', 'F', 's', 'theta'],
    units: { W: 'J', F: 'N', s: 'm', theta: '°' },
    labels: {
      W: 'Work',
      F: 'Force',
      s: 'Displacement',
      theta: 'Angle with the X-axis',
    },
  },
  15: {
    formula: 'P = W/t',
    variables: ['P', 'W', 't'],
    units: { P: 'w', W: 'J', t: 's' },
    labels: {
      P: 'Power',
      W: 'Work',
      t: 'Time',
    },
  },
  16: {
    formula: 'V = IR',
    variables: ['V', 'I', 'R'],
    units: { V: 'V', I: 'A', R: 'Ω' },
    labels: {
      V: 'Voltage',
      I: 'Current',
      R: 'Resistance',
    },
  },
  17: {
    formula: 'R = ρL/A',
    variables: ['R', 'rho', 'L', 'A'],
    units: { R: 'Ω', rho: 'Ωm', L: 'm', A: 'm²' },
    labels: {
      R: 'Resistance',
      rho: 'Resistivity',
      L: 'Length',
      A: 'Area',
    },
  },
  18: {
    formula: 'v = ωr',
    variables: ['v', 'omega', 'r'],
    units: { v: 'm/s', omega: 'rad/s', r: 'm' },
    labels: {
      v: 'Linier Valucity',
      ω: 'Angular velocity',
      r: 'Radius',
    },
  },
  19: {
    formula: 'Fc = mv²/r',
    variables: ['Fc', 'm', 'v', 'r'],
    units: { Fc: 'N', m: 'kg', v: 'm/s', r: 'm' },
    labels: {
      Fc: 'Centripetal force',
      m: 'Mass',
      v: 'Valucity',
      r: 'Radius',
    },
  },
  20: {
    formula: 'a = v²/r',
    variables: ['a', 'v', 'r'],
    units: { a: 'm/s²', v: 'm/s', r: 'm' },
    labels: {
      a: 'Acceleration',
      v: 'Valucity',
      r: 'Radius',
    },
  },
  21: {
    formula: 'E = 1/2Iω²',
    variables: ['E', 'I', 'omega'],
    units: { E: 'J', I: 'kgm²', r: 'rad/s' },
    labels: {
      E: 'Energy',
      I: 'Moment of inertia',
      r: ' Angular velocity',
    },
  },
};

function selectEquation(eqNum) {
  currentEquation = eqNum;
  selectedVariable = null;

  // Update equation button styles
  document.querySelectorAll('.equation-btn').forEach(btn => {
    btn.classList.remove('border-purple-500', 'bg-purple-50');
    btn.classList.add('border-blue-200');
  });
  document.getElementById(`eq-${eqNum}`).classList.remove('border-blue-200');
  document
    .getElementById(`eq-${eqNum}`)
    .classList.add('border-purple-500', 'bg-purple-50');

  // Show calculator
  document.getElementById('calculator').classList.remove('hidden');

  // Update current formula
  document.getElementById('current-formula').textContent =
    equations[eqNum].formula;

  // Create variable buttons
  const variableButtons = document.getElementById('variable-buttons');
  variableButtons.innerHTML = '';
  equations[eqNum].variables.forEach(variable => {
    const button = document.createElement('button');
    button.onclick = () => selectVariable(variable);
    button.id = `btn-${variable}`;
    button.className =
      'variable-btn px-3 sm:px-6 py-1 sm:py-3 bg-blue-100 hover:bg-blue-200 rounded-lg font-bold text-blue-700 transition-colors border-2 border-blue-200';
    button.textContent = variable;
    variableButtons.appendChild(button);
  });

  // Create input fields
  const inputFields = document.getElementById('input-fields');
  inputFields.innerHTML = '';
  equations[eqNum].variables.forEach(variable => {
    const div = document.createElement('div');
    div.className =
      'flex justify-center sm:justify-start items-center space-x-3';
    div.innerHTML = `
                    <label class="sm:w-[70px] text-lg font-semibold text-gray-700 text-right">${variable} =</label>
                    <input type="number" id="input-${variable}" class="sm:flex-1 px-4 w-[150px] py-1 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" placeholder="Enter value" disabled step="any">
                    <span class="text-sm text-gray-500 w-12">${equations[eqNum].units[variable]}</span>
                    <span class="text-xs text-gray-400 hidden sm:flex w-24 text-left">${equations[eqNum].labels[variable]}</span>
                `;
    inputFields.appendChild(div);
  });

  // Reset states
  document.getElementById('calc-btn').disabled = true;
  document.getElementById('result').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
}

function selectVariable(variable) {
  selectedVariable = variable;

  // Update button styles
  document.querySelectorAll('.variable-btn').forEach(btn => {
    btn.classList.remove('bg-red-500', 'text-white', 'border-red-500');
    btn.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-200');
  });
  document
    .getElementById(`btn-${variable}`)
    .classList.remove('bg-blue-100', 'text-blue-700', 'border-blue-200');
  document
    .getElementById(`btn-${variable}`)
    .classList.add('bg-red-500', 'text-white', 'border-red-500');

  // Update input fields
  equations[currentEquation].variables.forEach(v => {
    const input = document.getElementById(`input-${v}`);
    if (v === variable) {
      input.disabled = true;
      input.value = '';
      input.classList.add('bg-red-50', 'cursor-not-allowed', 'border-red-300');
      input.placeholder = 'To be calculated';
    } else {
      input.disabled = false;
      input.classList.remove(
        'bg-red-50',
        'cursor-not-allowed',
        'border-red-300'
      );
      input.placeholder = 'Enter value';
    }
  });

  // Enable calculate button
  document.getElementById('calc-btn').disabled = false;

  // Hide previous results
  document.getElementById('result').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
}

function calculate() {
  if (!selectedVariable || !currentEquation) {
    showError('Please select an equation and variable to find.');
    return;
  }

  const values = {};
  const eq = equations[currentEquation];

  // Get input values
  eq.variables.forEach(v => {
    if (v !== selectedVariable) {
      const value = parseFloat(document.getElementById(`input-${v}`).value);
      values[v] = value;
    }
  });

  let result;
  let steps;

  try {
    switch (currentEquation) {
      case 1: // v = u + at
        result = calculateEquation1(values, selectedVariable);
        break;
      case 2: // s = ut + (1/2)at²
        result = calculateEquation2(values, selectedVariable);
        break;
      case 3: // v² = u² + 2as
        result = calculateEquation3(values, selectedVariable);
        break;
      case 4: // s= {(u+v)/2}t
        result = calculateEquation4(values, selectedVariable);
        break;
      case 5: // v = u + gt
        result = calculateEquation5(values, selectedVariable);
        break;
      case 6: // h = ut + ½gt²
        result = calculateEquation6(values, selectedVariable);
        break;
      case 7: // h = ut + ½gt²
        result = calculateEquation7(values, selectedVariable);
        break;
      case 8: // F = ma
        result = calculateForceEquation(values, selectedVariable);
        break;
      case 9: // W = mg
        result = calculateWeightEquation(values, selectedVariable);
        break;
      case 10: // P = mv
        result = calculateMomentumEquation(values, selectedVariable);
        break;
      case 11: // K = p²/m
        result = calculateKineticEnergyFromMomentum(values, selectedVariable);
        break;
      case 12: // K = ½mv²
        result = calculateKineticEnergy(values, selectedVariable);
        break;
      case 13: // U = mgh
        result = calculatePotentialEnergy(values, selectedVariable);
        break;
      case 14: // U = mgh
        result = calculateWorkDone(values, selectedVariable);
        break;
      case 15: // U = mgh
        result = calculatePower(values, selectedVariable);
        break;
      case 16: // U = mgh
        result = calculateOhmsLaw(values, selectedVariable);
        break;
      case 17: // U = mgh
        result = calculateResistivity(values, selectedVariable);
        break;
      case 18: // U = mgh
        result = calculateLinearVelocity(values, selectedVariable);
        break;
      case 19: // U = mgh
        result = calculateCentripetalForce(values, selectedVariable);
        break;
      case 20: // U = mgh
        result = calculateCentripetalAcceleration(values, selectedVariable);
        break;
      case 21: // U = mgh
        result = calculateRotationalEnergy(values, selectedVariable);
        break;
    }

    // Display result
    const unit = eq.units[selectedVariable];
    const resultText = `${selectedVariable} = ${result.value} ${unit}`;

    document.getElementById(`input-${selectedVariable}`).value = result.value;
    showResult(resultText, result.steps);
  } catch (error) {
    showError(error.message);
  }
}

//formula caleculate function
function calculateEquation1(values, target) {
  const { v, u, a, t } = values;

  switch (target) {
    case 'v':
      if (isNaN(u) || isNaN(a) || isNaN(t))
        throw new Error('Please enter valid values for u, a, and t.');
      const result_v = u + a * t;
      return {
        value: result_v.toFixed(3),
        steps: `v = ${u} + (${a} × ${t}) = ${result_v.toFixed(3)}`,
      };
    case 'u':
      if (isNaN(v) || isNaN(a) || isNaN(t))
        throw new Error('Please enter valid values for v, a, and t.');
      const result_u = v - a * t;
      return {
        value: result_u.toFixed(3),
        steps: `u = ${v} - (${a} × ${t}) = ${result_u.toFixed(3)}`,
      };
    case 'a':
      if (isNaN(v) || isNaN(u) || isNaN(t))
        throw new Error('Please enter valid values for v, u, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_a = (v - u) / t;
      return {
        value: result_a.toFixed(3),
        steps: `a = (${v} - ${u}) ÷ ${t} = ${result_a.toFixed(3)}`,
      };
    case 't':
      if (isNaN(v) || isNaN(u) || isNaN(a))
        throw new Error('Please enter valid values for v, u, and a.');
      if (a === 0) throw new Error('Acceleration cannot be zero.');
      const result_t = (v - u) / a;
      return {
        value: result_t.toFixed(3),
        steps: `t = (${v} - ${u}) ÷ ${a} = ${result_t.toFixed(3)}`,
      };
  }
}

function calculateEquation2(values, target) {
  const { s, u, a, t } = values;

  switch (target) {
    case 's':
      if (isNaN(u) || isNaN(a) || isNaN(t))
        throw new Error('Please enter valid values for u, a, and t.');
      const result_s = u * t + 0.5 * a * t * t;
      return {
        value: result_s.toFixed(3),
        steps: `s = (${u} × ${t}) + (½ × ${a} × ${t}²) = ${(u * t).toFixed(
          3
        )} + ${(0.5 * a * t * t).toFixed(3)} = ${result_s.toFixed(3)}`,
      };
    case 'u':
      if (isNaN(s) || isNaN(a) || isNaN(t))
        throw new Error('Please enter valid values for s, a, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_u = (s - 0.5 * a * t * t) / t;
      return {
        value: result_u.toFixed(3),
        steps: `u = (${s} - ½ × ${a} × ${t}²) ÷ ${t} = ${result_u.toFixed(3)}`,
      };
    case 'a':
      if (isNaN(s) || isNaN(u) || isNaN(t))
        throw new Error('Please enter valid values for s, u, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_a = (2 * (s - u * t)) / (t * t);
      return {
        value: result_a.toFixed(3),
        steps: `a = 2 × (${s} - ${u} × ${t}) ÷ ${t}² = ${result_a.toFixed(3)}`,
      };
    case 't':
      if (isNaN(s) || isNaN(u) || isNaN(a))
        throw new Error('Please enter valid values for s, u, and a.');
      // Quadratic equation: (1/2)at² + ut - s = 0
      const A = 0.5 * a;
      const B = u;
      const C = -s;
      const discriminant = B * B - 4 * A * C;
      if (discriminant < 0) throw new Error('No real solution exists.');
      const result_t = (-B + Math.sqrt(discriminant)) / (2 * A);
      if (result_t < 0) {
        const result_t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        if (result_t2 >= 0) {
          return {
            value: result_t2.toFixed(3),
            steps: `Using quadratic formula: t = ${result_t2.toFixed(3)}`,
          };
        }
        throw new Error('No positive solution for time.');
      }
      return {
        value: result_t.toFixed(3),
        steps: `Using quadratic formula: t = ${result_t.toFixed(3)}`,
      };
  }
}

function calculateEquation3(values, target) {
  const { v, u, a, s } = values;

  switch (target) {
    case 'v':
      if (isNaN(u) || isNaN(a) || isNaN(s))
        throw new Error('Please enter valid values for u, a, and s.');
      const v_squared = u * u + 2 * a * s;
      if (v_squared < 0)
        throw new Error('Cannot take square root of negative number.');
      const result_v = Math.sqrt(v_squared);
      return {
        value: result_v.toFixed(3),
        steps: `v² = ${u}² + 2 × ${a} × ${s} = ${u * u} + ${
          2 * a * s
        } = ${v_squared}, so v = ${result_v.toFixed(3)}`,
      };
    case 'u':
      if (isNaN(v) || isNaN(a) || isNaN(s))
        throw new Error('Please enter valid values for v, a, and s.');
      const u_squared = v * v - 2 * a * s;
      if (u_squared < 0)
        throw new Error('Cannot take square root of negative number.');
      const result_u = Math.sqrt(u_squared);
      return {
        value: result_u.toFixed(3),
        steps: `u² = ${v}² - 2 × ${a} × ${s} = ${v * v} - ${
          2 * a * s
        } = ${u_squared}, so u = ${result_u.toFixed(3)}`,
      };
    case 'a':
      if (isNaN(v) || isNaN(u) || isNaN(s))
        throw new Error('Please enter valid values for v, u, and s.');
      if (s === 0) throw new Error('Displacement cannot be zero.');
      const result_a = (v * v - u * u) / (2 * s);
      return {
        value: result_a.toFixed(3),
        steps: `a = (${v}² - ${u}²) ÷ (2 × ${s}) = (${v * v} - ${u * u}) ÷ ${
          2 * s
        } = ${result_a.toFixed(3)}`,
      };
    case 's':
      if (isNaN(v) || isNaN(u) || isNaN(a))
        throw new Error('Please enter valid values for v, u, and a.');
      if (a === 0) throw new Error('Acceleration cannot be zero.');
      const result_s = (v * v - u * u) / (2 * a);
      return {
        value: result_s.toFixed(3),
        steps: `s = (${v}² - ${u}²) ÷ (2 × ${a}) = (${v * v} - ${u * u}) ÷ ${
          2 * a
        } = ${result_s.toFixed(3)}`,
      };
  }
}

function calculateEquation4(values, target) {
  const { s, u, v, t } = values;

  switch (target) {
    case 's':
      if (isNaN(u) || isNaN(v) || isNaN(t))
        throw new Error('Please enter valid values for u, v, and t.');
      const result_s = ((u + v) / 2) * t;
      return {
        value: result_s.toFixed(3),
        steps: `s = ((u + v) / 2) × t = ((${u} + ${v}) / 2) × ${t} = ${(
          (u + v) /
          2
        ).toFixed(3)} × ${t} = ${result_s.toFixed(3)}`,
      };

    case 'u':
      if (isNaN(s) || isNaN(v) || isNaN(t) || t === 0)
        throw new Error('Please enter valid values for s, v, and t.');
      const result_u = (2 * s) / t - v;
      return {
        value: result_u.toFixed(3),
        steps: `u = (2 × s ÷ t) - v = (2 × ${s} ÷ ${t}) - ${v} = ${(
          (2 * s) /
          t
        ).toFixed(3)} - ${v} = ${result_u.toFixed(3)}`,
      };

    case 'v':
      if (isNaN(s) || isNaN(u) || isNaN(t) || t === 0)
        throw new Error('Please enter valid values for s, u, and t.');
      const result_v = (2 * s) / t - u;
      return {
        value: result_v.toFixed(3),
        steps: `v = (2 × s ÷ t) - u = (2 × ${s} ÷ ${t}) - ${u} = ${(
          (2 * s) /
          t
        ).toFixed(3)} - ${u} = ${result_v.toFixed(3)}`,
      };

    case 't':
      if (isNaN(s) || isNaN(u) || isNaN(v) || u + v === 0)
        throw new Error('Please enter valid values for s, u, and v.');
      const result_t = (2 * s) / (u + v);
      return {
        value: result_t.toFixed(3),
        steps: `t = (2 × s) ÷ (u + v) = (2 × ${s}) ÷ (${u} + ${v}) = ${
          2 * s
        } ÷ ${u + v} = ${result_t.toFixed(3)}`,
      };
  }
}

function calculateEquation5(values, target) {
  const { v, u, g, t } = values;

  switch (target) {
    case 'v':
      if (isNaN(u) || isNaN(g) || isNaN(t))
        throw new Error('Please enter valid values for u, g, and t.');
      const result_v = u + g * t;
      return {
        value: result_v.toFixed(3),
        steps: `v = ${u} + (${g} × ${t}) = ${result_v.toFixed(3)}`,
      };
    case 'u':
      if (isNaN(v) || isNaN(g) || isNaN(t))
        throw new Error('Please enter valid values for v, g, and t.');
      const result_u = v - g * t;
      return {
        value: result_u.toFixed(3),
        steps: `u = ${v} - (${g} × ${t}) = ${result_u.toFixed(3)}`,
      };
    case 'g':
      if (isNaN(v) || isNaN(u) || isNaN(t))
        throw new Error('Please enter valid values for v, u, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_g = (v - u) / t;
      return {
        value: result_g.toFixed(3),
        steps: `g = (${v} - ${u}) ÷ ${t} = ${result_g.toFixed(3)}`,
      };
    case 't':
      if (isNaN(v) || isNaN(u) || isNaN(g))
        throw new Error('Please enter valid values for v, u, and g.');
      if (g === 0) throw new Error('Acceleration cannot be zero.');
      const result_t = (v - u) / g;
      return {
        value: result_t.toFixed(3),
        steps: `t = (${v} - ${u}) ÷ ${g} = ${result_t.toFixed(3)}`,
      };
  }
}

function calculateEquation6(values, target) {
  const { h, u, g, t } = values;

  switch (target) {
    case 'h':
      if (isNaN(u) || isNaN(g) || isNaN(t))
        throw new Error('Please enter valid values for u, g, and t.');
      const result_h = u * t + 0.5 * g * t * t;
      return {
        value: result_h.toFixed(3),
        steps: `h = (${u} × ${t}) + (½ × ${g} × ${t}²) = ${(u * t).toFixed(
          3
        )} + ${(0.5 * g * t * t).toFixed(3)} = ${result_h.toFixed(3)}`,
      };
    case 'u':
      if (isNaN(h) || isNaN(g) || isNaN(t))
        throw new Error('Please enter valid values for h, g, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_u = (h - 0.5 * g * t * t) / t;
      return {
        value: result_u.toFixed(3),
        steps: `u = (${h} - ½ × ${g} × ${t}²) ÷ ${t} = ${result_u.toFixed(3)}`,
      };
    case 'g':
      if (isNaN(h) || isNaN(u) || isNaN(t))
        throw new Error('Please enter valid values for h, u, and t.');
      if (t === 0) throw new Error('Time cannot be zero.');
      const result_g = (2 * (h - u * t)) / (t * t);
      return {
        value: result_g.toFixed(3),
        steps: `g = 2 × (${h} - ${u} × ${t}) ÷ ${t}² = ${result_g.toFixed(3)}`,
      };
    case 't':
      if (isNaN(h) || isNaN(u) || isNaN(g))
        throw new Error('Please enter valid values for h, u, and g.');
      // Quadratic equation: (1/2)gt² + ut - h = 0
      const A = 0.5 * g;
      const B = u;
      const C = -h;
      const discriminant = B * B - 4 * A * C;
      if (discriminant < 0) throw new Error('No real solution exists.');
      const result_t = (-B + Math.sqrt(discriminant)) / (2 * A);
      if (result_t < 0) {
        const result_t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        if (result_t2 >= 0) {
          return {
            value: result_t2.toFixed(3),
            steps: `Using quadratic formula: t = ${result_t2.toFixed(3)}`,
          };
        }
        throw new Error('No positive solution for time.');
      }
      return {
        value: result_t.toFixed(3),
        steps: `Using quadratic formula: t = ${result_t.toFixed(3)}`,
      };
  }
}

function calculateEquation7(values, target) {
  const { v, u, g, h } = values;

  switch (target) {
    case 'v':
      if (isNaN(u) || isNaN(g) || isNaN(h))
        throw new Error('Please enter valid values for u, g, and h.');
      const v_squared = u * u + 2 * g * h;
      if (v_squared < 0)
        throw new Error('Cannot take square root of negative number.');
      const result_v = Math.sqrt(v_squared);
      return {
        value: result_v.toFixed(3),
        steps: `v² = ${u}² + 2 × ${g} × ${h} = ${u * u} + ${
          2 * g * h
        } = ${v_squared}, so v = ${result_v.toFixed(3)}`,
      };

    case 'u':
      if (isNaN(v) || isNaN(g) || isNaN(h))
        throw new Error('Please enter valid values for v, g, and h.');
      const u_squared = v * v - 2 * g * h;
      if (u_squared < 0)
        throw new Error('Cannot take square root of negative number.');
      const result_u = Math.sqrt(u_squared);
      return {
        value: result_u.toFixed(3),
        steps: `u² = ${v}² - 2 × ${g} × ${h} = ${v * v} - ${
          2 * g * h
        } = ${u_squared}, so u = ${result_u.toFixed(3)}`,
      };

    case 'g':
      if (isNaN(v) || isNaN(u) || isNaN(h))
        throw new Error('Please enter valid values for v, u, and h.');
      if (h === 0) throw new Error('Height cannot be zero.');
      const result_g = (v * v - u * u) / (2 * h);
      return {
        value: result_g.toFixed(3),
        steps: `g = (${v}² - ${u}²) ÷ (2 × ${h}) = (${v * v} - ${u * u}) ÷ ${
          2 * h
        } = ${result_g.toFixed(3)}`,
      };

    case 'h':
      if (isNaN(v) || isNaN(u) || isNaN(g))
        throw new Error('Please enter valid values for v, u, and g.');
      if (g === 0) throw new Error('Gravity cannot be zero.');
      const result_h = (v * v - u * u) / (2 * g);
      return {
        value: result_h.toFixed(3),
        steps: `h = (${v}² - ${u}²) ÷ (2 × ${g}) = (${v * v} - ${u * u}) ÷ ${
          2 * g
        } = ${result_h.toFixed(3)}`,
      };

    default:
      throw new Error('Invalid target variable.');
  }
}

function calculateForceEquation(values, target) {
  const { F, m, a } = values;

  switch (target) {
    case 'F':
      if (isNaN(m) || isNaN(a))
        throw new Error(
          'Please enter valid values for mass (m) and acceleration (a).'
        );
      const result_F = m * a;
      return {
        value: result_F.toFixed(3),
        steps: `F = ${m} × ${a} = ${result_F.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(F) || isNaN(a))
        throw new Error(
          'Please enter valid values for force (F) and acceleration (a).'
        );
      if (a === 0) throw new Error('Acceleration cannot be zero.');
      const result_m = F / a;
      return {
        value: result_m.toFixed(3),
        steps: `m = ${F} ÷ ${a} = ${result_m.toFixed(3)}`,
      };

    case 'a':
      if (isNaN(F) || isNaN(m))
        throw new Error(
          'Please enter valid values for force (F) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_a = F / m;
      return {
        value: result_a.toFixed(3),
        steps: `a = ${F} ÷ ${m} = ${result_a.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'F', 'm', or 'a'.");
  }
}

function calculateWeightEquation(values, target) {
  const { w, m, g } = values;

  switch (target) {
    case 'w':
      if (isNaN(m) || isNaN(g))
        throw new Error(
          'Please enter valid values for mass (m) and gravity (g).'
        );
      const result_w = m * g;
      return {
        value: result_w.toFixed(3),
        steps: `w = ${m} × ${g} = ${result_w.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(w) || isNaN(g))
        throw new Error(
          'Please enter valid values for weight (w) and gravity (g).'
        );
      if (g === 0) throw new Error('Gravity cannot be zero.');
      const result_m = w / g;
      return {
        value: result_m.toFixed(3),
        steps: `m = ${w} ÷ ${g} = ${result_m.toFixed(3)}`,
      };

    case 'g':
      if (isNaN(w) || isNaN(m))
        throw new Error(
          'Please enter valid values for weight (w) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_g = w / m;
      return {
        value: result_g.toFixed(3),
        steps: `g = ${w} ÷ ${m} = ${result_g.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'w', 'm', or 'g'.");
  }
}

function calculateMomentumEquation(values, target) {
  const { p, m, v } = values;

  switch (target) {
    case 'p':
      if (isNaN(m) || isNaN(v))
        throw new Error(
          'Please enter valid values for mass (m) and velocity (v).'
        );
      const result_p = m * v;
      return {
        value: result_p.toFixed(3),
        steps: `p = ${m} × ${v} = ${result_p.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(p) || isNaN(v))
        throw new Error(
          'Please enter valid values for momentum (p) and velocity (v).'
        );
      if (v === 0) throw new Error('Velocity cannot be zero.');
      const result_m = p / v;
      return {
        value: result_m.toFixed(3),
        steps: `m = ${p} ÷ ${v} = ${result_m.toFixed(3)}`,
      };

    case 'v':
      if (isNaN(p) || isNaN(m))
        throw new Error(
          'Please enter valid values for momentum (p) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_v = p / m;
      return {
        value: result_v.toFixed(3),
        steps: `v = ${p} ÷ ${m} = ${result_v.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'p', 'm', or 'v'.");
  }
}

function calculateKineticEnergyFromMomentum(values, target) {
  const { K, p, m } = values;

  switch (target) {
    case 'K':
      if (isNaN(p) || isNaN(m))
        throw new Error(
          'Please enter valid values for momentum (p) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_K = (p * p) / m;
      return {
        value: result_K.toFixed(3),
        steps: `K = (${p}²) ÷ ${m} = ${p * p} ÷ ${m} = ${result_K.toFixed(3)}`,
      };

    case 'p':
      if (isNaN(K) || isNaN(m))
        throw new Error(
          'Please enter valid values for kinetic energy (K) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_p = Math.sqrt(K * m);
      return {
        value: result_p.toFixed(3),
        steps: `p = √(${K} × ${m}) = √${K * m} = ${result_p.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(K) || isNaN(p))
        throw new Error(
          'Please enter valid values for kinetic energy (K) and momentum (p).'
        );
      if (K === 0) throw new Error('Kinetic energy cannot be zero.');
      const result_m = (p * p) / K;
      return {
        value: result_m.toFixed(3),
        steps: `m = (${p}²) ÷ ${K} = ${p * p} ÷ ${K} = ${result_m.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'K', 'p', or 'm'.");
  }
}

function calculateKineticEnergy(values, target) {
  const { K, m, v } = values;

  switch (target) {
    case 'K':
      if (isNaN(m) || isNaN(v))
        throw new Error(
          'Please enter valid values for mass (m) and velocity (v).'
        );
      const result_K = 0.5 * m * v * v;
      return {
        value: result_K.toFixed(3),
        steps: `K = ½ × ${m} × ${v}² = 0.5 × ${m} × ${
          v ** 2
        } = ${result_K.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(K) || isNaN(v))
        throw new Error(
          'Please enter valid values for kinetic energy (K) and velocity (v).'
        );
      if (v === 0) throw new Error('Velocity cannot be zero.');
      const result_m = (2 * K) / (v * v);
      return {
        value: result_m.toFixed(3),
        steps: `m = (2 × ${K}) ÷ ${v}² = ${(2 * K).toFixed(3)} ÷ ${(
          v ** 2
        ).toFixed(3)} = ${result_m.toFixed(3)}`,
      };

    case 'v':
      if (isNaN(K) || isNaN(m))
        throw new Error(
          'Please enter valid values for kinetic energy (K) and mass (m).'
        );
      if (m === 0) throw new Error('Mass cannot be zero.');
      const result_v = Math.sqrt((2 * K) / m);
      return {
        value: result_v.toFixed(3),
        steps: `v = √[(2 × ${K}) ÷ ${m}] = √${((2 * K) / m).toFixed(
          3
        )} = ${result_v.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'K', 'm', or 'v'.");
  }
}

function calculatePotentialEnergy(values, target) {
  const { U, m, g, h } = values;

  switch (target) {
    case 'U':
      if (isNaN(m) || isNaN(g) || isNaN(h))
        throw new Error(
          'Please enter valid values for mass (m), gravity (g), and height (h).'
        );
      const result_U = m * g * h;
      return {
        value: result_U.toFixed(3),
        steps: `U = ${m} × ${g} × ${h} = ${result_U.toFixed(3)}`,
      };

    case 'm':
      if (isNaN(U) || isNaN(g) || isNaN(h))
        throw new Error(
          'Please enter valid values for potential energy (U), gravity (g), and height (h).'
        );
      if (g * h === 0) throw new Error('Gravity × height cannot be zero.');
      const result_m = U / (g * h);
      return {
        value: result_m.toFixed(3),
        steps: `m = ${U} ÷ (${g} × ${h}) = ${U} ÷ ${(g * h).toFixed(
          3
        )} = ${result_m.toFixed(3)}`,
      };

    case 'g':
      if (isNaN(U) || isNaN(m) || isNaN(h))
        throw new Error('Please enter valid values for U, m, and h.');
      if (m * h === 0) throw new Error('Mass × height cannot be zero.');
      const result_g = U / (m * h);
      return {
        value: result_g.toFixed(3),
        steps: `g = ${U} ÷ (${m} × ${h}) = ${U} ÷ ${(m * h).toFixed(
          3
        )} = ${result_g.toFixed(3)}`,
      };

    case 'h':
      if (isNaN(U) || isNaN(m) || isNaN(g))
        throw new Error('Please enter valid values for U, m, and g.');
      if (m * g === 0) throw new Error('Mass × gravity cannot be zero.');
      const result_h = U / (m * g);
      return {
        value: result_h.toFixed(3),
        steps: `h = ${U} ÷ (${m} × ${g}) = ${U} ÷ ${(m * g).toFixed(
          3
        )} = ${result_h.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'U', 'm', 'g', or 'h'.");
  }
}

function calculateWorkDone(values, target) {
  const { W, F, s, theta } = values;

  // Convert theta from degrees to radians
  const rad = deg => (deg * Math.PI) / 180;

  switch (target) {
    case 'W':
      if (isNaN(F) || isNaN(s) || isNaN(theta))
        throw new Error('Please enter valid values for F, s, and θ.');
      const result_W = F * s * Math.cos(rad(theta));
      return {
        value: result_W.toFixed(3),
        steps: `W = ${F} × ${s} × cos(${theta}°) = ${F} × ${s} × ${Math.cos(
          rad(theta)
        ).toFixed(3)} = ${result_W.toFixed(3)}`,
      };

    case 'F':
      if (isNaN(W) || isNaN(s) || isNaN(theta))
        throw new Error('Please enter valid values for W, s, and θ.');
      const cosThetaF = Math.cos(rad(theta));
      if (s * cosThetaF === 0)
        throw new Error('Denominator cannot be zero (s × cos(θ)).');
      const result_F = W / (s * cosThetaF);
      return {
        value: result_F.toFixed(3),
        steps: `F = ${W} ÷ (${s} × cos(${theta}°)) = ${W} ÷ (${(
          s * cosThetaF
        ).toFixed(3)}) = ${result_F.toFixed(3)}`,
      };

    case 's':
      if (isNaN(W) || isNaN(F) || isNaN(theta))
        throw new Error('Please enter valid values for W, F, and θ.');
      const cosThetaS = Math.cos(rad(theta));
      if (F * cosThetaS === 0)
        throw new Error('Denominator cannot be zero (F × cos(θ)).');
      const result_s = W / (F * cosThetaS);
      return {
        value: result_s.toFixed(3),
        steps: `s = ${W} ÷ (${F} × cos(${theta}°)) = ${W} ÷ (${(
          F * cosThetaS
        ).toFixed(3)}) = ${result_s.toFixed(3)}`,
      };

    case 'theta':
      if (isNaN(W) || isNaN(F) || isNaN(s))
        throw new Error('Please enter valid values for W, F, and s.');
      const cosTheta = W / (F * s);
      if (cosTheta < -1 || cosTheta > 1)
        throw new Error('Invalid value: cos(θ) must be between -1 and 1.');
      const thetaRad = Math.acos(cosTheta);
      const result_theta = (thetaRad * 180) / Math.PI;
      return {
        value: result_theta.toFixed(3),
        steps: `cos(θ) = ${W} ÷ (${F} × ${s}) = ${cosTheta.toFixed(
          3
        )} ⇒ θ = cos⁻¹(${cosTheta.toFixed(3)}) = ${result_theta.toFixed(3)}°`,
      };

    default:
      throw new Error(
        "Invalid target variable. Choose 'W', 'F', 's', or 'theta'."
      );
  }
}

function calculatePower(values, target) {
  const { P, W, t } = values;

  switch (target) {
    case 'P':
      if (isNaN(W) || isNaN(t))
        throw new Error('Please enter valid values for W and t.');
      if (t === 0) throw new Error('Time (t) cannot be zero.');
      const result_P = W / t;
      return {
        value: result_P.toFixed(3),
        steps: `P = ${W} ÷ ${t} = ${result_P.toFixed(3)}`,
      };

    case 'W':
      if (isNaN(P) || isNaN(t))
        throw new Error('Please enter valid values for P and t.');
      const result_W = P * t;
      return {
        value: result_W.toFixed(3),
        steps: `W = ${P} × ${t} = ${result_W.toFixed(3)}`,
      };

    case 't':
      if (isNaN(W) || isNaN(P))
        throw new Error('Please enter valid values for W and P.');
      if (P === 0) throw new Error('Power (P) cannot be zero.');
      const result_t = W / P;
      return {
        value: result_t.toFixed(3),
        steps: `t = ${W} ÷ ${P} = ${result_t.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'P', 'W', or 't'.");
  }
}

function calculateOhmsLaw(values, target) {
  const { V, I, R } = values;

  switch (target) {
    case 'V':
      if (isNaN(I) || isNaN(R))
        throw new Error('Please enter valid values for I and R.');
      const result_V = I * R;
      return {
        value: result_V.toFixed(3),
        steps: `V = ${I} × ${R} = ${result_V.toFixed(3)}`,
      };

    case 'I':
      if (isNaN(V) || isNaN(R))
        throw new Error('Please enter valid values for V and R.');
      if (R === 0) throw new Error('Resistance (R) cannot be zero.');
      const result_I = V / R;
      return {
        value: result_I.toFixed(3),
        steps: `I = ${V} ÷ ${R} = ${result_I.toFixed(3)}`,
      };

    case 'R':
      if (isNaN(V) || isNaN(I))
        throw new Error('Please enter valid values for V and I.');
      if (I === 0) throw new Error('Current (I) cannot be zero.');
      const result_R = V / I;
      return {
        value: result_R.toFixed(3),
        steps: `R = ${V} ÷ ${I} = ${result_R.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'V', 'I', or 'R'.");
  }
}

function calculateResistivity(values, target) {
  const { R, rho, L, A } = values;

  switch (target) {
    case 'R':
      if (isNaN(rho) || isNaN(L) || isNaN(A))
        throw new Error('Please enter valid values for ρ, L, and A.');
      if (A === 0) throw new Error('Area (A) cannot be zero.');
      const result_R = (rho * L) / A;
      return {
        value: result_R.toFixed(3),
        steps: `R = (ρ × L) ÷ A = (${rho} × ${L}) ÷ ${A} = ${result_R.toFixed(
          3
        )}`,
      };

    case 'rho':
      if (isNaN(R) || isNaN(L) || isNaN(A))
        throw new Error('Please enter valid values for R, L, and A.');
      if (L === 0) throw new Error('Length (L) cannot be zero.');
      const result_rho = (R * A) / L;
      return {
        value: result_rho.toFixed(3),
        steps: `ρ = (R × A) ÷ L = (${R} × ${A}) ÷ ${L} = ${result_rho.toFixed(
          3
        )}`,
      };

    case 'L':
      if (isNaN(R) || isNaN(rho) || isNaN(A))
        throw new Error('Please enter valid values for R, ρ, and A.');
      if (rho === 0) throw new Error('Resistivity (ρ) cannot be zero.');
      const result_L = (R * A) / rho;
      return {
        value: result_L.toFixed(3),
        steps: `L = (R × A) ÷ ρ = (${R} × ${A}) ÷ ${rho} = ${result_L.toFixed(
          3
        )}`,
      };

    case 'A':
      if (isNaN(rho) || isNaN(L) || isNaN(R))
        throw new Error('Please enter valid values for ρ, L, and R.');
      if (R === 0) throw new Error('Resistance (R) cannot be zero.');
      const result_A = (rho * L) / R;
      return {
        value: result_A.toFixed(3),
        steps: `A = (ρ × L) ÷ R = (${rho} × ${L}) ÷ ${R} = ${result_A.toFixed(
          3
        )}`,
      };

    default:
      throw new Error(
        "Invalid target variable. Choose 'R', 'rho', 'L', or 'A'."
      );
  }
}

function calculateLinearVelocity(values, target) {
  const { v, omega, r } = values;

  switch (target) {
    case 'v':
      if (isNaN(omega) || isNaN(r))
        throw new Error('Please enter valid values for ω (omega) and r.');
      const result_v = omega * r;
      return {
        value: result_v.toFixed(3),
        steps: `v = ω × r = ${omega} × ${r} = ${result_v.toFixed(3)}`,
      };

    case 'omega':
      if (isNaN(v) || isNaN(r))
        throw new Error('Please enter valid values for v and r.');
      if (r === 0) throw new Error('Radius (r) cannot be zero.');
      const result_omega = v / r;
      return {
        value: result_omega.toFixed(3),
        steps: `ω = v ÷ r = ${v} ÷ ${r} = ${result_omega.toFixed(3)}`,
      };

    case 'r':
      if (isNaN(v) || isNaN(omega))
        throw new Error('Please enter valid values for v and ω.');
      if (omega === 0) throw new Error('Angular velocity (ω) cannot be zero.');
      const result_r = v / omega;
      return {
        value: result_r.toFixed(3),
        steps: `r = v ÷ ω = ${v} ÷ ${omega} = ${result_r.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'v', 'omega', or 'r'.");
  }
}

function calculateCentripetalForce(values, target) {
  const { Fc, m, v, r } = values;

  switch (target) {
    case 'Fc':
      if (isNaN(m) || isNaN(v) || isNaN(r))
        throw new Error('Please enter valid values for m, v, and r.');
      if (r === 0) throw new Error('Radius (r) cannot be zero.');
      const result_Fc = (m * v * v) / r;
      return {
        value: result_Fc.toFixed(3),
        steps: `Fc = (m × v²) ÷ r = (${m} × ${v}²) ÷ ${r} = ${result_Fc.toFixed(
          3
        )}`,
      };

    case 'm':
      if (isNaN(Fc) || isNaN(v) || isNaN(r))
        throw new Error('Please enter valid values for Fc, v, and r.');
      if (v === 0) throw new Error('Velocity (v) cannot be zero.');
      const result_m = (Fc * r) / (v * v);
      return {
        value: result_m.toFixed(3),
        steps: `m = (Fc × r) ÷ v² = (${Fc} × ${r}) ÷ (${v}²) = ${result_m.toFixed(
          3
        )}`,
      };

    case 'v':
      if (isNaN(Fc) || isNaN(m) || isNaN(r))
        throw new Error('Please enter valid values for Fc, m, and r.');
      if (m === 0) throw new Error('Mass (m) cannot be zero.');
      const result_v = Math.sqrt((Fc * r) / m);
      return {
        value: result_v.toFixed(3),
        steps: `v = √(Fc × r ÷ m) = √(${Fc} × ${r} ÷ ${m}) = ${result_v.toFixed(
          3
        )}`,
      };

    case 'r':
      if (isNaN(Fc) || isNaN(m) || isNaN(v))
        throw new Error('Please enter valid values for Fc, m, and v.');
      if (Fc === 0) throw new Error('Force (Fc) cannot be zero.');
      const result_r = (m * v * v) / Fc;
      return {
        value: result_r.toFixed(3),
        steps: `r = (m × v²) ÷ Fc = (${m} × ${v}²) ÷ ${Fc} = ${result_r.toFixed(
          3
        )}`,
      };

    default:
      throw new Error(
        "Invalid target variable. Choose 'Fc', 'm', 'v', or 'r'."
      );
  }
}

function calculateCentripetalAcceleration(values, target) {
  const { a, v, r } = values;

  switch (target) {
    case 'a':
      if (isNaN(v) || isNaN(r))
        throw new Error('Please enter valid values for v and r.');
      if (r === 0) throw new Error('Radius (r) cannot be zero.');
      const result_a = (v * v) / r;
      return {
        value: result_a.toFixed(3),
        steps: `a = v² ÷ r = ${v}² ÷ ${r} = ${result_a.toFixed(3)}`,
      };

    case 'v':
      if (isNaN(a) || isNaN(r))
        throw new Error('Please enter valid values for a and r.');
      const result_v = Math.sqrt(a * r);
      return {
        value: result_v.toFixed(3),
        steps: `v = √(a × r) = √(${a} × ${r}) = ${result_v.toFixed(3)}`,
      };

    case 'r':
      if (isNaN(v) || isNaN(a))
        throw new Error('Please enter valid values for v and a.');
      if (a === 0) throw new Error('Acceleration (a) cannot be zero.');
      const result_r = (v * v) / a;
      return {
        value: result_r.toFixed(3),
        steps: `r = v² ÷ a = ${v}² ÷ ${a} = ${result_r.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'a', 'v', or 'r'.");
  }
}

function calculateRotationalEnergy(values, target) {
  const { E, I, omega } = values;

  switch (target) {
    case 'E':
      if (isNaN(I) || isNaN(omega))
        throw new Error('Please enter valid values for I and ω (omega).');
      const result_E = 0.5 * I * omega * omega;
      return {
        value: result_E.toFixed(3),
        steps: `E = ½ × ${I} × ${omega}² = 0.5 × ${I} × ${
          omega ** 2
        } = ${result_E.toFixed(3)}`,
      };

    case 'I':
      if (isNaN(E) || isNaN(omega))
        throw new Error('Please enter valid values for E and ω (omega).');
      if (omega === 0) throw new Error('ω (omega) cannot be zero.');
      const result_I = (2 * E) / (omega * omega);
      return {
        value: result_I.toFixed(3),
        steps: `I = (2 × ${E}) ÷ ${omega}² = ${2 * E} ÷ ${
          omega ** 2
        } = ${result_I.toFixed(3)}`,
      };

    case 'omega':
      if (isNaN(E) || isNaN(I))
        throw new Error('Please enter valid values for E and I.');
      if (I === 0) throw new Error('Moment of inertia (I) cannot be zero.');
      const result_omega = Math.sqrt((2 * E) / I);
      return {
        value: result_omega.toFixed(3),
        steps: `ω = √((2 × ${E}) ÷ ${I}) = √(${
          2 * E
        } ÷ ${I}) = ${result_omega.toFixed(3)}`,
      };

    default:
      throw new Error("Invalid target variable. Choose 'E', 'I', or 'omega'.");
  }
}

//=======================
// uervsel founctions
// ======================
function showResult(text, steps) {
  document.getElementById('result-text').textContent = text;
  document.getElementById('calculation-steps').textContent = steps;
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('error').classList.add('hidden');
}

function showError(message) {
  document.getElementById('error-text').textContent = message;
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
}

function resetCalculator() {
  currentEquation = null;
  selectedVariable = null;
  document.getElementById('calculator').classList.add('hidden');
  document.querySelectorAll('.equation-btn').forEach(btn => {
    btn.classList.remove('border-purple-500', 'bg-purple-50');
    btn.classList.add('border-blue-200');
  });
}

// Allow Enter key to calculate
document.addEventListener('keypress', function (event) {
  if (event.key === 'Enter' && !document.getElementById('calc-btn').disabled) {
    calculate();
  }
});
