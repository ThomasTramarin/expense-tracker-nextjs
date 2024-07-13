# Expense Tracker Next.js

Expense Tracker is a web application built with Next.js that allows you to easily track your expenses.

## Features

- **Transaction Logging:** Add new transactions with title, amounts,  type, category and dates.
- **Transaction Viewing:** View a list of added expenses and incomes with the ability to filter and sort.
- **Charts and Statistics:** View charts to get a visual overview of your spending habits.

## How to install

To get started with the Expense Tracker, follow these steps:

1. **Clone The Repository:** 

In the folder where you want to clone the project open the terminal and write:

```
git clone https://github.com/ThomasTramarin/expense-tracker-nextjs.git
```

2. **Install dependencies:** 

Now move to the folder created and write:

```
npm install
```

3. **Setup enviroment variables:**

In the root folder of the project create new file called `.env.local` and write this inside it:

```
NEXT_AUTH_SECRET=your_secret_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

4. **Start xampp:**

Open xampp and start Apache and Mysql, then go to http://localhost/phpmyadmin/

5. **Create Database and tables:**

Write these queries:

```
CREATE DATABASE expense_tracker_nextjs

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
  transactionID INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type ENUM("income", "expense") NOT NULL,
  amount FLOAT NOT NULL,
  category VARCHAR(100) NOT NULL,
  transactionDate DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

6. **Now you can start nextjs:**

In the project folder write this:

```
npm run dev
```
