"use client"
import React from 'react'
import './ProfilePage.css'

const ProfilePage  = () => {
    const [bookings, setBookings] = React.useState<any>(null)
    const [user, setUser] = React.useState<any>(null)

    const getBookings = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/getuserbookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setBookings(data.data)


                    // {
                    //     "_id": "651d70e7c54f60ba058333d2",
                    //     "showTime": "20:27",
                    //     "showDate": "2023-10-04T19:34:14.000Z",
                    //     "movieId": "65101a2acc5b257e6f2816a5",
                    //     "screenId": "65101370556fed70cb10ca1d",
                    //     "seats": [
                    //         {
                    //             "row": "E",
                    //             "col": 0,
                    //             "seat_id": "10",
                    //             "price": 300,
                    //             "_id": "651d70e7c54f60ba058333d3"
                    //         },
                    //         {
                    //             "row": "E",
                    //             "col": 0,
                    //             "seat_id": "9",
                    //             "price": 300,
                    //             "_id": "651d70e7c54f60ba058333d4"
                    //         },
                    //         {
                    //             "row": "E",
                    //             "col": 1,
                    //             "seat_id": "1",
                    //             "price": 300,
                    //             "_id": "651d70e7c54f60ba058333d5"
                    //         },
                    //         {
                    //             "row": "E",
                    //             "col": 1,
                    //             "seat_id": "2",
                    //             "price": 300,
                    //             "_id": "651d70e7c54f60ba058333d6"
                    //         }
                    //     ],
                    //     "totalPrice": 1200,
                    //     "paymentId": "123456789",
                    //     "paymentType": "online",
                    //     "userId": "651c19f156b991c66296fb73",
                    //     "__v": 0
                    // }
                }
                else {
                    console.log(data)
                }
            }
            )
    }

    const getUserData = async () => {

        // router.get('/getuser', authTokenHandler, async (req, res) => {
        //     const user = await User.findOne({ _id: req.userId });

        //     if (!user) {
        //         return res.status(400).json(createResponse(false, 'Invalid credentials'));
        //     }
        //     else {
        //         return res.status(200).json(createResponse(true, 'User found', user));
        //     }
        // })


        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setUser(data.data)

                    // {
                    //     "_id": "651c19f156b991c66296fb73",
                    //     "name": "Harshal Jain",
                    //     "password": "$2b$08$17hG5iNfG7PbSX7BpGNRNe2m7uCB56F2Oy5hOhF113z5PT8pUUCM.",
                    //     "email": "virajj014@gmail.com",
                    //     "bookings": [
                    //         "651d70e7c54f60ba058333d2",
                    //         "651d7171559a5aaef26eba47"
                    //     ],
                    //     "createdAt": "2023-10-03T13:41:05.175Z",
                    //     "updatedAt": "2023-10-04T14:06:41.729Z",
                    //     "__v": 2,
                    //     "city": "Jabalpur"
                    // }
                }
                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getBookings()
        getUserData()
    }, [])
    return (
        <div className='profile'>
            <h1 className='head'>Profile</h1>
            <div className='user'>
                <h2>User Details</h2>
                <div className='details'>
                    <div className='detail'>
                        <h3>Name</h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className='detail'>
                        <h3>Email</h3>
                        <p>{user?.email}</p>
                    </div>

                    <div className='detail'>
                        <h3>City</h3>
                        <p>{user?.city}</p>
                    </div>
                </div>


            </div>
            <div className='bookings'>
                <h2>Bookings</h2>
                <div className='details'>
                    {
                        bookings?.map((booking: any) => {
                            return (
                                <div className='booking' key={booking._id}>
                                    <div className='detail'>
                                        <h3>Movie</h3>
                                        <p>{booking.movieId.title}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Screen</h3>
                                        <p>{booking.screenId.name}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Seats</h3>
                                        <p>{booking.seats.map((seat: any, index:any) => {
                                            return (
                                                <span 
                                                key={index}
                                                >{seat.seat_id}, </span>
                                            )
                                        }
                                        )}</p>
                                    </div>

                                    <div className='detail'>

                                        <h3>Price</h3>
                                        <p>{booking.totalPrice}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Type</h3>
                                        <p>{booking.paymentType}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Payment Id</h3>
                                        <p>{booking.paymentId}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Date</h3>
                                        <p>{booking.showDate}</p>
                                    </div>

                                    <div className='detail'>
                                        <h3>Show Time</h3>
                                        <p>{booking.showTime}</p>
                                    </div>



                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default ProfilePage 