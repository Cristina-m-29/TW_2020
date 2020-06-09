var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin_cristina:doinoua@ataradb-xxrbg.mongodb.net/tw?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});
var User = mongoose.model("users", userSchema);

var prodSchema = new mongoose.Schema({
    img: String,
    for: String,
    category: String,
    name: String,
    price: Number,
    hex_colors: Array,
    string_colors: Array,
    sizes: Array
});
var Product = mongoose.model("products",prodSchema); 

var catShema = new mongoose.Schema({
    for: String,
    categories_list: Array
});
var Category = mongoose.model("categories",catShema);

var favSchema = new mongoose.Schema({
    user_id: String,
    product_id: String,
    product_name: String,
    img: String,
    price: Number,
    selected_color: String,
    selected_size: String
});
var Favorites = mongoose.model("favorites", favSchema);

var cartSchema = new mongoose.Schema({
    user_id: String,
    product_id: String,
    product_name: String,
    img: String,
    price: Number,
    pieces: Number,
    selected_color: Array,
    selected_size: Array
});
var Cart = mongoose.model("cart",cartSchema);

var addressSchema = new mongoose.Schema({
    user_id: String,
    user_name: String,
    street: String,
    country: String,
    city: String,
    postal_code: Number,
    phone_number: String 
});
var Address = mongoose.model("addresses",addressSchema);

var orderSchema = new mongoose.Schema({
    user_id: String,
    address_id: String,
    product_list: Array,
    payment_method: String,
    price: Number,
    submision_date: String
});
var Order = mongoose.model("orders",orderSchema);

/* USER - functions  */

function createUser(user){
    return new Promise((resolve)=>{
        findUser(user.email).then((res)=>{
            if(res.email === user.email) resolve("exists");
            else{
                const newUser = new User(user);
                newUser.save().then((doc)=>{
                    resolve(doc);
                }).catch(e=>resolve(e));
            }
        }).catch(()=>resolve("exists"));
    });
}

function findUser(email){
    return new Promise((resolve)=>{
        User.findOne({email:email}).then((doc)=>{
            resolve(doc);
        });
    });
}

function getUsers(){
    return new Promise((resolve)=>{
        User.find({}).then((doc)=>{
            resolve(doc);
        });
    });
}

function updateUser(email,updatedUser){
    return new Promise((resolve)=>{
        User.updateOne({email:email},{$set:updatedUser}).then(()=>{
            resolve();
        }).catch(e=>resolve(e));
    });
}

function resetPassword(email,password){
    return new Promise((resolve)=>{
        findUser(email).then((res)=>{
            User.updateOne({_id:res._id},{password:password}).then(()=>{
                resolve("password reseted");
            }).catch(e=>resolve(e));
        }).catch(e=>resolve("no user"));
    });
}

function deleteUser(email){
    return new Promise((resolve)=>{
        User.deleteOne({ email:email }, function (err) {
            if (err) resolve(err);
            resolve("deleted");
        });
    });
}

/* PRODUCTS - functions */
function addProduct(product){
    return new Promise((resolve)=>{
        Category.findOne({for:product.for}).then((doc)=>{
            if(doc){
                var cat_list =  doc.categories_list;
                if(cat_list.length === 0){
                    cat_list = {name:product.category, img:product.img};
                }
                else{
                    if( cat_list.find(cat=>cat.name === product.category) === undefined){
                        cat_list.push({name:product.category, img:product.img});
                    }
                }
                Category.updateOne({for:product.for},{categories_list:cat_list}).then(()=>{}).catch(e=>console.log(e));
            }
            else{
                const category = new Category({for: product.for, categories_list: [{name:product.category, img: product.img}]});
                category.save().then(()=>{console.log("category added");}).catch(e=>console.log(e));
            }
        });
        Product.findOne({name: product.name}).then((doc)=>{
            if(doc){
                resolve("exists");
            }
            else{
                const newProduct = new Product(product);
                newProduct.save().then((doc)=>{
                    resolve(doc);
                }).catch(e=>resolve(e));
            }
        });
    });
} 

function findProduct(name){
    return new Promise((resolve)=>{
        Product.findOne({name:name}).then((doc)=>{
            resolve(doc);
        }).catch(e=>resolve(e));
    });
}

function updateProduct(name, updatedProduct){
    return new Promise((resolve)=>{
        Product.updateOne({name:name},{$set:updatedProduct}).then(()=>{
            resolve();
        }).catch(e=>resolve(e));
    });
}

function getProducts(){
    return new Promise((resolve)=>{
        Product.find({}).then((doc)=>{
            resolve(doc);
        }).catch(e=>resolve(e));
    });
}

function getProductsByPeopleAndCategory(forWho, category){
    return new Promise((resolve)=>{
        Product.find({for:forWho, category:category}).then((doc)=>{
            resolve(doc);
        }).catch(e=>resolve(e));
    });
}

function deleteProduct(name){
    return new Promise((resolve)=>{
        Product.deleteOne({name:name}, function (err) {
            if (err) resolve(err);
            resolve("deleted");
        });
    });
}

function getCategories(forWho){
    return new Promise((resolve)=>{
        Category.findOne({for:forWho}).then((doc)=>{
            const list = doc.categories_list;
            resolve(list);
        }).catch(e=>resolve(e));
    });
}

/* FAVORITES - functions */

function addProductToFavorites(user,product,color,size){
    return new Promise((resolve)=>{
        var favToAdd = {
            selected_color: color,
            selected_size: size
        }
        findUser(user).then((res)=>{
            favToAdd.user_id = res._id;
            findProduct(product.toLowerCase()).then((result)=>{
                favToAdd.product_id = result._id;
                favToAdd.product_name = result.name;
                favToAdd.img = result.img;
                favToAdd.price = result.price;
                Favorites.findOne({user_id:favToAdd.user_id, product_id:favToAdd.product_id}).then((found)=>{
                    const favorites = new Favorites(favToAdd);
                    favorites.save().then((doc)=>{
                        resolve(doc);
                    }).catch(e=>resolve(e));
                }).catch(e=>resolve(e));
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}

function getFavorites(user){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            if(res){
                Favorites.find({user_id:res._id}).then((result)=>{
                    resolve(result);                    
               }).catch(e=>resolve(e)); 
            }
            else resolve("no user found");
        }).catch(e=>resolve(e));
    });
}

function deleteFromFavorites(user,product){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            Favorites.deleteOne({user_id:res._id, product_name:product}, function(err){
                if(err) resolve(err);
                resolve("deleted");
            });
        }).catch(e=>resolve(e));
        
    });
}

/* CART - functions */

function addProductToCart(user,product,color,size){
    return new Promise((resolve)=>{
        var cartToAdd = {};
        findUser(user).then((res)=>{
            cartToAdd.user_id = res._id;
            findProduct(product).then((result)=>{
                cartToAdd.product_id = result._id;
                cartToAdd.product_name = result.name;
                cartToAdd.img = result.img;
                cartToAdd.price = result.price;
                cartToAdd.selected_color = [];
                cartToAdd.selected_size = [];
                Cart.findOne({user_id:cartToAdd.user_id, product_id:cartToAdd.product_id}).then((found)=>{
                    cartToAdd.selected_color = found.selected_color;
                    cartToAdd.selected_size = found.selected_size;
                    cartToAdd.selected_color.push(color);
                    cartToAdd.selected_size.push(size);
                    if(found){
                        cartToAdd.pieces = found.pieces + 1;
                        Cart.updateOne({user_id:cartToAdd.user_id, product_id:cartToAdd.product_id},{pieces: cartToAdd.pieces,selected_color:cartToAdd.selected_color,selected_size:cartToAdd.selected_size}).then(()=>{}).catch(e=>resolve(e));
                    }
                    else{
                        cartToAdd.pieces = 1;
                        const cart = new Cart(cartToAdd);
                        cart.save().then((doc)=>{
                            resolve(doc);
                        }).catch(e=>resolve(e));
                    }
                }).catch(e=>{
                    cartToAdd.pieces = 1;
                    cartToAdd.selected_color.push(color);
                    cartToAdd.selected_size.push(size);
                    const cart = new Cart(cartToAdd);
                    cart.save().then((doc)=>{
                        resolve(doc);
                    }).catch(e=>resolve(e));
                });
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}

function getCart(user){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            if(res){
                Cart.find({user_id:res._id}).then((result)=>{
                    resolve(result);                    
               }).catch(e=>resolve(e)); 
            }
            else resolve("no user found");
        }).catch(e=>resolve(e));
    }); 
}

function deleteFromCart(user,product){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            Cart.deleteOne({user_id:res._id, product_name:product}, function(err){
                if(err) resolve(err);
                resolve("deleted");
            });
        }).catch(e=>resolve(e));
    });
}

/* ADDRESS - functions */

function addAddress(user,address){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            address.user_id = res._id;
            const addr = new Address(address);
            addr.save().then((doc)=>{
                resolve(doc);
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}

function getAddresses(user){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            Address.find({user_id:res._id}).then((doc)=>{
                resolve(doc);
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}


function updateAddress(id, updatedAddress){
    return new Promise((resolve)=>{
        Address.updateOne({_id:id},{$set:updatedAddress}).then(()=>{
            resolve();
        }).catch(e=>resolve(e));
    });
}

/* ORDERS - functions */

function addOrder(user, addressName, order){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            Address.findOne({user_id:res._id, user_name: addressName}).then((found)=>{
                order.user_id = res._id;
                order.address_id = found._id;
                const ord = new Order(order);
                ord.save().then((doc)=>{
                    resolve(doc);
                }).catch(e=>resolve(e));
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}

function getOrders(user){
    return new Promise((resolve)=>{
        findUser(user).then((res)=>{
            Order.find({user_id:res._id}).then((doc)=>{
                resolve(doc);
            }).catch(e=>resolve(e));
        }).catch(e=>resolve(e));
    });
}

function getAllOrders(){
    return new Promise((resolve)=>{
        Order.find({}).then((doc)=>{
           resolve(doc); 
        }).catch(e=>resolve(e));
    });
}

module.exports = {
    // USER
    createUser: function(user){
        return new Promise((resolve)=>{
            createUser(user).then((res)=>{
                resolve(res);
            }).catch(()=>{resolve("exists")});
        });
    },
    findUser: function(email){
        return new Promise((resolve)=>{
            findUser(email).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    getUsers: function(){
        return new Promise((resolve)=>{
            getUsers().then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});           
        })
    },
    updateUser: function(email,updatedUser){
        updateUser(email,updatedUser).then((res)=>{
            return res;
        }).catch(e=>{});
    },
    resetPassword: function(email,password){
        return new Promise((resolve)=>{
            resetPassword(email,password).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve("no user")});
        });
    },
    deleteUser: function(email){
        deleteUser(email).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    // PRODUCT
    addProduct: function(product){
        return new Promise((resolve)=>{
            addProduct(product).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e)});
        });
    },
    updateProduct: function(productName, updatedProduct){
        updateProduct(productName,updatedProduct).then(()=>{
            return "updated";
        }).catch(e=>{return e;});
    },
    findProduct: function(productName){
        return new Promise((resolve)=>{
            findProduct(productName).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
        
    },
    getProducts: async function(){
        return new Promise((resolve)=>{
            getProducts().then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    getProductsByPeopleAndCategory: function(forWho,category){
        return new Promise((resolve)=>{
            getProductsByPeopleAndCategory(forWho,category).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    deleteProduct: function(productName){
        deleteProduct(productName).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    getCategories: function(forWho){
        return new Promise((resolve)=>{
            getCategories(forWho).then((res)=>{
                console.log(res);
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    // FAVORITES
    addProductToFavorites: function(email,productName, color, size){
        addProductToFavorites(email,productName,color,size).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    getFavorites: function(email){
        return new Promise((resolve)=>{
            getFavorites(email).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    deleteFromFavorites: function(email, productName){
        deleteFromFavorites(email,productName).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    // CART
    addProductToCart: function(email,productName,color,size){
        addProductToCart(email,productName,color,size).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    getCart: function(email){
        return new Promise((resolve)=>{
            getCart(email).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    },
    deleteFromCart: function(email,productName){
       deleteFromCart(email,productName).then((res)=>{
            return res;
        }).catch(e=>{return e;}); 
    },
    // ADDRESS
    addAddress: function(email, address){
       addAddress(email,address).then((res)=>{
            return res;
        }).catch(e=>{return e;}); 
    },
    getAddresses: function(email){
        return new Promise((resolve)=>{
            getAddresses(email).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e)});
        });
    },
    updateAddress: function(id, updatedAddress){
        return new Promise((resolve)=>{
            updateAddress(id, updatedAddress).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e)});
        });
    },
    // ORDER
    addOrder: function(email, addressName, order){
        addOrder(email,addressName,order).then((res)=>{
            return res;
        }).catch(e=>{return e;});
    },
    getOrders: function(email){
        return new Promise((resolve)=>{
            getOrders(email).then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        }); 
    },
    getAllOrders: async function(){
        return new Promise((resolve)=>{
            getAllOrders().then((res)=>{
                resolve(res);
            }).catch(e=>{resolve(e);});
        });
    }
}