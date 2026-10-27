'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { addition, subtraction, multiplication, division, modulo, power, squareRoot } = require('../calculator');

test('addition handles positive, negative, and fractional operands', () => {
  assert.equal(addition(12, 8), 20);
  assert.equal(addition(-4, 4), 0);
  assert.ok(Math.abs(addition(0.1, 0.2) - 0.3) < Number.EPSILON);
});
test('subtraction supports negative results', () => assert.equal(subtraction(3, 10), -7));
test('multiplication handles signs and zero', () => {
  assert.equal(multiplication(-4, -5), 20);
  assert.equal(multiplication(42, 0), 0);
});
test('division supports fractional results and rejects zero', () => {
  assert.equal(division(7, 2), 3.5);
  assert.throws(() => division(7, 0), /divide by zero/);
  assert.throws(() => division(7, -0), /divide by zero/);
});
test('modulo uses remainder semantics and rejects zero', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
  assert.throws(() => modulo(10, 0), /modulo by zero/);
});
test('power supports zero, fractional, and negative exponents', () => {
  assert.equal(power(2, 10), 1024);
  assert.equal(power(2, 0), 1);
  assert.equal(power(4, 0.5), 2);
  assert.equal(power(2, -2), 0.25);
});
test('square root accepts zero and rejects negative numbers', () => {
  assert.equal(squareRoot(81), 9);
  assert.equal(squareRoot(0), 0);
  assert.throws(() => squareRoot(-1), /negative number/);
});
test('all operations reject strings, NaN, infinity, and missing operands', () => {
  for (const operation of [addition, subtraction, multiplication, division, modulo, power, squareRoot]) {
    for (const value of ['2', undefined, null, NaN, Infinity]) {
      assert.throws(() => operation(value, 2), TypeError);
    }
  }
  assert.throws(() => addition(2), TypeError);
});
test('operations reject overflow and non-real results', () => {
  assert.throws(() => multiplication(1e308, 1e308), RangeError);
  assert.throws(() => power(-1, 0.5), RangeError);
});

function cli(...args) {
  return spawnSync(process.execPath, [path.join(__dirname, '../calculator.js'), ...args], { encoding: 'utf8' });
}
test('CLI prints a result for binary and unary operations', () => {
  for (const [args, result] of [[['addition', '2', '3'], '5'], [['divide', '7', '2'], '3.5'], [['sqrt', '81'], '9']]) {
    const response = cli(...args);
    assert.equal(response.status, 0);
    assert.equal(response.stdout.trim(), result);
    assert.equal(response.stderr, '');
  }
});
test('CLI rejects invalid input and incorrect argument counts', () => {
  for (const args of [[], ['unknown', '2', '3'], ['addition', '2'], ['sqrt', '9', '2'], ['division', '1', '0'], ['add', '', '1'], ['add', 'Infinity', '2'], ['toString'], ['constructor']]) {
    const response = cli(...args);
    assert.equal(response.status, 1);
    assert.equal(response.stdout, '');
    assert.notEqual(response.stderr.trim(), '');
  }
});
test('CLI help succeeds without calculating', () => {
  const response = cli('--help');
  assert.equal(response.status, 0);
  assert.match(response.stdout, /Usage:/);
});
