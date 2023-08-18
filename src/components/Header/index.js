import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import {AiOutlineMenuUnfold} from 'react-icons/ai'

import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {searchValue: '', ismobileHeaderVisible: false}

  onSearchTyping = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => {
    const {fetchData} = this.props

    const {searchValue} = this.state

    if (searchValue !== '') {
      fetchData(searchValue)
    }
  }

  onMenu = () => {
    this.setState(prevState => ({
      ismobileHeaderVisible: !prevState.ismobileHeaderVisible,
    }))
  }

  render() {
    const {searchValue, ismobileHeaderVisible} = this.state

    const {match} = this.props

    const {path} = match

    console.log(path)

    const isSearchRoute = path === '/search'

    const condition = path === '/movies/:id' || path === '/'

    const isHome = condition ? 'home-class' : ''

    // const isPopular = path === '/popular'

    return (
      <header className={`header-container ${isHome}`}>
        <nav className="nav-container">
          <Link to="/">
            <img
              alt="website logo"
              src="https://res.cloudinary.com/reddyimgs/image/upload/v1689919947/Group_7399_ashfla.png"
              className="website-logo"
            />
          </Link>

          <ul className="header-list-container-1  ul-1">
            <Link className="nav-link-item" to="/">
              <li>
                <button className="nav-home-button" type="button">
                  Home
                </button>
              </li>
            </Link>

            <Link className="nav-link-item" to="/popular">
              <li>
                <button className="nav-popular-button" type="button">
                  Popular
                </button>
              </li>
            </Link>
          </ul>

          <div className=" header-list-container-1  ul-2">
            {isSearchRoute ? (
              <div className="nav-search-container">
                <input
                  type="search"
                  onChange={this.onSearchTyping}
                  value={searchValue}
                  placeholder="Search"
                  className="nav-search-input"
                />

                <button
                  onClick={this.onClickSearch}
                  className="header-button search-btn"
                  type="button"
                  data-testid="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </div>
            ) : (
              <Link className="nav-link-item" to="/search">
                <button
                  className="nav-search-button"
                  type="button"
                  data-testid="searchButton"
                >
                  <HiOutlineSearch />
                </button>
              </Link>
            )}
          </div>
          <div className=" ul-1">
            <Link className="nav-link-item" to="/account">
              <img
                className="profile-icon"
                src="https://res.cloudinary.com/reddyimgs/image/upload/v1687011162/Avatar_zhzj4v.png"
                alt="profile"
              />
            </Link>
          </div>
          <div className="mobile-view">
            <button type="button" className="menu-btn" onClick={this.onMenu}>
              {!ismobileHeaderVisible ? (
                <AiOutlineMenuUnfold color="white" size={22} />
              ) : (
                <ImCross color="white" />
              )}
            </button>
          </div>
        </nav>
        {ismobileHeaderVisible && (
          <div className="mobile-view">
            <ul className=" mobile-view-menu">
              <Link className="nav-link-item" to="/">
                <li>
                  <button className="nav-home-button" type="button">
                    Home
                  </button>
                </li>
              </Link>
              <Link className="nav-link-item" to="/popular">
                <li>
                  <button className="nav-popular-button" type="button">
                    Popular
                  </button>
                </li>
              </Link>{' '}
              <Link className="nav-link-item" to="/account">
                <li>
                  <button className="nav-popular-button" type="button">
                    Account
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
