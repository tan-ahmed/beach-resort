import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import { withRoomConsumer } from '../context'
import Loading from './Loading'

// gives you access to context
function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

// High order component - wrap container in room consumer
export default withRoomConsumer(RoomContainer)


// import React from 'react'
// import RoomFilter from './RoomFilter'
// import RoomList from './RoomList'
// import { RoomConsumer } from '../context'
// import Loading from './Loading'

// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {value => {
//                 const {loading, sortedRooms, rooms} = value;
//                 // console.log(value);
//                 if(loading){
//                     return <Loading/>
//                 }

//                 return (
//                     <div>
//                         hello from RoomContainer
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms} />
//                     </div>
//                 )

//             }
//             }
//         </RoomConsumer>
//     )
// }

