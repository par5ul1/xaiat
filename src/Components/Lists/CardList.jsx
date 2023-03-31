import './CardList.css'

const CardList = ({ children, fullWidth = true }) => {
  return (
    <div style={
      fullWidth ? {
        flexDirection: "column"
      } : {
        flexDirection: "row"
      }
    } className="card-list">{children}</div >
  )
}

export default CardList;