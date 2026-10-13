#!/usr/bin/env node
'use strict';

// Supports addition, subtraction, multiplication, division, modulo, power,
// and square root. Functions accept finite numbers and return finite results.
function validateNumbers(...values) {
  if (values.some(value => typeof value !== 'number' || !Number.isFinite(value))) {
    throw new TypeError('Operands must be finite numbers');
  }
}

function finiteResult(value) {
  if (!Number.isFinite(value)) throw new RangeError('Result is outside the finite real-number range');
  return value;
}

function addition(a, b) {
  validateNumbers(a, b);
  return finiteResult(a + b);
}

function subtraction(a, b) {
  validateNumbers(a, b);
  return finiteResult(a - b);
}

function multiplication(a, b) {
  validateNumbers(a, b);
  return finiteResult(a * b);
}

function division(a, b) {
  validateNumbers(a, b);
  if (b === 0) throw new RangeError('Cannot divide by zero');
  return finiteResult(a / b);
}

// JavaScript remainder semantics: the result has the dividend's sign.
function modulo(a, b) {
  validateNumbers(a, b);
  if (b === 0) throw new RangeError('Cannot take modulo by zero');
  return a % b;
}

function power(base, exponent) {
  validateNumbers(base, exponent);
  return finiteResult(base ** exponent);
}

function squareRoot(n) {
  validateNumbers(n);
  if (n < 0) throw new RangeError('Cannot take the square root of a negative number');
  return Math.sqrt(n);
}

const operations = { addition, subtraction, multiplication, division, modulo, power, squareRoot };
const aliases = { add: 'addition', subtract: 'subtraction', multiply: 'multiplication', divide: 'division', sqrt: 'squareRoot' };
const usage = `Usage: node src/calculator.js <operation> <number> [number]
Operations: addition, subtraction, multiplication, division, modulo, power, squareRoot
Aliases: add, subtract, multiply, divide, sqrt
Examples:
  node src/calculator.js addition 2 3
  node src/calculator.js sqrt 81`;

function runCli(args) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
    console.log(usage);
    return;
  }
  const [name, ...operands] = args;
  const operation = operations[aliases[name] || name];
  // Object prototypes must not be callable as calculator operations.
  if (!Object.hasOwn(operations, aliases[name] || name)) throw new Error('Unknown operation.\n' + usage);
  if (operands.length !== operation.length) {
    throw new Error(`${name} requires ${operation.length} operand(s).\n${usage}`);
  }
  const numbers = operands.map(value => value.trim() === '' ? NaN : Number(value));
  console.log(operation(...numbers));
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = operations;
