import styles from './GridTable.module.css'

interface GridTableProps {
  headers: string[]
  rows: any[]
}

export default function GridTable({ headers, rows }: GridTableProps) {
  let rowsData = []

  let index: keyof typeof rows;
  for (index in rows) {
    let item
    let arr = []
    
    for (item in rows[index]) {
      arr.push(rows[index][item])
    }

    rowsData.push(arr)
  }

  return (
    <section className={styles.table}>
      <div className={styles.tableHead} style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((item, index) => <p key={index}>{item}</p>)}
      </div>
      <div className={styles.tableBody}>
        {rowsData.map((row, index) => (
          <div key={index} className={styles.row} style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
            {row.map((value) => <p key={crypto.randomUUID()}>{value}</p>)}
          </div>
        ))}
      </div>
    </section>
  )
}
