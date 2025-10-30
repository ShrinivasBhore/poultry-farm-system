//  // Global configuration
// const API_BASE_URL = 'http://localhost:5000/api';
// let currentUser = null;

// // Utility Functions
// function showAlert(message, type = 'info') {
//     const alertContainer = document.getElementById('alertContainer');
//     if (!alertContainer) return;

//     const alertDiv = document.createElement('div');
//     alertDiv.className = `alert ${type}`;
//     alertDiv.innerHTML = `
//         ${message}
//         <button class="alert-close" onclick="this.parentElement.remove()">&times;</button>
//     `;
    
//     alertContainer.appendChild(alertDiv);
    
//     // Auto remove after 5 seconds
//     setTimeout(() => {
//         if (alertDiv.parentElement) {
//             alertDiv.remove();
//         }
//     }, 5000);
// }

// function formatCurrency(amount) {
//     return new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR'
//     }).format(amount);
// }

// function formatDate(dateString) {
//     return new Date(dateString).toLocaleDateString('en-IN');
// }

// function formatDateTime(dateString) {
//     return new Date(dateString).toLocaleString('en-IN');
// }

// // API Helper Functions
// async function apiCall(endpoint, options = {}) {
//     const token = localStorage.getItem('token');
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         ...options
//     };

//     try {
//         const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
//         const data = await response.json();
        
//         if (!response.ok) {
//             throw new Error(data.message || 'API call failed');
//         }
        
//         return data;
//     } catch (error) {
//         console.error('API Error:', error);
//         showAlert(error.message, 'error');
//         throw error;
//     }
// }

// // Authentication Functions
// function checkAuth() {
//     const token = localStorage.getItem('token');
//     const currentPage = window.location.pathname.split('/').pop();
    
//     if (!token && currentPage !== 'index.html' && currentPage !== '') {
//         window.location.href = 'index.html';
//         return false;
//     }
    
//     if (token && (currentPage === 'index.html' || currentPage === '')) {
//         window.location.href = 'dashboard.html';
//         return false;
//     }
    
//     return true;
// }

// function logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     window.location.href = 'index.html';
// }

// // Modal Functions
// function openModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (modal) {
//         modal.style.display = 'block';
//     }
// }

// function closeModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (modal) {
//         modal.style.display = 'none';
//     }
// }

// // Tab Functions
// function switchTab(tabContainer, activeTab) {
//     // Hide all tab contents
//     const tabContents = tabContainer.querySelectorAll('.tab-content');
//     tabContents.forEach(content => content.classList.remove('active'));
    
//     // Remove active class from all tab buttons
//     const tabBtns = tabContainer.querySelectorAll('.tab-btn');
//     tabBtns.forEach(btn => btn.classList.remove('active'));
    
//     // Show active tab content
//     const activeContent = document.getElementById(`${activeTab}-tab`);
//     if (activeContent) {
//         activeContent.classList.add('active');
//     }
    
//     // Add active class to clicked button
//     const activeBtn = tabContainer.querySelector(`[data-tab="${activeTab}"]`);
//     if (activeBtn) {
//         activeBtn.classList.add('active');
//     }
// }

// // Login Page Functions
// function initializeLoginPage() {
//     const loginForm = document.getElementById('loginForm');
//     const registerForm = document.getElementById('registerForm');
//     const registerLink = document.getElementById('registerLink');
//     const loginLink = document.getElementById('loginLink');

//     if (loginForm) {
//         loginForm.addEventListener('submit', handleLogin);
//     }

//     if (registerForm) {
//         registerForm.addEventListener('submit', handleRegister);
//     }

//     if (registerLink) {
//         registerLink.addEventListener('click', (e) => {
//             e.preventDefault();
//             loginForm.style.display = 'none';
//             registerForm.style.display = 'block';
//         });
//     }

//     if (loginLink) {
//         loginLink.addEventListener('click', (e) => {
//             e.preventDefault();
//             registerForm.style.display = 'none';
//             loginForm.style.display = 'block';
//         });
//     }

//     // Check if already logged in
//     if (localStorage.getItem('token')) {
//         window.location.href = 'dashboard.html';
//     }
// }

// async function handleLogin(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const loginData = {
//         email: formData.get('email'),
//         password: formData.get('password')
//     };

//     try {
//         const response = await apiCall('/auth/login', {
//             method: 'POST',
//             body: JSON.stringify(loginData)
//         });

//         localStorage.setItem('token', response.token);
//         localStorage.setItem('user', JSON.stringify(response.user));
//         showAlert('Login successful!', 'success');
        
//         setTimeout(() => {
//             window.location.href = 'dashboard.html';
//         }, 1000);
//     } catch (error) {
//         showAlert('Login failed. Please check your credentials.', 'error');
//     }
// }

// async function handleRegister(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     if (formData.get('password') !== formData.get('confirmPassword')) {
//         showAlert('Passwords do not match!', 'error');
//         return;
//     }

//     const registerData = {
//         name: formData.get('name'),
//         email: formData.get('email'),
//         password: formData.get('password'),
//         farmName: formData.get('farmName')
//     };

//     try {
//         await apiCall('/auth/register', {
//             method: 'POST',
//             body: JSON.stringify(registerData)
//         });

//         showAlert('Registration successful! Please login.', 'success');
        
//         // Switch back to login form
//         document.getElementById('registerForm').style.display = 'none';
//         document.getElementById('loginForm').style.display = 'block';
//     } catch (error) {
//         showAlert('Registration failed. Please try again.', 'error');
//     }
// }

// // Dashboard Functions
// function initializeDashboard() {
//     checkAuth();
    
//     const logoutBtn = document.getElementById('logoutBtn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', logout);
//     }

//     // Load user info
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const welcomeMessage = document.getElementById('welcomeMessage');
//     if (welcomeMessage && user.name) {
//         welcomeMessage.textContent = `Welcome back, ${user.name}!`;
//     }
// }

// async function loadDashboardData() {
//     try {
//         // Load dashboard statistics
//         const stats = await apiCall('/dashboard/stats');
        
//         // Update stat cards
//         document.getElementById('totalBirds').textContent = stats.totalBirds || 0;
//         document.getElementById('activeFlocks').textContent = stats.activeFlocks || 0;
//         document.getElementById('monthlyRevenue').textContent = formatCurrency(stats.monthlyRevenue || 0);
//         document.getElementById('profit').textContent = formatCurrency(stats.profit || 0);

//         // Load recent activities
//         const activities = await apiCall('/dashboard/activities');
//         displayRecentActivities(activities);

//     } catch (error) {
//         console.error('Failed to load dashboard data:', error);
//     }
// }

// function displayRecentActivities(activities) {
//     const container = document.getElementById('recentActivities');
//     if (!container || !activities.length) return;

//     container.innerHTML = activities.map(activity => `
//         <div class="activity-item">
//             <div class="activity-icon">${activity.icon}</div>
//             <div class="activity-info">
//                 <p>${activity.description}</p>
//                 <small>${formatDateTime(activity.createdAt)}</small>
//             </div>
//         </div>
//     `).join('');
// }

// // Flock Management Functions
// function initializeFlockPage() {
//     checkAuth();
//     loadFlocks();
    
//     const addFlockForm = document.getElementById('addFlockForm');
//     if (addFlockForm) {
//         addFlockForm.addEventListener('submit', handleAddFlock);
//     }
// }

// async function loadFlocks() {
//     try {
//         const flocks = await apiCall('/flocks');
//         displayFlocks(flocks);
//     } catch (error) {
//         console.error('Failed to load flocks:', error);
//     }
// }

// function displayFlocks(flocks) {
//     const container = document.getElementById('flocksContainer');
//     if (!container) return;

//     if (!flocks.length) {
//         container.innerHTML = '<p class="no-data">No flocks found. Add your first flock to get started!</p>';
//         return;
//     }

//     container.innerHTML = flocks.map(flock => `
//         <div class="flock-card">
//             <div class="flock-header">
//                 <h3>${flock.name}</h3>
//                 <span class="flock-status ${flock.status}">${flock.status}</span>
//             </div>
//             <div class="flock-info">
//                 <p><strong>Breed:</strong> ${flock.breed}</p>
//                 <p><strong>Count:</strong> ${flock.birdCount}</p>
//                 <p><strong>Age:</strong> ${flock.ageInWeeks} weeks</p>
//                 <p><strong>Started:</strong> ${formatDate(flock.startDate)}</p>
//             </div>
//             <div class="flock-actions">
//                 <button onclick="viewFlockDetails('${flock._id}')" class="btn btn-primary">View Details</button>
//                 <button onclick="editFlock('${flock._id}')" class="btn btn-secondary">Edit</button>
//                 <button onclick="deleteFlock('${flock._id}')" class="btn btn-danger">Delete</button>
//             </div>
//         </div>
//     `).join('');
// }

// async function handleAddFlock(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const flockData = {
//         name: formData.get('name'),
//         breed: formData.get('breed'),
//         birdCount: parseInt(formData.get('birdCount')),
//         startDate: formData.get('startDate'),
//         notes: formData.get('notes')
//     };

//     try {
//         await apiCall('/flocks', {
//             method: 'POST',
//             body: JSON.stringify(flockData)
//         });

//         showAlert('Flock added successfully!', 'success');
//         closeModal('addFlockModal');
//         loadFlocks();
//         e.target.reset();
//     } catch (error) {
//         showAlert('Failed to add flock. Please try again.', 'error');
//     }
// }

// async function deleteFlock(flockId) {
//     if (!confirm('Are you sure you want to delete this flock?')) return;

//     try {
//         await apiCall(`/flocks/${flockId}`, {
//             method: 'DELETE'
//         });

//         showAlert('Flock deleted successfully!', 'success');
//         loadFlocks();
//     } catch (error) {
//         showAlert('Failed to delete flock.', 'error');
//     }
// }

// // Finance Management Functions
// function initializeFinancePage() {
//     checkAuth();
//     loadFinanceData();
    
//     const addTransactionForm = document.getElementById('addTransactionForm');
//     if (addTransactionForm) {
//         addTransactionForm.addEventListener('submit', handleAddTransaction);
//     }
// }

// async function loadFinanceData() {
//     try {
//         const [transactions, summary] = await Promise.all([
//             apiCall('/finance/transactions'),
//             apiCall('/finance/summary')
//         ]);
        
//         displayTransactions(transactions);
//         displayFinanceSummary(summary);
//     } catch (error) {
//         console.error('Failed to load finance data:', error);
//     }
// }

// function displayTransactions(transactions) {
//     const container = document.getElementById('transactionsTable');
//     if (!container) return;

//     if (!transactions.length) {
//         container.innerHTML = '<tr><td colspan="6" class="no-data">No transactions found.</td></tr>';
//         return;
//     }

//     container.innerHTML = transactions.map(transaction => `
//         <tr>
//             <td>${formatDate(transaction.date)}</td>
//             <td>${transaction.description}</td>
//             <td>${transaction.category}</td>
//             <td class="${transaction.type}">${transaction.type}</td>
//             <td class="${transaction.type}">${formatCurrency(transaction.amount)}</td>
//             <td>
//                 <button onclick="editTransaction('${transaction._id}')" class="btn btn-sm">Edit</button>
//                 <button onclick="deleteTransaction('${transaction._id}')" class="btn btn-sm btn-danger">Delete</button>
//             </td>
//         </tr>
//     `).join('');
// }

// function displayFinanceSummary(summary) {
//     const elements = {
//         totalIncome: document.getElementById('totalIncome'),
//         totalExpenses: document.getElementById('totalExpenses'),
//         netProfit: document.getElementById('netProfit')
//     };

//     if (elements.totalIncome) elements.totalIncome.textContent = formatCurrency(summary.totalIncome || 0);
//     if (elements.totalExpenses) elements.totalExpenses.textContent = formatCurrency(summary.totalExpenses || 0);
//     if (elements.netProfit) elements.netProfit.textContent = formatCurrency(summary.netProfit || 0);
// }

// async function handleAddTransaction(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const transactionData = {
//         date: formData.get('date'),
//         description: formData.get('description'),
//         category: formData.get('category'),
//         type: formData.get('type'),
//         amount: parseFloat(formData.get('amount')),
//         flockId: formData.get('flockId') || null
//     };

//     try {
//         await apiCall('/finance/transactions', {
//             method: 'POST',
//             body: JSON.stringify(transactionData)
//         });

//         showAlert('Transaction added successfully!', 'success');
//         closeModal('addTransactionModal');
//         loadFinanceData();
//         e.target.reset();
//     } catch (error) {
//         showAlert('Failed to add transaction. Please try again.', 'error');
//     }
// }

// // Records Management Functions
// function initializeRecordsPage() {
//     checkAuth();
//     loadRecords();
    
//     const addRecordForm = document.getElementById('addRecordForm');
//     if (addRecordForm) {
//         addRecordForm.addEventListener('submit', handleAddRecord);
//     }
// }

// async function loadRecords() {
//     try {
//         const records = await apiCall('/records');
//         displayRecords(records);
//     } catch (error) {
//         console.error('Failed to load records:', error);
//     }
// }

// function displayRecords(records) {
//     const container = document.getElementById('recordsTable');
//     if (!container) return;

//     if (!records.length) {
//         container.innerHTML = '<tr><td colspan="6" class="no-data">No records found.</td></tr>';
//         return;
//     }

//     container.innerHTML = records.map(record => `
//         <tr>
//             <td>${formatDate(record.date)}</td>
//             <td>${record.flock?.name || 'N/A'}</td>
//             <td>${record.type}</td>
//             <td>${record.quantity || '-'}</td>
//             <td>${record.notes || '-'}</td>
//             <td>
//                 <button onclick="editRecord('${record._id}')" class="btn btn-sm">Edit</button>
//                 <button onclick="deleteRecord('${record._id}')" class="btn btn-sm btn-danger">Delete</button>
//             </td>
//         </tr>
//     `).join('');
// }

// async function handleAddRecord(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const recordData = {
//         date: formData.get('date'),
//         flockId: formData.get('flockId'),
//         type: formData.get('type'),
//         quantity: formData.get('quantity') ? parseInt(formData.get('quantity')) : null,
//         notes: formData.get('notes')
//     };

//     try {
//         await apiCall('/records', {
//             method: 'POST',
//             body: JSON.stringify(recordData)
//         });

//         showAlert('Record added successfully!', 'success');
//         closeModal('addRecordModal');
//         loadRecords();
//         e.target.reset();
//     } catch (error) {
//         showAlert('Failed to add record. Please try again.', 'error');
//     }
// }

// // Health Management Functions
// function initializeHealthPage() {
//     checkAuth();
//     loadHealthRecords();
    
//     const addHealthRecordForm = document.getElementById('addHealthRecordForm');
//     if (addHealthRecordForm) {
//         addHealthRecordForm.addEventListener('submit', handleAddHealthRecord);
//     }
// }

// async function loadHealthRecords() {
//     try {
//         const records = await apiCall('/health');
//         displayHealthRecords(records);
//     } catch (error) {
//         console.error('Failed to load health records:', error);
//     }
// }

// function displayHealthRecords(records) {
//     const container = document.getElementById('healthRecordsTable');
//     if (!container) return;

//     if (!records.length) {
//         container.innerHTML = '<tr><td colspan="7" class="no-data">No health records found.</td></tr>';
//         return;
//     }

//     container.innerHTML = records.map(record => `
//         <tr class="${record.severity}">
//             <td>${formatDate(record.date)}</td>
//             <td>${record.flock?.name || 'N/A'}</td>
//             <td>${record.type}</td>
//             <td>${record.severity}</td>
//             <td>${record.treatment || '-'}</td>
//             <td>${record.notes || '-'}</td>
//             <td>
//                 <button onclick="editHealthRecord('${record._id}')" class="btn btn-sm">Edit</button>
//                 <button onclick="deleteHealthRecord('${record._id}')" class="btn btn-sm btn-danger">Delete</button>
//             </td>
//         </tr>
//     `).join('');
// }

// async function handleAddHealthRecord(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const healthData = {
//         date: formData.get('date'),
//         flockId: formData.get('flockId'),
//         type: formData.get('type'),
//         severity: formData.get('severity'),
//         treatment: formData.get('treatment'),
//         notes: formData.get('notes')
//     };

//     try {
//         await apiCall('/health', {
//             method: 'POST',
//             body: JSON.stringify(healthData)
//         });

//         showAlert('Health record added successfully!', 'success');
//         closeModal('addHealthRecordModal');
//         loadHealthRecords();
//         e.target.reset();
//     } catch (error) {
//         showAlert('Failed to add health record. Please try again.', 'error');
//     }
// }

// // Initialize page based on current location
// document.addEventListener('DOMContentLoaded', () => {
//     const currentPage = window.location.pathname.split('/').pop();
    
//     switch (currentPage) {
//         case 'index.html':
//         case '':
//             initializeLoginPage();
//             break;
//         case 'dashboard.html':
//             initializeDashboard();
//             loadDashboardData();
//             break;
//         case 'flocks.html':
//             initializeFlockPage();
//             break;
//         case 'finance.html':
//             initializeFinancePage();
//             break;
//         case 'records.html':
//             initializeRecordsPage();
//             break;
//         case 'health.html':
//             initializeHealthPage();
//             break;
//     }
// });

// // Close modals when clicking outside
// window.addEventListener('click', (event) => {
//     if (event.target.classList.contains('modal')) {
//         event.target.style.display = 'none';
//     }
// });

// // Export functions for global use
// window.showAlert = showAlert;
// window.formatCurrency = formatCurrency;
// window.formatDate = formatDate;
// window.formatDateTime = formatDateTime;
// window.openModal = openModal;
// window.closeModal = closeModal;
// window.switchTab = switchTab;
// window.logout = logout;