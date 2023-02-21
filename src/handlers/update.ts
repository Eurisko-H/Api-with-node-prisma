import prisma from "../db";


// Get all
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const update = products.reduce((allUpdate, product) => {
    return [...allUpdate, ...product.updates]
  }, [])

  res.json({ data: update })
}

//Get one update
export const getUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: update })

}

//Create update
export const createUpdate = async (req, res) => {
  const { productId } = req.body
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) {
    return res.json({ message: 'nope' })
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: { id: req.body.productId }
      }
    }
  })

  res.json({ data: update })
}

//Update the update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdate, product) => {
    return [...allUpdate, ...product.updates]
  }, [])

  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    return res.json({ message: 'nope' })
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({ data: updatedUpdate })
}


//Delete update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdate, product) => {
    return [...allUpdate, ...product.updates]
  }, [])

  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    return res.json({ message: 'nope' })
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: deleted })
}