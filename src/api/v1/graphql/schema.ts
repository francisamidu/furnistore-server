import { buildSchema } from "graphql";

export default buildSchema(`
    scalar ISODate

    scalar Object

    scalar Date

    type Category{
        _id: ID!
        title: String
    }
    input CategoryInput{
        title: String!      
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

    type Address{
        _id: ID!
        phone: String
        city: String
        address: String
    }
    input AddressInput{
        phone: String!
        city: String!
        address: String!
    }
    type Stat{
        _id: ID
        total: Int
    }    

    type User{
        _id: ID!
        email: String
        isVerified: Boolean
        isAdmin: Boolean
        avatar: String
        name: String
        gender: String
    }
    input UserInput{    
        avatar: String
        email: String
        name: String
        password: String
        gender: String
    }

    type Mutation{        
        createCart(cart:CartInput): Cart!
        createOrder(order:OrderInput): Order!
        cancelOrder(orderId:ID!): Order!
        createProduct(product:ProductInput): Product!        
        createUser(user:UserInput): User!        

        deleteCategory(categoryId: ID!): Category!
        deleteCart(cartId: ID!): Cart!
        deleteOrder(orderId: ID!): Order!
        deleteProduct(productId: ID!): Product!
        deleteUser(userId: ID!): User!

        updateCategory(categoryId: ID!,title: String!): Category!
        updateCart(cartId: ID!, cart:CartInput): Cart!
        updateOrder(orderId: ID!, order:OrderInput): Order!
        updateProduct(productId: ID!,product: ProductInput): Product!
        updateUser(userId: ID!,user: UserInput): User!
    }
    type Query{
        
        cart(cartId: ID!): Cart
        category(categoryId: ID!): Category
        product(productId: ID!): Product
        order(orderId: ID!): Order
        user(userId: ID!): User
        
        orderByUser(userId: ID!): Order
        ordersByUser(userId: ID!): [Order]
        productsByCategories(categories: [String]): [Product]
        newProducts: [Product]
        
        carts: [Cart]        
        products: [Product]
        orders: [Order]
        ordersCancelled: [Order]
        ordersPending: [Order]
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
