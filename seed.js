const { connection, Product } = require('./server/db/index')

const prodObj = name => ({ name })

const productData = [prodObj('shorts'), prodObj('shirt'), prodObj('pants'), prodObj('hoodie')]

connection
    .sync({ force: true })
    .then(async () => {
        await Promise.all(
            productData.map(prod => Product.create(prod))
        )
    })
    .catch(console.error)
