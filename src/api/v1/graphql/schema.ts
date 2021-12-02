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
        color: String
        categories: [String]
        description: String
        image: String
        price: String
        quantity: Int
        size: String
        title: String
    }
    input ProductInput{
        color: String!
        description: String!
        image: String!
        price: String!
        quantity: Int!
        size: String!
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
        address: Address!
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

    type User{
        _id: ID!
        email: String
        isVerified: Boolean
        isAdmin: Boolean
        avatar: String
    }
    input UserInput{    
        avatar: String
        email: String
    }

    type Mutation{
        createCategory: Category!
        createCart: Cart!
        createOrder: Order!
        createProduct: Product!

        deleteCategory(categoryId: ID!): Category!
        deleteCart(cartId: ID!): Cart!
        deleteOrder(orderId: ID!): Order!
        deleteProduct(productId): Product!
        deleteUser(userId): User!

        updateCategory(categoryId: ID!,title: String!): Category!
        updateCart(cartId: ID!): Cart!
        updateOrder(orderId: ID!): Order!
        updateProduct(productId,product: ProductInput): Product!
        updateUser(userId,user: UserInput): User!
    }
    type Query{
        getIncome

        getCart(cartId:ID!): Cart
        getCategory(categoryId:ID!): Category
        getProduct(productId:ID!): Product
        getOrder(orderId:ID!): Order
        getUser(userId: ID): User
        
        getOrderByUser(userId:ID!): Order
        getOrdersByUser(userId:ID!): [Order]
        getProductsByCategories(categories: [String]): [Product]
        getNewProducts: [Product]
        
        getCarts: [Cart]
        getCategories: [Category]
        getProducts: [Product]
        getOrders: [Order]
        getUsers: [User]
    }    

    schema {
        query: Query
        mutation: Mutation
    }
`);
