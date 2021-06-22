module.exports = {
    name: "ready",
    once: true,
    exec (client) {
        client.logger.success("LinBot successfully logged in!")
    }
}