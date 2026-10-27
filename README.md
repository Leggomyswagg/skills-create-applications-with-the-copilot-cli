# Create applications with the Copilot CLI

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey Leggomyswagg!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/Leggomyswagg/skills-create-applications-with-the-copilot-cli/issues/1)

## Calculator

The calculator described in steps 2 and 3 is implemented in `src/calculator.js`.
Use Node.js 22 or newer; no dependencies need to be installed.

```bash
npm start -- addition 2 3
npm start -- division 7 2
npm start -- modulo 10 3
npm start -- power 2 10
npm start -- squareRoot 81
npm test
```

Supported operations are `addition`, `subtraction`, `multiplication`, `division`,
`modulo`, `power`, and `squareRoot`. The aliases `add`, `subtract`, `multiply`,
`divide`, and `sqrt` are also available. Run `npm start -- --help` for usage.
Functions are exported with `module.exports` for use in other Node.js programs.

Operands and results must be finite real numbers. Division/modulo by zero and
square roots of negative numbers return a descriptive error and a nonzero CLI
exit code. Modulo follows JavaScript's remainder semantics; decimal arithmetic
uses JavaScript floating-point precision.

The exercise's interactive Copilot installation, issue-management activities,
review, and merge remain separate from the calculator implementation.

