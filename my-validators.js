import validator from 'validator';

export const validatePizza = (req, res, next) => {
    res.locals.errors = [];

    const validSauces = ['tomato', 'alfredo'];

    if (!validSauces.includes(req.body.sauce)) {
        res.locals.errors.push({
            field: 'sauce',
            message: 'Please select a valid sauce.'
        });
    }

    const validToppings = [
        'pepperoni',
        'ham',
        'vegetarian sausage',
        'mushrooms',
        'peppers',
        'olives'
    ];

    // getting the topping if it isnot selected then by OR it will be empty by default -- used ai for this also
    let toppings = req.body.toppings || [];

    if (!Array.isArray(toppings)) {
        toppings = [toppings];
    }

    if (toppings.length < 1 || toppings.length > 3) {
        res.locals.errors.push({
            field: 'toppings',
            message: 'Please select 1 to 3 toppings.'
        });
    }

    //Used ai to get the knowledge of how to check if every selected topping is valid or not as some one might cohsse one but not the other one 
    for (const topping of toppings) {
        if (!validToppings.includes(topping)) {
            res.locals.errors.push({
                field: 'toppings',
                message: 'Invalid topping selected.'
            });
            break;
        }
    }

    if (typeof req.body.name !== 'string')
        req.body.name = '';

    req.body.name = validator.trim(req.body.name);

    if (req.body.name.length < 3 ||
        req.body.name.length > 30) {

        res.locals.errors.push({
            field: 'name',
            message: 'Name must be 3 to 30 characters.'
        });
    }

    if (typeof req.body.email !== 'string' || !validator.isEmail(req.body.email)) {
        res.locals.errors.push({
            field: 'email',
            message: 'Please enter a valid email address.'
        });
    }
    next();
};

export const validateColor = (req, res, next) => {
    const color = req.query.color;
    if (typeof color === 'string' && validator.isHexColor(color))
        res.locals.color = color;
    else 
        res.locals.color = '#fffeed';
    next();
};