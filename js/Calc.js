

let display = document.querySelector('.dis');
let buttons = document.querySelectorAll('.numKeys');



const keys =
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.value === 'Ac') {
                display.value = '';
                return;
            }
            if (button.value === 'del') {
                display.value = display.value.slice(0, -1);
                return;
            }
            if (button.value === '=') {
                try {
                    display.value = eval(display.value);

                } catch {
                    display.value = 'Error';
                }
                return;
            }
            else {
                display.value += button.value;
            }
        });
    });

const submit = () => {
    try {
        display.value = eval(display.value);
        console.log(display.value);
    }
    catch {
        display.value = 'Error';
    }


}