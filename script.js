'use strict'
//let line ='22.1-45+1-2*23/5-23.2'
let line ='1+1+1';

const updateDisplay = (text)=>{
  const display = document.querySelector('.calculator__display');
  display.textContent = text;
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
        updateDisplay('hupsz! 0. helyen csak szám lehet...');
        [...line].forEach(char=>{ //végigmegyek minden karakteren
            if(!isNaN(char) || char==='.') //ha az aktális karakter szám
                number += char;
            else if(isOperator(char)){//ha nem szám, akkor lehet hogy operátor
                valueArray.push(parseFloat(number));
                number='';
                operatorArray.push(char);
            }else{//ha nem szám és nem operátor akkor hiba
                updateDisplay(`hupsz! ${i} helyen csak szám vagy operátor lehet...`);
            }
        });
        valueArray.push(parseFloat(number)); //az utolsó számot még hozzá kell adni (1-el több szám lesz mint operátor)
    return evaluate(valueArray,operatorArray);
}


const evaluate = (valueArray, operatorArray) => {
    let numberIndex = 0;
    let result = valueArray[numberIndex];
    operatorArray.forEach(operator=>{
        numberIndex ++;
        if(operator==='+')
            result += valueArray[numberIndex];
        else if(operator==='-')
            result -= valueArray[numberIndex];
        else if(operator==='*')
            result *= valueArray[numberIndex];
        else if(operator==='/')
            result /= valueArray[numberIndex];
    });
    return result;
}

const btnListener = (e)=>{

    console.log(e.target.textContent);
    const char = e.target.textContent.trim();
    if(char === 'C'){
        line = '';
        updateDisplay('');
    }
    else if(char==='='){
        updateDisplay(/*calculate(line).toString()*/'asdfasdf');
    }
    else{
        line+= char;
    }

    updateDisplay(line);
}

updateDisplay("line");
openListeners();