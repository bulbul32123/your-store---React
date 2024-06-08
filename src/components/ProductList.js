import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

export default function ProductList() {
  const { filter_Product, grid_view} =  useFilterContext()

  if(grid_view){
    return <GridView products={filter_Product} />
  }
  else{
    return <ListView products={filter_Product} />
  }
}
