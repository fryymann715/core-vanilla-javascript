class Matrix {
  constructor( input ) {
    this.rows = input.split( '\n' )
      .map( element => element.split( ' ' ) )
      .map( thing => thing.map( element => parseInt( element ) ) )
    this.columns = this.getColumns( this.rows )
    this.saddlePoints = []
    this.getSaddlePoints( this.rows, this.columns )

  }

  getSaddlePoints( rows, columns ) {
    rows.map( ( row, columnIndex )=> {
      let rowIndex = 0
      let highestValue = row.reduce( ( currentHighest, value, index ) => {
        if ( value > currentHighest ) {
          currentHighest = value
          rowIndex = index
        }
        return currentHighest
      }, 0 )

      let lesserValues = columns[rowIndex].filter( value => value < highestValue )
      if ( lesserValues.length < 1 ) {
        this.saddlePoints.push([ columnIndex, rowIndex ])
      }
    })
  }

  getColumns( rows ) {
    let columns = []
    for ( let x = 0; x < rows[0].length; x++ ) {
      let column = []
      for ( let i = 0; i < rows.length; i++ ) {
        column.push( rows[i][x] )
      }
      columns.push( column )
    }
    return columns
  }
}

module.exports = Matrix
