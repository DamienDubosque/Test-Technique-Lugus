let httpRequest = new XMLHttpRequest();


httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
        let results = JSON.parse(httpRequest.response);
        let variants = results.product.variants;
        console.log(results);

        const couleur = document.querySelector('.couleur').querySelectorAll('.color-center');
        console.log(couleur);

        couleur.forEach(e => {
            e.addEventListener('click', function () {
                couleur.forEach(couleurCenter => couleurCenter.classList.remove('active'));
                this.classList.add('active');
            })
        })

        for (let i = 0; i < variants.length; i++) {
            const taille = document.querySelector('.taille');
            const pointure = document.createElement('button');
            const sizes = document.querySelector('.taille').querySelectorAll('.pointure');
            console.log(sizes);
            const indispo = document.querySelector('.taille-out');
            const bouton = document.querySelector('.add');
            bouton.disabled = false;

            document.querySelector('.blue .color-center').addEventListener('click', ()=>{
                document.querySelector('img').src= "assets/shoes-blue.png";
            });
            document.querySelector('.yellow .color-center').addEventListener('click', ()=>{
                document.querySelector('img').src= "assets/shoes-yellow.png"
            });
            document.querySelector('.red .color-center').addEventListener('click', ()=>{
                document.querySelector('img').src= "assets/shoes-red.png"
            });
            if (variants[i].color === 'green') {
                document.querySelector('.green .color-center').addEventListener('click', ()=>{
                    document.querySelector('img').src= "assets/shoes-green.png";
                });
                pointure.innerHTML = variants[i].size;
                pointure.classList.add('pointure');
                taille.appendChild(pointure);
                if (variants[i].quantity === 0) {
                    pointure.classList.add('taille-out');
                }
            }
            if (variants[i].color === 'blue') {
                document.querySelector('.blue .color-center').addEventListener('click', ()=>{
                    document.querySelector('img').src= "assets/shoes-blue.png";
                });
                pointure.innerHTML = variants[i].size;
                if (variants[i].quantity === 0) {
                    pointure.classList.add('taille-out');
                }
            }

            sizes.forEach(e => {
                e.addEventListener('click', function () {
                    sizes.forEach(size => size.classList.remove('selected'));
                    this.classList.add('selected');
                    indispo.addEventListener('click', () => {
                        bouton.classList.add('btn-out');
                        bouton.innerHTML = "Out of Stock";
                        bouton.disabled = true;
                        bouton.style.cursor = 'not-allowed';
                    })
                    bouton.disabled = false;
                    bouton.classList.remove('btn-out');
                    bouton.innerHTML = "Add to cart";
                    bouton.style.cursor = 'pointer';
                })
            })
        }
        document.querySelector('h1').innerHTML = results.product.title;
        document.querySelector('.desc>p').innerHTML = results.product.description;
    }
};
httpRequest.open('GET', 'https://lugus-hiring.frb.io/product', true)
httpRequest.send()