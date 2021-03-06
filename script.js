'use strict'
//let line ='22.1-45+1-2*23/5-23.2'
let line ='';

const updateInputDisplay = (text)=>{
  const display = document.querySelector('.display__input');
  display.innerHTML = text;
}

const updateResultDisplay = (text)=>{
    const display = document.querySelector('.display__result');
    display.innerHTML = text;
  }

const openListeners = () => {
    const btn = document.querySelectorAll('.div__btn');
    btn.forEach(item=>item.addEventListener('click', btnListener));
}

const isOperator=(char)=> char==='+' || char ==='-' || char ==='*' || char ==='/';

const calculate = (line) => {
    let valueArray = [];
    let operatorArray = [];
    let number='';
    if(isNaN(line[0])) 
        updateInputDisplay('Hiba');
        [...line].forEach(char=>{ //végigmegyek minden karakteren
            if(!isNaN(char) || char==='.') //ha az aktális karakter szám
                number += char;
            else if(isOperator(char)){//ha nem szám, akkor lehet hogy operátor
                const temp = parseFloat(number);
                if(isNaN(temp)){
                    updateInputDisplay('Hiba');
                }
                valueArray.push(temp);
                number='';
                operatorArray.push(char);
            }else{//ha nem szám és nem operátor akkor hiba
                updateInputDisplay('Hiba');
            }
        });
        valueArray.push(parseFloat(number)); //az utolsó számot még hozzá kell adni (1-el több szám lesz mint operátor)
    return evaluate(valueArray,operatorArray);
}

const doOpObj = {
    '+' : function(a,b) { return a + b },
    '-' : function(a,b) { return a - b },
    '*' : function(a,b) { return a * b },
    '/' : function(a,b) { return a / b },
}
const evaluate = (valueArray, operatorArray) => {
    let numberIndex = 0;
    let result = valueArray[numberIndex];
    operatorArray.forEach(operator=>{
    result = doOpObj[operator](result,valueArray[++numberIndex]);
    });
    return result;
}



const btnListener = (e)=>{
    const char = e.target.getAttribute('data')

    if(char === 'C'){ //törlés
       line = '';
       updateInputDisplay('');
       updateResultDisplay('');
    }
    else if(char==='='){//eredmény
        if(line.length > 1){
            updateResultDisplay(calculate(line).toString());
        }
        else{
            updateResultDisplay('');
        }
    }
    else{
        line+= char;
        updateInputDisplay(line);
    }
}
openListeners();

