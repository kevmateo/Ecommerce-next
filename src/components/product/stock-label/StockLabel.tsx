'use client'

import { getStockBySlug } from "@/actions"
import { inter, titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStock()
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setLoading(false)
  }

  return (
    <>
      {
        loading ? (
          <h1 className={`${titleFont.className} antialiased font-bold text-xl animate-pulse bg-gray-200`}>
            &nbsp;
          </h1>
        ) : (
          <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            Stock: {stock}
          </h1>
        )
      }
    </>
  )
}