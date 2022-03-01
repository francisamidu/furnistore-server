"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = (0, graphql_1.buildSchema)(`
    scalar ISODate

    scalar Object

    scalar Date
    type Address{
        _id: ID!
        phone: String
        city: String
        address: String
        userId: ID!
    }
    input AddressInput{
        phone: String!
        city: String!
        address: String!
        userId: ID!
    }

    type Category{
        _id: ID!
        title: String
    }
    input CategoryInput{
        title: String!      
    }

    type Cart{
        _id: ID!
        userId: ID
        products: [Object]
    }
    input CartInput{
        userId: ID!
        products: [Object!]!
    }

    type Order{
        _id: ID!
        userId: ID
        products: [Object]
        amount: Int
        address: Address
    }
    input OrderInput{
        userId: ID!
        products: [Object]!
        amount: Int!
        address: AddressInput!
    }

    type Product{
        _id: ID!
        colors: [String]
        categories: [String]
        description: String
        image: String
        price: Int
        quantity: Int
        sizes: [String]
        name: String
    }
    input ProductInput{
        categories: [String]
        colors: [String!]
        description: String!
        image: String!
        price: Int!
        quantity: Int!
        sizes: [String!]
        name: String!
    }        

    type Stat{
        _id: ID
        total: Int
    }    

    type Role {
        _id: ID
        code: Int
        name: String
        roles: [String]
    }

    type User{
        _id: ID!
        email: String
        isVerified: Boolean
        isAdmin: Boolean
        avatar: String
        username: String
        gender: String
    }
    input UserInput{    
        avatar: String
        email: String
        username: String
        password: String
        gender: String
    }

    type Mutation{             

        assignPermission(permissionId: ID!): Object 

        createAddress(address:AddressInput):Address
        createCart(cart:CartInput): Cart!
        createOrder(order:OrderInput): Order!
        cancelOrder(orderId:ID!): Order!
        createProduct(product:ProductInput): Product!        
        createUser(user:UserInput): User!        

        deleteAddress(addressId:ID!):Address
        deleteCategory(categoryId: ID!): Category!
        deleteCart(cartId: ID!): Cart!
        deleteOrder(orderId: ID!): Order!
        deleteProduct(productId: ID!): Product!
        deleteUser(userId: ID!): User!

        updateAddress(addressId:ID!, address:AddressInput): Address
        updateCategory(categoryId: ID!,title: String!): Category!
        updateCart(cartId: ID!, cart:CartInput): Cart!
        updateOrder(orderId: ID!, order:OrderInput): Order!
        updateProduct(productId: ID!,product: ProductInput): Product!
        updateUser(userId: ID!,user: UserInput): User!
    }
    type Query{
        address(addressId:ID!): Address
        cart(cartId: ID!): Cart
        category(categoryId: ID!): Category
        product(productId: ID!): Product
        order(orderId: ID!): Order
        role(roleId:ID!): Role
        user(userId: ID!): User
        
        orderByUser(userId: ID!): Order
        ordersByUser(userId: ID!): [Order]
        productsByCategories(categories: [String]): [Product]
        newProducts: [Product]
        
        addresses:[Address]        
        carts: [Cart]        
        products: [Product]
        orders: [Order]
        ordersCancelled: [Order]
        ordersPending: [Order]
        roles: [Role]
        users: [User]

        orderStats: [Stat]
        productStats: [Stat]
        sales: [Stat]
        userStats: [Stat]
    }    

    schema {
        query: Query
        mutation: Mutation
    }
`);
