
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin_cristina:doinoua@ataradb-xxrbg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function findProductByCatandName(client, forWho, productCat, productName) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`${forWho}`).findOne({
            category: productCat,
            name: productName,
        });
        return res;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function findProductByName(client, productName) {
    return new Promise((found, notFound) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection("women").findOne({ name: productName });
                }, () => { console.log("not connected"); })
                .then((searchInWomen) => {
                    if (searchInWomen) found(searchInWomen);
                    else {
                        return client.db("tw").collection("men").findOne({ name: productName });
                    }
                })
                .then((searchInMen) => {
                    if (searchInMen) found(searchInMen);
                    else {
                        return client.db("tw").collection("girl").findOne({ name: productName });
                    }
                })
                .then((searchInGirl) => {
                    if (searchInGirl) found(searchInGirl);
                    else {
                        return client.db("tw").collection("girl").findOne({ name: productName });
                    }
                })
                .then((searchInBoy) => {
                    if (searchInBoy) found(searchInBoy);
                    else notFound();
                })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function addProduct(client, forWho, product) {
    try {
        await client.connect();
        console.log(product.category);
        const categ = await client.db("tw").collection("categories").findOne({ forWho: forWho });
        var ok = 0;
        for (i = 0; i < categ.categories_list.length; i++) {
            if (categ.categories_list[i].name == product.category) ok = 1;
        }
        if (categ.categories_list.length == 0 || ok == 0) {
            var toAdd = categ;
            var catToAdd = {
                name: product.category,
                img: product.img
            }
            toAdd.categories_list.push(catToAdd);
            console.log(toAdd);
            const addCat = await client.db("tw").collection("categories").updateOne({ forWho: forWho }, { $set: toAdd });
            if (addCat)
                console.log(`Category ${product.category} added to categories.${forWho}`);
            else console.log(`No category added to categories.${forWho}`);
        }
        const ext = await findProductByCatandName(client, forWho, product.category, product.name);
        if (ext) {
            console.log(`The product already exists`);
        }
        else {
            const res = await client.db("tw").collection(`${forWho}`).insertOne(product);
            if (res) {
                console.log(`${res.insertedCount} document was inserted into tw.${forWho}`);
            }
            else console.log(`No document was inserted into tw.${forWho}`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function updateProduct(client, forWho, product, updatedProduct, hex, strings, sizes) {
    try {
        console.log('Connecting..');
        await client.connect();
        const res = await client.db("tw").collection(`${forWho}`).updateOne(
            { category: product.category, name: product.name },
            { $set: updatedProduct }
        );
        console.log(`${res.matchedCount} document(s) match the query`);
        if (res.modifiedCount > 0) {
            console.log(`${res.modifiedCount} document(s) was/were updated`);
        }
        else
            console.log('Not updated');
        return res.modifiedCount;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function getProducts(client, forWho) {
    return new Promise((found, notFound) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection(`${forWho}`).find().toArray();
                }, () => { console.log("error"); })
                .then((prodList) => {
                    found(prodList);
                }, () => { notFound() })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

function getCategories(client, forWho) {
    return new Promise((found, notFound) => {
        try {
            client.connect()
                .then(async () => {
                    const cat = await  client.db("tw").collection(`categories`).findOne({ forWho: forWho });
                    if(cat) found(cat.categories_list);
                    else notFound();
                }, () => { console.log("error"); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function deleteProduct(client, forWho, cat, name) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`${forWho}`).deleteOne({ category: cat, name: name });
        console.log(`${res.deletedCount} document(s) was/were deleted`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function findUserByEmail(client, email) {
    return new Promise(async (found, notFound) => {
        try {
            client.connect()
                .then(async () => {
                    return client.db("tw").collection("users").findOne({ email: email });
                }, () => console.log("not connected"))
                .then((userFound) => {
                    if (userFound) {
                        found(userFound);
                    }
                    else {
                        notFound();
                    }
                }), () => console.log("no user found")
                    .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function findUserByEmailAsync(client, email) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`users`).findOne({
            email: email
        });

        if (res) {
            console.log(`one did matched`);
            return res;
        }
        else {
            console.log('No user found');
            return 0;
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function addUser(client, user) {
    try {
        await client.connect();
        var ext = await findUserByEmailAsync(client, user.email);
        if (ext) {
            console.log('User already exists');
        }
        else {
            const res = await client.db("tw").collection(`users`).insertOne(user);
            if (res) {
                console.log(`${res.insertedCount} document was inserted into tw.users`);
            }
            else console.log(`No document was inserted into tw.users`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function editUserName(client, email, userWithNewName) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`users`).updateOne(
            { email: email },
            { $set: { first_name: userWithNewName.first_name, last_name: userWithNewName.last_name } }
        );
        console.log(`${res.matchedCount} document(s) match the query`);
        if (res.modifiedCount > 0) {
            console.log(`${res.modifiedCount} document(s) was/were updated`);
        }
        else
            console.log('Not updated');
        return res.modifiedCount;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function editUserEmail(client, email, newEmail) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`users`).updateOne(
            { email: email },
            { $set: { email: newEmail } }
        );
        console.log(`${res.matchedCount} document(s) match the query`);
        if (res.modifiedCount > 0) {
            console.log(`${res.modifiedCount} document(s) was/were updated`);
        }
        else
            console.log('Not updated');
        return res.modifiedCount;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function editUserPass(client, email, pass) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`users`).updateOne(
            { email: email },
            { $set: { password: pass } }
        );
        console.log(`${res.matchedCount} document(s) match the query`);
        if (res.modifiedCount > 0) {
            console.log(`${res.modifiedCount} document(s) was/were updated`);
        }
        else
            console.log('Not updated');
        return res.modifiedCount;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function deleteUser(client, email) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`users`).deleteOne({ email: email });
        console.log(`${res.deletedCount} document(s) was/were deleted`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getFromFavorites(client, user) {
    return new Promise((resolveFav, rejectFav) => {
        try {
            client.connect()
                .then(() => {
                    console.log(`User email: ${user}`);
                    return client.db("tw").collection("users").findOne({ email: user });
                }, () => { console.log("error"); })
                .then((userFound) => {
                    console.log(`User id: ${userFound._id}`);
                    return client.db("tw").collection("favorites").find({ user_id: userFound._id }).toArray();
                }, () => { console.log("no user found"); })
                .then((favFound) => {
                    if (favFound.length > 0) {
                        resolveFav(favFound);
                    }
                    else rejectFav();
                }, () => { console.log("no product from favorites for this user found"); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

function findProductInFavorites(client, prodId, userId) {
    return new Promise(async (found, notFound) => {
        try {
            await client.connect()
                .then(() => {
                    return client.db("tw").collection("favorites").findOne({
                        user_id: userId,
                        product_id: prodId
                    });
                })
                .then((res) => {
                    if (res)
                        found(res);
                    else notFound();
                })
                .catch(e => console.log(e))
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function addProductToFavorites(client, email, forWho, cat, name, selected_color, selected_size) {
    try {
        await client.connect();
        const user = await client.db("tw").collection(`users`).findOne({
            email: email
        });
        const prod = await client.db("tw").collection(`${forWho}`).findOne({
            category: cat,
            name: name,
        });

        const fav = {
            user_id: user._id,
            for: forWho,
            product_id: prod._id,
            selected_color: selected_color,
            selected_size: selected_size
        }
        console.log(fav);

        const res = await client.db("tw").collection(`favorites`).insertOne(fav);
        if (res) {
            console.log(`${res.insertedCount} document was inserted into tw.favorites`);
        }
        else console.log(`No document was inserted into tw.favorites`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function deleteFromFavorites(client, productId, userId) {
    return new Promise(async (deleted, notDeleted) => {
        try {
            await client.connect()
                .then(async () => {
                    return await client.db("tw").collection("favorites").deleteOne({
                        user_id: userId,
                        product_id: productId
                    });
                })
                .then((del) => {
                    if (del) {
                        console.log("deleteeeeed");
                        deleted();
                    }
                    else notDeleted();
                })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function addProductToCartFromFavorites(client, cartProd) {
    try {
        await client.connect();
        const res = await client.db("tw").collection(`cart`).insertOne(cartProd);
        if (res) {
            console.log(`${res.insertedCount} document was inserted into tw.cart`);
        }
        else console.log(`No document was inserted into tw.cart`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function addProductToCart(client, email, forWho, cat, name, selected_color, selected_size) {
    try {
        await client.connect();
        const user = await client.db("tw").collection(`users`).findOne({
            email: email
        });
        const prod = await client.db("tw").collection(`${forWho}`).findOne({
            category: cat,
            name: name,
        });

        const cart = {
            user_id: user._id,
            for: forWho,
            product_id: prod._id,
            selected_color: selected_color,
            selected_size: selected_size
        }
        console.log(cart);

        const res = await client.db("tw").collection(`cart`).insertOne(cart);
        if (res) {
            console.log(`${res.insertedCount} document was inserted into tw.cart`);
        }
        else console.log(`No document was inserted into tw.cart`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function deleteFromCart(client, prodId, userId) {
    return new Promise(async (deleted, notDeleted) => {
        try {
            await client.connect()
                .then(async () => {
                    return await client.db("tw").collection("cart").deleteOne({
                        user_id: userId,
                        product_id: prodId
                    });
                })
                .then((del) => {
                    if (del) {
                        deleted();
                    }
                    else notDeleted();
                })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

function getFromCart(client, user) {
    return new Promise((resolveCart, rejectCart) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection("users").findOne({ email: user });
                }, () => { console.log("error"); })
                .then((userFound) => {
                    return client.db("tw").collection("cart").find({ user_id: userFound._id }).toArray();
                }, () => { console.log("no user found"); })
                .then((found) => {
                    if (found.length > 0) {
                        resolveCart(found);
                    }
                    else resolveCart();
                }, () => { console.log("no product from cart for this user found"); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function addAddress(client, userId, fName, lName, street, nr, country, city, postalCode, phoneNr) {
    try {
        await client.connect();
        var name = `${lName} ${fName}`;
        const ext = new Promise(async (existing, notExisting) => {
            var addr = await client.db("tw").collection("addresses").findOne({
                user_id: userId,
                user_name: name
            });
            if (addr) existing();
            else notExisting();
        });
        ext.then(() => console.log("existing address"), async () => {
            if (nr != 0) {
                var full_street = `${street} nr.${nr}`;
            }
            else {
                var full_street = `${street}`;
            }
            var address = {
                user_id: userId,
                user_name: name,
                street: full_street,
                country: country,
                city: city,
                postal_code: postalCode,
                phone_number: phoneNr
            }
            const res = await client.db("tw").collection(`addresses`).insertOne(address);
            if (res) {
                console.log(`${res.insertedCount} document was inserted into tw.addresses`);
            }
            else console.log(`No document was inserted into tw.addresses`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function getAddresses(client, user) {
    return new Promise((resolveAddr, rejectAddr) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection("users").findOne({ email: user });
                }, () => { console.log("error"); })
                .then((userFound) => {
                    return client.db("tw").collection("addresses").find({ user_id: userFound._id }).toArray();
                }, () => { rejectAddr(); })
                .then((addrFound) => {
                    if (addrFound.length > 0) {
                        resolveAddr(addrFound);
                    }
                    else rejectAddr();
                }, () => { rejectAddr(); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

function findAddress(client, user, name) {
    return new Promise((resolveAddr, rejectAddr) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection("users").findOne({ email: user });
                }, () => { console.log("error"); })
                .then((userFound) => {
                    return client.db("tw").collection("addresses").findOne({ user_id: userFound._id, user_name: name });
                }, () => { rejectAddr(); })
                .then((addrFound) => {
                    if (addrFound) {
                        resolveAddr(addrFound);
                    }
                    else rejectAddr();
                }, () => { rejectAddr(); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

async function addOrder(client, userId, addressUserName, payMethod, price, submitionDate) {
    try {
        await client.connect();
        const addr = new Promise(async (found, notFound) => {
            var a = await client.db("tw").collection("addresses").findOne({
                user_id: userId,
                user_name: addressUserName
            });
            if (a) found(a);
            else notFound();
        });
        addr.then(async (addrFound) => {
            const productsList = await client.db("tw").collection("cart").find({
                user_id: userId
            }).toArray();
            var products = [];
            for (i = 0; i < productsList.length; i++) {
                var ok = 1;
                for (k = 0; k < products.length; k++) {
                    if (JSON.stringify(productsList[i].product_id) === JSON.stringify(products[k].product_id)) {
                        if (productsList[i].selected_color === products[k].color)
                            if (productsList[i].selected_size === products[k].size)
                                ok = 0;
                        break;
                    }
                }
                if (ok == 1) {
                    var counter = 0;
                    for (j = 0; j < productsList.length; j++) {
                        if (productsList[i].product_id = productsList[j].product_id)
                            counter++;
                    }
                    var prod = {
                        product_id: productsList[i].product_id,
                        color: productsList[i].selected_color,
                        size: productsList[i].selected_size,
                        pieces: counter
                    }
                    products.push(prod);
                }
            }
            const order = {
                user_id: userId,
                address_id: addrFound._id,
                products_list: products,
                paymenth_method: payMethod,
                price: price,
                submision_date: submitionDate
            }
            const res = await client.db("tw").collection("orders").insertOne(order);
            if (res) {
                console.log(`${res.insertedCount} document was inserted into tw.orders`);
            }
            else console.log(`No document was inserted into tw.orders`);
        }, () => console.log("no address found"))
            .catch(e => console.log(e));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function getOrders(client, user) {
    return new Promise((resolveOrd, rejectOrd) => {
        try {
            client.connect()
                .then(() => {
                    return client.db("tw").collection("users").findOne({ email: user });
                }, () => { console.log("error"); })
                .then((userFound) => {
                    return client.db("tw").collection("orders").find({ user_id: userFound._id }).toArray();
                }, () => { rejectOrd(); })
                .then((ordFound) => {
                    if (ordFound.length > 0) {
                        resolveOrd(ordFound);
                    }
                    else rejectOrd();
                }, () => { rejectOrd(); })
                .catch(e => console.log(e));
        } catch (e) {
            console.error(e);
        } finally {
            client.close();
        }
    });
}

module.exports = {
    addMongoProduct: function (forWho, product) {
        addProduct(client, forWho, product);
    },
    findProduct: async function (forWho, cat, name) {
        const res = await findProductByCatandName(client, forWho, cat, name);
        return res;
    },
    findProductByName: function (productName) {
        return new Promise((found, notFound) => {
            const res = findProductByName(client, productName);
            res.then((product) => found(product), () => notFound());
        });
    },
    getProducts: function (forWho) {
        return new Promise((resolve, reject) => {
            const res = getProducts(client, forWho);

            res.then((prodList) => { resolve(prodList); }, () => { reject(); });
        });
    },
    getCategories: function (forWho) {
        return new Promise((resolve, reject) => {
            const res = getCategories(client, forWho);
            res.then((catList) => {resolve(catList); }, () => { reject(); });
        });
    },
    updateProduct: function (forWho, product, updatedProduct, hex, strings, sizes) {
        const res = updateProduct(client, forWho, product, updatedProduct, hex, strings, sizes);
    },
    deleteProduct: function (forWho, cat, name) {
        deleteProduct(client, forWho, cat, name);
    },
    findUserByEmail: function (email) {
        return new Promise((found, notFound) => {
            const res = findUserByEmail(client, email);
            res.then((user) => { found(user) }, () => notFound())
                .catch(e => console.log(e));
        });
    },
    findUser: function (email) {
        const res = findUserByEmailAsync(client, email);
        return res;
    },
    addMongoUser: function (user) {
        addUser(client, user);
    },
    updateUserName: function (email, userWithNewName) {
        editUserName(client, email, userWithNewName);
    },
    updateUserEmail(email, newEmail) {
        editUserEmail(client, email, newEmail);
    },
    updateUserPass(email, pass) {
        editUserPass(client, email, pass);
    },
    deleteUser: function (email) {
        deleteUser(client, email);
    },
    getProductsFromFavorites: async function (user) {
        return new Promise((resolve, reject) => {
            const res = getFromFavorites(client, user);
            res.then((favList) => { resolve(favList) }, () => { reject() });
        });
    },
    findProductInFavorites: async function (prodId, userId) {
        return new Promise((found, notFound) => {
            const res = findProductInFavorites(client, prodId, userId);
            res.then((prod) => found(prod), () => notFound());
        });
    },
    addProductToFavorites: function (email, forWho, cat, name, selected_color, selected_size) {
        addProductToFavorites(client, email, forWho, cat, name, selected_color, selected_size);
    },
    deleteFromFavorites: function (prodId, userId) {
        const res = deleteFromFavorites(client, prodId, userId);
        res.then(() => { console.log("deleted"); }, () => { console.log("not deleted"); })
            .catch(e => console.log(e));
    },
    addProductToCartFromFavorites: function (cartProd) {
        addProductToCartFromFavorites(client, cartProd);
    },
    addProductToCart: function (email, forWho, cat, name, selected_color, selected_size) {
        addProductToCart(client, email, forWho, cat, name, selected_color, selected_size);
    },
    deleteFromCart: function (prodId, userId) {
        const res = deleteFromCart(client, prodId, userId);
        res.then(() => console.log("deleted from cart"), () => console.log("not deleted"))
            .catch(e => console.log(e));
    },
    getProductsFromCart: async function (user) {
        return new Promise((resolve, reject) => {
            const res = getFromCart(client, user);
            res.then((cartList) => { resolve(cartList) }, () => { reject() });
        });
    },
    addAddress: function (userId, fName, lName, street, nr, country, city, postalCode, phoneNr) {
        addAddress(client, userId, fName, lName, street, nr, country, city, postalCode, phoneNr);
    },
    getAddresses: function (user) {
        return new Promise((resolve, reject) => {
            const res = getAddresses(client, user);
            res.then((addrList) => { resolve(addrList); }, () => { reject(); });
        });
    },
    findAddress: function (user, name) {
        return new Promise((resolve, reject) => {
            const res = findAddress(client, user, name);
            res.then((addr) => { resolve(addr); }, () => { reject(); });
        });
    },
    addOrder: function (userId, addressUserName, payMethod, price, submitionDate) {
        const res = addOrder(client, userId, addressUserName, payMethod, price, submitionDate);
    },
    getOrders: function (user) {
        return new Promise((resolve, reject) => {
            const res = getOrders(client, user);
            res.then((ordList) => { resolve(ordList); }, () => { reject(); });
        });
    }
}

