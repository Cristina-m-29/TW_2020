var http = require('http');
var fs = require('fs');
var path = require('path');
var PORT = 2902 || process.env.PORT;
var db = require('./mongo');
var prod = require('./createProduct');
var usr = require('./createUser');
const {parse} = require('querystring');

var categoriesReceiveURL = ["/atara/women/categories.html","/atara/men/categories.html","/atara/boy/categories.html","/atara/girl/categories.html"];
var productsReceiveURL = ["/atara/women/products/","/atara/men/products/","/atara/boy/products/","/atara/girl/products"];
var otherCounter = 0;
var needMongo = 0;



http.createServer(function (request, response) {    
    

    var filePath = '.' + request.url;   
    // console.log(`BEFORE: ${request.url}`);
    // console.log(request.method);

    if(request.method == "GET"){
        if(request.url.search("getCartProducts") > 0){ 
            needMongo = 1;
            // db.findProductByName("jeans one").then((prod)=>{
            //     console.log(prod);
            // },()=>console.log("error")).catch(e=>console.log(e));
            response.writeHead(200, { 'Content-Type': 'application/json' }); 
            response.write("get favorites", 'utf-8');
            response.end();
        }
        if(request.url.search("getAllProducts") > 0){
            needMongo = 1;
            var allProductsContor = 0;
            var allProducts = [];
            const women = db.getProducts('women');
            women.then((womenProducts)=>{
                console.log("WOMEN");
                if(womenProducts.length > 0){
                    allProducts += JSON.stringify(womenProducts); 
                }                  
                allProductsContor++;         
            },()=>{
                allProductsContor++;
                console.log("no women products");
            }).catch(e=>console.log(e));
            const men = db.getProducts('men');
            men.then((menProducts)=>{
                console.log("MEN");
                if(menProducts.length > 0){
                   allProducts += JSON.stringify(menProducts); 
                }                
                allProductsContor++;
            },()=>{
                allProductsContor++;
                console.log("no men products");
            }).catch(e=>console.log(e));
            const boy = db.getProducts('boy');
            boy.then((boyProducts)=>{
                console.log("BOY");
                if(boyProducts.length > 0){
                    allProducts += JSON.stringify(boyProducts);
                }                    
                allProductsContor++;
            },()=>{
                allProductsContor++;
                console.log("no boy products");
            }).catch(e=>console.log(e));
            const girl = db.getProducts('girl');
            girl.then((girlProducts)=>{
                console.log("GIRL");
                if(girlProducts.length > 0){
                    allProducts += JSON.stringify(girlProducts);
                }                
                allProductsContor++;
            },()=>{ 
                allProductsContor++;
                console.log("no girl products");
            }).catch(e=>console.log(e));
            setTimeout(()=>{
                console.log("got all products");
                console.log(allProducts);
                // console.log(JSON.parse(allProducts));
                var splitAllProducts = allProducts.split("},{");
                console.log(splitAllProducts);
                for(i=0;i<splitAllProducts.length;i++){
                    if(splitAllProducts[i].search("{") > 0)
                        console.log(splitAllProducts[i].search("{"));
                    if(splitAllProducts[i].search("}") > 0)
                        console.log(splitAllProducts[i].search("}"));
                }
                response.writeHead(200, { 'Content-Type': 'application/json' }); 
                response.write("get all products", 'utf-8');
                response.end();
            },4000);            
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
                //css + images + js       
                else{
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
    else{
        if(request.method == "POST"){
            needMongo = 1;
            if(request.url.search("addProductToCart")>=0){
                var body = '';
                request.on('data', function (chunk) {
                    body += chunk;
                });                
                request.on("end", ()=>{
                    body = JSON.parse(body);
                    var hcolors = body.hex_colors.split(","); 
                    var scolors = body.string_colors.split(",");
                    var sizes = body.size.split(",");
                    const product = prod.createProduct(body.img, body.category, body.name, parseInt(body.price), hcolors, scolors, sizes);
                    db.addMongoProduct(body.for, product);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(product));
                    response.end();
                })               
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
