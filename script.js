// Fonction pour se connecter à l'API et récupérer les données de rabais
async function fetchDiscounts() {
    try {
        const response = await fetch('https://api.intern.migros.net/discounts?facet_sort=category&facet_sort_order=asc&limit=10&offset=0&order=asc&sort=price&region=gmge&view=browse&custom_image=false&exclude_national=false&special_advertisements=false', {
            headers: {
                'accept': 'application/json',
                'api-version': '8',
                'accept-language': 'fr',
                'Authorization': 'Basic ' + btoa('capm:!zvo~9kpH!MluFgl')  // Remplace avec tes identifiants
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        displayDiscounts(data.discounts);
    } catch (error) {
        console.error('Erreur lors de la récupération des rabais :', error);
    }
}

// Fonction pour afficher les rabais sur la page
function displayDiscounts(discounts) {
    const discountList = document.getElementById('discount-list');
    discountList.innerHTML = '';  // Nettoyer la liste précédente

    discounts.forEach(discount => {
        const discountItem = document.createElement('div');
        discountItem.classList.add('discount-item');

        const img = document.createElement('img');
        img.src = discount.image.original;
        discountItem.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = discount.description;
        discountItem.appendChild(name);

        const price = document.createElement('p');
        price.innerHTML = `<strong>Prix:</strong> ${discount.price} CHF (au lieu de ${discount.original_price} CHF)`;
        discountItem.appendChild(price);

        const discountAmount = document.createElement('p');
        discountAmount.innerHTML = `<strong>Rabais:</strong> ${discount.discount_amount}`;
        discountItem.appendChild(discountAmount);

        const period = document.createElement('p');
        period.innerHTML = `<strong>Période:</strong> du ${new Date(discount.start_date).toLocaleDateString()} au ${new Date(discount.end_date).toLocaleDateString()}`;
        discountItem.appendChild(period);

        discountList.appendChild(discountItem);
    });
}

// Charger les rabais au chargement de la page
window.onload = fetchDiscounts;
