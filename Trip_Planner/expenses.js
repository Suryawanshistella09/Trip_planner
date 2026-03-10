// Expenses Page JavaScript

class ExpensesManager {
    constructor() {
        this.currentTrip = null;
        this.expenses = {};
        this.savedTrips = [];
        this.currency = 'USD';
        this.budgetGoal = 0;
        this.budgetAlertThreshold = 80;
        this.init();
    }

    init() {
        this.loadSavedTrips();
        this.setupEventListeners();
        this.populateTripSelector();
        this.loadExpenses();
        this.updateBudgetOverview();
    }

    setupEventListeners() {
        // Trip selector change
        document.getElementById('trip-selector').addEventListener('change', () => this.onTripChange());
        document.getElementById('currency').addEventListener('change', () => this.onCurrencyChange());
        
        // Expense category inputs
        const categoryInputs = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
        categoryInputs.forEach(category => {
            document.getElementById(category).addEventListener('input', () => this.updateBudgetOverview());
        });
        
        // Custom expense
        document.getElementById('add-custom-expense').addEventListener('click', () => this.addCustomExpense());
        
        // Budget planning
        document.getElementById('set-budget-goal').addEventListener('click', () => this.setBudgetGoal());
        document.getElementById('reset-budget').addEventListener('click', () => this.resetBudget());
        
        // Export and actions
        document.getElementById('export-expenses').addEventListener('click', () => this.exportExpenses());
        document.getElementById('print-expenses').addEventListener('click', () => this.printExpenses());
        document.getElementById('share-expenses').addEventListener('click', () => this.shareExpenses());
        document.getElementById('save-expenses').addEventListener('click', () => this.saveExpenses());
        document.getElementById('clear-expenses').addEventListener('click', () => this.clearExpenses());
        document.getElementById('import-expenses').addEventListener('click', () => this.importExpenses());
    }

    loadSavedTrips() {
        this.savedTrips = JSON.parse(localStorage.getItem('astratrip-trips') || '[]');
    }

    populateTripSelector() {
        const tripSelector = document.getElementById('trip-selector');
        
        // Clear existing options
        tripSelector.innerHTML = '<option value="">Select a trip...</option>';
        
        this.savedTrips.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.tripName;
            option.textContent = trip.tripName;
            tripSelector.appendChild(option);
        });
    }

    onTripChange() {
        const selectedTrip = document.getElementById('trip-selector').value;
        if (selectedTrip) {
            this.currentTrip = this.savedTrips.find(trip => trip.tripName === selectedTrip);
            this.loadExpenses();
            this.updateBudgetOverview();
        }
    }

    onCurrencyChange() {
        this.currency = document.getElementById('currency').value;
        this.updateBudgetOverview();
    }

    loadExpenses() {
        if (!this.currentTrip) {
            this.expenses = {};
            return;
        }

        const savedExpenses = localStorage.getItem(`astratrip-expenses-${this.currentTrip.tripName}`);
        if (savedExpenses) {
            this.expenses = JSON.parse(savedExpenses);
        } else {
            this.expenses = {
                accommodation: 0,
                transportation: 0,
                food: 0,
                activities: 0,
                shopping: 0,
                miscellaneous: 0,
                custom: []
            };
        }

        // Update form inputs
        Object.keys(this.expenses).forEach(category => {
            if (category !== 'custom' && document.getElementById(category)) {
                document.getElementById(category).value = this.expenses[category] || 0;
            }
        });

        this.displayExpenseList();
    }

    updateBudgetOverview() {
        const totalBudget = this.budgetGoal;
        const totalSpent = this.calculateTotalSpent();
        const remaining = totalBudget - totalSpent;
        const dailyAverage = this.currentTrip ? (totalSpent / this.currentTrip.tripLength) : 0;

        document.getElementById('total-budget').textContent = this.formatCurrency(totalBudget);
        document.getElementById('total-spent').textContent = this.formatCurrency(totalSpent);
        document.getElementById('remaining-budget').textContent = this.formatCurrency(remaining);
        document.getElementById('daily-average').textContent = this.formatCurrency(dailyAverage);

        // Update progress bars or visual indicators
        this.updateBudgetProgress(totalSpent, totalBudget);
    }

    calculateTotalSpent() {
        let total = 0;
        Object.keys(this.expenses).forEach(category => {
            if (category === 'custom') {
                total += this.expenses[category].reduce((sum, expense) => sum + expense.amount, 0);
            } else {
                total += parseFloat(this.expenses[category] || 0);
            }
        });
        return total;
    }

    updateBudgetProgress(spent, budget) {
        if (budget <= 0) return;

        const percentage = (spent / budget) * 100;
        const remainingBudget = document.getElementById('remaining-budget');
        
        // Change color based on threshold
        if (percentage >= this.budgetAlertThreshold) {
            remainingBudget.style.background = 'var(--gradient-danger)';
        } else if (percentage >= 60) {
            remainingBudget.style.background = 'var(--gradient-warning)';
        } else {
            remainingBudget.style.background = 'var(--gradient-success)';
        }
    }

    addCustomExpense() {
        const name = document.getElementById('custom-expense-name').value.trim();
        const amount = parseFloat(document.getElementById('custom-expense-amount').value);

        if (!name || isNaN(amount) || amount <= 0) {
            this.showMessage('Please enter a valid name and amount', 'error');
            return;
        }

        if (!this.expenses.custom) {
            this.expenses.custom = [];
        }

        this.expenses.custom.push({
            name: name,
            amount: amount,
            date: new Date().toISOString()
        });

        // Clear form
        document.getElementById('custom-expense-name').value = '';
        document.getElementById('custom-expense-amount').value = '';

        this.displayExpenseList();
        this.updateBudgetOverview();
        this.saveExpenses();
        
        // Trigger gamification event for expense tracking
        document.dispatchEvent(new CustomEvent('expensesTracked'));
        
        this.showMessage('Custom expense added successfully!', 'success');
    }

    displayExpenseList() {
        const expenseList = document.getElementById('expense-list');
        
        if (!this.currentTrip) {
            expenseList.innerHTML = '<p class="text-center text-muted">Please select a trip to view expenses</p>';
            return;
        }

        let html = '<div class="expense-breakdown">';
        
        // Category expenses
        const categories = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
        categories.forEach(category => {
            const amount = parseFloat(this.expenses[category] || 0);
            if (amount > 0) {
                html += `
                    <div class="expense-item">
                        <div class="expense-info">
                            <span class="expense-category">${this.getCategoryDisplayName(category)}</span>
                            <span class="expense-amount">${this.formatCurrency(amount)}</span>
                        </div>
                        <button class="btn btn-sm btn-outline" onclick="expensesManager.editExpense('${category}')">Edit</button>
                    </div>
                `;
            }
        });

        // Custom expenses
        if (this.expenses.custom && this.expenses.custom.length > 0) {
            this.expenses.custom.forEach((expense, index) => {
                html += `
                    <div class="expense-item">
                        <div class="expense-info">
                            <span class="expense-category">${expense.name}</span>
                            <span class="expense-amount">${this.formatCurrency(expense.amount)}</span>
                        </div>
                        <button class="btn btn-sm btn-outline" onclick="expensesManager.editCustomExpense(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="expensesManager.removeCustomExpense(${index})">Remove</button>
                    </div>
                `;
            });
        }

        if (html === '<div class="expense-breakdown">') {
            html += '<p class="text-center text-muted">No expenses recorded yet</p>';
        }

        html += '</div>';
        expenseList.innerHTML = html;
    }

    getCategoryDisplayName(category) {
        const displayNames = {
            'accommodation': '🏨 Accommodation',
            'transportation': '🚗 Transportation',
            'food': '🍽️ Food & Dining',
            'activities': '🎯 Activities & Entertainment',
            'shopping': '🛍️ Shopping',
            'miscellaneous': '📦 Miscellaneous'
        };
        return displayNames[category] || category;
    }

    editExpense(category) {
        const currentAmount = this.expenses[category] || 0;
        const newAmount = prompt(`Enter new amount for ${category}:`, currentAmount);
        
        if (newAmount !== null && !isNaN(newAmount)) {
            this.expenses[category] = parseFloat(newAmount);
            document.getElementById(category).value = newAmount;
            this.displayExpenseList();
            this.updateBudgetOverview();
            this.saveExpenses();
            
            // Trigger gamification event for expense tracking
            document.dispatchEvent(new CustomEvent('expensesTracked'));
            
            this.showMessage(`${category} expense updated`, 'success');
        }
    }

    editCustomExpense(index) {
        const expense = this.expenses.custom[index];
        const newName = prompt('Enter new expense name:', expense.name);
        const newAmount = prompt('Enter new amount:', expense.amount);
        
        if (newName !== null && newAmount !== null && !isNaN(newAmount)) {
            this.expenses.custom[index] = {
                name: newName,
                amount: parseFloat(newAmount),
                date: expense.date
            };
            this.displayExpenseList();
            this.updateBudgetOverview();
            this.saveExpenses();
            this.showMessage('Custom expense updated', 'success');
        }
    }

    removeCustomExpense(index) {
        if (confirm('Are you sure you want to remove this expense?')) {
            this.expenses.custom.splice(index, 1);
            this.displayExpenseList();
            this.updateBudgetOverview();
            this.saveExpenses();
            this.showMessage('Custom expense removed', 'success');
        }
    }

    setBudgetGoal() {
        const goal = parseFloat(document.getElementById('budget-goal').value);
        const threshold = parseFloat(document.getElementById('budget-alert').value);

        if (isNaN(goal) || goal <= 0) {
            this.showMessage('Please enter a valid budget goal', 'error');
            return;
        }

        if (isNaN(threshold) || threshold < 0 || threshold > 100) {
            this.showMessage('Please enter a valid threshold (0-100%)', 'error');
            return;
        }

        this.budgetGoal = goal;
        this.budgetAlertThreshold = threshold;

        // Save to localStorage
        localStorage.setItem(`astratrip-budget-${this.currentTrip?.tripName || 'general'}`, JSON.stringify({
            goal: this.budgetGoal,
            threshold: this.budgetAlertThreshold
        }));

        this.updateBudgetOverview();
        this.showMessage('Budget goal set successfully!', 'success');
    }

    resetBudget() {
        if (confirm('Are you sure you want to reset the budget? This will clear all expenses.')) {
            this.expenses = {
                accommodation: 0,
                transportation: 0,
                food: 0,
                activities: 0,
                shopping: 0,
                miscellaneous: 0,
                custom: []
            };

            // Clear form inputs
            const categoryInputs = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
            categoryInputs.forEach(category => {
                document.getElementById(category).value = '0';
            });

            this.displayExpenseList();
            this.updateBudgetOverview();
            this.saveExpenses();
            this.showMessage('Budget reset successfully!', 'success');
        }
    }

    saveExpenses() {
        if (this.currentTrip) {
            localStorage.setItem(`astratrip-expenses-${this.currentTrip.tripName}`, JSON.stringify(this.expenses));
            this.showMessage('Expenses saved successfully!', 'success');
        } else {
            this.showMessage('No trip selected to save expenses', 'error');
        }
    }

    exportExpenses() {
        if (!this.currentTrip) {
            this.showMessage('No trip selected to export', 'error');
            return;
        }

        const data = {
            trip: this.currentTrip.tripName,
            currency: this.currency,
            budgetGoal: this.budgetGoal,
            expenses: this.expenses,
            totalSpent: this.calculateTotalSpent(),
            exportDate: new Date().toISOString()
        };

        const csvContent = this.generateCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astratrip-expenses-${this.currentTrip.tripName.replace(/\s+/g, '-')}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        this.showMessage('Expenses exported to CSV successfully!', 'success');
    }

    generateCSV(data) {
        let csv = 'Category,Name,Amount,Date\n';
        
        // Add category expenses
        const categories = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
        categories.forEach(category => {
            const amount = parseFloat(data.expenses[category] || 0);
            if (amount > 0) {
                csv += `${category},,${amount},\n`;
            }
        });

        // Add custom expenses
        if (data.expenses.custom) {
            data.expenses.custom.forEach(expense => {
                csv += `custom,${expense.name},${expense.amount},${expense.date}\n`;
            });
        }

        return csv;
    }

    printExpenses() {
        const printWindow = window.open('', '_blank');
        const printContent = this.generatePrintContent();
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Expense Report - ${this.currentTrip?.tripName || 'General'}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .summary { margin-bottom: 20px; }
                        .expense-item { margin: 10px 0; padding: 10px; border-bottom: 1px solid #ccc; }
                        .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Expense Report</h1>
                        <h2>${this.currentTrip?.tripName || 'General'}</h2>
                        <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    </div>
                    ${printContent}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    generatePrintContent() {
        if (!this.currentTrip) return '<p>No trip selected</p>';

        let content = `
            <div class="summary">
                <h3>Budget Summary</h3>
                <p><strong>Total Budget:</strong> ${this.formatCurrency(this.budgetGoal)}</p>
                <p><strong>Total Spent:</strong> ${this.formatCurrency(this.calculateTotalSpent())}</p>
                <p><strong>Remaining:</strong> ${this.formatCurrency(this.budgetGoal - this.calculateTotalSpent())}</p>
            </div>
            <div class="expenses">
                <h3>Expense Breakdown</h3>
        `;

        // Add category expenses
        const categories = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
        categories.forEach(category => {
            const amount = parseFloat(this.expenses[category] || 0);
            if (amount > 0) {
                content += `
                    <div class="expense-item">
                        <strong>${this.getCategoryDisplayName(category)}:</strong> ${this.formatCurrency(amount)}
                    </div>
                `;
            }
        });

        // Add custom expenses
        if (this.expenses.custom && this.expenses.custom.length > 0) {
            this.expenses.custom.forEach(expense => {
                content += `
                    <div class="expense-item">
                        <strong>${expense.name}:</strong> ${this.formatCurrency(expense.amount)}
                    </div>
                `;
            });
        }

        content += '</div>';
        return content;
    }

    shareExpenses() {
        // For now, just show a message
        this.showMessage('Share functionality coming soon!', 'success');
    }

    clearExpenses() {
        if (confirm('Are you sure you want to clear all expenses? This action cannot be undone.')) {
            this.expenses = {
                accommodation: 0,
                transportation: 0,
                food: 0,
                activities: 0,
                shopping: 0,
                miscellaneous: 0,
                custom: []
            };

            // Clear form inputs
            const categoryInputs = ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'miscellaneous'];
            categoryInputs.forEach(category => {
                document.getElementById(category).value = '0';
            });

            this.displayExpenseList();
            this.updateBudgetOverview();
            this.saveExpenses();
            this.showMessage('All expenses cleared', 'success');
        }
    }

    importExpenses() {
        // For now, just show a message
        this.showMessage('Import functionality coming soon!', 'success');
    }

    formatCurrency(amount) {
        const currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'CAD': 'C$'
        };

        const symbol = currencySymbols[this.currency] || '$';
        return `${symbol}${amount.toFixed(2)}`;
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        // Insert at the top of the page container
        const pageContainer = document.querySelector('.page-container');
        pageContainer.insertBefore(messageElement, pageContainer.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.expensesManager = new ExpensesManager();
});
