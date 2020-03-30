class SearchBar extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSearch = (e) => {
    e.persist()
    this.props.onFilterTextChange(e.target.value)
  }
  handleChecked = (e) => {
    e.persist()
    this.props.onInStockChange(e.target.checked)
  }
  render () {
    return (
      <form>
        <div>
          <input type="text" value={this.props.filterText} onChange={this.handleSearch} placeholder="请输入" />
        </div>
        <div>
          <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleChecked} />
          <label>Only show products in stock</label>
        </div>
      </form>
    )
  }
}
class ProductCategoryRow extends React.Component {
  render () {
    let category = this.props.category
    return (
      <tr>
        <th colSpan="2" style={{textAlign: 'left'}}>{category}</th>
      </tr>
    )
  }
}
class ProductRow extends React.Component {
  render () {
    let product = this.props.product,
      goodsName = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
    return (
      <tr>
        <td>{goodsName}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}
class ProductTable extends React.Component {
  render () {
    let row = [], lastCategory = null, products = this.props.products,
      filterText = this.props.filterText, inStockOnly = this.props.inStockOnly
    products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        row.push(<ProductCategoryRow category={product.category} key={product.category} />)
      }
      row.push(<ProductRow product={product} key={product.name} />)
      lastCategory = product.category
    })
    return (
      <div>
        <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      </div>
    )
  }
}
class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false
    }
  }
  handleFilterText = (filterText) => {
    this.setState({
      filterText
    })
  }
  handleInStock = (inStockOnly) => {
    this.setState({
      inStockOnly
    })
  }
  render () {
    let products = this.props.product
    return (
      <div>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
                   onFilterTextChange={this.handleFilterText} onInStockChange={this.handleInStock} />
        <ProductTable products={products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    )
  }
}
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
ReactDOM.render(
  <FilterableProductTable product={PRODUCTS} />,
  document.getElementById('main18')
)