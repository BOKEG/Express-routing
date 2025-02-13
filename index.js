const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check working hours (Monday to Friday, 9 AM - 5 PM)
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Allow access
    } else {
        res.send('<h1>Sorry, the website is only available during working hours (Monday to Friday, 9 AM - 5 PM).</h1>');
    }
};

// Use middleware
app.use(checkWorkingHours);

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Welcome to our homepage!' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services', message: 'Here are our services.' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us', message: 'Get in touch with us!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
