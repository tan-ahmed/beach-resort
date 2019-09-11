import React, { Component } from 'react'
import {RoomContext} from '../context'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext
    render() {
        const {name, greeting} = this.context;
        // console.log(value)
        return (
            
            <div>
                {greeting} {name} featured rooms {greeting}
            </div>
        )
    }
}

// room context
// pass whole context and set to type
// access to it using this.context
// destructuring