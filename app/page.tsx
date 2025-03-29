'use client'

import { PaginationC } from "@com/pagination"

export default function Home() {
  return (
    <>
      <PaginationC
        total={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={(page) => console.log("Página seleccionada:", page)}
        isCompact={true}
        color="primary"
      />
    </>
  )
}