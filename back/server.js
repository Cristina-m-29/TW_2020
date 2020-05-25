var http = require('http');
var fs = require('fs');
var path = require('path');
var PORT = 2902 || process.env.PORT;
var db = require('./mongo');
var prod = require('./createProduct');
var usr = require('./createUser');

/* PRODUCTS___________________________________________________ */
// var forWho="women";
// var product = prod.createProduct('blob:null/1586bb94-62f7-4cdd-a266-3662a62e92f9','jeans','jeans women one',78.99,["#000000"],["black"],["XS","S"]);
// db.addMongoProduct(forWho,product);

// const b = db.findProductByName("Stefan");
// b.then((bb)=>console.log(bb),()=>console.log("no product with that name found"))

// var productUpdate = prod.createUpdateProduct(product,'','',96,'#b3b3b3','gray','XL');
// db.updateProduct(forWho,product,productUpdate);

//get all products
// const prodList = db.getProducts("men");
// prodList.then((prod)=>{
//     console.log(prod);
// },()=>console.log("no products found")).catch(e=>console.log(e));

// db.deleteProduct(forWho, product.category, product.name);
/* _________________________________________________________ */

/* CATEGORIES_______________________________________________ */
//get categories
// db.getCategories("women").then((catList)=>{
//     console.log(catList);
// },()=>console.log("no categories found")).catch(e=>console.log(e));
/* _________________________________________________________ */

/* USERS____________________________________________________ */
// var user = usr.createUser("Monica","Mititelu","monica@yahoo.com","coolpass");
// db.addMongoUser(user);

// var userNameUpdate = usr.createUserNameUpdate(user,'Madalina','Plugariu');
// db.updateUserName(user.email,userNameUpdate);
// db.updateUserEmail(user.email, "plugariu@gmail.com");
// db.updateUserPass('plugariu@gmail.com',"parolaMadalina");
// db.deleteUser("plugariu@gmail.com");
/* _________________________________________________________ */

/* PRODUCT IN FAVORITES_____________________________________ */
// db.addProductToFavorites("mititelucristina@yahoo.com","men","jeans","Stefan",'red','S');

// async function getUser(email){
//     var user = await db.findUser(email);
//     console.log(user._id);
//     return user._id;
// }
// const userFav = getUser("mititelucristina@yahoo.com");

// async function getFavorites(id){
//     var fav = await db.getProductsFromFavorites(id);
// }

// const a = db.getProductsFromFavorites("mititelucristina@yahoo.com");
// a.then((bb)=>{console.log(bb);})

//delete from fav
// var favDelete = [];

// function deleteFromFav(){
//     return new Promise(async (solved,notSolved)=>{
        
//         const prodToDelete = db.findProductByName("Stefan");
//         prodToDelete.then((prod)=>{
//             console.log(prod._id);
//             favDelete[0]=prod._id;            
//         },()=>console.log("error"))
//         .catch(e=>console.log(e));
//         const res =  db.findUserByEmail("mititelucristina@yahoo.com");
//         res.then((found)=>{
//             console.log(found._id);
//             favDelete[1]=found._id;
//         },()=>console.log("not found"))
//         .catch(e=>console.log(e));
//         setTimeout(()=>{
//             if(favDelete.length == 2) solved(favDelete);
//             else notSolved();
//             },2000
//         );
//     });
// }

// function functionFavDelete(toDelete){    
//     db.deleteFromFavorites(toDelete[0],toDelete[1]);
// }

// const deleteFav = deleteFromFav();
// deleteFav.then((toDelete)=>{
//     console.log("delete");
//     functionFavDelete(toDelete);
// },()=>console.log("error"));

//only find from fav
// var findInFav = [];
// function findFromFavorites(productName, email){
//     return new Promise((found,notFound)=>{
//         const prodToFind = db.findProductByName(productName);
//         prodToFind.then((prod)=>{
//             findInFav[0] = prod._id;
//         })
//         .catch(e=>console.log(e));
//         const usr = db.findUserByEmail(email);
//         usr.then((userFound)=>{
//             findInFav[1] = userFound._id;
//         })
//         .catch(e=>console.log(e));
//         setTimeout(()=>{
//             if(findInFav.length == 2) {
//                 const prodInFav = db.findProductInFavorites(findInFav[0],findInFav[1]);
//                 prodInFav.then((prodFav)=>{
//                     found(prodFav);
//                 },()=>{notFound()});                
//             }
//             else notFound();
//         },2000)
//         });
// }
// const foundFav = findFromFavorites("Stefan","mititelucristina@yahoo.com");
// foundFav.then((res)=>{
//     console.log("Product found");
//     console.log(res);
// })
// .catch(e=>console.log(e));

//find from fav and add to cart
// const foundForCart = findFromFavorites("Stefan","mititelucristina@yahoo.com");
// foundForCart.then((res)=>{
//     const cartProd = {
//         user_id: res.user_id,
//         for: res.for,
//         product_id: res.product_id,
//         selected_color: res.selected_color,
//         selected_size: res.selected_size
//     }
//     console.log(cartProd);
//     db.addProductToCartFromFavorites(cartProd);
// });
/* _________________________________________________________ */

/* PRODUCT IN CART__________________________________________ */
//add product to cart
// db.addProductToCart("mititelucristina@yahoo.com","men","jeans","Stefan",'red','S');

//get all from cart
// const aaa = db.getProductsFromCart("mititelucristina@yahoo.com");
// aaa.then((bb)=>{console.log(bb);})

//detele from cart
// var findInCart = [];
// function deleteFromCart(productName, email){
//         console.log(productName);
//         console.log(email);
//         const prodToDelete= db.findProductByName(productName);
//         prodToDelete.then((prod)=>{
//             findInCart[0] = prod._id;
//         },()=>console.log("error"))
//         .catch(e=>console.log(e));
//         const usr = db.findUserByEmail(email);
//         usr.then((userFound)=>{
//             findInCart[1] = userFound._id;
//         },()=>console.log("not found"))
//         .catch(e=>console.log(e));
//         setTimeout(()=>{
//             if(findInCart.length == 2) {
//                 console.log(`Prod id: ${findInCart[0]}`);
//                 console.log(`User id: ${findInCart[1]}`);
//                 db.deleteFromCart(findInCart[0],findInCart[1]);
//             }
//         },2000);
// }
// deleteFromCart("Stefan","mititelucristina@yahoo.com");

/* _________________________________________________________ */

/* ADDRESS_________________________________________________ */

//add address
// function addNewAddress(email,fName, lName, street, nr, country, city, postalCode, phoneNr){
//     const usr = db.findUserByEmail(email);
//     usr.then((userFound)=>{
//         console.log(userFound._id);
//         db.addAddress(userFound._id, fName, lName, street, nr, country, city, postalCode, phoneNr)
//     },()=>console.log("not found"))
//     .catch(e=>console.log(e));
// }
// addNewAddress("plugariumadalina@yahoo.com","Madalina", "Plugariu", "Aleea Pacurari", 6, "Romania", "Iasi", 700537, "0773893753");

//get all addresses 
// const usrAddr = db.getAddresses("plugariumadalina@yahoo.com");
// usrAddr.then((addrList)=>{
//     console.log(addrList);
// },()=>console.log("no address found"))
// .catch(e=>console.log(e));

//find address
// const foundAdr = db.findAddress("mititelucristina@yahoo.com","Mititelu Monica");
// foundAdr.then((addr)=>{
//     console.log(addr);
// },()=>console.log("no address found"))
// .catch(e => console.log(e))

/* ________________________________________________________ */

/* ORDERS__________________________________________________ */

//add order
// db.findUserByEmail("mititelucristina@yahoo.com").then((usrFound)=>{
//     const d = new Date();
//     db.addOrder(usrFound._id, "Mititelu Cristina","cash",390.50, d.toDateString());
// },()=>console.log("no user found"))
// .catch(e=>console.log(e))

//get all orders
// const ordList = db.getOrders("mititelucristina@yahoo.com");
// ordList.then((ord)=>{
//     console.log(ord);
// },()=>console.log("no orders found"))
// .catch(e=>console.log(e));

/* ________________________________________________________ */
var html;
http.createServer(function (request, response) {    
    
    var filePath = '.' + request.url;   
    console.log(`BEFORE: ${request.url}`);

    //html
    if (filePath == './') {
        filePath = '../front/html/index.html';
        html="home";
    }
    else{
        //pagini de categorii
        if(request.url == "/front/html/women/categories.html"){
            request.url = "../front/html/categorii/women.html"
            filePath = request.url;
            html = "categories";
        }
        else
        if(request.url == "/front/html/men/categories.html"){
            request.url = "../front/html/categorii/women.html" ///need template
            filePath = request.url;
            html = "categories";
        }
        else
        if(request.url == "/front/html/boy/categories.html"){
            request.url = "../front/html/categorii/women.html"
            filePath = request.url;
            html = "categories";
        }
        else
        if(request.url == "/front/html/girl/categories.html"){
            request.url = "../front/html/categorii/women.html"
            filePath = request.url;
            html = "categories";
        }        
        else
        if(request.url == "front/html/women/products/jeans.html"){
            filePath = "../front/html/afisare_produse/women/women_jeans.html";
            html = "products";
        }
        else
        if(request.url == "front/html/men/products/jeans.html"){
            filePath = "../front/html/afisare_produse/women/women_jeans.html";
            html = "products";
        }
        else
        if(request.url == "front/html/boy/products/jeans.html"){
            filePath = "../front/html/afisare_produse/women/women_jeans.html";
            html = "products";
        }
        else
        if(request.url == "front/html/girl/products/jeans.html"){
            filePath = "../front/html/afisare_produse/women/women_jeans.html";
            html = "products";
        }
        else
        if(path.extname(filePath) == '.html')          
            filePath = '../front/html'+request.url;         
        else //others
            if(html == "categories" || html == "products"){
                filePath = '..' + request.url;
            }
            else
                filePath = '../front'+request.url;        
        }  
        console.log(`AFTER: ${filePath} \n`);
        
    var extname = String(path.extname(filePath)).toLowerCase();
    
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(PORT);

console.log(`Server running at ${PORT}...`);
