import express from 'express';
import { validatePizza,validateColor } from './my-validators.js';

const app = express();
const PORT = 3000;

//Task 2: Middleware
app.use(express.static('public',{index:false}));
app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.get('/', validateColor, (req, res) => {

    res.render('index', {
        color: res.locals.color
    });

});

// Task 4: Handle pizza orders
app.post('/orders', validatePizza, (req, res) => {
   if (res.locals.errors.length === 0) {

        // Display success page
        res.render('success', {
            name: req.body.name,
            email: req.body.email
        });

    } else {

        // Display error page
        res.status(422).render('error', {
            errors: res.locals.errors
        });

    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
