var http = require('http');
var fs = require('fs');
var path = require('path');
var PORT = 2902 || process.env.PORT;
// var db = require('./mongo');
var db = require('./db');
var prod = require('./createProduct');
var usr = require('./createUser');
const {parse} = require('querystring');

var categoriesReceiveURL = ["/atara/women/categories.html","/atara/men/categories.html","/atara/boy/categories.html","/atara/girl/categories.html"];
var productsReceiveURL = ["/atara/women/products/","/atara/men/products/","/atara/boy/products/","/atara/girl/products"];
var otherCounter = 0;
var needMongo = 0;

const forWho = ['women','men','boy','girl'];

http.createServer(async function (request, response) {    
    var filePath = '.' + request.url;   
    // console.log(`BEFORE: ${request.url}`);
    // console.log(request.method);

    if(request.method == "GET"){
        if(request.url.search("getAllProductsForCategories") > 0){ 
            needMongo = 1;
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end("got products", 'utf-8');
        }
        else{
            if(request.url  == "/user/getAllProducts"){
                needMongo = 1;
                const prod = db.getProducts();
                prod.then((res)=>{
                    if(res){
                        const send = JSON.stringify(res);
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(send, 'utf-8'); 
                    }else{
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end("error", 'utf-8');
                    }                
                }).catch(e=>console.log(e));
            }
            else{
                if(request.url == "/user/getAllOrders"){
                    needMongo = 1;
                    const ords = db.getAllOrders();
                    ords.then((res)=>{
                        if(res){
                            const send = JSON.stringify(res);
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.end(send, 'utf-8'); 
                        }
                        else{
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.end("no orders", 'utf-8'); 
                        }       
                    }).catch(e=>console.log(e));           
                }
                else{
                    if(request.url.search(" CEVA ")>=0){
                        needMongo = 1;
                        // response.writeHead(200, { 'Content-Type': 'application/json' }); 
                        // response.write("ceva", 'utf-8');
                        // response.end();
                    }
                    else{
                        if(request.url.search("getAllUsers")>=0){
                            needMongo = 1;
                            const usrs = db.getUsers();
                            usrs.then((users)=>{
                                if(users){
                                    const send = JSON.stringify(users);
                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                    response.end(send, 'utf-8'); 
                                }
                                else{
                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                    response.end("no users", 'utf-8'); 
                                } 
                            });
                        }
                        else{
                            if(request.url.search("getOrders")>=0){
                                needMongo = 1;
                                var email = request.url.split("/");
                                email = email[email.length - 1];
                                var orders = db.getOrders(email);
                                orders.then((ord)=>{
                                    if(ord){
                                        const send = JSON.stringify(ord);
                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                        response.end(send, 'utf-8'); 
                                    }
                                    else{
                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                        response.end("no orders", 'utf-8'); 
                                    } 
                                });                         
                            }
                            else{
                                if(request.url.search("getUserData")>=0){
                                    needMongo = 1;
                                    var email = request.url.split("/");
                                    email = email[email.length-1];
                                    const usr = db.findUser(email);
                                    usr.then((res)=>{
                                        const send = JSON.stringify(res);
                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                        response.end(send, 'utf-8'); 
                                    });
                                }
                                else{
                                    if(request.url.search(" CEVA ")>=0){
                                        needMongo = 1;
                                    }
                                    else{
                                        if(request.url.search("getFavorites")>=0){
                                            needMongo = 1;
                                            var email = request.url.split("/");
                                            email = email[email.length-1];
                                            const fav = db.getFavorites(email);
                                            fav.then((favorites)=>{
                                                if(favorites){
                                                    const send = JSON.stringify(favorites);
                                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                                    response.end(send, 'utf-8'); 
                                                }
                                                else{
                                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                                    response.end("no favorites", 'utf-8'); 
                                                } 
                                            });
                                        }
                                        else{
                                            if(request.url.search("getAddresses")>=0){
                                                needMongo = 1;
                                                var email = request.url.split("/");
                                                email = email[email.length-1];
                                                const adr = db.getAddresses(email);
                                                adr.then((addresses)=>{
                                                    if(addresses){
                                                        const send = JSON.stringify(addresses);
                                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                                        response.end(send, 'utf-8'); 
                                                    }
                                                    else{
                                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                                        response.end("no addresses", 'utf-8'); 
                                                    } 
                                                });
                                            }
                                            else{
                                               needMongo = 0;
                                                //html
                                                //home
                                                if (filePath == './' || filePath == './atara.html') {
                                                    filePath = '../front/html/index.html';    
                                                    categroriesCounter = 0;
                                                    productsCounter = 0;    
                                                } 
                                                else{
                                                    if(path.extname(filePath) == '.html'){
                                                        var ok = 0;
                                                        //categories
                                                        for(i=0;i<categoriesReceiveURL.length;i++){
                                                            if(request.url == categoriesReceiveURL[i]){
                                                                filePath = "../front/html/categorii/women.html";
                                                                ok = 1;
                                                                categroriesCounter = 1;
                                                                break;
                                                            }
                                                        }
                                                        //afisare produse
                                                        for(i=0;i<productsReceiveURL.length;i++){
                                                            var poz = 0;
                                                            poz = request.url.search(productsReceiveURL[i]);
                                                            if(poz >= 0){
                                                                filePath = "../front/html/afisare_produse/women/women_jeans.html";
                                                                ok = 1;
                                                                otherCounter = 1; 
                                                                break;
                                                            }
                                                        }
                                                        //fav + cart + user + admin
                                                        if(ok==0){
                                                            filePath = '../front/html'+request.url;
                                                            categroriesCounter = 0;
                                                            otherCounter = 0; 
                                                        }
                                                    }
                                                    else{ //css + images + js 
                                                        if(otherCounter == 1){
                                                            filePath = "../front" + request.url;
                                                        }
                                                        else{
                                                            filePath = '../front'+request.url;  
                                                        }    
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else{
        if(request.method == "POST"){
            needMongo = 1;
            if(request.url.search("addUser")>=0){
                var body = '';
                request.on('data', function (chunk) {
                    body += chunk;
                });                
                request.on("end", ()=>{
                    body = JSON.parse(body);
                    db.createUser(body).then((res)=>{
                        if(res === "exists"){
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write("exists");
                            response.end(); 
                        }
                        else{
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write("added user");
                            response.end();   
                        }
                    });                 
                }); 
            }
            else{
                if(request.url.search("addProductToCart")>=0){
                    var body = '';
                    request.on('data', function (chunk) {
                        body += chunk;
                    });                
                    request.on("end", ()=>{
                        body = JSON.parse(body);
                        db.addProductToCart(body.email, body.name, body.color, body.size);
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.write("added to cart");
                        response.end();                    
                    }); 
                }
                else{
                    if(request.url.search("addProductFromCategoriesToCart")>=0){
                        body = '';
                        request.on('data', function (chunk) {
                            body += chunk;
                        });                
                        request.on("end", ()=>{
                            body = JSON.parse(body);
                            console.log(body);
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(body));
                            response.end();
                        });
                    }
                    else{
                        if(request.url.search("addProduct")>=0){
                            var body = '';
                            request.on('data', function (chunk) {
                                body += chunk;
                            });                
                            request.on("end", ()=>{
                                body = JSON.parse(body);
                                var hcolors = body.hex_colors.split(","); 
                                var scolors = body.string_colors.split(",");
                                var sizes = body.size.split(",");
                                const product = prod.createProduct("img_for_product", body.for, body.category, body.name, parseInt(body.price), hcolors, scolors, sizes);
                                db.addProduct(product).then((res)=>{
                                    console.log(res);
                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                    response.write(JSON.stringify(product));
                                    response.end();
                                });                    
                            });               
                        }
                        else{
                            if(request.url.search("updateProduct")>=0){
                                var body = '';
                                request.on('data', function (chunk) {
                                    body += chunk;
                                });                
                                request.on("end", ()=>{
                                    body = JSON.parse(body);
                                    var updatedProduct = {
                                        img: body.img,
                                        forWho: body.for,
                                        category: body.category,
                                        name: body.name,
                                        price: parseInt(body.price),
                                        hex_colors: body.hex_colors,
                                        string_colors: body.string_colors,
                                        sizes: body.size
                                    };
                                    db.updateProduct(body.name_before,updatedProduct);                
                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                    response.write("product updated");
                                    response.end();
                                });      
                            }
                            else{
                                if(request.url.search("updateUser")>=0){
                                    var body = '';
                                    request.on('data', function (chunk) {
                                        body += chunk;
                                    });                
                                    request.on("end", ()=>{
                                        body = JSON.parse(body);
                                        var updatedUser = {
                                            first_name: body.first_name,
                                            last_name: body.last_name,
                                            email: body.email,
                                            password: body.password
                                        }
                                        db.updateUser(body.email_before,updatedUser);                 
                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                        response.write("user updated");
                                        response.end();
                                    });
                                }
                                else{
                                    if(request.url.search("updateAddress")>=0){
                                        var body = '';
                                        request.on('data', function (chunk) {
                                            body += chunk;
                                        });                
                                        request.on("end", ()=>{
                                            body = JSON.parse(body); 
                                            var addr = {
                                               user_name: body.user_name,
                                               street: body.street,
                                               country: body.country,
                                               city: body.city,
                                               postal_code: body.postal_code,
                                               phone_number: body.phone_number,
                                               user_id: body.user_id 
                                            }
                                            db.updateAddress(body._id,addr);  
                                            response.writeHead(200, { 'Content-Type': 'application/json' });
                                            response.write("user updated");
                                            response.end();
                                        });
                                    }
                                    else{
                                        if(request.url.search("checkUser")>=0){
                                            var body = '';
                                            request.on('data', function (chunk) {
                                                body += chunk;
                                            });                
                                            request.on("end", ()=>{
                                                body = JSON.parse(body); 
                                                db.findUser(body.email).then((res)=>{
                                                    if(res.password != body.password){
                                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                                        response.write("wrong password");
                                                        response.end(); 
                                                    }
                                                    else{
                                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                                        response.write("user found");
                                                        response.end();
                                                    }
                                                }).catch(e=>{
                                                    response.writeHead(200, { 'Content-Type': 'application/json' });
                                                    response.write("no user found");
                                                    response.end();
                                                });
                                                
                                            });
                                        }
                                        else{
                                            if(request.url.search("resetPassword")>=0){
                                                var body = '';
                                                request.on('data', function (chunk) {
                                                    body += chunk;
                                                });                
                                                request.on("end", ()=>{
                                                    body = JSON.parse(body);
                                                    db.resetPassword(body.email,body.password).then((res)=>{
                                                        if(res === "no user"){
                                                            response.writeHead(200, { 'Content-Type': 'application/json' });
                                                            response.write("no user");
                                                            response.end();
                                                        }
                                                        else{
                                                            response.writeHead(200, { 'Content-Type': 'application/json' });
                                                            response.write("Password changed");
                                                            response.end();
                                                        }
                                                    }).catch(e=>{
                                                        response.writeHead(200, { 'Content-Type': 'application/json' });
                                                        response.write("no user");
                                                        response.end();
                                                    });
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else{
            if(request.method == "DELETE"){
                needMongo = 1;
                if(request.url.search("deleteProductFromFavorites")>=0){
                    var body = '';
                    request.on('data', function (chunk) {
                        body += chunk;
                    });                
                    request.on("end", ()=>{ 
                        body = JSON.parse(body);  
                        db.deleteFromFavorites(body.email, body.name);              
                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.write("deleted product");
                        response.end();
                    });   
                }
                else{
                    if(request.url.search("deleteProduct")>=0){
                        var body = '';
                        request.on('data', function (chunk) {
                            body += chunk;
                        });                
                        request.on("end", ()=>{ 
                            db.deleteProduct(body);                 
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write("deleted product");
                            response.end();
                        });   
                    }
                    else{
                        if(request.url.search("deleteUser")>=0){
                            var body = '';
                            request.on('data', function (chunk) {
                                body += chunk;
                            });                
                            request.on("end", ()=>{
                                db.deleteUser(body.trim());         
                                response.writeHead(200, { 'Content-Type': 'application/json' });
                                response.write("deleted user");
                                response.end();
                            });   
                        }
                    }
                }
            }
        }
    }

    // console.log(`AFTER: ${filePath} \n`);
        
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
        if(needMongo == 0){
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
        }
    });

}).listen(PORT);

console.log(`Server running at ${PORT}...`);
