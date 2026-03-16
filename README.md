# Arithmetic Command Shell (Web Based)

A simple interactive web-based terminal interface that accepts arithmetic commands and performs calculations, similar to a real shell environment.

## Project Overview

This project demonstrates a shell-like interface built with simple web technologies (HTML, CSS, JavaScript) that processes arithmetic commands and displays results in a terminal-style format.

## Features

- **Terminal-style Interface**: Black background with green text, mimicking classic terminals
- **Command History**: Navigate through previous commands using arrow keys (↑/↓)
- **Error Handling**: Comprehensive error messages for invalid commands and inputs
- **Responsive Design**: Works on different screen sizes
- **Real-time Output**: Commands and results appear line by line like a real shell

## Supported Commands

| Command | Description | Example | Output |
|---------|-------------|---------|--------|
| `add` | Add two numbers | `add 5 3` | `ADD 5 3 = 8` |
| `sub` | Subtract second number from first | `sub 10 4` | `SUB 10 4 = 6` |
| `mul` | Multiply two numbers | `mul 6 7` | `MUL 6 7 = 42` |
| `div` | Divide first number by second | `div 20 5` | `DIV 20 5 = 4` |
| `help` | Show available commands | `help` | Displays command list |
| `clear` | Clear terminal output | `clear` | Clears the screen |

## File Structure

```
Arithmetic-Shell/
│
├── index.html          # Main HTML structure
├── style.css           # Terminal theme styling
├── script.js           # Command parsing and logic
└── README.md           # Project documentation
```

## How to Use

1. **Open the Application**: Open `index.html` in a web browser
2. **Enter Commands**: Type commands in the input field and press Enter
3. **View Results**: See command outputs displayed in the terminal area
4. **Navigate History**: Use arrow keys to browse previous commands
5. **Get Help**: Type `help` to see all available commands

## Technical Implementation

### Command Processing
- Commands are parsed using JavaScript string splitting
- Arithmetic operations are performed with built-in JavaScript operators
- Error handling validates input and provides meaningful feedback

### UI Components
- **Terminal Container**: Main shell window with header and body
- **Output Area**: Scrollable region for command history and results
- **Input Line**: Command input with prompt symbol
- **Visual Feedback**: Different colors for success, error, and help messages

### Key Features
- **Auto-focus**: Input field maintains focus for continuous typing
- **Smooth Scrolling**: Auto-scrolls to show latest output
- **Responsive Design**: Adapts to different screen sizes
- **Command History**: Stores and navigates through previous commands

## Error Handling

The shell handles various error conditions:
- Invalid command names
- Incorrect number of arguments
- Non-numeric inputs
- Division by zero
- Empty commands

## Browser Compatibility

This project works with all modern web browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Opera

## Educational Value

This project demonstrates several programming concepts:
- **Command Line Interfaces**: Understanding shell-like interactions
- **String Parsing**: Processing user input and extracting commands
- **Error Handling**: Robust input validation and error reporting
- **DOM Manipulation**: Dynamic content updates and user interaction
- **Event Handling**: Keyboard events and user input processing
- **CSS Styling**: Creating themed interfaces with CSS

## Future Enhancements

Potential improvements for the project:
- Additional arithmetic operations (modulus, power, square root)
- Variable storage and retrieval
- Command aliases
- File I/O operations (using browser storage)
- Multi-line command support
- Tab completion
- Command piping

## Getting Started

1. Clone or download the project files
2. Open `index.html` in your preferred web browser
3. Start typing commands at the `$` prompt
4. Press Enter to execute commands
5. Use `help` to see all available commands

## Example Session

```
$ add 5 3
ADD 5 3 = 8

$ sub 10 4
SUB 10 4 = 6

$ mul 6 7
MUL 6 7 = 42

$ div 20 5
DIV 20 5 = 4

$ help
Available Commands:
==================

  add      - Add two numbers
  sub      - Subtract second number from first
  mul      - Multiply two numbers
  div      - Divide first number by second
  clear    - Clear terminal output
  help     - Show available commands

$ clear
Terminal cleared.
```

---

**Project Created For**: Operating Systems PBL Project  
**Technologies Used**: HTML5, CSS3, JavaScript (ES6+)  
**Difficulty Level**: Beginner - Suitable for engineering students
