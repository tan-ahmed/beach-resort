import React, { Component } from 'react'

const RoomContext = React.createContext();

// <RoomContext.Provider value={} 
class RoomProvider extends Component {
    state = {
        greeting: "hello",
        name: "tan"
    }
    render() {
        return (
            // <RoomContext.Provider value={{greeting: this.state.greeting}}>
            <RoomContext.Provider value={{...this.state}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export{RoomProvider, RoomConsumer, RoomContext}
// context allows you to avoid prop drilling