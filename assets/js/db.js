function loadProducts(){
    if(localStorage.getItem('inventario') === null){ //si esta vacio
        const product = [{
            "id" : 1,
            "name":'hoodies',
            'price': 14.00,
            'image' : "./assets/images/hoodie.jpeg",
            'qty':12,
        },
        {   
            "id" : 2,
            "name":'shirts',
            'price': 14.00,
            'image' : "./assets/images/polo.jpeg",
            'qty':12
            
        },
        {
            "id" : 3,
            "name":'caps',
            'price': 14.00,
            'image' : "assets/imagenes/cap.jpeg",
            'stock':12

        }];
        
        localStorage.setItem('inventario', JSON.stringify(product));
        console.info('Base de datos cargada');
    }else{
        console.info('Base de datos existente...')
    }
}

loadProducts()