document.addEventListener('DOMContentLoaded', () => {
    const burgerForm = document.getElementById('burger-form');
    const burgerNameInput = document.getElementById('burger-name');
    const ingredientsList = document.getElementById('ingredients-list');
    const burgersList = document.getElementById('burgers');
    
    const loadBurgers = () => {
        const burgers = JSON.parse(localStorage.getItem('burgers')) || [];
        burgersList.innerHTML = '';
        burgers.forEach((burger, index) => {
            const burgerItem = document.createElement('li');
            burgerItem.innerHTML = `
                <span>${burger.name} - ${burger.ingredients.join(', ')}</span>
                <div>
                    <button onclick="editBurger(${index})">Editar</button>
                    <button onclick="deleteBurger(${index})">Eliminar</button>
                </div>
            `;
            burgersList.appendChild(burgerItem);
        });
    };

    const saveBurger = (burger) => {
        const burgers = JSON.parse(localStorage.getItem('burgers')) || [];
        burgers.push(burger);
        localStorage.setItem('burgers', JSON.stringify(burgers));
        loadBurgers();
    };

    const deleteBurger = (index) => {
        const burgers = JSON.parse(localStorage.getItem('burgers')) || [];
        burgers.splice(index, 1);
        localStorage.setItem('burgers', JSON.stringify(burgers));
        loadBurgers();
    };

    window.deleteBurger = deleteBurger;

    const editBurger = (index) => {
        const burgers = JSON.parse(localStorage.getItem('burgers')) || [];
        const burger = burgers[index];
        burgerNameInput.value = burger.name;
        Array.from(ingredientsList.querySelectorAll('input')).forEach(input => {
            input.checked = burger.ingredients.includes(input.value);
        });
        deleteBurger(index);
    };

    window.editBurger = editBurger;

    burgerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const burgerName = burgerNameInput.value.trim();
        const ingredients = Array.from(ingredientsList.querySelectorAll('input:checked')).map(input => input.value);
        if (burgerName && ingredients.length) {
            saveBurger({ name: burgerName, ingredients });
            burgerForm.reset();
        } else {
            alert('Por favor, ingresa un nombre y selecciona al menos un ingrediente.');
        }
    });

    loadBurgers();
});
