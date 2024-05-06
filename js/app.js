let tablePanier = [];
const contenu = document.querySelector('#contenu');
const card_panier = document.querySelector('#card_panier');
const formulaire = document.querySelector('#formulaire');
const facture = document.querySelector('#facture');
let tableProduit = [
    {
        id: 1,
        image: 'img/image1.jpg',
        libelle : 'Mackbook Pro',
        prix : 300000,
        stock: 10
    },
    {
        id: 2,
        image: 'img/image2.jpg',
        libelle : 'Dell Pro',
        prix : 200000,
        stock: 15
    },
    {
        id: 3,
        image: 'img/image3.jpg',
        libelle : 'HP ',
        prix : 350000,
        stock: 11
    },
    {
        id: 4,
        image: 'img/image4.jpg',
        libelle : 'Mackbook ',
        prix : 250000,
        stock: 13
    },
    {
        id: 5,
        image: 'img/image5.jpg',
        libelle : 'Jeu video ',
        prix : 250000,
        stock: 20
    }
];


function loadProduct() {
    contenu.innerHTML = '';
    for (let index = 0; index < tableProduit.length; index++) {
        const element = tableProduit[index];
        contenu.innerHTML += `
       
        <div  class="card col-md-3 " style="width: 18rem;">
        <img class="card-img-top" src="${element.image}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text" > Nom : <b>${element.libelle}</b></p>
          <p class="card-text" >Prix : <b class="text-primary">${element.prix} € </b></p>
          <p class="card-text">Stock : <b>${element.stock} </b></p>
        </div>
        <button class=" btn  btn-outline-primary" onclick="addCart('${element.id}')">AJouter au panier</button>
      </div>
        `
    }
}

function addCart(productId) {
    const product = tableProduit.find(p => p.id == parseInt(productId)); 
    
    if (product && product.stock > 0) { 
        tablePanier.push(product.id); 
        product.stock--; 
        
        document.getElementById("count").innerHTML = tablePanier.length; 
        loadProduct(); 
    } else {
        console.error("Stock insuffisant ou produit introuvable."); 
    }
}

//Fontion pour supprimer
function supprime(index) {
    a = window.confirm("voulez vous vraiment supprimer")
    if (a == true) {
        tablePanier.splice(index, 1);
        showCart();
    }
    else{
        showCart();
    }
    
}
function showCart() {
    // for (let index = 0; index < tablePanier.length; index++) {
    //     const element = tablePanier[index];
    //     let product = tableProduit.find(a => a.id == element)
    // }
    card_panier.innerHTML = '';
    //document.getElementById("count").innerHTML=tablePanier.length
    if (tablePanier.length === 0) {
        card_panier.innerHTML = '<p>Le panier est vide.</p>';
        return;
    }
    let cartContent = `
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Libellé</th>
                <th>Prix</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;
    total = 0;
    tablePanier.forEach((productId, index) => {
        const product = tableProduit.find(p => p.id == productId);
        
        if (product) {
            cartContent += `
                <tr>
                    <td>${index + 1}</td> 
                    <td><img src="${product.image}" style="width: 50px; height: 50px;"></td> 
                    <td>${product.libelle}</td> 
                    <td>${product.prix} €</td> 
                    <td>
                
                    <a href="javascript:void(0)" onclick="supprime(${index})">
                        <i class="bi bi-trash" style="font-size: 24px; color: red;"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="editItem(${index})">
                    <i class="bi bi-pencil-square" style="font-size: 24px; color: blue;"></i>
                    </a>
                    </td>
                </tr>
            `;
            total = total + product.prix
        }
    });

    cartContent += `
            <tr>
            <td colspan="3"><strong>Total du panier</strong></td>
            <td colspan="2"><strong>${total} FCFA</strong></td> 
            <td><button type="button" class="btn btn-success" onclick="forme()" >Valider</button></td>
            </tr>
            <tr>
            
            </tr>
            </tbody>
        </table>
    `;

    card_panier.innerHTML = cartContent;

}

function forme() {
    $('#panier').modal('hide'); 
    $('#formulaire').modal('show');
    
}
function fact() {
  
    $('#formulaire').modal('hide'); 
    $('#facture').modal('show'); 
    informations();
 
}

function informations() {
    let infoHTML = document.getElementById("information")
    let boutiquehtml = document.getElementById("boutique")
    prenom = document.getElementById("prenom").value;
    nom = document.getElementById("nom").value;
    adresse = document.getElementById("adresse").value;
    date = document.getElementById("date").value;
    infoHTML.innerHTML = '';
    infoHTML.innerHTML += `
        <tr>
            <td>Prenom</td>
            <td>Nom</td>
            <td>Adresse</td>
            <td>Date Naissance</td>
        </tr>
    `;
        let ligne = infoHTML.insertRow(-1);
        ligne.innerHTML = `
            <td>${nom}</td>
            <td>${prenom}</td>
            <td>${adresse}</td>
            <td>${date}</td>
            
        `;
    


    boutiquehtml.innerHTML = '';
    if (tablePanier.length === 0) {
        boutiquehtml.innerHTML = '<p>Le panier est vide.</p>';
        return;
    }
    let cartContent = `
    <table class="table">
        <thead>
            <tr>
                <th>Libellé</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
    `;
    total = 0;
    tablePanier.forEach((productId, index) => {
        const product = tableProduit.find(p => p.id == productId);
        
        if (product) {
            cartContent += `
                <tr>
                    <td>${product.libelle}</td> 
                    <td>${product.prix} €</td> 
                </tr>
            `;
            total = total + product.prix
        }
    });

    cartContent += `
            <tr>
            <td colspan="3"><strong>Total </strong></td>
            <td colspan="2"><strong>${total} FCFA</strong></td> 
            </tr>
            </tbody>
        </table>
    `;

    boutiquehtml.innerHTML = cartContent;


}
function downloadFacture() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yOffset = 20;
    doc.setFontSize(22); 
    doc.text("Facture", 20, yOffset);
    yOffset += 20;
    doc.setFontSize(14); 
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const adresse = document.getElementById("adresse").value;
    const date = document.getElementById("date").value;
    doc.text(`Prénom : ${prenom}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Nom : ${nom}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Adresse : ${adresse}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Date de Naissance : ${date}`, 20, yOffset);
    yOffset += 20;
    doc.setFontSize(12); 
    let total = 0;
    doc.text("Produits achetés :", 20, yOffset);
    yOffset += 10;
    tablePanier.forEach(productId => {
        const product = tableProduit.find(p => p.id === productId);
        if (product) {
            doc.text(`${product.libelle} - Prix : ${product.prix} FCFA`, 20, yOffset);
            yOffset += 10;
            total += product.prix; 
        }
    });
    yOffset += 10; 
    doc.setFontSize(14); 
    doc.text(`Total : ${total} FCFA`, 20, yOffset);
    doc.save("facture.pdf");
}

function editItem(index) {
    const productInCart = tablePanier[index];

    const newQuantity = parseInt(
        prompt("Entrez la nouvelle quantité:", productInCart.quantity)
    );

    if (!isNaN(newQuantity) && newQuantity > 0) {
        // Ajuster le stock en fonction de la différence
        const difference = newQuantity - productInCart.quantity;
        const product = tableProduit.find(p => p.id === productInCart.id);

        if (product && product.stock >= difference) {
            product.stock -= difference;
            productInCart.quantity = newQuantity; // Mettre à jour la quantité dans le panier
            showCart();
        } else {
            console.error("Stock insuffisant pour cette quantité.");
        }
    }
}



