import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
    // prop being passed by react router
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
        console.log(this.state.slug)
    }

    static contextType = RoomContext;
    // componentDidMount(){}

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        // console.log(room);

        if (!room) { // if room is undefined
            return (
                <div className="error">
                    <h3>No such room could be found...</h3>
                    <Link to="/rooms" className="btn-primary">Return to rooms</Link>
                </div>
            )
        }

        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room

        // array destructuring
        const [mainImg, ...defaultImg] = images;
        // console.log(mainImg)
        // console.log(defaultImg)

        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">Back to rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImg.map((item, index) => {
                            return <img src={item} key={index} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Info</h3>
                            <h6>price: £{price}</h6>
                            <h6>size: £{size}</h6>
                            <h6>Max capacity: 
                            {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                            <h6>size: {size} SQFT</h6>
                            <h6>extras: {extras} SQFT</h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>Extras</h6>
                    <ul className="extras">
                    {extras.map((item, index)=>{
                        return <li key={index}>- {item}</li>
                    })}
                    </ul>
                </section>
            </>
        )
    }
}
