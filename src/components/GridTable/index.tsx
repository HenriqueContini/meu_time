import styles from './GridTable.module.css'
import React from 'react'

interface GridTableProps {
  headers: string[]
  children: React.ReactNode
}

export default function GridTable({ headers, children }: GridTableProps) {
  return (
    <section className={styles.table}>
      <div className={styles.tableHead} style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>
        {headers.map((item, index) => <p key={index}>{item}</p>)}
      </div>
      <div className={styles.tableBody} style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>
        {children}
      </div>
    </section>
  )
}
