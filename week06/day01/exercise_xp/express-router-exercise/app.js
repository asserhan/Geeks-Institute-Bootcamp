const express = require('express');
const app = express();
const port = 3000;


const indexRouter = require('./routes/index');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);


app.use((req, res, next) => {
    res.status(404).send('Page not found!');
});


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log('📝 Available routes:');
    console.log('   - http://localhost:3000/ (Homepage)');
    console.log('   - http://localhost:3000/about (About Us)');
    console.log('   - http://localhost:3000/contact (Contact)');
    console.log('   - http://localhost:3000/users (Users list)');
    console.log('   - http://localhost:3000/users/123 (User profile)');
});