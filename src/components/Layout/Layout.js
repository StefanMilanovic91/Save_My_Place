import React from 'react'

const Layout = (props) => {
    return (
        <div {...props} className="Main">
            {props.children}
        </div>
    )
}

export default Layout
