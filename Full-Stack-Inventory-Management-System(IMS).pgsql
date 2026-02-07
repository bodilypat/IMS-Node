Full-Stack-Inventory-Management-System(IMS)
├── backend(Node.js)
│   ├── app/
│   │   ├── main.py                            
│   │   ├── __init__.py
│   │   │
│   │   ├── controllers/                                
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── supplier.controller.js
│   │   │   ├── transaction.controller.js
│   │   │   ├── report.controller.js
│   │   │   └── dashboard.controller.js
│   │   │              
│   │   ├── models/                             
│   │   │   ├── 
│   │   │   ├── user.model.js
│   │   │   ├── product.model.js
│   │   │   ├── supplier.model.js
│   │   │   ├── transaction.model.js
│   │   │   └── 
│   │   │
│   │   ├── routes/                           
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── supplier.routes.js
│   │   │   ├── transaction.routes.js
│   │   │   ├── report.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── middleware/                           
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js 
│   │   │   ├── 
│   │   │   └── notFound.middleware.js
│   │   │          
│   │   ├── config/                             
│   │   │   ├── db.js
│   │   │   ├── 
│   │   │   ├── 
│   │   │   └── 
│   │   ├── app.js                             
│   │   └── server.js                      
│   │                         
│   ├── tests/                                 
│   │   └── users/
│   │       └── 
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   ├── alembic.ini
│   └── README.md
│   
├── frontend/ (React • JavaScript • HTML • CSS)
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── config/                                # App-wide configuration
│   │   │   ├── env.js
│   │   │   ├── roles.js
│   │   │   └── routes.js
│   │   ├── api/                                   # Feature-based API layer
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── purchases.js
│   │   │   ├── sales.js
│   │   │   ├── vendors.js
│   │   │   ├── customers.js
│   │   │   └── reports.js
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   ├── components/                            # Reusable UI & composed components
│   │   │   ├── common/                            # Dumb UI components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── ErrorFallback.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── forms/                             # Form compositions (use Formik/React Hook Form)
│   │   │   │   ├── AuthForm.jsx
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── PurchaseForm.jsx
│   │   │   │   ├── SaleForm.jsx
│   │   │   │   ├── VendorForm.jsx
│   │   │   │   └── CustomerForm.jsx
│   │   │   ├── tables/                            # Table compositions / row renderers
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── PurchaseTable.jsx
│   │   │   │   ├── SaleTable.jsx
│   │   │   │   ├── VendorTable.jsx
│   │   │   │   └── CustomerTable.jsx
│   │   │   └── cards/
│   │   │       ├── AuthTable.jsx
│   │   │       └── StartCard.jsx
│   │   ├── pages/                                # Route-level pages (feature grouped)
│   │   │   ├── auth/    
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ResetPassword.jsx             
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductsList.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── ProductDetial.jsx
│   │   │   ├── suppliers/
│   │   │   │   ├── SupplierList.jsx
│   │   │   │   └── AddSuppliers.jsx
│   │   │   ├── stock/
│   │   │   │   ├── StockReceiving.jsx
│   │   │   │   └── StockDispatch.jsx
│   │   │   └── sales/
│   │   │       └── Sales.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ProductContext.jsx
│   │   │   ├── PurchaseContext.jsx
│   │   │   ├── SaleContext.jsx
│   │   │   └── InventoryContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   ├── useDebounce.js
│   │   │   └── usePermissions.js
│   │   ├── services/   
│   │   │   ├── axios.js                     # Axios setup
│   │   │   └── token.service.js
│   │   ├── utils/                       
│   │   │   ├── formatter.js
│   │   │   ├── validators.js
│   │   │   ├── permissions.js
│   │   │   └── constants.js
│   │   ├── styles/                         
│   │   │   ├── bootstrap.min.css
│   │   │   ├── validables.css
│   │   │   └── global.css
│   │   ├── Layouts/                         # Page Layouts
│   │   │   ├── AuthLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── routes/                          # App routes   
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoutes.jsx
│   │   ├── tests/                        
│   │   │   └── ProductTest.jsx
│   │   └── error/
│   │       └── ErrorBoundary.jsx
│   └──                   
├── .env                                        
├── requirements.txt                            
├── docker-compose.json                         
└── README.md                                  