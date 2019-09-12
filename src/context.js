import React, { Component } from 'react'
import items from "./data"

const RoomContext = React.createContext();

// <RoomContext.Provider value={} 
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    }

    // getData
    componentDidMount() {
        let rooms = this.formatData(items)
        // console.log(rooms);
        // add to this array if its featured
        let featuredRooms = rooms.filter(room => room.featured === true)
        this.setState({ rooms, featuredRooms, sortedRooms: rooms, loading: false })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(images => images.fields.file.url);
            // this images above is overriding the one in the fields below.
            let room = { ...item.fields, images, id }
            return room;
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    }

    render() {
        return (
            // <RoomContext.Provider value={{greeting: this.state.greeting}}>
            <RoomContext.Provider value={{ ...this.state, getRoom:this.getRoom }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext }
// context allows you to avoid prop drilling