import React, { Component } from 'react'
// this is local data
// import items from "./data"
import Client from "./Contentful"


const RoomContext = React.createContext();

// <RoomContext.Provider value={} 
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                // order: "sys.createdAt"
                order: "-fields.price" //fields from json data
            })
            let rooms = this.formatData(response.items)
            // console.log(rooms);
            // add to this array if its featured
            let featuredRooms = rooms.filter(room => room.featured === true)
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));


            // getting the formatted data and storing in state
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })
        } catch (error){
            console.log(error)
        }
    }

    //   .then((response) => console.log(response.items))
    // .catch (console.error)

    componentDidMount() {
        this.getData()

        // ** this is local data **
        // let rooms = this.formatData(items)
        // // console.log(rooms);
        // // add to this array if its featured
        // let featuredRooms = rooms.filter(room => room.featured === true)
        // let maxPrice = Math.max(...rooms.map(item => item.price));
        // let maxSize = Math.max(...rooms.map(item => item.size));


        // // getting the formatted data and storing in state
        // this.setState({
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms,
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice,
        //     maxSize
        // })
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
    handleChange = event => {
        const target = event.target
        // checkbox targets checked instead of value
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        // console.log(type, name, value);
        this.setState({
            [name]:value
        },this.filterRooms)
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast,pets
        } = this.state

        // all the rooms
        let tempRooms = [...rooms]

        //transform value into int
        capacity = parseInt(capacity)

        // filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)  
        }

        // filter by capcity
        if(capacity !== 1 ){
            // if the capacity value is bigger, then return rooms 
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price
        // if your price is less than range value, then rooms will be rendered
        tempRooms = tempRooms.filter(room => room.price <= price)

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size < maxSize)

        // filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        // filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        // change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            // <RoomContext.Provider value={{greeting: this.state.greeting}}>
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext }
// context allows you to avoid prop drilling