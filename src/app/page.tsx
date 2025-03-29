'use client'

import React from 'react'
import { PaginationC } from '@/components/common'

const Home = () => {
  return (
    <>
      <PaginationC
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={(page) => console.log("Página seleccionada:", page)}
        isCompact={true}
        color='primary'
      />
    </>
  )
}

export default Home