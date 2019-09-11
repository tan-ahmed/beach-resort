import React, { Component } from 'react'
import {RoomContext} from '../context'
import Loading from './Loading'
import Room from './Room'

export default class FeaturedRooms extends Component {
    static contextType = RoomContext
    render() {
        const {featuredRooms : rooms} = this.context
        console.log(rooms)
        return (
            
            <div>
               Featured rooms
               <Room />
               <Loading />
            </div>
        )
    }
}

// room context
// pass whole context and set to type
// access to it using this.context
// destructuring