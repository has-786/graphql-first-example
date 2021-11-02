module.exports=async function startApolloServer(app,apolloServer) {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

