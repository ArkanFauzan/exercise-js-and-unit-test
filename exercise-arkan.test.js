const Bmi = require('./exercise-arkan');

test('BMI Calculation', () => {
    expect(Bmi.calculateBMI(170, 50)).toBeCloseTo(17.3);
    expect(Bmi.calculateBMI(170, 60)).toBeCloseTo(20.8);
    expect(Bmi.calculateBMI(170, 75)).toBeCloseTo(26.0);
    expect(Bmi.calculateBMI(170, 90)).toBeCloseTo(31.1);
});

test('BMI Category', () => {
    expect(Bmi.categoryBMI(Bmi.calculateBMI(170, 50))).toEqual("underweight");
    expect(Bmi.categoryBMI(Bmi.calculateBMI(170, 60))).toEqual("normal");
    expect(Bmi.categoryBMI(Bmi.calculateBMI(170, 75))).toEqual("overweight");
    expect(Bmi.categoryBMI(Bmi.calculateBMI(170, 90))).toEqual("obesity");
});