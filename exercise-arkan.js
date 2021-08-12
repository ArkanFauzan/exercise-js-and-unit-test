const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// using cors middleware
app.use(cors());

app.use(express.json())

/*
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Exercise 9   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
function calculateBMI(height, weight){
    let heightInMeter = height<10 ? height : height/100;
    let bmi = weight/(heightInMeter**2);
    return Math.round(bmi*10)/10; // to get 1 decimal place
}

function categoryBMI(BMI) {
    if(BMI<18.5){
        return "underweight";
    }
    else if(BMI<25){
        return "normal";
    }
    else if(BMI<30){
        return "overweight";
    }
    else{
        return "obesity";
    }
}

let family = [
    {
        name: "Arkan",
        height: 1.66,
        weight: 53
    },
    {
        name: "Ayah",
        height: 1.60,
        weight: 56
    },
    {
        name: "Ibu",
        height: 1.56,
        weight: 80
    },
    {
        name: "Adik",
        height: 1.67,
        weight: 55
    }
];

let familyWithBMI = [];

for (let data of family) {
    const {height, weight, name} = data;
    let bmi = calculateBMI(height, weight).toFixed(1);
    let bmiCategory = categoryBMI(bmi);

    familyWithBMI.push({
        name,
        height,
        weight,
        bmi,
        bmiCategory
    })
}

console.log(JSON.stringify(familyWithBMI));
console.log();

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~    Exercise 10, 11, dan 12   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

app.get('/',(req,res)=>{
    res.send('to use this API: request = post, body: name,height,weight (height in scm & weight in kg)')
})

app.get('/profile',(req,res)=>{
    res.json(family);
});

app.get('/bmi', (req, res)=>{
    if (req.query.name!=undefined && req.query.height!=undefined && req.query.weight!=undefined) {
        let bmi = calculateBMI(req.query.height, req.query.weight).toFixed(1);
        let bmiCategory = categoryBMI(bmi);

        res.json({
            name : req.query.name,
            height : parseFloat(req.query.height),
            weight : parseFloat(req.query.weight),
            bmi: parseFloat(bmi),
            bmiCategory
        })
    }else{
        res.json(familyWithBMI);
    }
});

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~    Exercise 12 input from body   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

app.post('/bmi', (req, res)=>{
    if (req.body.name!=undefined && req.body.height!=undefined && req.body.weight!=undefined) {
        let bmi = calculateBMI(req.body.height, req.body.weight).toFixed(1);
        let bmiCategory = categoryBMI(bmi);
        let height = req.body.height<10 ? req.body.height*100 : req.body.height;

        res.json({
            name : req.body.name,
            height : parseFloat(height),
            weight : parseFloat(req.body.weight),
            bmi: parseFloat(bmi).toFixed(1),
            bmiCategory
        })
    }else{
        res.json(familyWithBMI);
    }
})

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Exercise 13 convert currency    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const rateCurrencyIdrBase = {
    // 1 ... berapa idr
    idr: 1,
    jpy: 131.07,
    myr: 3428.12,
    usd: 14488.95,
    sgd: 10652.35
}

function convertCurrency(sourceCurr, amountCurr, targetCurr) {
    let idr = amountCurr * rateCurrencyIdrBase[sourceCurr.toLowerCase()];
    return (idr/rateCurrencyIdrBase[targetCurr.toLowerCase()]).toFixed(5);
}

app.post('/exchange',(req, res)=>{
    const {sourceCurrency, sourceAmount, targetCurrency} = req.body;
    
    if (sourceCurrency!=undefined && sourceAmount!=undefined && targetCurrency!=undefined) {
        const targetAmount = convertCurrency(sourceCurrency,sourceAmount,targetCurrency);
        res.json({
            sourceCurrency, sourceAmount, targetCurrency, targetAmount
        })
    }
    else{
        res.send()
    }
    return
})

app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}}`)
})
 
module.exports={
    calculateBMI, categoryBMI
}