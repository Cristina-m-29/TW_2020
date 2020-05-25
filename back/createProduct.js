function product(img, cat, name, price, hex, strigs, size){
    var prod = {
        img:`${img}`,
        category:`${cat}`,
        name:`${name}`,
        price:price,
        hex_colors:hex,
        string_colors:strigs,
        sizes:size
    }
    return prod;
}

function productUpdate(product, img, name, price, hex, strings, size){
    var prod = product;
    if(img!= '') prod.img = img;
    if(name != '') prod.name = name;
    if(price != '') prod.price = price;
    var ok = 1;
    if(hex != ''){
        for(i=0;i<=prod.hex_colors.length;i++)
            if(prod.hex_colors[i] == hex) ok = 0;
        if(ok == 1){
            prod.hex_colors.push(hex);
        }
        ok=1;
    } 
    if(strings != ''){
        for(i=0;i<=prod.string_colors.length;i++)
            if(prod.string_colors[i] == strings) ok = 0;
        if(ok == 1){
            prod.string_colors.push(strings);
        }
        ok=1;
    } 
    if(size != ''){
        for(i=0;i<=prod.sizes.length;i++)
            if(prod.sizes[i] == size) ok = 0;
        if(ok == 1){
            prod.sizes.push(size);
        }
        ok=1;
    } 
    return prod;
}

function createFavorite(userId, cat, prodId, color, size){
    var prod = {
        user_id:userId,
        category:cat,
        product_id:prodId,
        selected_color:color,
        selecter_size:size
    }
    return prod;
}

module.exports ={
    createProduct: function(img, cat, name, price, hex, strigs, size){        
        const prod = product(img, cat, name, price, hex, strigs, size);
        return prod;
    },
    createUpdateProduct: function(product,img, name, price, hex, strings, size){        
        const prod = productUpdate(product,img, name, price, hex, strings, size);
        return prod;
    },
    createFavoriteProduct:function(userId, cat, prodId, color, size){
        const prod = createFavorite(userId, cat, prodId, color, size);
        return prod;
    }
}