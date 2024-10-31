import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  //1. borrar registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ])

  const { categories, products } = initialData
  //2. Crear categorias
  const categoriesData = categories.map((name) => ({ name }))
  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)
  //3. Crear productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    //images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })



  console.log('Seed ejecutado correctamente');
}


(() => {
  if (process.env.NODE_ENV === 'production') return
  main();
})();