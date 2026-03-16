/**
 * Arithmetic Command Shell - JavaScript Implementation
 * Operating Systems PBL Project
 * 
 * This script implements a web-based terminal interface that accepts
 * arithmetic commands and displays results in a shell-like format.
 */

// DOM elements
const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');

// Command history for navigation
let commandHistory = [];
let historyIndex = -1;

// Available commands
const commands = {
    add: {
        description: 'Add two numbers',
        usage: 'add <num1> <num2>',
        execute: (args) => arithmeticOperation('add', args)
    },
    sub: {
        description: 'Subtract second number from first',
        usage: 'sub <num1> <num2>',
        execute: (args) => arithmeticOperation('sub', args)
    },
    mul: {
        description: 'Multiply two numbers',
        usage: 'mul <num1> <num2>',
        execute: (args) => arithmeticOperation('mul', args)
    },
    div: {
        description: 'Divide first number by second',
        usage: 'div <num1> <num2>',
        execute: (args) => arithmeticOperation('div', args)
    },
    help: {
        description: 'Show available commands',
        usage: 'help',
        execute: showHelp
    },
    clear: {
        description: 'Clear terminal output',
        usage: 'clear',
        execute: clearTerminal
    }
};

/**
 * Initialize the terminal interface
 */
function initTerminal() {
    // Focus on input field
    commandInput.focus();
    
    // Event listener for Enter key
    commandInput.addEventListener('keydown', handleKeyPress);
    
    // Event listener for command history navigation
    commandInput.addEventListener('keydown', handleHistoryNavigation);
    
    // Prevent cursor from leaving input field
    commandInput.addEventListener('blur', () => {
        setTimeout(() => commandInput.focus(), 0);
    });
}

/**
 * Handle key press events for command execution
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        executeCommand();
    }
}

/**
 * Handle command history navigation with arrow keys
 */
function handleHistoryNavigation(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        navigateHistory(-1);
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        navigateHistory(1);
    }
}

/**
 * Navigate through command history
 */
function navigateHistory(direction) {
    if (commandHistory.length === 0) return;
    
    historyIndex += direction;
    
    // Boundary checks
    if (historyIndex < 0) {
        historyIndex = 0;
    } else if (historyIndex >= commandHistory.length) {
        historyIndex = commandHistory.length - 1;
        commandInput.value = '';
        return;
    }
    
    commandInput.value = commandHistory[historyIndex];
}

/**
 * Execute the entered command
 */
function executeCommand() {
    const command = commandInput.value.trim();
    
    // Don't execute empty commands
    if (!command) return;
    
    // Add to command history
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    
    // Display the command in output
    displayCommand(command);
    
    // Parse and execute the command
    const result = parseAndExecuteCommand(command);
    
    // Display the result
    displayResult(result);
    
    // Clear input field
    commandInput.value = '';
    
    // Scroll to bottom
    scrollToBottom();
}

/**
 * Parse the command and execute it
 */
function parseAndExecuteCommand(command) {
    const parts = command.toLowerCase().split(/\s+/);
    const commandName = parts[0];
    const args = parts.slice(1);
    
    // Check if command exists
    if (!commands[commandName]) {
        return {
            type: 'error',
            message: `Command not found: ${commandName}. Type 'help' for available commands.`
        };
    }
    
    try {
        // Execute the command
        const result = commands[commandName].execute(args);
        return result;
    } catch (error) {
        return {
            type: 'error',
            message: `Error executing command: ${error.message}`
        };
    }
}

/**
 * Perform arithmetic operations
 */
function arithmeticOperation(operation, args) {
    // Validate arguments
    if (args.length !== 2) {
        return {
            type: 'error',
            message: `Invalid number of arguments. Usage: ${operation} <num1> <num2>`
        };
    }
    
    const num1 = parseFloat(args[0]);
    const num2 = parseFloat(args[1]);
    
    // Check if numbers are valid
    if (isNaN(num1) || isNaN(num2)) {
        return {
            type: 'error',
            message: 'Invalid numbers. Please provide valid numeric arguments.'
        };
    }
    
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mul':
            result = num1 * num2;
            break;
        case 'div':
            // Check for division by zero
            if (num2 === 0) {
                return {
                    type: 'error',
                    message: 'Error: Division by zero is not allowed.'
                };
            }
            result = num1 / num2;
            break;
        default:
            return {
                type: 'error',
                message: 'Unknown operation.'
            };
    }
    
    // Format result (handle floating point precision)
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    
    return {
        type: 'success',
        message: `${operation.toUpperCase()} ${num1} ${num2} = ${formattedResult}`
    };
}

/**
 * Show help information
 */
function showHelp() {
    const helpText = [
        'Available Commands:',
        '==================',
        '',
        ...Object.entries(commands).map(([cmd, info]) => 
            `  ${cmd.padEnd(8)} - ${info.description}`
        ),
        '',
        'Usage Examples:',
        '================',
        '  add 5 3     → 8',
        '  sub 10 4    → 6',
        '  mul 6 7     → 42',
        '  div 20 5    → 4',
        '  clear       → Clears terminal',
        '  help        → Shows this help',
        '',
        'Tips:',
        '=====',
        '• Use arrow keys (↑/↓) to navigate command history',
        '• Commands are case-insensitive',
        '• Press Enter to execute commands'
    ];
    
    return {
        type: 'help',
        message: helpText.join('\n')
    };
}

/**
 * Clear the terminal output
 */
function clearTerminal() {
    // Clear all output except welcome message
    const welcomeMessage = output.querySelector('.welcome-message');
    output.innerHTML = '';
    
    if (welcomeMessage) {
        output.appendChild(welcomeMessage);
    }
    
    return {
        type: 'success',
        message: 'Terminal cleared.'
    };
}

/**
 * Display a command in the output area
 */
function displayCommand(command) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    
    const prompt = document.createElement('span');
    prompt.className = 'command-input-display';
    prompt.textContent = '$ ';
    
    const commandText = document.createElement('span');
    commandText.className = 'command-input-display';
    commandText.textContent = command;
    
    commandLine.appendChild(prompt);
    commandLine.appendChild(commandText);
    output.appendChild(commandLine);
}

/**
 * Display the result of a command
 */
function displayResult(result) {
    const resultLine = document.createElement('div');
    resultLine.className = 'command-line';
    
    const resultText = document.createElement('span');
    resultText.className = result.type === 'error' ? 'error-message' : 
                         result.type === 'help' ? 'help-message' : 
                         result.type === 'success' ? 'success-message' : 
                         'command-result';
    
    // Handle multi-line messages (like help)
    if (result.message.includes('\n')) {
        resultText.innerHTML = result.message.split('\n')
            .map(line => line || '<br>')
            .join('<br>');
    } else {
        resultText.textContent = result.message;
    }
    
    resultLine.appendChild(resultText);
    output.appendChild(resultLine);
}

/**
 * Scroll to the bottom of the output area
 */
function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

/**
 * Utility function to validate numeric input
 */
function isValidNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
}

/**
 * Utility function to format numbers for display
 */
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return num.toFixed(2);
}

// Initialize the terminal when the page loads
document.addEventListener('DOMContentLoaded', initTerminal);

// Additional utility: Handle window focus
window.addEventListener('focus', () => {
    commandInput.focus();
});

// Console debug information (remove in production)
console.log('Arithmetic Command Shell initialized successfully!');
console.log('Available commands:', Object.keys(commands));
